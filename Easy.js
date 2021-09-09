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

//-------------------------------------------------------------------------
//Valid Parenthesis (20)

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
  const map = { 1: 1, 2: 2 };
  for (let i = 3; i <= n; i++) {
    map[i] = map[i - 1] + map[i - 2];
  }

  return map[n];
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
