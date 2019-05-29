if (!window.kara)
	window.kara = {};

'use strict';

//Init Score(first execute)
kara.initScore = function(track) {//track: trackName -- 'track1'
	kara.menu("1");	//드랙별 악기 콤보 추가
	kara.svgContain(track);
	kara.textSVG(track);
	kara.printNote(track);
};

// 시간지연
kara.delay = function delay(gap){ /* gap is in millisecs */  
	var then, now;
	then = new Date().getTime();
	now = then;
	while( (now - then) < gap ) {
		now = new Date().getTime();  // 현재시간을 읽어 함수를 불러들인 시간과의 차를 이용하여 처리$
	}
};

//트랙 추가
kara.addTabs = function(){
	var trackN;
	var track = 1;

	for (var key in kara.svg) {
		if (kara.svg.hasOwnProperty(key)) {
			if(kara.svg[key].svgContainer !== null){
				track++;
				console.log(track);
			}
		}
	}
	if(track == 11) return;
	$("#tab").children().last()
		.before("<li><a href='#track"+ track + "'>track "+ track + "</a></li>");

	$("#tabs").children().last().after("<div id='track" + track +"'></div>");


	$( "#tabs" ).tabs( "refresh" );
	console.log(track);

	trackN = "track" + track;
	console.log(trackN + typeof(trackN));

	kara.svgContain(trackN);
	kara.textSVG(trackN);
	kara.printNote(trackN);
	kara.menu(track);
};

