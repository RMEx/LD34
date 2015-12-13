var stage = new Graphics.Stage();
stage.addParallax('assets/images/bc.png', 3, 1, 3, 0);
Assets.Audio.test.play();
animate();
function animate() {
    
    requestAnimationFrame(animate);
    stage.update();
    renderer.render(stage.raw());
}
