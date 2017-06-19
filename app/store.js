const { createStore, combineReducers, applyMiddleware } = require('redux');
const actionTypes = require('./actions/actionTypes')
const actions = require('./actions')
const data = require('../shows.json');
const helpText = [
    'This would be the help',
    'screen'
];
const readline = require('readline');
const { trim, merge, cond, constant, replace, stubTrue, eq } = require('lodash/fp');

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

const mainReducer = combineReducers({
    path: (state = '', action) => {
        switch (action.type) {
            case actionTypes.SET_PATH:
                return action.path;
            case actionTypes.SET_RELATIVE_PATH:
                return cond([
                    [ () => eq('', state), constant(action.path) ],
                    [ () => eq('', action.path), constant(state) ],
                    [ () => eq('.', action.path), constant(state) ],
                    [ () => eq('..', action.path), () => replace(/\.?[^.]*?$/, '', state)],
                    [ stubTrue, () => `${state}.${action.path}` ]
                ])();
            default:
                return state;
        }
    },
    map: (state = '', action) => {
        switch (action.type) {
            case actionTypes.SET_MAP:
                return action.map;
            default:
                return state;
        }
    },
    pick: (state = '', action) => {
        switch (action.type) {
            case actionTypes.SET_PICK:
                return action.pick;
            default:
                return state;
        }
    },
    omit: (state = '', action) => {
        switch (action.type) {
            case actionTypes.SET_OMIT:
                return action.omit;
            default:
                return state;
        }
    },
    keys: (state = false, action) => {
        switch (action.type) {
            case actionTypes.TOGGLE_KEYS:
                return !state;
            default:
                return state;
        }
    },
    state: (state = false, action) => {
        switch (action.type) {
            case actionTypes.TOGGLE_STATE:
                return !state;
            default:
                return state;
        }
    },
    offset: (state = 0, action) => {
        switch (action.type) {
            case actionTypes.SCROLL_DOWN:
                return state + 1;
            case actionTypes.SCROLL_UP:
                return state - 1;
            case actionTypes.SCROLL_HALF_SCREEN_DOWN:
                return state + Math.ceil(action.rows / 2);
            case actionTypes.SCROLL_HALF_SCREEN_UP:
                return state - Math.ceil(action.rows / 2);
            case actionTypes.TOGGLE_KEYS:
            case actionTypes.TOGGLE_STATE:
            case actionTypes.TOGGLE_HELP:
            case actionTypes.SET_PATH:
            case actionTypes.SET_RELATIVE_PATH:
            case actionTypes.SET_MAP:
            case actionTypes.SET_PICK:
            case actionTypes.SET_OMIT:
                return 0;
            default:
                return state;
        }
    },
    help: (state = false, action) => {
        switch (action.type) {
            case actionTypes.TOGGLE_HELP:
                return !state;
            default:
                return state;
        }
    },
    rows: (state = process.stdout.rows, action) => state,
    columns: (state = process.stdout.columns, action) => state,
    helpText: (state = helpText, action) => state,
    data: (state = data, action) => state,
});

const configureStore = () => createStore((state, action) => {
    if (action.type === actionTypes.CLEAR) state = undefined;
    return mainReducer(state, action);
}, applyMiddleware(store => next => action => {
    if (isProcessing) return;
    switch (action.type) {
        case actionTypes.QUIT:
            readline.cursorTo(process.stdout, 0, 0);
            readline.clearScreenDown(process.stdout);
            process.exit(0);
        case actionTypes.SCROLL_HALF_SCREEN_DOWN:
        case actionTypes.SCROLL_HALF_SCREEN_UP: {
            const newAction = merge(action, {
                rows: store.getState().rows
            });
            return next(newAction);
        }
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
    }
    return next(action);
}));

module.exports = {
    configureStore
};