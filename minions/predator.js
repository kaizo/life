var predator = function(specs){
	var that = element(specs);
	var distance = 999999999;
	var myMeal;
	if(specs.meal.constructor == Array){
		var elementDist = 0;
		for(var i = 0; i < specs.meal.length; i++){
			elementDist = that.getDistanceToElement(specs.meal[i]);
			if(elementDist < distance){
				myMeal = specs.meal[i];
				distance = elementDist;
			}
		}
	}else{
		myMeal = specs.meal;
		distance =that.getDistanceToElement(myMeal);
	}
	var maxTurnSpeed = specs.maxTurnSpeed;
	var angulo = (Math.floor(Math.random()*(maxTurnSpeed*2)) - maxTurnSpeed) / 1000;
	that.setDirection(angulo);

	var parentMove = that.move;

	that.move = function(){
		if(specs.meal.constructor == Array){
			distance = 99999999999;
			var elementDist = 0;
			for(var i = 0; i < specs.meal.length; i++){
				elementDist = that.getDistanceToElement(specs.meal[i]);
				if(elementDist < distance){
					myMeal = specs.meal[i];
					distance = elementDist;
				}
			}
		}else{
			myMeal = specs.meal;
			distance = that.getDistanceToElement(myMeal);
		}
		that.setDirection(that.getDirectionToDestination(myMeal));
		parentMove();
		if(distance < that.size + myMeal.size){
			specs.predators.push(
				predator({
					meal: specs.meal,
					speed: 4,
					maxTurnSpeed: 20,
					color: "#ff00ff",
					x: myMeal.getX(),
					y: myMeal.getY(),
					predators: specs.predators
				})
			);			

			var pos = specs.meal.indexOf(myMeal);
			specs.meal.splice(pos,1);
		}
	};

	that.escape = function(){

	};
	return that;
};





// //Functional classes
// function m (){
// 	var that = {};
// 	that.algo = function(){
		
// 	}
// 	return that;
// }

// function n(){
// 	var that = m();
// 	thatn.otracosa=function(){
		
// 	}
// 	return that;
// }



// //Classical classes
// function M(){
// 	this.algo = function(){
		
// 	}
// }

// function N(){
// 	M.call(this);
// 	this.otracosa = function(){
		
// 	}
// }

// var cosa = new M();
// var cosa = M.call({});



// //Prototypal
// function M(){
// 	this.a = 25;
// };
// M.prototype.algo = function(){
	
// }

// function N(){
// 	M.call(this);
// }
// N.prototype =  new M();
// N.prototype.otracosa = function(){
	
// }

// Object.create = function(cosa) {
// 	var result = {};
// 	result.__proto__ = cosa;
// 	return result;
// };