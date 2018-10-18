function constructHtmlTable(dt, rows) {
	console.log(dt);
	console.log(rows);
	
	var tb = "";
	tb += "<table border=\"1\">";
	
	for(var i = 0; i < dt.data.length; ++i) {
		tb += "<tr>";
		
		if(rows[0] != 0) {
			tb += "<th>";
			tb += dt.data[i][0];
			tb += "</th>";
		}
		
		if(rows[1] != 0) {
			tb += "<th>";
			tb += dt.data[i][1];
			tb += "</th>";
		}
		
		if(rows[2] != 0) {
			tb += "<th>";
			tb += dt.data[i][2];
			tb += "</th>";
		}
		
		if(rows[3] != 0) {
			tb += "<th>";
			tb += dt.data[i][3];
			tb += "</th>";
		}
		
		if(rows[4] != 0) {
			tb += "<th>";
			if(dt.data[i][4] != "null" && dt.data[i][4] != "") {
				tb += "<img src=\"covers/";
				tb += dt.data[i][4];
				tb += "\" />";
			}
			tb += "</th>";
		}
		
		tb += "</tr>";
	}
	
	tb += "</table>";
	console.log(tb);
	return tb;
}

function g(data, stat) {
	// Парсим входные данне файла при помощи библиотеки PapaParse.
	// Также параметр "encoding" выставляем как "utf-8" чтобы
	// не сбить русские шрифты.
	var dt = Papa.parse(data/*, {encoding: "utf-8"}*/);
	
	// Преобразовываем массив объектов в массив переключателей.
	var rows = [1, 0, 0, 0, 0];
	{
		var b = $("#rows_to_show").serializeArray();
		//console.log(b);
		b.forEach(function(field, i) {
			rows[field.name] = 1;
		});
		//console.log(rows);
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
