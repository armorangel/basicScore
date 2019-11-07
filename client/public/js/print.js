if(!window.kara) window.kara = {}

// Printing Score


//악보 트랙별 SVG 객체
kara.svg = {	
	'track1': {
		svgContainer: null,
		svgLine: null,
		svgText: null,
		svgSymbol: null,
		svgNote: null,
		svgBox: null
	},
	// 10개 트랙 생성
	'track2': {svgContainer: null,svgLine: null,svgText: null,svgSymbol: null,svgNote: null,svgBox: null},
	'track3': {svgContainer: null,svgLine: null,svgText: null,svgSymbol: null,svgNote: null,svgBox: null},
	'track4': {svgContainer: null,svgLine: null,svgText: null,svgSymbol: null,svgNote: null,svgBox: null},
	'track5': {svgContainer: null,svgLine: null,svgText: null,svgSymbol: null,svgNote: null,svgBox: null},
	'track6': {svgContainer: null,svgLine: null,svgText: null,svgSymbol: null,svgNote: null,svgBox: null},
	"track7": {svgContainer: null,svgLine: null,svgText: null,svgSymbol: null,svgNote: null,svgBox: null},
	"track8": {svgContainer: null,svgLine: null,svgText: null,svgSymbol: null,svgNote: null,svgBox: null},
	"track9": {svgContainer: null,svgLine: null,svgText: null,svgSymbol: null,svgNote: null,svgBox: null},
	"track10": {svgContainer: null,svgLine: null,svgText: null,svgSymbol: null,svgNote: null,svgBox: null}
};

//해당 트랙 svg 구성요소들 SVG 객체 저장, 악보영역 생성
kara.initSvg = function(trcNm) {	// trcNm: Track Name -- 'track1'
	
	const trcSvg = kara.svg[trcNm]		// kara.svg['track1'] 트랙별 SVG 객체
	const width = $('#tabs').width()	// 악보 탭 넓이
	let svgContainer					// #track1 > #score SVG 트랙영역

	//svgContainer = SVG(trcNm).size(width - 43, 400);// SVG.js test
	// 악보영역 생성후 저장
	
	
	//var svgTag = "<svg id='score' xmlns='http://www.w3.org/2000/svg' version='1.1' xmlns:xlink='http://www.w3.org/1999/xlink'></svg>";
	//$('#' + trcNm).append(svgTag);
	//svgContainer = $('#' + trcNm + ' > #score').width(width-43).height(400);

	
	svgContainer = d3.select('#' + trcNm)			// '#track1'
					.append('svg')					// SVG 객체 생성
					.attr('id', kara.conf.score)			// #score :: 악보영역
					.attr('xmlns', 'http://www.w3.org/2000/svg')
					.attr('version', '1.1')
					.attr('xmlns:xlink', 'http://www.w3.org/1999/xlink')
					.style('width', width - 43)		// 악보 넓이 //우측부터 43
					.style('height', '400')			// 악보 높이	(브라우저 크기로)
	
	/*
	svgContainer = d3.select('#' + trcNm + ' > #score')	// '#track1'
					.style('width', width - 43)			// 악보 넓이 //우측부터 43
					.style('height', '400');			// 악보 높이
	*/
	
	trcSvg.svgContainer	= svgContainer
	
	// 합칠까
	trcSvg.svgText		= svgContainer.append('g').attr('id', 'text')	// title, tempo, writer
	trcSvg.svgLine		= svgContainer.append('g').attr('id', 'lines')	// line(오선지)
	trcSvg.svgSymbol	= svgContainer.append('g').attr('id', 'symbol')	// clef(음자리표), 조표 4/4	
	trcSvg.svgNote		= svgContainer.append('g').attr('id', 'note')	// 음표, 음표 막대 SVG
	trcSvg.svgBox		= svgContainer.append('g').attr('id', 'boxes')	// 선택영역
	
	/*
	trcSvg.svgText	 = svgContainer.group().attr('id', 'text');//SVG.js
	trcSvg.svgLine	 = svgContainer.group().attr('id', 'lines');//SVG.js
	trcSvg.svgSymbol = svgContainer.group().attr('id', 'symbol');//SVG.js
	trcSvg.svgNote	 = svgContainer.group().attr('id', 'note');//SVG.js
	trcSvg.svgBox	 = svgContainer.group().attr('id', 'boxes');//SVG.js
	*/
};

// Draw title, tempo, name SVG
kara.txtSVG = function(trcNm) {// trcNm :: Track Name 'track1'
	
	kara.draw.setTrack(trcNm)
			.title(kara.scoreInfo.title)		// Draw Title
			.tempo(kara.scoreInfo.tempo)		// Draw Tempo
			.writer(kara.scoreInfo.writer)		// Draw Writer
};

