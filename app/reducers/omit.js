const actionTypes = require('../actions/actionTypes');

module.exports = (state = '', action) => {
    switch (action.type) {
        case actionTypes.SET_OMIT:
            return action.omit;
        default:
            return state;
    }
};