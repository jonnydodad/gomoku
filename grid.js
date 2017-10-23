

var Cell = function(x,y){
	var me = this;
	me.player = null;
	me.x = x;
	me.y = y;
	
	me.neighbors = null;

	return me;
};

var Grid = function(size){
	var me = this;
	var cells = new Array(size*size);

	//fill Grid with empty cells
	for(var i = 0; i < size; i++){
		for(var j = 0; j < size; j++){
			(function(){
				cells[i+j*size] = new Cell(i, j, cells);
			})();	
		}
	}
	// assign neighbors
	cells.forEach(function(cell){
		cell.neighbors = cells.filter(function(cell2){
			var dx = Math.abs(cell2.x - cell.x);
			var dy = Math.abs(cell2.y - cell.y);
			return (dx === 1 && dy === 1 ) || (dx === 1 && dy === 0) || (dx === 0 && dy === 1);
		});
	});
	
	// recursive neighbor checking - returns true if count is greater than 4
	me.checkLine = function(cell, neig, count){
		 if (count>4)
		 	return true;
		 // if neighbor of neig is an edge cell then check count and if (neig.player === cell.player) return true
		 else if ( neig.x+(neig.x - cell.x) <0 || neig.y+(neig.y - cell.y) <0 || 
		 	   neig.x+(neig.x - cell.x) >=size || neig.y+(neig.y - cell.y) >=size){
		 	if ( count === 4 && (neig.player === cell.player))
		 		return true;
		 	else 
		 		return false;
		 }
		 else if (neig.player === cell.player)
		 	return me.checkLine(neig, cells[(neig.x+(neig.x - cell.x))+
		 									(neig.y+(neig.y - cell.y))*size], count+1);
		 else
		 	return false;
	 	}

	
	 me.checkWinner = function(){
	 	var win = null;
	 	var potentials = cells.filter(function(cell){
				return cell.player === 'red' || cell.player === 'blue';
		});
		potentials.forEach(function(cell){
			cell.neighbors.forEach(function(neig){
				if(neig.player === cell.player){
					if(me.checkLine(cell, neig, 1))
						win = true;
				}
			})
		}) 
        return win;
	 }


	me.filter = function(fcn){
		return cells.filter(fcn);
	};

	me.getCell = function(x,y){
		return cells[x+y*size];
	};
	me.getCells = function(){
		return cells;
	};
	return me;
}
