if(!window.kara) window.kara = {};

// 악보 정보 수정
kara.edit = {
	
	// Edit Title
	title: async function() {
		
		// 길이 제한
		// 특수문자 제한
		var value;
		
		const { value: title } = await Swal.fire({
			title: '제목을 입력하세요.',
			input: 'text',
			inputValue: value,
			showCancelButton: true,
			inputValidator: (value) => {
				if (!value) {
					return '제목을 입력하세요.'
				}
			}
		})
		
		if(title) {
			// 악보 정보 객체에 제목 저장
			kara.scoreInfo.title = title
			kara.refresh()		// 삭제영역 제거 후 악보 다시 그리기
		}
	},
	
	// 템포 수정
	tempo: function(trcNm) {	// trcNm Track Name :: 'track1'
		
		// 템포 입력
		var tempo = prompt('tempo')

		// 템포 정합성 검사
		if(!tempo || isNaN(tempo)) {	// isNaN(숫자) ==> false 
			alert('숫자를 입력하세요.')
			return;
		}

		// 템포는 10에서 300사이
		if(tempo < 10 || tempo > 300) {
			alert('템포는 10이상 300이하만 입력할 수 있습니다.')
			return;
		}

		// 악보 정보 객체에 템포 저장
		kara.scoreInfo.tempo = tempo
		kara.refresh()
	},
	
	// 이름 수정
	writer: async function() {
		
		// 길이 제한
		// 특수문자 제한
		var value;
		
		const { value: writer } = await Swal.fire({
			title: '이름을 입력하세요.',
			input: 'text',
			inputValue: value,
			showCancelButton: true,
			inputValidator: (value) => {
				if (!value) {
					return '이름을 입력하세요.'
				}
			}
		})
		
		if(writer) {
			// 악보 정보 객체에 제목 저장
			kara.scoreInfo.writer = writer
			kara.refresh()		// 삭제영역 제거 후 악보 다시 그리기
		}
	},
	
	// 조표 수정
	key: function() {

		
		////////////////////////////
		// major:{'C':0, 'G':1, 'D':2, 'A':3, 'E':4, 'B':5, 'Gb':6, 'Db':5, 'Ab':4, 'Eb':3, 'Bb':2, 'F':1},
		// minor:{'Am':0, 'Em':1, 'Bm':2, 'F#m':3, 'C#m':4, 'G#m':5, 'Ebm':6, 'Bbm':5, 'Fm':4, 'Cm':3, 'Gm':2, 'Dm':1}
		Swal.fire({
			title: '<strong>Select Key</strong>',
			html:
				"<button class='keyBtn'>C</button>" + 
				"<button class='keyBtn'>G</button>" + 
				"<button class='keyBtn'>D</button>" + 
				"<button class='keyBtn'>A</button>" + 
				"<button class='keyBtn'>E</button>" + 
				"<button class='keyBtn'>B</button>" +
				"<button class='keyBtn'>Gb</button>" +
				"<button class='keyBtn'>Db</button>" +
				"<button class='keyBtn'>Ab</button>" +
				"<button class='keyBtn'>Eb</button>" +
				"<button class='keyBtn'>Bb</button>" +
				"<button class='keyBtn'>F</button>" +
				"<br>" +
				"<button class='keyBtn'>Am</button>" +
				"<button class='keyBtn'>Em</button>" +
				"<button class='keyBtn'>Bm</button>" +
				"<button class='keyBtn'>F#m</button>" +
				"<button class='keyBtn'>C#m</button>" +
				"<button class='keyBtn'>G#m</button>" +
				"<button class='keyBtn'>Ebm</button>" +
				"<button class='keyBtn'>Bbm</button>" +
				"<button class='keyBtn'>Fm</button>" +
				"<button class='keyBtn'>Cm</button>" +
				"<button class='keyBtn'>Gm</button>" +
				"<button class='keyBtn'>Dm</button>",

			showConfirmButton: false,
			showCancelButton: true,
			cancelButtonText:'취소',
			width: '50%',

		 	onBeforeOpen: () => {
				const content = Swal.getContent()
				const $ = content.querySelectorAll.bind(content)

				const keyBtn = $('.keyBtn')
				
				for(var i = 0; i < keyBtn.length; i++)  {
			
					keyBtn[i].addEventListener('click', (e) => {
						
						var key = kara.keyvalue(e.target.innerText)

						// 팝업 종료
						Swal.clickConfirm()
						
						// 키 반영
						kara.scoreInfo.key = key.toString()
						kara.refresh()
					})
				}
			},
		})
	},
	
	// 박자 수정
	meter: function() {	// edtMtr
		
		var meter = prompt('meter')
	
		// 박자 정합성 검사
		if(!meter) {
			alert('박자를 입력하세요.')
			return;
		}

		kara.scoreInfo.meter = meter
		kara.refresh()
	},
	
	// 음자리표 수정
	clef: function(trcNm) {
		
		// 음자리표 입력
		var clef = prompt('Clef')

		if(clef === null || clef === '') {
			alert('음자리표를 입력하세요.')
			return;
		}
		// G, F, C가 아니면
		
		if(clef === 'G' || clef === 'g' || clef === 'F' || clef === 'f' || clef === 'C' || clef === 'c') {
			kara.scoreInfo.track[trcNm].clef = clef.toUpperCase()
			kara.refresh()
		} else {
			alert('정확한 음자리 입력')
		}
		
	}	
}

