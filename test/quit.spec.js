const explorerCli = require('..');
const Process = require('./Process');

const setup = () => {
    const proc = new Process();
    explorerCli({}, proc);
    return proc;
};

describe('quit', () => {
    test('[q] should exit the application', () => {
        const proc = setup();
        proc.press({ ctrl: false, shift: false, name: 'q' });
        expect(proc.hasExited).toBe(true);
    });

    test('[ctrl-c] should exit the application', () => {
        const proc = setup();
        proc.press({ ctrl: true, shift: false, name: 'c' });
        expect(proc.hasExited).toBe(true);
    });
});