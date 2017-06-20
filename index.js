const { configureStore } = require('./app/store');
const setup = require('./app/ui/setup');
const fs = require('fs');

const filename = process.argv[2];
const initialState = filename ? require(`./${filename}`) : undefined;
setup(configureStore(initialState));

// Features, bugs and tech debt
// 
//      - a/l/A: save to cache/load from cache/delete from cache
//      - read/write type: file
//      - read/write type: http/https request
//      - read/write type: mongo
//      - 1, 2, 3 shortcut for 'file', 'http', 'mongo' type
//
//      - output on falsy values
//      - help page
//      - centralise 'process' and 'readline' access to the UI?
//      - add logging (maybe separate screen?)
//      - prevent scrolling past the ends
//      - don't buffer the commands (debounce them?)
//      ? - grep lines (path grep somehow?)
//      - edit values instead of overwriting them
