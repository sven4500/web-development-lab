// Запрашиваем модуль для работы с протоколом HTTP.
var http = require("http");
var url = require("url");

var dim = {"width": 640, "height": 480};
var pos = {"x": dim.width / 2, "y": dim.height / 2};
var nor = {"x": Math.random(), "y": Math.random()};
var speed = 10;

// Устанавливаем обработчик HTTP запроса на порт 8000.
var server = http.createServer(onRequire);
server.listen(8000);

function onRequire(req, res) {
	var path = url.parse(req.url).pathname;
	if(path == "/data" && req.method == "GET") {
		// Просто обязательно необходимо выставить заголовок Access-Control-Allow-Origin
		// чтобы мы могли успешно выполнить кросдоменный запрос.
		res.writeHead(200, {"Content-Type": "text/plain"});
		res.writeHead(200, {"Access-Control-Allow-Origin": "*"});
		res.write(String(pos.x) + "," + String(pos.y));
		res.end();
	}
}

function onFrame() {
	// Каждый кадр добавляем к компоненте значения по нормали
	// (строго говоря это конечно же не нормаль так как она не
	// нормализована, однако для учебных целей думаю сойдёт).
	// Если точка выбегает за кадр то оборачиваем компоненту.
	pos.x += nor.x * speed;
	pos.y += nor.y * speed;
	if(pos.x < 0 || pos.x > dim.width) {
		pos.x = Math.min(Math.max(pos.x, 0), dim.width);
		nor.x *= -1;
	}
	if(pos.y < 0 || pos.y > dim.height) {
		pos.y = Math.min(Math.max(pos.y, 0), dim.height);
		nor.y *= -1;
	}
}

setInterval(onFrame, 100);
