if(!window.kara) window.kara = {};

kara.draw = {
	
	// text
	title: function(trcNm, title) {// 제목 그리기
		
		const txt = kara.svg[trcNm].svgText;
		const box = kara.svg[trcNm].svgBox;
	
		txt.append("text")
			.attr("id", "title")
			.attr("class", "in_bar")		// .in_bar :: 초기화 영역
			.attr("font-size", "60px")		// font size 60px
			.attr('x', '50%')				// 가운데
			.attr('y', '50')				// 위에서 50
			.attr('dy', '.47em')
			.style('text-anchor', 'middle')	// 가운데 정렬
			.style('fill', '#000000')
			.style('font-weight', 'bold')
			.text(title);					// 악보정보객체의 TITLE
		
		const position = $('#title').position();	// 제목 위치리턴 객체 left, top
		const x = position.left - kara.scorePosition.left(trcNm);
		const y = position.top - kara.scorePosition.top(trcNm);
		const width = $('#title').width();		// 0 ISSUE
		const height = $('#title').height();	// 0 ISSUE
	
		box.append('rect')
			.attr('id', 'edtTtl')// #editTitle :: TITLE 선택영역(수정용)
			.attr('class', 'in_bar')// .in_bar :: 악보 초기화 영역
			.attr('x', x)
			.attr('y', y)
			.attr('onclick', "kara.edit.title('" + trcNm + "')")// Click Event(제목 수정)
			.style('width', '100')// 변경해야됨
			.style('height', '80')// 변경해야됨
			.style('fill', '#000000')
			.style('fill-opacity', '0.3');
	},
	
	tempo: function(trcNm, tempo) {
		
		const txt = kara.svg[trcNm].svgText;
		const box = kara.svg[trcNm].svgBox;
		
		txt.append("text")
			.attr("id", "tempo")
			.attr("class", "in_bar")	// .in_bar :: 악보 초기화 영역
			.attr("font-size", "16px")
			.attr("x", "5%")
			.attr("y", "140")
			.attr("dy", ".47em")
			.style("text-anchor", "start")
			.style("fill", "#000000")
			.style("font-weight", "bold")
			.text("♩ = " + tempo);
		
		const position = $('#tempo').position();
		const x = position.left - kara.scorePosition.left(trcNm);
		const y = position.top - kara.scorePosition.top(trcNm);
		const width = $('#tempo').width();
		const height = $('#tempo').height();

		box.append("rect")
			.attr("id", "edtTem")
			.attr("class", "in_bar")// .in_bar :: 삭제영역
			.attr("x", x)
			.attr("y", y)
			.attr("onclick", "kara.edit.tempo('" + trcNm + "')")
			.style("width", "100")// 0 ISSUE
			.style("height", "25")// 0 ISSUE
			.style("fill", "#000000")
			.style("fill-opacity", '0.3');
	},
	writer: function(trcNm, writer) {
		
		const txt = kara.svg[trcNm].svgText;
		const box = kara.svg[trcNm].svgBox;
		
		txt.append("text")
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

		const position = $('#writer').position();
		const x = position.left - kara.scorePosition.left(trcNm);
		const y = position.top - kara.scorePosition.top(trcNm);
		const width = $('#writer').width();
		const height = $('#writer').height();

		box.append('rect')
			.attr('id', 'edtWtr')
			.attr("class", "in_bar")
			.attr("x", x)
			.attr("y", y)
			.attr("onclick", "kara.edit.writer('" + trcNm + "')")
			//.style("width", width)
			//.style("height", height)
			.style("width", "100")
			.style("height", "25")
			.style("fill", "#000000")
			.style("fill-opacity", "0.3");
	},
	
	// 음자리표
	clefs_G: function(trcNm, pathString) {
		
		const symbol = kara.svg[trcNm].svgSymbol;
		
		symbol.append("path")
				.attr("class", "in_bar " + trcNm)
				.attr("d", pathString)
				.style("transform", "scale(1.2,1.4)") //크기조절
				.style("stroke", "black");
		
		
	},
	clefs_F: function(trcNm, pathString) {
		
		const symbol = kara.svg[trcNm].svgSymbol;
		
		symbol.append("path")
				.attr("class", "in_bar " + trcNm)
				.attr("d", pathString)
				.style("transform", "scale(1.4,1.7)")	// 크기조절
				.style("stroke", "black");
	},
	clefs_perc: function(trcNm, pathString) {
		
		const symbol = kara.svg[trcNm].svgSymbol;
		
		symbol.append("path")
				.attr("class", "in_bar " + trcNm)
				.attr("d", pathString)
				.style("transform", "scale(1.2,1.5)")	// 크기조절
				.style("stroke", "black");
	},
	
	// 박자
	meter: function(trcNm, pathString) {
		
		const symbol = kara.svg[trcNm].svgSymbol;
		
		symbol.append("path")
			.attr("id", "meter")
			.attr("class", "in_bar " + trcNm)// 삭제 영역
			.attr("d", pathString)
			.style("transform", "scale(1.2,1.4)")
			.style("stroke", "black");
	}
};