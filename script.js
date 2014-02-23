var dict = [], matches = [], chosen_index;
var all_links;
var srchBar = false;

//keep track of whether both alt and t are pressed
var pressedKeys = {ALT: false, T: false};

// key constants
var ALT = 18,
	T = 84,
	TAB = 9,
	ENTER = 13,
	ESC = 27;


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
});


function parseDict(target_text) {
	var currmatches = [];
	target_text = target_text.toLowerCase();
	for (var i = 0; i < dict.length; i ++ ) {
		if (dict[i].key.indexOf(target_text) != -1) {
			$(dict[i].value).highlight(target_text);
			currmatches.push(dict[i].value);
		}
	}
	return currmatches;
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

function downKey(e) {
		
	//alt key is pressed
	if(e.keyCode == ALT) {
		pressedKeys['ALT'] = true;
	}

	//t key is pressed
	if(e.keyCode == T) {
		pressedKeys['T'] = true;
	}

	//if both, open link search
	var both = (pressedKeys['ALT'] && pressedKeys['T']);
	if(both && !srchBar) {
		addUI();
		console.log("open link search");
	}
}

function upKey(e) {
	//set Alt and T to false in pressedKeys
	if(e.keyCode == ALT || e.keyCode == T) {
		pressedKeys['ALT'] = false;
		pressedKeys['T'] = false;
	}

	//leave link search
	if(e.keyCode == ESC) {
		removeUI();
		console.log("leave link search");
	}

	//choose link
	if (e.keyCode == ENTER) {
		clickLink();
		console.log("open link in new tab");
	}
}

addUI = function() {
	srchBar = true;
	$.get(chrome.extension.getURL('search_bar.html'), function(data) {
    	$($.parseHTML(data)).appendTo('body');
    	$('#tab_target_search').focus();
    	$('#tab_target_search').keyup(function() {
    		// remove previously chosen
    		$('.tt_chosen').removeClass('tt_chosen');
    		$('a').removeHighlight();

    		matches = parseDict( $('#tab_target_search').val() );

    		//choose the first
    		chosen_index = 0;
			$(matches[chosen_index]).addClass('tt_chosen');
			$('.tt_chosen span.tt_highlight').css('background-color', '#B0B0B0');
			$('.tt_redDot').css('top' , $('.tt_chosen').offset().top + 3);
			$('.tt_redDot').css('left' , $('.tt_chosen').offset().left - 15);
  			
		});
	});
}

removeUI = function() {
	srchBar = false;
	$('#tab_target_text_box').remove();
}
