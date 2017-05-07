(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
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
},{}],2:[function(require,module,exports){
$(document).ready(function() {
	var gameController = require('./modules/gameController');
	
	var gameGrid = $('#game-grid');
	var gameGridObj = [];
	var turnFlag = true;
	var totalTurns = 0;
	var hasStartedFlag = false;
	var playerPanel = $("#player-panel");
	var player1 = $("#player1");
	var player2 = $("#player2");

	$('#start').click(function() {
		if (!hasStartedFlag) {
			startGame();
			hasStartedFlag = true;
		} 
	});

	$('#restart').click(function() {
		resetGame();
		startGame();
	});

	$('#game-grid').click(function(click) {
		var squareClicked = $(click.toElement);
		var hasWinner = false;

		if (!squareClicked.attr('clicked')) {
			if (turnFlag) {
				pointSquare(squareClicked, 'url(img/x.png)', 'p1');

				changePlayerTurn(turnFlag);
			} else {
				pointSquare(squareClicked, 'url(img/o.png)', 'p2');
				changePlayerTurn(turnFlag);
			}

			gameController.checkChangedGrid(gameGrid, totalTurns);
		}		

		if (gameController.hasWinner) {
			if (!turnFlag) {
				swal("Player one is the winner!");
			} else {
				swal("Player two is the winner!");
			}
			gameController.hasWinner = false;
			resetGame();
			startGame();
		} else if (totalTurns == 9) {			
			swal("Fim do jogo");
			resetGame();
			startGame();
		}
		
	});

	$('#game-grid').mouseover(function(mouseOver) {
		var squareOver = $(mouseOver.toElement);
		if (!squareOver.attr('clicked')) {
			if (turnFlag) {
				handleHoverSquare(squareOver, 'url(img/x.png)');
			} else {
				handleHoverSquare(squareOver, 'url(img/o.png)');
			}
		}
	});

	var pointSquare = function(squareClicked, imgUrlTurn, playerTurn) {
		squareClicked.css('background', imgUrlTurn);
		squareClicked.css('opacity', '1');
		squareClicked.attr('clicked', 'true');
		squareClicked.attr('player', playerTurn);
		totalTurns += 1;
		turnFlag = !turnFlag;
	};

	var changePlayerTurn = function(turnFlag) {
		if(turnFlag) {
			player2.removeClass("player-turn");
			player1.addClass("player-turn");
		} else {
			player1.removeClass("player-turn");
			player2.addClass("player-turn");
		}
	};

	var resetGame = function() {
		/* Reset game grid content */
		gameGrid.html('');

		/* Reset classes for player turn */
		player1.removeClass('player-turn');
		player2.removeClass('player-turn');

		/* Reset players visiblity */
		playerPanel.addClass('hidden');

		/* Reset turns counter */
		totalTurns = 0;
		turnFlag = true;
	};

	var startGame = function() {
		for (row = 0; row < 3; row++) {
			let rowId = 'row'.concat(row.toString());
			let newRow = $('<tr>');
			let newRowId = newRow.attr('id', rowId);
			
			gameGrid.append(newRowId);

			for (col = 0; col < 3; col++) {
				let colId = rowId + 'col'.concat(col.toString());

				let square = $('<td>').addClass('square').attr('id', colId);
				newRowId.append(square);
			}
		}

		/* Change players visibility */
		playerPanel.removeClass('hidden').addClass('show');

		/* Set class for start player */
		player1.addClass("player-turn");
	};

	var handleHoverSquare = function(squareOver, imgUrlTurn) {
		squareOver.css('background', imgUrlTurn);
		squareOver.mouseleave(function(mouseLeave) {
			var squareLeave = $(mouseLeave.currentTarget);
			if (!squareOver.attr('clicked')) {
				squareLeave.removeAttr('style');
			}
		});
	};
});


},{"./modules/gameController":1}]},{},[2]);
