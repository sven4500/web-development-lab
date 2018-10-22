function makeHtmlTable(n_rows, n_cols, id) {
	var tb = "";
	tb += "<table id=\"" + id + "\" border=\"1\">";
	tb += "<thead><tr>";
	for(var j = 0; j < n_cols; ++j) {
		tb += "<th>" + "..." + "</th>";
	}
	tb += "</tr></thead>";
	tb += "<tbody>";
	for(var i = 1; i < n_rows; ++i) {
		tb += "<tr>";
		for(var j = 0; j < n_cols; ++j) {
			tb += "<th>" + "..." + "</th>";
		}
		tb += "</tr>";
	}
	tb += "</tbody>";
	tb += "</table>";
	return tb;
}

$(document).ready(function() {
	console.log("Document ready");
	var tb = makeHtmlTable(5, 10, "table_example");
	console.log(tb);
	$("#table_placeholder").html(tb);
});
