const { 
    padEnd, take, each, flow, truncate, drop, replace
} = require('lodash/fp');
const lines = require('./lines');
const term = require('terminal-kit').terminal;

const chalk = require('chalk');
const cDelim = chalk.cyan;
const cKey = chalk.yellow;
const cStr = chalk.green;
const cVal = chalk.red;

module.exports = state => flow(
    lines,
    drop(state.offset),
    take(state.rows),
    xs => { // pad to screen size
        const ret = new Array(state.rows);
        xs.forEach((x, i) => ret[i] = x);
        return ret;
    },
    each(flow(
        truncate({ length: state.columns, omission: '' }),
        padEnd(state.columns),
        // color {} and [] and trailing commas
        replace(/({|}|{}|\[|\]|\[\])(,?)(\s+)$/, cDelim('$1$2$3')),
        // primitive values
        replace(/([0-9a-zA-Z]+)(,?)(\s+)$/, cVal('$1') + cDelim('$2$3')),
        // strings (with keys)
        replace(
            /^(\s+)"(.+)": "(.*?)("?)(,?)(\s+)?$/,
            cDelim('$1"') + cKey('$2') + cDelim('": "') + cStr('$3') + cDelim('$4$5$6')
        ),
        // keys
        replace(/^(\s+)"(.+)":/, cDelim('$1"') + cKey('$2') + cDelim('":') ),
        // strings (without keys)
        replace(
            /^(\s*)"(.*?)("?)(,?)(\s+)?$/,
            cDelim('$1"') + cStr('$2') + cDelim('$3$4$5')
        ),
        // term
        x => process.stdout.write(x)
    ))
)(state);