// 키 문자열 반환
kara.keySplit = function(key) {	
	
	if(typeof key === 'undefined') {
		key = kara.scoreInfo.key	// major Db	
	}
	
	const keySplit = key.split(' ')	// ['major' 'Db']
	const M = kara.key[keySplit[0]]	// kara.key['major']
	// A: 3, Ab: 4, B: 5, Bb: 2, C: 0, D: 2, Db: 5, E: 4, Eb: 3, F: 1, G: 1, Gb: 6
	return {
		M: kara.key[keySplit[0]],	// major	kara.key['major']
		N: M[keySplit[1]]			// Db		M['Db'] :: 5 -- 심볼 갯수
	}
}

// 배열의 값을 가져와서 음표를 그린다
kara.prtNote = function(trcNm) {// trcNm :: Track Name 'track1'
	
	// SVG 삭제
	$('.' + kara.conf.del + '.' + trcNm).remove()
	
	const note = kara.scoreInfo.track[trcNm].notes	// Array [["E5", "half"], ["E5", "half"]]
	let meter = kara.scoreInfo.meter.split('/')	// ["4", "4"]
	const limited = meter[0] * meter[1]	// 마디 제한 16
	
	var nowMeter = 0					// 현재 마디
	var four_boxEnter = 0, four_check = 0, pageInc = 0
	
	kara.hLine(0, trcNm)	// 한줄 긋고 시작
	
	// 첫마디가 없으면 노트박스 생성
	if(note[0] === undefined) kara.noteBox.print(kara.XY.X(), kara.XY.Y(0), 0, 0, 'whole', trcNm)
	
	// 마디 찍기
	for(let i = 0; i < note.length; i++) {
		
		let four_enter = i % 4	// 4마디 마다
		
		if(four_enter === 0 && i >= 4) {	// 4마디 검사
			
			let four = i / 4	// 왜 4를 나누는지
			
			// 4번째 마디마다 새 오선지 찍기
			kara.hLine(four, trcNm)
			four_boxEnter++
		}
		
		//음표와 음표 박스 찍기
		for(let j = 0; j < note[i].length; j++) {

			const M = kara.keySplit().M;	// major 속성명 바꿔
			const N = kara.keySplit().N;	// Db 	속성명 바꿔
			var X = kara.XY.X()
			var Y = kara.XY.Y(i)
			
			// 뭔지 알아내
			var a = N * 12 + 70
			var ac = (X - a) / 4
			
			// 이것들이 뭔지 알아네
			var _whole = ac / 2 - 8
			var _half = _whole / 2
			var _quarter = _half / 2
			var _8th = _quarter / 2
			var _16th = _8th / 2 - 8
			
			var position

			var pitch = note[i][j][0]
			let meter = note[i][j][1]
			
			if(four_boxEnter == four_check) {

				// 첫 음표 // 악보 선택 영역 그리기
				kara.noteBox.print(kara.XY.X(), kara.XY.Y(four_boxEnter), i, j, meter, trcNm)
				four_check++
			} else {
				// 두번째 부터 // 악보 선택 영역 그리기
				kara.noteBox_.print(kara.XY.X(), kara.XY.Y(four_boxEnter), i, j, meter, trcNm)
				//console.log("그릴 박스는 i는" + i + "j " +  j);
			}
			
			var width = $('.bar_' + i + '.note_' + j + '.' + trcNm).width()	// .bar_1.note_2.track1
			d3.select('.bar_' + i + '.note_' + j + '#' + pitch + '.' + trcNm).style('fill', '#ffffff')

			var pitchSplit = pitch.split(',')	// ["B4", "C6"] 같은 박자에 있는 음표들

			for(var pi = 0; pi < pitchSplit.length; pi++) {
				
				//쉼표 일때는 A4높이에 그리기
				if(pitchSplit[pi] === 'rest')
					position = $('#A4.bar_' + i + '.note_' + j + '.' + trcNm).position()	// A4 상수로 변환
				else
					position = $('#' + pitchSplit[pi] + '.bar_' + i + '.note_' + j + '.' + trcNm).position()
					
				var x = position.left - kara.scorePos.left(trcNm)
				var y = position.top - kara.scorePos.top(trcNm) + 3	// 3이 뭔지
				
				var leng = 0	// x 길이 추가

				//길이 대입
				switch(meter) {
					case 'whole':	leng = _whole;	break;		// 온음표
					case 'half':	leng = _half;	break;		// 2분음표
					case 'quarter':	leng = _quarter;break;		// 4분음표
					case '8th':		leng = _8th;	break;		// 8분음표
					case '16th':	leng = _16th;	break;		// 16분음표
					default: break;
				}
				
				//leng -= 10;// x 길이 조정
				
				//음표 그리기
				kara.print8th16thQuarterHalfWhole(trcNm, x, leng, y, meter, pitchSplit[pi], pi, meter)
			}	// End of for

			if(i === note.length - 1 && j === note[i].length - 1) {

				var four_boxEnter2 = four_boxEnter + 1
				var ii = i + 1
				var four2 = ii % 4

				if(four2 == 0 && ii >= 4) {
					if(kara.meterCal_box(i, trcNm) === 1) {
						
						$('#' + trcNm + ' > #score').height(four_boxEnter2 * 120 + 300)	// FUNCTION으로 변경
						kara.hLine(four_boxEnter2, trcNm)
						kara.noteBox_last.print(kara.XY.X(), kara.XY.Y(four_boxEnter2), i, j, meter, 1, trcNm)
					} else {
						kara.noteBox_last.print(kara.XY.X(), kara.XY.Y(four_boxEnter), i, j, meter, 0, trcNm)
					}
				} else {
					kara.noteBox_last.print(kara.XY.X(), kara.XY.Y(four_boxEnter), i, j, meter, 0, trcNm)
				}
			}	// End of if
		}	// End of for
	}
	
	kara.test(trcNm)	// 배열값 표시(옮겨야됨)
}

