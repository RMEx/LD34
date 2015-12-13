var stage = new Graphics.Stage();
stage.addParallax('assets/images/bc.png', 3, 1, 3, 0);
Assets.Audio.init();

// Feet sound test
Assets.Audio.pas.play();
/*var play = false;
window.onclick = function () {
	if (play) {
		play = false;
		Assets.Audio.pas.pause();
	} else {
		play = true;
		Assets.Audio.pas.play();
	}
}/**/

animate();
function animate() {
    
    requestAnimationFrame(animate);
    stage.update();
    renderer.render(stage.raw());
}
