// USAGE !
// var bubble = new PIXI.Container();
// var graphics = new Bubble(50, 50, "Salut", 0x0000FF, 0x00FF00)
// bubble.addChild(graphics);
Bubble = function(x, y, text, fill_color, line_color) {
    var w = 1000;
    var h = 300;
    graphics = new PIXI.Graphics();

    // Rectangular bubbles

    // graphics.lineStyle(4, fill_color, 1);
    // graphics.beginFill(line_color, 1);
    // graphics.moveTo(w/4+x, y+(h*0.9));
    // graphics.lineTo(w/10+x, y+(h*1.3));
    // graphics.lineTo(w/3+x, y+(h*0.95));
    // graphics.endFill();

    // graphics.lineStyle(2, fill_color, 1);
    // graphics.beginFill(line_color, 1);
    // graphics.drawRoundedRect(x, y, w, h, 50);
    // graphics.endFill();

    // graphics.lineStyle(0);
    // graphics.beginFill(line_color, 1);
    // graphics.moveTo(w/4+x, y+(h*0.9));
    // graphics.lineTo(w/10+x, y+(h*1.3));
    // graphics.lineTo(w/3+x, y+(h*0.95));
    // graphics.endFill();


    // var a = {x: -w/3, y: -h}
    // var b = {x: -7*w/12, y: -h * 1.5}
    // var c = {x: -5*w/12, y: -h}

    var a = {x: x-(w*0.4), y: y+(h*0.8)};
    var b = {x: x-(w*0.7), y: y+(h*1.3)};
    var c = {x: x-(w*0.6), y: y+(h*0.5)};
    graphics = new PIXI.Graphics();

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

    return graphics;
}
