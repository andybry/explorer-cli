const { createStore, applyMiddleware } = require('redux');
const reducer = require('./reducers');
const middleware = require('./middleware');

module.exports = {
    configureStore: () => createStore(reducer, applyMiddleware(...middleware))
};