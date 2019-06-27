if(!window.kara) window.kara = {};

//재생
kara.play = {
	
	instru: [],//악기
	lengs: 0,
	player: function() {
		
		console.log("Executed Play Function.");
		kara.play.instru = [];
		
		var mn = 0;
		var set;
		var instru = kara.play.instru;
		
		for (var keyInstru in kara.scoreInfo.track) {
			if (kara.scoreInfo.track.hasOwnProperty(keyInstru)) {
				if(kara.scoreInfo.track[keyInstru].instrument !== ""){
					
					//console.log(kara.scoreInfo.track[keyInstru].instrument);
					//console.log(kara.numToInstrument(kara.scoreInfo.track[keyInstru].instrument));
					
					set = kara.scoreInfo.track[keyInstru].instrument;
					//console.log(set);
					instru[mn] = kara.numToInstrument(Number(set));
					//console.log(instru[mn]);
					//console.log(instru);
					mn++;
				}
			}
		}
		
		kara.play.instru = instru;
		//console.log(instru);
		
	    MIDI.loadPlugin({
			soundfontUrl: "./soundfont/",//soundfont path
			instrument: kara.play.instru,
			onprogress: function(state, progress) {
	        	console.log(state, progress);
			},
	  		onsuccess: function() {
			
				console.log("midi set");
				var note = kara.scoreInfo.track; //note
				var instru = kara.play.instru;
				//console.log(kara.play.instru);
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
					setting = kara.instrumentTonum(instru[mm]);
					console.log('setting :: ' + setting);
					MIDI.setVolume(mm, 127);// 볼륨 설정
					MIDI.programChange(mm, setting);
				}
			
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
								}
							}
							m++;
							n = 0;
						}
					}
				}
				
				m = 0;
				n = 0;

				for(var k = 0; k < chord.length; k++) {
					player[k] = 0;
					index[k] = -1;
				}

				kara.play.lengs = kara.maxLength(chord);
				console.log("실행 전");

				//재생 Interval
				var play = setInterval(function() {

					//console.log("실행중");
					for(var r = 0; r < chord.length; r++){
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
						clearInterval(play);
						console.log("재생 끝");
					}
				}, (60000 / tempo) * (kara.noteMeter.head["16th"] / 4));
			}
		});
	},

	// 정지
	stop: function() {
		kara.play.lengs = 0;
		clearInterval(play);
		console.log("kara.play.lengs는" + kara.play.lengs);
	}
};
