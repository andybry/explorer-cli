const actionTypes = require('../actions/actionTypes');
const fs = require('fs');
const { omit, flow } = require('lodash/fp');
const { partialRight } = require('lodash');

const omitSizes = omit(['rows', 'columns']);
const stringify = partialRight(JSON.stringify, null, 2);
const toJson = flow(omitSizes, stringify);

module.exports = store => next => action => {
    switch (action.type) {
        case actionTypes.SAVE:
            const json = toJson(store.getState());
            const outStream = fs.createWriteStream(action.file);
            outStream.write(json);
        default:
            return next(action);
    }
};

