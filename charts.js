
function lineChart(lineData,domain,w,h) {
	beginShape();
	lineData.forEach(function(d,i){
		var x = map(i,0,lineData.length-1,0,w);
		var y = map(d,domain[0],domain[1],h,0);
		vertex(x,y);
	});
	endShape();
}