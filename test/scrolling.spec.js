const exploreCli = require('../app/ui/setup');
const Process = require('./Process');

const setup = (offset = 0) => {
    const proc = new Process({ rows: 6 });
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
    }, proc);
    return proc;
};

describe('scrolling', () => {
    test('should display initial state (no scrolling)', () => {
        const proc = setup();
        expect(proc.screen()).toEqual([
            '[                             ',
            '  "line 1",                   ',
            '  "line 2",                   ',
            '  "line 3",                   ',
            '  "line 4",                   ',
            '  "line 5",                   ',
        ]);
    });

    test('[i] should scroll down one line', () => {
        const proc = setup();
        proc.press({ ctrl: false, shift: false, name: 'j' });
        expect(proc.screen()).toEqual([
            '  "line 1",                   ',
            '  "line 2",                   ',
            '  "line 3",                   ',
            '  "line 4",                   ',
            '  "line 5",                   ',
            '  "line 6",                   ',
        ]);
    });

    test('[ctrl-d] should scroll down half a screen', () => {
        const proc = setup();
        proc.press({ ctrl: true, shift: false, name: 'd' });
        expect(proc.screen()).toEqual([
            '  "line 3",                   ',
            '  "line 4",                   ',
            '  "line 5",                   ',
            '  "line 6",                   ',
            '  "line 7",                   ',
            '  "line 8",                   ',
        ]);
    });

    test('[k] should scroll up one line', () => {
        const proc = setup(3);
        proc.press({ ctrl: false, shift: false, name: 'k' });
        expect(proc.screen()).toEqual([
            '  "line 2",                   ',
            '  "line 3",                   ',
            '  "line 4",                   ',
            '  "line 5",                   ',
            '  "line 6",                   ',
            '  "line 7",                   ',
        ]);
    });

    test('[ctrl-u] should scroll up half a screen', () => {
        const proc = setup(3);
        proc.press({ ctrl: true, shift: false, name: 'u' });
        expect(proc.screen()).toEqual([
            '[                             ',
            '  "line 1",                   ',
            '  "line 2",                   ',
            '  "line 3",                   ',
            '  "line 4",                   ',
            '  "line 5",                   ',
        ]);
    });

    test('should not be possible to scroll before the first line', () => {
        const proc = setup();
        proc.press({ ctrl: true, shift: false, name: 'u' });
        expect(proc.screen()).toEqual([
            '[                             ',
            '  "line 1",                   ',
            '  "line 2",                   ',
            '  "line 3",                   ',
            '  "line 4",                   ',
            '  "line 5",                   ',
        ]);
    });

    test('should not be possible to scroll past the last line', () => {
        const proc = setup(10);
        proc.press({ ctrl: true, shift: false, name: 'd' });
        expect(proc.screen()).toEqual([
            ']                             ',
            '                              ',
            '                              ',
            '                              ',
            '                              ',
            '                              ',
        ]);
    });
});