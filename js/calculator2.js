const CALCULATOR_SCREEN = document.querySelector('table#calulator div#claculatorDisplay');
const CALCULATOR_STATUS = document.querySelector('table#calulator div#claculatorStatus');
const ARIFMETICS = ["/", "*", "**", "-", "+"];

const FIRST_NUMBER_INDEX = 0;

var numbers = ['0'];
var arifmetic = [''];

document.querySelectorAll('table#calulator button.number').forEach(button => button.addEventListener('click', ButtonNumberClick));
document.querySelectorAll('table#calulator button.edit').forEach(button => button.addEventListener('click', ButtonEditClick));
document.querySelectorAll('table#calulator button.arifmetic').forEach(button => button.addEventListener('click', ButtonArifmeticClick));
document.querySelectorAll('table#calulator button.result').forEach(button => button.addEventListener('click', ButtonResultClick));

/**
 * Обробка натискання на кнопку калькулятора
 * Обробляємо цифрові
 *
 * @param Object event подія натискання на кнопку
 * @return string
**/
function ButtonNumberClick(event)
{
	const VALUE = event.target.value;
	const CURENT_NUMBER_INDEX = numbers.length - 1;
	
	if (numbers[CURENT_NUMBER_INDEX] == '0') {
		numbers[CURENT_NUMBER_INDEX] = VALUE;
	} else {
		numbers[CURENT_NUMBER_INDEX] += VALUE;
	}
	ShowOnScreen(CALCULATOR_SCREEN, numbers, arifmetic);
	return numbers[CURENT_NUMBER_INDEX];
}
/**
 * Обробка натискання на кнопку калькулятора
 * Обробляємо редагування
 *
 * @param Object event подія натискання на кнопку
 * @return boolean
 * @todo delete last symbol
**/
function ButtonEditClick(event)
{
	const VALUE = event.target.value;
	const CURENT_NUMBER_INDEX = numbers.length - 1;
	switch (VALUE) {
		case 'c':
			numbers = ['0'];
			arifmetic = [''];
			ShowOnScreen(CALCULATOR_SCREEN, numbers, arifmetic);
		break;
		
		case 'ce':
			numbers[CURENT_NUMBER_INDEX] = '0';
			ShowOnScreen(CALCULATOR_SCREEN, numbers, arifmetic);
		break;
		
		case '<-':
			// numbers [CURENT_NUMBER_INDEX];
			ShowOnScreen(CALCULATOR_SCREEN, numbers, arifmetic);
		break;
	}
}
/**
 * Обробка натискання на кнопку калькулятора
 * Обробляємо математичні дії
 *
 * @param Object event подія натискання на кнопку
 * @return string
**/
function ButtonArifmeticClick(event)
{
	const VALUE = event.target.value;
	const CURENT_NUMBER_INDEX = arifmetic.length - 1;
	
	ButtonResultClick();
	
	arifmetic[CURENT_NUMBER_INDEX] = VALUE;
	numbers.push('0');
	ShowOnScreen(CALCULATOR_SCREEN, numbers, arifmetic);
	return arifmetic
}
/**
 * Обробка натискання на кнопку калькулятора
 * Обробляємо обчислення
 *
 * @param Object event подія натискання на кнопку
 * @return number
 * @todo
**/
function ButtonResultClick(event)
{
	const CURENT_NUMBER_INDEX = arifmetic.length - 1;
	switch (arifmetic[CURENT_NUMBER_INDEX]) {
		case '/':
			numbers = [(numbers[0] / numbers[1])];
		break;
		
		case '-':
			numbers = [(numbers[0] - numbers[1])];
		break;
		
		case '+':
			numbers = [(Number(numbers[0]) + Number(numbers[1]))];
		break;
	}
	arifmetic = [''];
	ShowOnScreen(CALCULATOR_SCREEN, numbers, arifmetic);
}
/**
 * Виведення на екран
 *
 * @param object screen
 * @param array numbers
 * @param string arifmetic
 * @return number
 * @todo use array for show
**/
function ShowOnScreen(screen, numbers, arifmetic)
{
	var result = numbers[0] + '' + arifmetic[0] + '<br>' +
				(numbers[1] ? numbers[1] : '');
	screen.innerHTML = result;
	return result;
}