const { configureStore } = require('../store');
const readline = require('readline');
const draw = require('./draw');
const { keys } = require('./input');
const actions = require('../actions');

const resize = (proc, store) => {
    const action = actions.resize({
        rows: proc.stdout.rows,
        columns: proc.stdout.columns
    });
    store.dispatch(action);
};

module.exports = (initialState, proc = process) => {
    const store = configureStore(proc, initialState);
    const onStateChange = draw(process, store);
    store.subscribe(onStateChange);
    onStateChange();
    proc.stdin.addListener('keypress', keys(store));
    proc.stdout.addListener('resize', () => resize(proc, store));
    resize(proc, store);
    readline.emitKeypressEvents(proc.stdin);
    proc.stdin.setRawMode(true);
};