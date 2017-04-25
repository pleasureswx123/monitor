const info = require('./config');
const util = require('./util');

function cacheProxy(cb){
    var cache = [],
        timer = null;
    return function(opt){
        cache.push(opt);
        if(timer){
            return;
        }
        timer = setTimeout(function(){
            cb(cache);
            clearTimeout(timer);
            timer = null;
            cache = [];
        }, 2000);
    }
}

let domain = util.parseUrl(info.config.src).domain;

let postProxy = {
    getIframe: function(opt){
        let iframe = document.createElement('iframe');
        iframe.style.display = 'none';
        iframe.src = info.config.src;
        document.body.appendChild(iframe);
        iframe.addEventListener('load', function(data){
            try{
                console.log('frist',JSON.parse(opt.msg));
                iframe.contentWindow.postMessage(opt, domain);
            }catch(e){
            }
        });
        this.iframe = iframe;
    },
    proxy: cacheProxy(function(opt){
        let own = postProxy;
        if(own.iframe){
            try{
                console.log('other',JSON.parse(opt.msg));
                own.iframe.contentWindow && own.iframe.contentWindow.postMessage(opt, domain);
            }catch(e){
            }
        }else{
            own.getIframe(opt);
        }
    })
};

module.exports = postProxy;
