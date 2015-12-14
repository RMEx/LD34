Character = function(charsets, polygons, x, y) {
    this.polygons = polygons;
    this.poses = charsets;
    this.movie = PIXI.extras.MovieClip.fromImages(charsets);
    this.movie.position.x = x;
    this.movie.position.y = y;
    this.gravity = new Gravity({
        hitbox:new SAT.Box(
            new SAT.Vector(0, 0),
            50, 50
        ).toPolygon()
        
    });
    this.movie.anchor.x = 0.5;
    this.movie.anchor.y = 1;
    this.movie.loop = true;
    this.movie.animationSpeed = 0.3;
    this.movie.play();
}

Character.prototype = {

    update : function(stage) {
        var pos = new PIXI.Point(this.movie.position.x, this.movie.position.y);
        var nps = this.gravity.update(pos, this.polygons);
        this.movie.position.x = nps.x;
        this.movie.position.y = nps.y;
                              
    },

    base : function () {
        return this.movie;
    },
    
    idle : function () {
        if(!this.gravity.isJumping) {
            this.movie.gotoAndStop(0);
        }
        this.gravity.idle();
    },
    forward : function () {
        this.movie.animationSpeed = 0.3;
        this.movie.play();
        this.movie.scale.x = 1;        
        this.gravity.forward();
    },
    backward : function () {
        this.movie.animationSpeed = 0.3;
        this.movie.play();
        this.movie.scale.x = -1;
        this.gravity.backward();
    },
    jump: function () {
        this.movie.animationSpeed = 0.8;
        this.movie.play();
        this.gravity.jump();
    }
    
}

var default_kb = {
    up: Input.UP,
    down: Input.DOWN,
    left: Input.LEFT,
    right: Input.RIGHT
}


var default_kb2 = {
    up: Input.UP2,
    down: Input.DOWN2,
    left: Input.LEFT2,
    right: Input.RIGHT2
}


Player = function (charset, polygon, x, y, keybinding, tnt) {
    
    Character.call(this, charset, polygon, x, y);
    this.keybinding = keybinding;
    if (keybinding == undefined) {
        this.keybinding = default_kb; 
    }
    if (tnt != undefined) {
        console.log('tamer');
        this.movie.tint = tnt;
    }
}

Player.prototype = Object.create(Character.prototype);
Player.prototype.update = function(stage) {

    Character.prototype.update.call(this, stage);
    if (Input.keys(this.keybinding.right).isDown) { this.forward(); }
    else if (Input.keys(this.keybinding.left).isDown) { this.backward(); }
    else { this.idle(); }
    if(Input.keys(this.keybinding.up).isTriggered) { this.jump(); }
    
}
