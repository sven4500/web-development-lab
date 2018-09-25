var A_val = document.getElementById("A_val");
var B_val = document.getElementById("B_val");

var A_pred = document.getElementById("A_pred");
var B_pred = document.getElementById("B_pred");

var A_pred_val = document.getElementById("A_pred_val");
var B_pred_val = document.getElementById("B_pred_val");

A_val.onblur = f;
B_val.onblur = f;

function compare(pred, pred_val, val) {
	var x = Number(val.value);
	var y = Number(pred_val.value);
	var n = Number(pred.options[pred.selectedIndex].value);
	switch(n) {
		case 1: // val > pred_val
			if(x > y)
				return true;
			else
				return false;
		case 2: // val < pred_val
			if(x < y)
				return true;
			else
				return false;
		case 3: // val = pred_val
			if(x == y)
				return true;
			else
				return false;
		default:
			return false;
	}
};

function f() {
	var obj = this;
	//var obj = event.target;
	if(obj == A_val) {
		if(compare(A_pred, A_pred_val, A_val) == false) {
			obj.style.background = "red";
			obj.focus();
		}
		else {
			obj.style.background = "white";
		}
	}
	else if(obj == B_val) {
		if(compare(B_pred, B_pred_val, B_val) == false) {
			obj.style.background = "red";
			obj.focus();
		}
		else {
			obj,style.background = "white";
		}
	}
};
	