// Set ComboList of Instruments on Each Track
kara.menu = function(trackN){	//trackN: trackNumber -- '1'
	
	var track = "track" + trackN;// 'track1'
	kara.scoreInfo.track[track].instrument = 0;//처음 Acoustic Grand Piano로 세팅
	
	// 메뉴 바에 Select a track 문구 추가
	$("#menu").append("<form action='#'><fieldset><label for='instrument" + trackN + "'>Select a track" + trackN+ "</label><select name='instrument" + trackN 							+"' id='instrument" + trackN +"'></fieldset></form>");
	
	$("#instrument" + trackN)
		.selectmenu({width: 200})
		.selectmenu( "menuWidget" )
		.addClass( "overflow" );

	//악기 콤보 박스 추가
	$("#instrument" + trackN).append("<option value = '0'>Acoustic Grand Piano</option>");
	$("#instrument" + trackN).append("<option value = '1'>Bright Acoustic Piano</option>");
	$("#instrument" + trackN).append("<option value = '2'>Electric Grand Piano</option>");
	$("#instrument" + trackN).append("<option value = '3'>Honky-tonk Piano</option>");
	$("#instrument" + trackN).append("<option value = '4'>Rhodes Piano</option>");
	$("#instrument" + trackN).append("<option value = '5'>Chorused Piano</option>");
	$("#instrument" + trackN).append("<option value = '6'>Harpsichord</option>");
	$("#instrument" + trackN).append("<option value = '7'>Clavinet</option>");
	$("#instrument" + trackN).append("<option value = '8'>Celesta</option>");
	$("#instrument" + trackN).append("<option value = '9'>Glockenspiel</option>");
	$("#instrument" + trackN).append("<option value = '10'>Music Box</option>");
	$("#instrument" + trackN).append("<option value = '11'>Vibraphone</option>");
	$("#instrument" + trackN).append("<option value = '12'>Marimba</option>");
	$("#instrument" + trackN).append("<option value = '13'>Xylophone</option>");
	$("#instrument" + trackN).append("<option value = '14'>Tubular Bells</option>");
	$("#instrument" + trackN).append("<option value = '15'>Dulcimer</option>");
	$("#instrument" + trackN).append("<option value = '16'>Hammond Organ</option>");
	$("#instrument" + trackN).append("<option value = '17'>Percussive Organ</option>");
	$("#instrument" + trackN).append("<option value = '18'>Rock Organ</option>");
	$("#instrument" + trackN).append("<option value = '19'>Church Organ</option>");
	$("#instrument" + trackN).append("<option value = '20'>Reed Organ</option>");
	$("#instrument" + trackN).append("<option value = '21'>Accordion</option>");
	$("#instrument" + trackN).append("<option value = '22'>Harmonica</option>");
	$("#instrument" + trackN).append("<option value = '23'>Tango Accordion</option>");
	$("#instrument" + trackN).append("<option value = '24'>Acoustic Guitar (nylon)</option>");
	$("#instrument" + trackN).append("<option value = '25'>Acoustic Guitar (steel)</option>");
	$("#instrument" + trackN).append("<option value = '26'>Electric Guitar (jazz)</option>");
	$("#instrument" + trackN).append("<option value = '27'>Electric Guitar (clean)</option>");
	$("#instrument" + trackN).append("<option value = '28'>Electric Guitar (muted)</option>");
	$("#instrument" + trackN).append("<option value = '29'>Overdriven Guitar</option>");
	$("#instrument" + trackN).append("<option value = '30'>Distortion Guitar</option>");
	$("#instrument" + trackN).append("<option value = '31'>Guitar Harmonics</option>");
	$("#instrument" + trackN).append("<option value = '32'>Acoustic Bass</option>");
	$("#instrument" + trackN).append("<option value = '33'>Electric Bass (finger)</option>");
	$("#instrument" + trackN).append("<option value = '34'>Electric Bass (pick)</option>");
	$("#instrument" + trackN).append("<option value = '35'>Fretless Bass</option>");
	$("#instrument" + trackN).append("<option value = '36'>Slap Bass 1</option>");
	$("#instrument" + trackN).append("<option value = '37'>Slap Bass 2</option>");
	$("#instrument" + trackN).append("<option value = '38'>Synth Bass 1</option>");
	$("#instrument" + trackN).append("<option value = '39'>Synth Bass 2</option>");
	$("#instrument" + trackN).append("<option value = '40'>Violin</option>");
	$("#instrument" + trackN).append("<option value = '41'>Viola</option>");
	$("#instrument" + trackN).append("<option value = '42'>Cello</option>");
	$("#instrument" + trackN).append("<option value = '43'>Contrabass</option>");
	$("#instrument" + trackN).append("<option value = '44'>Tremolo Strings</option>");
	$("#instrument" + trackN).append("<option value = '45'>Pizzicato Strings</option>");
	$("#instrument" + trackN).append("<option value = '46'>Orchestral Harp</option>");
	$("#instrument" + trackN).append("<option value = '47'>Timpani</option>");
	$("#instrument" + trackN).append("<option value = '48'>String Ensemble 1</option>");
	$("#instrument" + trackN).append("<option value = '49'>String Ensemble 2</option>");
	$("#instrument" + trackN).append("<option value = '50'>SynthStrings 1</option>");
	$("#instrument" + trackN).append("<option value = '51'>SynthStrings 2</option>");
	$("#instrument" + trackN).append("<option value = '52'>Choir Aahs</option>");
	$("#instrument" + trackN).append("<option value = '53'>Voice Oohs</option>");
	$("#instrument" + trackN).append("<option value = '54'>Synth Voice</option>");
	$("#instrument" + trackN).append("<option value = '55'>Orchestra Hit</option>");
	$("#instrument" + trackN).append("<option value = '56'>Trumpet</option>");
	$("#instrument" + trackN).append("<option value = '57'>Trombone</option>");
	$("#instrument" + trackN).append("<option value = '58'>Tuba</option>");
	$("#instrument" + trackN).append("<option value = '59'>Muted Trumpet</option>");
	$("#instrument" + trackN).append("<option value = '60'>French Horn</option>");
	$("#instrument" + trackN).append("<option value = '61'>Brass Section</option>");
	$("#instrument" + trackN).append("<option value = '62'>Synth Brass 1</option>");
	$("#instrument" + trackN).append("<option value = '63'>Synth Brass 2</option>");
	$("#instrument" + trackN).append("<option value = '64'>Soprano Sax</option>");
	$("#instrument" + trackN).append("<option value = '65'>Alto Sax</option>");
	$("#instrument" + trackN).append("<option value = '66'>Tenor Sax</option>");
	$("#instrument" + trackN).append("<option value = '67'>Baritone Sax</option>");
	$("#instrument" + trackN).append("<option value = '68'>Oboe</option>");
	$("#instrument" + trackN).append("<option value = '69'>English Horn</option>");
	$("#instrument" + trackN).append("<option value = '70'>Bassoon</option>");
	$("#instrument" + trackN).append("<option value = '71'>Clarinet</option>");
	$("#instrument" + trackN).append("<option value = '72'>Piccolo</option>");
	$("#instrument" + trackN).append("<option value = '73'>Flute</option>");
	$("#instrument" + trackN).append("<option value = '74'>Recorder</option>");
	$("#instrument" + trackN).append("<option value = '75'>Pan Flute</option>");
	$("#instrument" + trackN).append("<option value = '76'>Bottle Blow</option>");
	$("#instrument" + trackN).append("<option value = '77'>Shakuhachi</option>");
	$("#instrument" + trackN).append("<option value = '78'>Whistle</option>");
	$("#instrument" + trackN).append("<option value = '79'>Ocarina</option>");
	$("#instrument" + trackN).append("<option value = '80'>Lead 1 (square)</option>");
	$("#instrument" + trackN).append("<option value = '81'>Lead 2 (sawtooth)</option>");
	$("#instrument" + trackN).append("<option value = '82'>Lead 3 (calliope lead)</option>");
	$("#instrument" + trackN).append("<option value = '83'>Lead 4 (chiff lead)</option>");
	$("#instrument" + trackN).append("<option value = '84'>Lead 5 (charang)</option>");
	$("#instrument" + trackN).append("<option value = '85'>Lead 6 (voice)</option>");
	$("#instrument" + trackN).append("<option value = '86'>Lead 7 (fifths)</option>");
	$("#instrument" + trackN).append("<option value = '87'>Lead 8 (bass + lead)</option>");
	$("#instrument" + trackN).append("<option value = '88'>Pad 1 (new age)</option>");
	$("#instrument" + trackN).append("<option value = '89'>Pad 2 (warm)</option>");
	$("#instrument" + trackN).append("<option value = '90'>Pad 3 (polysynth)</option>");
	$("#instrument" + trackN).append("<option value = '91'>Pad 4 (choir)</option>");
	$("#instrument" + trackN).append("<option value = '92'>Pad 5 (bowed)</option>");
	$("#instrument" + trackN).append("<option value = '93'>Pad 6 (metallic)</option>");
	$("#instrument" + trackN).append("<option value = '94'>Pad 7 (halo)</option>");
	$("#instrument" + trackN).append("<option value = '95'>Pad 8 (sweep)</option>");
	$("#instrument" + trackN).append("<option value = '96'>FX 1 (rain)</option>");
	$("#instrument" + trackN).append("<option value = '97'>FX 2 (soundtrack)</option>");
	$("#instrument" + trackN).append("<option value = '98'>FX 3 (crystal)</option>");
	$("#instrument" + trackN).append("<option value = '99'>FX 4 (atmosphere)</option>");
	$("#instrument" + trackN).append("<option value = '100'>FX 5 (brightness)</option>");
	$("#instrument" + trackN).append("<option value = '101'>FX 6 (goblins)</option>");
	$("#instrument" + trackN).append("<option value = '102'>FX 7 (echoes)</option>");
	$("#instrument" + trackN).append("<option value = '103'>FX 8 (sci-fi)</option>");
	$("#instrument" + trackN).append("<option value = '104'>Sitar</option>");
	$("#instrument" + trackN).append("<option value = '105'>Banjo</option>");
	$("#instrument" + trackN).append("<option value = '106'>Shamisen</option>");
	$("#instrument" + trackN).append("<option value = '107'>Koto</option>");
	$("#instrument" + trackN).append("<option value = '108'>Kalimba</option>");
	$("#instrument" + trackN).append("<option value = '109'>Bagpipe</option>");
	$("#instrument" + trackN).append("<option value = '110'>Fiddle</option>");
	$("#instrument" + trackN).append("<option value = '111'>Shanai</option>");
	$("#instrument" + trackN).append("<option value = '112'>Tinkle Bell</option>");
	$("#instrument" + trackN).append("<option value = '113'>Agogo</option>");
	$("#instrument" + trackN).append("<option value = '114'>Steel Drums</option>");
	$("#instrument" + trackN).append("<option value = '115'>Woodblock</option>");
	$("#instrument" + trackN).append("<option value = '116'>Taiko Drum</option>");
	$("#instrument" + trackN).append("<option value = '117'>Melodic Tom</option>");
	$("#instrument" + trackN).append("<option value = '118'>Synth Drum</option>");
	$("#instrument" + trackN).append("<option value = '119'>Reverse Cymbal</option>");
	$("#instrument" + trackN).append("<option value = '120'>Guitar Fret Noise</option>");
	$("#instrument" + trackN).append("<option value = '121'>Breath Noise</option>");
	$("#instrument" + trackN).append("<option value = '122'>Seashore</option>");
	$("#instrument" + trackN).append("<option value = '123'>Bird Tweet</option>");
	$("#instrument" + trackN).append("<option value = '124'>Telephone Ring</option>");
	$("#instrument" + trackN).append("<option value = '125'>Helicopter</option>");
	$("#instrument" + trackN).append("<option value = '126'>Applause</option>");
	$("#instrument" + trackN).append("<option value = '127'>Gunshot</option>");

	
	$("#instrument" + trackN).selectmenu({
		
		// 콤보 박스 변경시 호출
		change: function(event, ui) {
		  
			console.log(trackN);
			track = "track" + trackN;//트랙 번호
			console.log(track);
			kara.scoreInfo.track[track].instrument = ui.item.value;//해당 악기 셋팅
	  }
	});

	$("#instrument" + trackN).selectmenu("refresh");
};


