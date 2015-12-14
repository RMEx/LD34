Gravity = function(params) {
    this.speed = { x: 0, y: 0 }
    this.acc = { x: 0, y: params.attraction || 1  };
    this.sxMax = params.sxMax || 10;
    this.sxMin = params.sxMin || 30;
    this.syMax = params.syMax || 20;
    this.slowCoef = params.slowCoef || 0.8;
    this.jumpForce = params.jumpForce || 20;
    this.run_acc = params.run_acc || 1 ;
    this.hitbox = params.hitbox || console.error("params.hitbox is needed");
    this.isJumping = false;
}

Gravity.prototype = {
    update: function(point, collisionMap) {
	// Speed
	var sx = this.speed.x + this.acc.x;
	var sy = this.speed.y + this.acc.y;
	sx = Math.min(Math.max(sx, -this.sxMax), this.sxMax);
	sy = Math.min(Math.max(sy, -this.syMax), this.syMax);

	var fx = point.x + this.speed.x;
	var fy = point.y + this.speed.y;

	// Colisions
	this.hitbox.pos.x = fx;
	this.hitbox.pos.y = fy;
	var hitbox = this.hitbox;
	var new_pos = new PIXI.Point(fx, fy);
	var isJumping = this.isJumping;
	collisionMap.forEach(function(polygon) {
	    var response = new SAT.Response();
	    var collided = SAT.testPolygonPolygon(hitbox, polygon, response);
	    new_pos = new PIXI.Point(new_pos.x - response.overlapV.x, new_pos.y - response.overlapV.y);
	    if(response.overlapV.x != 0) { sx = 0; }
	    if(response.overlapV.y != 0) { sy = 0;
					   isJumping = false; }
	});

	this.speed.x = sx;
	this.speed.y = sy;
	this.isJumping = isJumping;
	this.hitbox.pos.x = new_pos.x;
	this.hitbox.pos.y = new_pos.y;
	return new_pos;
    },

    jump: function() {
	if(!this.isJumping) {
	    this.speed.y = -this.jumpForce;
	    this.isJumping = true;
	}
    },
    forward: function() {
	if(this.speed.x == 0) { this.speed.x = this.sxMin }
	this.acc.x = this.run_acc;
    },
    backward: function() {
	if(this.speed.x == 0) { this.speed.x = -this.sxMin }
	this.acc.x = -this.run_acc;
    },
    idle: function() {
	this.acc.x = 0;
	var sx = this.speed.x * this.slowCoef;
	this.speed.x = sx;
	if(sx > -this.sxMin && sx < this.sxMin)
	    this.speed.x = 0;
    }
}
