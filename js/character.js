Character = function(charsets, polygons, x, y) {
    this.polygons = polygons;
    this.poses = charsets.length;
    this.charsets = charsets;
    this.movie = new PIXI.extras.MovieClip(charsets.walk);
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
    // this.movie.loop = true;
    this.movie.animationSpeed = 0.3;
    this.movie.play();
    this.shoot = false;
    this.hasShooted = false;
    this.iterator = 0;

    this.isWalking = false;
    this.isJumping = true;
    this.oldY = 0;

    this.maxHealth = 5
    this.health = 5;
}

Character.prototype = {

    startWalkMusic : function () {

    },

    stopWalkMusic : function () {

    },

    startJumpMusic : function () {

    },

    stopJumpMusic : function () {

    },

    bangMusic : function () {

    },

    bang : function() {
        if (!this.hasShooted) {
            this.hasShooted = true;
            this.shoot = true;
        }
    },

    update : function(stage) {
        var pos = new PIXI.Point(this.movie.position.x, this.movie.position.y);
        var nps = this.gravity.update(pos, this.polygons);

        if (this.isWalking &&
            (this.gravity.speed.y > 1 || this.gravity.speed.x == 0)) {
            this.stopWalkMusic();
        }
        
        if (this.isJumping && this.gravity.speed.y == 0 &&
            Math.abs(this.movie.y - this.oldY) > 1) {
            this.stopJumpMusic();
        }
        
        this.movie.position.x = nps.x;
        this.movie.position.y = nps.y;
            this.update_anim();
                              
    },

    update_anim : function() {
        if (this.hasShooted) {
            this.movie._textures = this.charsets.shoot;
            this.movie.play();
            this.bangMusic();
            this.hasShooted = false;
        } else {
            this.movie._textures = this.charsets.walk;
        }
    },

    base : function () {
        return this.movie;
    },
    
    idle : function () {
        if(!this.gravity.isJumping && !this.shoot) {
            this.movie.gotoAndStop(0);
        }
        this.gravity.idle();
    },
    forward : function () {
        if (!this.isWalking && this.gravity.speed.y == 0) {
            this.startWalkMusic();
        }
        this.movie.animationSpeed = 0.3;
        this.movie.play();
        this.movie.scale.x = 1;        
        this.gravity.forward();
    },
    backward : function () {
        if (!this.isWalking && this.gravity.speed.y == 0) {
            this.startWalkMusic();
        }
        this.movie.animationSpeed = 0.3;
        this.movie.play();
        this.movie.scale.x = -1;
        this.gravity.backward();
    },
    jump: function () {
        if (!this.isJumping)
            this.startJumpMusic();
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


Player = function (charset, polygon, x, y, keybinding) {
    
    Character.call(this, charset, polygon, x, y);
    this.keybinding = keybinding;
    if (keybinding == undefined) {
        this.keybinding = default_kb; 
    }
}

Player.prototype = Object.create(Character.prototype);
Player.prototype.update = function(stage) {

    Character.prototype.update.call(this, stage);
    if (Input.keys(this.keybinding.right).isDown) { this.forward(); }
    else if (Input.keys(this.keybinding.left).isDown) { this.backward(); }
    else { this.idle(); }
    if(Input.keys(this.keybinding.up).isTriggered) { this.jump(); }
    if(Input.keys(this.keybinding.down).isTriggered && !this.hasShooted) {
        this.bang();
    } else {
        this.shoot = false
    };
    
}

Player.prototype.bangMusic = function () {
    Assets.Audio.pew[Math.floor((Math.random() * 10) + 1)].play();
};

Player.prototype.startWalkMusic = function () {
    this.isWalking = true;
    Assets.Audio.feet1.play();
};

Player.prototype.stopWalkMusic = function () {
    this.isWalking = false;
    Assets.Audio.feet1.pause();
};

Player.prototype.startJumpMusic = function () {
    this.isJumping = true;
    Assets.Audio.jump.play();
};
Player.prototype.stopJumpMusic = function () {
    this.isJumping = false;
};
