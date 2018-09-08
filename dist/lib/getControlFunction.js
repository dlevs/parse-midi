const controlOnOrOff = (paramName) => value => value < 64
    ? `${paramName}off`
    : `${paramName}on`;
const controlValueMap = (paramMap) => value => paramMap[value] || null;
const controlFunctions = {
    // 0-31 MSB (Most Significant Byte / Coarse Value)
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
    /*
        32-63 LSB (Least Significant Byte / Fine Value) correspond to their MSB equivalent.
        They are dynamically assigned based on values 0-31.
    */
    64: controlOnOrOff('sustain'),
    65: controlOnOrOff('portamento'),
    66: controlOnOrOff('sostenuto'),
    67: controlOnOrOff('soft'),
    68: controlOnOrOff('legato'),
    69: controlOnOrOff('hold2'),
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
    /*
        Channel mode messages.

        The use of `controlValueMap` doesn't seem 100% necessary,
        but it follows the MIDI spec here.
    */
    120: controlValueMap({ 0: 'allsoundoff' }),
    121: controlValueMap({ 0: 'resetallcontrollers' }),
    122: controlValueMap({ 0: 'localcontroloff', 127: 'localcontrolon' }),
    123: controlValueMap({ 0: 'allnotesoff' }),
    124: controlValueMap({ 0: 'omnimodeoff' }),
    125: controlValueMap({ 0: 'omnimodeon' }),
    126: 'monomodeon',
    127: controlValueMap({ 0: 'polymodeon' }),
};
for (let i = 0; i < 32; i++) {
    const paramName = controlFunctions[i];
    if (paramName) {
        controlFunctions[i + 32] = `${paramName}fine`;
    }
}
const getControlFunction = (controlNumber, controlValue) => {
    const paramName = controlFunctions[controlNumber];
    if (typeof paramName === 'string') {
        return paramName;
    }
    if (typeof paramName === 'function') {
        return paramName(controlValue);
    }
    return null;
};
export default getControlFunction;
//# sourceMappingURL=getControlFunction.js.map