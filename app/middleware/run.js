const actionTypes = require('../actions/actionTypes');
const actions = require('../actions');

module.exports = store => next => action => {
    switch (action.type) {
        case actionTypes.RUN:
            const data = store.getState().data;
            const runType = data.runType;
            let handler;
            try {
                handler = require(`explorer-cli-${runType}`);
            } catch (e) {
                handler = (data, cb) => cb(null, data);
            }
            handler(data, (err, res) => {
                const newData = err ? err : res;
                const serializableData = JSON.parse(JSON.stringify(newData));
                store.dispatch(actions.setData(serializableData));
            });
            return next(action);
        default:
            return next(action);
    }
};