const explorerCli = require('../app/ui/setup');
const term = require('terminal-kit').terminal;

const setup = () => {
    term.reinit();
    term.height = 10;
    explorerCli({
        data: 'current data'
    });
};

describe('save', () => {
    test('[shift-S]["file.json"] should save the current state to "file.json"', () => {
        const fs = require('fs');
        setup();
        term.press('S');
        term.input('file.json');
        expect(fs.createWriteStream).toBeCalledWith('file.json');
        const json = JSON.parse(fs.write.mock.calls[0][0]);
        expect(json.data).toEqual("current data");
    });
});