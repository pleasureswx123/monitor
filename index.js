const monitor = require('./lib/monitor');
const ActionType = require('./actions/ActionType');

const actType = ['@@monitor',ActionType.MONITOR_BEHAVIOR];
function monitorMiddleWare(c){
    return function(_ref){
        var dispatch = _ref.dispatch;
        var getState = _ref.getState;
        return function(next){
            return function(action){
                if(actType.indexOf(action.type) !== -1 && action.data){
                    monitor.send(action.data);
                }
                return next(action);
            }
        }
    }
}

exports.default = monitorMiddleWare;
module.exports = exports['default'];

