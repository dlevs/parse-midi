import { getControlFunction, getChannelModeMessage } from './lib/controlChangeUtils';
import { PITCH_BEND_NEUTRAL } from './lib/constants';
import { combineMsbAndLsb } from './lib/numberUtils';

export type MidiData = Uint8Array | [number, number, number];

/**
 * Parse data from a midimessage event.
 */
const parseMidi = ([status, data1, data2]: MidiData) => {
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
			return {
				...sharedData,
				messageType: 'noteoff',
				key: data1,
				velocity: data2,
			} as const;

		case 0x90:
			return {
				...sharedData,
				messageType: data2 === 0 ? 'noteoff' : 'noteon',
				key: data1,
				velocity: data2,
			} as const;

		case 0xA0:
			return {
				...sharedData,
				messageType: 'keypressure',
				key: data1,
				pressure: data2,
			} as const;

		case 0xB0:
			if (data1 < 120) {
				return {
					...sharedData,
					messageType: 'controlchange',
					controlNumber: data1,
					controlFunction: getControlFunction(data1, data2),
					controlValue: data2,
				} as const;
			}

			return {
				...sharedData,
				messageType: 'channelmodechange',
				controlNumber: data1,
				channelModeMessage: getChannelModeMessage(data1, data2),
				controlValue: data2,
			} as const;

		case 0xC0:
			return {
				...sharedData,
				messageType: 'programchange',
				program: data1,
			} as const;

		case 0xD0:
			return {
				...sharedData,
				messageType: 'channelpressure',
				pressure: data1,
			} as const;

		case 0xE0: {
			const pitchBend = combineMsbAndLsb(data2, data1);
			/*
				Minimum is 0
				Neutral is 8,192
				Maximum is 16,383

				To map the min and max to -1 and 1, while ensuring neutral
				(8,192) is exactly 0, we need to divide by slightly different
				values depending on whether the pitch bend is up or down, as
				up has 1 less possible value.
			*/
			const divider = pitchBend <= PITCH_BEND_NEUTRAL
				? PITCH_BEND_NEUTRAL
				: (PITCH_BEND_NEUTRAL - 1);

			return {
				...sharedData,
				messageType: 'pitchbendchange',
				pitchBend,
				pitchBendMultiplier: (pitchBend - PITCH_BEND_NEUTRAL) / divider,
			} as const;
		}

		default:
			return {
				...sharedData,
				messageType: 'unknown',
				data1,
				data2,
			} as const;
	}
};

export default parseMidi;
