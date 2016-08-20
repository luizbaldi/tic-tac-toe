$(document).ready(function() {
	var gameGrid = $('#game-grid');
	var playerTurnFlag = true;

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
			squareClicked.css('background', 'url(img/x.png)');
		} else {
			squareClicked.css('background', 'url(img/o.png)');
		}
		playerTurnFlag = !playerTurnFlag;
	});
});