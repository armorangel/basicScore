if (!window.kara)
	window.kara = {};

'use strict';

kara.svg = {
	"track1":{
		svgContainer: null,
		svgLine: null,
		svgText: null,
		svgSymbol: null,
		svgNote: null,
		svgBox: null
	},
	"track2":{
		svgContainer: null,
		svgLine: null,
		svgText: null,
		svgSymbol: null,
		svgNote: null,
		svgBox: null
	},
	"track3":{
		svgContainer: null,
		svgLine: null,
		svgText: null,
		svgSymbol: null,
		svgNote: null,
		svgBox: null
	},
	"track4":{
		svgContainer: null,
		svgLine: null,
		svgText: null,
		svgSymbol: null,
		svgNote: null,
		svgBox: null
	},
	"track5":{
		svgContainer: null,
		svgLine: null,
		svgText: null,
		svgSymbol: null,
		svgNote: null,
		svgBox: null
	},
	"track6":{
		svgContainer: null,
		svgLine: null,
		svgText: null,
		svgSymbol: null,
		svgNote: null,
		svgBox: null
	},
	"track7":{
		svgContainer: null,
		svgLine: null,
		svgText: null,
		svgSymbol: null,
		svgNote: null,
		svgBox: null
	},
	"track8":{
		svgContainer: null,
		svgLine: null,
		svgText: null,
		svgSymbol: null,
		svgNote: null,
		svgBox: null
	},
	"track9":{
		svgContainer: null,
		svgLine: null,
		svgText: null,
		svgSymbol: null,
		svgNote: null,
		svgBox: null
	},
	"track10":{
		svgContainer: null,
		svgLine: null,
		svgText: null,
		svgSymbol: null,
		svgNote: null,
		svgBox: null
	}
};

kara.svgContain = function(track){
	var trac = kara.svg[track];
	var svgContainer;
	var svgText;
	var svgLine;
	var svgSymbol;
	var svgNote;
	var svgBox;
	var width = $("#tabs").width();

	svgContainer = d3.select("#"+track).append("svg")
		.attr("id", "score")
		.style("width", width-43)
		.style("height", "400");

	svgText = svgContainer.append("g") //title, tempo, writer
		.attr("id", "text");
	svgLine = svgContainer.append("g") //line
		.attr("id", "lines");
	svgSymbol = svgContainer.append("g") //clef
		.attr("id", "symbol");
	svgNote = svgContainer.append("g") //note
		.attr("id", "note");
	svgBox = svgContainer.append("g")
		.attr("id", "boxs");

	trac.svgContainer = svgContainer;
	trac.svgText = svgText;
	trac.svgLine = svgLine;
	trac.svgSymbol = svgSymbol;
	trac.svgNote = svgNote;
	trac.svgBox = svgBox;
};