//악보 위치 반환
kara.scorePos = {
	
	//#score 악보 영역 left 좌표 반환
	left: function(trcNm) {	// trcNm :: Track Name -- 'track1'
		const position = $('#' + trcNm + ' > #' + kara.conf.score)
		return position.position().left
	},
	// #score 악보 영억 top 좌표 반환
	top: function(trcNm) {	// trcNm :: Track Name -- 'track1'
		const position = $('#' + trcNm + ' > #' + kara.conf.score)
		return position.position().top
	}
}

//악보 길이 반환
kara.XY = {
	
	topMargin : 200,// 위 여백 200
	
	//#score :: 악보 width return
	X: function() {
		return $('#' + kara.conf.score).width()
	},
	
	Y: function(y) {
		return this.topMargin + (y * 110)	// 110 이 뭔지 알아네
	}
}

// 음자리표 SVG 그리기
kara.clefSVG = function(x, y, Y, trcNm) {// 10, 200, 200, 'track1'
	
	const clef = kara.scoreInfo.track[trcNm].clef	// 현재 음자리표
	const svg = kara.svg[trcNm].svgSymbol
	var box_x, box_y
	var width, height
	var pathString

	switch(clef) {
		case 'G':	// 높은 음자리표
			
			y = y / 1.4 + 35	// 동적으로 할 방법을 찾아
			
			//clefs.G 없으면 null
			if (!kara.glyphs['clefs.G']) return null;
			pathString = this.pathClone(kara.glyphs['clefs.G'].d, x, y)
			
			// 높은 음자리표 그리기
			kara.draw.clefs_G(trcNm, pathString)
			
			break;
			
		case 'F':	// 낮은 음자리표
			
			y = y / 1.7 + 35
			
			if (!kara.glyphs['clefs.F']) return null;
			pathString = this.pathClone(kara.glyphs['clefs.F'].d, x - 5, y - 20) // -5// -45
			
			// 낮은 음자리표 그리기
			kara.draw.clefs_F(trcNm, pathString)
			
			break;
			
		case 'P':
			
			y = y / 1.5 + 35
			
			if (!kara.glyphs['clefs.perc']) return null;
			
			pathString = this.pathClone(kara.glyphs['clefs.perc'].d, x - 5, y - 20.5)
			kara.draw.clefs_perc(trcNm, pathString)
			
			break;
			
		default:
			
			y = y / 1.4 + 35;
			
			if (!kara.glyphs['clefs.G']) return null;

			kara.scoreInfo.track[trcNm].clef = 'G'
			pathString = this.pathClone(kara.glyphs['clefs.G'].d, x, y)
			
			// 높은 음자리표 그리기
			kara.draw.clefs_G(trcNm, pathString)
			
			break;
	}
	
	// 이것도 메소드로 바꾸자
	box_x = 0
	box_y = Y - 10
	width = 40
	height = 90

	// 이거 그리는 것도 메소드로
	//음자리표 선택영역 APPEND
	svg.append('rect')
		.attr('id', 'edtClf')	// #editClef :: 음자리표 선택영역(수정)
		.attr('class', kara.conf.del + ' ' + trcNm)
		.attr('x', box_x)
		.attr('y', box_y)
		.attr('onclick', "kara.edit.clef('" + trcNm + "')")
		.style('width', width)
		.style('height', height)
		.style('fill', '#00ff01')
		.style('fill-opacity', '0.3')
}

