import getControlName from './lib/getControlName';

type RawMidiData = Uint8Array | number[];

const parseMidi = ([status, data1, data2]: RawMidiData) => {
	const sharedData = {
		messageCode: status & 0xF0,
		channel: (status & 0x0F) + 1
	};

	switch (sharedData.messageCode) {
		case 0x80: {
			const messageType = 'noteoff';
			return {
				...sharedData,
				messageType: messageType as typeof messageType,
				key: data1,
				velocity: data2
			};
		}

		case 0x90: {
			const messageType = 'noteon';
			return {
				...sharedData,
				messageType: messageType as typeof messageType,
				key: data1,
				velocity: data2
			};
		}

		case 0xA0: {
			const messageType = 'keypressure';
			return {
				...sharedData,
				messageType: messageType as typeof messageType,
				key: data1,
				pressure: data2
			};
		}

		case 0xB0: {
			const messageType = 'controlchange';
			return {
				...sharedData,
				messageType: messageType as typeof messageType,
				controllerNumber: data1,
				controllerValue: data2,

				// TODO: Make systemchange a separate messageType?
				controllerName: getControlName(data1, data2),
			};
		}

		case 0xC0: {
			const messageType = 'programchange';
			return {
				...sharedData,
				messageType: messageType as typeof messageType,
				program: data1
			};
		}

		case 0xD0: {
			const messageType = 'channelpressure';
			return {
				...sharedData,
				messageType: messageType as typeof messageType,
				program: data1
			};
		}

		case 0xE0: {
			const messageType = 'pitchbendchange';
			const pitchBend = (data2 << 7) + data1;
			// TODO: Move
			const PITCH_BEND_RANGE = 128 * 128;
			const PITCH_BEND_NEUTRAL = PITCH_BEND_RANGE / 2;

			return {
				...sharedData,
				messageType: messageType as typeof messageType,
				pitchBend,
				pitchBendMultiplier: (pitchBend - PITCH_BEND_NEUTRAL) / PITCH_BEND_NEUTRAL
			};
		}
	}

	return null;
};

export default parseMidi;
