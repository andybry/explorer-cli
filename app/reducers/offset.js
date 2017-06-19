const actionTypes = require('../actions/actionTypes');

module.exports = (state = 0, action) => {
    switch (action.type) {
        case actionTypes.SCROLL_DOWN:
            return state + 1;
        case actionTypes.SCROLL_UP:
            return state - 1;
        case actionTypes.SCROLL_HALF_SCREEN_DOWN:
            return state + Math.ceil(action.rows / 2);
        case actionTypes.SCROLL_HALF_SCREEN_UP:
            return state - Math.ceil(action.rows / 2);
        case actionTypes.TOGGLE_KEYS:
        case actionTypes.TOGGLE_STATE:
        case actionTypes.TOGGLE_HELP:
        case actionTypes.SET_PATH:
        case actionTypes.SET_RELATIVE_PATH:
        case actionTypes.SET_MAP:
        case actionTypes.SET_PICK:
        case actionTypes.SET_OMIT:
            return 0;
        default:
            return state;
    }
};