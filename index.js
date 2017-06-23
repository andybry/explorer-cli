const { configureStore } = require('./app/store');
const setup = require('./app/ui/setup');
const fs = require('fs');

const filename = process.argv[2];
const initialState = filename ? require(`./${filename}`) : undefined;
setup(configureStore(initialState));

// Features, bugs and tech debt
// 
//      - README
//      - bin file
//      - package.json updates: license, description, keywords etc.
//      - publish
//      - autosave (on state change)
//      - 1, 2, 3 shortcut for 'file', 'http', 'mongo' type
//
//      - output on falsy values
//      - centralise 'process' and 'readline' access to the UI?
//      - add logging (maybe separate screen?)
//      - prevent scrolling past the ends
//      - don't buffer the commands (debounce them?)
//      ? - grep lines (path grep somehow?)
//      - edit values instead of overwriting them
