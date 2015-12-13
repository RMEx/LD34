Hero = function(image_path, x, y) {
    var texture = PIXI.Texture.fromImage(image_path);
    this.speed = { x: 0, y: 0 };
    this.velocity = { x: 0, y: 0 };
    this.sprite = new PIXI.Sprite(texture);
    this.sprite.anchor.x = 0.5;
    this.sprite.anchor.y = 1;
}

Hero.prototype = {
    center: function() { return new PIXI.Point(this.x(), this.y()); },
    x: function() { return this.sprite.x; },
    y: function() { return this.sprite.y; }
}
