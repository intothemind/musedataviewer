
function lineChart(lineData,domain,w,h) {
	beginShape();
	lineData.forEach(function(d,i){
		var x = map(i,0,lineData.length-1,0,w);
		var y = map(d,domain[0],domain[1],h,0);
		vertex(x,y);
	});
	endShape();
}


function fftBarChart(barData,domain,w,h,colors){
	barData.forEach(function(d, i) {
			var x = map(i, 0, barData.length, 0, w);
			var y = map(d, domain[0], domain[1], h, 0);
			var col = colors[i];//getColor(i);
			stroke(col);
			line(x, h, x, y);
		});
}