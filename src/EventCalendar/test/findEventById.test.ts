import { findEventById } from '../helpers/findEventById';

describe('findEventById', () => {
    test('get event FOO', () => {
        const events = [
            {id: 'FOO', start: '2019-01-01', end: '2019-01-01', title: 'Event FOO'},
            {id: 'BAZZ', start: '2019-01-01', end: '2019-01-01', title: 'Event BAZZ'}
        ];

        const result = findEventById(events, 'FOO');
        expect(result!.id).toBe('FOO');
    });

});
