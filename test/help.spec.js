const explorerCli = require('../app/ui/setup');
const term = require('terminal-kit').terminal;

const setup = () => {
    term.reinit();
    term.height = 1;
    explorerCli({
        helpText: 'help text',
        data: 'initial data'
    });
};

describe('help', () => {
    test('[h] should show the help text', () => {
        setup();
        term.press('h');
        expect(term.screen()).toEqual([
            '"help text"                   '
        ]);
    });

    test('[h][h] should show the initial data (again)', () => {
        setup();
        term.press('h');
        term.press('h');
        expect(term.screen()).toEqual([
            '"initial data"                '
        ]);
    });
});