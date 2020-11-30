var my_variant = 16;

function getVariant(variant) {
	var t1 = [
		"a) опционально (по флагу) меняется при выборе элемента",
		"b) по кнопке"
	];
	var t2 = [
		"1) get",
		"2) post",
		"3) load"
	];
	var t3 = [
		"A) param",
		"B) serialize",
		"C) serializeArray"
	];

	var v1 = parseInt((variant - 1) % 2);
	var v2 = parseInt((variant - 1) % 3);
	var v3 = parseInt((variant - 1) / 3) % 3;

	var str = "Отображение этой информации " + t1[v1] + ";<br>" +
		"для выборки использовать методы " + t2[v2] + ";<br>" +
		"использовать вспомогательную функцию " + t3[v3] + ".<br>";
	return str;
}

$(document).ready(function() {
	$("#part_1_description").append("<b>" + getVariant(my_variant) + "</b>");
});
