const explorerCli = require('..');
const Process = require('./Process');

const setup = () => {
    const proc = new Process({ rows: 5 });
    explorerCli({
        cache: {
            item1: 'data item 1',
            item2: 'data item 2',
            item3: 'data item 2',
        },
        data: 'initial data'
    }, proc);
    return proc;
};

describe('cache', () => {
    test('[shift-C] should display cache item names', () => {
        const proc = setup();
        proc.press({ ctrl: false, shift: true, name: 'c' });
        expect(proc.screen()).toEqual([
            '[                             ',
            '  "item1",                    ',
            '  "item2",                    ',
            '  "item3"                     ',
            ']                             ',
        ]);
    });

    test('[shift-C][shift-C] should display the initial data (again)', () => {
        const proc = setup();
        proc.press({ ctrl: false, shift: true, name: 'c' });
        proc.press({ ctrl: false, shift: true, name: 'c' });
        expect(proc.screen()).toEqual([
            '"initial data"                ',
            '                              ',
            '                              ',
            '                              ',
            '                              ',
        ]);
    });

    test('[l]["item1"] should load the data from "item1"', () => {
        const proc = setup();
        proc.press({ ctrl: false, shift: false, name: 'l' });
        proc.input('item1');
        expect(proc.screen()).toEqual([
            '"data item 1"                 ',
            '                              ',
            '                              ',
            '                              ',
            '                              ',
        ]);
    });

    test('[a]["item4"] should save the current data to be reloaded later', () => {
        const proc = setup();
        // save
        proc.press({ ctrl: false, shift: false, name: 'a' });
        proc.input('item4');
        // load other
        proc.press({ ctrl: false, shift: false, name: 'l' });
        proc.input('item1');
        // load saved data
        proc.press({ ctrl: false, shift: false, name: 'l' });
        proc.input('item4');
        expect(proc.screen()).toEqual([
            '"initial data"                ',
            '                              ',
            '                              ',
            '                              ',
            '                              ',
        ]);
    });

    test('[A]["item1"] should remove "item1" from the cache', () => {
        const proc = setup();
        proc.press({ ctrl: false, shift: true, name: 'a' });
        proc.input('item1');
        proc.press({ ctrl: false, shift: true, name: 'c' });
        expect(proc.screen()).toEqual([
            '[                             ',
            '  "item2",                    ',
            '  "item3"                     ',
            ']                             ',
            '                              ',
        ]);
    });
});