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

  update = () => {
    this.moveShip(this.rocinante, 1)
    this.moveShip(this.nauvoo, 2)
    this.moveShip(this.agatha, 3)
  }
}
