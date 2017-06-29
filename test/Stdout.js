const EventEmitter = require('events');
const stripAnsi = require('strip-ansi');
const { identity, takeRight } = require('lodash/fp');

module.exports = class Stdout extends EventEmitter {
    constructor({ rows = 20, columns = 30, stripColor = true } = {}) {
        super();
        this.rows = rows;
        this.columns = columns;
        this.strip = stripColor ? stripAnsi : identity;
        this.chunks = [];
    }

    write(chunk) {
        this.chunks.push(this.strip(chunk));
    }

    screen() {
        return takeRight(this.rows, this.chunks);
    }
};