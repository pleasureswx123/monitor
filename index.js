const monitor = require('./lib/monitor');

function monitorMiddleWare(c){
    return function(_ref){
        var dispatch = _ref.dispatch;
        var getState = _ref.getState;
        return function(next){
            return function(action){
                /*if(action.type=='REQUEST_FRIENDSLIST'){
                 monitor.send({
                 actionTag:'rqwrqrqrqrqwrqwr',
                 targetTag:{
                 name:123,
                 age:4545
                 }
                 });
                 }*/
                monitor.send({
                    actionTag:action.type,
                    targetTag:{
                        name:123,
                        age:4545
                    }
                });
                return next(action);
            }
        }
    }
}

module.exports = monitorMiddleWare;

