const explorerCli = require('../app/ui/setup');
const term = require('terminal-kit').terminal;

const setup = () => {
    term.reinit();
    term.height = 15;
    explorerCli({
        data: 'initial data'
    });
};

describe('state', () => {
    test('[s] should show the state', () => {
        setup();
        term.press('s');
        expect(term.screen()).toEqual([
            '{                             ',
            '  "path": "",                 ',
            '  "map": "",                  ',
            '  "pick": "",                 ',
            '  "omit": "",                 ',
            '  "keys": false,              ',
            '  "state": true,              ',
            '  "offset": 0,                ',
            '  "help": false,              ',
            '  "rows": 15,                 ',
            '  "columns": 30,              ',
            '  "showCache": false,         ',
            '  "filename": "",             ',
            '  "autosave": false           ',
            '}                             ',
        ]);
    });

    test('[s][s] should show the initial data (again)', () => {
        setup();
        term.press('s');
        term.press('s');
        expect(term.screen()).toEqual([
            '"initial data"                ',
            '                              ',
            '                              ',
            '                              ',
            '                              ',
            '                              ',
            '                              ',
            '                              ',
            '                              ',
            '                              ',
            '                              ',
            '                              ',
            '                              ',
            '                              ',
            '                              ',
        ]);
    });
});