const actionTypes = require('../actions/actionTypes');
const quit = require('../ui/quit');

module.exports = proc => store => next => action => {
    switch (action.type) {
        case actionTypes.QUIT:
            quit(proc);
        default:
            return next(action);
    }
};