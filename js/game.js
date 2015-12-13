var landscape = new Landscape(0, 460, [[0,0], [1600, 0], [1600,-130], [0, -130]]);

var hero = new Hero("assets/images/_hero.png", 50, 50, landscape);

var t1 = GameState.addStage('test1', new Graphics.Stage())
    .addParallax('assets/images/bc.png', 3, 1, 0, 0)
    .addEvent(function(stage){
        if(Input.keys(Input.UP).isDown) {
            GameState.switchStage('test2');
        }
    });


var t2 = GameState.addStage('test2', new Graphics.Stage())
    .addParallax('assets/images/bg/test.png', 1, 1, 0, 0)
    .addSprite(
        new PIXI.Sprite.fromImage('assets/images/helice.png'),
        function(sprite) {
            sprite.rotation += 0.15;
        },
        function(sprite) {
            sprite.anchor.x = 0.5;
            sprite.anchor.y = 0.5; 
            sprite.position.x = 433;
            sprite.position.y = 347;
        }
    )
    .addSprite(hero.sprite)
    .addEvent(function(stage){
        if(Input.keys(Input.DOWN).isDown) {
            GameState.switchStage('test1');
        }
    });




console.log("go");
GameState.switchStage('test2');

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
