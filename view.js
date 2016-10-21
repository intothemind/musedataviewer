function view(model, title, description){

	var model = model;
	var title = title;
	var description = description;
	var padding = {
		left: 0,
		top: 0,
		right: 10,
		bottom: 0,
	};

	var h1 = 42;
	var h2 = 18;

	var gap = 50;

	var my = {};

	my.getTitle = function(){
		return title;
	}

	my.getDescription = function(){
		return description;
	}

	my.render = function(){
		console.log('view render');
	}

	my.renderCommon = function(){
		//textSize(h1);
		//text(title, padding.left,padding.top);
		//textSize(h2);
		//text(description,padding.left,padding.top+gap);
		select('#title').html(title);
		select('#description').html(description);
	}

	my.getPadding = function(){
		return padding;
	}

	return my;

}