// 조표에 해당하는 key로 변경하여 리턴
// 입력 조표가 major인지 minor인지
kara.keyvalue = function(key) {// key :: 조표 'F'

	// 'G' 입력받은 key의 첫 문자를 대문자로
	var k = key.charAt(0).toUpperCase() + key.slice(1)
	
	switch (k) {
		case 'C':
		case 'G':
		case 'D':
		case 'A':
		case 'E':
		case 'B':
		case 'Gb':
		case 'Db':
		case 'Ab':
		case 'Eb':
		case 'Bb':
		case 'F':	return 'major ' + k;
		case 'Am':
		case 'Em':
		case 'Bm':
		case 'F#m':
		case 'C#m':
		case 'G#m':
		case 'Ebm':
		case 'Bbm':
		case 'Fm':
		case 'Cm':
		case 'Gm':
		case 'Dm':	return 'minor ' + k;
		default: return '';	// 없으면 공백 리턴
	}
};

$('#tabs').click(function(e) {
	
	var klass = e.target.getAttribute('class')
	var id = e.target.getAttribute('id')
	
	notepush.setId(id)
	notepush.setKlass(klass)
	
	// console.log(notepush.id)
})

// 선택한 음을 배열에 담는다
var notepush = {
	
	parentId: '',
	id: '',
	bNum: '',
	nNum: '',
	track: '',
	setId: function(id) {
		this.id = id
	},
	getId: function() {
		return this.id
	},
	setKlass: function(klass) {
		
		var klass_split = klass.split(' ')

		this.bNum = klass_split[1]
		this.nNum = klass_split[2]
		this.track = klass_split[3]
		
		//console.log(klass_split[1])
		//console.log(klass_split[2])
		//console.log(klass_split[3])

		// this.klass = klass_split[1]
	},
	
	// 선택한 음표 배열에 담기
	setNote: function(meter) {
		
		this.meter = meter
		var bNum = this.bNum.split('_')	// 마디번호 -- bar,0
		var nNum = this.nNum.split('_')	// 음표번호 -- note,0
		var trcNm = this.track			// 현재 선택된 트랙 -- 'track1'
		var meterNm = ''				// whole, half, quarter, 8th, 16th
	
		switch(meter) {
			case 1:		meterNm	= 'whole';	break;	// 온음표
			case 2:		meterNm	= 'half';	break;	// 2분음표
			case 4:		meterNm	= 'quarter';break;	// 4분음표
			case 8:		meterNm	= '8th';	break;	// 8분음표
			case 16:	meterNm	= '16th';	break;	// 16분음표

			default:	// 해당하는 음표가 없을 때
				
				// 쉼표
				kara.scoreInfo.track[trcNm].notes[bNum[1]][nNum[1]][0] = 'rest'

				// 다시 그리기
				kara.prtNote(trcNm)
				
				return
		}	// End of switch
		
		// 음표추가 가능 여부		
		if(kara.meterCal(bNum[1], nNum[1], meterNm, trcNm) === -1) return	// 마디 초과
		
		kara.noteSelect.push(bNum[1], nNum[1], this.id, meterNm, trcNm)		// 추가 가능
	}
}


//선택한 음높이 계산
var pitch_select = {
	
	note: ['C', 'D', 'E', 'F', 'G', 'A', 'B'],
	//음 높이 계산 높이에 따른 계이름 반환
	selection: function(pitch) {	// pitch 36 return C6
		
		var m = 1
		var n = m + 6	// 7
		
		for(var i = 1; i <= 7; i++) {		// 1옥타브 부터 7옥타브까지 검사
			if(m <= pitch && pitch <= n) {  // 음높이 계산 현재 범위에 있는 지
				if(pitch % 7 == 0) return this.note[6] + i
				return this.note[(pitch % 7) - 1] + i
			}
			
			// 해당 범위 안에 있지 않으면 한 옥타브 올려서 계산
			m = m + 7	// 1 옥타브 올리기
			n = n + 7	// 1 옥타브 올리기
		}	// End of for
	}
}

