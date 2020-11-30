<?php
	$N = $_GET['N'];
	$data = array($N);
	echo "<table border=\"0\"><tbody>";
	for($i = 0; $i < $N; ++$i) {
		$data[$i] = array($i+1);
		echo "<tr>";
		for($j = 0; $j < $N; $j++) {
			echo "<th width=\"40px\">";
			if(($i + $j) % 2 == 0 && $j <= $i) { // <= условие активации клетки
				if($i == $j) {
					$data[$i][$j] = 1;
				}
				else if($i % 2 == 0 && $j == 0) {
					$data[$i][$j] = 2 * $data[$i-1][$j+1];
				}
				else {
					$data[$i][$j] = $data[$i-1][$j-1] + $data[$i-1][$j+1];
				}
				echo $data[$i][$j];
			}
			echo "</th>";
		}
		echo "</tr>";
	}
	echo "</tbody></table>";
?>
