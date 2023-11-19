import { expect, test } from "@jest/globals";
import { compareThirdLetterASCII, bubbleSort } from "../src/utlis";

describe("compareThirdLetterASCII function", () => {
  test("handles strings of different lengths of same ASCII", () => {
    const result = compareThirdLetterASCII("Test", "Testing");
    expect(result).toEqual(0);
  });

  test("handles strings with different third letters", () => {
    const result = compareThirdLetterASCII("Apple", "Ape");
    expect(result).toBeGreaterThan(0);
  });

  test("handles strings with equal third letters and different second letters", () => {
    const result = compareThirdLetterASCII("Cat", "Bit");
    expect(result).toBeLessThan(0);
  });

  test("handles strings with equal third and second letters and different first letters", () => {
    const result = compareThirdLetterASCII("Cat", "Rat");
    expect(result).toBeLessThan(0);
  });
});

describe("bubbleSort function", () => {
  test("correctly sorts an array of strings", () => {
    const words = [
      "BOAT",
      "Locomotive",
      "Poet",
      "Accelerate",
      "GOLF",
      "ACCIDENTAL",
      "Submarine",
    ];
    const sortedWords = bubbleSort(words);
    const expectedSortedWords = [
      "BOAT",
      "ACCIDENTAL",
      "GOLF",
      "Submarine",
      "Accelerate",
      "Locomotive",
      "Poet",
    ];
    expect(sortedWords).toEqual(expectedSortedWords);
  });

  test("correctly sorts an array of Strings with uppercase and lowercase letters", () => {
    const words = ["APPLE", "Apple", "APple", "ApPlE", "apple"];
    const sortedWords = bubbleSort(words);
    const expectedSortedWords = ["APPLE", "ApPlE", "APple", "Apple", "apple"];
    expect(sortedWords).toEqual(expectedSortedWords);
  });

  test("correctly sorts an array of strings with different lengths, including strings less than three characters", () => {
    const words = [
      "A",
      "for",
      "Apple",
      "and",
      "the",
      "Ape",
      "ate",
      "a",
      "Banana",
    ];
    const sortedWords = bubbleSort(words);
    const expectedSortedWords = [
      "A",
      "a",
      "and",
      "the",
      "Ape",
      "ate",
      "Banana",
      "Apple",
      "for",
    ];
    expect(sortedWords).toEqual(expectedSortedWords);
  });

  test("correctly sorts an array of strings with alphanumeric characters", () => {
    const words = ["Ap4ple", "Ba3nana", "Or6ange", "K1iwi", "0Pineapple"];
    const sortedWords = bubbleSort(words);
    const expectedSortedWords = [
      "Ba3nana",
      "Ap4ple",
      "Or6ange",
      "K1iwi",
      "0Pineapple",
    ];
    expect(sortedWords).toEqual(expectedSortedWords);
  });

  test("correctly sorts an array of strings with non-alphanumeric characters", () => {
    const words = ["@Apple", "Ba@nana", "Or@ange", "K@iwi", "@Pineapple"];
    const sortedWords = bubbleSort(words);
    const expectedSortedWords = [
      "Ba@nana",
      "Or@ange",
      "K@iwi",
      "@Pineapple",
      "@Apple",
    ];
    expect(sortedWords).toEqual(expectedSortedWords);
  });

  test("correctly sorts an array of strings are less than three characters long", () => {
    const words = ["AA", "B"];
    const sortedWords = bubbleSort(words);
    const expectedSortedWords = ["B", "AA"];
    expect(sortedWords).toEqual(expectedSortedWords);
  });

  test("correctly sorts an array of strings that are two characters long", () => {
    const words = ["BB", "AA"];
    const sortedWords = bubbleSort(words);
    const expectedSortedWords = ["AA", "BB"];
    expect(sortedWords).toEqual(expectedSortedWords);
  });

  test("correctly sorts an array of single character strings", () => {
    const words = ["B", "A"];
    const sortedWords = bubbleSort(words);
    const expectedSortedWords = ["A", "B"];
    expect(sortedWords).toEqual(expectedSortedWords);
  });
});
