var gameStarted = 0;
var cv;
var ctx;
var fps = 25;
var screenWidth = 640;
var screenHeight = 480;
var tileSize = 60;
var margin = 15;

var pieces = [
	{x:0, y:1, type:"pawn", color:"white"},
	{x:1, y:1, type:"pawn", color:"white"},
	{x:2, y:1, type:"pawn", color:"white"},
	{x:3, y:1, type:"pawn", color:"white"},
	{x:4, y:1, type:"pawn", color:"white"},
	{x:5, y:1, type:"pawn", color:"white"},
	{x:6, y:1, type:"pawn", color:"white"},
	{x:7, y:1, type:"pawn", color:"white"},
	
	{x:0, y:0, type:"rook", color:"white"},
	{x:7, y:0, type:"rook", color:"white"},
	
	{x:1, y:0, type:"knight", color:"white"},
	{x:6, y:0, type:"knight", color:"white"},
	
	{x:2, y:0, type:"bishop", color:"white"},
	{x:5, y:0, type:"bishop", color:"white"},
	
	{x:3, y:0, type:"king", color:"white"},
	{x:4, y:0, type:"queen", color:"white"},
	
	{x:0, y:6, type:"pawn", color:"black"},
	{x:1, y:6, type:"pawn", color:"black"},
	{x:2, y:6, type:"pawn", color:"black"},
	{x:3, y:6, type:"pawn", color:"black"},
	{x:4, y:6, type:"pawn", color:"black"},
	{x:5, y:6, type:"pawn", color:"black"},
	{x:6, y:6, type:"pawn", color:"black"},
	{x:7, y:6, type:"pawn", color:"black"},
	
	{x:0, y:7, type:"rook", color:"black"},
	{x:7, y:7, type:"rook", color:"black"},
	
	{x:1, y:7, type:"knight", color:"black"},
	{x:6, y:7, type:"knight", color:"black"},
	
	{x:2, y:7, type:"bishop", color:"black"},
	{x:5, y:7, type:"bishop", color:"black"},
	
	{x:3, y:7, type:"king", color:"black"},
	{x:4, y:7, type:"queen", color:"black"}
];

// В этой функции производим расстановку фигур.
function startGame() {
	// Получаем контекст и храним его глобально.
	cv = document.getElementById("canvas-example");
	cv.width = 2 * margin + 8 * tileSize;
	cv.height = 2 * margin + 8 * tileSize;
	ctx = cv.getContext("2d");
	//console.log("Game started");
}

function drawPawn() {
	ctx.fillRect(0.05, 0.87, 0.9, 0.13);
	
	ctx.beginPath();
	ctx.arc(0.5, 0.87, 0.33, 0.0, 3.14, true);
	ctx.fill();
	ctx.closePath();
	
	ctx.arc(0.5, 0.45, 0.2, 0.0, 6.28, false);
	ctx.fill();
	ctx.closePath();
	
	ctx.arc(0.5, 0.15, 0.1, 0.0, 6.28, false);
	ctx.fill();
	ctx.closePath();
}

function drawQueen() {
	ctx.beginPath();
	ctx.moveTo(0.20, 1.00);
	ctx.lineTo(0.20, 0.84);
	ctx.lineTo(0.45, 0.60);
	ctx.lineTo(0.24, 0.79);
	ctx.lineTo(0.16, 0.34);
	ctx.lineTo(0.37, 0.63);
	ctx.lineTo(0.36, 0.18);
	ctx.lineTo(0.55, 0.55);
	ctx.lineTo(0.71, 0.16);
	ctx.lineTo(0.71, 0.63);
	ctx.lineTo(0.92, 0.32);
	ctx.lineTo(0.84, 0.76);
	ctx.lineTo(0.92, 0.84);
	ctx.lineTo(0.89, 1.0);
	ctx.fill();
	ctx.closePath();
	
	ctx.arc(0.15, 0.35, 0.1, 0.0, 6.28, false);
	ctx.fill();
	ctx.closePath();
	
	ctx.arc(0.34, 0.18, 0.1, 0.0, 6.28, false);
	ctx.fill();
	ctx.closePath();
	
	ctx.arc(0.71, 0.18, 0.1, 0.0, 6.28, false);
	ctx.fill();
	ctx.closePath();
	
	ctx.arc(0.92, 0.31, 0.1, 0.0, 6.28, false);
	ctx.fill();
	ctx.closePath();
}

function drawRook() {
	ctx.beginPath();
	ctx.moveTo(0.13, 1.00);
	ctx.lineTo(0.10, 0.89);
	ctx.lineTo(0.21, 0.76);
	ctx.lineTo(0.29, 0.37);
	ctx.lineTo(0.24, 0.26);
	ctx.lineTo(0.18, 0.18);
	ctx.lineTo(0.18, 0.03);
	ctx.lineTo(0.32, 0.00);
	ctx.lineTo(0.32, 0.13);
	ctx.lineTo(0.42, 0.13);
	ctx.lineTo(0.42, 0.03);
	ctx.lineTo(0.55, 0.03);
	ctx.lineTo(0.55, 0.13);
	ctx.lineTo(0.66, 0.13);
	ctx.lineTo(0.68, 0.03);
	ctx.lineTo(0.79, 0.03);
	ctx.lineTo(0.82, 0.21);
	ctx.lineTo(0.71, 0.34);
	ctx.lineTo(0.74, 0.71);
	ctx.lineTo(0.76, 0.82);
	ctx.lineTo(0.82, 0.89);
	ctx.lineTo(0.84, 1.00);
	ctx.fill();
	ctx.closePath();
}

