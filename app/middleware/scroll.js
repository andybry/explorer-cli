const actionTypes = require('../actions/actionTypes');
const { merge } = require('lodash/fp');
const lines = require('../ui/lines');

module.exports = store => next => action => {
    switch (action.type) {
        case actionTypes.SCROLL_DOWN:
        case actionTypes.SCROLL_HALF_SCREEN_DOWN:
        case actionTypes.SCROLL_HALF_SCREEN_UP: {
            const state = store.getState();
            const newAction = merge(action, {
                rows: state.rows,
                maxOffset: lines(state).length - 1
            });
            return next(newAction);
        }
        default: 
            return next(action);
    }
};