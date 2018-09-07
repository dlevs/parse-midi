import parseMidi from './parseMidi';

describe('parseMidi', () => {
	test('parses note on messages correctly', () => {
		// TODO: Different channel
		expect(parseMidi([144, 60, 110])).toEqual({
			messageCode: 144,
			channel: 1,
			messageType: 'noteon',
			key: 60,
			velocity: 110,
		});
		expect(parseMidi([145, 60, 110])).toMatchObject({
			messageCode: 144,
			channel: 2,
			messageType: 'noteon',
		});
		expect(parseMidi([159, 60, 110])).toMatchObject({
			messageCode: 144,
			channel: 16,
			messageType: 'noteon',
		});
	});
});
