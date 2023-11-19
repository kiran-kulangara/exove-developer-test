# 1A-sorting-algorithm

This directory contains the source code and tests for exercise **Section 1A. Write a sorting algorithm**

## Directory Structure

```
1A-sorting-algorithm
├── src
│   ├── main.js
│   ├── utils.js
├── tests
│   ├── utils.test.js
├── package.json
└── README.md
```

### 1. `src` directory

The `src` directory contains the source code of the submission. Below are the files:

- **`main.js`**: This file contains a basic logic to manually run and test the submission.
- **`utlis.js`**: This file contains the logic for the utility functions `compareThirdLetterASCII` and `bubbleSort` used in the submission.

### 2. `tests` directory

The `tests` directory contains test files for the submission. Below is the file:

- **`utlis.test.js`**: This file contains tests for the utility functions in `utlis.js`. It is using Jest, a popular JavaScript testing framework.

## Getting Started

**Prerequisites:** Ensure that `Node.js` and `npm` (Node Package Manager) are installed on your system. You can download and install them from the official Node.js website: [Node.js Downloads](https://nodejs.org/en/download/).

To get started, follow the below steps:

1. **Clone the Repository:**

   ```bash
   git clone git@github.com:kiran-kulangara/exove-developer-test.git
   ```

2. **Move into the 1A-sorting-algorithm folder:**

   ```bash
   cd 1A-sorting-algorithm
   ```

3. **Install the dependencies:**

   ```bash
   npm install
   ```

4. **To test manually:**
   Edit the `words` array in the `src/main.js` with words of your choice and run the script:

   ```bash
   npm start
   ```

5. **To run the automated test suite:**

   ```bash
   npm test
   ```

## Background

### 1. Why and how did you came up with the implementation?

The main goal of the sorting algorithm is to sort an array of strings based on the ASCII code of the third letter first, then the second letter, and then the first letter. To achieve this, I implemented a custom comparator function `compareThirdLetterASCII` that compares two strings based on the criteria specified.

The sorting algorithm itself is implemented using the bubble sort algorithm. The reason why I chose to use bubble sort for this task is that it is a simple and efficient algorithm that is well-suited for small arrays of strings.

The `compareThirdLetterASCII` function:

1. Check if either of the strings is less than three characters long. If so, compare the lengths of the strings. **NOTE:** If an array like ["AA", "B"] is passed, then the array will be sorted as ["B", "AA"], i.e. the shorter string is considered smaller. However if the strings are of same length, then the ASCII is considered for sorting. For example, an array ["BB", "AA"] will be sorted as ["AA", "BB"].

2. If both strings are at least three characters long, check the third letter of each string. If the third letters are different, return the difference in their ASCII codes.

3. If the strings are the same length and the third letters are equal, check the second letter of each string. If the second letters are different, return the difference in their ASCII codes.

4. If the strings are the same length and the second letters are equal, check the first letter of each string. If the first letters are different, return the difference in their ASCII codes.

5. If the strings are equal in all respects, return zero.

The `bubbleSort` function:

1. Loop through the array of strings, comparing adjacent elements and swapping them if they are in the wrong order.
2. Repeat the loop until the entire array is sorted.

The bubble sort algorithm is modified to use the `compareThirdLetterASCII` function to compare the elements.

To make the testing easy JEST, a popular JavaScript testing framework is used. The test cases in the `utlis.test.js` file cover a variety of scenarios to ensure the correctness of the implementation. This includes testing strings with different lengths, cases with uppercase and lowercase letters, alphanumeric characters, non-alphanumeric characters, and edge cases where strings are less than three characters long.

## Possible Improvements

Bubble sort is a very simple algorithm to implement, but it is also one of the least efficient sorting algorithms. The average time complexity of bubble sort is O(n^2), where n is the length of the input array.

One way to improve the efficiency of the code would be to use a different sorting algorithm, such as quicksort or merge sort. These algorithms have a time complexity of O(n log n), which is much better than the time complexity of bubble sort.
