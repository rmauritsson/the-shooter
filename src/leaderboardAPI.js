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
        console.log(`1: ${data}`);
      });
  };

  const getResults = async () => {
    const response = await fetch(`https://us-central1-js-capstone-backend.cloudfunctions.net/api/games/${gameID}/scores`, {
      mode: 'cors', method: 'GET',
    });

    const result = await response.json();
    console.log(`2: ${result}`);
    return result;
  };

  const showResults = async (user, score) => {
    let leaderboard = '';
    const highscoreTable = await Promise.all([updateLeaderboard(user, score), getResults()])
      .then((result) => {
        const data = result[1];
        data.result.sort((a, b) => b.score - a.score);
        const highScores = data.result.slice(0, 5);
        highScores.forEach(({ user, score }, index) => {
          leaderboard += `${index + 1}. ${user}: ${score}\n`;
        });
      });
    console.log(`3: ${leaderboard}`);
    return leaderboard;
  };

  return {
    updateLeaderboard,
    showResults,
  };
})();
export default LeaderboardAPI;
