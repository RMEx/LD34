Assets.Audio = {
    test: new Audio('assets/music/test.mp3'),
    pas: new Audio('assets/music/pas.mp3'),

    init: function () {
    	var that = this;
    	this.pas.addEventListener('ended', function() {
    		that.pas.currentTime = 0;
    		that.pas.play();
		}, false);
    }
}
