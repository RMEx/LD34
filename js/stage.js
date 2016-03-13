Graphics.Parallax =
    function(file, scroll_x, scroll_y, auto_x, auto_y) {
        this.file = file;
        this.scroll_x = scroll_x;
        this.scroll_y = scroll_y;
        this.auto_x = auto_x;
        this.auto_y = auto_y;
        this.rscroll_x = 0;
        this.rscroll_y = 0; 
    };

Graphics.Parallax.prototype = {
    asTile : function() {
        if (this.tile == undefined) {
            var texture = PIXI.Texture.fromImage(this.file);
            this.tile = new PIXI.extras.TilingSprite(
                texture,
                renderer.width,
                renderer.height
            );
            this.scroll_width = this.tile.width;
            this.scroll_height = this.tile.height;
        }
        return this.tile;
    },

    update: function(ox, oy) {
        this.asTile();
        var xs = 0.5 * this.scroll_x;
        var ys = 0.5 * this.scroll_y;
        this.rscroll_x = (this.rscroll_x + this.auto_x)
        this.rscroll_y = (this.rscroll_y + this.auto_y)
        this.tile.tilePosition.x = this.rscroll_x + (ox * xs);
        this.tile.tilePosition.y = this.rscroll_y + (oy * ys);
    },

    render : function(stage) {
        stage.raw().addChild(this.asTile());
    }
};
// Ceci est un test

Graphics.Stage = function() {
    this.ox = 0;
    this.oy = 0;
    this.stage = new PIXI.Container();
    this.parallaxes = [];
    this.events = [];
    this.enemies = [];
    this.players = [];
    this.sprites = [];
    this.hitbox = null;
    this.pause = true;
};

Graphics.Stage.prototype = {
    
    raw : function() { return this.stage; },

    render: function() { renderer.render(this.raw()); },

    addEvent: function(callback) {
        this.events.push(callback);
        return this;
    },

    addHitbox : function(list) {
        this.hitbox = 
            list.map(function(a){
                return new Polygon([
                    [a.x,a.y],
                    [a.x+a.w,a.y],
                    [a.x+a.w,a.y+a.h],
                    [a.x,a.y+a.h]
                ]).hitbox
            });
        
        return this;
    },

    addPlayer: function(chars, x, y, keybinding, tnt, hbCoords) {
        var character = new Player(
            chars,
            this.hitbox,
            x,
            y,
            keybinding,
	    tnt
        );
        this.players.push(character);
        character.movie.position.x = x;
        character.movie.position.y = y;
        this.raw().addChild(character.movie);
        character.healthBar.graphics.position.x = hbCoords.x;
        character.healthBar.graphics.position.y = hbCoords.y;
        this.raw().addChild(character.healthBar.graphics);
        return this;
    },

    removePlayer: function(character) {
        var index = this.players.indexOf(character);
        if( index < 0 || index > this.players.length)
        {
            throw new Error("in RemovePlayer function: "+ index + "is out of range");
        }
        this.raw().removeChild(character.movie);
        this.players.slice(index, 1);
    },

    addSprite: function(sprite, callback, append) {
        this.sprites.push({sprite:sprite, update:callback});
        if(append != undefined) { append(sprite); }
        this.raw().addChild(sprite);
        return this;
    },

    addColisionPath : function(points) {
        return this;
    },

    update_parallaxes_position : function () {
        var that = this;
        this.parallaxes.forEach(function(elt) {
            elt.update(that.ox, that.oy);
        });
    },

    update_sprites : function () {
        this.sprites.forEach(function(elt) {
            if (elt.update != undefined) {
                elt.update(elt.sprite);
            }
        });
    },

    update_general : function () {
        that = this;
        this.events.forEach(function(elt){
            elt(that);
        });
        this.enemies.forEach(function(elt){
            elt.update(that);
        });
        this.update_sprites();
        this.players.forEach(function(elt){
            elt.update(that);
        });
    },

    stop : function() {
        this.pause = true;
    },

    resume : function() {
        this.pause = false;
    },

    update : function () {
        if(!this.pause){
            this.update_parallaxes_position();
            this.update_general();
        }
    },

    addParallax : function(file, sx, sy, ax, ay) {
        var parallax = new Graphics.Parallax(file, sx, sy, ax, ay);
        parallax.render(this);
        this.parallaxes.push(parallax)
        return this;
    }
};



// Monkeypatching examples

// Graphics.TestStage = function() {
//     Graphics.Stage.call(this);
//     this.machin = 'lol';
// }

// Graphics.TestStage.prototype = Object.create(Graphics.Stage.prototype);
// Graphics.TestStage.prototype.update = function () {
//     Graphics.Stage.prototype.update.call(this);
//     console.log(this.machin);
// }
