const Stdin = require('./Stdin');
const Stdout = require('./Stdout');

module.exports = class Process {
    constructor(args = {}) {
        this.stdin = new Stdin();
        this.stdout = new Stdout(args);
        this.hasExited = false;
    }

    screen() {
        return this.stdout.screen();
    }

    press(key) {
        this.stdin.emit('keypress', null, key);
    }

    input(text) {
        this.stdin.emit('data', `${text}\n`);
    }

    exit(code) {
        this.hasExited = true;
    }
};