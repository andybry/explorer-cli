const readline = require('readline');
const draw = require('./draw');
const keys = require('./keys');
const actions = require('../actions');

module.exports = store => {
    const onStateChange = draw(store);
    store.subscribe(onStateChange);
    onStateChange();
    process.stdin.addListener('keypress', keys(store));
    process.stdout.addListener('resize', () => {
        const action = actions.resize({
            rows: process.stdout.rows,
            columns: process.stdout.columns
        });
        store.dispatch(action);
    });
    readline.emitKeypressEvents(process.stdin);
    process.stdin.setRawMode(true);
};