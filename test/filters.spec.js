const explorerCli = require('..');
const Process = require('./Process');

const setup = () => {
    const proc = new Process({ rows: 6 });
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
    }, proc);
    return proc;
};

describe('filters', () => {
    test('[Shift-K] should list the keys at current path', () => {
        const proc = setup();
        proc.press({ ctrl: false, shift: true, name: 'k' });
        expect(proc.screen()).toEqual([
            '[                             ',
            '  "statusCode",               ',
            '  "body",                     ',
            '  "headers"                   ',
            ']                             ',
            '                              ',
        ]);
    });

    test('[Shift-K][Shift-K] should show the initial data (again)', () => {
        const proc = setup();
        proc.press({ ctrl: false, shift: true, name: 'k' });
        proc.press({ ctrl: false, shift: true, name: 'k' });
        expect(proc.screen()).toEqual([
            '{                             ',
            '  "statusCode": 200,          ',
            '  "body": {                   ',
            '    "list": [                 ',
            '      {                       ',
            '        "item0": "data 00",   ',
        ]);
    });

    test('[p]["body.list.0"] should show the data at the given path', () => {
        const proc = setup();
        proc.press({ ctrl: false, shift: false, name: 'p' });
        proc.input('body.list.0');
        expect(proc.screen()).toEqual([
            '{                             ',
            '  "item0": "data 00",         ',
            '  "item1": "data 01",         ',
            '  "item2": "data 02"          ',
            '}                             ',
            '                              ',
        ]);
    });

    test('[r][".."] should show move up one level in the path', () => {
        const proc = setup();
        proc.press({ ctrl: false, shift: false, name: 'p' });
        proc.input('body.list.0');
        proc.press({ ctrl: false, shift: false, name: 'r' });
        proc.input('..');
        expect(proc.screen()).toEqual([
            '[                             ',
            '  {                           ',
            '    "item0": "data 00",       ',
            '    "item1": "data 01",       ',
            '    "item2": "data 02"        ',
            '  },                          ',
        ]);
    });

    test('[r]["list.2"] should set the path relative to current path', () => {
        const proc = setup();
        proc.press({ ctrl: false, shift: false, name: 'p' });
        proc.input('body');
        proc.press({ ctrl: false, shift: false, name: 'r' });
        proc.input('list.2');
        expect(proc.screen()).toEqual([
            '{                             ',
            '  "item0": "data 20",         ',
            '  "item1": "data 21",         ',
            '  "item2": "data 22"          ',
            '}                             ',
            '                              ',
        ]);
    });

    test('[m]["item1"] should select the value of a property when at an array', () => {
        const proc = setup();
        proc.press({ ctrl: false, shift: false, name: 'p' });
        proc.input('body.list');
        proc.press({ ctrl: false, shift: false, name: 'm' });
        proc.input('item1');
        expect(proc.screen()).toEqual([
            '[                             ',
            '  "data 01",                  ',
            '  "data 11",                  ',
            '  "data 21"                   ',
            ']                             ',
            '                              ',
        ]);
    });

    test('[o]["body,headers"] should omit the selected keys', () => {
        const proc = setup();
        proc.press({ ctrl: false, shift: false, name: 'o' });
        proc.input('body,headers');
        expect(proc.screen()).toEqual([
            '{                             ',
            '  "statusCode": 200           ',
            '}                             ',
            '                              ',
            '                              ',
            '                              ',
        ]);
    });

    test('[x]["statusCode,headers"] should show only the selected keys', () => {
        const proc = setup();
        proc.press({ ctrl: false, shift: false, name: 'x' });
        proc.input('statusCode,headers');
        expect(proc.screen()).toEqual([
            '{                             ',
            '  "statusCode": 200,          ',
            '  "headers": {                ',
            '    "User-Agent": "request"   ',
            '  }                           ',
            '}                             ',
        ]);
    });

    test('[c] should clear all filters and show initial data (again)', () => {
        const proc = setup();
        // set up filters
        proc.press({ ctrl: false, shift: true , name: 'k' });
        proc.press({ ctrl: false, shift: false, name: 'p' });
        proc.input('body.list');
        proc.press({ ctrl: false, shift: false, name: 'm' });
        proc.input('item1');
        proc.press({ ctrl: false, shift: false, name: 'o' });
        proc.input('body');
        proc.press({ ctrl: false, shift: false, name: 'x' });
        proc.input('statusCode');
        // clear
        proc.press({ ctrl: false, shift: false, name: 'c' });
        expect(proc.screen()).toEqual([
            '{                             ',
            '  "statusCode": 200,          ',
            '  "body": {                   ',
            '    "list": [                 ',
            '      {                       ',
            '        "item0": "data 00",   ',
        ]);
    });
});