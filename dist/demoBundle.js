System.register("lib/controlChangeUtils", [], function (exports_1, context_1) {
    "use strict";
    var onOff, onOffStrict, getControlFunction, getChannelModeMessage;
    var __moduleName = context_1 && context_1.id;
    return {
        setters: [],
        execute: function () {
            /**
             * Return either `offValue` or `onValue` depending on the `controlValue` passed.
             */
            onOff = (controlValue, offValue, onValue) => controlValue < 64 ? offValue : onValue;
            /**
             * Return either `offValue` or `onValue` depending on the `controlValue` passed.
             *
             * The only accepted `controlValue` values are `0` and `127` in order to match
             * the MIDI specification for channel mode messages.
             */
            onOffStrict = (controlValue, offValue, onValue) => {
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
            exports_1("getControlFunction", getControlFunction = (controlNumber, controlValue) => {
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
                }
                return null;
            });
            /**
             * For a given `controlNumber` and `controlValue`, get the corresponding
             * channel mode message defined in the MIDI specification.
             *
             * This is very similar to `getControlFunction()`, except control numbers
             * 120 - 127 are reserved for channel mode messages instead of being regular
             * control change messages. Keeping this logic separate from that function
             * allows for more targeted type coverage.
             */
            exports_1("getChannelModeMessage", getChannelModeMessage = (controlNumber, controlValue) => {
                // A switch statement is used instead of an object mapping so that TypeScript
                // will treat the return value as a literal, instead of a generic string.
                switch (controlNumber) {
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
            });
        }
    };
});
System.register("lib/constants", [], function (exports_2, context_2) {
    "use strict";
    var BITS_PER_DATA, DATA_RANGE, DATA_RANGE_WITH_LSB, PITCH_BEND_NEUTRAL;
    var __moduleName = context_2 && context_2.id;
    return {
        setters: [],
        execute: function () {
            exports_2("BITS_PER_DATA", BITS_PER_DATA = 7);
            exports_2("DATA_RANGE", DATA_RANGE = Math.pow(2, BITS_PER_DATA));
            exports_2("DATA_RANGE_WITH_LSB", DATA_RANGE_WITH_LSB = Math.pow(DATA_RANGE, 2));
            exports_2("PITCH_BEND_NEUTRAL", PITCH_BEND_NEUTRAL = DATA_RANGE_WITH_LSB / 2);
        }
    };
});
System.register("lib/numberUtils", ["lib/constants"], function (exports_3, context_3) {
    "use strict";
    var constants_1, combineMsbAndLsb;
    var __moduleName = context_3 && context_3.id;
    return {
        setters: [
            function (constants_1_1) {
                constants_1 = constants_1_1;
            }
        ],
        execute: function () {
            /**
             * Combine "Most Significant Byte" and "Least Significant Byte" for
             * parameters that use 2 bytes instead of just 1 for increased resolution.
             */
            exports_3("combineMsbAndLsb", combineMsbAndLsb = (msb, lsb) => (msb << constants_1.BITS_PER_DATA) + lsb);
        }
    };
});
System.register("parseMidi", ["lib/controlChangeUtils", "lib/constants", "lib/numberUtils"], function (exports_4, context_4) {
    "use strict";
    var controlChangeUtils_1, constants_2, numberUtils_1, parseMidi;
    var __moduleName = context_4 && context_4.id;
    return {
        setters: [
            function (controlChangeUtils_1_1) {
                controlChangeUtils_1 = controlChangeUtils_1_1;
            },
            function (constants_2_1) {
                constants_2 = constants_2_1;
            },
            function (numberUtils_1_1) {
                numberUtils_1 = numberUtils_1_1;
            }
        ],
        execute: function () {
            /**
             * Parse data from a midimessage event.
             */
            parseMidi = ([status, data1, data2]) => {
                /*
                    Status byte is, as the name suggests, 1 byte:
                    - 4 bits for the channel number (1-16)
                    - 4 bits for the message code (0-240 at intervals of 16)
            
                    data1 and data2 are 7 bits (0-127). In some cases, they
                    are combined for a total of 14 bits (0-16383).
                */
                const sharedData = {
                    messageCode: status & 0xF0,
                    channel: (status & 0x0F) + 1,
                };
                switch (sharedData.messageCode) {
                    case 0x80:
                        return Object.assign({}, sharedData, { messageType: 'noteoff', key: data1, velocity: data2 });
                    case 0x90:
                        return Object.assign({}, sharedData, { messageType: 'noteon', key: data1, velocity: data2 });
                    case 0xA0:
                        return Object.assign({}, sharedData, { messageType: 'keypressure', key: data1, pressure: data2 });
                    case 0xB0:
                        if (data1 < 120) {
                            return Object.assign({}, sharedData, { messageType: 'controlchange', controlNumber: data1, controlFunction: controlChangeUtils_1.getControlFunction(data1, data2), controlValue: data2 });
                        }
                        return Object.assign({}, sharedData, { messageType: 'channelmodechange', controlNumber: data1, channelModeMessage: controlChangeUtils_1.getChannelModeMessage(data1, data2), controlValue: data2 });
                    case 0xC0:
                        return Object.assign({}, sharedData, { messageType: 'programchange', program: data1 });
                    case 0xD0:
                        return Object.assign({}, sharedData, { messageType: 'channelpressure', pressure: data1 });
                    case 0xE0: {
                        const pitchBend = numberUtils_1.combineMsbAndLsb(data2, data1);
                        /*
                            Minimum is 0
                            Neutral is 8,192
                            Maximum is 16,383
            
                            To map the min and max to -1 and 1, while ensuring neutral
                            (8,192) is exactly 0, we need to divide by slightly different
                            values depending on whether the pitch bend is up or down, as
                            up has 1 less possible value.
                        */
                        const divider = pitchBend <= constants_2.PITCH_BEND_NEUTRAL
                            ? constants_2.PITCH_BEND_NEUTRAL
                            : (constants_2.PITCH_BEND_NEUTRAL - 1);
                        return Object.assign({}, sharedData, { messageType: 'pitchbendchange', pitchBend, pitchBendMultiplier: (pitchBend - constants_2.PITCH_BEND_NEUTRAL) / divider });
                    }
                    default:
                        return Object.assign({}, sharedData, { messageType: 'unknown', data1,
                            data2 });
                }
            };
            exports_4("default", parseMidi);
        }
    };
});
//# sourceMappingURL=demoBundle.js.map