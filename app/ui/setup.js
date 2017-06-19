const readline = require('readline');
const draw = require('./draw');
const keys = require('./keys');

module.exports = store => {
    const onStateChange = draw(store);
    store.subscribe(onStateChange);
    onStateChange();
    process.stdin.addListener('keypress', keys(store));
    readline.emitKeypressEvents(process.stdin);
    process.stdin.setRawMode(true);
};