if(!window.kara) window.kara = {};


kara.edit = {
	
	// Edit Title
	title: function(trcNm) {// track Track Name :: 'track1'
		//제목 입력
		var title = prompt('Title');

		// 제목 정합성 검사
		if(title === '' || title === null) {
			alert('제목을 입력하세요');
			return;
		}

		// 악보 정보 객체에 제목 저장
		kara.scoreInfo.title = title;

		kara.refresh();		// 삭제영역 제거 후 악보 다시 그리기
	},
	
	// 템포 수정
	tempo: function(trcNm) {// trcNm Track Name :: 'track1'
		
		// 템포 입력
		var tempo = prompt("tempo");

		// 템포 정합성 검사
		if(tempo === "" || tempo === null || isNaN(tempo)) {//isNaN(숫자) ==> false 
			alert("숫자를 입력하세요.");
			return;
		}

		// 템포는 10에서 300사이
		if(tempo < 10 || tempo > 300) {
			alert("템포는 10이상 300이하만 입력할 수 있습니다.");
			return;
		}

		// 악보 정보 객체에 템포 저장
		kara.scoreInfo.tempo = tempo;

		kara.refresh();
	},
	
	// 작곡가 수정
	writer: function(trcNm) {// track Track Name :: 'track1'
		// 작곡가 입력
		var writer = prompt("Writer");

		// 작곡가 정합성 검사
		if(writer == "" || writer === null){
			alert("작곡가명을 입력하세요.");
			return;
		}

		// 악보 정보 객체에 작곡가 저장
		kara.scoreInfo.writer = writer;
		
		kara.refresh();
	},
	
	// 조표 수정
	key: function() {
		
		// 조표 입력
		var key = prompt("Key");

		// 조표 정합성 검사
		if(key === null || key === '') {
			alert("조표를 입력하세요");
			return;
		}

		key = kara.keyvalue(key);

		// 정해진 조표 입력 검사
		if(!kara.keyTrueofFalse(key)) return;

		kara.scoreInfo.key = key.toString();

		kara.refresh();
	},
	
	// 박자 수정
	meter: function() {
		
		var meter = prompt("meter");
	
		// 박자 정합성 검사
		if(meter === '' || meter === null) {
			alert('박자를 입력하세요.');
			return;
		}

		var meterSplit = meter.split("/");
		kara.scoreInfo.meter = meterSplit[1] + "/" + meterSplit[0];

		$(".in_bar").remove();
		kara.printNote();
	},
	
	// 음자리표 수정
	clef: function(trcNm) {
		
		// 음자리표 입력
		var clef = prompt("Clef");

		if(clef === null || clef === '') {
			alert("음자리표를 입력하세요.");
			return;
		}

		kara.scoreInfo.track[trcNm].clef = clef.toUpperCase();

		$(".in_bar").remove();
		kara.refresh();
	}
	
};

// 정해진 조표 입력 검사
kara.keyTrueofFalse = function(key) {// key :: key -- 'major C'
	
	switch (key) {
		case "major C":
		case "major G":
		case "major D":
		case "major A":
		case "major E":
		case "major B":
		case "major Gb":
		case "major Db":
		case "major Ab":
		case "major Eb":
		case "major Bb":
		case "major F":
		case "minor Am":
		case "minor Em":
		case "minor Bm":
		case "minor F#m":
		case "minor C#m":
		case "minor G#m":
		case "minor Ebm":
		case "minor Bbm":
		case "minor Fm":
		case "minor Cm":
		case "minor Gm":
		case "minor Dm":	return true;
		default:			return false;
	}
};

// 조표에 해당하는 key로 변경하여 리턴
// 입력 조표가 major인지 minor인지
kara.keyvalue = function(key) {// key :: 조표 'F'

	// 'G' 입력받은 key의 첫 문자를 대문자로
	var k = key.charAt(0).toUpperCase() + key.slice(1);
	
	switch (k) {
		case "C":
		case "G":
		case "D":
		case "A":
		case "E":
		case "B":
		case "Gb":
		case "Db":
		case "Ab":
		case "Eb":
		case "Bb":
		case "F":	return 'major ' + k;
		case "Am":
		case "Em":
		case "Bm":
		case "F#m":
		case "C#m":
		case "G#m":
		case "Ebm":
		case "Bbm":
		case "Fm":
		case "Cm":
		case "Gm":
		case "Dm":	return 'minor ' + k;
		default: return '';
	}
};


