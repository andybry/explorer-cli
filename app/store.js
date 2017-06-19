const { createStore, applyMiddleware } = require('redux');
const reducer = require('./reducers');
const middleware = require('./middleware');

module.exports = {
    configureStore: initialState => createStore(
        reducer,
        initialState,
        applyMiddleware(...middleware)
    )
};