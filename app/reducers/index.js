const { combineReducers } = require('redux');
const actionTypes = require('../actions/actionTypes');
const data = require('../../shows.json');
const helpText = require('../../helpText.json');
const { merge } = require('lodash/fp');

const mainReducer = combineReducers({
    path: require('./path'),
    map: require('./map'),
    pick: require('./pick'),
    omit: require('./omit'),
    keys: require('./keys'),
    state: require('./state'),
    offset: require('./offset'),
    help: require('./help'),
    rows: (state = process.stdout.rows, action) => state,
    columns: (state = process.stdout.columns, action) => state,
    helpText: (state = helpText, action) => state,
    data: (state = data, action) => state,
});

module.exports = (state, action) => {
    if (action.type === actionTypes.CLEAR) state = undefined;
    return mainReducer(state, action);
};