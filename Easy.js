//EASY on LeetCode

//-------------------------------------------------------------------------
//Two Sum (1)

const twoSum = (nums, target) => {
  const map = {};

  for (let i = 0; i < nums.length; i++) {
    if (map.hasPropertyOf(nums[i])) return [nums[i], map[nums[i]]];
    else map[target - nums[i]] = i;
  }
};

//-------------------------------------------------------------------------
//Reverse Integer (7)

const reverse = (x) => {
  let y = String(x).split("");
  if (y[0] === "-") y.push(y.shift());
  let z = [];
  for (let i = y.length - 1; i >= 0; i--) {
    z.push(y[i]);
  }
  z = parseInt(z.join(""));

  return Math.pow(-2, 31) > z || Math.pow(2, 31) - 1 < z ? 0 : z;
};

const reverse = (x) => {
  let y = String(x).split("");

  let neg = y[0] === "-" ? true : false;
  if (neg) y.shift();

  for (let i = 0; i < y.length / 2; i++) {
    [y[i], y[y.length - i - 1]] = [y[y.length - i - 1], y[i]];
  }

  if (neg) y.unshift("-");
  y = parseInt(y.join(""));

  return Math.pow(-2, 31) > y || Math.pow(2, 31) - 1 < y ? 0 : y;
};

const reverse = (x) => {
  const isNeg = x < 0;
  x = Math.abs(x);
  let answer = 0;

  while (x > 0) {
    const numToAdd = x % 10;
    x = Math.floor(x / 10);
    answer *= 10;
    answer += numToAdd;
  }

  if (answer > Math.pow(2, 31)) return 0;

  return isNeg ? answer * -1 : answer;
};

//-------------------------------------------------------------------------
//Palindrome Number (9)

const isPalindrome = (x) => {
  if (x < 0) return false;
  x = String(x).split("");

  for (let i = 0; i < x.length / 2; i++) {
    if (x[i] !== x[x.length - i - 1]) return false;
  }

  return true;
};

const isPalindrome = (x) => {
  if (x < 0) return false;
  x = String(x).split("");

  for (let i = 0; i < x.length / 2; i++) {
    if (x.pop() !== x.shift()) return false;
  }

  return true;
};

const isPalindrome = (x) => {
  if (x < 0) return false;
  let compare = 0,
    i = x;
  while (i > 0) {
    compare = compare * 10 + (i % 10);
    i = Math.floor(i / 10);
  }

  return compare === x;
};

//-------------------------------------------------------------------------
//Roman to Integer (13)

const romanToInt = (s) => {
  let map = {
    I: 1,
    V: 5,
    X: 10,
    L: 50,
    C: 100,
    D: 500,
    M: 1000,
  };
  let answer = 0;

  for (let i = 0; i < s.length; i++) {
    if (map[s[i]] < map[s[i + 1]]) answer -= map[s[i]];
    else answer += map[s[i]];
  }

  return answer;
};

//-------------------------------------------------------------------------
//Longest Common Prefix (14)

const longestCommonPrefix = (strs) => {
  if (strs.length === 1) return strs[0];

  let prefix = strs[0];
  for (let i = 1; i < strs.length; i++) {
    while (strs[i].indexOf(prefix) !== 0) {
      prefix = prefix.substring(0, prefix.length - 1);
      if (prefix === "") return "";
    }
  }

  return prefix;
};
