var LoiDeMurphy = LoiDeMurphy || {};

LoiDeMurphy.MainMenu = function(game){};

LoiDeMurphy.MainMenu.prototype = {
    create: function(){
        var music = this.game.sound.play('music');
        this.background = this.add.sprite(0, 0, 'fond');
        this.background.height = this.game.height;
        this.background.width = this.game.width;
        this.splash = this.add.sprite(this.game.world.centerX, this.game.world.centerY, 'logo');
        this.splash.anchor.setTo(0.5);
        this.splash.scale.setTo(0.2,0.2);
        var playButton = this.game.add.button(this.game.world.centerX,this.game.world.centerY + 150,"start-bouton",this.playTheGame,this);
        playButton.scale.setTo(0.1,0.1);
        playButton.anchor.setTo(0.5,0.5);
    },
    playTheGame: function(){
        this.game.state.start("Explanations");
    }
};