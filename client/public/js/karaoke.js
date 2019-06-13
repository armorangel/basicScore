if(!window.kara) window.kara = {};

//악보 정보 객체
kara.scoreInfo = {
	title: "title",			// 타이틀 저장
	tempo: "120",			// 템포 저장
	writer: "writer",		// 작가 저장
	key: "major Db",		// 키 저장
	meter: "4/4",			// 박자저장
	time: "",				// 최초 저장 시간
	track: {
		"track1":{
			clef: "G",		// 음자리표
			notes: [],		// 음표배열
			instrument: 0	// 악기번호
		},
		//10개 트랙 생성
		"track2":{clef: "",notes: [],instrument: ""},
		"track3":{clef: "",notes: [],instrument: ""},
		"track4":{clef: "",notes: [],instrument: ""},
		"track5":{clef: "",notes: [],instrument: ""},
		"track6":{clef: "",notes: [],instrument: ""},
		"track7":{clef: "",notes: [],instrument: ""},
		"track8":{clef: "",notes: [],instrument: ""},
		"track9":{clef: "",notes: [],instrument: ""},
		"track10":{clef: "",notes: [],instrument: ""},
	} // 노트 저장
};

// 노트 길이
kara.noteMeter = {// 왜 같은걸 두개로 해놨지
	head: {'whole':16, 'half':8, 'quarter':4, '8th':2, '16th':1},
	rest: {'whole':16, 'half':8, 'quarter':4, '8th':2, '16th':1}
};

// 키 종류
kara.key = {// 심볼 갯수 객체
	major:{'C':0, 'G':1, 'D':2, 'A':3, 'E':4, 'B':5, 'Gb':6, 'Db':5, 'Ab':4, 'Eb':3, 'Bb':2, 'F':1},
	minor:{'Am':0, 'Em':1, 'Bm':2, 'F#m':3, 'C#m':4, 'G#m':5, 'Ebm':6, 'Bbm':5, 'Fm':4, 'Cm':3, 'Gm':2, 'Dm':1}
};

// 배열의 값을 가져와서 음표를 그린다
kara.printNote = function(trcNm) {// trcNm :: Track Name 'track1'
	
	var note = kara.scoreInfo.track[trcNm].notes;	// Array [["E5", "half"], ["E5", "half"]]
	var meter = kara.scoreInfo.meter.split('/');	// ["4", "4"]
	var limited = meter[0] * meter[1];	// 마디 제한 16
	var nowMeter = 0;					// 현재 마디
	var four_boxEnter = 0;
	var four_check = 0;
	var pageInc = 0;
	
	kara.hLine(0, trcNm);	// 한줄 긋고 시작
	
	// 첫마디가 없으면 노트박스 생성
	if(note[0] === undefined) kara.noteBox.print(kara.XY.X(), kara.XY.Y(0), 0, 0, "whole", trcNm);
	
	// 마디 찍기
	for(var i = 0; i < note.length; i++) {
		
		var four_enter = i % 4;
		
		if(four_enter === 0 && i >= 4) {	// 4마디 검사
			
			var four = i / 4;
			
			// 4번째 마디마다 새 오선지 찍기
			kara.hLine(four, trcNm);
			four_boxEnter++;
		}
		
		//음표와 음표 박스 찍기
		for(var j = 0; j < note[i].length; j++) {
			
			var key = kara.scoreInfo.key;
			var keySplit = key.split(' ');
			var M = kara.key[keySplit[0]];
			var N = M[keySplit[1]];
			var X = kara.XY.X();
			var Y = kara.XY.Y(i);
			var a = N * 12 + 70;
			var ac = (X - a) / 4;
			
			var _whole = ac / 2 - 8;
			var _half = _whole / 2;
			var _quarter = _half / 2;
			var _8th = _quarter/2;
			var _16th = _8th/2-8;
			
			var position;

			var pitch = note[i][j][0];
			var meter = note[i][j][1];
			
			if(four_boxEnter == four_check) {

				// 첫 음표 // 악보 선택 영역 그리기
				kara.noteBox.print(kara.XY.X(), kara.XY.Y(four_boxEnter), i, j, meter, trcNm);
				four_check++;
			} else {
				// 두번째 부터 // 악보 선택 영역 그리기
				kara.noteBox_.print(kara.XY.X(), kara.XY.Y(four_boxEnter), i, j, meter, trcNm);
				console.log("그릴 박스는 i는" + i + "j " +  j);
			}
			
			var width = $(`.bar_${i}.note_${j}.${trcNm}`).width();//.bar_1.note_2.track1
			d3.select(`.bar_${i}.note_${j}#${pitch}.${trcNm}`).style("fill", "#ffffff");

			pitchSplit = pitch.split(",");// ["B4", "C6"] 같은 박자에 있는 음표들

			for(var pi = 0; pi < pitchSplit.length; pi++) {
				
				//쉼표 일때는 A4높이에 그리기
				if(pitchSplit[pi] === "rest") position = $(`#A4.bar_${i}.note_${j}.${trcNm}`).position();
				else position = $(`#${pitchSplit[pi]}.bar_${i}.note_${j}.${trcNm}`).position();
					
				var x = position.left - kara.scorePosition.left(trcNm);
				var y = position.top - kara.scorePosition.top(trcNm) + 3;
				
				var leng = 0;	// x 길이 추가

				//길이 대입
				switch(meter) {
					case 'whole':	leng = _whole; break;		// 온음표
					case 'half':	leng = _half; break;		// 2분음표
					case 'quarter':	leng = _quarter; break;		// 4분음표
					case '8th':		leng = _8th; break;			// 8분음표
					case '16th':	leng = _16th; break;		// 16분음표
					default: break;
				}
				
				//leng -= 10;// x 길이 조정
				
				//음표 그리기
				kara.print8th16thQuarterHalfWhole(trcNm, x, leng, y, meter, pitchSplit[pi], pi, meter);
			}

			if(i === note.length - 1 && j === note[i].length - 1) {

				var four_boxEnter2 = four_boxEnter + 1;
				var ii = i + 1;
				var four2 = ii % 4;

				if(four2 == 0 && ii >= 4) {
					if(kara.meterCal_box(i, trcNm)===1) {
						$(`#${trcNm} > #score`).height(four_boxEnter2 * 120 + 300);
						kara.hLine(four_boxEnter2, trcNm);
						kara.noteBox_last.print(kara.XY.X(), kara.XY.Y(four_boxEnter2), i, j, meter, 1, trcNm);
					} else {
						kara.noteBox_last.print(kara.XY.X(), kara.XY.Y(four_boxEnter), i, j, meter, 0, trcNm);
					}
				} else {
					kara.noteBox_last.print(kara.XY.X(), kara.XY.Y(four_boxEnter), i, j, meter, 0, trcNm);
				}
			}
		}
	}
};

