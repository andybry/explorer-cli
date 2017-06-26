const actionTypes = require('../actions/actionTypes');

module.exports = (state = false, action) => {
    switch (action.type) {
        case actionTypes.SAVE:
            return true;
        case actionTypes.TOGGLE_AUTOSAVE:
            return !state;
        default:
            return state;
    }
};