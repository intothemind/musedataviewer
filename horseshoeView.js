function horseshoeView(model, title, description) {

	var my = view(model, title, description);

	var padding = my.getPadding();
	
	var colors = {
		'1': 'green',
		'2': 'yellow',
		'3': 'red'
	};

	var foreHeadColors = {
		'0': 'white',
		'1': 'black'
	};

	my.render = function() {
		//console.log('rawEEGView.render');
		//console.log(my);
		//console.log('title: ' + my.getTitle());
		//console.log('description: ' + my.getDescription());

		my.renderCommon();

		var horseshoe = select('#horseshoe');
		horseshoe.style('margin-top','100px');
		horseshoe.style('margin-left','100px');
		//console.log(model.horseshoe);
		//console.log(select('#leftFront'));
		select('#leftFront').style('fill','red');

		select('#leftEar').style('fill',colors[model.horseshoe.leftEar]);
		select('#leftFront').style('fill',colors[model.horseshoe.leftFront]);
		select('#rightFront').style('fill',colors[model.horseshoe.rightFront]);
		select('#rightEar').style('fill',colors[model.horseshoe.rightEar]);

		select('#front').style('fill',foreHeadColors[model.touching_forehead]);



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

