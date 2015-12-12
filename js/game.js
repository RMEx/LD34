/* Game Engine */

var renderer = PIXI.autoDetectRenderer(400, 300);
document.body.appendChild(renderer.view);

var stage = new PIXI.Container();
var texture = PIXI.Texture.fromImage("assets/images/bc.png");
var bclogo = new PIXI.Sprite(texture);

bclogo.anchor.x = 0.5;
bclogo.anchor.y = 0.5;


bclogo.position.x = 200;
bclogo.position.y = 150;
stage.addChild(bclogo);

animate();
function animate() { 
	  requestAnimationFrame( animate );
	  // just for fun, lets rotate mr rabbit a little
	  bclogo.rotation += 0.1;
	  // render the stage   
	  renderer.render(stage);
}
