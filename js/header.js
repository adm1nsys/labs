$(document).ready(function() {
	// https://api.jquery.com/load/
	$('#header').load('/МЗ-31/templates/header.html', onLoadedHeader);
	
	function onLoadedHeader() {
		var path = document.location.href;
		var name = path.split('/').pop();
		$('a[href="' + name + '"]').addClass('active');
	}
});