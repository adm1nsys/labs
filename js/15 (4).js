/*
	0. Відображення рекордів
	1. Старт гри
		V відображення поля 
		- @TODO прив'язка клікі на полях
		- @TODO перемішати числа (розташувати їх на полі)
		- скинути таймер
			- скинути в 00:00
			- відобразити
		- скинути ходи
			- скинути в 0
			- відобразити
	2. Гра
		- переміщення чисел
			- перевірка чи можно перемістити
			- переміщення числа та вільного міста
			V первірка положення (позначити числа на місці), позначити
				@TODO перевірка пустої 
			- перевірка всіх
			- додати хід (відобразити)
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

// Отримання елементів з HTML-сторінки
const FIELD_SIZE = document.querySelector("#iFieldSize");
const START_GAME = document.querySelector("#bStartGame");
const MOVES_COUNT = document.querySelector("#movesCount");
const GAME_TIME = document.querySelector("#gameTime");
const GAME_FIELD = document.querySelector("#gameField");
const GAME_RECORDS = document.querySelector("#gameRecords");

const pauseb = document.querySelector("#pauseb");;
const resumeb = document.querySelector("#resumeb");;

let moves = 0; // Счетчик ходов
let tstart = false;

var startTimeInterval;
var gameTime;

let timerIntervalId;
let elapsedSeconds = 0;


window.addEventListener('load', function() {
	console.log('loaded');
	
	pauseb.addEventListener("click", pauseTimer);
	resumeb.addEventListener("click", resumeTimer);
	
	// START_GAME.addEventListener("click", function() {
	// 	if(tstart === true){
	// 		tstart = false;
	// 		moves = 0;
	// 		MOVES_COUNT.textContent = moves;
	// 		resetTimer();
	// 		showHideButtons()
	// 	} 
	// });
	/*
	* Обробник кліку на полі гри
	*/
	GAME_FIELD.addEventListener('click', function(event) {
		const clickedTile = event.target;
		if (clickedTile.tagName === 'TD' && clickedTile.innerText) {
			MoveTile(clickedTile);
		}
	});
	// Початок гри
	START_GAME.addEventListener('click', StartGame);
});

//ОНО РАБОТАЕТ НЕ НАДА ТРОГАТЬ (НЕ РУГАЙТЕ)

/*
 * show hide Element
 * @param {object} button
 * @param {boolean} show
*/
function showHideButtons(button, show)
{
	if (show) {
		button.style.display = 'block';
	} else {
		button.style.display = 'none';
	}
}

function increaseMoveCount() {
    moves++;
    MOVES_COUNT.textContent = moves;
}

function startTimer() {
	let currentTime = (new Date()).getTime();
	gameTime = gameTime + currentTime - startTimeInterval;
	stopTimer();
	startTimeInterval = (new Date()).getTime();
	timerIntervalId = setInterval(() => {
        elapsedSeconds++;
        updateTimerDisplay();
    }, 1000);
    
    updateTimerDisplay();
	showHideButtons(pauseb, true);
	showHideButtons(resumeb, false);
}

function stopTimer() {
	if (timerIntervalId) {
		clearInterval(timerIntervalId);
	}
	let currentTime = (new Date()).getTime();
	
	gameTime = gameTime + currentTime - (startTimeInterval ?? currentTime);
	
	showHideButtons(pauseb, false);
	showHideButtons(resumeb, true);
}

function resetTimer() {
    elapsedSeconds = 0; // Сбрасываем счетчик времени
	startTimeInterval = (new Date()).getTime();
}

function updateTimerDisplay() 
{
	let currentTime = (new Date()).getTime();
	var elapsedSeconds = gameTime + currentTime - startTimeInterval;
	ShowTimeOnDisplay(elapsedSeconds);
    
}

