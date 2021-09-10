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
  s = s.split("");
  console.log(s);
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
  }
  return max;
};
