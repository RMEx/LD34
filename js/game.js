var t1 = GameState.addStage('test1', new Graphics.Stage())
    .addParallax('assets/images/bc.png', 3, 1, 0, 0);

var t2 = GameState.addStage('test2', new Graphics.Stage())
    .addParallax('assets/images/wap.png', 3, 1, 3, 0)
    .addSprite(
        new PIXI.Sprite.fromImage('assets/images/bc.png'),
        function(sprite){ sprite.rotation += 0.1; }
    )
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
    GameState.stage.update();
    GameState.stage.render();
}
