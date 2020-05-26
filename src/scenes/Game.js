export class Game extends Phaser.Scene {
  constructor(){
    super("playGame")
  }

  create = () => {
    this.add.image(400, 300, 'background');

    this.rocinante = this.add.image(350, 300, "rocinante")
    this.nauvoo = this.add.image(400, 300, "nauvoo")
    this.agatha = this.add.image(450, 300, "agatha")

    this.add.text(100, 100, 'The Expanse!', { font: "25px",fill: '#0f0' });
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
