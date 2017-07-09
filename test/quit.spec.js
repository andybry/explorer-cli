const explorerCli = require('../app/ui/setup');
const term = require('terminal-kit').terminal;
const { noop } = require('lodash/fp');

const setup = () => {
    term.reinit();
    jest.spyOn(process, 'exit').mockImplementation(noop);
    explorerCli({});
};

describe('quit', () => {

    afterEach(() => {
        process.exit.mockRestore();
    })

    test('[q] should exit the application', () => {
        setup();
        term.press('q');
        expect(process.exit).toHaveBeenCalledWith(0);
    });

    test('[ctrl-c] should exit the application', () => {
        setup();
        term.press('CTRL_C');
        expect(process.exit).toHaveBeenCalledWith(0);
    });
});