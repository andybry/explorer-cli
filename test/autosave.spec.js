const explorerCli = require('..');
const Process = require('./Process');
const { last } = require('lodash/fp');

const setup = () => {
    const proc = new Process({ rows: 10 });
    explorerCli({
        data: {
            key: 'initial value'
        },
        filename: 'autosave.json',
        autosave: true
    }, proc);
    return proc;
};

describe('autosave', () => {
    test('should automatically save changes when filename and autosave are set', () => {
        const fs = require('fs');
        const proc = setup();
        proc.press({ ctrl: false, shift: false, name: 'p' });
        proc.input('key');
        proc.press({ ctrl: false, shift: false, name: 't' });
        proc.input('new value');
        expect(fs.createWriteStream).toBeCalledWith('autosave.json');
        const json = JSON.parse(last(fs.write.mock.calls)[0], null, 2);
        expect(json.data).toEqual({ key: 'new value' });
    });

    test('[shift-Z] should turn off autosave', () => {
        const fs = require('fs');
        const proc = setup();
        proc.press({ ctrl: false, shift: true , name: 'z' });
        proc.press({ ctrl: false, shift: false, name: 'p' });
        proc.input('key');
        proc.press({ ctrl: false, shift: false, name: 't' });
        proc.input('new value');
        const json = JSON.parse(last(fs.write.mock.calls)[0], null, 2);
        expect(json.data).toEqual({ key: 'initial value' });
    });
});