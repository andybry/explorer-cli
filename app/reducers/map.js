const actionTypes = require('../actions/actionTypes');

module.exports = (state = '', action) => {
    switch (action.type) {
        case actionTypes.SET_MAP:
            return action.map;
        default:
            return state;
    }
};