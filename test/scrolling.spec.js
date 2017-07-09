const exploreCli = require('../app/ui/setup');
const term = require('terminal-kit').terminal;

const setup = (offset = 0) => {
    term.reinit();
    term.height = 6;
    exploreCli({ 
        offset,
        data: [
            'line 1',
            'line 2',
            'line 3',
            'line 4',
            'line 5',
            'line 6',
            'line 7',
            'line 8',
            'line 9',
        ]
    });
};

describe('scrolling', () => {
    test('should display initial state (no scrolling)', () => {
        setup();
        expect(term.screen()).toEqual([
            '[                             ',
            '  "line 1",                   ',
            '  "line 2",                   ',
            '  "line 3",                   ',
            '  "line 4",                   ',
            '  "line 5",                   ',
        ]);
    });

    test('[j] should scroll down one line', () => {
        setup();
        term.press('j');
        expect(term.screen()).toEqual([
            '  "line 1",                   ',
            '  "line 2",                   ',
            '  "line 3",                   ',
            '  "line 4",                   ',
            '  "line 5",                   ',
            '  "line 6",                   ',
        ]);
    });

    test('[ctrl-d] should scroll down half a screen', () => {
        setup();
        term.press('CTRL_D');
        expect(term.screen()).toEqual([
            '  "line 3",                   ',
            '  "line 4",                   ',
            '  "line 5",                   ',
            '  "line 6",                   ',
            '  "line 7",                   ',
            '  "line 8",                   ',
        ]);
    });

    test('[k] should scroll up one line', () => {
        setup(3);
        term.press('k');
        expect(term.screen()).toEqual([
            '  "line 2",                   ',
            '  "line 3",                   ',
            '  "line 4",                   ',
            '  "line 5",                   ',
            '  "line 6",                   ',
            '  "line 7",                   ',
        ]);
    });

    test('[ctrl-u] should scroll up half a screen', () => {
        setup(3);
        term.press('CTRL_U');
        expect(term.screen()).toEqual([
            '[                             ',
            '  "line 1",                   ',
            '  "line 2",                   ',
            '  "line 3",                   ',
            '  "line 4",                   ',
            '  "line 5",                   ',
        ]);
    });

    test('should not be possible to scroll before the first line', () => {
        setup();
        term.press('CTRL_U');
        expect(term.screen()).toEqual([
            '[                             ',
            '  "line 1",                   ',
            '  "line 2",                   ',
            '  "line 3",                   ',
            '  "line 4",                   ',
            '  "line 5",                   ',
        ]);
    });

    test('should not be possible to scroll past the last line', () => {
        setup(10);
        term.press('CTRL_D');
        expect(term.screen()).toEqual([
            ']                             ',
            '                              ',
            '                              ',
            '                              ',
            '                              ',
            '                              ',
        ]);
    });
});