var App = function(targetElementId){
	var me = this;
	// Grab the canvas
	me.canvas = document.getElementById(targetElementId);
	me.ctx = me.canvas.getContext("2d");

	var viewSize = me.canvas.width = me.canvas.height = 1200;
	var squares = 40;
  	var grid = new Grid(squares);
  	var turn = true;
  	var squareSize = me.canvas.width/squares;
  	
	var clickHandle = function(event){
			turn = !turn;
			var x = event.pageX - me.canvas.offsetLeft;
			var y = event.pageY - me.canvas.offsetTop;
			var i = Math.floor(x/squareSize);
			var j = Math.floor(y/squareSize);
			if (turn){
				grid.getCell(i, j).player = 'red';
			}else
				grid.getCell(i, j).player = 'blue';
			me.draw();
			me.gameOver();
	};

	me.canvas.addEventListener('mousedown', function(event){
		clickHandle(event);	
	});

	me.gameOver = function(){
		if (grid.checkWinner()){
			if (turn)
				setTimeout(function(){
				 alert("Game Over- red player wins");
				 window.location.reload();
				  }, 100);
			else
				setTimeout(function(){
				 alert("Game Over- blue player wins");
				 window.location.reload();
				  }, 100);
			}
	}

	me.draw = function(){
		// Erase previous draw
		me.ctx.fillStyle = 'white';
	 	me.ctx.fillRect(0,0,me.canvas.width,me.canvas.height);

	 	// Draw red and blue squares
	 	grid.filter(function(cell){
	 		return cell.player ==='blue' || cell.player ==='red';
	 	}).forEach(function(cell){
	 		if (cell.player === 'blue'){
	 			me.ctx.fillStyle = 'blue';
	 		}else
	 			me.ctx.fillStyle = 'red';

	 		me.ctx.fillRect(cell.x * squareSize, cell.y * squareSize, squareSize, squareSize);
	 	});

	 	// Draw grid
	 	for(var x = 0; x <= viewSize; x+=squareSize){
	 		me.ctx.beginPath();
	 		me.ctx.moveTo(x, 0);
	 		me.ctx.lineTo(x, viewSize);
	 		me.ctx.stroke();
	 	};

	 	for(var y = 0; y <= viewSize; y+= squareSize){
	 		me.ctx.beginPath();
	 		me.ctx.moveTo(0, y);
	 		me.ctx.lineTo(viewSize, y);
	 		me.ctx.stroke();	
	 	};
	};
	
	return me;
};

var app = new App("game");
app.draw();

