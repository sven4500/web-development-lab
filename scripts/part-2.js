// Просто шлобальный идентификатор HTML версии таблицы.
// Прочто чтобы мы не запутались.
var html_table_id = "example_table";

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

// Метод добавляет поля у параметру на основании выбранных
// возможносей таблицы DataTable.
function composeParam() {
	var p = {};
	p.ordering = $("#ordering_ck").is(":checked");
	p.searching = $("#searching_ck").is(":checked");
	p.paging = $("#paging_ck").is(":checked");
	return p;
}

function onClickHandler() {
	alert("click");
}

function onOrderHandler() {
	alert("order");
}

function onSearchHandler() {
	alert("search");
}

function onPageHandler() {
	alert("page");
}

// Метод вохвразает тип входных данных на основании которых будет сконструирована таблица DataTable.
function getDataSource() {
	return $("input:radio[name='data_source']:checked").val();
}

// Метод помещает в окошко текст с исходными данными для таблицы.
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
	var tb = "";
	switch(getDataSource()) {
		case "html2dt":
			tb = tb_tx;
			break;
		case "js2dt":
			tb = makeHtmlTable(0, 0, html_table_id);
			var func = new Function(tb_tx + "return dataSet;");
			var dt = func();
			par.data = dt;
			par.columns = dt;
			break;
		case "json2dt":
			tb = makeHtmlTable(1, 2, html_table_id);
			par.ajax = tb_tx;
			break;
		default:
			break;
	}
	// Добавляем в div HTML версию таблицы. В завистмости от типа исходных данных
	// таблица строится польностью как HTML либо в виде просто тега.
	$("#table_placeholder").html(tb);
	var tb_dom = $("#" + html_table_id);
	if(typeof tb_dom != "undefined") {
		if($("#click_handler").is(":checked")) {
			$(tb_dom).on("click", onClickHandler);
		}
		if($("#order_handler").is(":checked")) {
			$(tb_dom).on("order.dt", onOrderHandler);
		}
		if($("#search_handler").is(":checked")) {
			$(tb_dom).on("search.dt", onSearchHandler);
		}
		if($("#page_handler").is(":checked")) {
			$(tb_dom).on("page.dt", onPageHandler);
		}
		$(tb_dom).DataTable(par);
	}
}

function onAddRow() {
	console.log("onAddRow");
	var tb = $("#example_table");
	console.log(tb);
	// Получаем количество строк и столбцов нашей таблицы.
	// Будут нужны нам для того чтобы подготовить новую строку с данными.
	var num_cols = $(tb).DataTable().columns().nodes().length;
	var num_rows = $(tb).DataTable().rows().nodes().length;
	console.log(num_rows);
	console.log(num_cols);
	if(num_cols > 0) {
		var new_row = [];
		for(var i = 0; i < num_cols; ++i) {
			new_row[i] = "NewItem_" + (i + 1) + "_" + (num_rows + 1);
		}
		// Чтобы увидеть новую строку нужно обновить отризовку таблицы.
		// Параметр false означает что не нужно сбрасывать текущую страницу.
		$(tb).DataTable().row.add(new_row).draw(false);
	}
}

function onDeleteRow() {
	console.log("onDeleteRow");
	var i_row = $("#row_to_manipulate").val();
	console.log(i_row);
	if(i_row >= 0) {
		var tb = $("#example_table").DataTable();
		tb.row(i_row).remove().draw(false);
	}
}

function onShowHideRow() {
	console.log("onShowHideRow");
	var i_col = $("#row_to_manipulate").val();
	if(i_col >= 0) {
		var col = $("#example_table").DataTable().column(i_col, {page: "current"});
		console.log(col);
		col.visible(!col.visible());
	}
}

$(document).ready(function() {
	$("#html_to_dt_radio").click(prepData);
	$("#js_to_dt_radio").click(prepData);
	$("#json_to_dt_radio").click(prepData);
	$("#mk_but").click(createDataTable);
	$("#add_row_but").click(onAddRow);
	$("#del_row_but").click(onDeleteRow);
	$("#show_hide_row_but").click(onShowHideRow);
});
