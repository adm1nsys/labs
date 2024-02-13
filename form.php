<!DOCTYPE html>
<html>
	<head>
		<meta charset="utf-8">
		<title>МЗ-21 лекция Form</title>
		<meta name="keywords" content="HTML">
		<meta name="description" content="HMTL">
		<link rel="icon" type="image/png" sizes="32x32" href="favicon-32x32.png">
		<link rel="stylesheet" href="style/menu.css">
		<link rel="stylesheet" href="style/footer.css">
		<link rel="stylesheet" href="style/container.css">
		<style>
			label:hover {
				background-color: grey;
				cursor: pointer; 
			}
		</style>
	</head>
	<body>
		<div id="header">
			<h2 id="EDUname"> 
				ВСП Харківський фаховий коледж<br>
				інформаційних технологій<br>
				Національного аерокосмічного<br>
				університету "ХАІ"<br>
			</h2>
			<div id="menu">
				<a href="index.html">index</a>
				<a href="css.html">CSS</a>
				<a href="table.html">table</a>
				<a href="div.html">div</a>
				<a href="menu.html">menu</a>
				<a href="2Column.html">2 Column</a>
				<a href="form.html" class="active">Form</a>
			</div>
		</div>
		
		<div id="container">
			<div id="sidebar">
				<h1>Содержание</h1>
			</div>
			<div id="content"><br>
				<!-- https://developer.mozilla.org/ru/docs/Web/HTML/Element/form -->
				<!-- <form action="/formtest.php" method="post" target="_formtest"> -->
				<form action="" method="get" target="_formtest">
				
					<!-- https://developer.mozilla.org/ru/docs/Web/HTML/Element/input -->
					<input type="text" name="firstInputText" value="Default value" disabled><br>
					<input type="text" name="firstInputText2" placeholder="введите текст" required value="<?=$_GET['firstInputText2'];?>"><br>
					<hr>
					
					<!-- https://developer.mozilla.org/en-US/docs/Web/HTML/Element/textarea -->
					<textarea name="textarea" cols="50" rows="10"></textarea>
					<hr>
					
					<!-- https://developer.mozilla.org/ru/docs/Web/HTML/Element/input/number -->
					<input type="number" name="firstInputNumber" value="0" min="-20" max="20" step="4"><br>
					
					<!-- https://developer.mozilla.org/ru/docs/Web/HTML/Element/input/password -->
					<input type="password" name="password"><br>
					
					<!-- https://developer.mozilla.org/ru/docs/Web/HTML/Element/input/hidden -->
					<input type="hidden" name="hidden" value="hiddenField"><br>
					
					<!-- https://developer.mozilla.org/ru/docs/Web/HTML/Element/input/date -->
					<input type="date" name="date"><br>
					
					<!-- https://developer.mozilla.org/ru/docs/Web/HTML/Element/input/color -->
					<input type="color" name="color"><br>
					
					<!-- https://developer.mozilla.org/ru/docs/Web/HTML/Element/input/file -->
					<input name="myFile" type="file"><br>

					<!-- https://developer.mozilla.org/ru/docs/Web/HTML/Element/select -->
					<select name="select[]" multiple>
						<!-- https://developer.mozilla.org/ru/docs/Web/HTML/Element/option -->
						<option value="0" disabled selected> выберите ФИО </option>
						<option value="1">Барибін Ярослав Віталійович</option>
						<option value="2">Бєлов Дмитро Євгенійович</option>
						<option value="3">Вовк Данило Дмитрович</option>
						<option value="4">Воронцов Алім Хасанович</option>
						<option value="5">Гао Нікіта Цзюнь</option>
						<option value="6">Глушко Віталій Романович</option>
						<option value="7">Дробан Денис Олександрович</option>
						<option value="8">Дубина Михайло Юрійович</option>
						<option value="9">Кутєпов Данило Євгенович</option>
						<option value="10">Лещенко Микита Вікторович</option>
						<option value="11">Михайлов Кирило Романович</option>
						<option value="12">П’ятовський Данило Дмитрович</option>
						<option value="13">Пахомов Семен Олександрович</option>
						<option value="14">Пащенко Нікіта Сергійович</option>
						<option value="15">Романенко Георгій Олександрович</option>
						<option value="16">Руденко Микола Олександрович</option>
						<option value="17">Сарічев Олег Романович</option>
						<option value="18">Севостьянов Артем Юрійович</option>
						<option value="19">Скобля Антон Анатолійович </option>
						<option value="20">Федяшин Кирило Олександрович</option>
						<option value="21">Фунтов Микита Вячеславович</option>
						<option value="22">Чернишов Максим Олександрович</option>
						<option value="23">Шадура Владислав Дмитрович</option>
					</select><br>
					
					<!-- https://developer.mozilla.org/ru/docs/Web/HTML/Element/fieldset -->
					<fieldset>
						<legend> First Checkboxes </legend>
						<!-- https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/checkbox -->
						<!-- https://developer.mozilla.org/ru/docs/Web/HTML/Element/label -->
						<input type="checkbox" name="checkbox[]" value="check1" id="check1"><label for="check1">Check 1</label><br>
						<input type="checkbox" name="checkbox[]" value="check2" id="check2"><label for="check2">Check 2</label><br>
					</fieldset>
					<br>
					
					<!-- https://developer.mozilla.org/ru/docs/Web/HTML/Element/button -->
					<button disabled > Send </button>
					<button type="submit" value="sendButton"> Send </button>
					<button type="reset"> Reset </button>
				</form>
			</div>
		</div>
		
		<div id="footer">
			&copy;2023
		</div>
	</body>
</html>