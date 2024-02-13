const DEFAULT_LANGUAGE = 'en';
const LANGUAGE = {
	'en': {
		// 'Multi Language': 'Multi Language',
		'HTML': `The HyperText Markup Language or HTML is the standard markup language for documents designed to be displayed in a web browser. It defines the content and structure of web content. It is often assisted by technologies such as Cascading Style Sheets (CSS) and scripting languages such as JavaScript.

Web browsers receive HTML documents from a web server or from local storage and render the documents into multimedia web pages. HTML describes the structure of a web page semantically and originally included cues for its appearance.

HTML elements are the building blocks of HTML pages. With HTML constructs, images and other objects such as interactive forms may be embedded into the rendered page. HTML provides a means to create structured documents by denoting structural semantics for text such as headings, paragraphs, lists, links, quotes, and other items. HTML elements are delineated by tags, written using angle brackets. Tags such as <img> and <input> directly introduce content into the page. Other tags such as <p> and </p> surround and provide information about document text and may include sub-element tags. Browsers do not display the HTML tags but use them to interpret the content of the page.

HTML can embed programs written in a scripting language such as JavaScript, which affects the behavior and content of web pages. The inclusion of CSS defines the look and layout of content. The World Wide Web Consortium (W3C), former maintainer of the HTML and current maintainer of the CSS standards, has encouraged the use of CSS over explicit presentational HTML since 1997.[2] A form of HTML, known as HTML5, is used to display video and audio, primarily using the <canvas> element, together with JavaScript. `
	},
	'ua': {
		'Multi Language': 'Багато Мовний',
		'HTML': `HTML (англ. HyperText Markup Language — мова розмітки гіпертексту) — стандартизована мова розмітки документів для перегляду вебсторінок у браузері. Браузери отримують HTML документ від сервера за протоколами HTTP/HTTPS або відкривають з локального диска, далі інтерпретують код в інтерфейс, який відображатиметься на екрані монітора.

Елементи HTML є будівельними блоками сторінок HTML. За допомогою конструкцій HTML, зображення та інші об'єкти, такі як інтерактивні форми, можуть бути вбудовані у візуалізовану сторінку. HTML надає засоби для створення структурованих документів, позначаючи структурну семантику тексту, наприклад заголовки, абзаци, списки, посилання, цитати та інші елементи. Елементи HTML окреслені тегами, написаними з використанням кутових дужок. Теги на кшталт <img /> чи <input /> безпосередньо виводять вміст на сторінку. Інші теги, такі як <p>, оточують текст і надають інформацію про нього, а також можуть включати інші теги як піделементи. Браузери не показують теги HTML, але використовують їх для інтерпретації вмісту сторінки.

В HTML можна вбудовувати програми, написані на скриптових мовах, наприклад JavaScript, які впливають на поведінку та вміст вебсторінок. Включення CSS визначає вигляд і компонування вмісту. World Wide Web Consortium (W3C), який супроводжує стандарти HTML та CSS, заохочує використання CSS над явним презентаційним HTML з 1997 року.[1]

HTML впроваджує засоби для:[1]

    створення структурованого документа шляхом позначення структурного складу тексту: заголовки, абзаци, списки, таблиці, цитати та інше;
    отримання інформації зі Всесвітньої мережі через гіперпосилання;
    створення інтерактивних форм;
    включення зображень, звуку, відео, та інших об'єктів до тексту.`,
	'my test': '<b>мій тест<b>',
	}
}

const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const lang = LANGUAGE[urlParams.get('lang')] ? urlParams.get('lang') : DEFAULT_LANGUAGE;


$(document).ready(function() {
	translate();
	$('#content').load('html.html', () => {
		translate();
		$('#html2').load(lang + '/html2.html');
		$('#content').show(5000);
	});
});

function translate()
{
	document.querySelectorAll('.translate').forEach(el => {
		if (LANGUAGE[lang][el.innerText]) {
			el.innerText = LANGUAGE[lang][el.innerText];
		}
	});
}