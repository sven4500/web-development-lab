<html>
	<head>
		<b>Лабораторная работа №9.</b> phpMyAdmin.<br>
		Рожлейс Иварс Андрисович.<br>
		Группа 108.<hr>
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
			if($aut != NULL && $msg != NULL) {
				mysqli_query($conn, "INSERT INTO `messages` (`author`, `message`) VALUES ('$aut', '$msg');");
			}
			$res = mysqli_query($conn, "SELECT * FROM `messages`;");
			while($r1 = mysqli_fetch_assoc($res)) {
				echo $r1["author"], "<br><br>";
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
