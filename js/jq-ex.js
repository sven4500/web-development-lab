var fun = [fun1, fun2, fun3, fun4, fun5, fun6, fun7, fun8, fun9, fun10];

function fun1() {
	$(this).addClass("my-new-class");
}

function fun2() {
	var dom = $(this).offsetParent();
	var col = "#" + (234).toString(16) + (214).toString(16) + (254).toString(16);
	dom.css("background-color", col);
	console.log(dom);
	console.log(col);
}

function fun3() {
	var dom = $(":image");
	dom.attr("src", "but3b.png");
	console.log(dom);
}

function fun4() {
	var outWidth = $(this).outerWidth();
	outWidth = outWidth + 10;
	$(this).css("width", outWidth);
	console.log(outWidth);
}

function fun5() {
	var str = $("p").html();
	$("p").text(str);
	console.log(str);
}

function fun6() {
	var col = "#" + (215).toString(16) + (200).toString(16) + (244).toString(16);
	var $tbl = $("#testtable");
	$tbl.children().css("background-color", col);
	console.log(col);
	console.log($tbl);
}

function fun7() {
	$(this).off();
	$(this).one("click", function() {
		alert("Это сообщение больше не будет вызвано.");
	});
	alert("Все обработчики событий этой кнопки были отключены. Был добавлен новый обработчик события для этой кнопки который сработает лишь один раз.");
	console.log("fun7");
}

function fun8() {
	$(this).one("mousedown", function() {
		$(this).css("background-color", "red");
	});
	alert("Было добавлено событие на нажатие кнопки. Оно сработает в следующий раз.");
	$(this).css("background-color", "white");
	console.log("fun8");
}

function fun9() {
	$(this).off();
	$(this).attr("type", "input");
	$(this).change(function() {
		alert("Значение было изменено.");
	});
	console.log("fun9");
}

function fun10() {
	$(this).animate({
		opacity: 0.25,
		width: "-=100",
		background: "red"
	}, 1000, function() {alert("Анимация завершена");});
	$(this).off();
	console.log("fun10");
}

$(document).ready(function() {
	$("input#testbut").each(function(index, object) {
		$(object).click(fun[index]);
	});
});