// 조표 SVG 그리기
kara.keySVG = function(Y, key, trcNm) {	// 217, major Db, track1
	
	let svg = kara.svg[trcNm].svgBox
	let keySplit = key.split(' ')	// ['major' 'Db']
	const M = kara.keySplit(key).M	// major 속성명 바꿔
	const N = kara.keySplit(key).N	// Db 	속성명 바꿔
	let x, y, width, height

	for (let key in M) {	// k :: key
		
		if (key == keySplit[1]) {
			switch(key) {
				case 'C': //0
				case 'Am':
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
					
					// 심볼 갯수 만큼 그리기
					for(let i = 0; i < M[keySplit[1]]; i++) {
						switch (i) {
							case 0:	y = Y - 5;	break;	// G_F
							case 1:	y = Y + 12;	break;	// D_C
							case 2:	y = Y - 10;	break;	// A_G
							case 3:	y = Y + 7;	break;	// E_D
							case 4:	y = Y + 25;	break;	// B_A
						}	// End of switch
						
						//sharp 그리기
						kara.printSymbol("accidentals.sharp", 50 + (i * 10), y, trcNm)
					}	// End of for
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
					
					// 심볼 갯수 만큼 그리기
					for(let i = 0; i < M[keySplit[1]]; i++) {
						switch (i) {
							case 0: y = Y + 19;	break;	// Gb_b
							case 1: y = Y + 1;	break;	// Ab_e
							case 2: y = Y + 25;	break;	// Db_a
							case 3: y = Y + 7;	break;	// Eb_d
							case 4: y = Y + 31;	break;	// Bb_g
							case 5: y = Y + 13;	break;	// F_c
						}	// End of switch
						//flat 그리기
						kara.printSymbol('accidentals.flat', 50 + (i * 10), y, trcNm)
					}	// End of for
					break;
			}
		}
	}
	
	// (조표 선택영역)
	// 다른 방법을 생각해봐
	x = 40	// 악보 좌측부터 40	
	y = Y - 17
	width = N * 10 + 15
	height = 74

	// 조표 선택영역 SVG DRAW(RECT FUNCTION REQUIRED)
	svg.append('rect')
		.attr('id', 'editKey')	// #editKey :: 조표 선택영역(수정)
		.attr('class', kara.conf.del + ' ' + trcNm)// 삭제 영역
    	.attr('x', x)
   		.attr('y', y)
		.attr('onclick', "kara.edit.key('" + trcNm + "')")	// 조표 수정 클릭 이벤트
    	.style('width', width)
    	.style('height', height)
    	.style('fill', '#00ffff')
		.style('fill-opacity', '0.3')
}

//박자 SVG
kara.meterSVG = function(Y, trcNm) {// trcNm :: Track Name - 'track1'
	
	let box = kara.svg[trcNm].svgBox
	const M = kara.keySplit().M		// major 속성명 바꿔
	const N = kara.keySplit().N		// Db 	속성명 바꿔

	let x, y, width, height

	let meter = kara.scoreInfo.meter	// 악보정보 객체 박자
	let meterSplit = meter.split('/')

	var pathString = this.pathClone(kara.glyphs[meterSplit[0]].d, 45 + (N * 10), Y / 1.4 + 24.7)
	var pathString2 = this.pathClone(kara.glyphs[meterSplit[1]].d, 45 + (N * 10), Y / 1.4 + 41.7)
	
	kara.draw.meter(trcNm, pathString)	// 위
	kara.draw.meter(trcNm, pathString2)	// 아래

	//박자 변경을 위한 선택역역 BOX 생성
	x = 55 + (N * 10)	// 조표의 갯수에 맞게 박자박스 SVG x 좌표 위치 조정
	y = Y + 11
	width = N + 20
	height = 50

	// 박자 선택영역 추가
	box.append('rect')
		.attr('id', 'edtMtr')
		.attr('class', kara.conf.del + ' ' + trcNm)	// 삭제 영역
		.attr('x', x)
		.attr('y', y)
		.attr('onclick', 'kara.edit.meter()')
		.style('width', width)
		.style('height', height)
		.style('fill', '#00ff00')
		.style('fill-opacity', '0.7')
}

//꼬리 SVG
kara.printflag = function(symb, x, y, trcNm) {	// flags.uquarter, track1, 141.15625381469727, 235.99998474121094
		
	if (!kara.glyphs[symb]) return null
	
	let pathString = this.pathClone(kara.glyphs[symb].d, x + 10.35, y - 29)
	
	kara.draw.symbol(trcNm, pathString)
}

// Draw Sharp, Flat, Rest, head
kara.printSymbol = function(symbol, x, y, trcNm) {
	
	if (!kara.glyphs[symbol]) return null
	
	let pathString = this.pathClone(kara.glyphs[symbol].d, x, y)
	
	kara.draw.symbol(trcNm, pathString)
}

