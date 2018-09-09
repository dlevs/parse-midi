import getControlFunction from './getControlFunction';

describe('getControlFunction()', () => {
	test('returns expected strings for some smaple values', () => {
		expect(getControlFunction(7, 0)).toBe('volume');
		expect(getControlFunction(7, 127)).toBe('volume');

		expect(getControlFunction(8, 0)).toBe('balance');
		expect(getControlFunction(8, 127)).toBe('balance');

		expect(getControlFunction(10, 0)).toBe('pan');
		expect(getControlFunction(10, 127)).toBe('pan');
	});

	test('switches work', () => {
		expect(getControlFunction(64, 63)).toBe('sustainoff');
		expect(getControlFunction(64, 64)).toBe('sustainon');

		expect(getControlFunction(65, 63)).toBe('portamentooff');
		expect(getControlFunction(65, 64)).toBe('portamentoon');
	});

	test('channel mode messages work as expected', () => {
		expect(getControlFunction(121, 0)).toBe('resetallcontrollers');
		expect(getControlFunction(121, 1)).toBe(null);

		expect(getControlFunction(122, 0)).toBe('localcontroloff');
		expect(getControlFunction(122, 1)).toBe(null);
		expect(getControlFunction(122, 127)).toBe('localcontrolon');
	});
});
