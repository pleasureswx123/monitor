const extend = require('./extend');

let Util = (function(){
    var cache = {};
    return {
        cache: {
            set: function(key, value){
                return cache[key] = value;
            },
            remove: function(key){
                delete cache[key];
            },
            get: function(key){
                return cache[key];
            }
        }
    };
})();
extend(Util, {
    loadImg: function(src, callback){
        if(!src){
            return;
        }
        var t = new Date().getTime();
        var img = window['V_fix_img' + t] = new Image();
        console.log('src', src);
        img.onload = img.onerror = img.onabort = function(){
            callback && callback(img);
            img.onload = img.onerror = img.onabort = null;
            try{
                delete window['V_fix_img' + t];
                img = null;
            }
            catch(e){
                img = null;
            }
        };
        img.src = src;
    },
    loadScript: function(url, callback){
        var head = document.head || document.getElementsByTagName("head")[0] || document.documentElement,
            script,
            options;
        if(typeof url === "object"){
            options = url;
            url = undefined;
        }
        var s = options || {};
        url = url || s.url;
        callback = callback || s.success;
        script = document.createElement("script");
        script.async = s.async || false;
        script.type = "text/javascript";
        if(s.charset){
            script.charset = s.charset;
        }
        if(s.cache === false){
            url = url + ( /\?/.test(url) ? "&" : "?" ) + "_=" + (new Date()).getTime();
        }
        script.src = url;
        head.insertBefore(script, head.firstChild);
        if(callback){
            document.addEventListener ? script.addEventListener("load", callback, false) : script.onreadystatechange = function(){
                if(/loaded|complete/.test(script.readyState)){
                    script.onreadystatechange = null
                    callback()
                }
            }
        }
    },
    setCookie: function(name, value, days, domain){
        var exp = new Date();
        exp.setTime(exp.getTime() + days * 24 * 60 * 60 * 1000);
        document.cookie = name + "=" + value + ";" + "expires=" + exp.toGMTString() + ";path=/;" + (domain ? ("domain=" + domain + ";") : "");
    },
    getCookie: function(name){
        var arr, reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)");
        if(arr = document.cookie.match(reg)){
            return arr[2];
        }else{
            return null;
        }
    },
    delCookie: function(name, domain){
        var date = new Date();
        date.setDate(date.getDate() - 100000);
        document.cookie = name + "=a; expires=" + date.toGMTString() + ";path=/" + ";" + (domain ? ("domain=" + domain + ";") : "");
    },
    getQueryString: function(name){
        var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
        var r = window.location.search.substr(1).match(reg);
        if(r != null) return r[2];
        return null;
    },
    paramToString: function(params){
        var ret = '';
        for(var key in params){
            if(ret) ret += '&';
            if(params.hasOwnProperty(key) && typeof params[key] !== 'function'){
                ret += (key + '=' + encodeURIComponent(decodeURIComponent(params[key])));
            }
        }
        return ret;
    },
    wordCap: function(str){
        return str.toLowerCase().replace(/\s[a-z]/g, (L) => L.toUpperCase());
    },
    getUuid: function(){
        var s = [];
        var hexDigits = "0123456789ABCDEF";
        for(var i = 0; i < 36; i++){
            s[i] = hexDigits.substr(Math.floor(Math.random() * 0x10), 1);
        }
        s[14] = "4";
        s[19] = hexDigits.substr((s[19] & 0x3) | 0x8, 1);
        s[8] = s[13] = s[18] = s[23] = "-";
        var uuid = s.join("");
        return uuid;
    },
    getParentAttr: function(domEl, attr, deep){
        var deep = deep || 20, con;
        if(!domEl || domEl === document.body || domEl === document.documentElement){
            return;
        }
        for(let i = 0; i < deep; i++){
            if(con = domEl.getAttribute(attr)){
                return con;
            }
            domEl = domEl.parentNode;
        }
    },
    getScreenResolution: function(){
        var resolution = [screen.width, screen.height];
        return resolution.join('*')
    },
    getOs: function(){
        var o = {
            os: navigator.platform,
            osVsion: ''
        }
        var sUserAgent = navigator.userAgent;
        var isWin = (navigator.platform == "Win32") || (navigator.platform == "Windows");
        var isMac = (navigator.platform == "Mac68K") || (navigator.platform == "MacPPC") || (navigator.platform == "Macintosh") || (navigator.platform == "MacIntel");
        if(isMac){
            o.os = "mac";
            o.osVsion = "Mac";
            var v;
            if(v = sUserAgent.toLocaleLowerCase().match(/mac\sos\sx\s([\d_]*)/)){
                o.osVsion = v[1].split('_').join('.');
            }
        }
        var isUnix = (navigator.platform == "X11") && !isWin && !isMac;
        if(isUnix){
            o.os = "Unix";
            o.osVsion = navigator.platform;
        }
        ;
        var isLinux = String(navigator.platform).indexOf("Linux") > -1;
        if(isLinux){
            o.os = "Linux";
            o.osVsion = navigator.platform;
        }
        if(isWin){
            o.os = 'window';
            var isWin2K = sUserAgent.indexOf("Windows NT 5.0") > -1 || sUserAgent.indexOf("Windows 2000") > -1;
            if(isWin2K) o.osVsion = "2000";
            var isWinXP = sUserAgent.indexOf("Windows NT 5.1") > -1 || sUserAgent.indexOf("Windows XP") > -1;
            if(isWinXP) o.osVsion = "xp";
            var isWin2003 = sUserAgent.indexOf("Windows NT 5.2") > -1 || sUserAgent.indexOf("Windows 2003") > -1;
            if(isWin2003) o.osVsion = "2003";
            var isWinVista = sUserAgent.indexOf("Windows NT 6.0") > -1 || sUserAgent.indexOf("Windows Vista") > -1;
            if(isWinVista) o.osVsion = "vista";
            var isWin7 = sUserAgent.indexOf("Windows NT 6.1") > -1 || sUserAgent.indexOf("Windows 7") > -1;
            if(isWin7) o.osVsion = "7";
            var isWin10 = sUserAgent.indexOf("Windows NT 10") > -1 || sUserAgent.indexOf("Windows 10") > -1;
            if(isWin10) o.osVsion = "10";
        }
        return o;
    },
    getBrowser: function(){
        var bro = {
            browser: '',
            browVsion: ''
        }, userAgent = navigator.userAgent.toLowerCase(), s;

        function c(type, version){
            bro = {
                browser: type,
                browVsion: version
            }
        }

        (s = userAgent.match(/msie ([\d.]+)/)) ? c('IE', s[1]) : (s = userAgent.match(/firefox\/([\d.]+)/)) ? c('Firefox', s[1]) : (s = userAgent.match(/chrome\/([\d.]+)/)) ? c('Chrome', s[1]) : (s = userAgent.match(/opera.([\d.]+)/)) ? c('Opera', s[1]) : (s = userAgent.match(/version\/([\d.]+).*safari/)) ? c('Safari', s[1]) : bro;
        return bro;
    },
    parseUrl: function(url){
        var a = document.createElement('a');
        a.href = url;
        return {
            source: url,
            protocol: a.protocol.replace(':', ''),
            host: a.hostname,
            port: a.port,
            query: a.search,
            params: (function(){
                var ret = {},
                    seg = a.search.replace(/^\?/, '').split('&'),
                    len = seg.length,
                    i = 0,
                    s;
                for(; i < len; i++){
                    if(!seg[i]){
                        continue;
                    }
                    s = seg[i].split('=');
                    ret[s[0]] = s[1];
                }
                return ret;
            })(),
            file: (a.pathname.match(/\/([^\/?#]+)$/i) || [, ''])[1],
            hash: a.hash.replace('#', ''),
            path: a.pathname.replace(/^([^\/])/, '/$1'),
            relative: (a.href.match(/tps?:\/\/[^\/]+(.+)/) || [, ''])[1],
            segments: a.pathname.replace(/^\//, '').split('/')
        };
    },
    getTime: function(){
        var d = new Date();
        var tZone = d.toString().match(/.*[+](\d*)[\s].*/)[1];

        function getVal(t, n){
            return ('0000' + t).substr(n || -2);
        }

        var year = d.getFullYear();
        var mon = getVal((d.getMonth() + 1));
        var dt = getVal(d.getDate());
        var h = getVal(d.getHours());
        var m = getVal(d.getMinutes());
        var s = getVal(d.getSeconds());
        var ms = getVal(d.getMilliseconds(), -3);
        var t = [year, mon, dt, h, m, s, ms, '+', tZone]
        return t.join('');
    }
});

module.exports = util;
