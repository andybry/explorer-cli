const EventEmitter = require('events');
const { merge } = require('lodash');
const { takeRight, last, first, flow, map } = require('lodash/fp');
const stripAnsi = require('strip-ansi');

const terminal = jest.fn();

merge(terminal, new EventEmitter, {
    fullscreen: jest.fn(),
    grabInput: jest.fn(),
    inputField: jest.fn(),
    moveTo: jest.fn(),
    clear: jest.fn(),
    height: 20,
    width: 30,
    // test utilities (not in terminal-kit library)
    reinit: function () {
        this.removeAllListeners()
    },
    press: function(key) {
        this.emit('key', key);
    },
    screen: function() {
        return flow(
            takeRight(this.height),
            map(flow(first, stripAnsi)),
        )(this.mock.calls);
    },
    input: function(str) {
        const cb = last(this.inputField.mock.calls)[0];
        cb(null, str);
    } 
});

module.exports = {
    terminal
}