const data = require('../../shows.json');
const { set, omit } = require('lodash/fp');
const actionTypes = require('../actions/actionTypes');

module.exports = (state = data, action) => {
    switch (action.type) {
        case actionTypes.SET_PATH_VALUE:
            return set(action.path, action.val, state);
        case actionTypes.DELETE_PATH:
            return omit(action.path, state);
        default:
            return state;
    }
};