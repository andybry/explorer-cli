const actionTypes = require('../actions/actionTypes');

module.exports = (state = '', action) => {
    switch (action.type) {
        case actionTypes.SAVE:
            return action.file;
        default:
            return state;
    }
};