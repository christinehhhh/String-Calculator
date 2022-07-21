export class StringCalculator {
  Add(input: string): number {
    const last = input.charAt(input.length - 1);

    const arrayInteger = this.replaceDelimiters(input);
    const negativeArray = arrayInteger.filter((value) => value < 0);

    if (negativeArray.length !== 0) {
      throw "negatives not allowed - " + negativeArray;
    }
    if (last === "\n") {
      throw "New line not at the end!";
    }
    if (arrayInteger.every((e) => e < 1000)) {
      return this.calculateOutput(input, arrayInteger);
    } else {
      const smallValueArray = arrayInteger.filter((value) => value < 1000);
      return this.calculateOutput(input, smallValueArray);
    }
  }

  private replaceDelimiters(input: string): number[] {
    return input
      .replace(/[&\/\\#,+()$~%.'":*?<>{};]/g, "\n")
      .split("\n")
      .map(Number);
  }

  private calculateOutput(input: string, arrayOfNumbers: number[]): number {
    if (input.length === 0) {
      return 0;
    } else {
      return arrayOfNumbers.reduce((accumulator, value) => {
        return accumulator + value;
      }, 0);
    }
  }
}
