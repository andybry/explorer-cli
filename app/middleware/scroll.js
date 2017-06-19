const actionTypes = require('../actions/actionTypes');
const { merge } = require('lodash/fp');

module.exports = store => next => action => {
    switch (action.type) {
        case actionTypes.SCROLL_HALF_SCREEN_DOWN:
        case actionTypes.SCROLL_HALF_SCREEN_UP: {
            const newAction = merge(action, {
                rows: store.getState().rows
            });
            return next(newAction);
        }
        default: 
            return next(action);
    }
};