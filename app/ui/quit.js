const readline = require('readline');

module.exports = proc => {
    readline.cursorTo(proc.stdout, 0, 0);
    readline.clearScreenDown(proc.stdout);
    proc.exit(0);
};