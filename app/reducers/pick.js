const actionTypes = require('../actions/actionTypes');

module.exports = (state = '', action) => {
    switch (action.type) {
        case actionTypes.SET_PICK:
            return action.pick;
        default:
            return state;
    }
};