const exploreCli = require('..');
const Process = require('./Process');
const expect = require('expect');

// setup
const p = new Process();
exploreCli({ data: { name: 'arb' } }, p);

// user interactions
p.press({ ctrl: false, shift: false, name: 's'});
p.press({ ctrl: false, shift: false, name: 'p'});
p.input('body.resources');

// expectations
expect(p.screen()).toEqual([ 
    '{                             ',
    '  "path": "body.resources",   ',
    '  "map": "",                  ',
    '  "pick": "",                 ',
    '  "omit": "",                 ',
    '  "keys": false,              ',
    '  "state": true,              ',
    '  "offset": 0,                ',
    '  "help": false,              ',
    '  "rows": 20,                 ',
    '  "columns": 30,              ',
    '  "showCache": false,         ',
    '  "filename": "",             ',
    '  "autosave": false           ',
    '}                             ',
    '                              ',
    '                              ',
    '                              ',
    '                              ',
    '                              '
]);