var t1 = GameState.addStage('test1', new Graphics.Stage());
var t2 = GameState.addStage('test2', new Graphics.Stage());

t1.addParallax('assets/images/bc.png', 3, 1, 3, 0);
t2.addParallax('assets/images/wap.png', 3, 1, 3, 0);

t1.addEvent(function(stage){
    if(Input.keys(Input.UP).isDown) {
        GameState.switchStage('test2');
    }
});

t2.addEvent(function(stage){
    if(Input.keys(Input.DOWN).isDown) {
        GameState.switchStage('test1');
    }
});



GameState.switchStage('test1');

animate();
function animate() {
    
    requestAnimationFrame(animate);
    GameState.stage.update();
    GameState.stage.render();
}
