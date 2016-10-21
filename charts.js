function lineChart(lineData, domain, w, h,label) {

	var innerW = w - 70;
	beginShape();
	lineData.forEach(function(d, i) {
		var x = map(i, 0, lineData.length - 1, 0, innerW);
		var y = map(d, domain[0], domain[1], h, 0);
		vertex(x, y);
	});
	endShape();

	//annotation dot at last point
	var x = map(lineData.length - 1, 0, lineData.length - 1, 0, innerW);
	var y = map(lineData[lineData.length - 1], domain[0], domain[1], h, 0);
	fill('black')
	ellipse(x,y,5,5);
	var value = nf(lineData[lineData.length - 1],null,2);
	noStroke();
	textAlign(LEFT,CENTER);
	text(value + ' ' + label,x+10,y);
}

function areaChart(areaData, domain, w, h) {
	beginShape();
	var x = map(0, 0, areaData.length - 1, 0, w);
	var y = map(domain[0], domain[0], domain[1], h, 0);
	vertex(x, y);
	areaData.forEach(function(d, i) {
		x = map(i, 0, areaData.length - 1, 0, w);
		y = map(d, domain[0], domain[1], h, 0);
		vertex(x, y);
	});
	x = map(areaData.length - 1, 0, areaData.length - 1, 0, w);
	y = map(domain[0], domain[0], domain[1], h, 0);
	vertex(x, y);
	endShape(CLOSE);
}


function fftBarChart(barData, domain, w, h, colors) {
	barData.forEach(function(d, i) {
		var x = map(i, 0, barData.length, 0, w);
		var y = map(d, domain[0], domain[1], h, 0);
		var col = colors[i]; //getColor(i);
		stroke(col);
		line(x, h, x, y);
	});
}