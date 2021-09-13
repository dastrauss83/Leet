//Hard on LeetCode

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
