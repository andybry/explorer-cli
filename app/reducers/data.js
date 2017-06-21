const data = require('../../shows.json');
const { set, omit } = require('lodash/fp');
const actionTypes = require('../actions/actionTypes');

module.exports = (state = data, action) => {
    switch (action.type) {
        case actionTypes.SET_PATH_VALUE:
            return set(action.path, action.val, state);
        case actionTypes.DELETE_PATH:
            return omit(action.path, state);
        case actionTypes.LOAD_CACHE:
            return action.data;
        case actionTypes.SET_DATA:
            return action.data;
        default:
            return state;
    }
};