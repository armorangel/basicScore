if(!window.kara) window.kara = {};

//Init Score(Execute first)
kara.initScore = function(trcNm) {// trcNm: Track Name -- 'track1'
	
	let trcNum = trcNm.slice(-1);	// 1
	
	kara.addInstr(trcNum);	// 트랙별 악기 콤보 추가
	kara.initSvg(trcNm);	// 해당 트랙 svg 구성요소들 SVG 객체 저장, 악보영역 생성 in print.js
	kara.txtSVG(trcNm);		// Draw title, tempo, name SVG in print.js
	kara.prtNote(trcNm);	// 배열의 값을 가져와서 음표를 그린다 in karaoke.js
};

// 악보 초기화
kara.refresh = function() {
	
	// 악보 삭제영역 삭제
	$('.in_bar').remove();
	
	for (var trcNm in kara.scoreInfo.track) {
			
		// 해당 트랙이 초기화 되었는지 판단
		if(kara.scoreInfo.track[trcNm].clef === '') continue;
		
		// 초기화된 트랙만 그리기
		kara.prtNote(trcNm);	// print Notes
		kara.txtSVG(trcNm); 	// print Text
	}
};

//트랙 탭 추가
kara.addTabs = function() {
	
	var trcNm;
	var trcNum = 1;

	//kara.svg :: 악보 트랙별 SVG 객체 return ['track1', 'track2', ..., 'track10']
	//마지막 트랙번호 설정
	for (var key in kara.svg) {	// 트랙별 svg
		if(kara.svg['track' + trcNum].svgContainer !== null)
			trcNum++;	// 1부터 시작 아직 생성안된 트랙까지
	}
	
	// 트랙 9개 제한
	if(trcNum === 10) return;
	
	//탭 태그 생성
	$("#tab").children().last().before("<li><a href='#track" + trcNum + "'>track " + trcNum + "</a>" +
									   "<span class='ui-icon ui-icon-close' role='presentation'>삭제</span></li>");
	$("#tabs").children().last().after("<div id='track" + trcNum + "'></div>");
	
	// 삭제버튼 클릭시 해당 탭 지우기
	$("#tabs").on( "click", "span.ui-icon-close", function() {
		
		var panelId = $( this ).closest( "li" ).remove().attr( "aria-controls" );
		
		// 해당하는 탭 제거
		$("#" + panelId).remove();
		
		//해당 트랙의 악기 콤보 삭제
		if(panelId.slice(-1) == trcNum) {
			
			$('#menu' + trcNum).remove();
			kara.svg['track' + trcNum].svgContainer = null;
			kara.svg['track' + trcNum].svgLine = null;
			kara.svg['track' + trcNum].svgText = null;
			kara.svg['track' + trcNum].svgSymbol = null;
			kara.svg['track' + trcNum].svgNote = null;
			kara.svg['track' + trcNum].svgBox = null;
			
			kara.scoreInfo.track['track' + trcNum].clef = '';
			kara.scoreInfo.track['track' + trcNum].notes = [];
			kara.scoreInfo.track['track' + trcNum].instrument = '';
		}
			
		// 탭 refresh
		$('#tabs').tabs('refresh');
	});

	// 탭 refresh
	$('#tabs').tabs('refresh');

	kara.initScore('track' + trcNum);	// Init Score
};

// Add Combo to select Instruments on Each Track
kara.addInstr = function(trcNum) {	//trackN: trackNumber -- 1

	var trcNm = 'track' + trcNum;	// 'track1'
	var menuTtl = 'Select a track';
	
	kara.scoreInfo.track[trcNm].instrument = 0;	//처음 Acoustic Grand Piano로 세팅
	
	// 메뉴 바에 Select a track 문구, 콤보 추가
	$("#menu").append("<form id='menu" + trcNum + "' action='#'><fieldset><label for='instrument" + trcNum + "'>" + menuTtl + trcNum + "</label><select name='instrument" + trcNum 	+ "' id='instrument" + trcNum + "'></fieldset></form>");
	
	$("#instrument" + trcNum)
		.selectmenu({width: 200})
		.selectmenu("menuWidget")
		.addClass("overflow");	// overflow클래스 추가

	//악기 콤보 요소 추가 add option tag
	kara.addInstrOptCombo(trcNum);	// 1

	// 콤보 이벤트 추가
	$("#instrument" + trcNum).selectmenu({
		
		// 콤보 박스 변경시 호출
		change: function(event, ui) {
			kara.scoreInfo.track[trcNm].instrument = ui.item.value;	// 선택된 악기번호 악보 정보 객체에 저장
		}
	});

	// 콤보 갱신
	$("#instrument" + trcNum).selectmenu('refresh');
};

