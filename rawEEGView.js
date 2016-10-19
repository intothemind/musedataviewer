function rawEEGView(model, title, description) {

	var my = view(model, title, description);

	var padding = my.getPadding();
	//0.0 - 1682.815
	//var uVDomain = [0, 1682.815];
	var uVDomain = [1682.815/3,2*1682.815/3];

	console.log(my);

	my.render = function() {
		//console.log('rawEEGView.render');
		//console.log(my);
		//console.log('title: ' + my.getTitle());
		//console.log('description: ' + my.getDescription());

		my.renderCommon();


		var lineData = [model.rawEEG.leftEar, model.rawEEG.leftFront, model.rawEEG.rightFront, model.rawEEG.rightEar];
		var innerWidth = width - padding.left - padding.right;
		var innerHeight = 100;
		var gap = 10;

		push();
		translate(padding.left, 200);
		lineData.forEach(function(ld, i) {
			push();
			translate(0,i*(innerHeight+gap));
			fill(250);
			noStroke();
			rect(0, 0, innerWidth, innerHeight);
			noFill();
			stroke(50);
			strokeWeight(1.8);
			lineChart(ld, uVDomain, innerWidth, innerHeight);
			pop();
		});
		pop();
	}

	return my;
}


/**

Understanding Frequency Bins

The FFTs are calculated using a 256 sample window, 
which gives a transform that has 256 components and is symmetric (i.e. mirrored)
 around an additional component at 0Hz. In other words, you have 128 components, 
 followed by one for 0Hz, and then the mirror image of the same components. 
 This means you need only consider half of them (because the other half are the same, 
 only reflected) plus the one for 0Hz at the centre, which gives you 129 in total.

To get the frequency resolution for the bins, you can divide the sampling rate by the FFT length, 
so in the case of Muse: 220/256 ~ 0.86Hz/bin

So, the zeroth index of the FFT array represents 0Hz, the next index represents 0-0.86Hz, 
and so on up to 128*0.86 = 110Hz, which is the maximum frequency that our FFT with its 220Hz sampling rate can detect.


*/