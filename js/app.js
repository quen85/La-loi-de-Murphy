var game = new Phaser.Game(800, 600, Phaser.AUTO, '', { preload: preload, create: create, update: update });

var player;
var enemy;
var platforms;
var cursors;
var obstacle;
var obstacles =[];

var stars;
var score = 0;
var scoreText;
var myHealthBar;

function preload() {
  game.load.image('sky', 'assets/couloir.jpg');
  game.load.image('ground', 'assets/platform.png');
  game.load.image('star', 'assets/star.png');
  game.load.spritesheet('student', 'assets/dude.png', 32, 48);
  game.load.spritesheet('enemy', 'assets/spriteMechante.png', 25, 51);
}

function create() {
    myHealthBar = new Life({number: 3, x: 200, y: 50});
    //  We're going to be using physics, so enable the Arcade Physics system
    game.physics.startSystem(Phaser.Physics.ARCADE);

    //  A simple background for our game
    game.add.sprite(0, 0, 'sky');

    //  The platforms group contains the ground and the 2 ledges we can jump on
    platforms = game.add.group();

    //  We will enable physics for any object that is created in this group
    platforms.enableBody = true;

    // Here we create the ground.
    var ground = platforms.create(0, game.world.height - 64, 'ground');

    //  Scale it to fit the width of the game (the original sprite is 400x32 in size)
    ground.scale.setTo(2, 2);

    //  This stops it from falling away when you jump on it
    ground.body.immovable = true;



    //## PLAYER

    // The player and its settings
    player = game.add.sprite(32, game.world.height - 150, 'student');

    //  We need to enable physics on the player
    game.physics.arcade.enable(player);

    //  Player physics properties. Give the little guy a slight bounce.
    player.body.bounce.y = 0.2;
    player.body.gravity.y = 300;
    player.body.collideWorldBounds = true;

    //  Our two animations, walking left and right.
    player.animations.add('left', [0, 1, 2, 3], 10, true);
    player.animations.add('right', [5, 6, 7, 8], 10, true);


    //## OBSTACLE

    game.time.events.loop(Phaser.Timer.SECOND * 2, createObstacle, this);


    //## ENEMY

    enemy = game.add.sprite(600, game.world.height - 150, 'enemy');
    game.physics.arcade.enable(enemy);

    enemy.body.bounce.y = 0.2;
    enemy.body.gravity.y = 300;
    enemy.body.collideWorldBounds = true;

    //  The score
    scoreText = game.add.text(16, 16, 'score: 0', { fontSize: '32px', fill: '#000' });
    vieText = game.add.text(16, 50, 'Vies: ' + myHealthBar.number, { fontSize: '32px', fill: '#000' });

    cursors = game.input.keyboard.createCursorKeys();
}

function update() {
  //  Collide the player and the stars with the platforms
    var hitPlatform = game.physics.arcade.collide(player, platforms);
    game.physics.arcade.collide(enemy, platforms);
    game.physics.arcade.collide(stars, platforms);

    //  Checks to see if the player overlaps with any of the stars, if he does call the collectStar function
    game.physics.arcade.overlap(player, obstacles[0], collectStar, null, this);

    if (obstacles[0]) {
      obstacles[0].events.onOutOfBounds.add(function(){
        obstacles.shift();
      }, this);
    }


    //  Reset the players velocity (movement)
    player.body.velocity.x = 0;

    if (cursors.left.isDown)
    {
        //  Move to the left
        player.body.velocity.x = -150;

        player.animations.play('left');
    }
    else if (cursors.right.isDown)
    {
        //  Move to the right
        player.body.velocity.x = 150;

        player.animations.play('right');
    }
    else
    {
        //  Stand still
        player.animations.stop();

        player.frame = 4;
    }

    //  Allow the player to jump if they are touching the ground.
    if (cursors.up.isDown && player.body.touching.down && hitPlatform)
    {
        player.body.velocity.y = -250;
    }
}

function createObstacle() {

    //  A bouncey ball sprite just to visually see what's going on.

    obstacle = game.add.sprite(603, 500, 'star');

    game.physics.enable(obstacle, Phaser.Physics.ARCADE);

    obstacle.body.velocity.x = -150;

    obstacles.push(obstacle);
}

function collectStar (player, obstacle, health) {

    // Removes the star from the screen
    obstacle.kill();
    obstacles.shift();

    //  Add and update the score
    score += 10;
    scoreText.text = 'Score: ' + score;
    myHealthBar.decreaseNumber();
    vieText.text = 'Vies: ' + myHealthBar.number;
}

var Life = function(config){
    this.number = config.number;
    this.setPosition(config.x, config.y);
}

Life.prototype.setPosition= function(x, y){
    this.x = x;
    this.y = y;

    if(this.bgSprite !== undefined && this.barSprite !== undefined){
        this.bgSprite.position.x = x;
        this.bgSprite.position.y = y;

        this.barSprite.position.x = x - this.config.width/2;
        this.barSprite.position.y = y;
    }
}

Life.prototype.decreaseNumber = function(){
    this.number--;
}