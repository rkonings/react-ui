import { prepareEvents } from './../EventCalendar';
import { Event } from './../interfaces';
describe('prepareEvents', () => {
    test('event BAZZ has index 1', () => {
        const events: Event[] = [
            {
                start: '2019-01-01',
                end: '2019-01-01',
                title: 'FOO',
                id: 'FOO',
            },
            {
                start: '2019-01-01',
                end: '2019-01-01',
                title: 'BAZZ',
                id: 'BAZZ',
            },
        ];

        const result = prepareEvents(events);
        const event = result.find(event => event.id === 'BAZZ');
        expect(event!.index).toBe(1);
    });

    test('event BAZZ has index 0', () => {
        const events: Event[] = [
            {
                start: '2019-01-01',
                end: '2019-01-01',
                title: 'FOO',
                id: 'FOO',
            },
            {
                start: '2019-01-02',
                end: '2019-01-02',
                title: 'BAZZ',
                id: 'BAZZ',
            },
        ];

        const result = prepareEvents(events);
        const event = result.find(event => event.id === 'BAZZ');
        expect(event!.index).toBe(0);
    });

    test('event FOOBAZZ has index 1', () => {
        const events: Event[] = [
            {
                start: '2019-01-01',
                end: '2019-01-10',
                title: 'FOO',
                id: 'FOO',
            },
            {
                start: '2019-01-12',
                end: '2019-01-14',
                title: 'BAZZ',
                id: 'BAZZ',
            },
            {
                start: '2019-01-09',
                end: '2019-01-13',
                title: 'FOOBAZZ',
                id: 'FOOBAZZ',
            },
        ];

        const result = prepareEvents(events);
        const FOOBAZZ = result.find(event => event.id === 'FOOBAZZ');
        const FOO = result.find(event => event.id === 'FOO');
        const BAZZ = result.find(event => event.id === 'BAZZ');

        expect(FOOBAZZ!.index).toBe(1);
        expect(FOO!.index).toBe(0);
        expect(BAZZ!.index).toBe(0);
    });
});
