/**
 * Return either `offValue` or `onValue` depending on the `controlValue` passed.
 */
const onOff = <T1, T2>(controlValue: number, offValue: T1, onValue: T2) =>
	controlValue < 64 ? offValue : onValue;

/**
 * Return either `offValue` or `onValue` depending on the `controlValue` passed.
 *
 * The only accepted `controlValue` values are `0` and `127` in order to match
 * the MIDI specification for channel mode messages.
 */
const onOffStrict = <T1, T2>(controlValue: number, offValue: T1, onValue: T2) => {
	if (controlValue === 0) {
		return offValue;
	}
	if (controlValue === 127) {
		return onValue;
	}
	return null;
};

/**
 * For a given `controlNumber` and `controlValue`, get the human-readable
 * function name, as defined in the MIDI specification.
 */
const getControlFunction = (controlNumber: number, controlValue: number) => {
	// A switch statement is used instead of an object mapping so that TypeScript
	// will treat the return value as a literal, instead of a generic string.
	switch (controlNumber) {
		// 0-31 MSB (Most Significant Byte / Coarse Value)
		case 0: return 'bankselect';
		case 1: return 'modulation';
		case 2: return 'breathcontroller';
		case 4: return 'footcontroller';
		case 5: return 'portamentotime';
		case 6: return 'dataentry';
		case 7: return 'volume';
		case 8: return 'balance';
		case 10: return 'pan';
		case 11: return 'expressioncontroller';
		case 12: return 'effect1';
		case 13: return 'effect2';
		case 16: return 'generalpurposecontroller1';
		case 17: return 'generalpurposecontroller2';
		case 18: return 'generalpurposecontroller3';
		case 19: return 'generalpurposecontroller4';

		// 32-63 LSB (Least Significant Byte / Fine Value) correspond to their MSB equivalent.
		// They are dynamically assigned based on values 0-31.
		case 32: return 'bankselectfine';
		case 33: return 'modulationfine';
		case 34: return 'breathcontrollerfine';
		case 36: return 'footcontrollerfine';
		case 37: return 'portamentotimefine';
		case 38: return 'dataentryfine';
		case 39: return 'volumefine';
		case 40: return 'balancefine';
		case 42: return 'panfine';
		case 43: return 'expressioncontrollerfine';
		case 44: return 'effect1fine';
		case 45: return 'effect2fine';
		case 48: return 'generalpurposecontroller1fine';
		case 49: return 'generalpurposecontroller2fine';
		case 50: return 'generalpurposecontroller3fine';
		case 51: return 'generalpurposecontroller4fine';

		case 64: return onOff(controlValue, 'sustainoff', 'sustainon');
		case 65: return onOff(controlValue, 'portamentooff', 'portamentoon');
		case 66: return onOff(controlValue, 'sostenutooff', 'sostenutoon');
		case 67: return onOff(controlValue, 'softoff', 'softon');
		case 68: return onOff(controlValue, 'legatooff', 'legatoon');
		case 69: return onOff(controlValue, 'hold2off', 'hold2on');

		case 70: return 'soundcontroller1';
		case 71: return 'soundcontroller2';
		case 72: return 'soundcontroller3';
		case 73: return 'soundcontroller4';
		case 74: return 'soundcontroller5';
		case 75: return 'soundcontroller6';
		case 76: return 'soundcontroller7';
		case 77: return 'soundcontroller8';
		case 78: return 'soundcontroller9';
		case 79: return 'soundcontroller10';

		case 80: return 'generalpurposecontroller5';
		case 81: return 'generalpurposecontroller6';
		case 82: return 'generalpurposecontroller7';
		case 83: return 'generalpurposecontroller8';

		case 84: return 'portamentocontrol';
		case 91: return 'effectdepth1';
		case 92: return 'effectdepth2';
		case 93: return 'effectdepth3';
		case 94: return 'effectdepth4';
		case 95: return 'effectdepth5';
		case 96: return 'dataincrement';
		case 97: return 'datadecrement';
		case 98: return 'nonregisteredparameternumberfine';
		case 99: return 'nonregisteredparameternumber';
		case 100: return 'registeredparameternumberfine';
		case 101: return 'registeredparameternumber';

		// Channel mode messages.
		case 120: return onOffStrict(controlValue, 'allsoundoff', null);
		case 121: return onOffStrict(controlValue, 'resetallcontrollers', null);
		case 122: return onOffStrict(controlValue, 'localcontroloff', 'localcontrolon');
		case 123: return onOffStrict(controlValue, 'allnotesoff', null);
		case 124: return onOffStrict(controlValue, 'omnimodeoff', null);
		case 125: return onOffStrict(controlValue, 'omnimodeon', null);
		case 126: return 'monomodeon';
		case 127: return onOffStrict(controlValue, 'polymodeon', null);
	}

	return null;
};

export default getControlFunction;