var boxWidth = function(meter) {
	
	var key = kara.scoreInfo.key	//현재 악보 키
	var keySplit = key.split(' ')
	var M = kara.key[keySplit[0]]
	var N = M[keySplit[1]]
	var X = kara.XY.X()

	var a = N * 12 + 70
	var ac = (X - a) / 4
	var x = a;
	var width = (X - a) / 4
	
	switch(meter) {
			
		case 'whole':	width = width;		break;	// 온음표
		case 'half':	width = width / 2;	break;	// 2분음표
		case 'quarter':	width = width / 4;	break;	// 4분음표
		case '8th':		width = width / 8;	break;	// 8분음표
		case '16th':	width = width / 16; break;	// 16분음표
		case 32: break;		// 지원안함
		case 64: break;		// 지원안함
		case 128: break;	// 지원안함
		default: break;
			
	}	// End of switch
	
	return width;
};

//음표선택 팝업 호출
var PopLayer = {
	
	nowLayer : "",
	openLayer : "",
	Xpos : "",
	Ypos : "",
	Action : function(strAnchor, strLayer) {
		
		this.nowLayer = strLayer;
		
		if(this.openLayer != "") {
			var objOpenLayer = document.getElementById(this.openLayer);
			objOpenLayer.style.display = "none";
			this.openLayer = "";
		}	// End of if
		this.openLayer = strLayer;
		try {
			strAnchor.onmouseup = PopLayer.Open;
		} catch(e) {}
	},
	Open : function(e) {
		if(document.all) {
			this.Xpos = event.clientX;
			this.Ypos = event.clientY;
		} else {
			this.Xpos = e.clientX;
			this.Ypos = e.clientY;
		}
		var objNowLayer = document.getElementById(PopLayer.nowLayer);

		objNowLayer.style.left = document.body.scrollLeft + this.Xpos + "px";
		objNowLayer.style.top = document.body.scrollTop + this.Ypos + "px";
		objNowLayer.style.display = "block";
	},
	Close : function() {
		this.openLayer = "";
		var objNowLayer = document.getElementById(PopLayer.nowLayer);
		objNowLayer.style.display = "none";
	}
};

// 악기 재생을 위해 계이름을 MIDI숫자로 변환
kara.noteToKey = function(keyArray) {// B4,F4
		
	var split = keyArray.split(',')
	var key = new Array(split.length)	// 반환할 숫자 배열

	// 음 갯수 만큼 반복
	for(let i = 0; i < split.length; i++) {
		
		switch(split[i]) {
				
			case 'A0':	key[i] = 21; break;	// 21
			case 'A#0':	key[i] = 22; break;	// 22
			case 'B0':	key[i] = 23; break;	// 23
				
			case 'C1':	key[i] = 24; break;	// 24
			case 'C#1':	key[i] = 25; break;	// 25
			case 'D1':	key[i] = 26; break;	// 26
			case 'D#1':	key[i] = 27; break;	// 27
			case 'E1':	key[i] = 28; break;	// 28
			case 'F1':	key[i] = 29; break;	// 29
			case 'F#1':	key[i] = 30; break;	// 30
			case 'G1':	key[i] = 31; break;	// 31
			case 'G#1':	key[i] = 32; break;	// 32
			case 'A1':	key[i] = 33; break;	// 33
			case 'A#1':	key[i] = 34; break;	// 34
			case 'B1':	key[i] = 35; break;	// 35

			case 'C2':	key[i] = 36; break;	// 36
			case 'C#2':	key[i] = 37; break;	// 37
			case 'D2':	key[i] = 38; break;	// 38
			case 'D#2':	key[i] = 39; break;	// 39
			case 'E2':	key[i] = 40; break;	// 40
			case 'F2':	key[i] = 41; break;	// 41
			case 'F#2':	key[i] = 42; break;	// 42
			case 'G2':	key[i] = 43; break;	// 43
			case 'G#2':	key[i] = 44; break;	// 44
			case 'A2':	key[i] = 45; break;	// 45
			case 'A#2':	key[i] = 46; break;	// 46
			case 'B2':	key[i] = 47; break;	// 47

			case 'C3':	key[i] = 48; break;	// 48
			case 'C#3':	key[i] = 49; break;	// 49
			case 'D3':	key[i] = 50; break;	// 50
			case 'D#3':	key[i] = 51; break;	// 51
			case 'E3':	key[i] = 52; break;	// 52
			case 'F3':	key[i] = 53; break;	// 53
			case 'F#3':	key[i] = 54; break;	// 54
			case 'G3':	key[i] = 55; break;	// 55
			case 'G#3':	key[i] = 56; break;	// 56
			case 'A3':	key[i] = 57; break;	// 57
			case 'A#3':	key[i] = 58; break;	// 58
			case 'B3':	key[i] = 59; break;	// 59

			case 'C4':	key[i] = 60; break;	// 60
			case 'C#4':	key[i] = 61; break;	// 61
			case 'D4':	key[i] = 62; break;	// 62
			case 'D#4':	key[i] = 63; break;	// 63
			case 'E4':	key[i] = 64; break;	// 64
			case 'F4':	key[i] = 65; break;	// 65
			case 'F#4':	key[i] = 66; break;	// 66
			case 'G4':	key[i] = 67; break;	// 67
			case 'G#4':	key[i] = 68; break;	// 68
			case 'A4':	key[i] = 69; break;	// 69
			case 'A#4':	key[i] = 70; break;	// 70
			case 'B4':	key[i] = 71; break;	// 71

			case 'C5':	key[i] = 72; break;	// 72
			case 'C#5':	key[i] = 73; break;	// 73
			case 'D5':	key[i] = 74; break;	// 74
			case 'D#5':	key[i] = 75; break;	// 75
			case 'E5':	key[i] = 76; break;	// 76
			case 'F5':	key[i] = 77; break;	// 77
			case 'F#5':	key[i] = 78; break;	// 78
			case 'G5':	key[i] = 79; break;	// 79
			case 'G#5':	key[i] = 80; break;	// 80
			case 'A5':	key[i] = 81; break;	// 81
			case 'A#5':	key[i] = 82; break;	// 82
			case 'B5':	key[i] = 83; break;	// 83

			case 'C6':	key[i] = 84; break;	// 84
			case 'C#6':	key[i] = 85; break;	// 85
			case 'D6':	key[i] = 86; break;	// 86
			case 'D#6':	key[i] = 87; break;	// 87
			case 'E6':	key[i] = 88; break;	// 88
			case 'F6':	key[i] = 89; break;	// 89
			case 'F#6':	key[i] = 90; break;	// 90
			case 'G6':	key[i] = 91; break;	// 91
			case 'G#6':	key[i] = 92; break;	// 92
			case 'A6':	key[i] = 93; break;	// 93
			case 'A#6':	key[i] = 94; break;	// 94
			case 'B6':	key[i] = 95; break;	// 95

			case 'C7':	key[i] = 96; break;	// 96
			case 'C#7':	key[i] = 97; break;	// 97
			case 'D7':	key[i] = 98; break;	// 98
			case 'D#7':	key[i] = 99; break;	// 99
			case 'E7':	key[i] = 100; break;// 100
			case 'F7':	key[i] = 101; break;// 101
			case 'F#7':	key[i] = 102; break;// 102
			case 'G7':	key[i] = 103; break;// 103
			case 'G#7':	key[i] = 104; break;// 104
			case 'A7':	key[i] = 105; break;// 105
			case 'A#7':	key[i] = 106; break;// 106
			case 'B7':	key[i] = 107; break;// 107
		}	// End of switch
	}	// End Of for

	//Flat, Sharp 음 높이 조정
	for(let i in split) key[i] += kara.chkSharpFlat(split[i]);

  return key;
};

