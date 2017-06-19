const output = require('./output');
const readline = require('readline');

module.exports = store => () => {
    readline.cursorTo(process.stdout, 0, 0);
    output(store.getState());
};