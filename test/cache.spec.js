const explorerCli = require('../app/ui/setup');
const term = require('terminal-kit').terminal;

const setup = () => {
    term.reinit();
    term.height = 5;
    explorerCli({
        cache: {
            item1: 'data item 1',
            item2: 'data item 2',
            item3: 'data item 2',
        },
        data: 'initial data'
    });
};

describe('cache', () => {
    test('[shift-C] should display cache item names', () => {
        setup();
        term.press('C');
        expect(term.screen()).toEqual([
            '[                             ',
            '  "item1",                    ',
            '  "item2",                    ',
            '  "item3"                     ',
            ']                             ',
        ]);
    });

    test('[shift-C][shift-C] should display the initial data (again)', () => {
        setup();
        term.press('C');
        term.press('C');
        expect(term.screen()).toEqual([
            '"initial data"                ',
            '                              ',
            '                              ',
            '                              ',
            '                              ',
        ]);
    });

    test('[l]["item1"] should load the data from "item1"', () => {
        setup();
        term.press('l');
        term.input('item1');
        expect(term.screen()).toEqual([
            '"data item 1"                 ',
            '                              ',
            '                              ',
            '                              ',
            '                              ',
        ]);
    });

    test('[a]["item4"] should save the current data to be reloaded later', () => {
        setup();
        // save
        term.press('a');
        term.input('item4');
        // load other
        term.press('l');
        term.input('item1');
        // load saved data
        term.press('l');
        term.input('item4');
        expect(term.screen()).toEqual([
            '"initial data"                ',
            '                              ',
            '                              ',
            '                              ',
            '                              ',
        ]);
    });

    test('[A]["item1"] should remove "item1" from the cache', () => {
        setup();
        term.press('A');
        term.input('item1');
        term.press('C');
        expect(term.screen()).toEqual([
            '[                             ',
            '  "item2",                    ',
            '  "item3"                     ',
            ']                             ',
            '                              ',
        ]);
    });
});