// 탭 클릭시 트랙 변경 이벤트
$('#tab').click(function(e) {
	// 탭 변경 후 악보 리셋
	kara.refresh();
});


$('#tabs').click(function(e) {
	
	var klass = e.target.getAttribute('class');
	var id = e.target.getAttribute('id');
	var id_P = $('#' + id).parent();

	notepush.setId(id);
	notepush.setKlass(klass);
	
	console.log(notepush.id);
});

// 선택한 음을 배열에 담는다
var notepush = {
	
	parentId:'',
	id:'',
	bNum:'',
	nNum:'',
	track:'',
	setId: function(id) {
		this.id = id;
	},
	getId: function() {
		return this.id;
	},
	setKlass: function(klass) {
		var klass_split = klass.split(' ');

		this.bNum = klass_split[1];
		this.nNum = klass_split[2];
		this.track = klass_split[3];
		
		console.log(klass_split[1]);
		console.log(klass_split[2]);
		console.log(klass_split[3]);

		// this.klass = klass_split[1];
	},
	
	// 선택한 음표 배열에 담기
	setNote: function(meter) {
		
		this.meter = meter;
		var bNum = this.bNum.split('_');	// 마디번호 -- bar,0
		var nNum = this.nNum.split('_');	// 음표번호 -- note,0
		var trcNm = this.track;				// 현재 선택된 트랙 -- 'track1'

		switch(meter) {
			case 1: // 온음표
				if(kara.meterCal(bNum[1], nNum[1], 'whole', trcNm) == -1) {	// 마디 초과
					return;
				} else if(kara.meterCal(bNum[1], nNum[1], "whole", trcNm) == 0) { // 마디 꽉차서
					let bbNum = bNum[1];
					bbNum = bbNum + 1;
					kara.noteSelect.push(bNum[1], nNum[1], this.id, "whole", trcNm); // push
				} else {
					kara.noteSelect.push(bNum[1], nNum[1], this.id, "whole", trcNm);
				}
				break;
				
			case 2: // 2분음표
				if(kara.meterCal(bNum[1], nNum[1], "half", trcNm) == -1) { // 마디 초과
					return;
				} else if(kara.meterCal(bNum[1], nNum[1], "half", trcNm) == 0) { //마디 꽉차서
					let bbNum = bNum[1];
					bbNum = bbNum + 1;
					kara.noteSelect.push(bNum[1], nNum[1], this.id, "half", trcNm); // push
				} else {
					kara.noteSelect.push(bNum[1], nNum[1], this.id, "half", trcNm);
				}
				break;
				
			case 4: // 4분음표 "quarter"
				if(kara.meterCal(bNum[1], nNum[1], "quarter", trcNm) == -1) { // 마디 초과
					return;
				} else if(kara.meterCal(bNum[1], nNum[1], "quarter", trcNm) == 0) { //마디 꽉차서
					let bbNum = bNum[1];
					bbNum = bbNum+1;
					kara.noteSelect.push(bNum[1], nNum[1], this.id, "quarter", trcNm); // push
				} else {
					kara.noteSelect.push(bNum[1], nNum[1], this.id, "quarter", trcNm);
				}
				break;
				
			case 8: // 8분음표 "8th"
				if(kara.meterCal(bNum[1], nNum[1], "8th", trcNm) == -1) { // 마디 초과
					return;
				} else if(kara.meterCal(bNum[1], nNum[1], "8th", trcNm) == 0) { //마디 꽉차서
					let bbNum = bNum[1];
					bbNum = bbNum + 1;
					kara.noteSelect.push(bNum[1], nNum[1], this.id, "8th", trcNm); // push
				} else {
					kara.noteSelect.push(bNum[1], nNum[1], this.id, "8th", trcNm);
				}
				break;
				
			case 16: //16분음표
				if(kara.meterCal(bNum[1], nNum[1], "16th", trcNm) == -1) { // 마디 초과
					return;
				} else if(kara.meterCal(bNum[1], nNum[1], "16th", trcNm) == 0) { //마디 꽉차서
					var bbNum = bNum[1];
					bbNum = bbNum + 1;
					kara.noteSelect.push(bNum[1], nNum[1], this.id, "16th", trcNm); // push
				} else {
					kara.noteSelect.push(bNum[1], nNum[1], this.id, "16th", trcNm);
				}
				break;
				
			default:
				kara.scoreInfo.track[trcNm].notes[bNum[1]][nNum[1]][0] = "rest";
				$(".in_bar" + "." + trcNm).remove();

				kara.printNote(trcNm);
				kara.test(trcNm);
				break;
		}
	}
};


