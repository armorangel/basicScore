if(!window.kara) window.kara = {};

//악보 정보 객체
kara.scoreInfo = {
	title: 'title',			// 타이틀 저장
	tempo: '120',			// 템포 저장
	writer: 'writer',		// 작가 저장
	key: 'major Db',		// 키 저장
	meter: '4/4',			// 박자저장
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
kara.noteMeter = {	// 왜 같은걸 두개로 해놨지
	head: {'whole':16, 'half':8, 'quarter':4, '8th':2, '16th':1},
	rest: {'whole':16, 'half':8, 'quarter':4, '8th':2, '16th':1}
};

// 키 종류
kara.key = {	// 심볼 갯수 객체
	major:{'C':0, 'G':1, 'D':2, 'A':3, 'E':4, 'B':5, 'Gb':6, 'Db':5, 'Ab':4, 'Eb':3, 'Bb':2, 'F':1},
	minor:{'Am':0, 'Em':1, 'Bm':2, 'F#m':3, 'C#m':4, 'G#m':5, 'Ebm':6, 'Bbm':5, 'Fm':4, 'Cm':3, 'Gm':2, 'Dm':1}
};

// 배열에 음표 담기
kara.noteSelect = {
	push: function(i, j,  pitch, note_meter, trcNm) { // i: 마디 번호 j: 음표 번호
		// 0, 0, A4, whole, track1
		
		var note = kara.scoreInfo.track[trcNm].notes; // 배열을 받아온다

		// 2차원배열이 아니면 2차원 배열 생성
		if(!jQuery.isArray(note[i])) note[i] = []; // new Array(); [i][]

		// [0]은 계이름, [1]은 박자
		if(!jQuery.isArray(note[i][j])) note[i][j] = new Array(2);

		// 만약 계이름이 없으면
		if(!note[i][j][0])
			note[i][j][0] = pitch;	// 그냥 넣어라(A4)
		else if(note[i][j][0] === 'rest')	// 쉼표면
			note[i][j][0] = pitch;
		else { //아니면
			var split = note[i][j][0].split(',');
			
			// 똑같은 음이 없으면 추가
			if(split.indexOf(pitch) === -1)
				note[i][j][0] += (',' + pitch);	// A4
		}
		
		note[i][j][1] = note_meter;	// whole

		$('.in_bar.' + trcNm).remove();
		
		kara.prtNote(trcNm);		// 음표 그리기
	}
};

// 마디에 음표 추가시 음표 추가 가능 여부 검사
// return -1 :: 불가능, 0 :: 가능 마디 꽉참, 1 :: 가능
kara.meterCal = function(bNum, nNum, nowMeter, trcNm) {	// 0, 0, whole, track1
	
	//Why this function is called twice
	var note = kara.scoreInfo.track[trcNm].notes;
	var meter = kara.scoreInfo.meter.split('/');
	var limited = meter[0] * meter[1];	// 마디 제한
	var now = 0;
	var noteMeter = kara.noteMeter;	// {head, rest}
	
	if(!note[bNum]) return;

	for(var i = 0; i < note[bNum].length; i++) {
		let note_meter = noteMeter.head[note[bNum][i][1]];
		now = now + note_meter;
	}
	
	// 지금까지의 마디와 현재 마디를 더하면 초과인가
	if((now + noteMeter.head[nowMeter]) > limited) {
		
		if(note[bNum][nNum][1] === undefined) {
			alert("마디 초과");
			return -1; // 넣지 못합
		} else {
			now = now - noteMeter.head[note[bNum][nNum][1]] + noteMeter.head[nowMeter];
			
			if(now === limited) {
				return 0;
			} else if(now < limited) {
				kara.barsort(bNum, nNum, nowMeter, trcNm);
				return 1;	// 정상 추가인데 쉼표를 넣어줘야되
			} else {
				alert('마디 초과')
				return -1;	// 그래도 터져
			}
		}
		
	} else if ((now + noteMeter.head[nowMeter]) === limited) {	// 지금까지의 마디와 현재 마디를 더하면 적당한가
		return 0; // 넣을 순 있지만 꽉참
	} else {
		return 1; // 정상적으로 추가
	}
};

kara.meterCal_box = function(bNum, track) {
	
	var note = kara.scoreInfo.track[track].notes;
	var meter = kara.scoreInfo.meter.split('/');
	var limited = meter[0] * meter[1]; //마디 제한
	var now = 0;
	var noteMeter = kara.noteMeter;
	
	if(!note[bNum]) return;
	
	for(let i = 0; i < note[bNum].length; i++) {
		var note_meter = noteMeter.head[note[bNum][i][1]];
		now = now + note_meter;
	}
	
	if (now == limited) return 1;
};

kara.barsort = function(bNum, nNum , nowmeter, trcNm) {	// 0, 0, 16th, track1
	
	var note = kara.scoreInfo.track[trcNm].notes;
	var copynote = [];
	var barLength = note[bNum].length;
	var noteMeter = kara.noteMeter;
	var pre_meter = note[bNum][nNum][1];
	var remain_meter = 0;
	var i = 0, j = 0;

	for(let k = 0; k < note[bNum].length; k++) {
		copynote[k] = [];	// new Array();
		copynote[k][0] = note[bNum][k][0];
		copynote[k][1] = note[bNum][k][1];
	}

	while(i < nNum) {
		note[bNum][i][0] = copynote[i][0];
		note[bNum][i][1] = copynote[i][1];
		i++;
	}
	
	remain_meter = noteMeter.head[pre_meter] - noteMeter.head[nowmeter];
	i = Number(nNum) + 1;
	
	while(remain_meter > 0) {
		remain_meter = kara.remain_meter(remain_meter, bNum, i, trcNm);
		i++;
	}
	
	nNum++;
	
	for(let j = nNum; j < barLength; j++) {
		
		if(!jQuery.isArray(note[bNum][i]))
			note[bNum][i] = [];	// new Array();
		
		note[bNum][i][0] = copynote[j][0];
		note[bNum][i][1] = copynote[j][1];
		
		i++;
	}	// End of for
};

kara.remain_meter = function(remain_meter, bNum, nNum, trcNm) {	// 8, 1, 1, track1
	
	var note = kara.scoreInfo.track[trcNm].notes;
	var noteMeter = kara.noteMeter;
	var meterNm;	// half, quarter, 8th, 18th
	
	if(!jQuery.isArray(note[bNum][nNum]))
		note[bNum][nNum] = [];	// new Array()	배열이 아니면

	note[bNum][nNum][0] = 'rest';	// 쉼표
	
	if(remain_meter >= noteMeter.head.half) meterNm = 'half';				// 8
	else if(remain_meter >= noteMeter.head.quarter) meterNm = 'quarter';	// 4
	else if(remain_meter >= noteMeter.head['8th']) meterNm = '8th';			// 2
	else meterNm = '16th';													// 1
	
	note[bNum][nNum][1] = meterNm;
	remain_meter = remain_meter - noteMeter.head[meterNm];
	
	return remain_meter;
};

// 악보 커서 이동
$('body').keypress(function(e) {
	console.log(e.keyCode)
	
	// 스페이스 키 입력시 화면 움직임 방지
	e.preventDefault();
	e.stopPropagation();
	
	switch(e.keyCode) {
		// 재생 상태
		case 32:	// 재생(스페이스바)
			
			if(!kara.play.isPlaying) {	// 재생 중이 아닐 때
				kara.play.player()
			} else {
				kara.play.stop()
			}
			//console.log('!kara.play.isPlaying :: ' + !kara.play.isPlaying);
			//kara.play.isPlaying = !kara.play.isPlaying
			//console.log('kara.play.isPlaying :: ' + kara.play.isPlaying);
			
			break;
	}
});