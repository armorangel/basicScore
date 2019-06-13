if(!window.kara) window.kara = {};

kara.draw = {
	
	track: '',
	txt: null,
	box: null,
	symbol: null,
	
	setTrack: function(trcNm) {
		
		if(!trcNm) return;
		
		this.track = trcNm;
		this.txt = kara.svg[trcNm].svgText;
		this.box = kara.svg[trcNm].svgBox;
		this.symbol = kara.svg[trcNm].svgSymbol;
		
		return this;
	},
	
	removeSvg: function(tag) {
		
		// 해당 트랙의 SVG 요소 삭제
		d3.select('#' + this.track + ' ' + tag).remove();
	},
	
	getBoxSize: function(tag) {
		
		const position = $('#' + this.track + ' ' + tag).position();// 제목 위치리턴 객체 left, top
		const x = position.left - kara.scorePosition.left(this.track);
		const y = position.top - kara.scorePosition.top(this.track);
		const width = $('#' + this.track + ' ' + tag).width();// 0 ISSUE
		const height = $('#' + this.track + ' ' + tag).height();// 0 ISSUE
		
		return {
			
			position: position,
			x: x,
			y: y,
			width: width,	
			height: height	// 0 ISSUE
		};
		
	},
	
	// text
	title: function(title) {	// 제목 그리기
		
		this.removeSvg('#title');	// 타이틀 제거
		this.removeSvg('#edtTtl');	// 타이틀 선택 영역 제거
	
		this.txt.append("text")
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

		var boxSize = this.getBoxSize('#title');
	
		this.box.append('rect')
				.attr('id', 'edtTtl')	// #editTitle :: TITLE 선택영역(수정용)
				.attr('class', 'in_bar')// .in_bar :: 악보 초기화 영역
				.attr('x', boxSize.x)
				.attr('y', boxSize.y)
				.attr('onclick', "kara.edit.title('" + this.track + "')")// Click Event(제목 수정)
				.style('width', '100')// 변경해야됨
				.style('height', '80')// 변경해야됨
				.style('fill', '#000000')
				.style('fill-opacity', '0.3');
		
		return this;
	},
	
	tempo: function(tempo) {
		
		// SVG 요소 삭제
		this.removeSvg('#tempo');	// 템포 제거
		this.removeSvg('#edtTem');	// 템포 선택 영억 제거
		
		this.txt.append("text")
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
		
		var boxSize = this.getBoxSize('#tempo');

		this.box.append("rect")
			.attr("id", "edtTem")
			.attr("class", "in_bar")// .in_bar :: 삭제영역
			.attr("x", boxSize.x)
			.attr("y", boxSize.y)
			.attr("onclick", "kara.edit.tempo('" + this.track + "')")
			.style("width", "100")// 0 ISSUE
			.style("height", "25")// 0 ISSUE
			.style("fill", "#000000")
			.style("fill-opacity", '0.3');
		
		return this;
	},
	writer: function(writer) {
		
		// SVG 요소 삭제
		this.removeSvg('#writer');	// 작곡가 제거
		this.removeSvg('#edtWtr');	// 작곡가 선택 영역 제거
		
		this.txt.append("text")
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
		
		var boxSize = this.getBoxSize('#writer');

		this.box.append('rect')
			.attr('id', 'edtWtr')
			.attr("class", "in_bar")
			.attr("x", boxSize.x)
			.attr("y", boxSize.y)
			.attr("onclick", "kara.edit.writer('" + this.track + "')")
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