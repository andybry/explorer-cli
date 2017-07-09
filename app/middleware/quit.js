const actionTypes = require('../actions/actionTypes');
const quit = require('../ui/quit');

module.exports = store => next => action => {
    switch (action.type) {
        case actionTypes.QUIT:
            quit();
        default:
            return next(action);
    }
};