//선택한 음높이 계산
var pitch_select = {
	
	note: ['C', 'D', 'E', 'F', 'G', 'A', 'B'],
	//음 높이 계산 높이에 따른 계이름 반환
	selection: function(pitch) {	// pitch 36 return C6
		
		var m = 1;
		var n = m + 6;	// 7
		
		for(var i = 1; i <= 7; i++) {		// 1옥타브 부터 7옥타브까지 검사
			if(m <= pitch && pitch <= n) {  // 음높이 계산 현재 범위에 있는 지
				if(pitch % 7 == 0) return this.note[6] + i;
				return this.note[(pitch % 7) - 1] + i;
			}
			
			// 해당 범위 안에 있지 않으면 한 옥타브 올려서 계산
			m = m + 7;	// 1 옥타브 올리기
			n = n + 7;	// 1 옥타브 올리기
		}
	}
};

var boxWidth = function(meter) {
	
	var key = kara.scoreInfo.key;	//현재 악보 키
	var keySplit = key.split(' ');
	var M = kara.key[keySplit[0]];
	var N = M[keySplit[1]];
	var X = kara.XY.X();

	var a = N * 12 + 70;
	var ac = (X - a) / 4;
	var x = a;
	var width = (X - a) / 4;
	
	switch(meter){
		case 'whole': //온음표
			width = width;
			break;
		case 'half': //2분음표
			width = width / 2;
			break;
		case 'quarter': //4분음표
			width = width / 4;
			break;
		case '8th': //8분음표
			width = width / 8;
			break;
		case '16th': //16분음표
			width = width / 16;
			break;
		case 32: break;
		case 64: break;
		case 128: break;
		default: break;
	}
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
		}
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

