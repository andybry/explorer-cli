const { configureStore } = require('./app/store');
const { 
    padEnd, take, each, flow, truncate,
    split, drop, cond, matches, keys,
    fill, repeat, get, trim, map, merge,
    eq, constant, stubTrue, replace, pick,
    omit
} = require('lodash/fp');
const chalk = require('chalk');
const readline = require('readline');

const actions = require('./app/actions')
const store = configureStore();

const cDelim = chalk.cyan;
const cKey = chalk.yellow;
const cStr = chalk.green;
const cVal = chalk.red;

const output = state => flow(
    x => state.path ? get(state.path, x) || {} : x,
    x => state.map ? map(state.map, x) || {} : x,
    x => state.pick ? pick(state.pick.split(','), x) : x,
    x => state.omit ? omit(state.omit.split(','), x) : x,
    x => state.keys ? keys(x) : x,
    x => state.state ? omit(['data', 'helpText'], state) : x,
    x => state.help ? state.helpText : x,
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

const draw = () => {
    readline.cursorTo(process.stdout, 0, 0);
    output(store.getState());
}
store.subscribe(draw);
draw();

const keyInput = (keyMatch, action) => [
    (chunk, key) => matches(keyMatch, key),
    () => store.dispatch(action())
];

process.stdin.addListener('keypress', cond([
    keyInput({ ctrl: true, name: 'c' }, actions.quit),
    keyInput({ name: 'q' }, actions.quit),
    keyInput({ name: 'j' }, actions.scrollDown),
    keyInput({ shift: false, name: 'k' }, actions.scrollUp),
    keyInput({ ctrl: true, name: 'd' }, actions.scrollHalfScreenDown),
    keyInput({ ctrl: true, name: 'u' }, actions.scrollHalfScreenUp),
    keyInput({ shift: true, name: 'k' }, actions.toggleKeys),
    keyInput({ name: 'h' }, actions.toggleHelp),
    keyInput({ name: 's' }, actions.toggleState),
    keyInput({ name: 'c' }, actions.clear),
    keyInput({ name: 'u' }, () => actions.setRelativePath('..')),
    keyInput({ name: 'p' }, actions.inputPath),
    keyInput({ name: 'm' }, actions.inputMap),
    keyInput({ name: 'r' }, actions.inputRelativePath),
    keyInput({ name: 'x' }, actions.inputPick),
    keyInput({ name: 'o' }, actions.inputOmit)
]));

readline.emitKeypressEvents(process.stdin);
process.stdin.setRawMode(true);

// Features, bugs and tech debt
// 
//      - help page
//      - prevent scrolling past the ends
//      - don't buffer the commands (throttle them?)
//      - update columns and rows on screen resize
//      ? - grep lines (path grep somehow?)
//      - edit values instead of overwriting them
