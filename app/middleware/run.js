const actionTypes = require('../actions/actionTypes');
const actions = require('../actions');
const { identity, omit } = require('lodash/fp');
const fs = require('fs');
const request = require('request');
const MongoClient = require('mongodb').MongoClient;

const runTypes = {
    file: (data, store, action) => {
        const fileAction = data.fileAction;
        const filename = data.fileName;
        switch (fileAction) {
            case 'write': {
                const outstream = fs.createWriteStream(filename);
                const outData = omit(['runType', 'filename', 'fileAction'], data);
                const outStr = JSON.stringify(outData, null, 2);
                outstream.write(outStr);
                return;
            }
            case 'read':
            default: {
                fs.readFile(filename, 'utf8', (err, contents) => {
                    store.dispatch(action(JSON.parse(contents)));
                });
                return;
            }
        }
    },
    http: (data, store, action) => request(omit(['runType'], data), (err, res) => {
        store.dispatch(action(res));
    }),
    mongo: (data, store, action) => MongoClient.connect(data.mongoUrl, (err, db) => {
        const collection = db.collection(data.mongoCollection);
        collection
            .find(data.mongoFind || {}, data.mongoProjection || {})
            .limit(data.mongoLimit || 50)
            .toArray((err, res) => {
                store.dispatch(action(res));
                db.close();
            });
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