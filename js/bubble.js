// USAGE !
// var bubble = new PIXI.Container();
// var graphics = new Bubble(50, 50, "Salut", 0x0000FF, 0x00FF00).graphics
// bubble.addChild(graphics);
Bubble = function(x, y, w, h, text, fill_color, line_color) {
    // Rectangular bubbles

    // this.graphics.lineStyle(4, fill_color, 1);
    // this.graphics.beginFill(line_color, 1);
    // this.graphics.moveTo(w/4+x, y+(h*0.9));
    // this.graphics.lineTo(w/10+x, y+(h*1.3));
    // this.graphics.lineTo(w/3+x, y+(h*0.95));
    // this.graphics.endFill();

    // this.graphics.lineStyle(2, fill_color, 1);
    // this.graphics.beginFill(line_color, 1);
    // this.graphics.drawRoundedRect(x, y, w, h, 50);
    // this.graphics.endFill();

    // this.graphics.lineStyle(0);
    // this.graphics.beginFill(line_color, 1);
    // this.graphics.moveTo(w/4+x, y+(h*0.9));
    // this.graphics.lineTo(w/10+x, y+(h*1.3));
    // this.graphics.lineTo(w/3+x, y+(h*0.95));
    // this.graphics.endFill();


    // var a = {x: -w/3, y: -h}
    // var b = {x: -7*w/12, y: -h * 1.5}
    // var c = {x: -5*w/12, y: -h}

    var a = {x: x-(w*0.4), y: y+(h*0.8)};
    var b = {x: x-(w*0.7), y: y+(h*1.3)};
    var c = {x: x-(w*0.6), y: y+(h*0.5)};

    this.sprite = new PIXI.Container();
    var graphics = new PIXI.Graphics();

    graphics.lineStyle(4, fill_color, 1);
    graphics.beginFill(line_color, 1);
    graphics.moveTo(a.x, a.y);
    graphics.lineTo(b.x, b.y);
    graphics.lineTo(c.x, c.y);
    graphics.endFill();

    graphics.lineStyle(2, fill_color, 1);
    graphics.beginFill(line_color, 1);
    graphics.drawEllipse(x, y, w, h);
    graphics.endFill();

    graphics.lineStyle(0);
    graphics.beginFill(line_color, 1);
    graphics.moveTo(a.x, a.y);
    graphics.lineTo(b.x, b.y);
    graphics.lineTo(c.x, c.y);
    graphics.endFill();

    this.sprite.addChild(graphics);

    this.evt = document.createEvent("Event");
    this.evt.initEvent("bubble_word_sound",true,true);
    document.addEventListener("bubble_word_sound",this.play_sound,false);

    this.tick = 0;
    this.maxTick = 60;

    this.current_text = "heeee";
    this.remaining_text = text;
//    this.graphics_for_text = new PIXI.Text("", { font: 'bold italic 60px Arvo', fill: '#3e1707', align: 'center', stroke: '#a4410e', strokeThickness: 7 });
//    this.graphics_for_text.position.x = x;
//    this.graphics_for_text.position.y = y;
}

Bubble.prototype = {
    play_sound: function() {
	console.log("here is a sound");
    },
    update: function() {
	this.tick += 1;
	if(this.tick == this.maxTick) {
	    this.display_next_letter();
	    this.tick = 0;
	}
    },
    display_next_letter: function() {
	console.log("LETTER");
	//document.dispatchEvent(this.evt);
    }
}
