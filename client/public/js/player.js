if(!window.kara) window.kara = {};

// import script
// document.write("<script src='b.js'></script>");


//Init Score(Execute first)
kara.init = {
	
	score: function(trcNm) {	// trcNm: Track Name -- 'track1'
	
		if(!trcNm) trcNm = 'track1';

		let trcNum = trcNm.slice(-1);	// 1

		kara.addInstr(trcNum);	// 트랙별 악기 콤보 추가
		kara.initSvg(trcNm);	// 해당 트랙 svg 구성요소들 SVG 객체 저장, 악보영역 생성 in print.js
		kara.txtSVG(trcNm);		// Draw title, tempo, name SVG in print.js
		kara.prtNote(trcNm);	// 배열의 값을 가져와서 음표를 그린다 in karaoke.js
	}
};

// 악보 초기화
kara.refresh = function() {
	
	// 악보 삭제영역 삭제
	$('.' + kara.area.del).remove();
	
	for (var trcNm in kara.scoreInfo.track) {
			
		// 해당 트랙이 초기화 되었는지 판단
		if(kara.scoreInfo.track[trcNm].clef === '') continue;
		
		// 초기화된 트랙만 그리기
		kara.prtNote(trcNm);	// print Notes
		kara.txtSVG(trcNm); 	// print Text
	}
};

//트랙 탭 추가(개선 필요 -- 탭 생성시 탭 이동)
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
			
			// 트랙 초기화
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

	kara.init.score('track' + trcNum);	// Init Score
};

// Add Combo to select Instruments on Each Track
kara.addInstr = function(trcNum) {	//trackN: trackNumber -- 1

	const trcNm = 'track' + trcNum;	// 'track1'
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
	
	var list = Object.keys(kara.instru.list);
	
	for(var i in list) {
		
		// underscore to camelcase
		list[i] = list[i].replace(/_([a-z0-9])/g, function (g) {return ' ' + g[1].toUpperCase();});
		list[i] = list[i].charAt(0).toUpperCase() + list[i].slice(1);	// 첫 글자 대문자
		
		$('#instrument' + trcNum).append("<option value = '0'>" + list[i]+ "</option>");
	}
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
		}	// End of for
		
		return null;
	},
	
	// 악기 번호
	getNum: function(name) {
		return this.list[name];
	},
	
	// 악기 목록
	list: {
		'acoustic_grand_piano':		0,
		'bright_acoustic_piano':	1,
		'electric_grand_piano':		2,
		'honkytonk_piano':			3,
		'electric_piano_1':			4,
		'electric_piano_2':			5,
		'harpsichord':				6,
		'clavinet':					7,
		'celesta':					8,
		'glockenspiel':				9,
		'music_box':				10,
		'vibraphone':				11,
		'marimba':					12,
		'xylophone':				13,
		'tubular_bells':			14,
		'dulcimer':					15,
		'drawbar_organ':			16,
		'percussive_organ':			17,
		'rock_organ':				18,
		'church_organ':				19,
		'reed_organ':				20,
		'Accordion':				21,
		'harmonica':				22,
		'tango_accordion':			23,
		'acoustic_guitar_nylon':	24,
		'acoustic_guitar_steel':	25,
		'electric_guitar_jazz':		26,
		'electric_guitar_clean':	27,
		'electric_guitar_muted':	28,
		'overdriven_guitar':		29,
		'distortion_guitar':		30,
		'guitar_harmonics':			31,
		'Acoustic_Bass':			32,
		'electric_bass_finger':		33,
		'electric_bass_pick':		34,
		'fretless_bass':			35,
		'slap_bass_1':				36,
		'slap_bass_2':				37,
		'synth_bass_1':				38,
		'synth_bass_2':				39,
		'violin':					40,
		'viola':					41,
		'cello':					42,
		'contrabass':				43,
		'tremolo_strings':			44,
		'pizzicato_strings':		45,
		'orchestral_harp':			46,
		'timpani':					47,
		'string_ensemble_1':		48,
		'string_ensemble_2':		49,
		'synth_strings_1':			50,
		'synth_strings_2':			51,
		'choir_aahs':				52,
		'voice_oohs':				53,
		'synth_choir':				54,
		'orchestra_hit':			55,
		'trumpet':					56,
		'trombone':					57,
		'tuba':						58,
		'muted_trumpet':			59,
		'french_horn':				60,
		'Brass_Section':			61,
		'synth_brass_1':			62,
		'synth_brass_2':			63,
		'soprano_sax':				64,
		'Alto_Sax':					65,
		'tenor_sax':				66,
		'Baritone_Sax':				67,
		'oboe':						68,
		'english_horn':				69,
		'Bassoon':					70,
		'clarinet':					71,
		'piccolo':					72,
		'flute':					73,
		'recorder':					74,
		'pan_flute':				75,
		'Bottle_Blow':				76,
		'shakuhachi':				77,
		'whistle':					78,
		'ocarina':					79,
		'lead_1_square':			80,
		'lead_2_sawtooth':			81,
		'lead_3_calliope':			82,
		'lead_4_chiff':				83,
		'lead_5_charang':			84,
		'lead_6_voice':				85,
		'lead_7_fifths':			86,
		'lead_8_bass__lead':		87,
		'pad_1_new_age':			88,		
		'pad_2_warm':				89,
		'pad_3_polysynth':			90,
		'pad_4_choir':				91,
		'pad_5_bowed':				92,
		'pad_6_metallic':			93,
		'pad_7_halo':				94,
		'pad_8_sweep':				95,
		'fx_1_rain':				96,
		'fx_2_soundtrack':			97,
		'fx_3_crystal':				98,
		'fx_4_atmosphere':			99,
		'fx_5_brightness':			100,
		'fx_6_goblins':				101,
		'fx_7_echoes':				102,
		'fx_8_scifi':				103,
		'sitar':					104,
		'Banjo':					105,
		'shamisen':					106,
		'koto':						107,
		'kalimba':					108,
		'Bagpipe':					109,
		'fiddle':					110,
		'shanai':					111,
		'tinkle_bell':				112,
		'agogo':					113,
		'steel_drums':				114,
		'woodblock':				115,
		'taiko_drum':				116,
		'melodic_tom':				117,
		'synth_drum':				118,
		'reverse_cymbal':			119,
		'guitar_fret_noise':		120,
		'breath_noise':				121,
		'seashore':					122,
		'bird_tweet':				123,
		'telephone_ring':			124,
		'helicopter':				125,
		'Applause':					126,
		'gunshot':					127
	}
};


// 음악 저장


// 마디 여러등분으로 나눠 음정
// 마디 여러 등분으로 나누기
// 블록 지정 반복 재생
// 반복재생
// 악보 저장 텍스트형식


// 재생 정지 버튼 유무
// 표식 삽입 후 추적
// 마디를 그룹지정
// 마디 그룹으로 악보 자동 생성
// 코드진행 자동 생성
// 마디 블록 지정
// 음악 재생 및 일시정지
// 음악 재생 애니메이션

