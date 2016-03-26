const HEIGHT = 50;
const WIDTH = 50;
const MAX_VISIBILITY = 1000;
const THICKNESS_RAY = 10;

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
            WIDTH, HEIGHT
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

    this.maxHealth = 30
    this.health = this.maxHealth;
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
    },
    hurt: function(stage) {
        this.health -= 1;
    },
    raycastToHitbox: function(ray, hitboxStage) {
        var collided = false
        hitboxStage.forEach(function(hitbox) {
            var response = new SAT.Response();
            collided = SAT.testPolygonPolygon(ray.toPolygon(), hitbox, response)
            // continue the loop is unnecessary
            if (collided) {
                return;
            }
        });
        return collided;
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

    this.healthBar = new HealthBar(tnt || 0xFF0000);
    this.color = tnt;
    document.addEventListener('updateHealthBar', this.healthBar.update, false)

    this.keybinding = keybinding;
    if (keybinding == undefined) {
        this.keybinding = default_kb; 
    }
}

Player.prototype = Object.create(Character.prototype);
Player.prototype.update = function(stage) {
    Character.prototype.update.call(this, stage);
    if(Input.keys("P").isTriggered) { this.hurt(stage); }
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

Player.prototype.hurt = function(stage) {
    Character.prototype.hurt.call(this, stage);
     // Update healthBar event
    var event = new CustomEvent(
        "updateHealthBar",
        {
            detail: {
            target: this,
        },
            bubbles: true,
            cancelable: false
        }
    );
    document.dispatchEvent(event);

    if(this.health == 0) {
        console.log("is dead");
        stage.removePlayer(this);
    }
};

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

Enemy = function (charset, polygon, x, y) {
    Character.call(this, charset, polygon, x, y);
}

Enemy.prototype = Object.create(Character.prototype);


Enemy.prototype.hurt = function(stage) {
    Character.prototype.hurt.call(this, stage);
    if(this.health == 0) {
        stage.removeEnemy(this);
    }
}


Enemy.prototype.update = function(stage) {
    Character.prototype.update.call(this, stage);
    this.idle();
    if(this.shouldIKill(stage)){this.bang()}
    else {this.shoot = false}
}

Enemy.prototype.shouldIKill = function(stage) {
    var shouldIKill = true;
    var that = this;
    var direction =  new SAT.Vector(this.movie.scale.x, this.movie.scale.y);
    const eye = 40;
    var eyePosition = this.movie.y + eye;
    var hitbox = this.gravity.hitbox;
    stage.players.some(function(player) {
        shouldIKill = true;
        if( ((player.movie.position.x >= that.movie.position.x) && direction.x == -1) ||
            ((player.movie.position.x <= that.movie.position.x) && direction.x == 1) ) {
            shouldIKill = false;
        }

        if( eyePosition > (player.movie.position.y + HEIGHT) ||
            eyePosition < player.movie.position.y ) {
            shouldIKill = false;
        }

        var ray = new SAT.Box(
            new SAT.Vector(that.movie.position.x, eyePosition),
            Math.abs(player.movie.position.x - that.movie.position.x), THICKNESS_RAY
        );
        if( that.raycastToHitbox(ray, stage.hitbox)) {
            shouldIKill = false;
        }

        if(shouldIKill) {
            // break the "some" function
            return true;
        }
    });
    return shouldIKill;
}
