var stage = new Graphics.Stage();
stage.addParallax('assets/images/bc.png', 3, 1, 3, 0);
Assets.Audio.test.play();

var landscape = new Landscape(0, 460, [[0,460],[0, 330],[1600,330],[1600, 460]]);
var hero;

// Landscape
stage.addParallax("assets/images/_rocks_front.png", 0, 0, 0, 0);

// Hero
hero = new Hero("assets/images/_hero.png", 50, 50);
stage.raw().addChild(hero.sprite);
stage.raw().addChild(landscape.graphics);

animate();
function animate() {
    requestAnimationFrame(animate);
    stage.update();
    if(Input.keys(Input.LEFT).isDown) { hero.sprite.x -= 2; }
    if(Input.keys(Input.RIGHT).isDown) { hero.sprite.x += 2; }
    if(Input.keys(Input.UP).isDown) { hero.sprite.y -= 2; }
    if(Input.keys(Input.DOWN).isDown) { hero.sprite.y += 2; }

    var point = hero.center();
    var collided = landscape.containsPoint(point);
    if(collided) { console.log("AAAAH"); }

    renderer.render(stage.raw());
}
