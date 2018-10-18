function checkImage(fn) {
	// Метод проверяет доступность ресурса.
	// Инициируем HEAD-запрос чтобы проверить доступность ресурса
	// без фактической загрузки его тела. Третий параметр установлен
	// как false что означает что запрос инициируется асинхронно.
	// Это важно потому что нужно дождаться ответа.
	var h = new XMLHttpRequest();
	h.open("HEAD", fn, false);
	h.send();
	return h.status != 404;
}

function constructHtmlTable(dt, rows) {
	var tb = "";
	tb += "<table border=\"1\">";
	
	for(var i = 0; i < dt.data.length; ++i) {
		tb += "<tr>";
		
		// исполнитель
		if(rows[0] != 0) {
			tb += "<th>" + dt.data[i][0] + "</th>";
		}
		
		// альбом
		if(rows[2] != 0) {
			tb += "<th>" + dt.data[i][2] + "</th>";
		}
		
		// жанр
		if(rows[1] != 0) {
			tb += "<th>" + dt.data[i][1] + "</th>";
		}
		
		// год
		if(rows[3] != 0) {
			tb += "<th>" + dt.data[i][3] + "</th>";
		}
		
		// обложка
		if(rows[4] != 0) {
			var fn = "covers/" + dt.data[i][4];
			
			// Проверяем доступность ресурса. Если недоступен,
			// то заменяем обложку на рисунок по-умолчанию.
			if(checkImage(fn) == false) {
				fn = "covers/default.jpg";
			}
			
			tb += "<th>" + "<img src=\"" + fn + "\" />" + "</th>";
		}
		
		tb += "</tr>";
	}
	
	tb += "</table>";
	return tb;
}

function g(data, stat) {
	// Парсим входные данне файла при помощи библиотеки PapaParse.
	// Также параметр "encoding" выставляем как "utf-8" чтобы
	// не сбить русские шрифты.
	var dt = Papa.parse(data, {encoding: "utf-8"});
	
	// Преобразовываем массив объектов в массив переключателей.
	// Если в массиве присутствует объект это значет что переключатель
	// включен. Поэтому все присутствующие оюекты это включеные переключатели.
	var rows = [1, 0, 0, 0, 0];
	{
		var b = $("#rows_to_show").serializeArray();
		b.forEach(function(field, i) {
			rows[field.name] = 1;
		});
	}
	
	// Создаём HTML код таблицы и помещаем его на место div'а.
	var tb = constructHtmlTable(dt, rows);
	$("#table_place").html(tb);
}

function update_request() {
	$.get("database.csv", g);
}

$(document).ready(function() {
	$("#update_but").click(update_request);
});
