// console.log('hi');

const goodWords = ["rock", "paper", "scissors"];

const getUserChoice = () => {
    // let userInput = prompt("Rock, Paper, or Scissors?", "");

    const getComputerChoice = () => {
        const randomNumber = Math.floor(Math.random() * 3);
        return goodWords[randomNumber];
    };

    let userInput = getComputerChoice();

    userInput = userInput.toLowerCase();
    if (goodWords.includes(userInput)) {
        // console.log("your choice: ", userInput);
        return userInput;
    } else {
        console.log(`error: "${userInput}" is not an approved word.`);
    }
};

// let userChoice = getUserChoice();

const getComputerChoice = () => {
    const randomNumber = Math.floor(Math.random() * 3);
    return goodWords[randomNumber];
};
// let computerChoice = getComputerChoice();
// console.log("computer choice: ", computerChoice);

const determineWinner = (userChoice, computerChoice) => {
    let uc = userChoice.toLowerCase();
    let cc = computerChoice.toLowerCase();
    // is it a tie?
    if (uc === cc) {
        return "game was a tie";
    } else if (
        (uc === "rock" && cc === "paper") ||
        (uc === "paper" && cc === "scissors") ||
        (uc === "scissors" && cc == "rock")
    ) {
        return "computer won";
    } else if (
        (uc === "rock" && cc === "scissors") ||
        (uc === "paper" && cc === "rock") ||
        (uc === "scissors" && cc == "paper")
    ) {
        return "user won";
    }
    return "not determined";
};

const playGame = () => {
    let userChoice = getUserChoice();
    console.log("userChoice: ", userChoice);

    let computerChoice = getComputerChoice();
    console.log("computerChoice: ", computerChoice);

    console.log(determineWinner(userChoice, computerChoice));
};

playGame();
