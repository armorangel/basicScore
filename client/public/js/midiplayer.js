if(!window.kara) window.kara = {}

//재생
kara.play = {
	
	isPlaying: false,
	play: null,
	instru: [],//악기
	lengs: 0,
	player: function() {
		
		console.log("Executed Play Function.")
		kara.play.instru = []
		
		var mn = 0
		var set
		var instru = kara.play.instru
		
		for (var keyInstru in kara.scoreInfo.track) {
			if (kara.scoreInfo.track.hasOwnProperty(keyInstru)) {
				if(kara.scoreInfo.track[keyInstru].instrument !== '') {
					
					//console.log(kara.scoreInfo.track[keyInstru].instrument)
					//console.log(kara.numToInstrument(kara.scoreInfo.track[keyInstru].instrument))
					
					set = kara.scoreInfo.track[keyInstru].instrument
					//console.log(set)
					
					// 악기 이름
					instru[mn] = kara.instru.getName(Number(set))
					
					
					//console.log(instru[mn])
					//console.log(instru)
					mn++
				}	// End of if
			}	// End of if
		}	// End of for
		
		kara.play.instru = instru
		//console.log(instru)
		
	    MIDI.loadPlugin({
			soundfontUrl: "./soundfont/",//soundfont path
			instrument: kara.play.instru,
			onprogress: function(state, progress) {
	        	console.log(state, progress)
			},
	  		onsuccess: function() {
			
				
				if(kara.play.isPlaying) {
					console.log('now is playing');
					return;
				}
					
				
				kara.play.isPlaying = true
				
				
				console.log("midi set")
				var note = kara.scoreInfo.track //note
				var instru = kara.play.instru
				//console.log(kara.play.instru)
				//console.log(instru);
				var chord = [];
				var tempo = Number(kara.scoreInfo.tempo);
				var delay = 0; // play one note every quarter second
				var velocity = 127; // how hard the note hits
				var m = 0; //트랙
				var n = 0; //음과 박자
				var setting;
				var player = [];
				var index = [];
				var delayTime = 0;
			  
				// play the note
				for(var mm = 0; mm < instru.length; mm++) {
					
					// 악기 번호
					setting = kara.instru.getNum(instru[mm]);
					console.log('setting :: ' + setting);
					MIDI.setVolume(mm, 127);// 볼륨 설정
					MIDI.programChange(mm, setting);
				}	// End of for
			
				for (var key in note) {
					if (note.hasOwnProperty(key)) {
						if(note[key].clef !== ""){
							for(var i=0; i < note[key].notes.length; i++) {
								for(var j = 0; j < note[key].notes[i].length; j++) {

									if(!jQuery.isArray(chord[m])) { // 2차원배열이 아니면2차원 배열 생성
										chord[m] = []; //[m][] 배열 생성(new Array())
									}
									if(!jQuery.isArray(chord[m][n])) { //3차원배열이 아니면2차원 배열 생성
										chord[m][n] = []; //[m][] 배열 생성(new Array())
									}
									
									// 계이름을 MIDI숫자로 변환
									chord[m][n][0]= kara.noteToKey(note[key].notes[i][j][0]);
									chord[m][n][1] = note[key].notes[i][j][1];
									n++;
								}	// End of for
							}	// End of for
							m++;
							n = 0;
						}	// End of if
					}	// End of if
				}	// End of for
				
				m = 0;
				n = 0;

				for(var k = 0; k < chord.length; k++) {
					player[k] = 0;
					index[k] = -1;
				}

				kara.play.lengs = kara.maxLength(chord);
				console.log("실행 전");

				
				
				
				//재생 Interval
				kara.play.play = setInterval(function() {
					
					console.log(kara.play.lengs)
					//console.log("실행중");
					for(var r = 0; r < chord.length; r++) {
						var meter = player[r];
						var ind = index[r];

						if(meter === 0){
							ind++;
							try {
								player[r] = kara.noteMeter.head[chord[r][ind][1]];
							} catch(err) {
								player[r] = 1;
							}
							try {
								MIDI.chordOn(r, chord[r][ind][0], velocity, delay);
							} catch(err) {
								MIDI.chordOn(r, 0, 0, delay);
							}

							meter = player[r];
							player[r] = meter - kara.noteMeter.head["16th"];
							// console.log(r + " - " + player[r]);
							index[r] = ind;
						} else {
							player[r] = meter - kara.noteMeter.head["16th"];
						}
					}

					kara.play.lengs--;
					//console.log("kara.play.lengs는" + kara.play.lengs);

					
					if(kara.play.lengs < 0) {
						//재생 Interval 삭제
						
						kara.play.isPlaying = false
						clearInterval(kara.play.play);
						
						
						console.log("재생 끝");
					}
				}, (60000 / tempo) * (kara.noteMeter.head["16th"] / 4));	// 60000?
			}
		});
	},

	// 정지
	stop: function() {
		kara.play.lengs = 0
		kara.play.isPlaying = false
		
		clearInterval(kara.play.play);
		
		kara.play.play = null;
		console.log("kara.play.lengs는" + kara.play.lengs)
	}
};

// 재생에 필요한 악보 전체 재생 길이 구하기
// Array(3), Array(5), Array(2) -- (트랙별 마디 갯수)
kara.maxLength = function(chordArray) {	// [[[61, 77], 'whole'], [[68], 'whole']]
	
	var longlen = 0, nowlen = 0;

	for(var o = 0; o < chordArray.length; o++) {
		for(var oo = 0; oo < chordArray[o].length; oo++) {
			// 음표 길이 중첩
			nowlen = nowlen + kara.noteMeter.head[chordArray[o][oo][1]]	// 16
		}	// End of for
		
		// 최대 길이
		if(nowlen >= longlen) longlen = nowlen
		
		// 현재 트랙 길이 초기화
		nowlen = 0
	}	// End of for
	
	return longlen;
};