export class Intro extends Phaser.Scene {
  constructor(){
    super("startGame")
  }

  preload = () => {
      this.load.image('background', 'assets/bg_space_seamless.png')

      this.load.spritesheet('rocinante','assets/sprites/ship1.png',{ frameWidth: 16, frameHeight: 16 });
      this.load.spritesheet('nauvoo','assets/sprites/ship2.png',{ frameWidth: 16, frameHeight: 16 });
      this.load.spritesheet('agatha','assets/sprites/ship3.png',{ frameWidth: 16, frameHeight: 16 });
      this.load.spritesheet('explosion','assets/sprites/explosion.png',{ frameWidth: 16, frameHeight: 16 });
      this.load.spritesheet('debris','assets/sprites/spritesheet.png',{ frameWidth: 160, frameHeight: 160 });
    }

  create = () => {
    this.add.text(100, 100, 'Loading Game......', { fill: '#0f0' });
    this.scene.start("playGame")
  }
}
