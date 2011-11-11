var world = function(specs){
	var that = {};
	var width = specs.width;
	var height = specs.height;
	var grafic = canvasToolkit;
	var interval;
	grafic.width = width;
	grafic.height = height;

	that.createPreys = function(){
		that.preys = [];
		for(var i = 0; i < 10; i++){
			that.preys[i] = prey({
				speed: 5,
				maxTurnSpeed: 20,
				color: "#0000ff",
				x: Math.floor(Math.random() * width),
				y: Math.floor(Math.random() * height)
			});
		}
	};

	that.createPredators = function(){
		that.predators = [];
		that.predators[0] = predator({
			meal: that.preys,
			speed: 4,
			maxTurnSpeed: 20,
			color: "#ff0000",
			x: 100,
			y: 100,
			predators: that.predators
		});
		
	}
	
	var startEvent = event();
	that.startEvent = startEvent

	var start = function(){
		startEvent.fire();
		interval = setInterval(step, 50);
	};
	that.start = start;

	var stop = function(){
		clearInterval(interval);
	};
	that.stop = stop;

	var step = function(){
		grafic.rebuild();
		if(that.preys.length === 0 || that.predators.length === 0){
			stop();
		}
		for(var i = 0; i < that.preys.length; i++){
			that.preys[i].move();
		}

		for(var i = 0; i < that.predators.length; i++){
			that.predators[i].move();
		}
	};
	that.step = step;
	
	return that;
};