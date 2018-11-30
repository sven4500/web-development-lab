// Запрашиваем модуль для работы с протоколом HTTP.
var http = require("http");

// Устанавливаем обработчик HTTP запроса по 
var srv = http.createServer(onRequire);
srv.listen(8000);

var dim = {"width": 640,
	"height": 480};

var pos = {"x": dim.width / 2,
	"y": dim.height / 2};

var nor = {"x": Math.random(),
	"y": Math.random()};
	
var speed = 10;

function onRequire(req, res) {
	// Возвращаем код 200 и сообщаем что ресурс найден.
	res.writeHead(200, {"Content-Type": "text/plain"});
	res.write(pos);
	res.end();
}

function onFrame() {
	pos.x += nor.x * speed;
	pos.y += nor.y * speed;
	if(pos.x < 0 || pos.x > dim.width)
		nor.x *= -1;
	if(pos.y < 0 || pos.y > dim.height)
		nor.y *= -1;
}

setInterval(onFrame, 100);
