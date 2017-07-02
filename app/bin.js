#!/usr/bin/env node
const setup = require('./ui/setup');
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
setup(initialState);

// Features, bugs and tech debt
// 
//      - quick load on number keys
//
//      - output on falsy values
//      - add logging (maybe separate screen?)
//      ? - grep lines (path grep somehow?)
//      - edit values instead of overwriting them
//      - run history (Ctrl-p and Ctrl-n)
