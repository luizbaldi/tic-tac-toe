$(document).ready(function() {
	var gameGrid = $('#game-grid');
	var turnFlag = true;
	var totalTurns = 0;
	var player1 = $("#player1");
	var player2 = $("#player2");


	$('#start').click(function() {
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
		player1.css('visibility', 'initial');
		player2.css('visibility', 'initial');

		/* Set class for start player */
		player1.addClass("player-turn");
	});

	$('#restart').click(function() {
		gameGrid.html('');
		player1.removeClass('player-turn');
		player2.removeClass('player-turn');
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
		} else {
			alert('Selecione um espaço não preenchido');
		}

		//toDo: implement a method to check if there's a winner
		if (totalTurns == 9) {			
			alert('Fim do Jogo');
			gameGrid.html('');
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

	var checkWinner = function(gameGrid) {
		if(totalTurns > 4) {
			/* Does inverse procces checking every position from grid */
			gameGrid.find('tr').each(function(idx, row) {
				$(row).find('td').each(function(idx, col) {
					
				});
			});
		}
	};
});