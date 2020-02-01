import { getControlFunction, getChannelModeMessage } from './controlChangeUtils.js';

describe('getControlFunction()', () => {
	test('returns expected strings for some sample values', () => {
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

	test('returns `null` for values out of the control change range', () => {
		expect(getControlFunction(-1, 0)).toBe(null);
		expect(getControlFunction(120, 0)).toBe(null);
		expect(getControlFunction(128, 0)).toBe(null);
	});
});

describe('getChannelModeMessage()', () => {
	test('returns expected strings for some sample values', () => {
		expect(getChannelModeMessage(121, 0)).toBe('resetallcontrollers');
		expect(getChannelModeMessage(121, 1)).toBe(null);

		expect(getChannelModeMessage(122, 0)).toBe('localcontroloff');
		expect(getChannelModeMessage(122, 1)).toBe(null);
		expect(getChannelModeMessage(122, 127)).toBe('localcontrolon');
	});

	test('returns `null` for values out of the channel mode message range', () => {
		expect(getChannelModeMessage(119, 0)).toBe(null);
		expect(getChannelModeMessage(128, 0)).toBe(null);
	});
});
