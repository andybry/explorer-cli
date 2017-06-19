const readline = require('readline');
const actionTypes = require('../actions/actionTypes');

module.exports = store => next => action => {
    switch (action.type) {
        case actionTypes.QUIT:
            readline.cursorTo(process.stdout, 0, 0);
            readline.clearScreenDown(process.stdout);
            process.exit(0);
        default:
            return next(action);
    }
};