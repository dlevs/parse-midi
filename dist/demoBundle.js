System.register("lib/controlChangeUtils", [], function (exports_1, context_1) {
    "use strict";
    var controlFunctionMap, channelModeMessageMap, getControlFunction, getChannelModeMessage;
    var __moduleName = context_1 && context_1.id;
    return {
        setters: [],
        execute: function () {
            controlFunctionMap = {
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
                // 32-63 LSB (Least Significant Byte / Fine Value) correspond to their MSB equivalent.
                // They are dynamically assigned based on values 0-31.
                32: 'bankselectfine',
                33: 'modulationfine',
                34: 'breathcontrollerfine',
                36: 'footcontrollerfine',
                37: 'portamentotimefine',
                38: 'dataentryfine',
                39: 'volumefine',
                40: 'balancefine',
                42: 'panfine',
                43: 'expressioncontrollerfine',
                44: 'effect1fine',
                45: 'effect2fine',
                48: 'generalpurposecontroller1fine',
                49: 'generalpurposecontroller2fine',
                50: 'generalpurposecontroller3fine',
                51: 'generalpurposecontroller4fine',
                64: ['sustainoff', 'sustainon'],
                65: ['portamentooff', 'portamentoon'],
                66: ['sostenutooff', 'sostenutoon'],
                67: ['softoff', 'softon'],
                68: ['legatooff', 'legatoon'],
                69: ['hold2off', 'hold2on'],
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
            };
            channelModeMessageMap = {
                // Channel mode messages
                120: ['allsoundoff', null],
                121: ['resetallcontrollers', null],
                122: ['localcontroloff', 'localcontrolon'],
                123: ['allnotesoff', null],
                124: ['omnimodeoff', null],
                125: ['omnimodeon', null],
                126: 'monomodeon',
                127: ['polymodeon', null],
            };
            /**
             * For a given `controlNumber` and `controlValue`, get the human-readable
             * function name, as defined in the MIDI specification.
             */
            exports_1("getControlFunction", getControlFunction = (controlNumber, controlValue) => {
                const value = controlFunctionMap[controlNumber];
                if (typeof value === 'string') {
                    return value;
                }
                // Arrays indicate multiple possible return values, depending on the `controlValue`.
                if (value instanceof Array) {
                    const [offValue, onValue] = value;
                    return controlValue < 64 ? offValue : onValue;
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
                const value = channelModeMessageMap[controlNumber];
                if (typeof value === 'string') {
                    return value;
                }
                // For channel mode messages, the only accepted `controlValue` values are `0`
                // and `127` according to the MIDI specification.
                if (value instanceof Array) {
                    const [offValue, onValue] = value;
                    if (controlValue === 0) {
                        return offValue;
                    }
                    if (controlValue === 127) {
                        return onValue;
                    }
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
                    case 0x80: {
                        const messageType = 'noteoff';
                        return Object.assign({}, sharedData, { messageType: messageType, key: data1, velocity: data2 });
                    }
                    case 0x90: {
                        const messageType = 'noteon';
                        return Object.assign({}, sharedData, { messageType: messageType, key: data1, velocity: data2 });
                    }
                    case 0xA0: {
                        const messageType = 'keypressure';
                        return Object.assign({}, sharedData, { messageType: messageType, key: data1, pressure: data2 });
                    }
                    case 0xB0:
                        if (data1 < 120) {
                            const messageType = 'controlchange';
                            const controlFunction = controlChangeUtils_1.getControlFunction(data1, data2);
                            return Object.assign({}, sharedData, { messageType: messageType, controlNumber: data1, controlFunction: controlFunction, controlValue: data2 });
                        }
                        {
                            const messageType = 'channelmodechange';
                            const channelModeMessage = controlChangeUtils_1.getChannelModeMessage(data1, data2);
                            return Object.assign({}, sharedData, { messageType: messageType, controlNumber: data1, channelModeMessage: channelModeMessage, controlValue: data2 });
                        }
                    case 0xC0: {
                        const messageType = 'programchange';
                        return Object.assign({}, sharedData, { messageType: messageType, program: data1 });
                    }
                    case 0xD0: {
                        const messageType = 'channelpressure';
                        return Object.assign({}, sharedData, { messageType: messageType, pressure: data1 });
                    }
                    case 0xE0: {
                        const messageType = 'pitchbendchange';
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
                        return Object.assign({}, sharedData, { messageType: messageType, pitchBend, pitchBendMultiplier: (pitchBend - constants_2.PITCH_BEND_NEUTRAL) / divider });
                    }
                    default: {
                        const messageType = 'unknown';
                        return Object.assign({}, sharedData, { messageType: messageType, data1,
                            data2 });
                    }
                }
            };
            exports_4("default", parseMidi);
        }
    };
});
//# sourceMappingURL=demoBundle.js.map