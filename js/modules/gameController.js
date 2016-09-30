module.exports = function gameController() {
	this.checkWinnerGrid = [];

	this.pointSquare = function(squareCoordinates) {
		console.log(squareCoordinates);
	};

	this.resetGrid = function() {
		for (var row = 0; row < 3; row++) {
			for (var col = 0; col < 0; col++) {
				checkWinner[row] = 'col' + col.toString();
			}
		}
	};

	this.showSimpleAlertMessage = function(message) {
		alert(message);
	};
};