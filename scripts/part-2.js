function g(data, stat) {
	var dt = Papa.parse(data, {encoding: "utf-8"});
	var tb = constructHtmlTable(dt, [1, 1, 1, 1, 1], "my_table");
	$("#table_place").html(tb);
	$("#my_table").DataTable();
}

$(document).ready(function() {
	$("#update_but").click(function() {
		$.get("database.csv", g);
	});
});
