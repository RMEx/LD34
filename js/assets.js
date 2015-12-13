Assets.Audio = {
    test: new Audio('assets/music/test.mp3'),
    feet1: new Audio('assets/music/pas.mp3'),
    feet2: new Audio('assets/music/pas.mp3'),
    pew: [],
    pow: [],

    init: function () {
    	for (var idx=1 ; idx<=10 ; idx++) {
    		this.pew[idx] = new Audio('assets/music/pew/pew' + idx + '.mp3')
    	}

    	for (var idx=1 ; idx<=10 ; idx++) {
    		this.pow[idx] = new Audio('assets/music/pow/pow' + idx + '.mp3')
    	}

    	var that = this;
    	this.feet1.addEventListener('ended', function() {
    		that.feet1.currentTime = 0;
    		that.feet1.play();
		}, false);
		this.feet2.addEventListener('ended', function() {
    		that.feet2.currentTime = 0;
    		that.feet2.play();
		}, false);
    }
}
