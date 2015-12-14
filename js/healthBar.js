HealthBar = function(color = 0xFF0000) {
    var tex_bg = PIXI.Texture.fromImage('assets/images/_bg_health.png');
    var tex_fg = PIXI.Texture.fromImage('assets/images/_fg_health.png');
    var healthBar = new PIXI.Container();

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
    healthBar.addChild(this.content);
    healthBar.addChild(this.bg);
    healthBar.addChild(this.fg);

    return healthBar;
}

HealthBar.prototype = {
}
