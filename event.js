var event = function(){
	var listeners = [];

	return {
		listen: function(func,scope,args){
			var id = listeners.length;
			listeners.push({
				func: func,
				scope: scope,
				args: args || []
			});
			return id;
		},

		fire: function(){
			for(var i = listeners.length; i--;){
				if(listeners[i]){
					listeners[i].func.apply(listeners[i].scope, listeners[i].args);
				}
			}
			
		},

		remove: function(id){
			listeners[id] = null;
		}

	};
}