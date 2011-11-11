var canvasToolkit = {
	ctx: null,
	x: 0,
	y: 0,
	width: 400,
	height: 300,
	color: "#FAF7F8",
	circle: function(x,y,r,c) {
		this.ctx.fillStyle = c;
		this.ctx.beginPath();
		this.ctx.arc(x, y, r, 0, Math.PI*2, true);
		this.ctx.fill();
	},
	line: function(x,y,dx,dy,speed){
		this.ctx.beginPath();
		this.ctx.moveTo(x,y);
		this.ctx.lineTo(x+(dx*speed),y-(dy*speed));
		this.ctx.stroke();
	},
	rebuild: function(){
		this.ctx = document.getElementById("canvas").getContext("2d");
		var self = this;
		var rect = function() {
			self.ctx.fillStyle = self.color;
			self.ctx.beginPath();
			self.ctx.rect(self.x, self.y, self.width, self.height);
			self.ctx.closePath();
			self.ctx.fill();
		};

		return (function(){
			self.clear();
			rect();
		})();
	},
	clear : function(){
		this.ctx.clearRect(this.x,this. y, this.width, this.height);
	}
};