// Convert InstrumentNumber to InstrumentName
kara.numToInstrument = function(num) {// num: instrumentNumber -- '0'
	switch (num) {
		case 0: return "acoustic_grand_piano";
		case 1: return "bright_acoustic_piano";
		case 2: return "electric_grand_piano";
		case 3: return "honkytonk_piano";
		case 4: return "electric_piano_1";
		case 5: return "electric_piano_2";
		case 6: return "harpsichord";
		case 7: return "clavinet";
		case 8: return "celesta";
		case 9: return "glockenspiel";
		case 10: return "music_box";
		case 11: return "vibraphone";
		case 12: return "marimba";
		case 13: return "xylophone";
		case 14: return "tubular_bells";
		case 15: return "dulcimer";
		case 16: return "drawbar_organ";
		case 17: return "percussive_organ";
		case 18: return "rock_organ";
		case 19: return "church_organ";
		case 20: return "reed_organ";
		case 21: return "Accordion";
		case 22: return "harmonica";
		case 23: return "tango_accordion";
		case 24: return "acoustic_guitar_nylon";
		case 25: return "acoustic_guitar_steel";
		case 26: return "electric_guitar_jazz";
		case 27: return "electric_guitar_clean";
		case 28: return "electric_guitar_muted";
		case 29: return "overdriven_guitar";
		case 30: return "distortion_guitar";
		case 31: return "guitar_harmonics";
		case 32: return "Acoustic_Bass";
		case 33: return "electric_bass_finger";
		case 34: return "electric_bass_pick";
		case 35: return "fretless_bass";
		case 36: return "slap_bass_1";
		case 37: return "slap_bass_2";
		case 38: return "synth_bass_1";
		case 39: return "synth_bass_2";
		case 40: return "violin";
		case 41: return "viola";
		case 42: return "cello";
		case 43: return "contrabass";
		case 44: return "tremolo_strings";
		case 45: return "pizzicato_strings";
		case 46: return "orchestral_harp";	
		case 47: return "timpani";
		case 48: return "string_ensemble_1";
		case 49: return "string_ensemble_2";
		case 50: return "synth_strings_1";
		case 51: return "synth_strings_2";
		case 52: return "choir_aahs";
		case 53: return "voice_oohs";
		case 54: return "synth_choir";
		case 55: return "orchestra_hit";
		case 56: return "trumpet";
		case 57: return "trombone";
		case 58: return "tuba";
		case 59: return "muted_trumpet";
		case 60: return "french_horn";
		case 61: return "Brass_Section";
		case 62: return "synth_brass_1";
		case 63: return "synth_brass_2";
		case 64: return "soprano_sax";
		case 65: return "Alto_Sax";
		case 66: return "tenor_sax";
		case 67: return "Baritone_Sax";
		case 68: return "oboe";
		case 69: return "english_horn";
		case 70: return "Bassoon";
		case 71: return "clarinet";
		case 72: return "piccolo";
		case 73: return "flute";
		case 74: return "recorder";
		case 75: return "pan_flute";
		case 76: return "Bottle_Blow";
		case 77: return "shakuhachi";
		case 78: return "whistle";
		case 79: return "ocarina";
		case 80: return "lead_1_square";
		case 81: return "lead_2_sawtooth";
		case 82: return "lead_3_calliope";
		case 83: return "lead_4_chiff";
		case 84: return "lead_5_charang";
		case 85: return "lead_6_voice";
		case 86: return "lead_7_fifths";
		case 87: return "lead_8_bass__lead";
		case 88: return "pad_1_new_age";
		case 89: return "pad_2_warm";
		case 90: return "pad_3_polysynth";
		case 91: return "pad_4_choir";
		case 92: return "pad_5_bowed";
		case 93: return "pad_6_metallic";
		case 94: return "pad_7_halo";
		case 95: return "pad_8_sweep";
		case 96: return "fx_1_rain";
		case 97: return "fx_2_soundtrack";
		case 98: return "fx_3_crystal";
		case 99: return "fx_4_atmosphere";
		case 100: return "fx_5_brightness";
		case 101: return "fx_6_goblins";
		case 102: return "fx_7_echoes";
		case 103: return "fx_8_scifi";
		case 104: return "sitar";
		case 105: return "Banjo";
		case 106: return "shamisen";
		case 107: return "koto";
		case 108: return "kalimba";
		case 109: return "Bagpipe";
		case 110: return "fiddle";
		case 111: return "shanai";
		case 112: return "tinkle_bell";
		case 113: return "agogo";
		case 114: return "steel_drums";
		case 115: return "woodblock";
		case 116: return "taiko_drum";
		case 117: return "melodic_tom";
		case 118: return "synth_drum";
		case 119: return "reverse_cymbal";
		case 120: return "guitar_fret_noise";
		case 121: return "breath_noise";
		case 122: return "seashore";
		case 123: return "bird_tweet";
		case 124: return "telephone_ring";
		case 125: return "helicopter";
		case 126: return "Applause";
		case 127: return "gunshot";
		default: return "";
	}
};

