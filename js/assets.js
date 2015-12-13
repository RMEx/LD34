Assets.Graphics = {
    helice : 'assets/images/helice.png',
}

Assets.Bg = {
    test : 'assets/images/bg/test.png',
}

Assets.Audio = {
    test: new Audio('assets/music/test.mp3'),

    // Characters foot sounds
    feet1: new Audio('assets/music/pas.mp3'),
    feet2: new Audio('assets/music/pas.mp3'),
    penguinFeet: new Audio('assets/music/pas_penguin.mp3'),

    // Characters sounds
    incrust: new Audio('assets/music/incrust.mp3'),
    jump: new Audio('assets/music/jump_hero.mp3'),
    jumpPenguin: [],

    // Death
    death: new Audio('assets/music/death.mp3'),
    penguinDeath: [],

    // Object sounds
    alarm: new Audio('assets/music/alarm.mp3'),

    // Weapons
    pew: [],
    pow: [],
    pow2: [],
    tac: [],

    init: function () {
    	// Load musics
    	for (var idx=1 ; idx<=10 ; idx++) {
    		this.pew[idx] = new Audio('assets/music/pew/pew' + idx + '.mp3');
    		this.pow[idx] = new Audio('assets/music/pow/pow' + idx + '.mp3');
    		this.pow2[idx] = new Audio('assets/music/pow2/pow' + idx + '.mp3');
    		this.tac[idx] = new Audio('assets/music/tac/tac' + idx + '.mp3');
    	}

    	for (var idx=1 ; idx<=5 ; idx++) {
    		this.penguinDeath[idx] = new Audio('assets/music/death_penguin/death' + idx + '.mp3');
    	}

    	for (var idx=1 ; idx<=3 ; idx++) {
    		this.jumpPenguin[idx] = new Audio('assets/music/jump_penguin/jump' + idx + '.mp3');
    	}

    	for (var idx=1 ; idx<=4 ; idx++) {
    		this.voicies[idx] = new Audio('assets/music/voice_penguin/voice' + idx + '.mp3');
    	}



    	// Prepare sounds for infinit repetition
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
