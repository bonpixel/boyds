var Game = (function(Boyd){
	Game = function () {
		var _this = this;
		this.lastCalledTime = 0;
		this.fpsMeterEl = document.querySelector('#fpsMeter');
		this.isPaused = false;
		this.mousePos = {
			x:null,
			y:null
		};
		this.NUMOFBOYDS = 1;

		// setup
		this
			.init()
			.tick();
	};


	/**
	 * Initializes the game
	 * @return {obj} this returns self for chaining
	 */
	Game.prototype.init = function init() {
		this
			.initCanvas()
			.initBoyds()
			.bindEvents();

		// this.populateBoyds();
		return this;
	};



	Game.prototype.initCanvas = function initCanvas() {
		this.canvas = document.querySelector('#myCanvas');
		this.ctx = this.canvas.getContext('2d');
		this.x_size = this.canvas.width;
		this.y_size = this.canvas.height;

		return this;
	};

	Game.prototype.clear = function (preserveTransform) {
		var ctx = this.ctx;
		if (preserveTransform) {
			ctx.save();
			ctx.setTransform(1, 0, 0, 1, 0, 0);
		}

		ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);

		if (preserveTransform) {
			ctx.restore();
		}

		return this;
	};



	Game.prototype.initBoyds = function initBoyds() {
		this.boyds = [];
		for (var i = this.NUMOFBOYDS - 1; i >= 0; i--) {
			this.boyds.push(new Boyd(this));
		}
		return this;
	};



	Game.prototype.updateBoyds = function updateBoyds() {
		for (var i = this.boyds.length - 1; i >= 0; i--) {
			this.boyds[i].updatePosition();
		}
		return this;
	};



	Game.prototype.bindEvents = function bindEvents() {
		document.addEventListener('keypress', function(e){
			this.checkInput(e);
		}.bind(this), false);

		this.ctx.canvas.addEventListener('mousemove', function(e) {
			this.mousePos = this.getMousePos(e);
		}.bind(this), false);

		this.ctx.canvas.addEventListener('mouseout', function(e) {
			this.mousePos = {x:null, y:null};
		}.bind(this), false);

		return this;
	};



	Game.prototype.getMousePos = function getMousePos(evt) {
		var rect = this.ctx.canvas.getBoundingClientRect();
		return {
			x: evt.clientX - rect.left,
			y: evt.clientY - rect.top
		};
	};




	Game.prototype.writeMessage =  function writeMessage(message) {
		var ctx = this.ctx;
		// ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
		ctx.font = '10pt Calibri';
		ctx.fillStyle = 'black';
		ctx.fillText(message, 10, 25);
	};



	Game.prototype.checkInput = function checkInput(ev) {
		var key = this.getKey(ev);
		// console.log(key);
		if (key === 32 && !this.isPaused){
			this.isPaused = true;
		} else if (key === 32 && this.isPaused){
			this.isPaused = false;
			this.tick();
		}
	};


	/**
	 * Main Game loop
	 * @param  {[float]} time a milisecond time when the requestAnimationFrame was called.
	 * @return {obj} this returns self for chaining
	 */
	Game.prototype.tick = function tick(time) {
		this
			.setFps(time)
			.clear()
			.updateBoyds()
			.writeMousePos();

		// if we are not paused, continue
		if(!this.isPaused){
			requestAnimationFrame(function(t){
				this.tick(t);
			}.bind(this));
		}

		return this;
	};


	/**
	 * writes the current fps to the DOM every 500ms
	 * @param {float} time a milisecond time when the requestAnimationFrame was called.
	 * @return {obj} this returns self for chaining
	 */
	Game.prototype.setFps = function(time) {
		var delta = (time - this.lastCalledTime)/1000,
			fps = Math.floor(1/delta),
			_this = this;

		this.lastCalledTime = time;

		// only update the fps every 500ms
		if(!this.fpsTimeout){
			this.fpsTimeout = setTimeout(function (){
				_this.fpsMeterEl.innerText = fps;
				_this.fpsTimeout = void 0;
			}, 500);
		}

		return this;
	};

	Game.prototype.writeMousePos = function writeMousePos() {
		var message = 'x:' + this.mousePos.x + ' | y: ' + this.mousePos.y;
		this.writeMessage(message);
		return this;
	};



	Game.prototype.getKey = function getKey(event) {
		if (event.which === null) {
			return event.keyCode; // IE
		} else if (event.which !== 0 && event.charCode !== 0) {
			return event.which; // the rest
		} else {
			return null; // special key
		}
	};


	return new Game();

})(Boyd);
