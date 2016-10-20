function relativeBandView(model, title, description) {

	var my = view(model, title, description);

	var padding = my.getPadding();
	
	var domain = [0,1];

	//data.absoluteBand.delta.leftFront


	var frequencies = ['Delta','Theta','Alpha','Beta','Gamma'];
	var colors = ['#225378', '#1695A3', '#ACF0F2', '#F3FFE2', '#EB7F00'];
	
	my.render = function() {
		//console.log('rawEEGView.render');
		//console.log(my);
		//console.log('title: ' + my.getTitle());
		//console.log('description: ' + my.getDescription());

		my.renderCommon();

		var areaData = [model.relativeBand.delta.leftFront,data.relativeBand.theta.leftFront,data.relativeBand.alpha.leftFront,data.relativeBand.beta.leftFront,data.relativeBand.gamma.leftFront];
		var innerWidth = width - padding.left - padding.right;
		var innerHeight = 100;
		var gap = 0;


		strokeWeight(1);
		noStroke();
		push();
		translate(padding.left, padding.top);
		areaData.forEach(function(d,i){
			push();
			translate(0,i*(innerHeight+gap));
			fill(colors[i]);
			areaChart(areaData[i],domain,innerWidth,innerHeight);
			pop();
		});
		


		//legend
		var colWidth = 100;
		var r = 15;
		var txtSze = 16;
		textSize(txtSze);
		translate(0,areaData.length*(innerHeight+gap) + 60);
		frequencies.forEach(function(f,i){
			//console.log(f,i);
			push();
			translate(i*colWidth,0);
			noStroke();
			fill(colors[i]);
			ellipse(0,0,r,r);
			fill(0);
			text(f,r,6);
			pop();
		});
		pop();
/*
		var lineData = [model.rawEEG.leftEar, model.rawEEG.leftFront, model.rawEEG.rightFront, model.rawEEG.rightEar];
		var innerWidth = width - padding.left - padding.right;
		var innerHeight = 100;
		var gap = 10;

		push();
		translate(padding.left, padding.top);
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
		
		pop();*/
	}

	return my;
}

/*
The relative band powers are calculated by dividing the absolute linear-scale power in one band over the sum of the absolute linear-scale powers in all bands. The linear-scale band power can be calculated from the log-scale band power thusly: linear-scale band power = 10^ (log-scale band power).
Therefore, the relative band powers can be calculated as percentages of linear-scale band powers in each band.
The resulting value is between 0 and 1. However, the value will never be 0 or 1.
These values are emitted at 10Hz.

*/
