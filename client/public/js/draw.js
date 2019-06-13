if(!window.kara) window.kara = {};

kara.draw = {
	
	title: function(trcNm, title) {// 제목 그리기
		
		var svg = kara.svg[trcNm].svgText;
		var box = kara.svg[trcNm].svgBox;
	
		svg.append('text')
			.attr('id', 'title')
			.attr('class', 'in_bar')		// .in_bar :: 초기화 영역
			.attr('font-size', '60px')		// font size 60px
			.attr('x', '50%')				// 가운데
			.attr('y', '50')				// 위에서 50
			.attr('dy', '.47em')
			.style('text-anchor', 'middle')	// 가운데 정렬
			.style('fill', '#000000')
			.style('font-weight', 'bold')
			.text(title);					// 악보정보객체의 TITLE
		
		
		var position = $('#title').position();	// 제목 위치리턴 객체 left, top
		var x = position.left - kara.scorePosition.left(trcNm);
		var y = position.top - kara.scorePosition.top(trcNm);
		var width = $('#title').width();	// 0 ISSUE
		var height = $('#title').height();	// 0 ISSUE
	
		box.append('rect')
			.attr('id', 'editTitle')// #editTitle :: TITLE 선택영역(수정용)
			.attr('class', 'in_bar')// .in_bar :: 악보 초기화 영역
			.attr('x', x)
			.attr('y', y)
			.attr('onclick', "kara.editTitle('" + trcNm + "')")// Click Event(제목 수정)
			//.style("width", width)// 0 ISSUE
			//.style("height", height)// 0 ISSUE
			.style('width', '100')// 변경해야됨
			.style('height', '80')// 변경해야됨
			.style('fill', '#000000')
			.style('fill-opacity', '0.3');
	},
	
	tempo: function(trcNm, tempo) {
		
		var svg = kara.svg[trcNm].svgText;
		var box = kara.svg[trcNm].svgBox;
		
		svg.append("text")
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
		
		var position = $('#tempo').position();
		var x = position.left - kara.scorePosition.left(trcNm);
		var y = position.top - kara.scorePosition.top(trcNm);
		var width = $('#tempo').width();
		var height = $('#tempo').height();

		box.append("rect")
			.attr("id", "editTempo")
			.attr("class", "in_bar")// .in_bar :: 삭제영역
			.attr("x", x)
			.attr("y", y)
			.attr("onclick", "kara.editTempo('" + trcNm + "')")
			//.style("width", width)// 0 ISSUE
			//.style("height", height)// 0 ISSUE
			.style("width", "100")// 0 ISSUE
			.style("height", "25")// 0 ISSUE
			.style("fill", "#000000")
			.style("fill-opacity", '0.3');
	},
	writer: function(trcNm, writer) {
		
		var svg = kara.svg[trcNm].svgText;
		var box = kara.svg[trcNm].svgBox;
		
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

		var position = $('#writer').position();
		var x = position.left - kara.scorePosition.left(trcNm);
		var y = position.top - kara.scorePosition.top(trcNm);
		var width = $('#writer').width();
		var height = $('#writer').height();

		box.append('rect')
			.attr('id', 'editWriter')
			.attr("class", "in_bar")
			.attr("x", x)
			.attr("y", y)
			.attr("onclick", "kara.editWriter('" + trcNm + "')")
			//.style("width", width)
			//.style("height", height)
			.style("width", "100")
			.style("height", "25")
			.style("fill", "#000000")
			.style("fill-opacity", "0.3");
	}
};