// 음표에 sharp, flat 붙이기
kara.print_s_p = function(symbol, x, y, trcNm) {	// accidentals.flat, 204.75000381469727, 231.00001525878906, track1
	
	if (!kara.glyphs[symbol]) return null;
	
	let svg = kara.svg[trcNm].svgSymbol
	let pathString = this.pathClone(kara.glyphs[symbol].d, x / 0.7, y / 0.7)
	
	// 합칠 방법
	svg.append('path')
		.attr('class', kara.conf.del + ' ' + trcNm)// 삭제 영역
		.attr('d', pathString)
		.style('transform', 'scale(0.7,0.7)')
		.style('stroke', 'black')
}

// 심볼을 찾아옴
kara.pathClone = function (pathString, x, y) {	// (32) [Array(3), Array(7), Array(7), Array(7)], 60, 218
	//console.log(pathString); // ["M", 8.64, -14.94] ["c", 0.27, -0.09, 0.42, -0.12, 0.54, -0.03]
	
	
	let res = []
	let res1	// 반환 문자열
	
	for(let i = 0; i < pathString.length; i++) {
		
		res[i] = []
		
		for(let j = 0; j < pathString[i].length; j++) {
			
			res[i][j] = pathString[i][j]

			if(i == 0 && j == 0) {
				res1 = res[i][j]
			} else {
				if(i == 0 && j == 1) {res[0][1] += x}	// 길이 계산
				if(i == 0 && j == 2) {res[0][2] += y}	// 길이 계산

				res1 = res1 + ' ' + res[i][j]	// 문자열 연결
			}	// End of if
		}	// End of for
	}	// End of for
	
	// console.log(res1)
	
	/*
	res1 : 
	M 49.64 221.93 c 0.33 -0.06 0.87 0 1.08 0.15 c 0.06 0.03 0.06 0.36 -0.03 5.25 c -0.06 2.85 -0.09 5.19 -0.09 5.19 c 0 0.03 0.12 -0.03 0.24 -0.12 c 0.63 -0.42 1.41 -0.66 2.19 -0.72 c 0.81 -0.03 1.47 0.21 2.04 0.78 c 0.57 0.54 0.87 1.26 0.93 2.04 c 0.03 0.57 -0.09 1.08 -0.36 1.62 c -0.42 0.81 -1.02 1.38 -2.82 2.61 c -1.14 0.78 -1.44 1.02 -1.8 1.44 c -0.18 0.18 -0.39 0.39 -0.45 0.42 c -0.27 0.18 -0.57 0.15 -0.81 -0.06 c -0.06 -0.09 -0.12 -0.18 -0.15 -0.27 c -0.03 -0.06 -0.09 -3.27 -0.18 -8.34 c -0.09 -4.53 -0.15 -8.58 -0.18 -9.03 l 0 -0.78 l 0.12 -0.06 c 0.06 -0.03 0.18 -0.09 0.27 -0.12 z m 3.18 11.01 c -0.21 -0.12 -0.54 -0.15 -0.81 -0.06 c -0.54 0.15 -0.99 0.63 -1.17 1.26 c -0.06 0.3 -0.12 2.88 -0.06 3.87 c 0.03 0.42 0.03 0.81 0.06 0.9 l 0.03 0.12 l 0.45 -0.39 c 0.63 -0.54 1.26 -1.17 1.56 -1.59 c 0.3 -0.42 0.6 -0.99 0.72 -1.41 c 0.18 -0.69 0.09 -1.47 -0.18 -2.07 c -0.15 -0.3 -0.33 -0.51 -0.6 -0.63 z
	*/
	
	
	
	return res1
}

// 오선지
kara.hLine = function(y, trcNm) {// y :: 오선지 줄 번호 :: 1, trcNm :: Track Name 'track1'
	
	// 줄일 수 있는 방법
	let X = kara.XY.X()
	let Y = kara.XY.Y(y)
	
	
	let key = kara.scoreInfo.key
	/*
	let keySplit = key.split(' ')
	let M = kara.key[keySplit[0]]
	let N = M[keySplit[1]]
	*/
	
	let M = kara.keySplit().M	// 무슨 용도
	let N = kara.keySplit().N
	
	let clef = kara.scoreInfo.clef
	let gab = 12	// dynamic

	//간격조절
	for(let i = 1; i <= 5; i++) {
		
		//간격 12씩 5줄 그리기		
		kara.draw.line(trcNm, 0, (i * gab) + Y, X, (i * gab) + Y)
	}	// End of for
	
	//분리 해야됨(여기선 오선지만)
	kara.clefSVG(10, Y, Y, trcNm)	// 높은 음자리 //1.4+35
	kara.vLine(X, Y + 12, trcNm)	// 끝 줄
	kara.keySVG(Y + 17, key, trcNm)	// 조표 그리기
	kara.meterSVG(Y, trcNm)			// 박자

	let a = N * 12 + 70
	let ac = (X - a) / 4
	
	// 동적으로
	kara.vLine(ac * 1 + a, Y + 12, trcNm)	// 첫마디 끝 구분선
	kara.vLine(ac * 2 + a, Y + 12, trcNm)	// 두번째 마디 끝 구분선
	kara.vLine(ac * 3 + a, Y + 12, trcNm)	// 세번째 마디 끝 구분선
}

