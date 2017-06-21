const actionTypes = require('../actions/actionTypes');
const { merge, omit } = require('lodash/fp');

const defaultState = {
    empty: {}
};

module.exports = (state = defaultState, action) => {
    switch(action.type) {
        case actionTypes.ADD_CACHE:
            return merge(state, { [action.key]: action.data });
        case actionTypes.DELETE_CACHE:
            return omit([action.key], state);
        default:
            return state;
    }
};