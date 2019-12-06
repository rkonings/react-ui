import { isChildOf } from '../helpers';

describe('isChildOf', () => {
    test('path [1] is child of [0]', () => {
        expect(isChildOf([0], [1])).toBeFalsy();
    });

    test('path [0, 1] is child of [0]', () => {
        expect(isChildOf([0], [0, 1])).toBeTruthy();
    });

    test('path [2, 1, 4] is child of [2, 1, 3]', () => {
        expect(isChildOf([2, 1, 4], [2, 1, 3])).toBeFalsy();
    });

    test('path [2, 1, 4] is child of [2, 1, 3]', () => {
        expect(isChildOf([2, 1, 4], [2, 1, 3])).toBeFalsy();
    });
});
