var gameStarted = 0;
var cv;
var ctx;
var fps = 25;
var screenWidth = 640;
var screenHeight = 480;
var tileSize = 48;
var margin = 20;
var pieces = [];

// В этой функции производим расстановку фигур.
function startGame() {
	// Получаем контекст и храним его глобально.
	cv = document.getElementById("canvas-example");
	cv.width = screenWidth;
	cv.height = screenHeight;
	ctx = cv.getContext("2d");

	// Создаём пешки.
	for(var i = 0; i < 8; ++i) {
		pieces[i] = {};
		pieces[i].x = i;
		pieces[i].y = 1;
		pieces[i].type = "pawn";
		pieces[i].color = "white";

		pieces[8+i] = {};
		pieces[8+i].x = i;
		pieces[8+i].y = 6;
		pieces[8+i].type = "pawn";
		pieces[8+i].color = "black";
	}
	
	console.log("Game started");
}

function drawBoard() {
	// Рисуем небольшую рамку.
	ctx.strokeStyle = "rgb(136,0,21)";
	ctx.strokeRect(margin - 1, margin - 1, 8 * tileSize + 2, 8 * tileSize + 2);
	
	// Задаём цвет закрашенной клетки (чёрной) и рисуем один большой квадрат.
	// Цвет белой клетки будем добиватся вызывая функцию clearRect.
	ctx.fillStyle = '#AF5200';
	ctx.fillRect(margin, margin, tileSize * 8, tileSize * 8);
	
	// Рисуем белые клетки.
	for (i = 0; i < 8; i += 2) {
		for (j = 0; j < 8; j += 2) {
			ctx.clearRect(margin + i * tileSize, margin + j * tileSize, tileSize, tileSize);
			ctx.clearRect(margin + (i + 1) * tileSize, margin + (j + 1) * tileSize, tileSize, tileSize);
		}
	}
}

//
function drawPieces() {
	//console.log(pieces.length);
	for(var i = 0; i < pieces.length; ++i) {
		//console.log(pieces[i]);
		switch(pieces[i].type) {
			case "pawn":
				//drawPawn(pieces[i]);
				break;
			case "rook":
				//drawRook(pieces[i]);
				break;
			case "bishop":
				//drawBishop(pieces[i]);
				break;
			case "knight":
				//drawKnight(pieces[i]);
				break;
			case "queen":
				//drawQueen(pieces[i]);
				break;
			case "king":
				//drawKing(pieces[i]);
				break;
			default:
				break;
		}
	}
	//console.log("Frame");
}

// Задаём интервал отрисовки кадра - 100мс.
setInterval(function() {
	if(gameStarted == 0) {
		startGame();
		gameStarted = 1;
		//message.log();
	}
	drawBoard();
	drawPieces();
}, 1000 / fps);
