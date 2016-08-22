$(document).ready(function() {
	var gameGrid = $('#game-grid');
	var playerTurnFlag = true;
	var totalClicks = 0;

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
	});

	$('#stop').click(function() {
		gameGrid.html('');
	});

	$('#game-grid').click(function(click) {
		let squareClicked = $(click.toElement);

		if (playerTurnFlag) {
			pointSquare(squareClicked, 'url(img/x.png)');
		} else {
			pointSquare(squareClicked, 'url(img/o.png)');
		}

		//toDo: implement a method to check if there's a winner
		if (totalClicks == 9) {			
			alert('Fim do Jogo');
			gameGrid.html('');
		}
	});

	var pointSquare = function(squareClicked, imgUrlTurn) {
		if (!squareClicked.attr('clicked')) {
			squareClicked.css('background', imgUrlTurn);
			squareClicked.css('opacity', '1');
			squareClicked.attr('clicked', 'true');
			totalClicks += 1;
			playerTurnFlag = !playerTurnFlag;
		} else {
			alert('Selecione um espaço não preenchido');
		}
	};	
});