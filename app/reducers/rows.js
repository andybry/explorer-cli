const actionTypes = require('../actions/actionTypes');

module.exports = (state = 0, action) => {
    switch (action.type) {
        case actionTypes.RESIZE:
            return action.rows;
        default:
            return state;
    }
};