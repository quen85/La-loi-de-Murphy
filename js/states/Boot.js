var LoiDeMurphy = LoiDeMurphy || {};

LoiDeMurphy.Boot = function(){};

//setting game configuration and loading the assets for the loading screen
LoiDeMurphy.Boot.prototype = {
    preload: function() {
        //assets we'll use in the loading screen
        this.load.image('logo', 'assets/logo.png');
        this.load.image('fond', 'assets/fond-start.jpg');
        this.load.image('start-bouton', 'assets/boutonStart.png');
        this.load.image('gameOver', 'assets/GameOver.png');
        this.load.image('texteGameOver', 'assets/texteGameOver.png');
        this.load.image('fondGameOver', 'assets/fondGameOver.jpg');
        this.load.image('iconeVie', 'assets/mecontentementIcon.png');
        this.load.image('replay-bouton', 'assets/BoutonTryAgain.png');
        this.load.image('textExplications', 'assets/TextExplications.png');
        this.load.image('go-bouton', 'assets/BoutonGo.png');
        this.load.audio('music', 'assets/music.mp3');
    },
    create: function() {
        //loading screen will have a white background
        this.game.stage.backgroundColor = '#000';

        //have the game centered horizontally
        this.scale.pageAlignHorizontally = true;

        //physics system for movement
        this.game.physics.startSystem(Phaser.Physics.ARCADE);

        this.state.start('MainMenu');
    }
};