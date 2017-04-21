const Monitor = require('./lib/monitorMid');
const util = require('./lib/util');
const cacheProxy = require('./lib/cacheProxy');
const instance = require('./lib/instance');
const config = require('./lib/config');
const extend = require('./lib/extend');

let basePars = (function(){
    let uuid = util.getUuid(),
        resolution = util.getScreenResolution(),
        os = util.getOs(),
        browser = util.getBrowser(),
        option = {
            uuid,
            resolution,
            puse: 'web_js'
        };
    extend(option, os, browser);
    return option;
})();

let getIframe = instance(function(opt){
    let iframe = document.createElement('iframe');
    iframe.style.display = 'none';
    iframe.src = 'https://jincai.jingoal.com/agent/monitorListener.html';
    document.body.appendChild(iframe);
    iframe.addEventListener('load', function(data){
        iframe.contentWindow.postMessage(opt, 'https://jincai.jingoal.com');
        debugger;
    });
    return iframe;
});

let proxy = cacheProxy(function(opt){
    let iframeEl = getIframe(opt);
    iframeEl.contentWindow && iframeEl.contentWindow.postMessage(opt, 'https://jincai.jingoal.com');
});

let monitor = new Monitor();

monitor.use((options, next) =>{ //getBaseInfo
    if(options.target){
        let el = options.target,
            txt = el.getAttribute('title') || el.innerText || '',
            actionTag = util.getParentAttr(el, config.attr),
            temp = {
                txt,
                actionTag
            };
        if(Object.prototype.toString.call(options) === '[object Object]'){
            // let opt = _.omit(options, 'target');
            delete options['target'];
            let opt = extend({}, options);
            this.options = extend({}, basePars, temp, opt);
        }else{
            this.options = extend({}, basePars, temp);
        }
    }else{
        this.options = extend({}, basePars, options);
    }
    next();
});

monitor.use((options, next) =>{  //getPageInfo
    let time = util.getTime(),
        currPage = window.location.href,
        productTag = '/',
        temp = window.location.hash.match(/[^\/]*\/([^\?\/]*).*/),
        refPage = document.referrer || '',
        ip = '';
    if(temp){
        productTag = temp[1];
    }
    try{
        ip = returnCitySN.cip;
    }catch(e){
        ip = '';
    }
    extend(options, {
        time,
        currPage,
        productTag,
        refPage,
        ip
    });
    next();
});

monitor.use((options, next)=>{ //getUserInfo
    try{
        var us = window.jingoal.userConfig || {};
        let userId = us.user_id || '';
        let companyId = us.company_id || '';
        let userName = us.user_name || '';
        let aid = us.aid || '';
        extend(options, {
            uid: userId,
            cid: companyId,
            un: userName,
            aid
        });
    }catch(e){}
    next();
});

monitor.use(options=>{
    var opt = {
        topic: config.topic,
        msg: JSON.stringify(options)
    };
    proxy(opt);
});

//
// monitor.send({
//     actionTag:action.type,
//     targetTag:{
//         name:123,
//         age:4545
//     }
// });

module.exports = monitor;
