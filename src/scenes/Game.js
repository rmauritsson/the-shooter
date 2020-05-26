import { Beam } from './Beam';
import LeaderboardAPI from '../leaderboardAPI';

export class Game extends Phaser.Scene {
  constructor(playerName) {
    super('playGame');
    this.user = JSON.parse(localStorage.getItem('playerName'));
    this.score = 0;
    this.gameOver = false;
  }

  create = () => {
    this.background = this.add.tileSprite(400, 300, 800, 600, 'background');

    this.rocinante = this.add.sprite(350, 300, 'rocinante');
    this.rocinante.setScale(2);
    this.nauvoo = this.add.sprite(400, 300, 'nauvoo');
    this.nauvoo.setScale(2);
    this.agatha = this.add.sprite(450, 300, 'agatha');
    this.agatha.setScale(2);

    this.anims.create({
      key: 'rocinante_anim',
      frames: this.anims.generateFrameNumbers('rocinante', { start: 0, end: 1 }),
      frameRate: 10,
      repeat: -1,
    });
    this.anims.create({
      key: 'nauvoo_anim',
      frames: this.anims.generateFrameNumbers('nauvoo', { start: 0, end: 1 }),
      frameRate: 10,
      repeat: -1,
    });
    this.anims.create({
      key: 'agatha_anim',
      frames: this.anims.generateFrameNumbers('agatha'),
      frameRate: 10,
      repeat: -1,
    });
    this.anims.create({
      key: 'explode',
      frames: this.anims.generateFrameNumbers('explosion'),
      frameRate: 20,
      repeat: 0,
      hideOnComplete: true,
    });

    this.anims.create({
      key: 'upwards',
      frames: this.anims.generateFrameNumbers('debris', { start: 0, end: 1 }),
      frameRate: 0,
      repeat: -1,
    });
    this.anims.create({
      key: 'downwards',
      frames: this.anims.generateFrameNumbers('debris', { start: 2, end: 3 }),
      frameRate: 0,
      repeat: -1,
    });
    this.anims.create({
      key: 'thrust',
      frames: this.anims.generateFrameNumbers('player'),
      frameRate: 20,
      repeat: -1,
    });

    this.enemies = this.physics.add.group();
    this.enemies.add(this.rocinante);
    this.enemies.add(this.nauvoo);
    this.enemies.add(this.agatha);

    this.rocinante.play('rocinante_anim');
    this.nauvoo.play('nauvoo_anim');
    this.agatha.play('agatha_anim');

    this.rocinante.setInteractive();
    this.nauvoo.setInteractive();
    this.agatha.setInteractive();

    this.input.on('gameobjectdown', this.destroyShip, this);

    this.physics.world.setBoundsCollision();
    this.debri = this.physics.add.group();

    const maxDebrisObjects = 4;
    for (let i = 0; i <= maxDebrisObjects; i++) {
      const debriObject = this.physics.add.sprite(100, 100, 'debris').setScale(0.3);
      this.debri.add(debriObject);
      debriObject.setRandomPosition(0, 0, 800, 600);

      if (Math.random() > 0.5) {
        debriObject.play('upwards');
      } else {
        debriObject.play('downwards');
      }

      debriObject.setVelocity(100, 100);
      debriObject.setCollideWorldBounds(true);
      debriObject.setBounce(1);
    }

    this.player = this.physics.add.sprite(390, 336, 'player');
    this.player.play('thrust');
    this.cursorKeys = this.input.keyboard.createCursorKeys();
    this.player.setCollideWorldBounds(true);

    this.spacebar = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);

    this.anims.create({
      key: 'beam_anim',
      frames: this.anims.generateFrameNumbers('beam'),
      frameRate: 20,
      repeat: -1,
    });

    this.projectiles = this.add.group();

    this.physics.add.collider(this.projectiles, this.debri, (projectile, debri) => {
      projectile.destroy();
    });

    this.physics.add.overlap(this.player, this.debri, this.playerCollision, null, this);

    this.physics.add.overlap(this.player, this.enemies, this.hurtPlayer, null, this);

    this.physics.add.overlap(this.projectiles, this.enemies, this.hitEnemy, null, this);

    const graphics = this.add.graphics();
    graphics.fillStyle(0x000000, 1);
    graphics.beginPath();
    graphics.moveTo(0, 0);
    graphics.lineTo(800, 0);
    graphics.lineTo(800, 20);
    graphics.lineTo(0, 20);
    graphics.lineTo(0, 0);

    graphics.closePath();
    graphics.fillPath();

    this.scoreLabel = this.add.bitmapText(10, 5, 'pixelFont', `SCORE ${this.score}`, 24);

    this.gameLabel = this.add.text(250, 300, 'GAME OVER !', { font: '45px' });
    this.gameLabel.visible = false;

    this.leaderboardText = this.add.text(400, 330, 'Loading...',
      {
        fontFamily: 'monospace',
        fontSize: 28,
        fontStyle: 'bold',
        color: '#ffffff',
        align: 'center',
      });
  }

  playerCollision =(player, debri) => {
    this.physics.pause();
    // enemy.destroy();
    this.gameLabel.visible = true;
    // LeaderboardAPI.updateLeaderboard(this.user, this.score);
    // console.log(`${this.user} : ${this.score}`);

    const result = LeaderboardAPI.showResults(this.user, this.score);
    console.log(result);

    this.cameras.main.shake(500);

    this.time.delayedCall(2000, () => {

    }, [], this);
  }

    hurtPlayer = (player, enemy) => {
      this.positionShip(enemy);
      player.x = 390;
      player.y = 336;
      this.score -= 10;
      this.scoreLabel.text = `SCORE ${this.score}`;
    }

    hitEnemy = (projectile, enemy) => {
      projectile.destroy();
      this.positionShip(enemy);
      this.score += 10;
      this.scoreLabel.text = `SCORE ${this.score}`;
    }

  movePlayer = () => {
    this.player.setVelocity(0);

    if (this.cursorKeys.left.isDown) {
      this.player.setVelocityX(-200);
    } else if (this.cursorKeys.right.isDown) {
      this.player.setVelocityX(200);
    }

    if (this.cursorKeys.up.isDown) {
      this.player.setVelocityY(-200);
    } else if (this.cursorKeys.down.isDown) {
      this.player.setVelocityY(200);
    }
  }

  moveShip = (ship, speed) => {
    ship.y += speed;
    if (ship.y > 600) {
      this.positionShip(ship);
    }
  }

  positionShip = (ship) => {
    ship.y = 0;
    const position = Phaser.Math.Between(0, 800);
    ship.x = position;
  }

  destroyShip = (pointer, gameObject) => {
    gameObject.setTexture('explosion');
    gameObject.play('explode');
  }

  shootBeam = () => {
    const beam = new Beam(this);
  }

  update = () => {
    this.moveShip(this.rocinante, 1);
    this.moveShip(this.nauvoo, 2);
    this.moveShip(this.agatha, 3);

    this.background.tilePositionY -= 0.5;

    this.movePlayer();

    if (Phaser.Input.Keyboard.JustDown(this.spacebar)) {
      this.shootBeam();
    }
    for (let i = 0; i < this.projectiles.getChildren().length; i++) {
      const beam = this.projectiles.getChildren()[i];
      beam.update();
    }
  }
}
