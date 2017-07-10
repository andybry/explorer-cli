const paths = require('../app/paths');

describe('paths', () => {
    test('should return [] for numbers', () => {
        expect(paths(5)).toEqual([]);
    });

    test('should return [] for strings', () => {
        expect(paths('arb')).toEqual([]);
    });

    test('should return [] for undefined', () => {
        expect(paths(undefined)).toEqual([]);
    });

    test('should return [] for null', () => {
        expect(paths(null)).toEqual([]);
    });

    test('should return [] for []', () => {
        expect(paths([])).toEqual([]);
    });

    test('should return [] for {}', () => {
        expect(paths({})).toEqual([]);
    });

    test('should return keys an object', () => {
        expect(paths({
            one: 1, two: 2, three: 3
        })).toEqual([ 'one', 'two', 'three' ]);
    });

    test('should return indexes for an array', () => {
        expect(paths([
            'one', 'two', 'three'
        ])).toEqual([ '0', '1', '2' ]);
    });

    test('should return nested paths for nested objects', () => {
        expect(paths({
            one: {
                two: {
                    three: 'four'
                }
            },
            five: [
                { six: 5 },
                { seven: 8 }
            ]
        })).toEqual([
            'one',
            'five',
            'one.two',
            'one.two.three',
            'five.0',
            'five.1',
            'five.0.six',
            'five.1.seven'
        ]);
    });

    test('should return nested paths for nested arrays', () => {
        expect(paths([
            { 
                one: {
                    two: 'three'
                }
            },
            { 
                four: [
                    { five: 5 },
                    { six: 5 }
                ]
            }
        ])).toEqual([
            '0',
            '1',
            '0.one',
            '0.one.two',
            '1.four',
            '1.four.0',
            '1.four.1',
            '1.four.0.five',
            '1.four.1.six',
        ]);
    });
});