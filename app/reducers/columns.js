const actionTypes = require('../actions/actionTypes');

module.exports = (state = process.stdout.columns, action) => {
    switch (action.type) {
        case actionTypes.RESIZE:
            return action.columns;
        default:
            return state;
    }
};