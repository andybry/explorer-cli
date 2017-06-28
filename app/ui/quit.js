const readline = require('readline');

module.exports = () => {
    readline.cursorTo(process.stdout, 0, 0);
    readline.clearScreenDown(process.stdout);
    process.exit(0);
};