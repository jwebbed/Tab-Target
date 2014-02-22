var dict = [];
var all_links;

$(document).ready(function () {
	window.addEventListener("keydown", downKey, true);
	window.addEventListener("keyup", upKey, true);

	all_links = $('a');
	
	for (var i = 0; i < all_links.length; i ++ ) {
		if (all_links[i].innerText.length > 0) {
			dict.push({
				key: all_links[i].innerText.toLowerCase(),
				value: all_links[i]
			});
		}
	}

	var matches = parseDict('wiki');
	var chosen_index = 0;
	$(matches[chosen_index]).addClass('tt_chosen');

});


function parseDict(target_text) {
	var matches = [];
	target_text = target_text.toLowerCase();
	for (var i = 0; i < dict.length; i ++ ) {
		if (dict[i].key.indexOf(target_text) != -1) {
			$(dict[i].value).highlight(target_text);
			matches.push(dict[i].value);
		}
	}
	return matches;
}

function switchChosen(curr_index, matches) {
	$('.tt_chosen').removeClass('tt_chosen');
	chosen_index += 1;
	$(matches[chosen_index]).addClass('tt_chosen');
	return chosen_index;
}

function clickLink() {
	// click currently selected link
	$('tt_chosen')[0].click();
}

var pressedKeys = {ALT: false, T: false, TAB: false, ENTER: false, P: false}; //alt, t, tab, enter
var srchLinks = false;


// key constants
var ALT = 18,
	T = 84,
	TAB = 9,
	ENTER = 13,
	ESC = 27;

function downKey(e) {
	if (e.keyCode == ENTER) {
		
	}

	//alt key is pressed
	if(e.keyCode == ALT) {
		pressedKeys['ALT'] = true;
	}

	//t key is pressed
	if(e.keyCode == T) {
		pressedKeys['T'] = true;
	}

	var both = (pressedKeys['ALT'] && pressedKeys[1]);
	var neither = (!pressedKeys['T'] && !pressedKeys[1]);
	if(both || neither) {
		srchLinks = !srchLinks;
		pressedKeys['ALT'] = !pressedKeys['ALT'];
		pressedKeys['T'] = !pressedKeys['T'];

		if(srchLinks) {
			addUI();
			console.log("open things");
		}
		else {
			removeUI();
			console.log("close things");
		}
	}

}

function upKey(e) {
	if(e.keyCode == TAB) {
		console.log("keyup: move to next link");
	}
}

addUI = function() {
	$.get(chrome.extension.getURL('search_bar.html'), function(data) {
    $($.parseHTML(data)).appendTo('body');
});
}

removeUI = function() {
	$('.tabTargetInput').remove();
}