//악기 콤보 요소 추가
kara.addInstrOptCombo = function(trcNum) {	// trcNum :: Track Number - '1'
	$("#instrument" + trcNum).append("<option value = '0'>Acoustic Grand Piano</option>");
	$("#instrument" + trcNum).append("<option value = '1'>Bright Acoustic Piano</option>");
	$("#instrument" + trcNum).append("<option value = '2'>Electric Grand Piano</option>");
	$("#instrument" + trcNum).append("<option value = '3'>Honky-tonk Piano</option>");
	$("#instrument" + trcNum).append("<option value = '4'>Rhodes Piano</option>");
	$("#instrument" + trcNum).append("<option value = '5'>Chorused Piano</option>");
	$("#instrument" + trcNum).append("<option value = '6'>Harpsichord</option>");
	$("#instrument" + trcNum).append("<option value = '7'>Clavinet</option>");
	$("#instrument" + trcNum).append("<option value = '8'>Celesta</option>");
	$("#instrument" + trcNum).append("<option value = '9'>Glockenspiel</option>");
	$("#instrument" + trcNum).append("<option value = '10'>Music Box</option>");
	$("#instrument" + trcNum).append("<option value = '11'>Vibraphone</option>");
	$("#instrument" + trcNum).append("<option value = '12'>Marimba</option>");
	$("#instrument" + trcNum).append("<option value = '13'>Xylophone</option>");
	$("#instrument" + trcNum).append("<option value = '14'>Tubular Bells</option>");
	$("#instrument" + trcNum).append("<option value = '15'>Dulcimer</option>");
	$("#instrument" + trcNum).append("<option value = '16'>Hammond Organ</option>");
	$("#instrument" + trcNum).append("<option value = '17'>Percussive Organ</option>");
	$("#instrument" + trcNum).append("<option value = '18'>Rock Organ</option>");
	$("#instrument" + trcNum).append("<option value = '19'>Church Organ</option>");
	$("#instrument" + trcNum).append("<option value = '20'>Reed Organ</option>");
	$("#instrument" + trcNum).append("<option value = '21'>Accordion</option>");
	$("#instrument" + trcNum).append("<option value = '22'>Harmonica</option>");
	$("#instrument" + trcNum).append("<option value = '23'>Tango Accordion</option>");
	$("#instrument" + trcNum).append("<option value = '24'>Acoustic Guitar (nylon)</option>");
	$("#instrument" + trcNum).append("<option value = '25'>Acoustic Guitar (steel)</option>");
	$("#instrument" + trcNum).append("<option value = '26'>Electric Guitar (jazz)</option>");
	$("#instrument" + trcNum).append("<option value = '27'>Electric Guitar (clean)</option>");
	$("#instrument" + trcNum).append("<option value = '28'>Electric Guitar (muted)</option>");
	$("#instrument" + trcNum).append("<option value = '29'>Overdriven Guitar</option>");
	$("#instrument" + trcNum).append("<option value = '30'>Distortion Guitar</option>");
	$("#instrument" + trcNum).append("<option value = '31'>Guitar Harmonics</option>");
	$("#instrument" + trcNum).append("<option value = '32'>Acoustic Bass</option>");
	$("#instrument" + trcNum).append("<option value = '33'>Electric Bass (finger)</option>");
	$("#instrument" + trcNum).append("<option value = '34'>Electric Bass (pick)</option>");
	$("#instrument" + trcNum).append("<option value = '35'>Fretless Bass</option>");
	$("#instrument" + trcNum).append("<option value = '36'>Slap Bass 1</option>");
	$("#instrument" + trcNum).append("<option value = '37'>Slap Bass 2</option>");
	$("#instrument" + trcNum).append("<option value = '38'>Synth Bass 1</option>");
	$("#instrument" + trcNum).append("<option value = '39'>Synth Bass 2</option>");
	$("#instrument" + trcNum).append("<option value = '40'>Violin</option>");
	$("#instrument" + trcNum).append("<option value = '41'>Viola</option>");
	$("#instrument" + trcNum).append("<option value = '42'>Cello</option>");
	$("#instrument" + trcNum).append("<option value = '43'>Contrabass</option>");
	$("#instrument" + trcNum).append("<option value = '44'>Tremolo Strings</option>");
	$("#instrument" + trcNum).append("<option value = '45'>Pizzicato Strings</option>");
	$("#instrument" + trcNum).append("<option value = '46'>Orchestral Harp</option>");
	$("#instrument" + trcNum).append("<option value = '47'>Timpani</option>");
	$("#instrument" + trcNum).append("<option value = '48'>String Ensemble 1</option>");
	$("#instrument" + trcNum).append("<option value = '49'>String Ensemble 2</option>");
	$("#instrument" + trcNum).append("<option value = '50'>SynthStrings 1</option>");
	$("#instrument" + trcNum).append("<option value = '51'>SynthStrings 2</option>");
	$("#instrument" + trcNum).append("<option value = '52'>Choir Aahs</option>");
	$("#instrument" + trcNum).append("<option value = '53'>Voice Oohs</option>");
	$("#instrument" + trcNum).append("<option value = '54'>Synth Voice</option>");
	$("#instrument" + trcNum).append("<option value = '55'>Orchestra Hit</option>");
	$("#instrument" + trcNum).append("<option value = '56'>Trumpet</option>");
	$("#instrument" + trcNum).append("<option value = '57'>Trombone</option>");
	$("#instrument" + trcNum).append("<option value = '58'>Tuba</option>");
	$("#instrument" + trcNum).append("<option value = '59'>Muted Trumpet</option>");
	$("#instrument" + trcNum).append("<option value = '60'>French Horn</option>");
	$("#instrument" + trcNum).append("<option value = '61'>Brass Section</option>");
	$("#instrument" + trcNum).append("<option value = '62'>Synth Brass 1</option>");
	$("#instrument" + trcNum).append("<option value = '63'>Synth Brass 2</option>");
	$("#instrument" + trcNum).append("<option value = '64'>Soprano Sax</option>");
	$("#instrument" + trcNum).append("<option value = '65'>Alto Sax</option>");
	$("#instrument" + trcNum).append("<option value = '66'>Tenor Sax</option>");
	$("#instrument" + trcNum).append("<option value = '67'>Baritone Sax</option>");
	$("#instrument" + trcNum).append("<option value = '68'>Oboe</option>");
	$("#instrument" + trcNum).append("<option value = '69'>English Horn</option>");
	$("#instrument" + trcNum).append("<option value = '70'>Bassoon</option>");
	$("#instrument" + trcNum).append("<option value = '71'>Clarinet</option>");
	$("#instrument" + trcNum).append("<option value = '72'>Piccolo</option>");
	$("#instrument" + trcNum).append("<option value = '73'>Flute</option>");
	$("#instrument" + trcNum).append("<option value = '74'>Recorder</option>");
	$("#instrument" + trcNum).append("<option value = '75'>Pan Flute</option>");
	$("#instrument" + trcNum).append("<option value = '76'>Bottle Blow</option>");
	$("#instrument" + trcNum).append("<option value = '77'>Shakuhachi</option>");
	$("#instrument" + trcNum).append("<option value = '78'>Whistle</option>");
	$("#instrument" + trcNum).append("<option value = '79'>Ocarina</option>");
	$("#instrument" + trcNum).append("<option value = '80'>Lead 1 (square)</option>");
	$("#instrument" + trcNum).append("<option value = '81'>Lead 2 (sawtooth)</option>");
	$("#instrument" + trcNum).append("<option value = '82'>Lead 3 (calliope lead)</option>");
	$("#instrument" + trcNum).append("<option value = '83'>Lead 4 (chiff lead)</option>");
	$("#instrument" + trcNum).append("<option value = '84'>Lead 5 (charang)</option>");
	$("#instrument" + trcNum).append("<option value = '85'>Lead 6 (voice)</option>");
	$("#instrument" + trcNum).append("<option value = '86'>Lead 7 (fifths)</option>");
	$("#instrument" + trcNum).append("<option value = '87'>Lead 8 (bass + lead)</option>");
	$("#instrument" + trcNum).append("<option value = '88'>Pad 1 (new age)</option>");
	$("#instrument" + trcNum).append("<option value = '89'>Pad 2 (warm)</option>");
	$("#instrument" + trcNum).append("<option value = '90'>Pad 3 (polysynth)</option>");
	$("#instrument" + trcNum).append("<option value = '91'>Pad 4 (choir)</option>");
	$("#instrument" + trcNum).append("<option value = '92'>Pad 5 (bowed)</option>");
	$("#instrument" + trcNum).append("<option value = '93'>Pad 6 (metallic)</option>");
	$("#instrument" + trcNum).append("<option value = '94'>Pad 7 (halo)</option>");
	$("#instrument" + trcNum).append("<option value = '95'>Pad 8 (sweep)</option>");
	$("#instrument" + trcNum).append("<option value = '96'>FX 1 (rain)</option>");
	$("#instrument" + trcNum).append("<option value = '97'>FX 2 (soundtrack)</option>");
	$("#instrument" + trcNum).append("<option value = '98'>FX 3 (crystal)</option>");
	$("#instrument" + trcNum).append("<option value = '99'>FX 4 (atmosphere)</option>");
	$("#instrument" + trcNum).append("<option value = '100'>FX 5 (brightness)</option>");
	$("#instrument" + trcNum).append("<option value = '101'>FX 6 (goblins)</option>");
	$("#instrument" + trcNum).append("<option value = '102'>FX 7 (echoes)</option>");
	$("#instrument" + trcNum).append("<option value = '103'>FX 8 (sci-fi)</option>");
	$("#instrument" + trcNum).append("<option value = '104'>Sitar</option>");
	$("#instrument" + trcNum).append("<option value = '105'>Banjo</option>");
	$("#instrument" + trcNum).append("<option value = '106'>Shamisen</option>");
	$("#instrument" + trcNum).append("<option value = '107'>Koto</option>");
	$("#instrument" + trcNum).append("<option value = '108'>Kalimba</option>");
	$("#instrument" + trcNum).append("<option value = '109'>Bagpipe</option>");
	$("#instrument" + trcNum).append("<option value = '110'>Fiddle</option>");
	$("#instrument" + trcNum).append("<option value = '111'>Shanai</option>");
	$("#instrument" + trcNum).append("<option value = '112'>Tinkle Bell</option>");
	$("#instrument" + trcNum).append("<option value = '113'>Agogo</option>");
	$("#instrument" + trcNum).append("<option value = '114'>Steel Drums</option>");
	$("#instrument" + trcNum).append("<option value = '115'>Woodblock</option>");
	$("#instrument" + trcNum).append("<option value = '116'>Taiko Drum</option>");
	$("#instrument" + trcNum).append("<option value = '117'>Melodic Tom</option>");
	$("#instrument" + trcNum).append("<option value = '118'>Synth Drum</option>");
	$("#instrument" + trcNum).append("<option value = '119'>Reverse Cymbal</option>");
	$("#instrument" + trcNum).append("<option value = '120'>Guitar Fret Noise</option>");
	$("#instrument" + trcNum).append("<option value = '121'>Breath Noise</option>");
	$("#instrument" + trcNum).append("<option value = '122'>Seashore</option>");
	$("#instrument" + trcNum).append("<option value = '123'>Bird Tweet</option>");
	$("#instrument" + trcNum).append("<option value = '124'>Telephone Ring</option>");
	$("#instrument" + trcNum).append("<option value = '125'>Helicopter</option>");
	$("#instrument" + trcNum).append("<option value = '126'>Applause</option>");
	$("#instrument" + trcNum).append("<option value = '127'>Gunshot</option>");
};

