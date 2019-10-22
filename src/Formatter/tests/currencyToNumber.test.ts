import { currencyToNumber } from '../currencyToNumber';

describe('currencyToNumber', () => {
    test('format € 100,12 to 100.12', () => {
        const result = currencyToNumber('€ 100,12');
        expect(result).toBe(100.12);
    });

    test('format €100,12 to 100.12', () => {
        const result = currencyToNumber('€100,12');
        expect(result).toBe(100.12);
    });

    test('format €1k to 1000', () => {
        const result = currencyToNumber('€1k');
        expect(result).toBe(1000);
    });

    test('format €1mln to 1000000', () => {
        const result = currencyToNumber('€1mln');
        expect(result).toBe(1000000);
    });

});
