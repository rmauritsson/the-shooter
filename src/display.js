const Display = (() => {
  const createDom = () => {
    const main = document.getElementById('main');
    main.classList.add('main');

    const title = document.createElement('h1');
    title.textContent = 'The Expanse';
    title.classList.add('maintitle');
    main.appendChild(title);

    const formContainer = document.createElement('div');
    formContainer.classList.add('form-container');
    formContainer.id = 'form-container';
    const form = document.createElement('form');
    const formGroup = document.createElement('div');
    const formTitle = document.createElement('label');
    const formInput = document.createElement('input');
    formInput.type = 'text';
    formInput.id = 'playerName';
    formInput.placeholder = 'Enter your name';
    formInput.classList.add('form-control');
    const formButton = document.createElement('button');
    formButton.classList.add('btn');
    formButton.textContent = 'Start Game';

    main.appendChild(formContainer);
    formContainer.appendChild(form);
    form.appendChild(formGroup);
    formGroup.appendChild(formTitle);
    formGroup.appendChild(formInput);
    form.appendChild(formButton);

    const wrapper = document.createElement('div');
    wrapper.classList.add('wrapper');
    const wrapperTitle = document.createElement('h1');
    wrapperTitle.textContent = 'Game Objectives';
    wrapperTitle.classList.add('wrappertitle');
    const wrapperList = document.createElement('ul');
    const itemOne = document.createElement('li');
    itemOne.textContent = 'Enter your name to start the game';
    const itemTwo = document.createElement('li');
    itemTwo.textContent = 'Use the arrow keys to move your player';
    const itemThree = document.createElement('li');
    itemThree.textContent = 'Avoid collision with the asteroids';
    const itemFour = document.createElement('li');
    itemFour.textContent = 'You lose points if you collide with enemy ships';
    const itemFive = document.createElement('li');
    itemFive.textContent = 'Press the spacebar to shoot at the enemy ships';


    main.appendChild(wrapper);
    wrapper.appendChild(wrapperTitle);
    wrapper.appendChild(wrapperList);
    wrapperList.appendChild(itemOne);
    wrapperList.appendChild(itemTwo);
    wrapperList.appendChild(itemThree);
    wrapperList.appendChild(itemFour);
    wrapperList.appendChild(itemFive);
  };
  return {
    createDom,
  };
})();

export default Display;
