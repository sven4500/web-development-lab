function g(data, stat) {
	//console.log(data);
}

function update_request() {
	console.log("Update request sent");
	//$.get("database.csv", g);
}

$(document).ready(function() {
	$("#update_but").click(update_request);
});
