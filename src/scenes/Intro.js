export class Intro extends Phaser.Scene {
  constructor(){
    super("startGame")
  }

  preload = () => {
      this.load.image('background', 'assets/bg_space_seamless.png')
      this.load.image('rocinante', 'assets/rocinante.png')
      this.load.image('nauvoo', 'assets/nauvoo.png')
      this.load.image('agatha', 'assets/agathaKing.png')
      this.load.spritesheet('dude','assets/FighterPlaneV2.png',{ frameWidth: 32, frameHeight: 48 });
    }

  create = () => {
    this.add.text(100, 100, 'Loading Game......', { fill: '#0f0' });
    this.scene.start("playGame")
  }
}
