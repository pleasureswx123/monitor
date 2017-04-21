module.exports = function(fn){
    var result = null;
    return function(){
        return result || (result = fn.apply(this,arguments))
    }
};
