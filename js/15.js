/*
	0. Відображення рекордів
	1. Старт гри
		V відображення поля 
		- V прив'язка клікі на полях
		- @TODO перемішати числа (розташувати їх на полі)
		- @TODO скинути таймер
			- @TODO скинути в 00:00.0
			V відобразити  час гри
		V скинути ходи
			V скинути в 0
			V відобразити
	2. Гра
		- переміщення чисел
			V перевірка чи можно перемістити
			- @TODO переміщення числа та вільного міста
			V первірка положення (позначити числа на місці), позначити
				V перевірка пустої 
			- @TODO перевірка всіх
			V додати хід (відобразити)
		- оновлення часу гри
	3. Закінчення гри
		- запит ім'я
		- збереження рекорду
	4. Відображення рекордів
		{Дата, Ім'я, розмір поля, кількість xодів, час}
		- відобразити таблицю
			- фільтр по розміру поля
			- сортіровка по полям
*/

$(document).ready(function() {
	console.info('loaded');
	
	document.querySelectorAll('a').forEach(a => {
		a.style.backgroundColor = 'red';
		a.style.color = 'yellow';
	});

	$('a')
		.css('background-color', 'purple')
		.css('color', 'pink');
		
	ShowRecords();
});

const RECORD_PLAYER_NAME = 0;
const RECORD_MOVES = 1;
const RECORD_TIME_START = 2;
const RECORD_GAME_TIME = 3;
const RECORD_FIELD_SIZE = 4;

const FIELD_SIZE = document.querySelector("#iFieldSize");
const START_GAME = document.querySelector("#bStartGame");
const MOVES_COUNT = document.querySelector("#movesCount");
const GAME_TIME = document.querySelector("#gameTime");

const GAME_FIELD = document.querySelector("#gameField");
const GAME_RECORDS = document.querySelector("#gameRecords");

var moves = 0;
var fieldSize = 4;

var playerName = localStorage.getItem('playerName') ?? '';
var records = localStorage.getItem('records') ? JSON.parse(localStorage.getItem('records')) : [];

var startGameTime;
var timerId;



START_GAME.addEventListener('click', StartGame);
FIELD_SIZE.addEventListener('change', ShowRecords);

/*
 * Start Game
 * - відображення поля 
 *		- перемішати числа (розташувати їх на полі)
 *		- @TODO скинути таймер
 *			- @TODO скинути в 00:00.0
 *			- відобразити час гри
 *		V скинути ходи
 *			V скинути в 0
 *			V відобразити
 * @param object event
*/
function StartGame(event)
{
	fieldSize = Number(FIELD_SIZE.value);
	ShowField(GAME_FIELD, fieldSize);
	var shuffledNumber = ShuffleNumbers(fieldSize);
	UpdateField(GAME_FIELD, fieldSize, shuffledNumber);
	HighlightRightNumbers(GAME_FIELD, fieldSize);
	ResetMoves();
	ShowMoves();
	
	var time = new Date();
	startGameTime = time.getTime();
	
	if (timerId) {
		clearInterval(timerId);
	}
	timerId = setInterval(ShowTime, 500);
	
	// FIELD_SIZE.setAttribute('disabled', true);
}
/*
 * відобразити  час гри
*/
function ShowTime()
{
	var interval = GetGameTime();
	GAME_TIME.innerHTML = FormatTime(interval);
}	
function GetGameTime()
{
	var date2 = new Date();
	return date2.getTime() - startGameTime;
}
/*
 * @TODO format time to mm:ss.s
 * @param integer interval time in miliseconds
 * @return text time in format mm:ss.s
*/
function FormatTime(interval)
{
	return (Math.floor(interval / 100) / 10).toFixed(1);
}
/*
 * скинути в 0
*/
function ResetMoves()
{
	moves = 0;
}
/*
 * відобразити
*/
function ShowMoves()
{
	MOVES_COUNT.innerHTML = `<b>
								${moves}
							</b>`;
}

