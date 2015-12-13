var landscape = new Landscape(0, 460, [[0,0], [1600, 0], [1600,-130], [0, -130]]);
var hero = new Hero("assets/images/_hero.png", 50, 50, landscape);

var t1 = GameState.addStage('test1', new Graphics.Stage())
    .addParallax('assets/images/bc.png', 3, 1, 0, 0);

var t2 = GameState.addStage('test2', new Graphics.Stage())
    .addParallax('assets/images/wap.png', 3, 1, 3, 0)
    .addParallax("assets/images/_rocks_front.png", 0, 0, 0, 0)
    .addSprite(
        new PIXI.Sprite.fromImage('assets/images/bc.png'),
        function(sprite){ sprite.rotation += 0.1; }
    )
    .addSprite(hero.sprite)
    .addEvent(function(stage){
        if(Input.keys(Input.DOWN).isDown) {
            GameState.switchStage('test1');
        }
    });

console.log("go");
GameState.switchStage('test1');

animate();
function animate() {
    
    requestAnimationFrame(animate);

    if(Input.keys(Input.RIGHT).isDown) {
	hero.forward();
    } else if(Input.keys(Input.LEFT).isDown) {
    	hero.backward();
    } else { hero.idle(); }

    if(Input.keys(Input.UP).isTriggered) {
    	hero.jump();
    }

    hero.update();

    GameState.stage.update();
    GameState.stage.render();
}
