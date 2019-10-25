if(!window.kara) window.kara = {}
// 이것도 한곳에 몰아보자

// 배열에 음표 담기
kara.noteSelect = {
	push: function(i, j,  pitch, note_meter, trcNm) { // i: 마디 번호 j: 음표 번호
		// 0, 0, A4, whole, track1
		
		var note = kara.scoreInfo.track[trcNm].notes // 배열을 받아온다

		// 배열 말고 다른 방법은..? Object?!
		// 2차원배열이 아니면 2차원 배열 생성
		if(!jQuery.isArray(note[i])) note[i] = [] // new Array(); [i][]

		// [0]은 계이름, [1]은 박자
		if(!jQuery.isArray(note[i][j])) note[i][j] = new Array(2)

		// 만약 계이름이 없으면
		if(!note[i][j][0])
			note[i][j][0] = pitch	// 그냥 넣어라(A4)
		else if(note[i][j][0] === 'rest')	// 쉼표면
			note[i][j][0] = pitch
		else { //아니면
			let split = note[i][j][0].split(',')
			
			// 똑같은 음이 없으면 추가
			if(split.indexOf(pitch) === -1)
				note[i][j][0] += (',' + pitch)	// A4
		}
		
		note[i][j][1] = note_meter	// whole
		
		kara.prtNote(trcNm)		// 음표 그리기
	}
}

kara.meter = {
	
	// 마디 음표 제한 계산
	limit : function() {
		const meter = kara.scoreInfo.meter.split('/')
	
		return meter[0] * meter[1];
	},
	
	// 좀더 개선
	// 마디에 음표 추가시 음표 추가 가능 여부 검사
	// return -1 :: 불가능, 0 :: 가능 마디 꽉참, 1 :: 가능
	addable : function(bNum, nNum, nowMeter, trcNm) {	// 0, 0, whole, track1
		
		//Why this function is called twice
		const note = kara.scoreInfo.track[trcNm].notes
		const limited = this.limit()	// 마디 제한
		const noteMeter = kara.noteMeter	// {head, rest}
		let now = 0

		if(!note[bNum]) return;

		for(var i = 0; i < note[bNum].length; i++) {
			let note_meter = noteMeter.head[note[bNum][i][1]]
			now = now + note_meter
		}
	
		// 지금까지의 마디와 현재 마디를 더하면 초과인가
		if((now + noteMeter.head[nowMeter]) > limited) {

			// 얼럿창 개선
			if(note[bNum][nNum][1] === undefined) {
				alert("마디 초과")
				return -1; // 넣지 못합
			} else {
				now = now - noteMeter.head[note[bNum][nNum][1]] + noteMeter.head[nowMeter]	// 무슨 계산인지

				if(now === limited) {
					return 0;
				} else if(now < limited) {
					kara.barsort(bNum, nNum, nowMeter, trcNm)
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
	}
}

// 너 뭐야
kara.meterCal_box = function(bNum, trcNm) {	// 0, "track1"
	
	// 이거 줄일 수 없나
	const note = kara.scoreInfo.track[trcNm].notes
	const limited = kara.meter.limit() //마디 제한
	const noteMeter = kara.noteMeter
	/*
	head:
		8th: 2
		16th: 1
		half: 8
		quarter: 4
		whole: 16
		
	rest:
		8th: 2
		16th: 1
		half: 8
		quarter: 4
		whole: 16
	*/
	
	let now = 0
	
	if(!note[bNum]) return;
	
	for(let i = 0; i < note[bNum].length; i++) {
		let note_meter = noteMeter.head[note[bNum][i][1]]	// whole 16	half 8
		now = now + note_meter
	}
	
	if (now == limited) return 1;	// 이 1이 뭔지
};

// 음표 수정 시
kara.barsort = function(bNum, nNum , nowmeter, trcNm) {	// 0, 0, 16th, track1	
	// 무슨 기능인지 확실하게
	var note = kara.scoreInfo.track[trcNm].notes
	var copynote = []
	var barLength = note[bNum].length
	var noteMeter = kara.noteMeter
	var pre_meter = note[bNum][nNum][1]
	var remain_meter = 0
	var i = 0, j = 0

	for(let k = 0; k < note[bNum].length; k++) {
		copynote[k] = []	// new Array();
		copynote[k][0] = note[bNum][k][0]
		copynote[k][1] = note[bNum][k][1]
	}

	while(i < nNum) {
		note[bNum][i][0] = copynote[i][0]
		note[bNum][i][1] = copynote[i][1]
		i++
	}
	
	remain_meter = noteMeter.head[pre_meter] - noteMeter.head[nowmeter]
	i = Number(nNum) + 1
	
	while(remain_meter > 0) {
		remain_meter = kara.remain_meter(remain_meter, bNum, i, trcNm)
		i++
	}
	
	nNum++
	
	for(let j = nNum; j < barLength; j++) {
		
		if(!jQuery.isArray(note[bNum][i]))
			note[bNum][i] = []	// new Array();
		
		note[bNum][i][0] = copynote[j][0]
		note[bNum][i][1] = copynote[j][1]
		
		i++
	}	// End of for
}

kara.remain_meter = function(remain_meter, bNum, nNum, trcNm) {	// 8, 1, 1, track1
	
	var note = kara.scoreInfo.track[trcNm].notes
	var noteMeter = kara.noteMeter
	var meterNm	// half, quarter, 8th, 18th
	
	if(!jQuery.isArray(note[bNum][nNum]))
		note[bNum][nNum] = [];	// new Array()	배열이 아니면

	note[bNum][nNum][0] = 'rest'	// 쉼표	(상수로 전환)
	
	// 상수로 전환
	if(remain_meter >= noteMeter.head.half) meterNm = 'half'				// 8
	else if(remain_meter >= noteMeter.head.quarter) meterNm = 'quarter'		// 4
	else if(remain_meter >= noteMeter.head['8th']) meterNm = '8th'			// 2
	else meterNm = '16th'													// 1
	
	note[bNum][nNum][1] = meterNm
	remain_meter = remain_meter - noteMeter.head[meterNm]
	
	return remain_meter;
};

// 악보 커서 이동
$('body').keypress(function(e) {
	// console.log(e.keyCode)
	
	// 스페이스 키 입력시 화면 움직임 방지
	e.preventDefault()
	e.stopPropagation()
	
	switch(e.keyCode) {
		// 재생 상태
		case 32:	// 재생(스페이스바)
			
			if(!kara.play.isPlaying) {	// 재생 중이 아닐 때
				kara.play.player()
			} else {
				kara.play.stop()
			}
			
			break;
			
		// 방향키로 음표 선택
	}
})