function rawFFTView(model,title,description){
	
	var my = view(model,title,description);

	console.log(my);

	my.render = function(){
		//console.log('rawEEGView.render');
		//console.log(my);
		//console.log('title: ' + my.getTitle());
		//console.log('description: ' + my.getDescription());

		my.renderCommon();

		push();
		translate(100,200);
		fill('green');
		rect(0,0,200,100);
		pop();
	}

	return my;
}