const term = require('terminal-kit').terminal;

module.exports = () => {
    term.clear();
    process.exit(0);
};