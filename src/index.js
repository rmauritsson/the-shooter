import 'phaser';
import { Beam } from './scenes/Beam';
import Display from './display';
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

if (typeof localStorage !== 'undefined') {
  document.getElementById('playerName').style.display = 'none';
}

document.querySelector('form').addEventListener('submit', (e) => {
  e.preventDefault();
  if (localStorage.getItem('playerName') === null) {
    const playerName = document.getElementById('playerName').value;
    localStorage.setItem('playerName', JSON.stringify(playerName));
    const key = JSON.parse(localStorage.getItem('playerName'));
    alert(`Your playename is ${key}`);
  } else {
    const key = JSON.parse(localStorage.getItem('playerName'));
    alert(`Welcome back ${key}`);
  }
  /* eslint-disable-next-line */
  const game = new Phaser.Game(gameConfig);
  document.querySelector('.main').style.display = 'none';
});
