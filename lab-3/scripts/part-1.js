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
// таблицы. Номер m задаёт знаения столбцов таблицы. Массив cols
// имеет размер m и состоит из целоцисленных значений. Будут сконструированы
// только те столбцы таблицы для которых элемент cols не равен нулю.
// Параметр id задаёт идентификатор таблицы чтобы потом было возможно
// к ней легко обратиться.
function constructHtmlTable(dt, cols, id) {
	var n_rows = dt.data.length;
	var n_columns = dt.data[0].length;
	
	var tb = "";
	tb += "<table id=\"" + id + "\" border=\"1\">";

	tb += "<thead><tr>";
	for(var j = 0; j < n_columns; ++j) {
		if(cols[j] != 0) {
			tb += "<th>" + dt.data[0][j] + "</th>";
		}
	}
	tb += "</tr></thead>";

	tb += "<tbody>";
	for(var i = 1; i < n_rows; ++i) {
		tb += "<tr>";
		for(var j = 0; j < n_columns; ++j) {
			if(cols[j] != 0) {
				if(j == 4) {
					// Здесь устанавливаем специальный обработчик для колонки обложек.
					// Проверяем доступность ресурса. Если недоступен, то заменяем
					// обложку на рисунок по-умолчанию.
					var fn = "covers/" + dt.data[i][j];
					if(checkImage(fn) == false) {
						fn = "covers/default.jpg";
					}
					tb += "<th>" + "<img src=\"" + fn + "\" />" + "</th>"; // обложка
				}
				else {
					tb += "<th>" + dt.data[i][j] + "</th>";
				}
			}
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
	var cols = [1, 0, 0, 0, 0, 0];
	{
		var b = $("#rows_to_show").serializeArray();
		b.forEach(function(field, i) {
			cols[field.name] = 1;
		});
	}
	
	var table_id = "my_table";
	
	// Здесь стоит вызвать метод destroy чтобы предотвратить утечку
	// памяти так как таблицу мы замещаем новой. Флаг true означает
	// что также стоит удалить первоначальную HTML версию таблицы.
	var tb_dom = $("#" + table_id);
	$(tb_dom).DataTable().destroy(true);
	
	// Создаём HTML код таблицы и помещаем его на место div'а.
	var tb_html = constructHtmlTable(dt, cols, table_id);
	$("#table_place").html(tb_html);
	
	if(cols[5] != 0) {
		$("#" + table_id).DataTable();
	}
}

$(document).ready(function() {
	$("#update_but").click(function () {
		$.get("database.csv", g);
	});
});
