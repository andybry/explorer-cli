const { 
    padEnd, take, each, flow, truncate,
    split, drop, cond, matches, keys,
    fill, repeat, get, trim, map, merge,
    eq, constant, stubTrue, replace, pick,
    omit
} = require('lodash/fp');
const chalk = require('chalk');
const json = require('./shows.json');
const help = [
    'This would be the help',
    'screen'
];
const readline = require('readline');

const defaultState = {
    path: '',
    map: '',
    pick: '',
    omit: '',
    keys: false,
    state: false,
    offset: 0,
    processingInput: false,
    help: false
};

const rows = process.stdout.rows;
const columns = process.stdout.columns;
let state = merge({}, defaultState);

const cDelim = chalk.cyan;
const cKey = chalk.yellow;
const cStr = chalk.green;
const cVal = chalk.red;

const output = flow(
    x => state.path ? get(state.path, x) || {} : x,
    x => state.map ? map(state.map, x) || {} : x,
    x => state.pick ? pick(state.pick.split(','), x) : x,
    x => state.omit ? omit(state.omit.split(','), x) : x,
    x => state.keys ? keys(x) : x,
    x => state.state ? state : x,
    x => state.help ? help : x,
    x => JSON.stringify(x, null, 2),
    split('\n'),
    xs => drop(state.offset, xs),
    take(rows),
    xs => {
        const ret = new Array(rows);
        xs.forEach((x, i) => ret[i] = x);
        return ret;
    },
    each(flow(
        truncate({ length: columns, omission: '' }),
        padEnd(columns),
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
);

const draw = () => {
    readline.cursorTo(process.stdout, 0, 0);
    output(json);
}

const keyInput = (keyMatch, handler, doDraw = true) => [
    (chunk, key) => matches(keyMatch, key),
    () => {
        if (state.processingInput) return;
        handler();
        if (doDraw) draw();
    }
];

const lineInput = (keyMatch, msg, handler) => keyInput(keyMatch, () => {
    readline.cursorTo(process.stdout, 0, 0);
    readline.clearScreenDown(process.stdout);
    process.stdout.write(msg);
    process.stdin.setRawMode(false);
    state.processingInput = true;
    const inputHandler = chunk => {
        const input = trim(chunk.toString());
        handler(input);
        process.stdin.setRawMode(true);
        process.stdin.removeListener('data', inputHandler);
        state.processingInput = false;
        draw();
    }
    process.stdin.addListener('data', inputHandler);
}, false);

const quit = () => {
    readline.cursorTo(process.stdout, 0, 0);
    readline.clearScreenDown(process.stdout);
    process.exit(0)
};

process.stdin.on('keypress', cond([
    keyInput({ ctrl: true, name: 'c' }, quit),
    keyInput({ name: 'q' }, quit),
    keyInput({ name: 'j' }, () => state.offset++),
    keyInput({ shift: false, name: 'k' }, () => state.offset--),
    keyInput({ ctrl: true, name: 'd' }, () => state.offset += Math.ceil(rows / 2)),
    keyInput({ ctrl: true, name: 'u' }, () => state.offset -= Math.ceil(rows / 2)),
    keyInput({ shift: true, name: 'k' }, () => Object.assign(state, {
        keys: !state.keys,
        offset: 0
    })),
    keyInput({ name: 'h' }, () => Object.assign(state, {
        help: !state.help,
        offset: 0
    })),
    keyInput({ name: 's' }, () => Object.assign(state, {
        state: !state.state,
        offset: 0
    })),
    keyInput({ name: 'c' }, () => Object.assign(state, defaultState)),
    keyInput({ name: 'u' }, () => Object.assign(state, {
        path: replace(/\.?[^.]*?$/, '', state.path),
        offset: 0
    })),
    lineInput({ name: 'p' }, 'path: ', path => Object.assign(state, {
        path,
        map: '',
        offset: 0
    })),
    lineInput({ name: 'm' }, 'map: ', map => Object.assign(state, {
        map,
        offset: 0
    })),
    lineInput({ name: 'r' }, 'rel path: ', relPath => Object.assign(state, {
        path: cond([
            [ () => eq('', state.path), constant(relPath) ],
            [ () => eq('', relPath), constant(state.path) ],
            [ () => eq('.', relPath), constant(state.path) ],
            [ () => eq('..', relPath), () => replace(/\.?[^.]*?$/, '', state.path)],
            [ stubTrue, () => `${state.path}.${relPath}` ]
        ])(),
        offset: 0
    })),
    lineInput({ name: 'x' }, 'pick: ', pick => Object.assign(state, {
        pick,
        offset: 0
    })),
    lineInput({ name: 'o' }, 'omit: ', omit => Object.assign(state, {
        omit,
        offset: 0
    })),
]));

readline.emitKeypressEvents(process.stdin);
process.stdin.setRawMode(true);
draw();

// Features, bugs and tech debt
// 
//      - help page
//      - refactor to use Redux for state management
//      - prevent scrolling past the ends
//      - don't buffer the commands (throttle them?)
//      - update columns and rows on screen resize
//      ? - grep lines (path grep somehow?)
//      - edit values instead of overwriting them
