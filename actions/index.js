const ActionType = require('./ActionType');

const fetchMonitor = function (opt) {
    return (dispatch, getState) => {
        dispatch({
            type: ActionType.MONITOR_BEHAVIOR,
            data: { ...opt }
        });
    };
};

module.exports = fetchMonitor;
