const explorerCli = require('..');
const Process = require('./Process');

const setup = () => {
    const proc = new Process({ rows: 10 });
    explorerCli({
        data: 'current data'
    }, proc);
    return proc;
};

describe('save', () => {
    test('[Shift-S]["file.json"] should save the current state to "file.json"', () => {
        const fs = require('fs');
        const proc = setup();
        proc.press({ ctrl: false, shift: true, name: 's' });
        proc.input('file.json');
        expect(fs.createWriteStream).toBeCalledWith('file.json');
        const json = JSON.parse(fs.write.mock.calls[0]);
        expect(json.data).toEqual("current data");
    });
});