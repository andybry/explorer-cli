const readline = require('readline');
const draw = require('./draw');
const { keys } = require('./input');
const actions = require('../actions');

const resize = store => {
    const action = actions.resize({
        rows: process.stdout.rows,
        columns: process.stdout.columns
    });
    store.dispatch(action);
};

module.exports = store => {
    const onStateChange = draw(store);
    store.subscribe(onStateChange);
    onStateChange();
    process.stdin.addListener('keypress', keys(store));
    process.stdout.addListener('resize', () => resize(store));
    resize(store);
    readline.emitKeypressEvents(process.stdin);
    process.stdin.setRawMode(true);
};