kara.noteToKey = function(keyArray) {
	
	var split = keyArray.split(",");
	var leng = split.length;
	var key = new Array(leng);

	for(var i = 0; i < split.length; i++) {
		switch(split[i]){
		  case "A0"://21
			key[i] = 21; break;
		  case "A#0"://22
			key[i] = 22; break;
		  case "B0"://23
			key[i] = 23; break;

		  case "C1"://24
			key[i] = 24; break;
		  case "C#1"://25
			key[i] = 25; break;
		  case "D1"://26
			key[i] = 26; break;
		  case "D#1"://27
			key[i] = 27; break;
		  case "E1"://28
			key[i] = 28; break;
		  case "F1"://29
			key[i] = 29; break;
		  case "F#1"://30
			key[i] = 30; break;
		  case "G1"://31
			key[i] = 31; break;
		  case "G#1"://32
			key[i] = 32; break;
		  case "A1"://33
			key[i] = 33; break;
		  case "A#1"://34
			key[i] = 34; break;
		  case "B1"://35
			key[i] = 35; break;

		  case "C2"://36
			key[i] = 36; break;
		  case "C#2"://37
			key[i] = 37; break;
		  case "D2"://38
			key[i] = 38; break;
		  case "D#2"://39
			key[i] = 39; break;
		  case "E2"://40
			key[i] = 40; break;
		  case "F2"://41
			key[i] = 41; break;
		  case "F#2"://42
			key[i] = 42; break;
		  case "G2"://43
			key[i] = 43; break;
		  case "G#2"://44
			key[i] = 44; break;
		  case "A2"://45
			key[i] = 45; break;
		  case "A#2"://46
			key[i] = 46; break;
		  case "B2"://47
			key[i] = 47; break;

		  case "C3"://48
			key[i] = 48; break;
		  case "C#3"://49
			key[i] = 49; break;
		  case "D3"://50
			key[i] = 50; break;
		  case "D#3"://51
			key[i] = 51; break;
		  case "E3"://52
			key[i] = 52; break;
		  case "F3"://53
			key[i] = 53; break;
		  case "F#3"://54
			key[i] = 54; break;
		  case "G3"://55
			key[i] = 55; break;
		  case "G#3"://56
			key[i] = 56; break;
		  case "A3"://57
			key[i] = 57; break;
		  case "A#3"://58
			key[i] = 58; break;
		  case "B3"://59
			key[i] = 59; break;

		  case "C4"://60
			key[i] = 60; break;
		  case "C#4"://61
			key[i] = 61; break;
		  case "D4"://62
			key[i] = 62; break;
		  case "D#4"://63
			key[i] = 63; break;
		  case "E4"://64
			key[i] = 64; break;
		  case "F4"://65
			key[i] = 65; break;
		  case "F#4"://66
			key[i] = 66; break;
		  case "G4"://67
			key[i] = 67; break;
		  case "G#4"://68
			key[i] = 68; break;
		  case "A4"://69
			key[i] = 69; break;
		  case "A#4"://70
			key[i] = 70; break;
		  case "B4"://71
			key[i] = 71; break;

		  case "C5"://72
			key[i] = 72; break;
		  case "C#5"://73
			key[i] = 73; break;
		  case "D5"://74
			key[i] = 74; break;
		  case "D#5"://75
			key[i] = 75; break;
		  case "E5"://76
			key[i] = 76; break;
		  case "F5"://77
			key[i] = 77; break;
		  case "F#5"://78
			key[i] = 78; break;
		  case "G5"://79
			key[i] = 79; break;
		  case "G#5"://80
			key[i] = 80; break;
		  case "A5"://81
			key[i] = 81; break;
		  case "A#5"://82
			key[i] = 82; break;
		  case "B5"://83
			key[i] = 83; break;

		  case "C6"://84
			key[i] = 84; break;
		  case "C#6"://85
			key[i] = 85; break;
		  case "D6"://86
			key[i] = 86; break;
		  case "D#6"://87
			key[i] = 87; break;
		  case "E6"://88
			key[i] = 88; break;
		  case "F6"://89
			key[i] = 89; break;
		  case "F#6"://90
			key[i] = 90; break;
		  case "G6"://91
			key[i] = 91; break;
		  case "G#6"://92
			key[i] = 92; break;
		  case "A6"://93
			key[i] = 93; break;
		  case "A#6"://94
			key[i] = 94; break;
		  case "B6"://95
			key[i] = 95; break;

		  case "C7"://96
			key[i] = 96; break;
		  case "C#7"://97
			key[i] = 97; break;
		  case "D7"://98
			key[i] = 98; break;
		  case "D#7"://99
			key[i] = 99; break;
		  case "E7"://100
			key[i] = 100; break;
		  case "F7"://101
			key[i] = 101; break;
		  case "F#7"://102
			key[i] = 102; break;
		  case "G7"://103
			key[i] = 103; break;
		  case "G#7"://104
			key[i] = 104; break;
		  case "A7"://105
			key[i] = 105; break;
		  case "A#7"://106
			key[i] = 106; break;
		  case "B7"://107
			key[i] = 107; break;
    }
  }

	for(var j = 0; j < split.length; j++){
		if(kara.key_er(split[j]) === 1){
			var temp = key[j];
			key[j] = temp + 1;
		}
		if(kara.key_er(split[j]) === 0){
			var temp = key[j];
			key[j] = temp;
		}
		if(kara.key_er(split[j]) === -1){
			var temp = key[j];
			key[j] = temp - 1;
		}
	}
  return key;
};

