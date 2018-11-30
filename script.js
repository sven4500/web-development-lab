var ctx;
var dim = {};

$(document).ready(function() {
	var cv = $("#example");
	ctx = $(cv)[0].getContext("2d");
	dim.width = ctx.canvas.clientWidth;
	dim.height = ctx.canvas.clientHeight;
});

function onRedraw(data) {
	var pos = data.split(",");
	ctx.clearRect(0, 0, dim.width, dim.height);
	ctx.strokeRect(0, 0, dim.width, dim.height);
	ctx.fillRect(pos[0], pos[1], 8, 8);
}

function onFrame() {
	$.get("http://127.0.0.1:8000/data", {}, onRedraw);
}

setInterval(onFrame, 100);
