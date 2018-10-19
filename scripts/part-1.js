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
	var tb = constructHtmlTable(dt, rows, "my_table");
	$("#table_place").html(tb);
}

$(document).ready(function() {
	$("#update_but").click(function () {
		$.get("database.csv", g);
	});
});