// 배열에 음표 담기
kara.noteSelect = {
	push: function(i, j,  pitch, note_meter, track) { // i: 마디 번호 j: 음표 번호
		
		var note = kara.scoreInfo.track[track].notes; // 배열을 받아온다

		if(!jQuery.isArray(note[i])) { //2차원배열이 아니면 2차원 배열 생성
			note[i] = []; // new Array(); [i][]
		}

		if(!jQuery.isArray(note[i][j])) {
			note[i][j] = new Array(2); //[0]은 계이름, [1]은 박자
		}

		if(note[i][j][0] == undefined) { //만약 계이름이 없으면
			note[i][j][0] = pitch; //그냥 넣어라
			
		} else if(note[i][j][0] == "rest") {
			note[i][j][0] = pitch;
		} else { //아니면
			
			var split = note[i][j][0].split(",");
			
			if(split.indexOf(pitch) === -1) {					// 똑같은 음이 없으면
				note[i][j][0] = note[i][j][0] + "," + pitch;	//중복해서 넣는다
			}
		}
		
		note[i][j][1] = note_meter;

		kara.scoreInfo.track[track].notes = note;
		$(".in_bar" + "." + track).remove();

		kara.printNote(track);	// 음표 그리기
		kara.test(track);		// 배열값 표시
	}
};

// 마디에 음표 추가시 음표 추가 가능 여부 검사
// return -1 :: 불가능, 0 :: 가능 마디 꽉참, 1 :: 가능
kara.meterCal = function(bNum, nNum, nowMeter, track) {
	
	var note = kara.scoreInfo.track[track].notes;
	var meter = kara.scoreInfo.meter.split('/');
	var limited = meter[0]*meter[1]; //마디 제한
	var now = 0;
	var noteMeter = kara.noteMeter;
	
	if(note[bNum] == undefined) return;

	for(var i = 0; i < note[bNum].length; i++) {
		var note_meter = noteMeter.head[note[bNum][i][1]];
		now = now + note_meter;
	}
	
	// 지금까지의 마디와 현재 마디를 더하면 초과인가
	if((now + noteMeter.head[nowMeter]) > limited) {
		if(note[bNum][nNum][1] === undefined) {
			alert("마디 초과");
			return -1; // 넣지 못합
		} else {
			now = now - noteMeter.head[note[bNum][nNum][1]] + noteMeter.head[nowMeter] ;
			if(now === limited) {
				return 0;
			} else if(now < limited) {
				kara.barsort(bNum, nNum, nowMeter, track);
				return 1;	// 정상 추가인데 쉼표를 넣어줘야되
			} else {
				alert("마디 초과");
				return -1;	// 그래도 터져
			}
		}
	} else if ((now+noteMeter.head[nowMeter]) === limited) {// 지금까지의 마디와 현재 마디를 더하면 적당한가
		return 0; // 넣을 순 있지만 꽉참
	} else {
		return 1; // 정상적으로 추가
	}
};

