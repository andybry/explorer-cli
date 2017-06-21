const { 
    padEnd, take, each, flow, truncate, split, drop, keys, get,
    map, replace, pick, omit
} = require('lodash/fp');

const chalk = require('chalk');
const cDelim = chalk.cyan;
const cKey = chalk.yellow;
const cStr = chalk.green;
const cVal = chalk.red;

module.exports = state => flow(
    x => state.path ? get(state.path, x) || {} : x,
    x => state.map ? map(state.map, x) || {} : x,
    x => state.pick ? pick(state.pick.split(','), x) : x,
    x => state.omit ? omit(state.omit.split(','), x) : x,
    x => state.keys ? keys(x) : x,
    x => state.state ? omit(['data', 'helpText', 'cache'], state) : x,
    x => state.help ? state.helpText : x,
    x => state.showCache ? keys(state.cache) : x,
    x => JSON.stringify(x, null, 2),
    split('\n'),
    xs => drop(state.offset, xs),
    take(state.rows),
    xs => {
        const ret = new Array(state.rows);
        xs.forEach((x, i) => ret[i] = x);
        return ret;
    },
    each(flow(
        truncate({ length: state.columns, omission: '' }),
        padEnd(state.columns),
        // color {} and [] and trailing commas
        replace(/({|}|\[|\])(,?)(\s+)$/, cDelim('$1$2$3')),
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
        x => process.stdout.write(x)
    ))
)(state.data);
