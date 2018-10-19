// Метод проверяет доступность ресурса.
// Инициируем HEAD-запрос чтобы проверить доступность ресурса
// без фактической загрузки его тела. Третий параметр установлен
// как false что означает что запрос инициируется асинхронно.
// Это важно потому что нужно дождаться ответа.
function checkImage(fn) {
	var h = new XMLHttpRequest();
	h.open("HEAD", fn, false);
	h.send();
	return h.status != 404;
}

// Метод на вход принимает массив [n] x [m]. В массиве n задаёт строки
// таблицы. Номер m задаёт знаения столбцов таблицы. Массив rows
// имеет размер m и состоит из целоцисленных значений. Будут сконструированы
// только те столбцы таблицы для которых элемент rows не равен нулю.
// Параметр id задаёт идентификатор таблицы чтобы потом было возможно
// к ней легко обратиться.
function constructHtmlTable(dt, rows, id) {
	var tb = "";
	tb += "<table id=\"" + id + "\" border=\"1\">";

	tb += "<thead><tr>";
	if(rows[0] != 0) {
		tb += "<th>" + dt.data[0][0] + "</th>";
	}
	if(rows[2] != 0) {
		tb += "<th>" + dt.data[0][2] + "</th>";
	}
	if(rows[1] != 0) {
		tb += "<th>" + dt.data[0][1] + "</th>";
	}
	if(rows[3] != 0) {
		tb += "<th>" + dt.data[0][3] + "</th>";
	}
	if(rows[4] != 0) {
		tb += "<th>" + dt.data[0][4] + "</th>";
	}
	tb += "</tr></thead>";

	tb += "<tbody>";
	for(var i = 1; i < dt.data.length; ++i) {
		tb += "<tr>";
		if(rows[0] != 0) {
			tb += "<th>" + dt.data[i][0] + "</th>"; // исполнитель
		}
		if(rows[2] != 0) {
			tb += "<th>" + dt.data[i][2] + "</th>"; // альбом
		}
		if(rows[1] != 0) {
			tb += "<th>" + dt.data[i][1] + "</th>"; // жанр
		}
		if(rows[3] != 0) {
			tb += "<th>" + dt.data[i][3] + "</th>"; // год
		}
		if(rows[4] != 0) {
			var fn = "covers/" + dt.data[i][4];
			// Проверяем доступность ресурса. Если недоступен,
			// то заменяем обложку на рисунок по-умолчанию.
			if(checkImage(fn) == false) {
				fn = "covers/default.jpg";
			}
			tb += "<th>" + "<img src=\"" + fn + "\" />" + "</th>"; // обложка
		}
		tb += "</tr>";
	}
	tb += "</tbody>";
	
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
	var rows = [1, 0, 0, 0, 0, 0];
	{
		var b = $("#rows_to_show").serializeArray();
		b.forEach(function(field, i) {
			rows[field.name] = 1;
		});
	}
	
	var table_id = "my_table";
	
	// Здесь стоит вызвать метод destroy чтобы предотвратить утечку
	// памяти так как таблицу мы замещаем новой. Флаг true означает
	// что также стоит удалить первоначальную HTML версию таблицы.
	var tb_dom = $("#" + table_id);
	console.log(tb_dom);
	$(tb_dom).DataTable().destroy(true);
	
	// Создаём HTML код таблицы и помещаем его на место div'а.
	var tb_html = constructHtmlTable(dt, rows, table_id);
	$("#table_place").html(tb_html);
	
	if(rows[5] != 0) {
		$("#" + table_id).DataTable();
	}
}

$(document).ready(function() {
	$("#update_but").click(function () {
		$.get("database.csv", g);
	});
});
