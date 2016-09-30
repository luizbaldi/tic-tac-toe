$ = require('jquery');

$(document).ready(function() {
	var controller = require('./modules/gameController');
	
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
		let squareClicked = $(click.toElement);

		if (!squareClicked.attr('clicked')) {
			if (turnFlag) {
				pointSquare(squareClicked, 'url(img/x.png)', 'p1');
				changePlayerTurn(turnFlag);
			} else {
				pointSquare(squareClicked, 'url(img/o.png)', 'p2');
				changePlayerTurn(turnFlag);
			}
			checkWinner(gameGrid);
		}		

		if (totalTurns == 9) {			
			alert('Fim do Jogo');
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

	/* toDo: create a better architecture to separate files using modules */
	var checkWinner = function(gameGrid) {
		if(totalTurns >= 4) {
			/* Does inverse procces checking every position from grid */
			gameGrid.find('tr').each(function(rowIndex, row) {
				$(row).find('td').each(function(colIndex, col) {
					var rowId = $(col.parentElement).attr('id');
					if ($(col).attr('player')) {
						console.log('here');
					}
				});
			});
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
				let colId = 'col'.concat(col.toString());
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