// sharp 또는 flat이 붙은 음표인지 검사
// return 1 :: sharp이 있으면, -1 :: flat이 있으면, 아무것도 없으면 0
kara.key_er = function(pitch) {  // b = -1 return, natural = 0, # = 1;
	
	var sharpArray = [/F/, /C/, /G/, /D/, /A/, /E/, /B/];
	var flatArray = [/B/, /E/, /A/, /D/, /G/, /C/, /F/];
	var key = kara.scoreInfo.key;
	var keySplit = key.split(" ");
	var keyNum = kara.key[keySplit[0]][keySplit[1]]; // 변환될 음표의 개수
	var M = kara.key[keySplit[0]];
	var regexp;

	for (let key in M) {
		if (key == keySplit[1]) {
			switch(key){
				case 'C': return 0;	// 아무것도 없으면 0
				case 'Am': return 0;// 아무것도 없으면 0
				case 'G': //1
				case 'Em':
				case 'D': //2
				case 'Bm':
				case 'A': //3
				case 'F#m':
				case 'E': //4
				case 'C#m':
				case 'B': //5
				case 'G#m':
					for(let i = 0; i < M[keySplit[1]]; i++) {
						regexp = sharpArray[i];
						// 그 음이 #이 붙으면 1을 리턴
						if(regexp.test(pitch)) return 1;
					}
					break;
				case 'Gb': //6
				case 'Ebm':
				case 'Ab': //5
				case 'Bbm':
				case 'Db': //4
				case 'Fm':
				case 'Eb': //3
				case 'Cm':
				case 'Bb': //2
				case 'Gm':
				case 'F': //1
				case 'Dm':
					for(let i = 0; i < M[keySplit[1]]; i++) {
						regexp = flatArray[i];
						
						//그 음이 b이 붙으면 -11을 리턴
						if(regexp.test(pitch)) return -1;
					}
					break;
			}
		}
	}
	
	return 0;	// 아무것도 없으면
};

kara.maxLength = function(chordArray) {
	
	var longlen = 0;
	var nowlen = 0;

	for(var o = 0; o < chordArray.length; o++) {
		for(var oo = 0; oo < chordArray[o].length; oo++) {
			nowlen = nowlen + kara.noteMeter.head[chordArray[o][oo][1]];
		}
		if(nowlen >= longlen) {
			longlen = nowlen;
		}
		nowlen = 0;
	}
	return longlen;
};




// kara.editNote = function(pitch){ //음표 수정
// 	$('body').unbind('click');
//
// 	// var id = $('body').click(function(e){
// 	// 		var id = e.target.getAttribute('id');
// 	// 		if ( ( id != '') && (id != null)){
// 	// 			alert(id);
// 	// 			console.log(id);
// 	// 			return id;
// 	// 		}
// 	//
// 	// });
//
// 	var position = $(this).position();
//
// 	// console.log(id.width());
//
// 	var x = position.left + $(this).width();
// 	var y = position.top;
//
// 	console.log(x);
// 	console.log(y);
// 	svgContainer.append("rect")
// 		.attr("x", 100)
// 		.attr("y", y)
// 		.style("width", "50")
// 		.style("height", "50")
// 		// .style("position", "absolute")
// 		// .style("z-index", "10000")
// 		.style("fill", "#000000");




	// switch(pitch){
	// 	case 0:
	// 		kara.printSymbol('noteheads.whole', 10,10);
	// 	case 1:
	// 		kara.printSymbol('noteheads.whole', 10,10);
	// 	case 2:
	// 		kara.printSymbol('noteheads.whole', 10,10);
	// 	case 3:
	// 		kara.printSymbol('noteheads.whole', 10,10);
	// 	case 4:
	// 		kara.printSymbol('noteheads.whole', 10,10);
	// 	case 5:
	// 		kara.printSymbol('noteheads.whole', 10,10);
	// }
// }
