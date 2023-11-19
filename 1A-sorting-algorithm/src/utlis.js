/**
 * Compares the ASCII code of the third letter, then second letter
 * and then the first letter of two strings.
 *
 * @param {string} a The first string to compare.
 * @param {string} b The second string to compare.
 *
 * @returns {number} A negative number if a comes before b, zero if they are equal,
 * or a positive number if b comes before a.
 */
const compareThirdLetterASCII = (a, b) => {
  // If both of the strings are less than 3 characters long, then the string with less length is considered lower
  if (a.length < 3 && b.length < 3) {
    if (a.length != b.length) {
      return a.length - b.length;
    }
    if (a.length == 2 && b.length == 2) {
      return a[1].charCodeAt() - b[1].charCodeAt();
    }
    if (a.length == 1 && b.length == 1) {
      return a[0].charCodeAt() - b[0].charCodeAt();
    }
    if (a.length == 0 && b.length == 0) {
      return a.length - b.length;
    }
  }

  // If either of the strings are less than 3 characters long, then compare the lengths
  if (a.length < 3 || b.length < 3) {
    return a.length - b.length;
  }

  // Check the third letter if both strings are at least three characters long
  if (a[2] !== b[2]) {
    return a[2].charCodeAt() - b[2].charCodeAt();
  }

  // If the strings are the same length and the third letters are equal, compare the second letters
  if (a[1] !== b[1]) {
    return a[1].charCodeAt() - b[1].charCodeAt();
  }

  // If the strings are the same length and the second letters are equal, compare the first letters
  return a[0].charCodeAt() - b[0].charCodeAt();
};

/**
 * Sorts an array of strings using bubble sort.
 *
 * @param {string[]} arr The array of strings to sort.
 *
 * @returns {string[]} The sorted array of strings.
 */
const bubbleSort = (arr) => {
  const n = arr.length;

  // Bubble sort algorithm
  for (let i = 0; i < n - 1; i++) {
    for (let j = 0; j < n - i - 1; j++) {
      // Compare the current element with the next element
      if (compareThirdLetterASCII(arr[j], arr[j + 1]) > 0) {
        // Swap the elements if they are in the wrong order
        const temp = arr[j];
        arr[j] = arr[j + 1];
        arr[j + 1] = temp;
      }
    }
  }

  return arr;
};

export { compareThirdLetterASCII, bubbleSort };
