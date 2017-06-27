const actionTypes = require('../actions/actionTypes');

module.exports = (state = 0, action) => {
    switch (action.type) {
        case actionTypes.SCROLL_DOWN:
            if (state >= action.maxOffset) return action.maxOffset;
            return state + 1;
        case actionTypes.SCROLL_UP:
            if (state <= 0) return 0;
            return state - 1;
        case actionTypes.SCROLL_HALF_SCREEN_DOWN:
            const newState = state + Math.ceil(action.rows / 2);
            return (newState < action.maxOffset ) ? newState : action.maxOffset;
        case actionTypes.SCROLL_HALF_SCREEN_UP: {
            const newState = state - Math.ceil(action.rows / 2);
            return (newState > 0 ) ? newState : 0;
        }
        case actionTypes.TOGGLE_KEYS:
        case actionTypes.TOGGLE_STATE:
        case actionTypes.TOGGLE_HELP:
        case actionTypes.SET_PATH:
        case actionTypes.SET_RELATIVE_PATH:
        case actionTypes.SET_MAP:
        case actionTypes.SET_PICK:
        case actionTypes.SET_OMIT:
        case actionTypes.LOAD_CACHE:
            return 0;
        default:
            return state;
    }
};