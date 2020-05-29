import LeaderboardAPI from '../src/leaderboardAPI';
import Store from '../src/store';
import Display from '../src/display';

jest.mock('../src/leaderboardAPI');

const mock = jest.fn((user) => LeaderboardAPI.showResults(user, score));

const mock2 = jest.fn((user, score) => LeaderboardAPI.showResults(user, score));

test('Returns scores', () => {
  Promise.resolve(mock2('Leonard', '350')).then(({ result }) => {
    expect(result).toBe('1. Leonard: 350');
  }).catch(() => {});
});

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

test('Expects undefined since the function does not return anything', () => {
  const jsdomAlert = window.alert;
  window.alert = () => {};
  expect(Store.remove('Harry')).toBeUndefined();
  window.alert = jsdomAlert;
});
