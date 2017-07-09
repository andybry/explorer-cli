const output = require('./output');
const term = require('terminal-kit').terminal;

module.exports = store => () => {
    term.moveTo(1, 1);
    output(store.getState());
};