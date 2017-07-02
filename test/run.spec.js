const explorerCli = require('..');
const Process = require('./Process');

const setup = runType => {
    const proc = new Process({ rows: 3 });
    explorerCli({
        data: { runType }
    }, proc);
    return proc;
};

describe('run', () => {
    test('[shift-R] should do nothing for unknown runTypes', () => {
        const proc = setup('unknown');
        proc.press({ ctrl: false, shift: true, name: 'r'});
        expect(proc.screen()).toEqual([
            '{                             ',
            '  "runType": "unknown"        ',
            '}                             ',
        ]);
    });

    test('[shift-R] should show the data when handler succeeds', () => {
        const proc = setup('succeeds');
        proc.press({ ctrl: false, shift: true, name: 'r'});
        expect(proc.screen()).toEqual([
            '"success data"                ',
            '                              ',
            '                              ',
        ]);
    });

    test('[shift-R] should show the error when handler errors', () => {
        const proc = setup('errors');
        proc.press({ ctrl: false, shift: true, name: 'r'});
        expect(proc.screen()).toEqual([
            '"error data"                  ',
            '                              ',
            '                              ',
        ]);
    });
});