

var muse;


//initialize museData
var dummy = true;

var done = false;


var views = [];
var viewIndex = 1;


var data = {
	rawEEG: {
		leftEar: [],
		leftFront: [],
		rightFront: [],
		rightEar: []
	},
	rawFFT: {
		leftEar: [],
		leftFront: [],
		rightFront: [],
		rightEar: []
	},
	absoluteBand: {},
	relativeBand: {},
	horseshoe: {} 
};

var maxN = 100;


function setup() {
	var can = createCanvas(968, 800);
	can.parent("chart");

	//data connection to muse with sampling rate of muse
	if (dummy) {
		console.log('using dummy data');
		muse = museData().dummyData(1 / 100);
	} else {
		var museAddress = 'http://127.0.0.1:8081';
		console.log('trying to connect to muse on ' + museAddress);
		muse = museData().connection(museAddress);
	}

	//listen to the messages we are interested in 
	muse.listenTo('/muse/eeg');
	muse.listenTo('/muse/elements/raw_fft0');
	muse.listenTo('/muse/elements/raw_fft1');
	muse.listenTo('/muse/elements/raw_fft2');
	muse.listenTo('/muse/elements/raw_fft3');
	muse.listenTo('/muse/elements/delta_absolute');
	muse.listenTo('/muse/elements/theta_absolute');
	muse.listenTo('/muse/elements/alpha_absolute');
	muse.listenTo('/muse/elements/beta_absolute');
	muse.listenTo('/muse/elements/gamma_absolute');
	muse.listenTo('/muse/elements/delta_relative');
	muse.listenTo('/muse/elements/theta_relative');
	muse.listenTo('/muse/elements/alpha_relative');
	muse.listenTo('/muse/elements/beta_relative');
	muse.listenTo('/muse/elements/gamma_relative');
	muse.listenTo('/muse/elements/horseshoe');

	

	//muse.get('/muse/elements/theta_relative');


	muse.start();

	var rawfftview = rawFFTView(data,'Raw FFTs for Each Channel','FFT stands for Fast Fourier Transform. This computes the power spectral density of each frequency on each channel. Basically, it shows which frequencies make up a signal, and  “how much” of each frequency is present. These values are the basis for many of the subsequent DSP values in Muse Elements. Each path contains 129 decimal values with a range of roughly -40.0 to 20.0. Each array represents FFT coefficients (expressed as Power Spectral Density) for each channel, for a frequency range from 0hz-110Hz divided into 129 bins. We use a Hamming window of 256 samples(at 220Hz), then for the next FFT we slide the window 22 samples over(1/10th of a second). This gives a 90% overlap from one window to the next. These values are emitted at 10Hz.');
	views.push(rawEEGView(data,'Raw EEG','This is the raw EEG data for each channel on the headband as measured in microvolts.'));
	views.push(rawfftview);

	

	//set the font
	textFont('HelveticaNeue-Light');
	frameRate(30);
}

function draw() {


	//wait for a few seconds so that the data can come trough
	if(frameCount<30){
		background('red');
		return;
	}


	background('white');



	if(frameCount%10 == 0){
		console.log('frameRate: ' + frameRate());
	}

	updateData();

	views[viewIndex].render();


	//var alph = muse.get('/muse/elements/alpha_relative');
	//var beta = muse.get('/muse/elements/beta_relative');
	//var theta = muse.get('/muse/elements/theta_relative');

	//console.log('alph',alph.mean);
	//console.log('beta',beta.mean);
	//console.log('theta',theta.mean);

}

function updateData(){
	var eeg = muse.get('/muse/eeg');
	var raw_fft0 = muse.get('/muse/elements/raw_fft0');
	var raw_fft1 = muse.get('/muse/elements/raw_fft1');
	var raw_fft2 = muse.get('/muse/elements/raw_fft2');
	var raw_fft3 = muse.get('/muse/elements/raw_fft3');
	var delta_absolute = muse.get('/muse/elements/delta_absolute');
	var theta_absolute = muse.get('/muse/elements/theta_absolute');
	var alpha_absolute = muse.get('/muse/elements/alpha_absolute');
	var beta_absolute = muse.get('/muse/elements/beta_absolute');
	var gamma_absolute = muse.get('/muse/elements/gamma_absolute');
	var delta_relative = muse.get('/muse/elements/delta_relative');
	var theta_relative = muse.get('/muse/elements/theta_relative');
	var alpha_relative = muse.get('/muse/elements/alpha_relative');
	var beta_relative = muse.get('/muse/elements/beta_relative');
	var gamma_relative = muse.get('/muse/elements/gamma_relative');
	var horseshoe = muse.get('/muse/elements/horseshoe');



	//raw EEG
	data.rawEEG.leftEar.push(eeg.leftEar);
	data.rawEEG.leftFront.push(eeg.leftFront);
	data.rawEEG.rightFront.push(eeg.rightFront);
	data.rawEEG.rightEar.push(eeg.rightEar);

	shifArrays([data.rawEEG.leftEar,data.rawEEG.leftFront,data.rawEEG.rightFront,data.rawEEG.rightEar],maxN);


	//raw FFT
	data.rawFFT.leftEar = raw_fft0.values;
	data.rawFFT.leftFront = raw_fft1.values;
	data.rawFFT.rightFront = raw_fft2.values;
	data.rawFFT.rightEar = raw_fft3.values;


	//console.log('data.rawEEG');
	//console.log(data.rawEEG.leftEar);

/*
var data = {
	rawEEG: [],
	rawFFT: [],
	absoluteBand: {},
	relativeBand: {},
	horseshoe: {} 
};*/



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


function shifArrays(arrOfArrays,n){
	arrOfArrays.forEach(function(arr){
		if(arr.length>n){
			arr.shift();
		}
	});
}



//this needs to be part of a helper library together with sum and mean maybe median also
function mean(arr) {
	var sum = 0;

	arr.forEach(function(d) {
		sum += d;
	});

	return sum / arr.length;

}