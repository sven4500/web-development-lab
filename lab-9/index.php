<html>
	<head>
		<b>Лабораторная работа №9.</b> Работа с СУБД.<br>
		Рожлейс Иварс Андрисович.<br>
		Группа 108.<hr>
		Демо-пример на возможности phpMyAdmin.<hr>
	</head>
	<body>
		<?php
			// Подключаемся к базе данных test_db.
			$conn = mysqli_connect('127.0.0.1', 'root', '', 'test_db');
			if($conn == false) {
				echo "Не удалось подключиться к базе данных.";
				echo mysqli_connect_error();
				exit();
			}
			$aut = $_GET["aut"];
			$msg = $_GET["msg"];
			$dat = $_GET["dat"];
			// Если есть get запрос то обрабатываем его.
			if($aut != NULL && $msg != NULL) {
				// Добавляем запись в базу данных.
				mysqli_query($conn, "INSERT INTO `messages` (`author`, `message`) VALUES ('$aut', '$msg');");
			}
			// Если в запросе пришло время значит нужно удалить запись.
			if($dat != NULL) {
				mysqli_query($conn, "DELETE FROM `messages` WHERE `date` = '$dat';");
			}
			// Получаем все данные из таблицы.
			$res = mysqli_query($conn, "SELECT * FROM `messages`;");
			while($r1 = mysqli_fetch_assoc($res)) {
				$aut = $r1["author"];
				$msg = $r1["message"];
				$dat = $r1["date"];
				echo '<form method="GET" action="index.php" >';
				echo '<button type="submit" name="dat" value="', $dat, '" >x</button>';
				echo ' ';
				echo $aut, "<br>", $dat, "<br>", $msg, "<br><br>";
				echo '</form>';
			}
		?>
		<hr>
		<form method="GET" action="index.php" >
		<input type="text" placeholder="Автор" name="aut" ><br>
		<textarea cols="40" rows="10" placeholder="Ваше сообщение..." name="msg" ></textarea><br>
		<input type="submit" value="Отправить" >
		</form>
	</body>
</html>
