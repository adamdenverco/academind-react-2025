let secretMessage = [
    "Learning",
    "is",
    "not",
    "about",
    "what",
    "you",
    "get",
    "easily",
    "the",
    "first",
    "time,",
    "it",
    "is",
    "about",
    "what",
    "you",
    "can",
    "figure",
    "out.",
    "-2015,",
    "Chris",
    "Pine,",
    "Learn",
    "JavaScript",
];

console.log(secretMessage.length);
secretMessage.pop();
console.log(secretMessage.length);
secretMessage.push("to");
secretMessage.push("Program");
console.log(secretMessage.length);

let index = secretMessage.indexOf("easily");
secretMessage[index] = "right";

secretMessage.shift();
console.log(secretMessage.length);

secretMessage.unshift("Programming");

let replaceWords = ["get", "right", "the", "first"];
replaceWords.map((word) => {
    let tempIndex = secretMessage.indexOf("word");
    secretMessage[tempIndex] = "know";
});

console.log(secretMessage);
