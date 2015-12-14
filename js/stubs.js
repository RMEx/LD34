Hero = function(image_path, x, y, landscape) {
    var texture = PIXI.Texture.fromImage(image_path);
    this.sprite = new PIXI.Sprite(texture);
    console.log(texture.width, texture.height); // FIX THIS 0,O
    this.gravity = new Gravity({
	hitbox: new SAT.Box(new SAT.Vector(x, y), 30, 90).toPolygon()
    });
    this.x = x;
    this.y = y;
    this.sprite.x = x;
    this.sprite.y = y;
}


Hero.prototype = {
    update: function() {
	var sprite_pos = new PIXI.Point(this.sprite.x, this.sprite.y);
	var new_pos = this.gravity.update(sprite_pos, gones);
	this.sprite.x = new_pos.x;
	this.sprite.y = new_pos.y;
    },
    // use these to make player move, call idle when nothing is pressed
    idle: function() { this.gravity.idle(); },
    forward: function() { this.gravity.forward(); },
    backward: function() { this.gravity.backward(); },
    jump: function() { this.gravity.jump(); }

}

Landscape = function(x, y, points) {
    this.hitbox = new SAT.Polygon(new SAT.Vector(x,y), points.map(function(pt) { return new SAT.Vector(pt[0], pt[1]) }));

// var landscape = new Landscape(0, 460, [[0,0], [1600, 0], [1600,-130], [0, -130]]);
// var ld2 = new Landscape(300, 160, [[0,0], [300, 0], [300, 500], [0, 500]]);
// var gones = [landscape.hitbox, ld2.hitbox];
// var hero = new Hero("assets/images/_hero.png", 50, 50, landscape);
