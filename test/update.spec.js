const explorerCli = require('../app/ui/setup');
const term = require('terminal-kit').terminal;

const setup = () => {
    term.reinit();
    term.height = 10;
    explorerCli({
        data: {
            list: []
        }
    });
};

describe('update', () => {
    test('[t][{ "name": "val" }] should set the value of the current path', () => {
        setup();
        term.press('p');
        term.input('list.0.key');
        term.press('t');
        term.input('{ "name": "val" }');
        term.press('c');
        expect(term.screen()).toEqual([
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
        setup();
        term.press('p');
        term.input('list');
        term.press('D');
        term.press('c');
        expect(term.screen()).toEqual([
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