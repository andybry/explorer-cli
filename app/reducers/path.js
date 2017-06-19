const actionTypes = require('../actions/actionTypes');
const actions = require('../actions');
const { cond, constant, replace, stubTrue, eq } = require('lodash/fp');

module.exports = (state = '', action) => {
    switch (action.type) {
        case actionTypes.SET_PATH:
            return action.path;
        case actionTypes.SET_RELATIVE_PATH:
            return cond([
                [ () => eq('', state), constant(action.path) ],
                [ () => eq('', action.path), constant(state) ],
                [ () => eq('.', action.path), constant(state) ],
                [ () => eq('..', action.path), () => replace(/\.?[^.]*?$/, '', state)],
                [ stubTrue, () => `${state}.${action.path}` ]
            ])();
        default:
            return state;
    }
};