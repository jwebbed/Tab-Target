var dict = [], matches = [], chosen_index = 0;
var all_links;
var srchBar = false;

// key constants
var ALT = 18,
	T = 84,
	TAB = 9,
	ENTER = 13,
	ESC = 27;

/* run when page is open */
$(document).ready(function () {
	window.addEventListener("keydown", downKey, true);
	window.addEventListener("keyup", upKey, true);

	all_links = $('a');
	
	for (var i = 0; i < all_links.length; i++ ) {
		if (all_links[i].innerText.length > 0) {
			dict.push({
				key: all_links[i].innerText.toLowerCase(),
				value: all_links[i]
			});
		}
	}
});

/* update matches dictionary */
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

/* click currently selected link */
function clickLink() {
	$('.tt_chosen')[0].click();
}

/* keydown listener */
function downKey(e) {
	//alt + T
	if(e.altKey && e.keyCode === T && !srchBar) {
		addUI();
		console.log("open link search");
	}

	//tab moves forward
	if(!e.shiftKey && e.keyCode == TAB && $('.tt_redDot').length > 0) {
		e.preventDefault();

    	//remove old chosen and replace
    	$(matches[chosen_index]).removeClass('tt_chosen');
    	if(chosen_index < matches.length - 1) {
    		chosen_index += 1;
    	}
    	else{
    		chosen_index = 0;
    	}
    	
    	updateChosenMatch();
	}

	//shift + tab moves backward
	if(e.shiftKey && e.keyCode == TAB && srchBar) {
		e.preventDefault();

		console.log("shifting backwards.");
		//remove old chosen and replace
    	$(matches[chosen_index]).removeClass('tt_chosen');
    	if(chosen_index > 0) {
    		chosen_index -= 1;
    	}
    	else{
    		chosen_index = matches.length - 1;
    	}
    	
    	updateChosenMatch();
	}
}

/* keyup listener */
function upKey(e) {
	//leave link search
	if(e.keyCode == ESC) {
		removeUI();
	}

	// enter pressed + in link searching state
	if (e.keyCode == ENTER && srchBar) {
		clickLink();
		removeUI();
	}
}

/* create link search */
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

    		updateChosenMatch();
		});
	});
}

/* remove link search */
removeUI = function() {
	srchBar = false;
	$('#tab_target_text_box').remove();
	$('.tt_redDot').remove();
	$('.tt_chosen').removeClass('tt_chosen');
	$('a').removeHighlight();
}

/* update chosen match */
updateChosenMatch = function() {
    $(matches[chosen_index]).addClass('tt_chosen');
	$('.tt_chosen span.tt_highlight').css('background-color', '#B0B0B0');
	$('.tt_redDot').css('top' , $('.tt_chosen').offset().top + ($('.tt_chosen').height())/2 - 5);
	$('.tt_redDot').css('left' , $('.tt_chosen').offset().left - 15);
}