kara.textSVG = function(track){ // title, tempo, name svg
	var svg = kara.svg[track].svgText;
	var box = kara.svg[track].svgBox;
	var title = kara.scoreInfo.title;
	var tempo = kara.scoreInfo.tempo;
	var writer = kara.scoreInfo.writer;
	var position;
  var x;
  var y;
  var width;
  var height;
	var opacity = "0.3";
//Title
	svg.append("text")
		.attr("id", "title")
		.attr("class", "in_bar")
		.attr("font-size", "60px")
    .attr("x", "50%")
    .attr("y", "50")
    .attr("dy", ".47em")
    .style("text-anchor", "middle")
    .style("fill", "#000000")
    .style("font-weight", "bold")
    .text(title);

	position = jQuery("#title").position();
	x = position.left - kara.scorePosition.left("track1");
	y = position.top - kara.scorePosition.top("track1");
	width = $('#title').width();
	height = $('#title').height();

	svg.append("rect")
		.attr("id", "editTitle")
		.attr("class", "in_bar")
		.attr("x", x)
		.attr("y", y)
		.attr("onclick", "kara.editTitle('" + track + "')")
		.style("width", width)
		.style("height", height)
		.style("fill", "#000000")
		.style("fill-opacity", opacity);
	//Tempo
	svg.append("text")
		.attr("id", "tempo")
		.attr("class", "in_bar")
		.attr("font-size", "16px")
		.attr("x", "5%")
		.attr("y", "140")
		.attr("dy", ".47em")
		.style("text-anchor", "start")
		.style("fill", "#000000")
		.style("font-weight", "bold")
		.text("♩ = "+ tempo);

	position = $('#tempo').position();
	x = position.left - kara.scorePosition.left("track1");
	y = position.top - kara.scorePosition.top("track1");
	width = $('#tempo').width();
	height = $('#tempo').height();

	svg.append("rect")
		.attr("id", "editTempo")
		.attr("class", "in_bar")
		.attr("x", x)
		.attr("y", y)
		.attr("onclick", "kara.editTempo('" + track + "')")
		.style("width", width)
		.style("height", height)
		.style("fill", "#000000")
		.style("fill-opacity", opacity);
	
	//writer
	svg.append("text")
		.attr("id", "writer")
		.attr("class", "in_bar")
		.attr("font-size", "16px")
		.attr("x", "98%")
		.attr("y", "140")
		.attr("dy", ".47em")
		.style("text-anchor", "end")
		.style("fill", "#000000")
		.style("font-weight", "bold")
		.text(writer);

	position = $('#writer').position();
	x = position.left - kara.scorePosition.left("track1");
	y = position.top - kara.scorePosition.top("track1");
	width = $('#writer').width();
	height = $('#writer').height();

	svg.append("rect")
		.attr("id", "editWriter")
		.attr("class", "in_bar")
		.attr("x", x)
		.attr("y", y)
		.attr("onclick", "kara.editWriter('" + track + "')")
		.style("width", width)
		.style("height", height)
		.style("fill", "#000000")
		.style("fill-opacity", "0.3");
};

kara.scorePosition = {
	left: function(track){
		var position = jQuery("#"+ track + " > #score");
		return position.position().left;
	},
	top: function(track){
		var position = jQuery("#"+ track + " > #score");
		return position.position().top;
	}
};

kara.XY = {
	X: function(){
		return $('#score').width();
	},
	Y: function(y){
		return 200+(y*110);
	}
};

kara.clefSVG = function(x, y, Y, track){ //음자리표 SVG
	var clef = kara.scoreInfo.track[track].clef;
	var svg = kara.svg[track].svgSymbol;
	var box_x;
	var box_y;
	var width;
	var height;
	var pathString;
	switch(clef){
		case "G":
			y = y/1.4+35;
			if (!kara.glyphs["clefs.G"]) return null;
			pathString = this.pathClone(kara.glyphs["clefs.G"].d, x, y);
			svg.append("path")
				.attr("class", "in_bar" + " " + track)
				.attr("d", pathString)
				.style("transform", "scale(1.2,1.4)") //크기조절
				.style("stroke", "black");
			break;
		case "F":
			y = y/1.7+35;
			if (!kara.glyphs["clefs.F"]) return null;
			pathString = this.pathClone(kara.glyphs["clefs.F"].d, x-5, y-20); //-5//-45
			svg.append("path")
				.attr("class", "in_bar" + " " + track)
				.attr("d", pathString)
				.style("transform", "scale(1.4,1.7)") //크기조절
				.style("stroke", "black");
			break;
		case "P":
			y = y/1.5+35;
			if (!kara.glyphs["clefs.perc"]) return null;
			pathString = this.pathClone(kara.glyphs["clefs.perc"].d, x-5, y-20.5);
			svg.append("path")
				.attr("class", "in_bar" + " " + track)
				.attr("d", pathString)
				.style("transform", "scale(1.2,1.5)") //크기조절
				.style("stroke", "black");
			break;
		default:
			if (!kara.glyphs["clefs.G"]) return null;
			pathString = this.pathClone(kara.glyphs["clefs.G"].d, x, y);
			svg.append("path")
				.attr("class", "in_bar" + " " + track)
				.attr("d", pathString)
				.style("transform", "scale(1.2,1.4)") //크기조절
				.style("stroke", "black");
			kara.scoreInfo.track[track].clef = "G";
			break;
	}
	box_x = 0;
	box_y = Y-10;
	width = 40;
	height = 90;

	svg.append("rect")
		.attr("id", "editClef")
		.attr("class", "in_bar" + " " + track)
		.attr("x", box_x)
		.attr("y", box_y)
		.attr("onclick", "kara.editClef('" + track + "')")
		.style("width", width)
		.style("height", height)
		.style("fill", "#00ff01")
		.style("fill-opacity", "0.3");

};

