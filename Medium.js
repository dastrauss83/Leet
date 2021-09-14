//Medium on LeetCode

//-------------------------------------------------------------------------
//Add Two Numbers (2)

const addTwoNumbers = (l1, l2) => {
  const convertToNumber = (list) => {
    let num = 0;
    let tens = 0;
    while (list) {
      num += list.val * Math.pow(10, tens);
      tens++;
      list = list.next;
    }
    return num;
  };
  const convertToList = (num) => {
    let list = new ListNode(null, null);
    let result = list;
    if (num < 10) list.val = num;
    while (num > 9) {
      list.val = num % 10;
      num = Math.floor(num / 10);
      list.next = new ListNode(num, null);
      list = list.next;
    }
    return result;
  };
  let sum = convertToNumber(l1) + convertToNumber(l2);
  return convertToList(sum);
  //doesn't work on large nums
};

const addTwoNumbers = (l1, l2) => {
  let list = new ListNode(null, null);
  let result = list;

  let carry = 0,
    sum = 0;

  while (l1 || l2 || sum > 0) {
    if (l1) {
      sum += l1.val;
      l1 = l1.next;
    }
    if (l2) {
      sum += l2.val;
      l2 = l2.next;
    }
    if (sum > 9) {
      sum -= 10;
      carry = 1;
    }
    list.next = new ListNode(sum);
    sum = carry;
    carry = 0;
    list = list.next;
  }

  return result.next;
};

//-------------------------------------------------------------------------
//Longest Substring Without Repeating Characters (3)

const lengthOfLongestSubstring = (s) => {
  if (!s || !s.length) return 0;
  s = s.split("");
  let max = 0;
  for (let i = 0; i < s.length; i++) {
    let map = {};
    let count = 0;
    for (let j = i; j < s.length; j++) {
      if (!map.hasOwnProperty(s[j])) {
        count++;
        map[s[j]] = true;
      } else {
        max = Math.max(count, max);
        break;
      }
    }
    max = Math.max(count, max);
  }
  return max;
};

const lengthOfLongestSubstring = (s) => {
  let curr = [];
  let max = 0;

  for (let i = 0; i < s.length; i++) {
    const indexInCurr = curr.indexOf(s[i]);
    if (indexInCurr !== -1) {
      curr.splice(0, indexInCurr + 1);
    }
    curr.push(s[i]);
    max = Math.max(max, curr.length);
  }

  return max;
};

//-------------------------------------------------------------------------
//Subsets (78)

const subsets = (nums) => {
  const answer = [];

  const helper = (path, index) => {
    answer.push(path);
    for (let i = index; i < nums.length; i++) {
      helper([...path, nums[i]], i + 1);
    }
  };
  helper([], 0);

  return answer;
};

//-------------------------------------------------------------------------
//Merge Intervals (56)

const merge = (intervals) => {
  intervals.sort((a, b) => a[0] - b[0]);
  const answer = [];

  for (let i = 0; i < intervals.length; i++) {
    if (answer.length === 0 || answer[answer.length - 1][1] < intervals[i][0]) {
      answer.push(intervals[i]);
    } else {
      answer[answer.length - 1][1] = Math.max(
        answer[answer.length - 1][1],
        intervals[i][1]
      );
    }
  }

  return answer;
};

//-------------------------------------------------------------------------
//Find First and Last Position of Element in Sorted Array (34)

const searchRange = (nums, target) => {
  if (nums.length < 1) return [-1, -1];

  let start = 0;
  let end = nums.length - 1;

  while (start <= end) {
    let mid = Math.floor((start + end) / 2);

    if (nums[mid] === target) {
      let start = mid;
      if (start !== 0) {
        while (start - 1 >= 0 && nums[start - 1] === target) {
          start--;
        }
      }
      let end = mid;
      if (end !== nums.length - 1) {
        while (end + 1 <= nums.length - 1 && nums[end + 1] === target) {
          end++;
        }
      }
      return [start, end];
    }

    if (nums[mid] > target) {
      end = mid - 1;
    }

    if (nums[mid] < target) {
      start = mid + 1;
    }
  }

  return [-1, -1];
};

const searchRange = (nums, target) => {
  let start = nums.indexOf(target);
  let end = nums.lastIndexOf(target);
  return [start, end];
};

const searchRange = (nums, target) => {
  let start = 0;
  while (start <= nums.length - 1 && nums[start] !== target) {
    start++;
  }
  if (start === nums.length - 1) return [-1, -1];
  let end = nums.length - 1;
  while (end >= 0 && nums[end] !== target) {
    end--;
  }
  return [start, end];
};