// sharp 또는 flat이 붙은 음표인지 검사
// return 1 :: sharp이 있으면, -1 :: flat이 있으면, 아무것도 없으면 0
kara.chkSharpFlat = function(pitch) {  // b = -1 return, natural = 0, # = 1;
	
	// Why this funciton is called twice
	const sharpArray = [/F/, /C/, /G/, /D/, /A/, /E/, /B/]
	const flatArray = [/B/, /E/, /A/, /D/, /G/, /C/, /F/]
	const key = kara.scoreInfo.key;
	var keySplit = key.split(' ');						// major, Db
	var keyCnt = kara.key[keySplit[0]][keySplit[1]];	// 변환될 음표의 개수
	var M = kara.key[keySplit[0]];

	for (let key in M) {
		if (key === keySplit[1]) {
			switch(key) {
				// Sharp
				//case 'C':
				//case 'Am': return 0;	// 아무것도 없으면 0
				case 'G': // 1
				case 'Em':
				case 'D': // 2
				case 'Bm':
				case 'A': // 3
				case 'F#m':
				case 'E': // 4
				case 'C#m':
				case 'B': // 5
				case 'G#m':
					for(let i = 0; i < keyCnt; i++) {
						// 해당 음이 #이 붙으면 1을 리턴
						if(sharpArray[i].test(pitch)) return 1;
					}
					break;
				// Flat
				case 'Gb': // 6
				case 'Ebm':
				case 'Ab': // 5
				case 'Bbm':
				case 'Db': // 4
				case 'Fm':
				case 'Eb': // 3
				case 'Cm':
				case 'Bb': // 2
				case 'Gm':
				case 'F': // 1
				case 'Dm':
					for(let i = 0; i < keyCnt; i++) {
						//해당 음이 b이 붙으면 -1을 리턴
						if(flatArray[i].test(pitch)) return -1;
					}
					break;
			}	// End of switch
		}	// End of if
	}	// End of for
	
	return 0;	// 아무것도 없으면
}