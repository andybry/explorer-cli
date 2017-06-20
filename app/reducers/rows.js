const actionTypes = require('../actions/actionTypes');

module.exports = (state = process.stdout.rows, action) => {
    switch (action.type) {
        case actionTypes.RESIZE:
            return action.rows;
        default:
            return state;
    }
};