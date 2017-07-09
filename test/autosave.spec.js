const explorerCli = require('../app/ui/setup');
const { last } = require('lodash/fp');
const term = require('terminal-kit').terminal;

const setup = () => {
    term.reinit();
    term.height = 10;
    explorerCli({
        data: {
            key: 'initial value'
        },
        filename: 'autosave.json',
        autosave: true
    });
};

describe('autosave', () => {
    test('should automatically save changes when filename and autosave are set', () => {
        setup();
        const fs = require('fs');
        term.press('p');
        term.input('key');
        term.press('t');
        term.input('new value');
        expect(fs.createWriteStream).toBeCalledWith('autosave.json');
        const json = JSON.parse(last(fs.write.mock.calls)[0], null, 2);
        expect(json.data).toEqual({ key: 'new value' });
    });

    test('[shift-Z] should turn off autosave', () => {
        const fs = require('fs');
        setup();
        term.press('Z');
        term.press('p');
        term.input('key');
        term.press('t');
        term.input('new value');
        const json = JSON.parse(last(fs.write.mock.calls)[0], null, 2);
        expect(json.data).toEqual({ key: 'initial value' });
    });
});