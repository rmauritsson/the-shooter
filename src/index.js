import 'phaser';
import { Beam } from './scenes/Beam';
import Display from './display';
import Store from './store';
import { Intro } from './scenes/Intro';
import { Game } from './scenes/Game';

const gameConfig = {
  width: 800,
  height: 600,
  title: 'shooter',
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

Display.createDom();

document.querySelector('form').addEventListener('submit', (e) => {
  e.preventDefault();
  const playerName = document.getElementById('playerName').value;
  if (localStorage.getItem('playerName') === null) {
    Store.add(playerName);
  } else {
    Store.remove(playerName);
  }
  /* eslint-disable-next-line */
  const game = new Phaser.Game(gameConfig);
  document.querySelector('.main').style.display = 'none';
});