//마디 구분선
kara.vLine = function(x, y, trcNm) {	// trcNm :: Track Name 'track1' //1051, 212, track1
	kara.draw.line(trcNm, x, y, x, y + 48)	// 48이 뭔지	dynamic
}

//음표 막대 그리기
kara.notevLine = function(x, y, trcNm) {	// 235.6875, 242, track1	
	kara.draw.line(trcNm, x + 10, y, x + 10, y - 30)
}

//음표 막대(머리부분)
kara.notevLow = function(x, y, pitch, meter, trcNm) {	// 147.9375, 230, C5, half, track1

	let m = 0, n = 0
	// 이거 뭔지
	/*
	if(pitch === 'C4')		y = y
	else if(pitch === 'B3') y = y - 4
	else if(pitch === 'A3') y = y
	else if(pitch === 'E2') y = y
	else if(pitch === 'D2') y = y - 4
	else if(pitch === 'C2') y = y
	
	else return;
	*/
	
	// 뭘까
	if(pitch === 'B3' || pitch === 'D2') y = y - 4
	
	// 무슨 계산인지
	switch(meter) {
		case 'whole':
			x = x - 3.5
			m = x + 22
			n = y
			
			break;
			
		case 'half':
			x = x - 4
			m = x + 18
			n = y;
			break;
			
		case 'quarter':
			x = x - 3
			m = x + 18.5
			n = y;
			break;
			
		case '8th':
			x = x - 3
			m = x + 18.5
			n = y;
			break;
			
		case '16th':
			x = x - 3
			m = x + 18.5
			n = y
			break;
			
		default: break;
	}

	kara.draw.line(trcNm, x, y, m, n, '1.5px')
}

// 악보 선택 영역 그리기
kara.noteBox = {
	
	// 악보 선택 영역 그리기
	print: function(X, Y, bNum, nNum, meter, trcNm) {
		
		/*
		let key = kara.scoreInfo.key
		let keySplit = key.split(' ')
		let M = kara.key[keySplit[0]]
		let N = M[keySplit[1]]	// 이거
		*/
		
		let M = kara.keySplit().M	// 무슨 용도
		let N = kara.keySplit().N
		
		let clef = kara.scoreInfo.track[trcNm].clef
		let i = 0, j = 0

		
		// 왜 인지 알아네
		let a = N * 12 + 70
		let ac = (X - a) / 4

		let x = a
		let y = Y - 15

		let width = (X - a) / 4
		let height = 6;
		
		let fill_opacity = '0.3'	// 이것도 배버려

		// 이 영역으로 4분음표로만 고정
		switch(meter) {
			case 'whole': //온음표
				width = width
				break;
			case 'half': //2분음표
				width = width / 2
				break;
			case 'quarter': //4분음표
				width = width / 4
				break;
			case '8th': //8분음표
				width = width / 8
				break;
			case '16th': //16분음표
				width = width / 16
				break;
			default:
				break;
		}
		
		switch(clef) {
			case 'G': i = 14; break;	// A3 ~ C6 (14 ~ 30)	
			case 'F': i = 26; break;	// C2 ~ E4
			case 'P': break;
		}
		/*
		switch(clef) {
			case "G": i = 36; break;	// A3 ~ C6 (14 ~ 30)	
			case "F": i = 26; break;	// C2 ~ E4
			case "P": break;
		}
		*/
		j = i + 16	// j = 42 17개 음

		for(i; i <= j; i++) {  // A3 ~ C6 (34 ~ 61)
			//var m = i;
			let m = 50 - i	// 36 ~ 20
			let p = pitch_select.selection(m)	//선택한 음높이 계산 // return C6 m::36 p::C6
			
			let fill = ''	// 이것도 빼버려
			
			// 이거 메소드에 추가
			//색상 선택
			if((i % 2) == 1) fill = '#6666FF'	// Odd Number
			else fill = '#66FFFF'				// Even Number
			
			// 악보 선택 영역 그리기
			// 매개변수좀 줄이자
			kara.selArea(p, bNum, nNum, trcNm, x, y, width, height, fill, fill_opacity)
		
			y += height
		}
	}
};

