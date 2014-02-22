var dict = [];
var all_links;

$(document).ready(function () {

	console.log('Tab Target is running!');
	all_links = $('a');

	
	for (var i = 0; i < all_links.length; i ++ ) {
		if (all_links[i].innerText.length > 0) {
			dict.push({
				key: all_links[i].innerText,
				value: all_links[i]
			});
		}
	}

	var matches = parseDict('Wikipedia');

});


function parseDict(target_text) {
	var matches = [];
	for (var i = 0; i < all_links.length; i ++ ) {
		if (all_links[i].innerText.indexOf(target_text) != -1) {
			$(all_links[i]).highlight(target_text);
			matches.push(all_links[i]);
		}
	}
	return matches;
}