const actions = require('../actions');
const { cond, matches } = require('lodash/fp');

module.exports = store => {
    const keyInput = (keyMatch, action) => [
        (chunk, key) => matches(keyMatch, key),
        () => store.dispatch(action())
    ];
    return cond([
        keyInput({ ctrl: true,  shift: false, name: 'c' }, actions.quit),
        keyInput({ ctrl: false, shift: false, name: 'q' }, actions.quit),
        keyInput({ ctrl: false, shift: false, name: 'j' }, actions.scrollDown),
        keyInput({ ctrl: false, shift: false, name: 'k' }, actions.scrollUp),
        keyInput({ ctrl: true,  shift: false, name: 'd' }, actions.scrollHalfScreenDown),
        keyInput({ ctrl: true,  shift: false, name: 'u' }, actions.scrollHalfScreenUp),
        keyInput({ ctrl: false, shift: true,  name: 'k' }, actions.toggleKeys),
        keyInput({ ctrl: false, shift: false, name: 'h' }, actions.toggleHelp),
        keyInput({ ctrl: false, shift: false, name: 's' }, actions.toggleState),
        keyInput({ ctrl: false, shift: false, name: 'c' }, actions.clear),
        keyInput({ ctrl: false, shift: false, name: 'u' }, () => actions.setRelativePath('..')),
        keyInput({ ctrl: false, shift: false, name: 'p' }, actions.inputPath),
        keyInput({ ctrl: false, shift: false, name: 'm' }, actions.inputMap),
        keyInput({ ctrl: false, shift: false, name: 'r' }, actions.inputRelativePath),
        keyInput({ ctrl: false, shift: false, name: 'x' }, actions.inputPick),
        keyInput({ ctrl: false, shift: false, name: 'o' }, actions.inputOmit),
        keyInput({ ctrl: false, shift: true,  name: 's' }, actions.inputSave),
        keyInput({ ctrl: false, shift: false, name: 't' }, actions.inputPathValue),
        keyInput({ ctrl: false, shift: true,  name: 'd' }, actions.deletePath),
        keyInput({ ctrl: false, shift: false, name: 'a' }, actions.inputAddCache),
        keyInput({ ctrl: false, shift: false, name: 'l' }, actions.inputLoadCache),
        keyInput({ ctrl: false, shift: true,  name: 'a' }, actions.inputDeleteCache),
        keyInput({ ctrl: false, shift: true,  name: 'c' }, actions.toggleCacheList),
        keyInput({ ctrl: false, shift: true,  name: 'r' }, actions.run),
        keyInput({ ctrl: false, shift: true,  name: 'z' }, actions.toggleAutosave),
    ]);
};