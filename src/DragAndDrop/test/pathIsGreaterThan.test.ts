import { pathIsGreaterThan } from './../helpers';
describe('pathIsGreaterThan', () => {
    test('path 1 > 0', () => {
        expect(pathIsGreaterThan([1], [0])).toBeTruthy();
    });

    test('path 0 > 1', () => {
        expect(pathIsGreaterThan([0], [1])).toBeFalsy();
    });

    test('path 1.1 > 1.0', () => {
        expect(pathIsGreaterThan([1, 1], [1, 0])).toBeTruthy();
    });

    test('path 1.0 > 1.3', () => {
        expect(pathIsGreaterThan([1, 0], [1, 3])).toBeFalsy();
    });

    test('path 1.7.5 > 1.5.0', () => {
        expect(pathIsGreaterThan([1, 7, 5], [1, 5, 0])).toBeTruthy();
    });
});
