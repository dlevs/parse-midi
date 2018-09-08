declare type RawMidiData = Uint8Array | number[];
/**
 * Parse data from a midimessage event.
 */
declare const parseMidi: ([status, data1, data2]: RawMidiData) => {
    messageType: "noteoff";
    key: number;
    velocity: number;
    messageCode: number;
    channel: number;
} | {
    messageType: "noteon";
    key: number;
    velocity: number;
    messageCode: number;
    channel: number;
} | {
    messageType: "keypressure";
    key: number;
    pressure: number;
    messageCode: number;
    channel: number;
} | {
    messageType: "controlchange";
    controlNumber: number;
    controlFunction: string | null;
    controlValue: number;
    messageCode: number;
    channel: number;
} | {
    messageType: "channelmodechange";
    controlNumber: number;
    channelModeMessage: string | null;
    controlValue: number;
    messageCode: number;
    channel: number;
} | {
    messageType: "programchange";
    program: number;
    messageCode: number;
    channel: number;
} | {
    messageType: "channelpressure";
    pressure: number;
    messageCode: number;
    channel: number;
} | {
    messageType: "pitchbendchange";
    pitchBend: number;
    pitchBendMultiplier: number;
    messageCode: number;
    channel: number;
} | {
    messageType: "unknown";
    data1: number;
    data2: number;
    messageCode: number;
    channel: number;
};
export default parseMidi;
