function horseshoeView(model, title, description) {

	var my = view(model, title, description);

	var padding = my.getPadding();
	

	my.render = function() {
		//console.log('rawEEGView.render');
		//console.log(my);
		//console.log('title: ' + my.getTitle());
		//console.log('description: ' + my.getDescription());

		my.renderCommon();

		var horseshoe = select('#horseshoe');
		console.log(select('#leftFront'));
		select('#leftFront').style('fill','red');
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

