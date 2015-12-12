var stage = new Graphics.Stage();
stage.addParallax('assets/images/bc.png')

animate();
function animate() {
    requestAnimationFrame(animate);

    renderer.render(stage.raw());
}
