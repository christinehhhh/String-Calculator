import { StringCalculator } from "./StringCalculator";

describe("StringCalculator", () => {
  // Arrange:
  const stringCalculator = new StringCalculator();

  // Test Step 1:
  describe("Up to two numbers", () => {
    it("Sum of 2", () => {
      expect(stringCalculator.Add("")).toBe(0);
      expect(stringCalculator.Add("1")).toBe(1);
      expect(stringCalculator.Add("1,2")).toBe(3);
    });
  });

  // Test Step 2:
  describe("Unknown amount of numbers", () => {
    it("Sum of multiple", () => {
      expect(stringCalculator.Add("1,2,3,4,5,6")).toBe(21);
      expect(stringCalculator.Add("1,2,3,4,5,6,6")).toBe(27);
    });
  });

  // Test Step 3:
  describe("With new line", () => {
    it("Sum with new line", () => {
      expect(stringCalculator.Add("1\n2,3")).toBe(6);
      expect(stringCalculator.Add("1\n2\n3,4")).toBe(10);
      expect(() => {
        stringCalculator.Add("1,\n");
      }).toThrowError("New line not at the end!");
    });
  });

  // Test Step 4:
  describe("With delimiter", () => {
    it("Sum with delimeter", () => {
      expect(stringCalculator.Add("//;\n1;2")).toBe(3);
      expect(stringCalculator.Add("//,\n2,3\n,4,5")).toBe(14);
      expect(stringCalculator.Add("//:\n2,3\n,4:5")).toBe(14);
    });
  });

  // Test Step 5:
  describe("Include negative", () => {
    it("Sum with negative", () => {
      expect(() => {
        stringCalculator.Add("-1");
      }).toThrowError("negatives not allowed - -1");
      expect(() => {
        stringCalculator.Add("1,-2");
      }).toThrowError("negatives not allowed - -2");
      expect(() => {
        stringCalculator.Add("1,2,-3,4,5,-6");
      }).toThrow("negatives not allowed - -3,-6");
      expect(() => {
        stringCalculator.Add("1\n-2,3");
      }).toThrow("negatives not allowed - -2");
      expect(() => {
        stringCalculator.Add("//,\n-2,3\n,4,-5");
      }).toThrow("negatives not allowed - -2,-5");
    });
  });

  // Test Step 6:
  describe("Number bigger than 1000 ignored", () => {
    it("Sum with above 1000", () => {
      expect(stringCalculator.Add("1,2002")).toBe(1);
      expect(stringCalculator.Add("1,1002,3,20004,5,6,106")).toBe(121);
      expect(stringCalculator.Add("1001\n2,3")).toBe(5);
      expect(stringCalculator.Add("//,\n2,1003\n,4,2005")).toBe(6);
    });
  });

  // Test Step 7:
  describe("Delimiter with any length", () => {
    it("Sum with random length delimiter", () => {
      expect(stringCalculator.Add("//[***]\n1***2***3")).toBe(6);
      expect(stringCalculator.Add("//[,;,;,;,]\n1,;,;,;,4,;,;,;,5")).toBe(10);
    });
  });

  // Test Step 8:
  describe("With multiple delimiters", () => {
    it("Sum with multiple delimiters", () => {
      expect(stringCalculator.Add("//[*][%]\n1*2%3:")).toBe(6);
    });
  });

  // Test Step 9:
  describe("With 1 char long multiple delimiters", () => {
    it("Sum with 1 char long multiple delimiters", () => {
      expect(
        stringCalculator.Add("//[*][%].!]#,$(\n1*_----=-!-=$2%3*()($#!)(_(+&")
      ).toBe(6);
    });
  });
});
