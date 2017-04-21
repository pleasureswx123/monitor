module.exports = function(cb){
    var cache = [],
        timer = null;
    return function(opt) {
        cache.push(opt);
        if(timer) {
            return;
        }
        timer = setTimeout(function(){
            cb(cache);
            clearTimeout(timer);
            timer = null;
            cache = [];
        },2000);
    }
};
