HealthBar = function(color = 0xFF0000) {
    var tex_bg = PIXI.Texture.fromImage('assets/images/_bg_health.png');
    var tex_fg = PIXI.Texture.fromImage('assets/images/_fg_health.png');

    this.graphics = new PIXI.Container();
    this.color = color;
    this.bg = new PIXI.Sprite(tex_bg);
    this.bg.tint = color;
    this.content = new PIXI.Graphics();
    this.fg = new PIXI.Sprite(tex_fg);
    this.fg.tint = color;

    this.bg.height = 1; // BG will cover content as hero loses health
    this.height = 150

    this.content.beginFill(color);
    this.content.drawRect(0, 0, 30, 150);
    this.graphics.addChild(this.content);
    this.graphics.addChild(this.bg);
    this.graphics.addChild(this.fg);
}

HealthBar.prototype = {
    update: function(evt) {
	if(!evt.detail)
	    return; // Escape from evt is undefineed behavior
	var charac = evt.detail.target;
	var healthBar = charac.healthBar;
	if(!healthBar)
	    return; // If no healthbar, it's a pinguin!
	var percent = charac.health / charac.maxHealth;
	healthBar.update_graphics(percent);
    },
    update_graphics: function(percent) {
	var height = Math.trunc(this.height * percent);
	this.bg.height = Math.max(this.height - height, 1);
    }
}
