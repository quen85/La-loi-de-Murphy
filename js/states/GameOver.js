var LoiDeMurphy = LoiDeMurphy || {};

LoiDeMurphy.GameOver = function(game){};

LoiDeMurphy.GameOver.prototype = {
    create: function(){
        this.splash = this.add.sprite(500, 250, 'gameOver');
        this.splash.anchor.setTo(0.5);
        this.splash.scale.setTo(0.2,0.2);
        var textGameOver = this.game.add.sprite(500,330,"texteGameOver");
        textGameOver.anchor.setTo(0.5);
        textGameOver.scale.setTo(0.4,0.4);
        var playButton = this.game.add.button(500,430,"replay-bouton",this.playTheGame,this);
        playButton.scale.setTo(0.1,0.1);
        playButton.anchor.setTo(0.5,0.5);
    },
    playTheGame: function(){
        this.game.state.start("Game");
    }
};