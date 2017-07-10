const data = require('../../helpText.json');
const { set, omit } = require('lodash/fp');
const actionTypes = require('../actions/actionTypes');

module.exports = (state = data, action) => {
    switch (action.type) {
        case actionTypes.SET_PATH_VALUE: {
            let val;
            try {
                val = JSON.parse(action.val);
            } catch (e) {
                val = action.val;
            }
            return (action.path === '' ? val : set(action.path, val, state));
        }
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