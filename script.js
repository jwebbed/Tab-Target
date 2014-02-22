$(document).ready(function () {

	console.log('Tab Target is running!');
	var all_links = $('a');

	var dict = [];
	for (var i = 0; i < all_links.length; i ++ ) {
		if (all_links[i].innerText.len > 0) {
			dict.push({
				key: all_links[i].innerText,
				value: all_links[i]
			});
		}
	}

	console.log('all_links: ' + all_links);
});