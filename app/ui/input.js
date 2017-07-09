const actions = require('../actions');
const { cond, matches, trim, eq, noop, curry } = require('lodash/fp');
const term = require('terminal-kit').terminal;

let isProcessing = false;

const keyInput = curry((store, [key, action]) => [
    eq(key),
    () => isProcessing ? noop : store.dispatch(action())
]);

const keys = store => cond([
    ['CTRL_C', actions.quit],
    ['q',      actions.quit],
    ['j',      actions.scrollDown],
    ['k',      actions.scrollUp],
    ['CTRL_D', actions.scrollHalfScreenDown],
    ['CTRL_U', actions.scrollHalfScreenUp],
    ['K',      actions.toggleKeys],
    ['h',      actions.toggleHelp],
    ['s',      actions.toggleState],
    ['c',      actions.clear],
    ['u',      () => actions.setRelativePath('..')],
    ['p',      actions.inputPath],
    ['m',      actions.inputMap],
    ['r',      actions.inputRelativePath],
    ['x',      actions.inputPick],
    ['o',      actions.inputOmit],
    ['S',      actions.inputSave],
    ['t',      actions.inputPathValue],
    ['D',      actions.deletePath],
    ['a',      actions.inputAddCache],
    ['l',      actions.inputLoadCache],
    ['A',      actions.inputDeleteCache],
    ['C',      actions.toggleCacheList],
    ['R',      actions.run],
    ['Z',      actions.toggleAutosave],
].map(keyInput(store)));

const text = (msg, cb) => {
    term.clear();
    term(msg);
    isProcessing = true;
    term.inputField((err, input) => {
        isProcessing = false;
        cb(input);
    });
};

module.exports = {
    keys,
    text,
};