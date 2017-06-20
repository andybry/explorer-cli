const actionTypes = require('../actions/actionTypes');
const { merge } = require('lodash/fp');

module.exports = store => next => action => {
    switch (action.type) {
        case actionTypes.SET_PATH_VALUE:
        case actionTypes.DELETE_PATH: {
            const newAction = merge(action, {
                path: store.getState().path
            });
            return next(newAction);
        }
        default: 
            return next(action);
    }
};