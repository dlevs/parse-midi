# parse-midi

[![Netlify Status](https://api.netlify.com/api/v1/badges/3e990668-5854-432a-aaf6-dbda6876c4bd/deploy-status)](https://app.netlify.com/sites/parse-midi/deploys)

A small parser for MIDI messages.

The parser follows [midi.org's MIDI 1.0 specification](https://www.midi.org/specifications-old/item/the-midi-1-0-specification), meaning it:

- Identifies the channel and message type (`"noteon"`, `"noteoff"`, `"controlchange"`...) of a MIDI message
- Provides human-readable strings corresponding to the default mapping for every control change message (`"volume"`, `"pan"`, `"effect1"`...)
- Provides human-readable strings for each channel mode message (`"allnotesoff"`, `"resetallcontrollers"`, `"polymodeon"`...)

## Installation

```bash
npm install parse-midi
```

## Usage

### Basic usage

```javascript
import parseMidi from 'parse-midi';

parseMidi([144, 60, 62]);
// { messageType: 'noteon', key: 60, velocity: 62, channel: 1, messageCode: 144 }
```

### Responding to MIDI messages in the browser

In browsers that support [MIDIAccess](https://developer.mozilla.org/en-US/docs/Web/API/MIDIAccess), the parser can be used on event data:

```javascript
navigator.requestMIDIAccess().then(access => {
    Array.from(access.inputs.values()).forEach(input => {
        input.addEventListener('midimessage', (event) => {
            const midiMessage = parseMidi(event.data);
            console.log(midiMessage);
        });
    });
});
```

See the [demo](https://parse-midi.netlify.com/demo.html) for a working example.

## Return values

The `parseMidi` function returns an object which always has at least these properties:

```javascript
{
    messageCode: 0-240,
    channel: 1-16,
}
```

In addition, specific properties exist for each `messageType`:

```javascript
{
    messageType: 'noteoff',
    key: 0-127,
    velocity: 0-127,
}

{
    messageType: 'noteon',
    key: 0-127,
    velocity: 1-127,
}

{
    messageType: 'keypressure',
    key: 0-127,
    pressure: 0-127,
}

{
    messageType: 'controlchange',
    controlFunction: string, // e.g. 'volume'
    controlNumber: 0-127,
    controlValue: 0-127,
}

{
    messageType: 'channelmodechange',
    channelModeMessage: string, // e.g. 'allnotesoff'
    controlNumber: 0-127,
    controlValue: 0-127,
}

{
    messageType: 'programchange',
    program: 0-127,
}

{
    messageType: 'channelpressure',
    pressure: 0-127,
}

{
    messageType: 'pitchbendchange',
    pitchBend: 0-16383,
    pitchBendMultiplier: -1 - 1,
}

{
    messageType: 'unknown',
    data1: 0-127,
    data2: 0-127,
}
```

### TypeScript

With TypeScript, type safety and intellisense can be achieved by refining the type of the return object:

```javascript
const midiMessage = parseMidi([144, 60, 62]);

// Bad - won't compile
console.log(midiMessage.key);

// Good
if (midiMessage.messageType === 'noteon') {
    console.log(midiMessage.key);
}
```
