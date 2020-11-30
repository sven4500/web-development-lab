function compare(i) {
	var x = Number($($("input#valuable").get(i)).val());
	var y = Number($($("input#predicate_value").get(i)).val());
	var n = Number($($("select#predicate").get(i)).val());
	
	switch(n) {
		case 1: // val > pred_val
			return (x > y);
		case 2: // val < pred_val
			return (x < y);
		case 3: // val = pred_val
			return (x == y);
		default:
			return false;
	}
};

function f() {	
	var i = $("input#valuable").index($(this));
	if(i >= 0) {
		if(compare(i) == false) {
			$(this).css("background-color", "red");
			$(this).focus();
		}
		else {
			$(this).css("background-color", "white");
		}
	}
};

// Вызываем этот метод только когда документ полностью загружен.
$(document).ready(function() {
	// Добавляем одинаковый обработчик всем элементам с идентификатором "valuable".
	$("input#valuable").each(function() {
		$(this).css("background-color", "white");
		$(this).focusout(f);
	});
});
