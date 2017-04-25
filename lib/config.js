const util = require('./util');
const extend = require('./extend');

let config = {
    logImgSrc: '',
    attr:'data-monitor',
    topic: 'web.action',
    src: 'https://jincai.jingoal.com/agent/monitorListener.html',
    ipSrc:'http://pv.sohu.com/cityjson?ie=utf-8',
    ip:true
};

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

module.exports = {
    config,
    basePars
};

