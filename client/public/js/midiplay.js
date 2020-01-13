// interface to download soundfont, then execute callback;

console.log(MIDI);
MIDI.loadPlugin(onsuccess);

console.log('load plugin MIDI');
// simple example to get started;
MIDI.loadPlugin({
    instrument: "acoustic_grand_piano", // or the instrument code 1 (aka the default)
    instruments: [ "acoustic_grand_piano", "acoustic_guitar_nylon" ], // or multiple instruments
    onsuccess: function() {
		console.log('load Plugin success');
	}
});

MIDI.noteOn(channel, note, velocity, delay);
MIDI.noteOff(channel, note, delay);
MIDI.chordOn(channel, [note, note, note], velocity, delay);
MIDI.chordOff(channel, [note, note, note], delay);
MIDI.keyToNote = object; // A0 => 21
MIDI.noteToKey = object; // 21 => A0


MIDI.Player.currentTime = integer; // time we are at now within the song.
MIDI.Player.endTime = integer; // time when song ends.
MIDI.Player.playing = boolean; // are we playing? yes or no.
MIDI.Player.loadFile(file, onsuccess); // load .MIDI from base64 or binary XML request.
MIDI.Player.start(); // start the MIDI track (you can put this in the loadFile callback)
MIDI.Player.resume(); // resume the MIDI track from pause.
MIDI.Player.pause(); // pause the MIDI track.
MIDI.Player.stop(); // stops all audio being played, and resets currentTime to 0.


MIDI.Player.removeListener(); // removes current listener.
MIDI.Player.addListener(function(data) { // set it to your own function!
    var now = data.now; // where we are now
    var end = data.end; // time when song ends
    var channel = data.channel; // channel note is playing on
    var message = data.message; // 128 is noteOff, 144 is noteOn
    var note = data.note; // the note
    var velocity = data.velocity; // the velocity of the note
    // then do whatever you want with the information!
});


MIDI.Player.clearAnimation(); // clears current animation.
MIDI.Player.setAnimation(function(data) {
    var now = data.now; // where we are now
    var end = data.end; // time when song ends
    var events = data.events; // all the notes currently being processed
    // then do what you want with the information!
});


MIDI.setEffects([
	{
		type: "MoogFilter",
		bufferSize: 4096,
		bypass: false,
		cutoff: 0.065,
		resonance: 3.5
	},
	{
		type: "Bitcrusher",
		bits: 4,
		bufferSize: 4096,
		bypass: false,
		normfreq: 0.1
	},
	{
		type: "Phaser",
		rate: 1.2, // 0.01 to 8 is a decent range, but higher values are possible
		depth: 0.3, // 0 to 1
		feedback: 0.2, // 0 to 1+
		stereoPhase: 30, // 0 to 180
		baseModulationFrequency: 700, // 500 to 1500
		bypass: 0
	},
	{
		type: "Chorus",
		rate: 1.5,
		feedback: 0.2,
		delay: 0.0045,
		bypass: 0
	},
	{
		type: "Delay",
		feedback: 0.45, // 0 to 1+
		delayTime: 150, // how many milliseconds should the wet signal be delayed?
		wetLevel: 0.25, // 0 to 1+
		dryLevel: 1, // 0 to 1+
		cutoff: 20, // cutoff frequency of the built in highpass-filter. 20 to 22050
		bypass: 0
	},
	{
		type: "Overdrive",
		outputGain: 0.5, // 0 to 1+
		drive: 0.7, // 0 to 1
		curveAmount: 1, // 0 to 1
		algorithmIndex: 0, // 0 to 5, selects one of our drive algorithms
		bypass: 0
	},
	{
		type: "Compressor",
		threshold: 0.5, // -100 to 0
		makeupGain: 1, // 0 and up
		attack: 1, // 0 to 1000
		release: 0, // 0 to 3000
		ratio: 4, // 1 to 20
		knee: 5, // 0 to 40
		automakeup: true, // true/false
		bypass: 0
	},
	{
		type: "Convolver",
		highCut: 22050, // 20 to 22050
		lowCut: 20, // 20 to 22050
		dryLevel: 1, // 0 to 1+
		wetLevel: 1, // 0 to 1+
		level: 1, // 0 to 1+, adjusts total output of both wet and dry
		impulse: "./inc/tuna/impulses/impulse_rev.wav", // the path to your impulse response
		bypass: 0
	},
	{
		type: "Filter",
		frequency: 20, // 20 to 22050
		Q: 1, // 0.001 to 100
		gain: 0, // -40 to 40
		bypass: 1, // 0 to 1+
		filterType: 0 // 0 to 7, corresponds to the filter types in the native filter node: lowpass, highpass, bandpass, lowshelf, highshelf, peaking, notch, allpass in that order
	},
	{
		type: "Cabinet",
		makeupGain: 1, // 0 to 20
		impulsePath: "./inc/tuna/impulses/impulse_guitar.wav", // path to your speaker impulse
		bypass: 0
	},
	{
		type: "Tremolo",
		intensity: 0.3, // 0 to 1
		rate: 0.1, // 0.001 to 8
		stereoPhase: 0, // 0 to 180
		bypass: 0
	},
	{
		type: "WahWah",
		automode: true, // true/false
		baseFrequency: 0.5, // 0 to 1
		excursionOctaves: 2, // 1 to 6
		sweep: 0.2, // 0 to 1
		resonance: 10, // 1 to 100
		sensitivity: 0.5, // -1 to 1
		bypass: 0
	}
]);
