import parseMidi, { MidiData } from './parseMidi.js';

const matchSnapshot = (midiData: MidiData) => {
	expect(parseMidi(midiData)).toMatchSnapshot(JSON.stringify(midiData));
};

describe('parseMidi()', () => {
	test('parses note on messages correctly on different channels', () => {
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

	test('parses pitchbend messages correctly', () => {
		expect(parseMidi([224, 0, 0])).toEqual({
			channel: 1,
			messageCode: 224,
			messageType: 'pitchbendchange',
			pitchBend: 0,
			pitchBendMultiplier: -1,
		});
		expect(parseMidi([224, 0, 64])).toMatchObject({
			pitchBend: 8192,
			pitchBendMultiplier: 0,
		});
		expect(parseMidi([224, 127, 127])).toMatchObject({
			pitchBend: 16383,
			pitchBendMultiplier: 1,
		});
		expect(parseMidi([224, 1, 1])).toMatchObject({
			pitchBend: 129,
			pitchBendMultiplier: -0.9842529296875,
		});
	});

	test('"noteon" messages with a velocity of 0 are treated as "noteoff', () => {
		expect(parseMidi([144, 60, 0])).toMatchObject({
			channel: 1,
			key: 60,
			messageCode: 144,
			messageType: 'noteoff',
			velocity: 0,
		});

		expect(parseMidi([144, 60, 127])).toMatchObject({
			channel: 1,
			key: 60,
			messageCode: 144,
			messageType: 'noteon',
			velocity: 127,
		});
	});

	test('snapshots match for all variations of status byte', () => {
		for (let i = 0; i < 256; i++) {
			matchSnapshot([i, 60, 0]);
			matchSnapshot([i, 60, 127]);
		}
	});

	test('snapshots match for all variations of control change messages', () => {
		for (let i = 0; i < 128; i++) {
			matchSnapshot([176, i, 0]);
			matchSnapshot([176, i, 127]);
		}
	});
});
