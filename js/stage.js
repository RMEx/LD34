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
    this.player = null;
};

Graphics.Stage.prototype = {
    
    raw : function() { return this.stage; },

    update_parallaxes_position : function () {
        var that = this;
        this.parallaxes.forEach(function(elt) {
            elt.update(that.ox, that.oy);
        });
    },

    update_general : function () {
        this.events.forEach(function(elt){
            elt(this);
        });
        this.enemies.forEach(function(elt){
            elt.update(this);
        });
        if(this.player != null) {
            this.player.update(this);
        }
    },

    update : function () {
        this.update_parallaxes_position();
        this.update_general();
    },

    addParallax : function(file, sx, sy, ax, ay) {
        var parallax = new Graphics.Parallax(file, sx, sy, ax, ay);
        parallax.render(this);
        this.parallaxes.push(parallax)
    }
};


