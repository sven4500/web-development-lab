/*$(document).ready(function() {
	console.log("Ready");
});*/

function onRedraw(data) {
	console.log(data);
}

function onFrame() {
	$.get("http://127.0.0.1:8000/data", {}, onRedraw);
}

setInterval(onFrame, 500);
