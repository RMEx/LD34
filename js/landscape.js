Landscape = function(x, y, points) {
    // draw a shape
    var graphics = new PIXI.Graphics();
    this.graphics = graphics;
    this.graphics.beginFill(0xFF3300);
    this.graphics.moveTo(x, y);
    points.forEach(function(point) {
	graphics.lineTo(point[0], point[1]);
    });
    this.graphics.endFill();
    this.graphics.alpha = 0;
}

Landscape.prototype = {
    containsPoint: function(point) { return this.graphics.containsPoint(point); }
}
