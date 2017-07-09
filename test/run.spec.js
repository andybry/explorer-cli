const explorerCli = require('../app/ui/setup');
const term = require('terminal-kit').terminal;

const setup = runType => {
    term.reinit();
    term.height = 3;
    explorerCli({
        data: { runType }
    });
};

describe('run', () => {
    test('[shift-R] should do nothing for unknown runTypes', () => {
        setup('unknown');
        term.press('R');
        expect(term.screen()).toEqual([
            '{                             ',
            '  "runType": "unknown"        ',
            '}                             ',
        ]);
    });

    test('[shift-R] should show the data when handler succeeds', () => {
        setup('succeeds');
        term.press('R');
        expect(term.screen()).toEqual([
            '"success data"                ',
            '                              ',
            '                              ',
        ]);
    });

    test('[shift-R] should show the error when handler errors', () => {
        setup('errors');
        term.press('R');
        expect(term.screen()).toEqual([
            '"error data"                  ',
            '                              ',
            '                              ',
        ]);
    });
});