kara.keySVG = function(Y, key, track){ //조표 SVG
	var svg = kara.svg[track].svgBox;
	var keySplit = key.split(' ');
	var M = kara.key[keySplit[0]];
	var N = M[keySplit[1]];
  var x;
  var y;
  var width;
  var height;

	for (var key in M) {
		if (key == keySplit[1]) {
			switch(key){
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
					for(var i=0;i<M[keySplit[1]];i++){
						switch (i) {
							case 0:
								y = Y-5 //G_F
								break;
							case 1:
								y = Y+12 //D_C
								break;
							case 2:
								y = Y-10 //A_G
								break;
							case 3:
								y = Y+7 //E_D
								break;
							case 4:
								y = Y+25 //B_A
								break;
						}
						kara.printSymbol("accidentals.sharp", 50+(i*10), y, track);
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
					for(var i=0;i<M[keySplit[1]];i++){
						switch (i) {
							case 0:
								y = Y+19 //Gb_b
								break;
							case 1:
								y = Y+1 //Ab_e
								break;
							case 2:
								y = Y+25 //Db_a
								break;
							case 3:
								y = Y+7 //Eb_d
								break;
							case 4:
								y = Y+31 //Bb_g
								break;
							case 5:
								y = Y+13 //F_c
								break;
						}
						kara.printSymbol("accidentals.flat", 50+(i*10), y, track);
					}
					break;
			}
		}
	}
	x = 40;
  y = Y - 17;
  width = N*10+15;
  height = 74;

	svg.append("rect")
		.attr("id", "editKey")
		.attr("class", "in_bar" + " " + track)
    	.attr("x", x)
   		.attr("y", y)
		.attr("onclick", "kara.editKey(" + track + ")")
    	.style("width", width)
    	.style("height", height)
    	.style("fill", "#00ffff")
		.style("fill-opacity", "0.3");

};

kara.meterSVG = function(Y, track){ //박자 SVG
	var svg = kara.svg[track].svgSymbol;
	var box = kara.svg[track].svgBox;
	var key = kara.scoreInfo.key;
	var keySplit = key.split(' ');
	var M = kara.key[keySplit[0]];
	var N = M[keySplit[1]];
	var x;
	var y;
	var width;
	var height;

	var meter = kara.scoreInfo.meter;
	var meterSplit = meter.split('/');

	var pathString = this.pathClone(kara.glyphs[meterSplit[0]].d, 45+(N*10), Y/1.4+24.7);
	var pathString2 = this.pathClone(kara.glyphs[meterSplit[1]].d, 45+(N*10), Y/1.4+41.7);
	svg.append("path")
		.attr("id", "meter")
		.attr("class", "in_bar" + " " + track)
		.attr("d", pathString)
		.style("transform", "scale(1.2,1.4)")
		.style("stroke", "black");
	svg.append("path")
		.attr("class", "in_bar" + " " + track)
		.attr("d", pathString2)
		.style("transform", "scale(1.2,1.4)")
		.style("stroke", "black");

	x = 55+(N*10);
	y = Y+11;
	width = N+20;
	height = 50;

	box.append("rect")
		.attr("id", "editMeter")
		.attr("class", "in_bar" + " " + track)
		.attr("x", x)
		.attr("y", y)
		.attr("onclick", "kara.editMeter()")
		.style("width", width)
		.style("height", height)
		.style("fill", "#00ff00")
		.style("fill-opacity", "0.7");
};


kara.printflag = function(symb, x, y, track){ //꼬리 SVG
	var svg = kara.svg[track].svgSymbol;
	if (!kara.glyphs[symb]) return null;
	var pathString = this.pathClone(kara.glyphs[symb].d, x+10.35, y-29);
	svg.append("path")
		.attr("class", "in_bar" + " " + track)
		.attr("d", pathString)
		.style("stroke", "black");
};

kara.printSymbol = function(symb, x, y, track){
	var svg = kara.svg[track].svgSymbol;
	if (!kara.glyphs[symb]) return null;
	var pathString = this.pathClone(kara.glyphs[symb].d, x, y);
	svg.append("path")
		.attr("class", "in_bar" + " " + track)
		.attr("d", pathString)
		.style("stroke", "black");
};

kara.print_s_p = function(symb, x, y, track){
	var svg = kara.svg[track].svgSymbol;
	if (!kara.glyphs[symb]) return null;
	var pathString = this.pathClone(kara.glyphs[symb].d, x/0.7, y/0.7);
	svg.append("path")
		.attr("class", "in_bar" + " " + track)
		.attr("d", pathString)
		.style("transform", "scale(0.7,0.7)")
		.style("stroke", "black");
};

kara.pathClone = function (pathString, x, y) { //심볼을 찾아옴
	var res = [];
	var res1;
	for(var i=0;i<pathString.length;i++) {
		res[i] = [];
		for(var j=0;j<pathString[i].length;j++) {
			res[i][j] = pathString[i][j];

			if(i==0 && j==0) {
				res1 = res[i][j];
			}else{
				if(i==0 && j==1){res[0][1] += x;}
				if(i==0 && j==2){res[0][2] += y;}

				res1 = res1 +" "+ res[i][j];
			}
		}
	}
	return res1;
};

kara.hLine = function(y, track){ //오선지
	var line = kara.svg[track].svgLine;
	var X = kara.XY.X();
	var Y = kara.XY.Y(y);
	var key = kara.scoreInfo.key;
	var keySplit = key.split(' ');
	var M = kara.key[keySplit[0]];
	var N = M[keySplit[1]];
	var clef = kara.scoreInfo.clef;
	var gab = 12;

	for(i=1;i<=5;i++){ //간격조절
		var pathString = kara.sprintf("M %f %f L %f %f", 0, (i*gab)+Y, X, (i*gab)+Y); //간격 12씩 5줄
		line.append("path")
			.attr("class", "in_bar" + " " + track)
			.attr("d", pathString)
			.style("stroke", "black");
	}
	kara.clefSVG(10, Y, Y, track); //높은 음자리 //1.4+35
	kara.vLine(X, Y+12, track); //끝 줄
	kara.keySVG(Y+17, key, track); //조표 그리기
	kara.meterSVG(Y, track); //박자

	var a = N*12+70;
	var ac = (X-a)/4;
	// kara.vLine(a, Y+12); // 없어도 됨
	kara.vLine(ac*1+a, Y+12, track);
	kara.vLine(ac*2+a, Y+12, track);
	kara.vLine(ac*3+a, Y+12, track);
};

kara.vLine = function(x, y, track){ //마디
	var svg = kara.svg[track].svgLine;
	var pathString = kara.sprintf("M %f %f L %f %f", x, y, x, y+48);
	svg.append("path")
		.attr("class", "in_bar" + " " + track)
		.attr("d", pathString)
		.style("stroke", "black");
};

kara.notevLine = function(x, y, track){ //음표 막대
	var svg = kara.svg[track].svgNote;
	var pathString = kara.sprintf("M %f %f L %f %f", x+10, y, x+10, y-30);
	svg.append("path")
		.attr("class", "in_bar" + " " + track)
		.attr("d", pathString)
		.style("stroke", "black");
};

kara.notevLow = function(x, y, pitch, meter, track){ //음표 막대
	var svg = kara.svg[track].svgNote;
	var pathString;
	var m = 0, n = 0;

	if(pitch === "C4") y = y;
	else if(pitch === "B3") y = y - 4;
	else if(pitch === "A3") y = y;
	else if(pitch === "E2") y = y;
	else if(pitch === "D2") y = y - 4;
	else if(pitch === "C2") y = y;
	else return;

	switch(meter){
		case 'whole':
			x = x-3.5;
			m = x + 22;
			n = y;
			console.log(meter);
			break;
		case 'half':
			x = x-4;
			m = x + 18;
			n = y;
			console.log(meter);
			break;
		case 'quarter':
			x = x-3;
			m = x + 18.5;
			n = y;
			console.log(meter);
			break;
		case '8th':
			x = x-3;
			m = x + 18.5;
			n = y;
			console.log(meter);
			break;
		case '16th':
			x = x-3;
			m = x + 18.5;
			n = y;
			console.log(meter);
			break;
		default:
			break;
	}

	pathString = kara.sprintf("M %f %f L %f %f", x, y, m, n);
	svg.append("path")
		.attr("class", "in_bar" + " " + track)
		.attr("d", pathString)
		.style("stroke", "black")
		.style("stroke-width", "1.5px");
};

kara.noteBox = {
	print: function(X, Y , bNum, nNum, meter, track){
		var svg = kara.svg[track].svgContainer;
		var key = kara.scoreInfo.key;
		var keySplit = key.split(' ');
		var M = kara.key[keySplit[0]];
		var N = M[keySplit[1]];
		var clef = kara.scoreInfo.track[track].clef;
		var i = 0;
		var j = 0;

		var a = N*12+70;
		var ac = (X-a)/4;
		// kara.vLine(a, Y+12); // 없어도 됨
		// kara.vLine(ac*1+a, Y+12);
		// kara.vLine(ac*2+a, Y+12);
		// kara.vLine(ac*3+a, Y+12);

		var x = a;
		var y = Y-15;

		var width = (X-a)/4
		var height = 6;

		switch(meter){
			case 'whole': //온음표
				width = width;
				break;
			case 'half': //2분음표
				width = width/2;
				break;
			case 'quarter': //4분음표
				width = width/4;
				break;
			case '8th': //8분음표
				width = width/8;
				break;
			case '16th': //16분음표
				width = width/16;
				break;
			default:
				break;
		}
		var svgVar = svg.append("g") //마디 번호
			.attr("id", "bar_" + bNum)
			.attr("class", "in_bar" + " " + track);

		switch(clef){
			case "G":
				i = 14; //A3~ C6 17 j = 30
				j = i+16;

				break;
			case "F":  //C2~E4 =
				i = 26;
				j = i+16;
				break;
			case "P":
				break;
		}
		for(i;i<=j;i++){  //a3 ~ b7
			if((i%2) == 1){
				var m = 50 - i;
				var p = pitch_select.selection(m);

				svgVar.append("rect")
					.attr("id", p)
					.attr("class", "in_bar " + "bar_" + bNum + " " + "note_" + nNum + " " + track) //마디,  음표 번호
			    .attr("x", x)
			    .attr("y", y)
					.attr("onmousedown", "PopLayer.Action(this, 'noteSelect');")
			    .style("width", width)
			    .style("height", height)
			    .style("fill", "#6666FF")
					.style("fill-opacity", "0.3");
				y = height + y;
			}else{
				var m = 50 - i;
				var p = pitch_select.selection(m);

				svgVar.append("rect")
					.attr("id", p)
					.attr("class", "in_bar " + "bar_" + bNum + " " + "note_" + nNum + " " + track) //마디,  음표 번호
			    .attr("x", x)
			    .attr("y", y)
					.attr("onmousedown", "PopLayer.Action(this, 'noteSelect');")
			    .style("width", width)
			    .style("height", height)
			    .style("fill", "#66FFFF")
					.style("fill-opacity", "0.3");
				y = height + y;
			}
		}
	}
};

kara.noteBox_ = {
	print: function(X, Y , bNum, nNum, meter, track){
		var note = kara.scoreInfo.track[track].notes;
		var svg = kara.svg[track].svgContainer;
		var key = kara.scoreInfo.key;
		var keySplit = key.split(' ');
		var M = kara.key[keySplit[0]];
		var N = M[keySplit[1]];
		var clef = kara.scoreInfo.track[track].clef;
		var i = 0;
		var j = 0;
		var flag = 0;
		if(nNum == 0){ //이전  마디의 정보를 얻어옴
			bNum--;
			nNum = note[bNum].length-1;
			flag = 1;
		}
		else{
			nNum = nNum-1;
		}
		// var pitch = note[bNum][nNum][0];
		var pre_meter = note[bNum][nNum][1];
		console.log(pre_meter);
		var position = $(".bar_"+ bNum + ".note_" + nNum + "." + track).position();


		var a = N*12+70;
		var ac = (X-a)/4;
		// kara.vLine(a, Y+12); // 없어도 됨
		// kara.vLine(ac*1+a, Y+12);
		// kara.vLine(ac*2+a, Y+12);
		// kara.vLine(ac*3+a, Y+12);

		var x = position.left - kara.scorePosition.left(track);
		var y = Y - 15;

		var width = (X-a)/4;
		var height = 6;

		if(flag == 1){ // 원래 상태로 돌려놓는다
			bNum++;
			nNum = 0;
		}
		else{
			nNum = nNum+1;
		}
		switch(pre_meter){
			case 'whole': //온음표
				x = x + width;
				break;
			case 'half': //2분음표
				x = x + width/2;
				break;
			case 'quarter': //4분음표
				x = x + width/4;
				break;
			case '8th': //8분음표
				x = x + width/8;
				break;
			case '16th': //16분음표
				x = x + width/16;
				break;
			default:
				break;
		}

		switch(meter){
			case 'whole': //온음표
				width = width;

				break;
			case 'half': //2분음표
				width = width/2;

				break;
			case 'quarter': //4분음표
				width = width/4;

				break;
			case '8th': //8분음표
				width = width/8;

				break;
			case '16th': //16분음표
				width = width/16;

				break;
			default:
				break;
		}

		var svgVar = svg.append("g") //마디 번호
			.attr("id", "bar_" + bNum)
			.attr("class", "in_bar" + " " + track);

		switch(clef){
			case "G":
				i = 14; //A3~ C6 17 j = 30
				j = i+16;

				break;
			case "F":  //C2~E4 =
				i = 26;
				j = i+16;
				break;
			case "P":
				break;
		}

		for(i;i<=j;i++){  //a3 ~ b7
			if((i%2) == 1){
				var m = 50 - i;
				var p = pitch_select.selection(m);

				svgVar.append("rect")
					.attr("id", p)
					.attr("class", "in_bar " + "bar_"+ bNum + " "+"note_" + nNum + " " + track) //마디,  음표 번호
					.attr("x", x)
					.attr("y", y)
					.attr("onmousedown", "PopLayer.Action(this, 'noteSelect');")
					.style("width", width)
					.style("height", height)
					.style("fill", "#6666FF")
					.style("fill-opacity", "0.3");
				y = height + y;
			}else{
				var m = 50 - i;
				var p = pitch_select.selection(m);

				svgVar.append("rect")
					.attr("id", p)
					.attr("class", "in_bar " + "bar_"+ bNum + " "+"note_" + nNum + " " + track) //마디,  음표 번호
					.attr("x", x)
					.attr("y", y)
					.attr("onmousedown", "PopLayer.Action(this, 'noteSelect');")
					.style("width", width)
					.style("height", height)
					.style("fill", "#66FFFF")
					.style("fill-opacity", "0.5");
				y = height + y;
			}
		}
	}
};


kara.noteBox_last = {
	print: function(X, Y , bNum, nNum, meter, set, track){
		var note = kara.scoreInfo.track[track].notes;
		var svg = kara.svg[track].svgContainer;
		var key = kara.scoreInfo.key;
		var keySplit = key.split(' ');
		var M = kara.key[keySplit[0]];
		var N = M[keySplit[1]];
		var pitch = note[bNum][nNum][0];
		var clef = kara.scoreInfo.track[track].clef;
		var i = 0;
		var j = 0;

		var position = $(".bar_"+ bNum + ".note_" + nNum + "." + track).position();

		var a = N*12+70;
		var ac = (X-a)/4;
		// kara.vLine(a, Y+12); // 없어도 됨
		// kara.vLine(ac*1+a, Y+12);
		// kara.vLine(ac*2+a, Y+12);
		// kara.vLine(ac*3+a, Y+12);


		var x = position.left - kara.scorePosition.left(track);
		var y = Y-15;

		var width = (X-a)/4;
		var height = 6;

		nNum = nNum+1;

		switch(meter){
			case 'whole': //온음표
				width = width;
				x = x + (X-a)/4;

				if(kara.meterCal_box(bNum, track)){ //마디 꽉차서
					bNum = bNum+1;
					nNum = 0;
				}
				break;
			case 'half': //2분음표
				width = width-width/2;
				x = x + (X-a)/4-width;

				if(kara.meterCal_box(bNum, track)){ //마디 꽉차서
					bNum = bNum+1;
					nNum = 0;
				}

				break;
			case 'quarter': //4분음표
				width = width-width/4;
				x = x + (X-a)/4-width;

				if(kara.meterCal_box(bNum, track)){ //마디 꽉차서
					bNum = bNum+1;
					nNum = 0;
				}
				break;
			case '8th': //8분음표
				width = width-width/8;
				x = x + (X-a)/4-width;
				if(kara.meterCal_box(bNum, track)){ //마디 꽉차서
					bNum = bNum+1;
					nNum = 0;
				}
				break;
			case '16th': //16분음표
				width = width-width/16;
				x = x + (X-a)/4-width;
				if(kara.meterCal_box(bNum, track)){ //마디 꽉차서
					bNum = bNum+1;
					nNum = 0;
				}
				break;
			case 32:
				break;
			case 64:
				break;
			case 128:
				break;
			default:
				break;
		}

		if(set === 1){
			console.log(bNum);
			x = a;
		}


		var svgVar = svg.append("g") //마디 번호
			.attr("id", "bar_" + bNum)
			.attr("class", "in_bar" + " " + track);

		switch(clef){
			case "G":
				i = 14; //A3~ C6 17 j = 30
				j = i+16;

				break;
			case "F":  //C2~E4 =
				i = 26;
				j = i+16;
				break;
			case "P":
				break;
		}

		for(var i4;i<=j;i++){  //a3 ~ b7
			if((i%2) == 1){
				var m = 50 - i;
				var p = pitch_select.selection(m);

				svgVar.append("rect")
					.attr("id", p)
					.attr("class", "in_bar " + "bar_"+ bNum + " "+"note_" + nNum + " " + track) //마디,  음표 번호
			    .attr("x", x)
			    .attr("y", y)
					.attr("onmousedown", "PopLayer.Action(this, 'noteSelect');")
			    .style("width", width)
			    .style("height", height)
			    .style("fill", "#6622FF")
					.style("fill-opacity", "0.3");
				y = height + y;
			}else{
				var m = 50 - i;
				var p = pitch_select.selection(m);

				svgVar.append("rect")
					.attr("id", p)
					.attr("class", "in_bar " + "bar_"+ bNum + " "+"note_" + nNum + " " + track) //마디,  음표 번호
			    .attr("x", x)
			    .attr("y", y)
					.attr("onmousedown", "PopLayer.Action(this, 'noteSelect');")
			    .style("width", width)
			    .style("height", height)
			    .style("fill", "#660000")
					.style("fill-opacity", "0.5");
				y = height + y;
			}
		}
	}
};