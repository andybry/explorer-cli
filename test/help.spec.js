const explorerCli = require('..');
const Process = require('./Process');

const setup = () => {
    const proc = new Process({ rows: 1 });
    explorerCli({
        helpText: 'help text',
        data: 'initial data'
    }, proc);
    return proc;
};

describe('help', () => {
    test('[h] should show the help text', () => {
        const proc = setup();
        proc.press({ ctrl: false, shift: false, name: 'h' });
        expect(proc.screen()).toEqual([
            '"help text"                   '
        ]);
    });

    test('[h][h] should show the initial data (again)', () => {
        const proc = setup();
        proc.press({ ctrl: false, shift: false, name: 'h' });
        proc.press({ ctrl: false, shift: false, name: 'h' });
        expect(proc.screen()).toEqual([
            '"initial data"                '
        ]);
    });
});