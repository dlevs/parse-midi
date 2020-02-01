import { combineMsbAndLsb } from './numberUtils';

describe('combineMsbAndLsb()', () => {
	test('correctly combines MSB and LSB values', () => {
		expect(combineMsbAndLsb(0, 0)).toBe(0);
		expect(combineMsbAndLsb(127, 127)).toBe(16383);
		expect(combineMsbAndLsb(1, 0)).toBe(128);
		expect(combineMsbAndLsb(1, 1)).toBe(129);
		expect(combineMsbAndLsb(0, 1)).toBe(1);
	});
});
