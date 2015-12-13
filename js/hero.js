Hero = function(image_path, x, y, landscape) {
    var texture = PIXI.Texture.fromImage(image_path);
    this.sprite = new PIXI.Sprite(texture);
    console.log(texture.width, texture.height); // FIX THIS 0,O
    this.hitbox = new SAT.Box(new SAT.Vector(x, y), 30, 90);
    this.gravity = new Gravity(3, 10, 30, 40, 0.8, 40);
    this.x = x;
    this.y = y;
}


Hero.prototype = {
    update: function() {
	      this.gravity.update();
	      var fx = this.x + this.gravity.speed.x;
	      var fy = this.y + this.gravity.speed.y;

	// Colisions calculs
	this.hitbox.pos.x = fx;
	this.hitbox.pos.y = fy;
	var response = new SAT.Response();
	var collided = SAT.testPolygonPolygon(hero.hitbox.toPolygon(), landscape.hitbox, response);

	if(!collided) {
	    this.x = fx;
	    this.y = fy;
	} else {
	    this.x = fx - response.overlapV.x;
	    this.y = fy - response.overlapV.y;
	    this.gravity.isJumping = false;
	    if(response.overlapV.x != 0) { this.gravity.speed.x = 0 }
	    if(response.overlapV.y != 0) { this.gravity.speed.y = 0 }
	}

	this.sprite.x = this.x;
	this.sprite.y = this.y;
	this.hitbox.pos.x = this.x;
	this.hitbox.pos.y = this.y;

    },
    idle: function() { this.gravity.idle(); },
    forward: function() { this.gravity.forward(); },
    backward: function() { this.gravity.backward(); },
    jump: function() { this.gravity.jump(); }

}
