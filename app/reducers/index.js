const { combineReducers } = require('redux');
const actionTypes = require('../actions/actionTypes');
const { pick } = require('lodash/fp');

const mainReducer = combineReducers({
    path: require('./path'),
    map: require('./map'),
    pick: require('./pick'),
    omit: require('./omit'),
    keys: require('./keys'),
    state: require('./state'),
    offset: require('./offset'),
    help: require('./help'),
    rows: require('./rows'),
    columns: require('./columns'),
    helpText: require('./helpText'),
    data: require('./data'),
});

module.exports = (state, action) => {
    if (action.type === actionTypes.CLEAR) state = pick(['data'], state);
    return mainReducer(state, action);
};