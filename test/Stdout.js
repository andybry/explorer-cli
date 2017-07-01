const EventEmitter = require('events');
const stripAnsi = require('strip-ansi');
const { takeRight } = require('lodash/fp');

module.exports = class Stdout extends EventEmitter {
    constructor({ rows = 20, columns = 30 }) {
        super();
        this.rows = rows;
        this.columns = 30;
        this.chunks = [];
    }

    write(chunk) {
        this.chunks.push(stripAnsi(chunk));
    }

    screen() {
        return takeRight(this.rows, this.chunks);
    }
};