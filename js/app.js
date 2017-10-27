var game = new Phaser.Game(800, 600, Phaser.AUTO, '', { preload: preload, create: create, update: update });

var player;
var enemy;
var platforms;
var cursors;
var obstacle;
var obstacles;
var i = 0;

var stars;
var myHealthBar;


var cursors;
var d;

function preload() {
  game.load.image('sky', 'assets/16.jpg');
  game.load.image('ground', 'assets/platform.png');
  game.load.image('star', 'assets/feuille.png');
  game.load.spritesheet('student', 'assets/player.png', 188, 325);
  game.load.spritesheet('enemy', 'assets/enemy.png', 188, 325);
}

function create() {
    myHealthBar = new Life({number: 3, x: 200, y: 50});

    game.world.resize(3000, 600);
    game.world.setBounds(0, 0, 3000, 600);
    game.physics.startSystem(Phaser.Physics.ARCADE);
    cursors = game.input.keyboard.createCursorKeys();

    background = game.add.tileSprite(0, 0, 3000, 600, 'sky');

    platforms = game.add.group();
    platforms.enableBody = true;

    var ground = platforms.create(0, game.world.height - 32, 'ground');
    ground.scale.setTo(2, 2);
    ground.body.immovable = true;
    ground.fixedToCamera = true;

    //## PLAYER
    player = game.add.sprite(32, game.world.height - 600, 'student');
    game.physics.arcade.enable(player);
    player.body.bounce.y = 0.2;
    player.body.gravity.y = 300;
    player.body.collideWorldBounds = true;
    console.log(player.body.velocity.y);

    player.animations.add('left', [0, 1, 2], 10, true);
    player.animations.add('right', [16, 15, 14], 10, true);
    player.animations.add('jump', [9, 10, 11], 10, true);


    //## OBSTACLE
    obstacles = game.add.group();
    obstacles.enableBody = true;
    obstacles.physicsBodyType = Phaser.Physics.ARCADE;

    game.time.events.loop(Phaser.Timer.SECOND * 2, createObstacle, this);


    //## ENEMY

    enemy = game.add.sprite(600, game.world.height - 600, 'enemy');
    game.physics.arcade.enable(enemy);

    enemy.body.bounce.y = 0.2;
    enemy.body.gravity.y = 300;
    enemy.body.collideWorldBounds = true;

    enemy.animations.add('move', [1, 2, 3, 4, 5], 3, true);

    //  The score
    vieText = game.add.text(16, 50, 'Vies: ' + myHealthBar.number, { fontSize: '32px', fill: '#000' });
    vieText.fixedToCamera = true;

    cursors = game.input.keyboard.createCursorKeys();
}

function update() {
    if (cursors.left.isDown)
    {
        if (cursors.left.shiftKey)
        {
            game.world.rotation -= 0.05;
        }
        else
        {
            game.camera.x -= 2.5;
        }
    }
    else if (cursors.right.isDown)
    {
        if (cursors.right.shiftKey)
        {
            game.world.rotation += 0.05;
        }
        else
        {
            game.camera.x += 2.5;
        }
    }

  //  Collide the player and the stars with the platforms
    var hitPlatform = game.physics.arcade.collide(player, platforms);
    game.physics.arcade.collide(enemy, platforms);
    game.physics.arcade.collide(stars, platforms);

    //  Checks to see if the player overlaps with any of the stars, if he does call the collectStar function
    game.physics.arcade.overlap(player, obstacles, collectStar, null, this);


    //  Reset the players velocity (movement)
    player.body.velocity.x = 0;

    if (cursors.left.isDown)
    {
        //  Move to the left
        player.body.velocity.x = -125;

        player.animations.play('left');
    }
    else if (cursors.right.isDown)
    {
        //  Move to the right
        player.body.velocity.x = 125;

        player.animations.play('right');
    }
    else
    {
        //  Stand still
        player.animations.stop();

        player.frame = 8;
    }

    //  Allow the player to jump if they are touching the ground.
    if (cursors.up.isDown && player.body.touching.down && hitPlatform)
    {
        player.body.velocity.y = -600;
        player.frame = 10;
    }
}

function createObstacle() {

    game.time.events.loop(enemy.animations.play('move'));

    var o = obstacles.create(603, 350, 'star');
    o.width = 30;
    o.height = 30;
    o.name = 'obstacle' + i;
    o.body.velocity.x = -150;

    i++;
    
    // obstacle = game.add.sprite(603, 500, 'star');

    // game.physics.enable(obstacle, Phaser.Physics.ARCADE);


    // obstacles.push(obstacle);

}

function collectStar (player, obstacle, health) {

    // Removes the star from the screen
    obstacle.kill();

    //  Add and update the score
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

function render() {
    game.debug.cameraInfo(game.camera, 32, 32);
}