// 악보 선택 영역 그리기2
kara.noteBox_ = {
	
	print: function(X, Y , bNum, nNum, meter, trcNm) {	// 1166, 200, 0, 2, quarter, track1
		
		
		// 이것들을 줄일 수 있는 방법
		const note = kara.scoreInfo.track[trcNm].notes
		
		/*
		var key = kara.scoreInfo.key
		var keySplit = key.split(' ')
		var M = kara.key[keySplit[0]]
		var N = M[keySplit[1]]
		*/
		
		let M = kara.keySplit().M	// 무슨 용도
		let N = kara.keySplit().N
		
		const clef = kara.scoreInfo.track[trcNm].clef
		var i = 0, j = 0, flag = 0
		
		// 이전 마디의 정보를 얻어옴
		if(nNum == 0) {
			bNum--
			nNum = note[bNum].length - 1
			flag = 1;
		} else nNum = nNum - 1
		
		// var pitch = note[bNum][nNum][0];
		var pre_meter = note[bNum][nNum][1]
		//console.log(pre_meter);
		
		// 이것도 설정으로
		var position = $('.bar_' + bNum + '.note_' + nNum + '.' + trcNm).position()

		var a = N * 12 + 70
		var ac = (X - a) / 4
		
		// kara.vLine(a, Y+12); // 없어도 됨
		// kara.vLine(ac*1+a, Y+12);
		// kara.vLine(ac*2+a, Y+12);
		// kara.vLine(ac*3+a, Y+12);

		var x = position.left - kara.scorePos.left(trcNm)
		var y = Y - 15

		// 이게 뭔지
		var width = (X - a) / 4
		var height = 6

		// 원래 상태로 돌려놓는다
		if(flag == 1) { 
			bNum++
			nNum = 0;
		} else nNum = nNum + 1;

		switch(pre_meter) {
			case 'whole': // 온음표
				x = x + width;
				break;
			case 'half': // 2분음표
				x = x + width / 2;
				break;
			case 'quarter': // 4분음표
				x = x + width / 4;
				break;
			case '8th': // 8분음표
				x = x + width / 8;
				break;
			case '16th': // 16분음표
				x = x + width / 16;
				break;
			default: break;
		}

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
			default: break;
		}

		switch(clef) {
			case 'G': i = 14; break;	// A3~ C6 17 j = 30
			case 'F': i = 26; break;	// C2~E4 =
			case 'P': break;
		}
		
		j = i + 16
		
		for(i; i <= j; i++) {  //a3 ~ b7
			
			var m = 50 - i
			var p = pitch_select.selection(m)	// 선택한 음높이 계산 in edit.js
			let fill, fill_opacity
			
			if((i % 2) == 1) {
				fill = '#6666FF'
				fill_opacity = '0.3'
			} else {
				fill = '#66FFFF'
				fill_opacity = '0.5'
			}
			
			// 악보 선택 영역 그리기
			kara.selArea(p, bNum, nNum, trcNm, x, y, width, height, fill, fill_opacity)
			
			y = height + y
		}
	}
};

