function rss() {
	var xhttp = new XMLHttpRequest();
	xhttp.onreadystatechange = function() {
		if (xhttp.readyState == 4 && xhttp.status == 200) {
			var rss = rssAnalyze(xhttp);
		}
	};
	xhttp.open('GET', 'http://yunmusic.lofter.com/rss', true);
	xhttp.send();

	function rssAnalyze(xml) {
		var xmlDoc = xml.responseXML;
		console.log(xmlDoc);
	}
}