// 악기
kara.instru = {
	
	// 악기 총 갯수
	getTotCnt: function() {
		return Object.keys(this.list).length;
	},
	
	// 악기 이름
	getName: function(num) {
		
		for(let key in this.list) {
			if(this.list[key] === num) {
				return key;
			}
		}
		
		return null;
	},
	
	// 악기 번호
	getNum: function(name) {
		return this.list[name];
	},
	
	// 악기 목록
	list: {
		"acoustic_grand_piano":		0,
		"bright_acoustic_piano":	1,
		"electric_grand_piano":		2,
		"honkytonk_piano":			3,
		"electric_piano_1":			4,
		"electric_piano_2":			5,
		"harpsichord":				6,
		"clavinet":					7,
		"celesta":					8,
		"glockenspiel":				9,
		"music_box":				10,
		"vibraphone":				11,
		"marimba":					12,
		"xylophone":				13,
		"tubular_bells":			14,
		"dulcimer":					15,
		"drawbar_organ":			16,
		"percussive_organ":			17,
		"rock_organ":				18,
		"church_organ":				19,
		"reed_organ":				20,
		"Accordion":				21,
		"harmonica":				22,
		"tango_accordion":			23,
		"acoustic_guitar_nylon":	24,
		"acoustic_guitar_steel":	25,
		"electric_guitar_jazz":		26,
		"electric_guitar_clean":	27,
		"electric_guitar_muted":	28,
		"overdriven_guitar":		29,
		"distortion_guitar":		30,
		"guitar_harmonics":			31,
		"Acoustic_Bass":			32,
		"electric_bass_finger":		33,
		"electric_bass_pick":		34,
		"fretless_bass":			35,
		"slap_bass_1":				36,
		"slap_bass_2":				37,
		"synth_bass_1":				38,
		"synth_bass_2":				39,
		"violin":					40,
		"viola":					41,
		"cello":					42,
		"contrabass":				43,
		"tremolo_strings":			44,
		"pizzicato_strings":		45,
		"orchestral_harp":			46,
		"timpani":					47,
		"string_ensemble_1":		48,
		"string_ensemble_2":		49,
		"synth_strings_1":			50,
		"synth_strings_2":			51,
		"choir_aahs":				52,
		"voice_oohs":				53,
		"synth_choir":				54,
		"orchestra_hit":			55,
		"trumpet":					56,
		"trombone":					57,
		"tuba":						58,
		"muted_trumpet":			59,
		"french_horn":				60,
		"Brass_Section":			61,
		"synth_brass_1":			62,
		"synth_brass_2":			63,
		"soprano_sax":				64,
		"Alto_Sax":					65,
		"tenor_sax":				66,
		"Baritone_Sax":				67,
		"oboe":						68,
		"english_horn":				69,
		"Bassoon":					70,
		"clarinet":					71,
		"piccolo":					72,
		"flute":					73,
		"recorder":					74,
		"pan_flute":				75,
		"Bottle_Blow":				76,
		"shakuhachi":				77,
		"whistle":					78,
		"ocarina":					79,
		"lead_1_square":			80,
		"lead_2_sawtooth":			81,
		"lead_3_calliope":			82,
		"lead_4_chiff":				83,
		"lead_5_charang":			84,
		"lead_6_voice":				85,
		"lead_7_fifths":			86,
		"lead_8_bass__lead":		87,
		"pad_1_new_age":			88,		
		"pad_2_warm":				89,
		"pad_3_polysynth":			90,
		"pad_4_choir":				91,
		"pad_5_bowed":				92,
		"pad_6_metallic":			93,
		"pad_7_halo":				94,
		"pad_8_sweep":				95,
		"fx_1_rain":				96,
		"fx_2_soundtrack":			97,
		"fx_3_crystal":				98,
		"fx_4_atmosphere":			99,
		"fx_5_brightness":			100,
		"fx_6_goblins":				101,
		"fx_7_echoes":				102,
		"fx_8_scifi":				103,
		"sitar":					104,
		"Banjo":					105,
		"shamisen":					106,
		"koto":						107,
		"kalimba":					108,
		"Bagpipe":					109,
		"fiddle":					110,
		"shanai":					111,
		"tinkle_bell":				112,
		"agogo":					113,
		"steel_drums":				114,
		"woodblock":				115,
		"taiko_drum":				116,
		"melodic_tom":				117,
		"synth_drum":				118,
		"reverse_cymbal":			119,
		"guitar_fret_noise":		120,
		"breath_noise":				121,
		"seashore":					122,
		"bird_tweet":				123,
		"telephone_ring":			124,
		"helicopter":				125,
		"Applause":					126,
		"gunshot":					127
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
// 음악 재생 애니메이션
// 음악 저장