kara.meterCal_box = function(bNum, track) {
	
	var note = kara.scoreInfo.track[track].notes;
	var meter = kara.scoreInfo.meter.split('/');
	var limited = meter[0]*meter[1]; //마디 제한
	var now = 0;
	var noteMeter = kara.noteMeter;
	
	if(note[bNum] == undefined) return;
	for(let i=0; i <note[bNum].length; i++) {

		var note_meter = noteMeter.head[note[bNum][i][1]];
		now = now + note_meter;
	}
	
	if (now == limited) return 1;
};

kara.barsort = function(bNum, nNum , nowmeter, track) {
	
	var note = kara.scoreInfo.track[track].notes;
	var copynote = [];
	var barLength = kara.scoreInfo.track[track].notes[bNum].length;
	var noteMeter = kara.noteMeter;
	var pre_meter = kara.scoreInfo.track[track].notes[bNum][nNum][1];
	var remain_meter = 0;
	var i = 0, j = 0;

	for(var k = 0; k < note[bNum].length; k++) {
		copynote[k] = [];	// new Array();
		copynote[k][0] = note[bNum][k][0];
		copynote[k][1] = note[bNum][k][1];
	}

	while(i < nNum) {
		kara.scoreInfo.track[track].notes[bNum][i][0] = copynote[i][0];
		kara.scoreInfo.track[track].notes[bNum][i][1] = copynote[i][1];
		i++;
	}
	
	remain_meter = noteMeter.head[pre_meter] - noteMeter.head[nowmeter];
	i = Number(nNum) + 1;
	
	while(remain_meter > 0) {
		remain_meter = kara.remain_meter(remain_meter, bNum, i, track);
		i++;
	}
	nNum++;
	
	for(var j = nNum; j < barLength; j++) {
		if(!jQuery.isArray(kara.scoreInfo.track[track].notes[bNum][i])) {
			kara.scoreInfo.track[track].notes[bNum][i] = [];	// new Array();
		}
		kara.scoreInfo.track[track].notes[bNum][i][0] = copynote[j][0];
		kara.scoreInfo.track[track].notes[bNum][i][1] = copynote[j][1];
		i++;
	}
};


kara.remain_meter = function(remain_meter, bNum, nNum, track) {
	
	var noteMeter = kara.noteMeter;
	
	if(remain_meter >= noteMeter.head["half"]) {
		if(!jQuery.isArray(kara.scoreInfo.track[track].notes[bNum][nNum])) {
			kara.scoreInfo.track[track].notes[bNum][nNum] = [];	// new Array();
		}
		kara.scoreInfo.track[track].notes[bNum][nNum][0] = "rest";
		kara.scoreInfo.track[track].notes[bNum][nNum][1] = "half";
		remain_meter = remain_meter - noteMeter.head["half"];

		return remain_meter;
	}
	else if(remain_meter >= noteMeter.head["quarter"]) {
		if(!jQuery.isArray(kara.scoreInfo.track[track].notes[bNum][nNum])) {
			kara.scoreInfo.track[track].notes[bNum][nNum] = [];// new Array();
		}
		kara.scoreInfo.track[track].notes[bNum][nNum][0] = "rest";
		kara.scoreInfo.track[track].notes[bNum][nNum][1] = "quarter";
		remain_meter = remain_meter - noteMeter.head["quarter"];

		return remain_meter;
	}
	else if(remain_meter >= noteMeter.head["8th"]){
		if(!jQuery.isArray(kara.scoreInfo.track[track].notes[bNum][nNum])) {
			kara.scoreInfo.track[track].notes[bNum][nNum] = [];// new Array();
		}
		kara.scoreInfo.track[track].notes[bNum][nNum][0] = "rest";
		kara.scoreInfo.track[track].notes[bNum][nNum][1] = "8th";
		remain_meter = remain_meter - noteMeter.head["8th"];

		return remain_meter;
	}
	else{
		if(!jQuery.isArray(kara.scoreInfo.track[track].notes[bNum][nNum])) {
			kara.scoreInfo.track[track].notes[bNum][nNum] = [];// new Array();
		}
		kara.scoreInfo.track[track].notes[bNum][nNum][0] = "rest";
		kara.scoreInfo.track[track].notes[bNum][nNum][1] = "16th";
		remain_meter = remain_meter - noteMeter.head["16th"];

		return remain_meter;
	}
};
