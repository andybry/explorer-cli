const readline = require('readline');
const { trim, merge } = require('lodash/fp');
const actionTypes = require('../actions/actionTypes');
const actions = require('../actions');

let isProcessing = false;

const handleInputAction = (msg, action, store) => {
    readline.cursorTo(process.stdout, 0, 0);
    readline.clearScreenDown(process.stdout);
    process.stdout.write(msg);
    process.stdin.setRawMode(false);
    isProcessing = true;
    const inputHandler = chunk => {
        isProcessing = false;
        process.stdin.setRawMode(true);
        process.stdin.removeListener('data', inputHandler);
        const input = trim(chunk.toString());
        store.dispatch(action(input));
    };
    process.stdin.addListener('data', inputHandler);
};

module.exports = store => next => action => {
    if (isProcessing) return;
    switch (action.type) {
        case actionTypes.INPUT_PATH:
            handleInputAction('path: ', actions.setPath, store);
            return;
        case actionTypes.INPUT_RELATIVE_PATH:
            handleInputAction('rel path: ', actions.setRelativePath, store);
            return;
        case actionTypes.INPUT_MAP:
            handleInputAction('map: ', actions.setMap, store);
            return;
        case actionTypes.INPUT_PICK:
            handleInputAction('pick: ', actions.setPick, store);
            return;
        case actionTypes.INPUT_OMIT:
            handleInputAction('omit: ', actions.setOmit, store);
            return;
        case actionTypes.INPUT_SAVE:
            handleInputAction('save file: ', actions.save, store);
            return;
        default:
            return next(action);
    }
};

