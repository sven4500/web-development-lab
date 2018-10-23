// Просто шлобальный идентификатор HTML версии таблицы.
// Прочто чтобы мы не запутались.
var html_table_id = "table_example";

// Метод создаёт строку HTML таблиы произвольного размера.
function makeHtmlTable(n_rows, n_cols, id) {
	var tb = "";
	tb += "<table id=\"" + id + "\" border=\"1\">";
	if(n_rows > 0 && n_cols > 0) {
		tb += "<thead><tr>";
		for(var j = 0; j < n_cols; ++j) {
			tb += "<th>" + "HeadItem_" + (j + 1) + "</th>";
		}
		tb += "</tr></thead>";
		tb += "<tbody>";
		for(var i = 1; i < n_rows; ++i) {
			tb += "<tr>";
			for(var j = 0; j < n_cols; ++j) {
				tb += "<th>" + "Item_" + (j + 1) + "_" + (i + 0) + "</th>";
			}
			tb += "</tr>";
		}
		tb += "</tbody>";
	}
	tb += "</table>";
	return tb;
}

function makeJsTable(n_rows, n_cols, id) {
	var tb = "";
	tb += "var dataSet = [\n" +
		"  [\"Item_1_1\", \"Item_1_2\"],\n" +
		"  [\"Item_2_1\", \"Item_2_2\"]\n" +
		"];";
	return tb;
}

function makeJsonTable(n_rows, n_cols, id) {
	return "./example.json";
}

// Метод вохвразает тип входных данных на основании которых будет сконструирована таблица DataTable.
function getDataSource() {
	return $("input:radio[name='data_source']:checked").val();
}

function prepData() {
	var tx = "";
	switch(getDataSource()) {
		case "html2dt":
			tx = makeHtmlTable(7, 5, html_table_id);
			break;
		case "js2dt":
			tx = makeJsTable(7, 5, html_table_id);
			break;
		case "json2dt":
			tx = makeJsonTable(0, 0, html_table_id);
			break;
		default:
			break;
	}
	$("#src_text").val(tx);
}

function createDataTable() {
	$("#" + html_table_id).DataTable().destroy(true);
	var tb_tx = $("#src_text").val();
	var par = composeParam();
	switch(getDataSource()) {
		case "html2dt":
			$("#table_placeholder").html(tb_tx);
			$("#" + html_table_id).DataTable();
			break;
		case "js2dt":
			var func = new Function(tb_tx + "return dataSet;");
			var dt = func();
			var tb = makeHtmlTable(0, 0, html_table_id);
			$("#table_placeholder").html(tb);
			$("#" + html_table_id).DataTable({data: dt, columns: dt});
			break;
		case "json2dt":
			var tb = makeHtmlTable(1, 2, html_table_id);
			$("#table_placeholder").html(tb);
			par["ajax"] = tb_tx;
			$("#table_example").DataTable(par);
			break;
		default:
			console.log("");
			break;
	}
}

$(document).ready(function() {
	$("#html_to_dt_radio").click(prepData);
	$("#js_to_dt_radio").click(prepData);
	$("#json_to_dt_radio").click(prepData);
	$("#mk_but").click(createDataTable);
});
