const actionTypes = require('../actions/actionTypes');

module.exports = (state = false, action) => {
    switch (action.type) {
        case actionTypes.TOGGLE_CACHE_LIST:
            return !state;
        default:
            return state;
    }
};