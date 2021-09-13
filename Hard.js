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

//-------------------------------------------------------------------------
//Median of Two Sorted Arrays (4)
const findMedianSortedArrays = (nums1, nums2) => {
  let array = nums1.concat(nums2).sort((a, b) => a - b);
  if (array.length % 2 === 1) {
    return array[Math.floor(array.length / 2)];
  } else {
    return (
      (array[Math.floor(array.length / 2)] +
        array[Math.floor(array.length / 2) - 1]) /
      2
    );
  }
};

const findMedianSortedArrays = (nums1, nums2) => {
  if (nums1.length < nums2.length) return findMedianSortedArrays(nums2, nums1);

  let x = nums1.length;
  let y = nums2.length;

  let start = 0;
  let end = x;

  while (start <= end) {
    let xPartition = Math.floor((start + end) / 2);
    let yPartition = Math.floor((x + y + 1) / 2) - xPartition;

    let xLeftMax = xPartition === 0 ? Number.MIN_VALUE : nums1[xPartition - 1];
    let xRightMin = xPartition === x ? Number.MAX_VALUE : nums1[xPartition];

    let yLeftMax = yPartition === 0 ? Number.MIN_VALUE : nums2[yPartition - 1];
    let yRightMin = yPartition === y ? Number.MAX_VALUE : nums2[yPartition];

    if (xLeftMax <= yRightMin && yLeftMax <= xRightMin) {
      if ((x + y) % 2 === 0) {
        return (
          (Math.max(xLeftMax, yLeftMax) + Math.min(xRightMin, yRightMin)) / 2
        );
      } else {
        return Math.max(xLeftMax, yLeftMax);
      }
    } else if (xLeftMax > yRightMin) {
      end = xPartition - 1;
    } else {
      start = xPartition + 1;
    }
  }
};