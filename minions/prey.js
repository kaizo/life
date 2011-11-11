var prey = function(specs){
	var that = element(specs);
	var maxTurnSpeed = specs.maxTurnSpeed;
//	var angulo = (Math.floor(Math.random()*(maxTurnSpeed*2)) - maxTurnSpeed) / 1000;
	var angulo = 0;
	that.setDirection(angulo);

	var parentMove = that.move;

	// var startHandler = function(){
	// 	console.log('HOLA');
	// };

	myWorld.startEvent.listen(startHandler);

	that.move = function(){
		var angulo = Math.floor(Math.random()*(maxTurnSpeed*2)) - maxTurnSpeed;
		var dir = that.getDirection() + angulo;
		if(dir >= 360){
			dir -= 360;
		}
		if(dir < 0){
			dir += 360;
		}
		
		that.setDirection(dir);
		parentMove();
	};

	that.escape = function(){

	};
	return that;
};