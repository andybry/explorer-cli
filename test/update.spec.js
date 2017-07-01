const explorerCli = require('..');
const Process = require('./Process');

const setup = () => {
    const proc = new Process({ rows: 10 });
    explorerCli({
        data: {
            list: []
        }
    }, proc);
    return proc;
};

describe('update', () => {
    test('[t][{ "name": "val" }] should set the value of the current path', () => {
        const proc = setup();
        proc.press({ ctrl: false, shift: false, name: 'p' });
        proc.input('list.0.key');
        proc.press({ ctrl: false, shift: false, name: 't' });
        proc.input('{ "name": "val" }');
        proc.press({ ctrl: false, shift: false, name: 'c' });
        expect(proc.screen()).toEqual([
            '{                             ',
            '  "list": [                   ',
            '    {                         ',
            '      "key": {                ',
            '        "name": "val"         ',
            '      }                       ',
            '    }                         ',
            '  ]                           ',
            '}                             ',
            '                              ',
        ]);
    });

    test('[Shift-D] should delete the node at the current path', () => {
        const proc = setup();
        proc.press({ ctrl: false, shift: false, name: 'p' });
        proc.input('list');
        proc.press({ ctrl: false, shift: true , name: 'd' });
        expect(proc.screen()).toEqual([
            '{}                            ',
            '                              ',
            '                              ',
            '                              ',
            '                              ',
            '                              ',
            '                              ',
            '                              ',
            '                              ',
            '                              ',
        ]);
    });
});