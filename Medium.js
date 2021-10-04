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
  if (!s.length) return 0;
  s.split("");
  let max = 0;
  for (let i = 0; i < s.length; i++) {
    let map = {};
    let count = 0;
    for (let j = i; j < s.length; j++) {
      if (!(s[j] in map)) {
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
  if (!s.length) return 0;
  const map = {};
  let max = 0;
  let left = 0;
  let right = 0;
  while (right < s.length) {
    let rightChar = s[right];
    if (rightChar in map && map[rightChar] >= left && map[rightChar] < right) {
      left = map[rightChar] + 1;
    }
    max = Math.max(max, right - left + 1);
    map[rightChar] = right;
    right++;
  }
  return max;
};

//JS heavy
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

//-------------------------------------------------------------------------
//Container With Most Water (11)

const maxArea = (height) => {
  let maxArea = 0;

  for (let i = 0; i < height.length; i++) {
    for (let j = i + 1; j < height.length; j++) {
      let width = j - i;
      let tall = height[i] > height[j] ? height[j] : height[i];
      maxArea = Math.max(maxArea, width * tall);
    }
  }

  return maxArea;
};

const maxArea = (height) => {
  let start = 0;
  let end = height.length - 1;

  const area = (array, beg, aft) => {
    return Math.min(array[beg], array[aft]) * (aft - beg);
  };

  let max = area(height, start, end);

  while (start < end) {
    if (height[start] <= height[end]) start++;
    else if (height[start] > height[end]) end--;

    max = Math.max(max, area(height, start, end));
  }

  return max;
};

//-------------------------------------------------------------------------
//3Sum (15)

const threeSum = (nums) => {
  if (nums.length < 3) return [];

  const results = [];
  nums.sort((a, b) => a - b);

  for (let i = 0; i < nums.length; i++) {
    if (nums[i] > 0) break;
    if (i > 0 && nums[i] === nums[i - 1]) continue;

    let start = i;
    let middle = i + 1;
    let end = nums.length - 1;

    while (middle < end) {
      let sum = nums[start] + nums[middle] + nums[end];

      if (sum === 0) {
        results.push([nums[start], nums[middle], nums[end]]);

        while (nums[middle] === nums[middle + 1]) middle++;
        while (nums[end] === nums[end + 1]) end--;

        middle++;
        end--;
      } else if (sum < 0) middle++;
      else if (sum > 0) end--;
    }
  }
  return results;
};

//-------------------------------------------------------------------------
//Spiral Matrix (54)

const spiralOrder = (matrix) => {
  let ans = [];

  const removeEmpty = (array) => {
    for (let i = 0; i < array.length; i++) {
      if (array[i].length === 0) array = array.splice(i, 1);
    }
    return array;
  };

  while (matrix.length) {
    matrix = removeEmpty(matrix);
    ans = ans.concat(matrix.shift());

    for (let i = 0; i < matrix.length; i++) {
      ans.push(matrix[i].pop());
    }
    matrix = removeEmpty(matrix);

    if (!matrix[matrix.length - 1]) break;
    while (matrix[matrix.length - 1].length) {
      ans.push(matrix[matrix.length - 1].pop());
    }
    matrix.pop();
    matrix = removeEmpty(matrix);

    for (let i = matrix.length - 1; i >= 0; i--) {
      ans.push(matrix[i].shift());
    }
  }

  return ans;
};

const spiralOrder = (matrix) => {
  let result = [];

  let left = 0;
  let up = 0;
  let right = matrix[0].length - 1;
  let down = matrix.length - 1;

  while (result.length < matrix.length * matrix[0].length) {
    for (let column = left; column < right + 1; column++) {
      result.push(matrix[up][column]);
    }

    for (let row = up + 1; row < down + 1; row++) {
      result.push(matrix[row][right]);
    }

    if (up !== down) {
      for (let column = right - 1; column > left - 1; column--) {
        result.push(matrix[down][column]);
      }
    }

    if (left !== right) {
      for (let row = down - 1; row > up; row--) {
        result.push(matrix[row][left]);
      }
    }

    left++;
    up++;
    right--;
    down--;
  }

  return result;
};

//-------------------------------------------------------------------------
//Design Underground System (1396)

const UndergroundSystem = function () {
  this.traveling = {};
  this.trips = {};
};

/**
 * @param {number} id
 * @param {string} stationName
 * @param {number} t
 * @return {void}
 */
UndergroundSystem.prototype.checkIn = function (id, stationName, t) {
  this.traveling[id] = {
    startStation: stationName,
    startTime: t,
  };
};

/**
 * @param {number} id
 * @param {string} stationName
 * @param {number} t
 * @return {void}
 */
UndergroundSystem.prototype.checkOut = function (id, stationName, t) {
  startStation = this.traveling[id]["startStation"];
  endStation = stationName;
  journey = `${startStation}-${endStation}`;

  startTime = this.traveling[id]["startTime"];
  endTime = t;
  travelTime = endTime - startTime;

  if (`${startStation}-${endStation}` in this.trips) {
    this.trips[`${startStation}-${endStation}`]["totalTime"] += travelTime;
    this.trips[`${startStation}-${endStation}`]["totalTrips"]++;
  } else {
    this.trips[`${startStation}-${endStation}`] = {
      totalTime: travelTime,
      totalTrips: 1,
    };
  }

  delete this.traveling.id;
};

/**
 * @param {string} startStation
 * @param {string} endStation
 * @return {number}
 */
UndergroundSystem.prototype.getAverageTime = function (
  startStation,
  endStation
) {
  journey = `${startStation}-${endStation}`;

  if (!(journey in this.trips)) return 0;

  totalTime = this.trips[journey]["totalTime"];
  totalTrips = this.trips[journey]["totalTrips"];

  return totalTime / totalTrips;
};

/**
 * Your UndergroundSystem object will be instantiated and called as such:
 * var obj = new UndergroundSystem()
 * obj.checkIn(id,stationName,t)
 * obj.checkOut(id,stationName,t)
 * var param_3 = obj.getAverageTime(startStation,endStation)
 */

//-------------------------------------------------------------------------
//Remove All Adjacent Duplicates in String II (1209)

const removeDuplicates = (s, k) => {
  const stack = [];

  for (let char of s) {
    if (stack.length && stack[stack.length - 1][0] === char) {
      stack[stack.length - 1][1]++;
      if (stack[stack.length - 1][1] === k) {
        stack.pop();
      }
    } else {
      stack.push([char, 1]);
    }
  }

  let result = "";

  for (let [char, count] of stack) {
    for (let i = 0; i < count; i++) {
      result = result + char;
    }
  }

  return result;
};

//-------------------------------------------------------------------------
//Invalid Transactions (1169)

const invalidTransactions = function (transactions) {
  const names = [];
  const times = [];
  const amounts = [];
  const cities = [];
  const isInvalid = [];

  // Populate lists
  for (let transaction of transactions) {
    let [name, time, amount, city] = transaction.split(",");
    names.push(name);
    times.push(time);
    amounts.push(amount);
    cities.push(city);
    isInvalid.push(false);
  }

  // Flag Invalid Entries
  for (let prev = 0; prev < transactions.length; prev++) {
    if (parseInt(amounts[prev]) > 1000) {
      isInvalid[prev] = true;
    }
    for (let curr = prev + 1; curr < transactions.length; curr++) {
      if (
        Math.abs(parseInt(times[curr]) - parseInt(times[prev])) <= 60 &&
        names[prev] === names[curr] &&
        cities[curr] !== cities[prev]
      ) {
        isInvalid[prev] = true;
        isInvalid[curr] = true;
      }
    }
  }

  // Accumulate flagged/invalid transactions
  const output = [];
  for (let idx = 0; idx < isInvalid.length; idx++) {
    let transaction = transactions[idx];
    if (isInvalid[idx]) output.push(transaction);
  }
  return output;
};

//-------------------------------------------------------------------------
//Letter Combinations of a Phone Number (17)

const letterCombinations = (digits) => {
  if (digits === null || digits.length === 0) {
    return [];
  }
  const map = {
    2: "abc",
    3: "def",
    4: "ghi",
    5: "jkl",
    6: "mno",
    7: "pqrs",
    8: "tuv",
    9: "wxyz",
  };
  // We will use BFS to find all permutations
  let queue = [""]; // queue contains all permutations in progress
  let depth = 0;
  while (queue.length > 0 && depth < digits.length) {
    let levelLen = queue.length;
    let letters = map[digits[depth]];
    // Create all new permutations using existing permutations
    // by appending possible character
    for (let i = 0; i < levelLen; i++) {
      let curStr = queue.shift();
      for (let j = 0; j < letters.length; j++) {
        queue.push(curStr + letters[j]);
      }
    }
    depth++;
  }
  return queue;
  // Time Complexity: O(3^m * 4^n),
  // m = the number of digits that have 3 chars and n = the number of digits that have 4 chars
  // Space Complexity: O(3^m * 4^n), queue can contain at most O(3^m * 4^n) elements
};

const letterCombinations = (digits) => {
  if (digits == null || digits.length === 0) return [];

  const map = {
    2: "abc",
    3: "def",
    4: "ghi",
    5: "jkl",
    6: "mno",
    7: "pqrs",
    8: "tuv",
    9: "wxyz",
  };

  result = [];

  const helper = (index, string) => {
    if (index === digits.length) {
      result.push(string);
      return;
    }

    for (let character of map[digits[index]]) {
      helper(index + 1, string + character);
    }
  };

  helper(0, "");
  return result;
};

//-------------------------------------------------------------------------
//Number of Islands (200)

const numIslands = (grid) => {
  if (grid === null || grid.length === 0) return 0;

  let numRow = grid.length;
  let numCol = grid[0].length;
  let numIslands = 0;

  for (let row = 0; row < numRow; row++) {
    for (let col = 0; col < numCol; col++) {
      if (grid[row][col] === "1") {
        numIslands++;
        grid[row][col] = "0";

        queue = [row * numCol + col];
        while (queue.length) {
          let current = queue.shift();

          let newRow = Math.floor(current / numCol);
          let newCol = current % numCol;

          if (newRow - 1 > -1 && grid[newRow - 1][newCol] === "1") {
            queue.push((newRow - 1) * numCol + newCol);
            grid[newRow - 1][newCol] = "0";
          }

          if (newRow + 1 < numRow && grid[newRow + 1][newCol] === "1") {
            queue.push((newRow + 1) * numCol + newCol);
            grid[newRow + 1][newCol] = "0";
          }

          if (newCol - 1 > -1 && grid[newRow][newCol - 1] === "1") {
            queue.push(newRow * numCol + newCol - 1);
            grid[newRow][newCol - 1] = "0";
          }

          if (newCol + 1 < numCol && grid[newRow][newCol + 1] === "1") {
            queue.push(newRow * numCol + newCol + 1);
            grid[newRow][newCol + 1] = "0";
          }
        }
      }
    }
  }

  return numIslands;
};

const numIslands = (grid) => {
  let numRow = grid.length;
  let numCol = grid[0].length;
  let numIslands = 0;

  const dfsHelper = (grid, row, col) => {
    let numRow = grid.length;
    let numCol = grid[0].length;

    if (
      row < 0 ||
      col < 0 ||
      row >= numRow ||
      col >= numCol ||
      grid[row][col] === "0"
    )
      return;

    grid[row][col] = "0";
    dfsHelper(grid, row + 1, col);
    dfsHelper(grid, row - 1, col);
    dfsHelper(grid, row, col + 1);
    dfsHelper(grid, row, col - 1);
  };

  for (let row = 0; row < numRow; row++) {
    for (let col = 0; col < numCol; col++) {
      if (grid[row][col] === "1") {
        numIslands++;
        dfsHelper(grid, row, col);
      }
    }
  }

  return numIslands;
};

//-------------------------------------------------------------------------
//Candy Crush (723)

const candyCrush = (board) => {
  if (!board) return board;
  let isDone = true;

  // mark rows
  for (let r = 0; r < board.length; r++) {
    for (let c = 0; c < board[0].length - 2; c++) {
      let num1 = Math.abs(board[r][c]);
      let num2 = Math.abs(board[r][c + 1]);
      let num3 = Math.abs(board[r][c + 2]);

      if (num1 === num2 && num2 === num3 && num1 !== 0) {
        board[r][c] = -num1;
        board[r][c + 1] = -num2;
        board[r][c + 2] = -num3;
        isDone = false;
      }
    }
  }
  //mark cols
  for (let c = 0; c < board[0].length; c++) {
    for (let r = 0; r < board.length - 2; r++) {
      let num1 = Math.abs(board[r][c]);
      let num2 = Math.abs(board[r + 1][c]);
      let num3 = Math.abs(board[r + 2][c]);

      if (num1 === num2 && num2 === num3 && num1 !== 0) {
        board[r][c] = -num1;
        board[r + 1][c] = -num2;
        board[r + 2][c] = -num3;
        isDone = false;
      }
    }
  }

  //drop
  if (!isDone) {
    for (let c = 0; c < board[0].length; c++) {
      let idx = board.length - 1;
      for (let r = board.length - 1; r >= 0; r--) {
        if (board[r][c] > 0) {
          board[idx][c] = board[r][c];
          idx--;
        }
      }
      for (let r = idx; r >= 0; r--) {
        board[r][c] = 0;
      }
    }
  }

  if (isDone) return board;
  else return candyCrush(board);
};

//-------------------------------------------------------------------------
//Flatten a Multilevel Doubly Linked List (430)

const flatten = (head) => {
  if (!head) return head;

  let fakeHead = new Node(0, null, head, null);

  const dfsFlatten = (prev, curr) => {
    if (!curr) return prev;
    curr.prev = prev;
    prev.next = curr;

    let tempNext = curr.next;
    let tail = dfsFlatten(curr, curr.child);
    curr.child = null;

    return dfsFlatten(tail, tempNext);
  };

  dfsFlatten(fakeHead, head);

  fakeHead.next.prev = null;
  return fakeHead.next;
};

const flatten = (head) => {
  if (!head) return head;

  let fakeHead = new Node(0, null, head, null);
  let prev = fakeHead;

  let stack = [head];

  while (stack.length) {
    let curr = stack.pop();

    prev.next = curr;
    curr.prev = prev;

    if (curr.next) stack.push(curr.next);
    if (curr.child) {
      stack.push(curr.child);
      curr.child = null;
    }

    prev = curr;
  }
  fakeHead.next.prev = null;
  return fakeHead.next;
};

//-------------------------------------------------------------------------
//Two City Scheduling (1029)

const twoCitySchedCost = (costs) => {
  costs.sort((a, b) => a[0] - a[1] - (b[0] - b[1]));

  let total = 0;

  let half = costs.length / 2;

  for (let i = 0; i < half; i++) {
    total += costs[i][0] + costs[i + half][1];
  }

  return total;
};

//-------------------------------------------------------------------------
//Design Browser History (1472)

/**
 * @param {string} homepage
 */
var BrowserHistory = function (homepage) {
  this.homepage = homepage;
  this.future = [];
  this.backward = [homepage];
};

/**
 * @param {string} url
 * @return {void}
 */
BrowserHistory.prototype.visit = function (url) {
  this.backward.push(url);
  this.future = [];
};

/**
 * @param {number} steps
 * @return {string}
 */
BrowserHistory.prototype.back = function (steps) {
  for (let i = 0; i < steps; i++) {
    if (this.backward.length <= 1) {
      break;
    }
    this.future.push(this.backward.pop());
  }

  return this.backward[this.backward.length - 1];
};

/**
 * @param {number} steps
 * @return {string}
 */
BrowserHistory.prototype.forward = function (steps) {
  for (let i = 0; i < steps; i++) {
    if (this.future.length === 0) {
      break;
    }
    this.backward.push(this.future.pop());
  }

  return this.backward[this.backward.length - 1];
};

/**
 * Your BrowserHistory object will be instantiated and called as such:
 * var obj = new BrowserHistory(homepage)
 * obj.visit(url)
 * var param_2 = obj.back(steps)
 * var param_3 = obj.forward(steps)
 */

//-------------------------------------------------------------------------
//Meeting Rooms II (253)

const minMeetingRooms = (intervals) => {
  if (!intervals.length) return 0;

  const starts = intervals.map((a) => a[0]).sort((a, b) => a - b);
  const ends = intervals.map((a) => a[1]).sort((a, b) => a - b);

  let count = 0;
  let end = 0;

  for (let i = 0; i < intervals.length; i++) {
    if (starts[i] < ends[end]) count++;
    else end++;
  }

  return count;
};

const minMeetingRooms = (intervals) => {
  if (!intervals.length) return 0;

  let count = 0;

  intervals.sort((a, b) => a[0] - b[0]);
  const list = [];

  for (let i = 0; i < intervals.length; i++) {
    while (list.length && intervals[i][0] >= list[0]) list.shift();

    list.push(intervals[i][1]);
    list.sort((a, b) => a - b);

    count = Math.max(count, list.length);
  }

  return count;
};

//-------------------------------------------------------------------------
//Count Unhappy Friends (1583)

const unhappyFriends = (n, preferences, pairs) => {
  let happyMap = [];

  for (let [i, j] of pairs) {
    happyMap[i] = preferences[i].indexOf(j);
    happyMap[j] = preferences[j].indexOf(i);
  }

  console.log(happyMap);

  let count = 0;

  for (let i = 0; i < n; i++) {
    for (let j = 0; j < happyMap[i]; j++) {
      let partner = preferences[i][j];
      if (preferences[partner].indexOf(i) < happyMap[partner]) {
        count++;
        break;
      }
    }
  }

  return count;
};

//-------------------------------------------------------------------------
//All Paths From Source to Target (797)

const allPathsSourceTarget = (graph) => {
  const target = graph.length - 1;
  let result = [];

  const dfs = (index, path) => {
    if (path[path.length - 1] === target) {
      result.push(path);
      return;
    }

    for (let node of graph[index]) {
      dfs(node, [...path, node]);
    }
  };

  dfs(0, [0]);

  return result;
};

const allPathsSourceTarget = (graph) => {
  const target = graph.length - 1;
  let result = [];

  let stack = [[0, []]];

  while (stack.length) {
    let [node, path] = stack.pop();

    path.push(node);

    if (node === target) {
      result.push(path);
    }

    for (let adjNode of graph[node]) {
      stack.push([adjNode, [...path]]);
    }
  }

  return result;
};

//-------------------------------------------------------------------------
//Robot Bounded In Circle (1041)

const isRobotBounded = (instructions) => {
  const directions = [
    [0, 1],
    [1, 0],
    [0, -1],
    [-1, 0],
  ];
  let x = 0,
    y = 0,
    i = 0;
  for (let instruction of instructions) {
    if (instruction === "R") i = (i + 1) % 4;
    else if (instruction === "L") i = (i + 3) % 4;
    else {
      x += directions[i][0];
      y += directions[i][1];
    }
  }
  return (x === 0 && y === 0) || i > 0;
};
