var LoiDeMurphy = LoiDeMurphy || {};

LoiDeMurphy.Explanations = function(game){};

LoiDeMurphy.Explanations.prototype = {
    create: function(){
        this.splash = this.add.sprite(400, 200, 'textExplications');
        this.splash.anchor.setTo(0.5);
        this.splash.scale.setTo(1,1);
        var playButton = this.game.add.button(400,500,"go-bouton",this.playTheGame,this);
        playButton.scale.setTo(0.1,0.1);
        playButton.anchor.setTo(0.5,0.5);
    },
    playTheGame: function(){
        this.game.state.start("Game");
    }
};