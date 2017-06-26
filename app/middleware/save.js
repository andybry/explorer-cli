const actionTypes = require('../actions/actionTypes');
const fs = require('fs');
const { omit, flow } = require('lodash/fp');
const { partialRight } = require('lodash');

const omitFields = omit(['rows', 'columns', 'helpText']);
const stringify = partialRight(JSON.stringify, null, 2);
const toJson = flow(omitFields, stringify);

module.exports = store => next => action => {
    next(action);
    const state = store.getState();
    if (state.autosave && state.filename) {
        const json = toJson(state);
        const outStream = fs.createWriteStream(state.filename);
        outStream.write(json);
    }
};

