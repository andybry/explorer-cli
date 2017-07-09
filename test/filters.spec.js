const explorerCli = require('../app/ui/setup');
const term = require('terminal-kit').terminal;

const setup = () => {
    term.height = 6;
    term.reinit();
    explorerCli({
        data: {
            statusCode: 200,
            body: {
                list: [
                    {
                        item0: 'data 00',
                        item1: 'data 01',
                        item2: 'data 02'
                    },
                    {
                        item0: 'data 10',
                        item1: 'data 11',
                        item2: 'data 12'
                    },
                    {
                        item0: 'data 20',
                        item1: 'data 21',
                        item2: 'data 22'
                    }
                ]
            },
            headers: {
                'User-Agent': 'request'
            }
        }
    });
};

describe('filters', () => {
    test('[Shift-K] should list the keys at current path', () => {
        setup();
        term.press('K');
        expect(term.screen()).toEqual([
            '[                             ',
            '  "statusCode",               ',
            '  "body",                     ',
            '  "headers"                   ',
            ']                             ',
            '                              ',
        ]);
    });

    test('[Shift-K][Shift-K] should show the initial data (again)', () => {
        setup();
        term.press('K');
        term.press('K');
        expect(term.screen()).toEqual([
            '{                             ',
            '  "statusCode": 200,          ',
            '  "body": {                   ',
            '    "list": [                 ',
            '      {                       ',
            '        "item0": "data 00",   ',
        ]);
    });

    test('[p]["body.list.0"] should show the data at the given path', () => {
        setup();
        term.press('p');
        term.input('body.list.0');
        expect(term.screen()).toEqual([
            '{                             ',
            '  "item0": "data 00",         ',
            '  "item1": "data 01",         ',
            '  "item2": "data 02"          ',
            '}                             ',
            '                              ',
        ]);
    });

    test('[r][".."] should show move up one level in the path', () => {
        setup();
        term.press('p');
        term.input('body.list.0');
        term.press('r');
        term.input('..');
        expect(term.screen()).toEqual([
            '[                             ',
            '  {                           ',
            '    "item0": "data 00",       ',
            '    "item1": "data 01",       ',
            '    "item2": "data 02"        ',
            '  },                          ',
        ]);
    });

    test('[r]["list.2"] should set the path relative to current path', () => {
        setup();
        term.press('p');
        term.input('body');
        term.press('r');
        term.input('list.2');
        expect(term.screen()).toEqual([
            '{                             ',
            '  "item0": "data 20",         ',
            '  "item1": "data 21",         ',
            '  "item2": "data 22"          ',
            '}                             ',
            '                              ',
        ]);
    });

    test('[m]["item1"] should select the value of a property when at an array', () => {
        setup();
        term.press('p');
        term.input('body.list');
        term.press('m');
        term.input('item1');
        expect(term.screen()).toEqual([
            '[                             ',
            '  "data 01",                  ',
            '  "data 11",                  ',
            '  "data 21"                   ',
            ']                             ',
            '                              ',
        ]);
    });

    test('[o]["body,headers"] should omit the selected keys', () => {
        setup();
        term.press('o');
        term.input('body,headers');
        expect(term.screen()).toEqual([
            '{                             ',
            '  "statusCode": 200           ',
            '}                             ',
            '                              ',
            '                              ',
            '                              ',
        ]);
    });

    test('[x]["statusCode,headers"] should show only the selected keys', () => {
        setup();
        term.press('x');
        term.input('statusCode,headers');
        expect(term.screen()).toEqual([
            '{                             ',
            '  "statusCode": 200,          ',
            '  "headers": {                ',
            '    "User-Agent": "request"   ',
            '  }                           ',
            '}                             ',
        ]);
    });

    test('[c] should clear all filters and show initial data (again)', () => {
        setup();
        // set up filters
        term.press('K');
        term.press('p');
        term.input('body.list');
        term.press('m');
        term.input('item1');
        term.press('o');
        term.input('body');
        term.press('x');
        term.input('statusCode');
        // clear
        term.press('c');
        expect(term.screen()).toEqual([
            '{                             ',
            '  "statusCode": 200,          ',
            '  "body": {                   ',
            '    "list": [                 ',
            '      {                       ',
            '        "item0": "data 00",   ',
        ]);
    });
});