const Store = (() => {
  const add = (player) => {
    localStorage.setItem('playerName', JSON.stringify(player));
    const key = JSON.parse(localStorage.getItem('playerName'));
    alert(`Your player name is ${key}`);
  };
  const remove = (player) => {
    localStorage.clear();
    add(player);
  };
  return {
    add,
    remove,
  };
})();

export default Store;
