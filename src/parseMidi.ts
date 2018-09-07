import getControlFunction from './lib/getControlFunction.js';
import { BITS_PER_DATA, PITCH_BEND_NEUTRAL } from './lib/constants.js';

type RawMidiData = Uint8Array | number[];

const parseMidi = ([status, data1, data2]: RawMidiData) => {
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
			return {
				...sharedData,
				messageType: messageType as typeof messageType,
				key: data1,
				velocity: data2,
			};
		}

		case 0x90: {
			const messageType = 'noteon';
			return {
				...sharedData,
				messageType: messageType as typeof messageType,
				key: data1,
				velocity: data2,
			};
		}

		case 0xA0: {
			const messageType = 'keypressure';
			return {
				...sharedData,
				messageType: messageType as typeof messageType,
				key: data1,
				pressure: data2,
			};
		}

		case 0xB0:
			if (data1 < 120) {
				const messageType = 'controlchange';
				return {
					...sharedData,
					messageType: messageType as typeof messageType,
					controlNumber: data1,
					controlFunction: getControlFunction(data1, data2),
					controlValue: data2,
				};
			}
			{
				const messageType = 'channelmodechange';
				return {
					...sharedData,
					messageType: messageType as typeof messageType,
					controlNumber: data1,
					channelModeMessage: getControlFunction(data1, data2),
					controlValue: data2,
				};
			}

		case 0xC0: {
			const messageType = 'programchange';
			return {
				...sharedData,
				messageType: messageType as typeof messageType,
				program: data1,
			};
		}

		case 0xD0: {
			const messageType = 'channelpressure';
			return {
				...sharedData,
				messageType: messageType as typeof messageType,
				pressure: data1,
			};
		}

		case 0xE0: {
			const messageType = 'pitchbendchange';
			const pitchBend = (data2 << BITS_PER_DATA) + data1;

			return {
				...sharedData,
				messageType: messageType as typeof messageType,
				pitchBend,
				pitchBendMultiplier: (pitchBend - PITCH_BEND_NEUTRAL) / PITCH_BEND_NEUTRAL,
			};
		}

		default: {
			const messageType = 'unknown';
			return {
				...sharedData,
				messageType: messageType as typeof messageType,
				data1,
				data2,
			};
		}
	}
};

export default parseMidi;