function ShowTimeOnDisplay(elapsedSeconds)
{
	elapsedSeconds = Math.floor(elapsedSeconds / 100) / 10;
	const minutes = Math.floor(elapsedSeconds / 60);
    const seconds = elapsedSeconds % 60;
    GAME_TIME.textContent = `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
}

function pauseTimer()
{
	if (timerIntervalId) {
		clearInterval(timerIntervalId);
	}
	let currentTime = (new Date()).getTime();
	gameTime = gameTime + currentTime - (startTimeInterval ?? currentTime);
	ShowTimeOnDisplay(gameTime)
	showHideButtons(pauseb, false);
	showHideButtons(resumeb, true);
}

function resumeTimer()
{
	startTimeInterval = (new Date()).getTime();
	showHideButtons(pauseb, true);
	showHideButtons(resumeb, false);
	timerIntervalId = setInterval(() => {
        elapsedSeconds++;
        updateTimerDisplay();
    }, 50);
}


/*
 * Початок гри:
 * - відображення поля
 *		- перемішати числа (розташувати їх на полі)
 *		- скинути таймер (у 00:00 та відобразити)
 *		- скинути кількість ходів (у 0 та відобразити)
 * @param {object} event - подія кліку
 */
function StartGame(event) 
{
	const FIELD_SIZE_NUMBER = Number(FIELD_SIZE.value); // отримуємо розмір сторони поля
    ShowField(GAME_FIELD, FIELD_SIZE_NUMBER); // відображаємо поле гри
    const shuffledNumber = ShuffleNumbers(FIELD_SIZE_NUMBER); // генеруємо перемішаний перелік чисел
    UpdateField(GAME_FIELD, FIELD_SIZE_NUMBER, shuffledNumber); // оновлюємо поле гри числами
    HighlightRightNumbers(GAME_FIELD, FIELD_SIZE_NUMBER); // підсвічуємо правильно розташовані числа
	
	gameTime = 0;
	resetTimer();
	showHideButtons(pauseb, true);
	showHideButtons(resumeb, false);
    updateTimerDisplay(); // Обновляем отображение таймера

	timerIntervalId = setInterval(() => {
        elapsedSeconds++;
        updateTimerDisplay();
    }, 1000);
}

/*
 * Малює поле гри на основі заданого розміру
 * @param {object} gameField - елемент поля гри
 * @param {number} oneSideSize - розмір сторони поля
 */
function ShowField(gameField, oneSideSize) {
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
}
/*
 * Переміщення плитки на полі
 * @param {object} tile - плитка, яку потрібно перемістити
 */
function MoveTile(tile) {
    const x = Number(tile.getAttribute('x'));
    const y = Number(tile.getAttribute('y'));

    // Перевірка на сусідні пусті плитки
    const emptyNeighbour = [
        {x: x, y: y - 1},
        {x: x + 1, y: y},
        {x: x, y: y + 1},
        {x: x - 1, y: y}
    ].find(coords => IsTileEmpty(coords.x, coords.y));
    
    if (emptyNeighbour) {
        SwapTiles(tile, document.querySelector(`td[x="${emptyNeighbour.x}"][y="${emptyNeighbour.y}"]`));
        increaseMoveCount()
        // if(tstart === false) {
        // 	startTimer()
        // 	tstart = true;
		// 	document.body.appendChild(pauseb);
        // }
    }
}
/*
 * Перевіряє, чи є плитка порожньою
 * @param {number} x - координата X плитки
 * @param {number} y - координата Y плитки
 * @return {boolean} - повертає true, якщо плитка порожня
 */
function IsTileEmpty(x, y) {
    const tile = document.querySelector(`td[x="${x}"][y="${y}"]`);
    return tile && !tile.innerText;
}
/*
 * Змінює місцями дві плитки на полі гри
 * @param {object} tile1 - перша плитка
 * @param {object} tile2 - друга плитка
 */
function SwapTiles(tile1, tile2) {
    const tmpValue = tile1.innerText;
    tile1.innerText = tile2.innerText;
    tile2.innerText = tmpValue;

    // Після зміни плиток перевіряємо їх правильне розташування
    HighlightRightNumbers(GAME_FIELD, Number(FIELD_SIZE.value));
}
/*
 * Підсвічує правильно розташовані плитки
 * @param {object} gameField - поле гри
 * @param {number} oneSideSize - розмір сторони поля
 */
function HighlightRightNumbers(gameField, oneSideSize) {
    const totalTiles = oneSideSize * oneSideSize;
    for (let row = 0; row < oneSideSize; row++) {
        for (let col = 0; col < oneSideSize; col++) {
            const number = row * oneSideSize + col + 1;
            let td = document.querySelector(`table.table15 td[x="${col}"][y="${row}"]`);

		const correctValue = td.getAttribute('goal');

		if ((number === totalTiles && !td.innerText) || td.innerText == correctValue) {
		    td.classList.add('rightPosition');
		} else {
		    td.classList.remove('rightPosition');
		}
        }
    }
}
/*
 * Генерує перелік чисел для заповнення поля гри
 * @param {number} oneSideSize - розмір сторони поля
 * @return {Array} - масив з перемішаними числами
 * currentIndex - поточний індекс у процесі перемішування
 * randomIndex - випадково вибраний індекс обміну значеннями
 */
function ShuffleNumbers(oneSideSize) {
    const numbers = Array.from({ length: oneSideSize * oneSideSize - 1 }, (_, currentIndex) => currentIndex + 1);
    numbers.push(''); // додаємо порожній елемент у масив для пустої плитки

    // Перемішуємо числа в масиві
    for (let currentIndex = numbers.length - 1; currentIndex > 0; currentIndex--) {
        const randomIndex = Math.floor(Math.random() * (currentIndex + 1));
        [numbers[currentIndex], numbers[randomIndex]] = [numbers[randomIndex], numbers[currentIndex]];
    }

    return numbers;
}
/*
 * Оновлює графічне представлення поля гри згідно з перемішаними числами
 * @param {HTMLElement} gameField - HTML-елемент, який представляє графічне поле гри
 * @param {number} oneSideSize - розмір сторони поля
 * @param {Array} shuffledNumbers - масив з перемішаними числами
 */
function UpdateField(gameField, oneSideSize, shuffledNumbers) {
    for (let row = 0; row < oneSideSize; row++) {
        for (let col = 0; col < oneSideSize; col++) {
            document.querySelector('table.table15 td[x="' + col + '"][y="' + row + '"]').innerText = shuffledNumbers.pop();
        }
    }
}