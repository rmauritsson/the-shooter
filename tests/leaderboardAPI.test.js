import LeaderboardAPI from '../src/leaderboardAPI';

jest.mock('../src/leaderboardAPI');

const mock = jest.fn((user) => LeaderboardAPI.showResults(user, score));

test('Returns reject message asking user to provide score when it is not given', () => {
  Promise.resolve(mock).catch((error) => {
    expect(error.message).toBe(
      'You need to provide a valid score for the leaderboard',
    );
  });
});

test('Returns message when score is successfully updated', () => {
  Promise.resolve(LeaderboardAPI.updateLeaderboard('Harry', '35')).then(({ result }) => {
    expect(result).toBe('Leaderboard score created correctly.');
  }).catch(() => {});
});

test('Returns reject message asking user to provide username when username not provided', () => {
  Promise.resolve(LeaderboardAPI.updateLeaderboard('', '300')).catch((error) => {
    expect(error.message).toBe(
      'You need to provide a valid user for the score',
    );
  });
});
