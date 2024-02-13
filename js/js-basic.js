var a = 10;					// коментарий до конца строки
a = 4.5;
a = 'ewerrew'; var d = 'ee';
a = true;

/*
	многострочній комментарий
*/

var emptyArray = [];

var fios = [
	'Барибін Ярослав Віталійович',
	'Бєлов Дмитро Євгенійович',
	'Вовк Данило Дмитрович',
	'Воронцов Алім Хасанович',
	'Гао Нікіта Цзюнь',
	'Глушко Віталій Романович',
	'Дробан Денис Олександрович',
	'Дубина Михайло Юрійович',
	'Кутєпов Данило Євгенович',
	'Лещенко Микита Вікторович',
	'Михайлов Кирило Романович',
	'П’ятовський Данило Дмитрович',
	'Пахомов Семен Олександрович',
	'Пащенко Нікіта Сергійович',
	'Романенко Георгій Олександрович',
	'Руденко Микола Олександрович',
	'Сарічев Олег Романович',
	'Севостьянов Артем Юрійович',
	'Скобля Антон Анатолійович',
	'Федяшин Кирило Олександрович',
	'Фунтов Микита Вячеславович',
	'Чернишов Максим Олександрович',
	'Шадура Владислав Дмитрович'
];

// https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Function
/**
 * Выводит в консоль переданное  значение
 * @param {any} a по умолчнаию 10
 * @return {any} default int
*/
function myFirstFunciton(a = 10)
{
	console.info(a);
	return a;
}

// https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Statements/class

class Polygon {
	constructor(height, width) {
		this.name = 'Polygon';
		this.height = height;
		this.width = width;
	}
	getArea() {
		return this.height * this.width;
	}
	toString() {
		return this.name;
	}
}

class Square extends Polygon {
	constructor(length) {
		// https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Operators/super
		super(length, length);
		this.name = 'Square';
	}
}

var polygon = new Polygon(20, 30);
var square = new Square(10);


// https://developer.mozilla.org/en/docs/Web/API/console
/**
	%s	строка
	%i	целое
	%f	дробное
	%O	объект
	%c	стиль
*/

console.info('%cpolygon = %O, %cpolygon = %s', 'background-color:green', polygon, 'color:red', polygon);

// https://developer.mozilla.org/en/docs/Web/API/Window/alert
alert('AAAA!!!!!');

//https://developer.mozilla.org/en/docs/Web/API/Window/confirm

//https://developer.mozilla.org/en/docs/Web/API/Window/prompt

var userName = prompt('Введите имя: ', 'Вася');
console.info('name: %s', userName);

// https://developer.mozilla.org/en/docs/Web/API/EventTarget/addEventListener

// https://developer.mozilla.org/en/docs/Web/API/Document/getElementsByTagName
// https://developer.mozilla.org/en/docs/Web/API/Document/getElementsByName
// https://developer.mozilla.org/en/docs/Web/API/Document/getElementsByClassName
// https://developer.mozilla.org/en/docs/Web/API/Document/getElementById

document.getElementById('buttonSendToResult').addEventListener('click', ClickButton);

var divResult = document.querySelector('#result');
var firstinput = document.querySelector('#firstInput');

/**
 * Выводит в div текст из поля ввода
 * @param object eventa объект события
*/
function ClickButton(event)
{
	// https://developer.mozilla.org/en/docs/Web/API/Document/querySelectorAll
	// https://developer.mozilla.org/en/docs/Web/API/Document/querySelector
	console.info(event);
	divResult.innerHTML = firstinput.value;
}



/* https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Date */
var date = new Date();
console.log(date.getTime());
// var timer = 0;

/* https://developer.mozilla.org/en-US/docs/Web/API/setTimeout */
var timer01 = setTimeout(ShowTimeout, 5000);

function ShowTimeout()
{
	console.log('ShowTimeout: ' + (new Date()).getTime());
	if (document.querySelector('input[type="text"]').value == "") {
		console.log('Enter Text');
		return setTimeout(ShowTimeout, 5000)
	}
	console.log(document.querySelector('input[type="text"]').value);
}

/* https://developer.mozilla.org/en-US/docs/Web/API/setInterval */
var timer02 = setInterval(ShowInterval, 500);

function ShowInterval()
{
	var date2 = new Date();
	var interval = Math.floor((date2.getTime() - date.getTime()) / 1000);
	// timer++;
	document.querySelector("#content").innerHTML += '<br>' + interval + ' - ' + timer;
}