// Convert InstrumentName to InstrumentNumber
kara.instrumentTonum = function(instrument) {// instrument: instrumentName -- 'acoustic_grand_piano'
	switch (instrument) {
		case "acoustic_grand_piano":	return 0;
		case "bright_acoustic_piano":	return 1;
		case "electric_grand_piano":	return 2;
		case "honkytonk_piano":			return 3;
		case "electric_piano_1":		return 4;
		case "electric_piano_2":		return 5;
		case "harpsichord":				return 6;
		case "clavinet":				return 7;
		case "celesta":					return 8;
		case "glockenspiel":			return 9;
		case "music_box":				return 10;
		case "vibraphone":				return 11;
		case "marimba":					return 12;
		case "xylophone":				return 13;
		case "tubular_bells":			return 14;
		case "dulcimer":				return 15;
		case "drawbar_organ":			return 16;
		case "percussive_organ":		return 17;
		case "rock_organ":				return 18;
		case "church_organ":			return 19;
		case "reed_organ":				return 20;
		case "Accordion":				return 21;
		case "harmonica":				return 22;
		case "tango_accordion":			return 23;
		case "acoustic_guitar_nylon":	return 24;
		case "acoustic_guitar_steel":	return 25;
		case "electric_guitar_jazz":	return 26;
		case "electric_guitar_clean":	return 27;
		case "electric_guitar_muted":	return 28;
		case "overdriven_guitar":		return 29;
		case "distortion_guitar":		return 30;
		case "guitar_harmonics":		return 31;
		case "Acoustic_Bass":			return 32;
		case "electric_bass_finger":	return 33;
		case "electric_bass_pick":		return 34;
		case "fretless_bass":			return 35;
		case "slap_bass_1":				return 36;
		case "slap_bass_2":				return 37;
		case "synth_bass_1":			return 38;
		case "synth_bass_2":			return 39;
		case "violin":					return 40;
		case "viola":					return 41;
		case "cello":					return 42;
		case "contrabass":				return 43;
		case "tremolo_strings":			return 44;
		case "pizzicato_strings":		return 45;
		case "orchestral_harp":			return 46;
		case "timpani":					return 47;
		case "string_ensemble_1":		return 48;
		case "string_ensemble_2":		return 49;
		case "synth_strings_1":			return 50;
		case "synth_strings_2":			return 51;
		case "choir_aahs":				return 52;
		case "voice_oohs":				return 53;
		case "synth_choir":				return 54;
		case "orchestra_hit":			return 55;
		case "trumpet":					return 56;
		case "trombone":				return 57;
		case "tuba":					return 58;
		case "muted_trumpet":			return 59;
		case "french_horn":				return 60;
		case "Brass_Section":			return 61;
		case "synth_brass_1":			return 62;
		case "synth_brass_2":			return 63;
		case "soprano_sax":				return 64;
		case "Alto_Sax":				return 65;
		case "tenor_sax":				return 66;
		case "Baritone_Sax":			return 67;
		case "oboe":					return 68;
		case "english_horn":			return 69;
		case "Bassoon":					return 70;
		case "clarinet":				return 71;
		case "piccolo":					return 72;
		case "flute":					return 73;
		case "recorder":				return 74;
		case "pan_flute":				return 75;
		case "Bottle_Blow":				return 76;
		case "shakuhachi":				return 77;
		case "whistle":					return 78;
		case "ocarina":					return 79;
		case "lead_1_square":			return 80;
		case "lead_2_sawtooth":			return 81;
		case "lead_3_calliope":			return 82;
		case "lead_4_chiff":			return 83;
		case "lead_5_charang":			return 84;
		case "lead_6_voice":			return 85;
		case "lead_7_fifths":			return 86;
		case "lead_8_bass__lead":		return 87;
		case "pad_1_new_age":			return 88;		
		case "pad_2_warm":				return 89;
		case "pad_3_polysynth":			return 90;
		case "pad_4_choir":				return 91;
		case "pad_5_bowed":				return 92;
		case "pad_6_metallic":			return 93;
		case "pad_7_halo":				return 94;
		case "pad_8_sweep":				return 95;
		case "fx_1_rain":				return 96;
		case "fx_2_soundtrack":			return 97;
		case "fx_3_crystal":			return 98;
		case "fx_4_atmosphere":			return 99;
		case "fx_5_brightness":			return 100;
		case "fx_6_goblins":			return 101;
		case "fx_7_echoes":				return 102;
		case "fx_8_scifi":				return 103;
		case "sitar":					return 104;
		case "Banjo":					return 105;
		case "shamisen":				return 106;
		case "koto":					return 107;
		case "kalimba":					return 108;
		case "Bagpipe":					return 109;
		case "fiddle":					return 110;
		case "shanai":					return 111;
		case "tinkle_bell":				return 112;
		case "agogo":					return 113;
		case "steel_drums":				return 114;
		case "woodblock":				return 115;
		case "taiko_drum":				return 116;
		case "melodic_tom":				return 117;
		case "synth_drum":				return 118;
		case "reverse_cymbal":			return 119;
		case "guitar_fret_noise":		return 120;
		case "breath_noise":			return 121;
		case "seashore":				return 122;
		case "bird_tweet":				return 123;
		case "telephone_ring":			return 124;
		case "helicopter":				return 125;
		case "Applause":				return 126;
		case "gunshot":					return 127;
		default:						return -1;
	}
};

kara.refresh = function(){
	$(".in_bar").remove();
	for (var key in kara.scoreInfo.track){
		if (kara.scoreInfo.track.hasOwnProperty(key)) {
			if(kara.scoreInfo.track[key].clef === "") continue;
			kara.printNote(key);
			kara.textSVG(key);
		}
	}
};


// 마디 여러등분으로 나눠 음정
// 마디 여러 등분으로 나누기
// 블록 지정 반복 재생
// 반복재생
// 악보 저장 텍스트형식

// 표식 삽입 후 추적
// 마디를 그룹지정
// 마디 그룹으로 악보 자동 생성
// 코드진행 자동 생성
// 마디 블록 지정
// 음악 재생 및 일시정지
// 음악 재싱 애니메이션
// 음악 저장
