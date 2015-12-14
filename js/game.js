var t1 = GameState.addStage('test1', new Graphics.Stage())
    .addParallax('assets/images/bc.png', 3, 1, 0, 0)
    .addEvent(function(stage){
        if(Input.keys(Input.UP).isDown) {
            GameState.switchStage('test2');
        }
    });


var t2 = GameState.addStage('test2', new Graphics.Stage())
    .addHitbox([
        {x:153,y:488,w:988,h:75},
        {x:162,y:56,w:986,h:98},
        {x:1051,y:373,w:106,h:119},
        {x:137,y:111,w:114,h:432},
        {x:981,y:151,w:154,h:231},
        {x:527,y:359,w:231,h:17},
        {x:629,y:259,w:350,h:17}
    ])
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
    .addPlayer(
        Array.apply(null, {length: 8}).map(function(_, i){
            return 'assets/images/charsets/red/red_walk-0' + (i+1) + '.png';
        }), 300, 200
    )
    .addPlayer(
        Array.apply(null, {length: 8}).map(function(_, i){
            return 'assets/images/charsets/blue/blue_walk-0' + (i+1) + '.png';
        }), 350, 200, default_kb2
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
