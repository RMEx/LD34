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

Landscape = function(points) {
    this.hitbox = new SAT.Polygon(
        new SAT.Vector(0,0),
        points.map(function(pt) {
            return new SAT.Vector(pt[0], pt[1])
        }));
}

var rect1 = new Landscape(
    [
        [153, 488],
        [153, 488+75],
        [153+988, 488+75],
        [153+988, 488]
    ]
);

a = {x:162,y:56,w:986,h:98};
a = [[a.x,a.y],[a.x+a.w,a.y],[a.x+a.w,a.y+a.h],[a.x,a.y+a.h]];
var rect2 = new Landscape(a);


a = {x:1051,y:373,w:106,h:119};
a = [[a.x,a.y],[a.x+a.w,a.y],[a.x+a.w,a.y+a.h],[a.x,a.y+a.h]];
var rect3 = new Landscape(a);

a = {x:137,y:111,w:114,h:432};
a = [[a.x,a.y],[a.x+a.w,a.y],[a.x+a.w,a.y+a.h],[a.x,a.y+a.h]];
var rect4 = new Landscape(a);


a = {x:981,y:151,w:154,h:231};
a = [[a.x,a.y],[a.x+a.w,a.y],[a.x+a.w,a.y+a.h],[a.x,a.y+a.h]];
var rect5 = new Landscape(a);

a = {x:527,y:359,w:231,h:17};
a = [[a.x,a.y],[a.x+a.w,a.y],[a.x+a.w,a.y+a.h],[a.x,a.y+a.h]];
var rect6 = new Landscape(a);

a = {x:629,y:259,w:350,h:17};
a = [[a.x,a.y],[a.x+a.w,a.y],[a.x+a.w,a.y+a.h],[a.x,a.y+a.h]];
var rect7 = new Landscape(a);


var gones = [
    rect1.hitbox,
    rect2.hitbox,
    rect3.hitbox,
    rect4.hitbox,
    rect5.hitbox,
    rect6.hitbox,
    rect7.hitbox
];
var hero = new Hero("assets/images/_hero.png", 433, 100, gones);

