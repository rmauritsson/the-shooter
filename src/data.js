const data = (() => {
  const api = 'https://us-central1-js-capstone-backend.cloudfunctions.net/api/games';
  const getID = () => Math.floor((1 + Math.random()) * 0x10000000000).toString(16).substring(1);
  const gameId = getID();
})();
