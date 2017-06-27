#!/usr/bin/env node
const { configureStore } = require('./app/store');
const setup = require('./app/ui/setup');
const fs = require('fs');

const filename = process.argv[2];
let initialState = undefined;
if (filename) {
    try {
        const jsonStr = fs.readFileSync(filename, 'utf8');
        initialState = JSON.parse(jsonStr);
    } catch (e) {
        initialState = {};
    }
    initialState.filename = filename;
    initialState.autosave = true;
}
setup(configureStore(initialState));

// Features, bugs and tech debt
// 
//      - quick load on number keys
//
//      - output on falsy values
//      - centralise 'process' and 'readline' access to the UI?
//      - add logging (maybe separate screen?)
//      ? - grep lines (path grep somehow?)
//      - edit values instead of overwriting them
