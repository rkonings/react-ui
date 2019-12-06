import { moveEventToDate } from './../helpers/moveEventToDate';

describe('moveEventToDate', () => {
    test('move event FOO to 2019-02-01', () => {
        const events = [
            {
                id: 'BAZZ',
                start: '2019-01-01',
                end: '2019-01-01',
                title: 'Event BAZZ',
            },
            {
                id: 'FOO',
                start: '2019-01-01',
                end: '2019-01-01',
                title: 'Event FOO',
            },
        ];

        const result = moveEventToDate(events, 'FOO', '2019-02-01');
        expect(result[1].start).toBe('2019-02-01');
        expect(result[1].end).toBe('2019-02-01');
    });

    test('move event FOO with duration of 4 days to 2019-02-01', () => {
        const events = [
            {
                id: 'BAZZ',
                start: '2019-01-01',
                end: '2019-01-04',
                title: 'Event BAZZ',
            },
            {
                id: 'FOO',
                start: '2019-01-01',
                end: '2019-01-04',
                title: 'Event FOO',
            },
        ];

        const result = moveEventToDate(events, 'FOO', '2019-02-01');
        expect(result[1].start).toBe('2019-02-01');
        expect(result[1].end).toBe('2019-02-04');
    });
});
