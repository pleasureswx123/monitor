const Monitor = require('./monitorMid');
const util = require('./util');
const postProxy = require('./cacheProxy');
const info = require('./config');
const extend = require('./extend');

let monitor = new Monitor();

monitor.use(function(options, next){ //getBaseInfo
    debugger;
    if(options.target){
        let el = options.target,
            txt = el.getAttribute('title') || el.innerText || '',
            actionTag = util.getParentAttr(el, info.config.attr),
            temp = {
                txt,
                actionTag
            };
        if(Object.prototype.toString.call(options) === '[object Object]'){
            // let opt = _.omit(options, 'target');
            delete options['target'];
            let opt = extend({}, options);
            this.options = extend({}, info.basePars, temp, opt);
        }else{
            this.options = extend({}, info.basePars, temp);
        }
    }else{
        this.options = extend({}, info.basePars, options);
    }
    next();
});

monitor.use(function(options, next){  //getPageInfo
    debugger;
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

monitor.use(function(options, next){ //getUserInfo
    debugger;
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
    }catch(e){
    }
    next();
});

monitor.use(function(options){
    var opt = {
        topic: info.config.topic,
        msg: JSON.stringify(options)
    };
    debugger;
    postProxy.proxy(opt);
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
