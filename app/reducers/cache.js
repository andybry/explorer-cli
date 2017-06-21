const actionTypes = require('../actions/actionTypes');
const { merge, omit } = require('lodash/fp');

const defaultState = {
    empty: {}
};

module.exports = (state = defaultState, action) => {
    switch(action.type) {
        case actionTypes.ADD_CACHE:
            return merge({ [action.key]: action.data }, state);
        case actionTypes.DELETE_CACHE:
            return omit([action.key], state);
        default:
            return state;
    }
};