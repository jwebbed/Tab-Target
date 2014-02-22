var pressedKeys = {0: false, 1: false, 2: false, 3: false}; //alt, t, tab, enter
var srchLinks = false;

$(document).ready(function () {
	window.addEventListener("keydown", downKey, true);
	window.addEventListener("keyup", upKey, true);
});

function downKey(e) {
	//alt key is pressed
	if(e.keyCode == 18) {
		pressedKeys[0] = true;
	}
	//t key is pressed
	if(e.keyCode == 84) {
		pressedKeys[1] = true;
	}

	var both = (pressedKeys[0] && pressedKeys[1]);
	var neither = (!pressedKeys[0] && !pressedKeys[1]);
	if(both || neither) {
		srchLinks = !srchLinks;
		pressedKeys[0] = !pressedKeys[0];
		pressedKeys[1] = !pressedKeys[1];
		

		if(srchLinks) {
			addUI();
			alert("open things");
		}
		else {
			removeUI();
			alert("close things");
		}
	}
}

function keyUp(e) {
	if(e.keyCode == 9) {
		alert("move to next link");
	}
}

addUI = function() {

	$('.body').append(
		'<div class="tabTargetInput">> <input type="text"> </input> </div>'
		);
}

removeUI = function() {
	$('.body').removeClass('tabTargetInput');
}
