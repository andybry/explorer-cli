const actionTypes = require('../actions/actionTypes');
const { merge } = require('lodash/fp');

module.exports = store => next => action => {
    switch (action.type) {
        case actionTypes.ADD_CACHE: {
            const newAction = merge(action, {
                data: store.getState().data
            });
            return next(newAction);
        }
        case actionTypes.LOAD_CACHE: {
            const newAction = merge(action, {
                data: store.getState().cache[action.key]
            });
            return next(newAction);
        }
        default: 
            return next(action);
    }
};