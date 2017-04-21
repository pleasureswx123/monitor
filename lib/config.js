const util = require('./util');
const extend = require('./extend');

let config = {
    logImgSrc: '',
    // attr:'data-collect',
    attr: 'class',
    topic: 'web.action',
    src: 'https://jincai.jingoal.com/agent/monitorListener.html'
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
    debugger;
    return option;
})();

module.exports = {
    config,
    basePars
};

