const { configureStore } = require('../store');
const term = require('terminal-kit').terminal;
const draw = require('./draw');
const { keys } = require('./input');
const actions = require('../actions');

const resize = (store) => {
    const action = actions.resize({
        rows: term.height,
        columns: term.width
    });
    store.dispatch(action);
};

module.exports = initialState => {
    const store = configureStore(initialState);
    const onStateChange = draw(store);
    store.subscribe(onStateChange);
    term.grabInput();
    term.on('key', keys(store));
    term.on('resize', () => resize(store))
    resize(store);
};