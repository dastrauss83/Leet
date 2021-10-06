//EASY on LeetCode

//-------------------------------------------------------------------------
//Two Sum (1)

const twoSum = (nums, target) => {
  let map = {};
  for (let i = 0; i < nums.length; i++) {
    if (nums[i] in map) return [map[nums[i]], i];
    map[target - nums[i]] = i;
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

//-------------------------------------------------------------------------
//Valid Parenthesis (20)

const isValid = (s) => {
  if (s.length % 2 === 1) return false;
  let map = {
    ")": "(",
    "]": "[",
    "}": "{",
  };
  let stack = [];
  for (let i = 0; i < s.length; i++) {
    if (s[i] === ")" || s[i] === "]" || s[i] === "}") {
      if (stack.pop() !== map[s[i]]) return false;
    } else stack.push(s[i]);
  }
  return stack.length < 1;
};

const isValid = (s) => {
  if (s.length % 2 === 1) return false;

  let stack = [];
  let map = {
    ")": "(",
    "]": "[",
    "}": "{",
  };

  for (let i = 0; i < s.length; i++) {
    if (s[i] === "(" || s[i] === "[" || s[i] === "{") stack.push(s[i]);
    else if (stack.pop() !== map[s[i]]) return false;
  }

  return stack.length < 1;
};

//-------------------------------------------------------------------------
//Merge Two Sorted Lists (21)

const mergeTwoLists = (l1, l2) => {
  let temp = new ListNode(0, null);
  let current = temp;

  while (l1 && l2) {
    if (l1.val < l2.val) {
      current.next = l1;
      l1 = l1.next;
    } else {
      current.next = l2;
      l2 = l2.next;
    }
    current = current.next;
  }

  current.next = l1 ? l1 : l2;

  return temp.next;
};

const mergeTwoLists = (l1, l2) => {
  const convertToArray = (list) => {
    if (!list) return [];
    let array = [list.val];
    while (list.next) {
      array.push(list.next.val);
      list = list.next;
    }
    return array;
  };
  return convertToArray(l1)
    .concat(convertToArray(l2))
    .sort((a, b) => b - a)
    .reduce((acc, current) => new ListNode(current, acc), null);
};

//-------------------------------------------------------------------------
//Remove Duplicates from Sorted Array (26)

const removeDuplicates = (nums) => {
  let i = 0;
  while (i < nums.length - 1) {
    if (nums[i] === nums[i + 1]) nums.splice(i, 1);
    else i++;
  }
};

//-------------------------------------------------------------------------
//Remove Element (27)

const removeElement = (nums, val) => {
  for (let i = 0; i < nums.length; i++) {
    if (nums[i] === val) {
      nums.splice(i, 1);
      i--;
    }
  }
};

const removeElement = (nums, val) => {
  let i = nums.indexOf(val);
  while (i !== -1) {
    nums.splice(i, 1);
    i = nums.indexOf(val);
  }
};

const removeElement = (nums, val) => {
  let index = 0;
  for (let num of nums) {
    if (num !== val) {
      nums[index] = num;
      index++;
    }
  }
  return index;
};

//-------------------------------------------------------------------------
//strStr() (28)

const strStr = (haystack, needle) => {
  return haystack.indexOf(needle);
};

const strStr = (haystack, needle) => {
  if (needle === "" || haystack === needle) return 0;
  if (needle.length > haystack.length) return -1;

  for (let i = 0; i < haystack.length - needle.length + 1; i++) {
    if (haystack[i] === needle[0]) {
      for (let j = 0; j < needle.length; j++) {
        if (haystack[i + j] !== needle[j]) break;
        else if (j === needle.length - 1) return i;
      }
    }
  }
  return -1;
};

//-------------------------------------------------------------------------
//Search Insert Position (35)

const searchInsert = (nums, target) => {
  const binarySearch = (array, target, start, end) => {
    if (start > end) return start;
    const mid = Math.floor((end + start) / 2);
    if (array[mid] === target) return mid;
    if (array[mid] > target) return binarySearch(array, target, start, mid - 1);
    if (array[mid] < target) return binarySearch(array, target, mid + 1, end);
  };
  return binarySearch(nums, target, 0, nums.length - 1);
};

const searchInsert = (nums, target) => {
  let start = 0,
    end = nums.length - 1;
  while (start <= end) {
    const mid = Math.floor((start + end) / 2);
    if (nums[mid] === target) return mid;
    if (nums[mid] > target) end = mid - 1;
    if (nums[mid] < target) start = mid + 1;
  }
  return start;
};

//-------------------------------------------------------------------------
//Maximum Subarray (53)

const maxSubArray = (nums) => {
  let max = nums[0];
  let sum = 0;

  for (num of nums) {
    sum = Math.max(num, sum + num);
    max = Math.max(sum, max);
  }
  return max;
};

//-------------------------------------------------------------------------
//Length of Last Word (58)

const lengthOfLastWord = (s) => {
  s = s.split(" ");
  for (let i = s.length - 1; i >= 0; i--) {
    if (s[i] !== "") return s[i].length;
  }
  return 0;
};

const lengthOfLastWord = (s) => {
  return s.split(" ").filter((word) => word !== "")[s.length - 1].length;
};

//-------------------------------------------------------------------------
//Plus One (66)

const plusOne = (digits) => {
  if (digits[digits.length - 1] !== 9) {
    digits[digits.length - 1]++;
    return digits;
  }

  let index = digits.length - 1;
  while (digits[index] === 9) {
    if (index === 0) {
      digits[index] = 0;
      digits.unshift(0);
    } else {
      digits[index] = 0;
      index--;
    }
  }
  digits[index]++;
  return digits;
};

const plusOne = (digits) => {
  for (let i = digits.length - 1; i >= 0; i--) {
    digits[i]++;
    if (digits[i] > 9) digits[i] = 0;
    else return digits;
  }
  digits.unshift(1);
  return digits;
};

//-------------------------------------------------------------------------
//Add Binary (67)

const addBinary = (a, b) => {
  const convertToNum = (s) => {
    s = s.split("");
    let length = s.length;
    sum = 0;
    for (let i = 0; i < length; i++) {
      sum += s[i] * Math.pow(2, length - 1 - i);
    }
    return parseInt(sum);
  };
  const convertToBinary = (num) => {
    if (num === 0) return "0";
    let ans = [];
    while (num > 0) {
      ans.unshift(num % 2);
      num = Math.floor(num / 2);
    }
    return ans.join("");
  };
  return convertToBinary(convertToNum(a) + convertToNum(b));
};

const addBinary = (a, b) => {
  return (
    parseInt(parseInt(a, 2).toString()) + parseInt(parseInt(b, 2).toString())
  ).toString(2);
};

var addBinary = function (a, b) {
  let first = "0b" + a;
  let second = "0b" + b;
  let sum = BigInt(first) + BigInt(second);
  return sum.toString(2);
};

//-------------------------------------------------------------------------
//Sqrt(x) (69)

const mySqrt = (x) => {
  if (x === 1) return 1;
  let start = 0;
  let end = Math.floor(x / 2) + 1;
  while (start + 1 < end) {
    const mid = Math.floor((start + end) / 2);
    if (mid * mid <= x) start = mid;
    if (mid * mid > x) end = mid;
  }
  return start;
};

//-------------------------------------------------------------------------
//Climbing Stairs (70)

const climbStairs = (n) => {
  if (n <= 2) return n;

  const dp = { 1: 1, 2: 2 };
  for (let i = 3; i <= n; i++) {
    dp[i] = dp[i - 1] + dp[i - 2];
  }

  return dp[n];
};

//-------------------------------------------------------------------------
//Remove Duplicates from Sorted Array (83)

const deleteDuplicates = (head) => {
  let current = head;
  while (current && current.next) {
    if (current.val === current.next.val) current.next = current.next.next;
    else current = current.next;
  }
  return head;
};

//-------------------------------------------------------------------------
//Merge Sorted Array (88)

const merge = (nums1, m, nums2, n) => {
  m--;
  n--;
  while (m + n >= -1) {
    if (nums1[m] > nums2[n] || n < 0) {
      nums1[m + n + 1] = nums1[m];
      m--;
    } else {
      nums1[m + n + 1] = nums2[n];
      n--;
    }
  }
};

const merge = (nums1, m, nums2, n) => {
  m--;
  n--;
  while (n >= 0) {
    nums1[m + n + 1] = nums1[m] > nums2[n] ? nums1[m--] : nums2[n--];
  }
};

//-------------------------------------------------------------------------
//Binary Tree Inorder Traversal (94)

const inorderTraversal = (root) => {
  let answer = [];
  let stack = [];

  while (root || stack.length) {
    if (root) {
      stack.push(root);
      root = root.left;
    } else {
      root = stack.pop();
      answer.push(root.val);
      root = root.right;
    }
  }

  return answer;
};

//-------------------------------------------------------------------------
//Same Tree (100)

const isSameTree = (p, q) => {
  if (!p && !q) return true;
  let pStack = [];
  let qStack = [];

  while (p || q || pStack.length || qStack.length) {
    if (p && q) {
      pStack.push(p);
      qStack.push(q);
      p = p.left;
      q = q.left;
    } else if (!p && !q) {
      p = pStack.pop();
      q = qStack.pop();
      if (p.val !== q.val) return false;
      p = p.right;
      q = q.right;
    } else return false;
  }

  return true;
};

const isSameTree = (p, q) => {
  let queue = [[p, q]];

  while (queue.length) {
    let [x, y] = queue.shift();
    if (!x && !y) continue;
    if (!x || !y) return false;
    if (x.val !== y.val) return false;
    queue.push([x.left, y.left]);
    queue.push([x.right, y.right]);
  }
  return true;
};

const isSameTree = (p, q) => {
  if (!p && !q) return true;
  if (!p || !q || p.val !== q.val) return false;
  return isSameTree(p.left, q.left) && isSameTree(p.right, q.right);
};

//-------------------------------------------------------------------------
//Symmetric Tree (101)

const isSymmetric = (root) => {
  if (!root) return true;
  let l = root.left;
  let r = root.right;
  let queue = [[l, r]];
  while (queue.length) {
    const [x, y] = queue.shift();
    if (!x && !y) continue;
    if (!x || !y || x.val !== y.val) return false;
    queue.push([x.left, y.right], [x.right, y.left]);
  }

  return true;
};

const isSymmetric = (root) => {
  if (!root) return true;
  let stack = [[root.left, root.right]];
  while (stack.length) {
    let [x, y] = stack.shift();
    if (!x && !y) continue;
    if (!x || !y || x.val !== y.val) return false;
    stack.push([x.left, y.right], [x.right, y.left]);
  }
  return true;
};

const isSymmetric = (root) => {
  const isMirror = (l, r) => {
    if (!l && !r) return true;
    if (!l || !r || l.val !== r.val) return false;
    return isMirror(l.left, r.right) && isMirror(l.right, r.left);
  };
  return isMirror(root.left, root.right);
};

//-------------------------------------------------------------------------
//Maximum Depth of Binary Tree (104)

const maxDepth = (root) => {
  if (!root) return 0;
  let depth = 0;
  let q = [root];
  while (q.length) {
    const qLevel = [];
    for (let node of q) {
      if (node.right) qLevel.push(node.right);
      if (node.left) qLevel.push(node.left);
    }
    q = qLevel;
    depth++;
  }
  return depth;
};

const maxDepth = (root) => {
  return !root ? 0 : Math.max(maxDepth(root.left), maxDepth(root.right)) + 1;
};

//-------------------------------------------------------------------------
//Convert Sorted Array to Binary Search Tree (108)

const sortedArrayToBST = (nums) => {
  if (!nums) return null;
  const helper = (nums, start, end) => {
    if (end < start) return null;

    const mid = Math.floor((start + end) / 2);
    const node = new TreeNode(nums[mid]);

    node.left = helper(nums, start, mid - 1);
    node.right = helper(nums, mid + 1, end);

    return node;
  };
  return helper(nums, 0, nums.length - 1);
};

//-------------------------------------------------------------------------
//Balanced Binary Tree (110)

const isBalanced = (root) => {
  if (!root) return true;
  const getHeight = (node) => {
    if (!node) return 0;
    return Math.max(getHeight(node.left), getHeight(node.right)) + 1;
  };
  return (
    Math.abs(getHeight(root.left) - getHeight(root.right)) < 2 &&
    isBalanced(root.left) &&
    isBalanced(root.right)
  );
};

//-------------------------------------------------------------------------
//Fibonacci Number (509)

const fib = (n) => {
  if (n < 2) return n;
  const memo = {
    0: 0,
    1: 1,
  };
  for (let i = 2; i <= n; i++) {
    memo[i] = memo[i - 1] + memo[i - 2];
  }
  return memo[n];
};

//-------------------------------------------------------------------------
//N-th Tribonacci Number (1137)

const tribonacci = (n) => {
  const memo = {
    0: 0,
    1: 1,
    2: 1,
  };
  for (let i = 3; i <= n; i++) {
    memo[i] = memo[i - 1] + memo[i - 2] + memo[i - 3];
  }
  return memo[n];
};

//-------------------------------------------------------------------------
//Min Cost Climbing Stairs (746)

const minCostClimbingStairs = (cost) => {
  let f1 = 0;
  let f2 = 0;

  for (let i = 0; i < cost.length; i++) {
    let f0 = cost[i] + Math.min(f1, f2);
    f2 = f1;
    f1 = f0;
  }

  return Math.min(f1, f2);
};

const minCostClimbingStairs = (cost) => {
  let step1 = 0;
  let step2 = 0;
  for (let i = 0; i < cost.length; i++) {
    let currentStep = cost[i] + Math.min(step1, step2);
    step2 = step1;
    step1 = currentStep;
  }
  return Math.min(step1, step2);
};

//-------------------------------------------------------------------------
//Counting Bits (338)

//doesn't work for large nums
const countBits = (n) => {
  if (n === 0) return 0;
  const ans = [];

  for (let i = 0; i <= n; i++) {
    ans.push(
      i
        .toString(2)
        .split("")
        .reduce((acc, current) => {
          if (current === "1") return acc + 1;
          else return acc;
        }, 0)
    );
  }

  return ans;
};

const countBits = (n) => {
  const result = [0];
  let offset = 1;
  for (let index = 1; index <= n; index++) {
    if (offset * 2 === index) offset *= 2;
    result[index] = result[index - offset] + 1;
  }
  return result;
};

//-------------------------------------------------------------------------
//Diameter of a Binary Tree (543)

const diameterOfBinaryTree = (root) => {
  let max = 0;

  const getHeight = (node) => {
    if (!node) return 0;

    let left = getHeight(node.left);
    let right = getHeight(node.right);

    max = Math.max(max, left + right);
    return Math.max(left, right) + 1;
  };

  getHeight(root);
  return max;
};

//-------------------------------------------------------------------------
//Merge Two Binary Trees (617)

const mergeTrees = (root1, root2) => {
  if (!root1) return root2;
  if (!root2) return root1;

  root1.val += root2.val;

  root1.left = mergeTrees(root1.left, root2.left);
  root1.right = mergeTrees(root1.right, root2.right);

  return root1;
};

const mergeTrees = (root1, root2) => {
  if (root1 && root2) {
    let root = new TreeNode(root1.val + root2.val);
    root.left = mergeTrees(root1.left, root2.left);
    root.right = mergeTrees(root1.right, root2.right);
    return root;
  }
  return root1 || root2;
};

const mergeTrees = (root1, root2) => {
  if (!root1) return root2;
  if (!root2) return root1;

  let queue = [[root1, root2]];

  while (queue.length) {
    let [current1, current2] = queue.shift();

    if (!current2) continue;

    if (current1 && current2) {
      if (current1 !== current2) current1.val += current2.val;
      if (!current1.left) current1.left = current2.left;
      if (!current1.right) current1.right = current2.right;
    }

    queue.push(
      [current1.left, current2.left],
      [current1.right, current2.right]
    );
  }
  return root1;
};

const mergeTrees = (root1, root2) => {
  if (!root1) return root2;
  if (!root2) return root1;

  let stack = [[root1, root2]];

  while (stack.length) {
    let [current1, current2] = stack.pop();

    if (!current1 || !current2) continue;

    current1.val += current2.val;

    if (!current1.left) current1.left = current2.left;
    else stack.push([current1.left, current2.left]);

    if (!current1.right) current1.right = current2.right;
    else stack.push([current1.right, current2.right]);
  }

  return root1;
};

//-------------------------------------------------------------------------
//Palindrome Linked List (234)

const isPalindrome = (head) => {
  let slow = head,
    fast = head;

  while (fast && fast.next) {
    fast = fast.next.next;
    slow = slow.next;
  }

  const reverse = (node) => {
    let temp, prev;

    while (node) {
      temp = node.next;
      node.next = prev;
      prev = node;
      node = temp;
    }
    return prev;
  };

  slow = reverse(slow);

  while (slow) {
    if (slow.val !== head.val) return false;
    slow = slow.next;
    head = head.next;
  }

  return true;
};

//-------------------------------------------------------------------------
//Valid Anagram (242)

//JS heavy
const isAnagram = (s, t) => {
  s = s.split("").sort();
  t = t.split("").sort();

  if (s.length !== t.length) return false;

  for (let i = 0; i < s.length; i++) {
    if (s[i] !== t[i]) return false;
  }
  return true;
};

const isAnagram = (s, t) => {
  if (s.length !== t.length) return false;

  let map = {};
  for (let i = 0; i < s.length; i++) {
    if (s[i] in map) map[s[i]]++;
    else map[s[i]] = 1;
    if (t[i] in map) map[t[i]]--;
    else map[t[i]] = -1;
  }

  for (let value of Object.values(map)) {
    if (value !== 0) return false;
  }

  return true;
};

//-------------------------------------------------------------------------
//Pascal's Triangle (118)

const generate = (numRows) => {
  const result = [[1]];

  for (let i = 1; i < numRows; i++) {
    let row = [1];

    while (row.length < i) {
      row.push(result[i - 1][row.length - 1] + result[i - 1][row.length]);
    }

    row.push(1);
    result.push(row);
  }

  return result;
};

//-------------------------------------------------------------------------
//Maximum Nesting Depth of the Parentheses (1614)

const maxDepth = (s) => {
  let max = 0;
  let current = 0;
  for (let character of s) {
    if (character === "(") current++;
    if (character === ")") current--;
    max = Math.max(current, max);
  }

  return max;
};

//-------------------------------------------------------------------------
//Design an Ordered Stream (1656)

const OrderedStream = (n) => {
  this.pointer = 0;
  this.list = [];
};

/**
 * @param {number} idKey
 * @param {string} value
 * @return {string[]}
 */
OrderedStream.prototype.insert = (idKey, value) => {
  let chunk = [];
  this.list[idKey - 1] = value;
  while (this.list[this.pointer]) {
    chunk.push(this.list[this.pointer]);
    this.pointer++;
  }
  return chunk;
};

/**
 * Your OrderedStream object will be instantiated and called as such:
 * var obj = new OrderedStream(n)
 * var param_1 = obj.insert(idKey,value)
 */

//-------------------------------------------------------------------------
//Contains Duplicate (217)

const containsDuplicate = (nums) => {
  if (nums.length < 2) return false;

  const map = {};

  for (let num of nums) {
    if (num in map) return true;
    else map[num] = true;
  }

  return false;
};

//-------------------------------------------------------------------------
//Valid Palindrome II (680)

const validPalindrome = (s) => {
  let left = 0;
  let right = s.length - 1;

  const helper = (s, left, right) => {
    while (left < right) {
      if (s[left] !== s[right]) return false;
      left++;
      right--;
    }
    return true;
  };

  while (left < right) {
    if (s[left] !== s[right]) {
      return helper(s, left + 1, right) || helper(s, left, right - 1);
    }
    left++;
    right--;
  }
  return true;
};

//-------------------------------------------------------------------------
//Reorder Data in Log Files (937)

const reorderLogFiles = (logs) => {
  const body = (s) => s.slice(s.indexOf(" ") + 1); // get the body after identifier
  const isNum = (c) => /\d/.test(c);

  // if body same then compare identifier
  const compare = (a, b) => {
    const n = body(a).localeCompare(body(b));
    if (n !== 0) return n;
    return a.localeCompare(b);
  };

  const digitLogs = [];
  const letterLogs = [];
  for (let log of logs) {
    if (isNum(body(log))) digitLogs.push(log);
    else letterLogs.push(log);
  }
  return [...letterLogs.sort(compare), ...digitLogs];
};

//-------------------------------------------------------------------------
//Verifying an Alien Dictionary (953)

const isAlienSorted = (words, sorted) => {
  for (let i = 0; i < words.length - 1; i++) {
    if (sorted.indexOf(words[i][0]) > sorted.indexOf(words[i + 1][0]))
      return false;
    if (sorted.indexOf(words[i][0]) === sorted.indexOf(words[i + 1][0])) {
      let index = 1;
      while (index <= words[i].length) {
        if (
          sorted.indexOf(words[i][index]) > sorted.indexOf(words[i + 1][index])
        )
          return false;
        if (
          sorted.indexOf(words[i][index]) < sorted.indexOf(words[i + 1][index])
        )
          break;
        index++;
      }
    }
  }
  return true;
};

//-------------------------------------------------------------------------
//Sign of the Product of an Array (1822)

const arraySign = (nums) => {
  let answer = 0;
  for (let num of nums) {
    if (num === 0) return 0;
    if (num < 0) answer++;
  }
  if (answer === 0) return 1;
  return answer % 2 === 1 ? -1 : 1;
};

//-------------------------------------------------------------------------
//Add Strings (415)

const addStrings = (num1, num2) => {
  let i = num1.length - 1;
  let j = num2.length - 1;
  let result = "";
  let carry = 0;

  while (i >= 0 || j >= 0) {
    const digit1 = i < 0 ? 0 : num1[i] - "0";
    const digit2 = j < 0 ? 0 : num2[j] - "0";

    let sum = digit1 + digit2 + carry;
    carry = 0;

    if (sum > 9) {
      carry = 1;
      sum = sum % 10;
    }

    result = `${String(sum)}${result}`;

    i--;
    j--;
  }
  if (carry > 0) return `${String(carry)}${result}`;
  return result;
};

//-------------------------------------------------------------------------
//Best Time to Buy and Sell Stock (121)

const maxProfit = (prices) => {
  let max = 0;
  let min = prices[0];

  for (let i = 1; i < prices.length; i++) {
    min = Math.min(min, prices[i]);
    max = Math.max(max, prices[i] - min);
  }

  return max;
};

//-------------------------------------------------------------------------
//FizzBuzz (412)
const fizzBuzz = (n) => {
  let ans = [];
  for (let i = 1; i <= n; i++) {
    let str = "";
    if (i % 3 === 0) str += "Fizz";
    if (i % 5 === 0) str += "Buzz";
    if (str) ans.push(str);
    else ans.push(String(i));
  }
  return ans;
};
