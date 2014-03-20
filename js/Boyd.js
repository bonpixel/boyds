var Boyd = (function(){
	'use strict';

	var Boyd = function(Game){
		this.x_pos = 25;
		this.y_pos = 25;
		this.vector = null;
		this.speed = null;
		this.color = null;
		this.addX = true;
		this.addY = true;
		this.ctx = Game.ctx;
		this.Game = Game;
	};



	/**
	 * returns a color for the Boyd
	 * @return {[string]} a string representing the color value
	 */
	Boyd.prototype.getColor = function getColor(){
		var max = 2,
			min = 0,
			num = Math.floor(Math.random() + (max * min)) + min,
			colors = ['red', 'orange', 'yellow'];

		return colors[num];
	};



	Boyd.prototype.getDirection = function getDirection(){

	};

	/**
	 * for each tick, draw the Boyd one pixel in the direction it needs to head
	 * @return {[type]} [description]
	 */
	Boyd.prototype.draw = function draw(x_pos, y_pos){
		// this.direction;


		this.ctx.strokeStyle = "#000000";
		this.ctx.fillStyle = "#FFFF00";
		this.ctx.beginPath();
		this.ctx.arc(x_pos,y_pos,25,0,Math.PI*2,true);
		this.ctx.closePath();
		this.ctx.stroke();
		this.ctx.fill();

	};


	Boyd.prototype.updatePosition = function updatePosition(){


		if(this.Game.mousePos.x !== null){
			if (this.x_pos > this.Game.mousePos.x) { --this.x_pos; }
			if (this.x_pos === this.Game.mousePos.x) {  }
			if (this.x_pos < this.Game.mousePos.x) { ++this.x_pos; }

			if (this.y_pos > this.Game.mousePos.y) { --this.y_pos; }
			if (this.y_pos === this.Game.mousePos.y) {  }
			if (this.y_pos < this.Game.mousePos.y) { ++this.y_pos; }
		} else {
			if (this.addX) {
				++this.x_pos;
				if(this.x_pos > this.ctx.canvas.width) this.addX = false;
			} else {
				--this.x_pos;
				if(this.x_pos < 0) this.addX = true;
			}

			if (this.addY) {
				++this.y_pos;
				if(this.y_pos > this.ctx.canvas.height) this.addY = false;
			} else {
				--this.y_pos;
				if(this.y_pos < 0) this.addY = true;
			}
		}

		this.draw(this.x_pos, this.y_pos);
	};

	return Boyd;

	// game.start();

})();
