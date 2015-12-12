Graphics.Parallax =
    function(file, scroll_x, scroll_y, auto_x, auto_y) {
        this.file = file;
        this.scroll_x = scroll_x;
        this.scroll_y = scroll_y;
        this.auto_x = auto_x;
        this.auto_y = auto_y;
    };

Graphics.Parallax.prototype = {
    asTile : function() {
        if (this.tile == undefined) {
            var texture = PIXI.Texture.fromImage(file);
            this.tile = new PIXI.extras.TilingSprite(
                texture,
                renderer.width,
                renderer.height
            );
        }
        return this.tile;
    },

    render : function(stage) {
        stage.raw().addChild(this.asTile());
    }
};
// Ceci est un test

Graphics.Stage = function() {
    this.stage = new PIXI.Container();
    this.parallaxes = [];
};

Graphics.Stage.prototype = {
    raw : function() { return this.stage; },

    addParallax : function(file, sx, sy, ax, ay) {
        var parallax = new Graphics.Parallax(file, sx, sy, ax, ay);
        parallax.render(this);
        this.parallaxes.push(parallax)
    }
};


