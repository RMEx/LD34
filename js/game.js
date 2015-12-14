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

    GameState.stage.update();
    GameState.stage.render();
}