/*
 * Draw field by user field size Select
 * @param object gameField
 * @param number oneSideSize
*/
function ShowField(gameField, oneSideSize) 
{
	console.info('ShowField');
	var result = '<table class="table15">';
	var goal = 1;
	for (let row = 0; row < oneSideSize; row++) {
		result += '<tr>';
		for (let col = 0; col < oneSideSize; col++) {
			
			result += '<td goal="' + goal + '" x="' + col + '" y="' + row + '">';
			result += goal;
			result += '</td>';
			
			goal++;
			if (goal == oneSideSize * oneSideSize) {
				goal = '';
			}
		}
		result += '</tr>';
	}
	result += '</table>';
	gameField.innerHTML = result;
	gameField.querySelectorAll('td').forEach(td => td.addEventListener('click', ClickOnCell));
}
/*
 * Click on Cell
 * 2. Гра
 *		- переміщення чисел
 *			V перевірка чи можно перемістити
 *			- @TODO переміщення числа та вільного міста
 *			V первірка положення (позначити числа на місці), позначити
 *				V перевірка пустої 
 *			- @TODO перевірка всіх
 *			V додати хід (відобразити)
 *		- оновлення часу гри
 * @param object event
*/
function ClickOnCell(event)
{
	console.info(event.target.innerText);
	var field = event.target;
	if (CanMove_2_1(field)) {
		console.log('CAN MOVE');
		SwapFields(field);
		HighlightRightNumbers(GAME_FIELD, fieldSize);
		moves++;
		ShowMoves();
		if (CheckEndGame()) {
			EndGame();
		}
		return;
	}
	console.log('CAN NOT MOVE');
}
/*
 * запит ім'я
 * збереження рекорду
*/
function EndGame()
{
	let gameInterval = GetGameTime();
	clearInterval(timerId);
	GAME_FIELD.querySelectorAll('td').forEach((td) => {
		td.setAttribute('value', td.getAttribute('goal')); 
		td.innerHTML = td.getAttribute('goal');
	}); 
	HighlightRightNumbers(GAME_FIELD, fieldSize);
	setTimeout(SaveRecord, 30, gameInterval);
}
function SaveRecord(gameInterval)
{
	playerName = prompt('Enter Name', playerName);
	localStorage.setItem('playerName', playerName);
	var record = [
		playerName,
		moves,
		startGameTime,
		gameInterval,
		fieldSize
	];
	// https://uk.wikipedia.org/wiki/JSON
	record = {
		'playerName': playerName,
		'moves': moves,
		'startGameTime': startGameTime,
		'gameInterval': gameInterval,
		'fieldSize': fieldSize
	};
	records.push(record);
	
	// https://developer.mozilla.org/ru/docs/Learn/JavaScript/Objects/JSON
	localStorage.setItem('records', JSON.stringify(records));
	ShowRecords();
}
/*
4. Відображення рекордів
		{Дата, Ім'я, розмір поля, кількість xодів, час}
		- відобразити таблицю
			- фільтр по розміру поля
			- сортіровка по полям
*/
function ShowRecords(event = null)
{
	var filterFieldSize = Number(FIELD_SIZE.value);
	var result = `<table border="1">
			<tr>
				<th order="asc" value="startGameTime">Date</th>
				<th order="asc" value="playerName">Name</th>
				<th order="asc" value="moves">Moves</th>
				<th order="asc" value="gameInterval">Time</th>
			</tr>
		`;
		
	// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/sort
	var fieldToSort = 'gameInterval';
	var orderToSort = 'asc';
	
	if (event) {
		fieldToSort = event.target.getAttribute('value');
		orderToSort = event.target.getAttribute('order') == 'asc' ? 'desc' : 'asc';
		
	}
	records.sort((a, b) => {
		if (orderToSort == 'desc') {
			return a[fieldToSort] - b[fieldToSort];
		} else {
			return b[fieldToSort] - a[fieldToSort];
		}
	});
	records.forEach(record => {
		if (filterFieldSize == record.fieldSize) {
			result += `<tr>
				<td>${(new Date(record.startGameTime)).toLocaleString()}</td>
				<td>${record.playerName}</td>
				<td>${record.moves}</td>
				<td>${FormatTime(record.gameInterval)}</td>
			</tr>`;
		}
	});
	result += '</table>';
	GAME_RECORDS.innerHTML = result;
	GAME_RECORDS.querySelector('th[value="' + fieldToSort + '"]').setAttribute('order', orderToSort);
	GAME_RECORDS.querySelectorAll('th').forEach(th => th.addEventListener('click', ShowRecords));
}
/*
 * @TODO перевірка всіх
 * @return	boolean 
*/
function CheckEndGame()
{
	let result = false;
	// @todo перевірка
	return result;
}
/*
 * @TODO переміщення числа та вільного міста
*/
function SwapFields(field)
{
	
}
/*
 * Check can field moveAbove
 * @param object tile
 * @return boolean
*/
function CanMove_2_0(tile)
{
	const x = Number(tile.getAttribute('x'));
    const y = Number(tile.getAttribute('y'));
	
	const emptyCell = GAME_FIELD.querySelector('td[value=""]');
	const emptyX = Number(emptyCell.getAttribute('x'));
    const emptyY = Number(emptyCell.getAttribute('y'));
	
	var distance = Math.abs(emptyX - x) + Math.abs(EmptyY - y);
	
	return distance === 1;
}
/*
 * Check can field moveAbove
 * @param object tile
 * @return boolean
*/
function CanMove_2_1(tile)
{
	return Math.abs(Number(GAME_FIELD.querySelector('td[value=""]').getAttribute('x')) - Number(tile.getAttribute('x'))) + 
			Math.abs(Number(GAME_FIELD.querySelector('td[value=""]').getAttribute('y')) -  Number(tile.getAttribute('y'))) 
			=== 1;
}
/*
 * Check can field moveAbove
 * @param object tile
 * @return boolean
*/
function CanMove_1_1(tile)
{
	var result = false;
	const x = Number(tile.getAttribute('x'));
    const y = Number(tile.getAttribute('y'));
	
	const emptyNeighbours = [
        {dx: 0, dy: +1},
        {dx: 0, dy: -1},
        {dx: +1, dy: 0},
        {dx: -1, dy: 0}
	];
	
	emptyNeighbours.forEach(function (delta) {
		var curentTileFilter = 'td[x="' + (x + delta.dx) + '"][y="' + (y + delta.dy) + '"]';
		var currentTile = GAME_FIELD.querySelector(curentTileFilter);
		if (currentTile && currentTile.getAttribute('value') == '') {
			result = true;
			console.log('CanMove_1_1: CAN MOVE');
		}
	});
	
	return result;
}
/*
 * Check can field moveAbove
 * @param object tile
 * @return boolean
*/
function CanMove_1_0(tile)
{
	// var result = false;
	const x = Number(tile.getAttribute('x'));
    const y = Number(tile.getAttribute('y'));
	
	var curentTileFilter = 'td[x="' + (x + 0) + '"][y="' + (y + 1) + '"]';
	var currentTile = GAME_FIELD.querySelector(curentTileFilter);
	if (currentTile && currentTile.getAttribute('value') == '') {
		console.log('CAN MOVE');
		// result = true;
		return true;
	}
	
	curentTileFilter = 'td[x="' + (x + 0) + '"][y="' + (y - 1) + '"]';
	currentTile = GAME_FIELD.querySelector(curentTileFilter);
	if (currentTile && currentTile.getAttribute('value') == '') {
		console.log('CAN MOVE');
		// result = true;
		return true;
	}
	
	curentTileFilter = 'td[x="' + (x + 1) + '"][y="' + (y + 0) + '"]';
	currentTile = GAME_FIELD.querySelector(curentTileFilter);
	if (currentTile && currentTile.getAttribute('value') == '') {
		console.log('CAN MOVE');
		// result = true;
		return true;
	}
	
	curentTileFilter = 'td[x="' + (x - 1) + '"][y="' + (y + 0) + '"]';
	currentTile = GAME_FIELD.querySelector(curentTileFilter);
	if (currentTile && currentTile.getAttribute('value') == '') {
		console.log('CAN MOVE');
		// result = true;
		return true;
	}
	
	//return result;
	return false;
}
/*
 * первірка положення (позначити числа на місці), ппозначити
 * @param object gameField
 * @param number oneSideSize
*/
function HighlightRightNumbers(gameField, oneSideSize) 
{
	// var numbersCount = oneSideSize * oneSideSize;
	// for (let goal = 1; goal < numbersCount; goal++) {
	// 	let td = document.querySelector('table.table15 td[goal="' + goal + '"]');
	// 	if (td.innerText == goal) {
	// 		td.classList.add('rightPosition');
	// 	} else {
	// 		td.classList.remove('rightPosition');
	// 	}
	// }
	gameField.querySelectorAll('table.table15 td').forEach(td => {
		if (td.getAttribute('value') == td.getAttribute('goal')) {
			td.classList.add('rightPosition');
		} else {
			td.classList.remove('rightPosition');
		}
	});
}
/*
 * перемішати числа
 * @param number oneSideSize
 * @TODO створити алгорітм перемішування
*/
function ShuffleNumbers(oneSideSize)
{
	var result = [''];
	const fullSize = oneSideSize * oneSideSize;
	for (let i = 1; i < fullSize; i++) {
		result.push(Math.floor(Math.random() * fullSize));
	}
	return result;
}
/*
 * Оновлення поля з масиву
 * @param object gameField
 * @param number oneSideSize
 * @param number shuffledNumbers
*/
function UpdateField(gameField, oneSideSize, shuffledNumbers)
{
	// for (let row = 0; row < oneSideSize; row++) {
	// 	for (let col = 0; col < oneSideSize; col++) {
	// 		var fieldNumber = shuffledNumbers.pop();
	// 		var currentField = gameField.querySelector('table.table15 td[x="' + col + '"][y="' + row + '"]');
	// 		
	// 		currentField.innerText = fieldNumber;
	// 		currentField.setAttribute('value', fieldNumber);
	// 	}
	// }
	gameField.querySelectorAll('table.table15 td').forEach(td => {
		var fieldNumber = shuffledNumbers.pop();
		td.innerText = fieldNumber;
		td.setAttribute('value', fieldNumber);
	});
}