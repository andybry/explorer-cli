const output = require('./output');
const readline = require('readline');

module.exports = (proc, store) => () => {
    readline.cursorTo(proc.stdout, 0, 0);
    output(proc, store.getState());
};