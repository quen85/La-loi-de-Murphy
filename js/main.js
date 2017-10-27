var LoiDeMurphy = LoiDeMurphy || {};

LoiDeMurphy.game = new Phaser.Game(800, 600, Phaser.AUTO, '');

LoiDeMurphy.game.state.add('Boot', LoiDeMurphy.Boot);
//uncomment these as we create them through the tutorial
LoiDeMurphy.game.state.add('MainMenu', LoiDeMurphy.MainMenu);
LoiDeMurphy.game.state.add('GameOver', LoiDeMurphy.GameOver);
LoiDeMurphy.game.state.add('Explanations', LoiDeMurphy.Explanations);
LoiDeMurphy.game.state.add('Game', LoiDeMurphy.Game);

LoiDeMurphy.game.state.start('Boot');