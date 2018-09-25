var val = [
	document.getElementById("A_val"),
	document.getElementById("B_val")
];

var pred = [
	document.getElementById("A_pred"),
	document.getElementById("B_pred")
];

var pred_val = [
	document.getElementById("A_pred_val"),
	document.getElementById("B_pred_val")
];

A_val.onblur = f;
B_val.onblur = f;

function compare(pred, pred_val, val) {
	var x = Number(val.value);
	var y = Number(pred_val.value);
	var n = Number(pred.options[pred.selectedIndex].value);
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
	var obj = this; //var obj = event.target;
	var i = val.indexOf(obj);
	if(i >= 0) {
		if(compare(pred[i], pred_val[i], val[i]) == false) {
			val[i].style.background = "red";
			val[i].focus();
		}
		else {
			val[i].style.background = "white";
		}
	}
};
	