//Hard on LeetCode

//-------------------------------------------------------------------------
//Super Egg Drop (887)

[
  [0, 0, 0, 0, 0],
  [0, 1, 1, 1, 1],
  [0, 2, 3, 3, 3],
  [0, 3, 5, 6, 6],
  [0, 4, 8, 11, 12],
  [0, 5, 12, 19, 23],
  [0, 6, 17, 31, 42],
]; // Last is index M

const superEggDrop = (eggs, floors) => {
  let M = 200; // Large num
  const dp = Array.from({ length: M + 1 }, () => Array(eggs + 1).fill(0));

  for (let i = 1; i < M + 1; i++) {
    for (let j = 1; j < eggs + 1; j++) {
      dp[i][j] = 1 + dp[i - 1][j] + dp[i - 1][j - 1];
      if (dp[i][j] >= floors) return i;
    }
  }
};
