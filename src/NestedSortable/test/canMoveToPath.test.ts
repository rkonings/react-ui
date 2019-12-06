import { canMoveToPath } from '../helpers';

describe('canMoveToPath', () => {
    test('from 1 to 1, 0', () => {
        expect(canMoveToPath([1], [1, 0])).toBe(false);
    });

    test('from 0 to 1, 0', () => {
        expect(canMoveToPath([0], [1, 0])).toBe(true);
    });

    test('from 0,0,0 to 0,0,1', () => {
        expect(canMoveToPath([0, 0, 0], [0, 0, 1])).toBe(true);
    });
});
