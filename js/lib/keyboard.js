// HOW TO USE KEYBOARD !!

// key = Input.keys("A") => get the key A
// ---- Attributes ----
// key.code
// key.isDown
// key.isUp
// key.isTriggered

Input.keyboard = {}

// Constants
Input.DOWN = '('
Input.LEFT = '%'
Input.RIGHT = "'"
Input.UP = '&'

Input.keys = function(chr) {
    var key = Input.keyboard[chr];
    if (key != null)
	return key;

    key = {};
    // Attributes
    key.code = chr;
    key.isDown = false;
    key.isUp = true;
    key.isTriggered = false;

    key.up = function() {
	key.isTriggered = false;
	key.isDown = false;
	key.isUp = true;
    }
    key.down = function() {
	key.isTriggered = false;
	if(key.isUp && !key.isTriggered)
	    key.isTriggered = true;
	key.isDown = true;
	key.isUp = false;
    }

    Input.keyboard[chr] = key;
    return key;
}

Input.initalizeListeners = function() {
    downHandler = function(event) {
	var chr = String.fromCharCode(event.keyCode);
	Input.keys(chr).down();
	event.preventDefault();
    }
    upHandler = function(event) {
	var chr = String.fromCharCode(event.keyCode);
	Input.keys(chr).up();
	event.preventDefault();
    }

    window.addEventListener("keydown", downHandler, false);
    window.addEventListener("keyup", upHandler, false);
}
Input.initalizeListeners();

