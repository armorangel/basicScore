if(!window.kara) window.kara = {};

//악보 정보 객체
kara.scoreInfo = {
	title: 'title',			// 타이틀 저장
	tempo: 120,			// 템포 저장
	writer: 'writer',		// 작가 저장
	key: 'major Db',		// 키 저장
	meter: '4/4',			// 박자저장
	track: {
		'track1':{
			clef: 'G',		// 음자리표
			notes: [],		// 음표배열
			instrument: 0	// 악기번호
		},
		//10개 트랙 생성
		'track2':{clef: '',notes: [],instrument: ''},
		'track3':{clef: '',notes: [],instrument: ''},
		'track4':{clef: '',notes: [],instrument: ''},
		'track5':{clef: '',notes: [],instrument: ''},
		'track6':{clef: '',notes: [],instrument: ''},
		'track7':{clef: '',notes: [],instrument: ''},
		'track8':{clef: '',notes: [],instrument: ''},
		'track9':{clef: '',notes: [],instrument: ''},
		'track10':{clef: '',notes: [],instrument: ''},
	} // 노트 저장
}

// 노트 길이
kara.noteMeter = {	// 왜 같은걸 두개로 해놨지
	head: {'whole':16, 'half':8, 'quarter':4, '8th':2, '16th':1},
	rest: {'whole':16, 'half':8, 'quarter':4, '8th':2, '16th':1}
}

// 키 종류
kara.key = {	// 심볼 갯수 객체
	major:{'C':0, 'G':1, 'D':2, 'A':3, 'E':4, 'B':5, 'Gb':6, 'Db':5, 'Ab':4, 'Eb':3, 'Bb':2, 'F':1},
	minor:{'Am':0, 'Em':1, 'Bm':2, 'F#m':3, 'C#m':4, 'G#m':5, 'Ebm':6, 'Bbm':5, 'Fm':4, 'Cm':3, 'Gm':2, 'Dm':1}
}

kara.conf = {
	
	score: 'score',	// 악보
	del : 'in_bar'	// 삭제
	
}

// 삭제예정
kara.area = {
	
	score: 'score',	// 악보
	del : 'in_bar'	// 삭제
}