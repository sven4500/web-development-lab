console.log("Hi");

function f() {
	var i = parseInt($("#my_div").attr("current_index"));
	i = i % 3 + 1;
	var fn = "index_" + i + ".html";
	console.log(fn);
	$("#my_div").load(fn);
	$("#my_div").attr("current_index", i);
}

$(document).ready(function(){
	$("#my_div").attr("current_index", 0);
	$("#push_button").click(f);
});
