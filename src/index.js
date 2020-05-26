import 'phaser';
import { Beam } from './scenes/Beam';
import { Intro } from './scenes/Intro';
import { Game } from './scenes/Game';

const gameConfig = {
  width: 800,
  height: 600,
  backgroundColor: 0x000000,
  scene: [
    Intro,
    Game,
  ],
  pixelArt: true,
  physics: {
    default: 'arcade',
    arcade: {
      debug: false,
    },
  },
};

const game = new Phaser.Game(gameConfig);
