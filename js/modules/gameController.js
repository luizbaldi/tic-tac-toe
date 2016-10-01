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
				this.checkRow(grid[row], grid[row][0]);
			}
		}
	},

	checkRow : function(row, firstSquare) {
		for (var col = 0; col < 3; col++) {
			if (row[col] == firstSquare && row[col] != "blank") {
				continue;
			} else {
				return false;
			}
		}

		this.hasWinner = true;
	}
};