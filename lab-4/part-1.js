function constructHtmlTable(data) {
	var nRows = data.length;
	var nCols = data.length;
	var tb = "";
	tb += "<table border=\"0\"><tbody>";
	for(var i = 0; i < nRows; ++i) {
		tb += "<tr>";
		for(var j = 0; j < nCols; ++j) {
			var content = "";
			// (i+j)%2 условие активации шахматной клетки.
			if((i + j) % 2 == 0 && j <= i) {
				content = data[i][Math.floor(j/2)];
				//console.log(i, j, content);
			}
			tb += "<th width=\"40px\">" + content + "</th>";
		}
		tb += "</tr>";
	}
	tb += "</tbody></table>";
	return tb;
}

function constructPascal(n) {
	if(n < 2)
		n = 2;
	
	var data = new Array(n);
	
	data[0] = new Array(1);
	data[1] = new Array(1);
	data[0][0] = 1;
	data[1][0] = 1;
	
	for(var i = 2; i < n; ++i) {
		// Количество элементов в строке с номером i.
		var k = Math.floor(i / 2) + 1;
		data[i] = new Array(k);
		for(var j = 0; j < k; ++j) {
			if(i % 2 == 0 && j == 0) {
				data[i][j] = 2 * data[i-1][0];
			}
			else if(j == k - 1) {
				data[i][j] = 1;
			}
			else if(i % 2 == 0) {
				data[i][j] = data[i-1][j-1] + data[i-1][j];
			}
			else if(i % 2 == 1) {
				data[i][j] = data[i-1][j] + data[i-1][j+1];
			}
			//console.log(data[i][j]);
		}
	}
	
	return data;
}

$(document).ready(function() {
	var n = prompt("Введите количество строк:", 0);
	var pascalData = constructPascal(n);
	var htmlTable = constructHtmlTable(pascalData);
	$("#table_place").html(htmlTable);
});
