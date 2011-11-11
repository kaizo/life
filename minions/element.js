var element = function (specs){
	var that = {};
	var x = specs.x;
	var y = specs.y;
	var speed = specs.speed;
	var maxTurnSpeed = specs.maxTurnSpeed;
	var direction = specs.direction;
	var color = specs.color || "#ff0000";
	var size = specs.size || 3;
	that.size = size;
	var grafic = canvasToolkit;

	that.getSpeed = function(){
		return speed || "";
	};

	that.setSpeed = function(param){
		speed = param;
	};

	that.getX = function(){
		return x || 0;
	};

	that.getY = function(){
		return y || 0;
	};

	that.setMaxTurnSpeed = function(param){
		maxTurnSpeed = param;
	};

	that.getMaxTurnSpeed = function(){
		return maxTurnSpeed || "";
	};

	that.setDirection = function(param){
		direction = param;
	};

	that.getDirection = function(){
		return direction || 0;
	};

	that.move = function(){
		var rad = (90 - direction) * Math.PI / 180;
		var dx = speed*Math.sin(rad);
		var dy = speed*Math.cos(rad);
		x += dx;
		y -= dy;
		draw();
		drawDirection(dx, dy, speed);
		
		if (x + dx > canvasToolkit.width){
			x -= canvasToolkit.width;
		}

		if (x + dx < 0){
			x += canvasToolkit.width;
		}

		if(y + dy < 0){
			y += canvasToolkit.height;
		}

		if (y + dy > canvasToolkit.height){
			y -= canvasToolkit.height;
		}
	};

	var draw = function(){
		grafic.circle(x,y,size,color);
	};

	var drawDirection = function(dx, dy, speed){
		grafic.line(x,y,dx,dy,speed);
	};

	that.getDistanceToElement = function(element){
		var dx = element.getX() - that.getX();
		var dy = element.getY() - that.getY();
		return Math.sqrt(dx*dx + dy*dy)
	};

	that.getDirectionToDestination = function(destination){
		var dx = destination.getX() - that.getX();
		var dy = destination.getY() - that.getY();

		//Calculating the angle of the destination
		var ang = -Math.atan(dy/dx) * 180 / (Math.PI);

		//Correcting the angle to standarize it;
		if( destination.getX() < that.getX() ){
			 ang = 180 + ang;
		}else{
			if( destination.getY() > that.getY() ){
				ang = 360 + ang;
			}
		}

		var direcc = that.getDirection();

		//Getting the difference angle between my direction and the direction where is the prey.
		var diff = ang - direcc ;
		var diff2 = ang + 360 - direcc;
		var diff3 = ang - 360 - direcc;
		if(Math.abs(diff) > Math.abs(diff2)){
			diff = diff2;
		}
		if(Math.abs(diff) > Math.abs(diff3)){
			diff = diff3;
		}

		//Obtaining the direction that we will use
		if(Math.abs(diff) > maxTurnSpeed){
			var dir = that.getDirection() + (maxTurnSpeed * Math.abs(diff)/diff);
			if(dir >= 360){
				dir -= 360;
			}
			if(dir < 0){
				dir += 360;
			}
			return dir;
		}else{
			return ang;
		}
	};

	return that;
};