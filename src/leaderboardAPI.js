const LeaderboardAPI = (() => {
  const gameID = 'vj8rzY60FYufqYHGBu34';

  const updateLeaderboard = async (playerName, score) => {
    const user = playerName;
    const response = await fetch(`https://us-central1-js-capstone-backend.cloudfunctions.net/api/games/${gameID}/scores`, {
      mode: 'cors', headers: { 'Content-Type': 'application/json' }, method: 'POST', body: JSON.stringify({ user, score }),
    })
      .then(response => response.json())
      .then(data => {
        // console.log(data)
      });
  };

  const getResults = async () => {
    const response = await fetch(`https://us-central1-js-capstone-backend.cloudfunctions.net/api/games/${gameID}/scores`, {
      mode: 'cors', method: 'GET',
    })
      .then(response => response.json())
      .then(data => {
        // console.log(data)
      });
  };

  return {
  };
})();
export default LeaderboardAPI;
