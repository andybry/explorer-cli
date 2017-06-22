const actionTypes = require('../actions/actionTypes');
const { merge, omit } = require('lodash/fp');

const defaultState = {
    'empty object': {},
    'empty array': [],
    http: {
        runType: 'http',
        baseUrl: 'https://api.github.com',
        url: '/rate_limit'
    },
    mongo: {
      runType: 'mongo',
      mongoUrl: 'mongodb://{host}:{port}/{db}',
      mongoCollection: '{collection name}',
      mongoFind: {},
      mongoProjection: {},
      mongoLimit: 1,
    },
    file: {
        runType: 'file',
        fileAction: 'read',
        fileName: '{file}'
    }
};

module.exports = (state = defaultState, action) => {
    switch(action.type) {
        case actionTypes.ADD_CACHE:
            return merge(state, { [action.key]: action.data });
        case actionTypes.DELETE_CACHE:
            return omit([action.key], state);
        default:
            return state;
    }
};