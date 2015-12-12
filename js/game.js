Input.initalizeListeners();

var stage = new Graphics.Stage();
stage.addParallax('assets/images/bc.png', 3, 1, 3, 0);

animate();
function animate() {
    
    requestAnimationFrame(animate);
    stage.update();
    renderer.render(stage.raw());
}
