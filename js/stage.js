Graphics.Parallax =
    function(file, scroll_x, scroll_y, auto_x, auto_y) {
        
        this.file = file;
        this.scroll_x = scroll_x;
        this.scroll_y = scroll_y;
        this.auto_x = auto_x;
        this.auto_y = auto_y;

        this.asTile = function() {
            if (this.tile == undefined) {
                var texture = PIXI.Texture.fromImage(file);
                this.tile = new PIXI.extras.TilingSprite(
                    texture,
                    renderer.width,
                    renderer.height
                );
            }
            return this.tile;
        }

        this.render = function(stage) {
            stage.raw().addChild(this.asTile());
        }

        
        
    };

Graphics.Stage = function() {
    this.stage = new PIXI.Container();
    this.parallaxes = [];
    this.raw = function() { return this.stage; }
    this.addParallax = function(file, sx, sy, ax, ay) {
        var parallax = new Graphics.Parallax(file, sx, sy, ax, ay);
        parallax.render(this);
        this.parallaxes.push(parallax)
    }
};


