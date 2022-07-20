function Add(input) {
  let output = 0;
  let arrayInteger = [];
  let negativeArray = [];
  let smallValueArray = [];
  const last = input.charAt(input.length - 1);

  arrayInteger = replaceDelimiters(input);
  negativeArray = arrayInteger.filter((value) => value < 0);

  if (negativeArray.length === 0) {
    if (last !== "\n") {
      if (arrayInteger.every((e) => e < 1000)) {
        output = calculateOutput(input, arrayInteger);
      } else {
        smallValueArray = arrayInteger.filter((value) => value < 1000);
        output = calculateOutput(input, smallValueArray);
      }
    } else {
      throw "New line not at the end!";
    }
  } else {
    throw "negatives not allowed - " + negativeArray;
  }
  return output;
}

function replaceDelimiters(input) {
  return input
    .replace(/[&\/\\#,+()$~%.'":*?<>{};]/g, "\n")
    .split("\n")
    .map(Number);
}

function calculateOutput(input, arrayOfNumbers) {
  if (input.length === 0) {
    return 0;
  } else {
    return arrayOfNumbers.reduce((accumulator, value) => {
      return accumulator + value;
    }, 0);
  }
}

Add("1,\n");
