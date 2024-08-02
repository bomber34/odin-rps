console.log("This is a simple Rock Paper Scissors game.");
let numberOfRounds = 5;

const ROCK = "rock";
const PAPER = "paper";
const SCISSORS = "scissors";

const CHOICES = [ROCK, PAPER, SCISSORS];
let humanScore = 0;
let computerScore = 0;


function getComputerChoice() {
    let choiceIndex = Math.floor(Math.random() * CHOICES.length);
    return CHOICES[choiceIndex];
}

function isValidRange(input) {
    return input >= 1 && input <= CHOICES.length;
}

function getHumanChoice() {
    let choiceIndex = -1;
    while (true) {
        let input = prompt("Type 1 for rock\nType 2 for paper\nType 3 for scissors")
        try {
            choiceIndex = parseInt(input);

            if (isValidRange(choiceIndex)) {
                break;
            }
            throw new RangeError(`Illegal range. Must be between 1 and ${CHOICES.length}`);
        } catch (error) {
            console.log(`Invalid input: ${input}\nPlease try again!`)
            choiceIndex = -1;
        }
    } 
    return CHOICES[choiceIndex-1];
}

function drawText(choice) {
    return `Draw! Both chose ${choice}`;
}

function nonDrawText(verb, humanChoice, computerChoice) {
    return `You ${verb}! ${humanChoice} beats ${computerChoice}`;
}

function isWin(humanChoice, computerChoice) {
    return (humanChoice == ROCK && computerChoice == SCISSORS)
        || (humanChoice == SCISSORS && computerChoice == PAPER)
        || (humanChoice == PAPER && computerChoice == ROCK);
}

function playRound(humanChoice, computerChoice) {
    if (humanChoice == computerChoice) {
        console.log("Draw. Both chose " + humanChoice);
    } else if (isWin(humanChoice, computerChoice)) {
        console.log(nonDrawText("win", humanChoice, computerChoice));
        humanScore++;
    } else {
        console.log(nonDrawText("lose", computerChoice, humanChoice));
        computerScore++;
    }
}

function playGame() {
    console.log("Initialize game. Reset scores to 0");
    humanScore = 0;
    computerScore = 0;
    for (let i = 0; i < numberOfRounds; i++) {
        const humanChoice = getHumanChoice();
        const computerChoice = getComputerChoice();
        console.log(`You chose ${humanChoice}. Computer chose ${computerChoice}`);
        playRound(humanChoice, computerChoice);
        console.log(`End of round.\nYour Score: ${humanScore} | Computer score: ${computerScore}`);
    }

    if (humanScore > computerScore) {
        console.log("You win overall!");
    } else if (humanScore < computerScore) {
        console.log("You lose overall :(");
    } else {
        console.log("It is a draw!");
    }
}