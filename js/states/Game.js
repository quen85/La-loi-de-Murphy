var LoiDeMurphy = LoiDeMurphy || {};

LoiDeMurphy.Game = function(game){};

LoiDeMurphy.Game.prototype = {

preload: function() {
    this.game.load.image('sky', 'assets/16.jpg');
    this.game.load.image('ground', 'assets/platform.png');
    this.game.load.image('star', 'assets/feuille.png');
    this.game.load.spritesheet('enemy', 'assets/enemy.png', 188, 325);
    this.game.load.spritesheet('student', 'assets/player.png', 188, 325);
},

create: function() {
    myHealthBar = new Life({number: 3, x: 200, y: 50});

    this.game.world.resize(3000, 600);
    this.game.world.setBounds(0, 0, 3000, 600);
    this.game.physics.startSystem(Phaser.Physics.ARCADE);
    this.cursors = this.game.input.keyboard.createCursorKeys();

    this.background = this.game.add.tileSprite(0, 0, 3000, 600, 'sky');

    this.platforms = this.game.add.group();
    this.platforms.enableBody = true;

    var ground = this.platforms.create(0, this.game.world.height - 32, 'ground');
    ground.scale.setTo(2, 2);
    ground.body.immovable = true;
    ground.fixedToCamera = true;



    //## PLAYER
    this.player = this.game.add.sprite(32, this.game.world.height - 600, 'student');
    this.game.physics.arcade.enable(this.player);
    this.player.body.bounce.y = 0.2;
    this.player.body.gravity.y = 300;
    this.player.body.collideWorldBounds = true;

    this.player.animations.add('left', [0, 1, 2], 10, true);
    this.player.animations.add('right', [16, 15, 14], 10, true);
    this.player.animations.add('jump', [9, 10, 11], 10, true);


    //## OBSTACLE
    this.obstacles = this.game.add.group();
    this.obstacles.enableBody = true;
    this.obstacles.physicsBodyType = Phaser.Physics.ARCADE;

    this.game.time.events.loop(Phaser.Timer.SECOND * 2, this.createObstacle, this);


    //## ENEMY

    this.enemy = this.game.add.sprite(600, this.game.world.height - 600, 'enemy');
    this.game.physics.arcade.enable(this.enemy);

    this.enemy.body.bounce.y = 0.2;
    this.enemy.body.gravity.y = 300;
    this.enemy.body.collideWorldBounds = true;

    this.enemy.animations.add('move', [1, 2, 3, 4, 5], 3, true);

    //  The score
    this.vieText = this.game.add.text(16, 50, 'Vies: ' + myHealthBar.number, { fontSize: '32px', fill: '#000' });
    this.vieText.fixedToCamera = true;

    this.cursors = this.game.input.keyboard.createCursorKeys();
},

update: function() {
    if (this.cursors.left.isDown)
    {
        if (this.cursors.left.shiftKey)
        {
            this.game.world.rotation -= 0.05;
        }
        else
        {
            this.game.camera.x -= 2.5;
        }
    }
    else if (this.cursors.right.isDown)
    {
        if (this.cursors.right.shiftKey)
        {
            this.game.world.rotation += 0.05;
        }
        else
        {
            this.game.camera.x += 2.5;
        }
    }

    //  Collide the this.player and the stars with the platforms
    var hitPlatform = this.game.physics.arcade.collide(this.player, this.platforms);
    this.game.physics.arcade.collide(this.enemy, this.platforms);
    this.game.physics.arcade.collide(this.stars, this.platforms);

    //  Checks to see if the this.player overlaps with any of the stars, if he does call the collectStar function
    this.game.physics.arcade.overlap(this.player, this.obstacles, this.collectStar, null, this);


    //  Reset the this.players velocity (movement)
    this.player.body.velocity.x = 0;

    if (this.cursors.left.isDown)
    {
        //  Move to the left
        this.player.body.velocity.x = -125;

        this.player.animations.play('left');
    }
    else if (this.cursors.right.isDown)
    {
        //  Move to the right
        this.player.body.velocity.x = 125;
        this.player.animations.play('right');
    }
    else
    {
        //  Stand still
        this.player.animations.stop();

        this.player.frame = 8;
    }

    //  Allow the this.player to jump if they are touching the ground.
    if (this.cursors.up.isDown && this.player.body.touching.down && hitPlatform)
    {
        this.player.body.velocity.y = -600;
    }
},
createObstacle: function() {

    this.game.time.events.loop(this.enemy.animations.play('move'));

    var o = this.obstacles.create(603, 350, 'star');
    o.width = 30;
    o.height = 30;
    o.name = 'obstacle' + this.i;
    o.body.velocity.x = -150;

    this.i++;

    // obstacle = game.add.sprite(603, 500, 'star');

    // game.physics.enable(obstacle, Phaser.Physics.ARCADE);


    // obstacles.push(obstacle);

},

collectStar: function(player, obstacle, health) {

    // Removes the star from the screen
    obstacle.kill();

    //  Add and update the score
    myHealthBar.decreaseNumber();
    this.vieText.text = 'Vies: ' + myHealthBar.number;
},

};



var Life = function(config){
    this.number = config.number;
    this.setPosition(config.x, config.y);
}

Life.prototype.setPosition= function(x, y){
    this.x = x;
    this.y = y;
}

Life.prototype.decreaseNumber = function(){
    this.number--;
}