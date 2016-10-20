function absoluteBandView(model, title, description) {

	var my = view(model, title, description);

	var padding = my.getPadding();
	
	var uVDomain = [1682.815/3,2*1682.815/3];

	

	my.render = function() {
		//console.log('rawEEGView.render');
		//console.log(my);
		//console.log('title: ' + my.getTitle());
		//console.log('description: ' + my.getDescription());

		my.renderCommon();

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


/**

delta_absolute	1-4Hz			
theta_absolute	4-8Hz			
alpha_absolute	7.5-13Hz			
beta_absolute	13-30Hz			
gamma_absolute	30-44Hz

*/

