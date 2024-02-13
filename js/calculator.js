var myVar3 = '30';
const MY_CONST = 1;
const CALCULATOR_BUTTONS = document.querySelectorAll('table#calulator button');
const CALCULATOR_SCREEN = document.querySelector('table#calulator div#claculatorDisplay');
const CALCULATOR_STATUS = document.querySelector('table#calulator div#claculatorStatus');

const ARIFMETICS = ["/", "*", "**", "-", "+"];

// document.querySelectorAll('table#calulator button').addEventListener('click', ButtonCalculatorClick);
/* https://developer.mozilla.org/ru/docs/Web/JavaScript/Reference/Statements/for */
// for (let i = 0; i < CALCULATOR_BUTTONS.length; i++) {
// 	console.info(CALCULATOR_BUTTONS[i].innerHTML);
// 	CALCULATOR_BUTTONS[i].addEventListener('click', ButtonCalculatorClick);
// }

/* https://developer.mozilla.org/ru/docs/Web/JavaScript/Reference/Statements/while */
// var i = 0;
// while (i < CALCULATOR_BUTTONS.length) {
// 	CALCULATOR_BUTTONS[i].addEventListener('click', ButtonCalculatorClick);
// 	i++;
// }

/* https://developer.mozilla.org/ru/docs/Web/JavaScript/Reference/Statements/do...while */
// var i = -1;
// do {
// 	i++;
// 	/* https://developer.mozilla.org/ru/docs/Web/JavaScript/Reference/Statements/if...else */
// 	if (!CALCULATOR_BUTTONS[i]) {
// 		/* https://developer.mozilla.org/ru/docs/Web/JavaScript/Reference/Statements/continue */
// 		continue;
// 	}
// 	CALCULATOR_BUTTONS[i].addEventListener('click', ButtonCalculatorClick);
// } while (i < CALCULATOR_BUTTONS.length);

/* https://developer.mozilla.org/ru/docs/Web/JavaScript/Reference/Global_Objects/Array/forEach */
// CALCULATOR_BUTTONS.forEach(function(button) {
// 	button.addEventListener('click', ButtonCalculatorClick);
// });
CALCULATOR_BUTTONS.forEach(button => button.addEventListener('click', ButtonCalculatorClick));

/**
 * Обробка натискання на кнопку калькулятора
 *
 * Обробляємо групи цифрові, математичні дії, обчислення.
 *
 * @param	Object	event	событие нажатия на кнопку
 * @return 	boolean 		возвращает false при ошибке
**/
function ButtonCalculatorClick(event)
{
	const value = event.target.value;
	// var myVar1 = '10';
	// myVar2 = '20';
	console.log(value);
	CALCULATOR_STATUS.innerHTML = '';
	
	/* https://developer.mozilla.org/ru/docs/Web/JavaScript/Reference/Statements/switch */
	switch (value) {
		case '1':
		case '2':
		case '3':
		case '0':
			CALCULATOR_SCREEN.innerHTML += value;
		break;
		
		case '+':
		case '-':
		case '/':
			CALCULATOR_SCREEN.innerHTML += value;
		break;
		
		case 'c':
			CALCULATOR_SCREEN.innerHTML = '';
		break;
		
		case '<-':
			// CALCULATOR_SCREEN.innerHTML.split('').reverse().join('').substring(1).split('').reverse().join('');
			/* https://developer.mozilla.org/ru/docs/Web/JavaScript/Reference/Global_Objects/String/substring */
			// CALCULATOR_SCREEN.innerHTML = CALCULATOR_SCREEN.innerHTML.substring(0, (CALCULATOR_SCREEN.innerHTML.length - 1));
			/* https://developer.mozilla.org/ru/docs/Web/JavaScript/Reference/Global_Objects/String/slice */
			CALCULATOR_SCREEN.innerHTML = CALCULATOR_SCREEN.innerHTML.slice(0, -1);
		break;
		
		/**
		 * @TODO стирание последнего введенного числа
		**/
		case 'ce':
			// CALCULATOR_SCREEN.innerHTML = '';
			CALCULATOR_SCREEN.innerHTML = deleteLastNumber(CALCULATOR_SCREEN.innerHTML);
		break;
		
		case '=':
			/* https://developer.mozilla.org/ru/docs/Web/JavaScript/Reference/Statements/try...catch */
			try {
			/* https://developer.mozilla.org/ru/docs/Web/JavaScript/Reference/Global_Objects/eval */
				CALCULATOR_SCREEN.innerHTML = eval(CALCULATOR_SCREEN.innerHTML);
			} 
			catch (exception) {
				console.info(exception);
				CALCULATOR_STATUS.innerHTML = 'Error: ' + exception.message;
			} 
			console.info('Calculated');
		break;
		
		default:
			CALCULATOR_STATUS.innerHTML = 'Error';
		break;
		
		
		/* 
			https://developer.mozilla.org/ru/docs/Web/API/Document/querySelector
			https://developer.mozilla.org/ru/docs/Web/API/Document/querySelectorAll
			
		*/
	}
	
	/*
	if ('1' == value) {
		//console.info('entered 1');
		CALCULATOR_SCREEN.innerHTML += value;
	}  
	if ('2' == value) {
		CALCULATOR_SCREEN.innerHTML += value;
	}
	if ('3' == value) {
		CALCULATOR_SCREEN.innerHTML += value;
	}
	if ('4' == value) {
		CALCULATOR_SCREEN.innerHTML += value;
	}
	/**/
	
	return true;
}


/**
 * Видаляє останнє число у рядку (до арифметичного знака)
 *
 * @param	string	value	
 * @return 	string 		
**/
function deleteLastNumber(value)
{
	/* https://developer.mozilla.org/ru/docs/Web/JavaScript/Reference/Global_Objects/String/indexOf */
	/* https://developer.mozilla.org/ru/docs/Web/JavaScript/Reference/Global_Objects/String/lastIndexOf */
	//var result = '';
	//	0123456
	// 	1/2-3+0
	var lastIndex = -1;
	
	ARIFMETICS.forEach(arifmetic => {
		if (value.lastIndexOf(arifmetic) > lastIndex) {
			lastIndex = value.lastIndexOf(arifmetic);
		}
	});
	
	/*
	if (value.lastIndexOf('+') > lastIndex) {
		lastIndex = value.lastIndexOf('+');
	}
	if (value.lastIndexOf('-') > lastIndex) {
		lastIndex = value.lastIndexOf('-');
	}
	if (value.lastIndexOf('/') > lastIndex) {
		lastIndex = value.lastIndexOf('/');
	}
	if (value.lastIndexOf('*') > lastIndex) {
		lastIndex = value.lastIndexOf('*');
	}
	if (value.lastIndexOf('**') > lastIndex) {
		lastIndex = value.lastIndexOf('**');
	}
	/**/
	return value.substring(0, lastIndex + 1);
	//	0123456
	// 	1/2-3+0
	// result = value.substring(0, value.lastIndexOf('+') + 1);	//	5
	// result = value.substring(0, value.lastIndexOf('-') + 1);	//	3
	// result = value.substring(0, value.lastIndexOf('/') + 1);	//	1
	// return result;
}