//아직 입력하지 않은 음표 선택 영역
kara.noteBox_last = {
	
	print: function(X, Y , bNum, nNum, meter, set, trcNm) {
		
		let note = kara.scoreInfo.track[trcNm].notes
		var svg = kara.svg[trcNm].svgContainer
		
		/*
		var key = kara.scoreInfo.key
		var keySplit = key.split(' ')
		var M = kara.key[keySplit[0]]
		var N = M[keySplit[1]]
		*/
		
		let M = kara.keySplit().M	// 무슨 용도
		let N = kara.keySplit().N	
		
		
		let pitch = note[bNum][nNum][0]
		var clef = kara.scoreInfo.track[trcNm].clef
		var i = 0, j = 0

		// 상수로 만들어
		var position = $('.bar_' + bNum + '.note_' + nNum + '.' + trcNm).position()	// FUNcTION 

		// 이것들이 뭔지
		var a = N * 12 + 70
		var ac = (X - a) / 4

		var x = position.left - kara.scorePos.left(trcNm)	// 이게 뭐지
		var y = Y - 15

		var width = (X - a) / 4
		var height = 6

		nNum = nNum + 1

		switch(meter) {
			case 'whole': // 온음표
				width = width
				x = x + (X - a) / 4

				break;
			case 'half': // 2분음표
				width = width - width / 2
				x = x + (X - a) / 4 - width

				break;
			case 'quarter': // 4분음표
				width = width - width / 4
				x = x + (X - a) / 4 - width

				break;
			case '8th': // 8분음표
				width = width - width / 8
				x = x + (X - a) / 4 - width

				break;
			case '16th': // 16분음표
				width = width - width / 16
				x = x + (X - a) / 4 - width
		
				break;
			case 32: break;	// 이건 어떻게 할껀지
			case 64: break;
			case 128: break;
			default: break;
		}	// End of switch
		
		if(kara.meterCal_box(bNum, trcNm)) { //마디 꽉차서
			bNum = bNum + 1
			nNum = 0
		}

		if(set === 1) {	//왜 1
			//console.log(bNum);
			x = a
		}
		
		

		switch(clef) {
			case 'G':
				i = 14 // A3~ C6 17 j = 30
				j = i + 16

				break;
				
			case 'F':  // C2~E4 =
				i = 26
				j = i + 16
				break;
				
			case 'P': break;	// 이게 뭐지
		}

		for(var i4; i <= j; i++) {  // a3 ~ b7
			
			var m = 50 - i
			var p = pitch_select.selection(m)
			let fill, fill_opacity
			
			// 이걸 개선 할 방법은
			if((i % 2) == 1) {
				fill = '#6622FF'
				fill_opacity = '0.3'
			} else {
				fill = '#660000'
				fill_opacity = '0.5'
			}
			
			// 악보 선택 영역 추가
			// 매개변수좀 줄여봐
			// 투명도를 뺄수 있는 방법
			kara.selArea(p, bNum, nNum, trcNm, x, y, width, height, fill, fill_opacity)
			
			y += height
		}
	}
};

//음표, 쉼표 그리기	(required name change)
kara.print8th16thQuarterHalfWhole = function(trcNm, x, leng, y, meter, pitchSplit_pi, pi, type) {
	
	let head = type
	
	// 온음표와 2분음표를 제외하면 공통
	if(type !== 'whole' && type !== 'half') head = 'quarter'
	
	//쉼표 그리기
	if(pitchSplit_pi === 'rest') kara.printSymbol('rests.' + type, x + leng, y, trcNm)
	
	//음표 그리기
	else {
		
		if(type !== 'whole')//온음일때는 막대 안 그리기
			kara.notevLine(x + leng, y, trcNm)
		
		kara.printSymbol('noteheads.' + head, x + leng, y, trcNm)	// head
		
		//오선지를 벗어나면 구분선 그리기
		kara.notevLow(x + leng, y, pitchSplit_pi, meter, trcNm)

		//8분음표, 16분 음표 꼬리 그리기
		if(pi === 0) kara.printflag('flags.u' + type, x + leng, y, trcNm)
		
		// 해당 음표에 sharp이 있으면
		if(kara.chkSharpFlat(pitchSplit_pi) === 1) kara.print_s_p('accidentals.sharp', x + leng - 5, y - 5, trcNm)
		
		// 해당 음표에 flat이 있으면
		if(kara.chkSharpFlat(pitchSplit_pi) === -1) kara.print_s_p('accidentals.flat', x + leng - 5, y - 5, trcNm)
	}
};

// 악보 선택 영역 그리기
kara.selArea = function(p, bNum, nNum, trcNm, x, y, width, height, fill, fill_opacity) {
	
	const svg = kara.svg[trcNm].svgContainer
	
	// 마디 번호
	const svgVar = svg.append('g')
		.attr('id', 'bar_' + bNum)	// 이것도 설정
		.attr('class', kara.conf.del + ' ' + trcNm)
		
	// print.js로 이동
	svgVar.append('rect')
				.attr('id', p)
				.attr('class', kara.conf.del + ' bar_' + bNum + ' ' + 'note_' + nNum + ' ' + trcNm) //마디,  음표 번호
				.attr('x', x)
				.attr('y', y)
				.attr('onmousedown', "PopLayer.Action(this, 'noteSelect');")	// 음표선택 팝업 호출 메소드
				.attr('onclick', 'kara.selectBox(' + bNum + ', ' + nNum + ",  '" + trcNm + "', this)")
				.style('width', width)
				.style('height', height)	// 6
				.style('fill', fill)
				.style('fill-opacity', fill_opacity)	//0.3, 0.5
	
}

// 음표선택 임시 저장
var beforeObj = undefined
var beforeStyle = ''

// 음표영역 클릭시 하이라이트
kara.selectBox = function(bNum, nNum, trcNm, obj) {

	// 선택된 영역이 없으면 저장
	// 기존 선택 영역 색상 되돌리기
	if(beforeObj !== undefined) beforeObj.style.fill = beforeStyle
	
	// 선택 영역 저장
	beforeObj = obj
	beforeStyle = obj.style.fill
	
	// 선택 영역 표시
	obj.style.fill = 'red'	// config
}