function drawKing() {
	ctx.beginPath();
	ctx.moveTo(0.15, 1.00);
	ctx.lineTo(0.15, 0.80);
	ctx.lineTo(0.20, 0.75);
	ctx.lineTo(0.18, 0.60);
	ctx.lineTo(0.08, 0.45);
	ctx.lineTo(0.08, 0.25);
	ctx.lineTo(0.13, 0.18);
	ctx.lineTo(0.25, 0.13);
	ctx.lineTo(0.35, 0.18);
	ctx.lineTo(0.50, 0.33);
	ctx.lineTo(0.55, 0.20);
	ctx.lineTo(0.68, 0.15);
	ctx.lineTo(0.83, 0.20);
	ctx.lineTo(0.85, 0.28);
	ctx.lineTo(0.90, 0.38);
	ctx.lineTo(0.80, 0.55);
	ctx.lineTo(0.75, 0.68);
	ctx.lineTo(0.75, 0.75);
	ctx.lineTo(0.83, 0.83);
	ctx.lineTo(0.83, 1.00);
	ctx.fill();
	ctx.closePath();
	
	ctx.arc(0.46, 0.13, 0.10, 0.0, 6.28, false);
	ctx.fill();
	ctx.closePath();
}

function drawKnight() {
	// Фигура слишком сложная поэтому я просто взял
	// с растрового изображения характерные точки.
	ctx.beginPath();
	ctx.moveTo(0.15, 1.00);
	ctx.lineTo(0.15, 0.85);
	ctx.lineTo(0.25, 0.83);
	ctx.lineTo(0.26, 0.68);
	ctx.lineTo(0.53, 0.48);
	ctx.lineTo(0.53, 0.38);
	ctx.lineTo(0.35, 0.48);
	ctx.lineTo(0.25, 0.60);
	ctx.lineTo(0.20, 0.55);
	ctx.lineTo(0.13, 0.53);
	ctx.lineTo(0.13, 0.38);
	ctx.lineTo(0.35, 0.15);
	ctx.lineTo(0.35, 0.03);
	ctx.lineTo(0.43, 0.05);
	ctx.lineTo(0.48, 0.00);
	ctx.lineTo(0.53, 0.10);
	ctx.lineTo(0.70, 0.23);
	ctx.lineTo(0.78, 0.35);
	ctx.lineTo(0.80, 0.53);
	ctx.lineTo(0.75, 0.75);
	ctx.lineTo(0.83, 0.85);
	ctx.lineTo(0.83, 1.00);
	ctx.fill();
	ctx.closePath();
}

function drawBishop() {
	ctx.beginPath();
	ctx.moveTo(0.15, 1.00);
	ctx.lineTo(0.23, 0.85);
	ctx.lineTo(0.25, 0.68);
	ctx.lineTo(0.20, 0.55);
	ctx.lineTo(0.18, 0.43);
	ctx.lineTo(0.25, 0.25);
	ctx.lineTo(0.33, 0.15);
	ctx.lineTo(0.30, 0.08);
	ctx.lineTo(0.40, 0.00);
	ctx.lineTo(0.50, 0.05);
	ctx.lineTo(0.48, 0.15);
	ctx.lineTo(0.38, 0.35);
	ctx.lineTo(0.43, 0.43);
	ctx.lineTo(0.50, 0.38);
	ctx.lineTo(0.58, 0.15);
	ctx.lineTo(0.70, 0.25);
	ctx.lineTo(0.75, 0.40);
	ctx.lineTo(0.68, 0.65);
	ctx.lineTo(0.68, 0.80);
	ctx.lineTo(0.78, 0.88);
	ctx.lineTo(0.78, 1.00);
	ctx.fill();
	ctx.closePath();
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
		ctx.save();
		
		// Задаём относительные координаты фигуры и её размеры в пределах клетки.
		ctx.translate(margin + pieces[i].x * tileSize + tileSize * 0.1, margin + pieces[i].y * tileSize + tileSize * 0.1);
		ctx.scale(tileSize * 0.8, tileSize * 0.8);
		
		if(pieces[i].color == "white") {
			ctx.fillStyle = "rgb(160,160,160)";
			//ctx.strokeStyle = "";
		}
		else if(pieces[i].color == "black") {
			ctx.fillStyle = "rgb(15,15,15)";
			//ctx.strokeStyle = "";
		}
		
		switch(pieces[i].type) {
			case "pawn":
				drawPawn();
				break;
			case "rook":
				drawRook();
				break;
			case "bishop":
				drawBishop();
				break;
			case "knight":
				drawKnight();
				break;
			case "queen":
				drawQueen();
				break;
			case "king":
				drawKing();
				break;
			default:
				break;
		}
		ctx.restore();
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
