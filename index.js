const { configureStore } = require('./app/store');
const setup = require('./app/ui/setup');
setup(configureStore());

// Features, bugs and tech debt
// 
//      - centralise 'process' and 'readline' access to the UI?
//      - help page
//      - prevent scrolling past the ends
//      - don't buffer the commands (throttle them?)
//      - update columns and rows on screen resize
//      ? - grep lines (path grep somehow?)
//      - edit values instead of overwriting them
