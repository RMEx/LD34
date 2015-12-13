Gravity = function(attraction, vxMax, vxMin, vyMax, slowCoef, jumpForce) {
    this.speed = { x: 0, y: 0 };
    this.velocity = { x: 0, y: attraction };
    this.vxMax = vxMax;
    this.vxMin = vxMin;
    this.vyMax = vyMax;
    this.slowCoef = slowCoef;
    this.jumpForce = jumpForce;
    this.isJumping = false;
}

Gravity.prototype = {
    update: function() {
	var sx = this.speed.x + this.velocity.x
	var sy = this.speed.y + this.velocity.y
	this.speed.x = Math.min(Math.max(sx, -this.vxMax), this.vxMax);
	this.speed.y = Math.min(Math.max(sy, -this.vyMax), this.vyMax);
    },

    jump: function() {
	if(!this.isJumping) {
	    this.speed.y = -this.jumpForce;
	    this.isJumping = true;
	}
    },
    forward: function() {
	if(this.speed.x == 0) { this.speed.x = this.vxMin }
	this.velocity.x = 1;
    },
    backward: function() {
	if(this.speed.x == 0) { this.speed.x = -this.vxMin }
	this.velocity.x = -1;
    },
    idle: function() {
	this.velocity.x = 0;
	var sx = this.speed.x * this.slowCoef;
	this.speed.x = sx;
	if(sx > -3 && sx < 3)
	    this.speed.x = 0;
    }
}
