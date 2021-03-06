module.exports = {
	checkWinnerGrid : [],
	hasWinner : false,

	checkChangedGrid : function(gameGrid, totalTurns) {
		if (totalTurns >= 4) {
			this.checkWinnerGrid = [];

			/* Does inverse procces checking every position from grid */
			gameGrid.find('tr').each(function(rowIndex, row) {
				currentRow = rowIndex;
				$(row).find('td').each(function(colIndex, col) {
					/* Checks and creates a new array for the current row before fullfill with player turn*/
					if (!this.checkWinnerGrid[currentRow]) {
						this.checkWinnerGrid[currentRow] = new Array();
					}
					if (!$(col).attr('player')) {
						$(col).attr('player', 'blank');
					}
					this.checkWinnerGrid[currentRow].push($(col).attr('player'));
				}.bind(this));
			}.bind(this));

			this.checkWinner();
		}
	},

	checkWinner : function() {
		var grid = this.checkWinnerGrid;

		for (var row = 0; row < 3; row++) {
			if (!this.hasWinner) {
				if (this.checkRow(grid[row], grid[row][0])) {
					this.checkColumn(row, grid[0][row], grid);
				}
			}
		}

		if(!this.hasWinner) {
			this.checkDiagonals(grid);
		}
	},

	checkRow : function(row, firstSquare) {
		for (var col = 0; col < 3; col++) {
			if (row[col] == firstSquare && row[col] != "blank") {
				continue;
			} else {
				return true;
			}
		}

		this.hasWinner = true;
	},

	checkColumn : function(rowCount, firstSquare, grid) {
		for (var col = 0; col < 3; col++) {
			if (grid[col][rowCount] == firstSquare && grid[col][rowCount] != "blank") {
				continue;
			} else {
				return true;
			}
		}

		this.hasWinner = true;
	},

	checkDiagonals : function(grid) {
		var firstSquare;

		for (var diagonalCounter = 0; diagonalCounter < 2; diagonalCounter++) {
			// Define first square to make comparisons
			if(diagonalCounter == 0) {
				firstSquare = grid[0][0];
				if (grid[1][1] == firstSquare && grid[2][2] == firstSquare) {
					this.hasWinner = true;
				}
			} else {
				firstSquare = grid[0][2];
				if (grid[1][1] == firstSquare && grid[2][0] == firstSquare) {
					this.hasWinner = true;
				}
			}
		}
	}
};