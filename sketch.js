

var muse;


//initialize museData
var dummy = true;

var done = false;


var views = [];
var viewIndex = 0;


function setup() {
	createCanvas(800, 600);

	//data connection to muse with sampling rate of muse
	if (dummy) {
		console.log('using dummy data');
		muse = museData().dummyData(1 / 250);
	} else {
		var museAddress = 'http://127.0.0.1:8081';
		console.log('trying to connect to muse on ' + museAddress);
		muse = museData().connection(museAddress);
	}

	//listen to the messages we are interested in 
	//muse.listenTo('/muse/elements/alpha_relative');
	//muse.listenTo('/muse/elements/beta_relative');
	//muse.listenTo('/muse/elements/theta_relative');


	muse.start();


	views.push(rawEEGView(muse,'Raw EEG','this is the description'));
	views.push(rawFFTView(muse,'Raw FFT','this is the other description'));

	

	//set the font
	textFont('HelveticaNeue-Light');
	frameRate(30);
}

function draw() {


	background('white');

	if(frameCount%10 == 0){
		console.log('frameRate: ' + frameRate());
	}


	views[viewIndex].render();


	//var alph = muse.get('/muse/elements/alpha_relative');
	//var beta = muse.get('/muse/elements/beta_relative');
	//var theta = muse.get('/muse/elements/theta_relative');

	//console.log('alph',alph.mean);
	//console.log('beta',beta.mean);
	//console.log('theta',theta.mean);

}

function keyTyped(){
	if(key == 'q'){
		viewIndex = constrain(viewIndex-1,0,views.length-1);
		console.log('viewIndex: ' ,viewIndex,views.length);
	}
	else if(key == 'w'){
		viewIndex = constrain(viewIndex+1,0,views.length-1);
		console.log('viewIndex: ' ,viewIndex,views.length);
	}

	
	
}



//this needs to be part of a helper library together with sum and mean maybe median also
function mean(arr) {
	var sum = 0;

	arr.forEach(function(d) {
		sum += d;
	});

	return sum / arr.length;

}