//-------------------------------------------------------------------------
//Longest Palindromic Substring (5)

const longestPalindrome = (s) => {
  const isPalindrome = (s, i) => {
    return (
      (i = i || 0) < 0 ||
      i >= s.length >> 1 ||
      (s[i] == s[s.length - 1 - i] && isPalindrome(s, ++i))
    );
  };

  let max = [0, 0];

  for (let i = 0; i < s.length; i++) {
    for (let j = i; j < s.length; j++) {
      if (isPalindrome(s.substring(i, j + 1))) {
        if (j - i > max[1] - max[0]) {
          max = [i, j];
        }
      }
    }
  }

  return s.substring(max[0], max[1] + 1);
};

const longestPalindrome = (s) => {
  let longest = "";

  const expandAroundCenter = (s, l, r) => {
    while (l >= 0 && r < s.length && s[l] === s[r]) {
      l--;
      r++;
    }
    return s.slice(l + 1, r);
  };

  for (let i = 0; i < s.length; i++) {
    let len1 = expandAroundCenter(s, i, i);
    let len2 = expandAroundCenter(s, i, i + 1);
    let longerPalindrome = len1.length > len2.length ? len1 : len2;
    if (longerPalindrome.length > longest.length) {
      longest = longerPalindrome;
    }
  }
  return longest;
};

//-------------------------------------------------------------------------
//House Robber (198)

const rob = (nums) => {
  const dp = []; //of length nums.length + 1 (for the 0th time)
  dp[0] = 0;
  dp[1] = nums[0];
  for (let i = 1; i < nums.length; i++) {
    dp[i + 1] = Math.max(dp[i], dp[i - 1] + nums[i]);
  }
  return dp[nums.length];
};

//-------------------------------------------------------------------------
//House Robber 2 (213)

const rob = (nums) => {
  if (nums.length === 0) return 0;
  if (nums.length === 1) return nums[0];
  if (nums.length === 2) return Math.max(nums[0], nums[1]);

  const helper = (nums) => {
    let dp = [0, nums[0]];
    for (let i = 1; i < nums.length; i++) {
      dp[i + 1] = Math.max(dp[i], dp[i - 1] + nums[i]);
    }
    return dp[nums.length];
  };

  return Math.max(helper(nums.slice(1)), helper(nums.slice(0, -1)));
};

//-------------------------------------------------------------------------
//Delete and Earn (740)

const deleteAndEarn = (nums) => {
  if (nums.length === 0) return 0;
  if (nums.length === 1) return nums[0];

  const numsLookup = new Array(10001).fill(0);
  for (let num of nums) {
    if (numsLookup[num]) numsLookup[num] += num;
    else numsLookup[num] = num;
  }

  const dp = [0, numsLookup[0]];
  for (let i = 1; i < numsLookup.length; i++) {
    dp[i + 1] = Math.max(dp[i], dp[i - 1] + numsLookup[i]);
  }

  return dp[numsLookup.length];
};

//-------------------------------------------------------------------------
//Jump Game (55)

const canJump = (nums) => {
  if (nums.length === 1) return true;

  let maxIndex = 0;
  for (let i = 0; i < nums.length; i++) {
    maxIndex = Math.max(maxIndex, i + nums[i]);
    if (maxIndex === nums.length - 1) return true;
    if (i >= maxIndex) return false;
  }
  return true;
};

//-------------------------------------------------------------------------
//Jump Game 2 (45)

const jump = (nums) => {
  let maxIndex = 0;
  let jumps = 0;
  let curEnd = 0;
  for (let i = 0; i < nums.length - 1; i++) {
    maxIndex = Math.max(maxIndex, i + nums[i]);
    if (i == curEnd) {
      jumps++;
      curEnd = maxIndex;
    }
  }
  return jumps;
};

//-------------------------------------------------------------------------
//Maximum Sum Circular Subarray (918)

const maxSubarraySumCircular = (nums) => {
  let max = nums[0];
  let maxSum = 0;
  let min = nums[0];
  let minSum = 0;
  let total = 0;

  for (let num of nums) {
    maxSum = Math.max(maxSum + num, num); //Kadane's algorithm to keep both a min and max subarray value
    max = Math.max(max, maxSum);

    minSum = Math.min(minSum + num, num);
    min = Math.min(min, minSum);

    total += num; // keeping a total to later use with the min to determine the wrapping portion
  } // if total === min then every value is negative and you should return the max (largest negative value)
  return total === min ? max : Math.max(max, total - min); //otherwise return max(unwrapped maximum) or total - min (wrapped maximum)
};
