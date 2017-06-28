const { createStore, applyMiddleware } = require('redux');
const reducer = require('./reducers');
const middleware = require('./middleware');

module.exports = {
    configureStore: (proc, initialState) => createStore(
        reducer,
        initialState,
        applyMiddleware(
            ...middleware.plain,
            ...middleware.proc.map(x => x(proc))
        )
    ),
};