const actionTypes = require('../actions/actionTypes');
const actions = require('../actions');
const { identity, omit } = require('lodash/fp');
const fs = require('fs');
const request = require('request');

const runTypes = {
    file: (data, store, action) => {
        const fileAction = data.fileAction;
        const filename = data.filename;
        switch (fileAction) {
            case 'read': {
                fs.readFile(filename, 'utf8', (err, contents) => {
                    store.dispatch(action(JSON.parse(contents)));
                });
                return;
            }
            case 'write': {
                const outstream = fs.createWriteStream(filename);
                const outData = omit(['runType', 'filename', 'fileAction'], data);
                const outStr = JSON.stringify(outData, null, 2);
                outstream.write(outStr);
                return;
            }
            default:
                return;
        }
    },
    http: (data, store, action) => request(omit(['runType'], data), (err, res) => {
        store.dispatch(action(res));
    }),
};

module.exports = store => next => action => {
    switch (action.type) {
        case actionTypes.RUN:
            const data = store.getState().data;
            const runType = data.runType;
            const handler = runTypes[runType] || identity;
            handler(data, store, actions.setData);
            return next(action);
        default:
            return next(action);
    }
};