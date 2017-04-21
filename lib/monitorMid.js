function Monitor(){
    this.cache = [];
    this.options = null;
}
Monitor.prototype.use = function(fn){
    if(typeof fn !== 'function'){
        throw 'Monitor middleware must be a function';
    }
    this.cache.push(fn);
    return this;
};
Monitor.prototype.next = function(fn){
    if(this.middlewares && this.middlewares.length > 0){
        let ware = this.middlewares.shift();
        ware.call(this, this.options, this.next.bind(this));
    }
};
Monitor.prototype.send = function(options){
    this.middlewares = this.cache.map(function(fn){
        return fn;
    });
    this.options = options || {};
    this.next();
};

module.exports = Monitor;
