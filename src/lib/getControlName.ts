type ParamNameGetter = (value: number) => string | null;

// TODO: Rename these
const button = (paramName: string): ParamNameGetter =>
	value => value < 64
		? `${paramName}off`
		: `${paramName}on`;

const onlyForValue = (paramMap: {[value: number]: string}): ParamNameGetter =>
	value => paramMap[value] || null;

// TODO: consistent naming. CC vs controller
const controllerNumbers: {[ccNumber: number]: string | ParamNameGetter | undefined} = {
	// MSB 0-31
	0: 'bankselect',
	1: 'modulation',
	2: 'breathcontroller',
	4: 'footcontroller',
	5: 'portamentotime',
	6: 'dataentry',
	7: 'volume',
	8: 'balance',
	10: 'pan',
	11: 'expressioncontroller',
	12: 'effect1',
	13: 'effect2',
	16: 'generalpurposecontroller1',
	17: 'generalpurposecontroller2',
	18: 'generalpurposecontroller3',
	19: 'generalpurposecontroller4',

	64: button('sustain'),
	65: button('portamento'),
	66: button('sostenuto'),
	67: button('soft'),
	68: button('legato'),
	69: button('hold2'),

	70: 'soundcontroller1',
	71: 'soundcontroller2',
	72: 'soundcontroller3',
	73: 'soundcontroller4',
	74: 'soundcontroller5',
	75: 'soundcontroller6',
	76: 'soundcontroller7',
	77: 'soundcontroller8',
	78: 'soundcontroller9',
	79: 'soundcontroller10',

	80: 'generalpurposecontroller5',
	81: 'generalpurposecontroller6',
	82: 'generalpurposecontroller7',
	83: 'generalpurposecontroller8',

	84: 'portamentocontrol',
	91: 'effectdepth1',
	92: 'effectdepth2',
	93: 'effectdepth3',
	94: 'effectdepth4',
	95: 'effectdepth5',
	96: 'dataincrement',
	97: 'datadecrement',
	98: 'nonregisteredparameternumberfine',
	99: 'nonregisteredparameternumber',
	100: 'registeredparameternumberfine',
	101: 'registeredparameternumber',

	120: onlyForValue({ 0: 'allsoundoff' }),
	121: onlyForValue({ 0: 'resetallcontrollers' }),
	122: onlyForValue({ 0: 'localcontroloff', 127: 'localcontrolon' }),
	123: onlyForValue({ 0: 'allnotesoff' }),
	124: onlyForValue({ 0: 'omnimodeoff' }),
	125: onlyForValue({ 0: 'omnimodeon' }),
	126: 'monomodeon',
	127: onlyForValue({ 0: 'polymodeon' }),
};

for (let i = 0; i < 32; i++) {
	const paramName = controllerNumbers[i];

	if (paramName) {
		controllerNumbers[i + 32] = `${paramName}fine`;
	}
}
// TODO: be consistent with naming
const getControlName = (controlNumber: number, controlValue: number) => {
	const paramName = controllerNumbers[controlNumber];

	if (typeof paramName === 'string') {
		return paramName;
	}

	if (typeof paramName === 'function') {
		return paramName(controlValue);
	}

	return null;
};

export default getControlName;
