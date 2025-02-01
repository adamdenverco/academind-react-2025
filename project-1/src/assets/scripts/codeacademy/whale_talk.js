let input = "Ai is taking over the world";

const vowels = ["a", "e", "i", "o", "u"];

let resultArray = [];

// loop through a string
for (let i = 0; i < input.length; i++) {
    // console.log("input[i]:",input[i]);
    let tempChar = input[i];
    // console.log(typeof tempChar);
    tempChar = tempChar.toLowerCase();
    // console.log(tempChar);
    let index = vowels.indexOf(tempChar);
    // console.log("index:", index)
    if (index < 0) {
        continue;
    }
    resultArray.push(tempChar);
    if (tempChar === "e" || tempChar === "u") {
        resultArray.push(tempChar);
    }
}
console.log("resultArray", resultArray);
let resultString = resultArray.join("").toUpperCase();
console.log("resultString:", resultString);
