function view(model, title, description){

	var model = model;
	var title = title;
	var description = description;

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
		text(title, 100,100);
		text(description,100,200);
	}

	return my;

}