const explorerCli = require('..');
const Process = require('./Process');

const setup = () => {
    const proc = new Process({ rows: 15 });
    explorerCli({
        data: 'initial data'
    }, proc);
    return proc;
};

describe('state', () => {
    test('[s] should show the state', () => {
        const proc = setup();
        proc.press({ ctrl: false, shift: false, name: 's' });
        expect(proc.screen()).toEqual([
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
        const proc = setup();
        proc.press({ ctrl: false, shift: false, name: 's' });
        proc.press({ ctrl: false, shift: false, name: 's' });
        expect(proc.screen()).toEqual([
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