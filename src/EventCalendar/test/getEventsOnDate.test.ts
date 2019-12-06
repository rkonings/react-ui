import { getEventsOnDay } from './../helpers/getEventsOnDate';
describe('getEventsOnDate', () => {
    it('should return events on date', () => {
        const events = [
            {
                title: 'FOO',
                start: '2019-01-01',
                end: '2019-01-10',
                id: 'FOO',
            },
        ];

        const result = getEventsOnDay(events, '2019-01-02');
        expect(result[0].title).toBe('FOO');
    });

    it('should not return events', () => {
        const events = [
            {
                title: 'FOO',
                start: '2018-01-01',
                end: '2018-01-10',
                id: 'FOO',
            },
        ];

        const result = getEventsOnDay(events, '2019-01-02');
        expect(result.length).toBe(0);
    });

    it('should return events', () => {
        const events = [
            {
                title: 'FOO',
                start: '2018-01-01',
                end: '2018-01-01',
                id: 'FOO',
            },
        ];

        const result = getEventsOnDay(events, '2018-01-01');
        expect(result.length).toBe(1);
    });
});
