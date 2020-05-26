export class Game extends Phaser.Scene {
  constructor(){
    super("playGame")
  }

  create = () => {
    this.background = this.add.tileSprite(400, 300, 800, 600, 'background');

    this.rocinante = this.add.sprite(350, 300, "rocinante")
    this.rocinante.setScale(2)
    this.nauvoo = this.add.sprite(400, 300, "nauvoo")
    this.nauvoo.setScale(2)
    this.agatha = this.add.sprite(450, 300, "agatha")
    this.agatha.setScale(2)

    this.background.tilePositionY -= 0.5

    // animations
    this.anims.create({
      key: "rocinante_anim",
      frames: this.anims.generateFrameNumbers("rocinante", { start: 0, end: 1 }),
      frameRate: 10,
      repeat: -1
    })
    this.anims.create({
      key: "nauvoo_anim",
      frames: this.anims.generateFrameNumbers("nauvoo", { start: 0, end: 1 }),
      frameRate: 10,
      repeat: -1
    })
    this.anims.create({
      key: "agatha_anim",
      frames: this.anims.generateFrameNumbers("agatha", { start: 0, end: 1 }),
      frameRate: 10,
      repeat: -1
    })
    this.anims.create({
      key: "explode",
      frames: this.anims.generateFrameNumbers("explosion"),
      frameRate: 20,
      repeat: 0,
      hideOnComplete: true
    });

    this.anims.create({
      key: "upwards",
      frames: this.anims.generateFrameNumbers("debris", { start: 0, end: 1 }),
      frameRate: 0,
      repeat: -1
    })
    this.anims.create({
      key: "downwards",
      frames: this.anims.generateFrameNumbers("debris", { start: 2, end: 3 }),
      frameRate: 0,
      repeat: -1
    })

    this.rocinante.play("rocinante_anim")
    this.nauvoo.play("nauvoo_anim")
    this.agatha.play("agatha_anim")

    this.rocinante.setInteractive();
    this.nauvoo.setInteractive();
    this.agatha.setInteractive();

    this.input.on('gameobjectdown', this.destroyShip, this)

    this.physics.world.setBoundsCollision();
    this.debri = this.physics.add.group();

    const maxDebrisObjects = 4;
    for(let i=0; i<= maxDebrisObjects; i++){
      let debriObject = this.physics.add.sprite(100, 100, "debris").setScale(.3)
      this.debri.add(debriObject)
      debriObject.setRandomPosition(0, 0, 800, 600)

      if(Math.random() > 0.5){
        debriObject.play("upwards")
      }else {
        debriObject.play("downwards")
      }

      debriObject.setVelocity(100, 100)
      debriObject.setCollideWorldBounds(true)
      debriObject.setBounce(1);
    }
  }

  moveShip = (ship, speed) => {
    ship.y += speed
    if(ship.y > 600){
      this.positionShip(ship)
    }
  }

  positionShip = (ship) => {
    ship.y = 0
    const position = Phaser.Math.Between(0,800)
    ship.x = position
  }

  destroyShip = (pointer, gameObject) => {
    gameObject.setTexture("explosion")
    gameObject.play("explode")
  }

  update = () => {
    this.moveShip(this.rocinante, 1)
    this.moveShip(this.nauvoo, 2)
    this.moveShip(this.agatha, 3)
  }
}
