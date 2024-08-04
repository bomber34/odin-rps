const NUMBER_OF_WON_ROUNDS = 5;

const ROCK = "rock";
const PAPER = "paper";
const SCISSORS = "scissors";

const CHOICES = [ROCK, PAPER, SCISSORS];

const INVISIBLE_CLASS = "invisibleOnLoad"

const playerScoreText = document.getElementById("playerScoreText");
const computerScoreText = document.getElementById("computerScoreText");
const playerChoiceText = document.getElementById("playerSelection");
const computerChoiceText = document.getElementById("computerSelection");
const matchText = document.getElementById("matchText");

const alertDialog = document.querySelector("#alert")
const alertBarOkBtn = document.getElementById("alertBarOkBtn")
const alertBarCloseBtn = document.getElementById("alertBarCloseBtn");

// from https://wiki.selfhtml.org/wiki/JavaScript/Tutorials/Eigene_modale_Dialogfenster#window.myAlert at 2024-08-4 19:30 CET
window.myAlert = function (text, OK, cancel) {
    let textElement = document.querySelector("#alertText");
  
    if (alertDialog && textElement) {
      textElement.innerText = (text && text.length ? text : "");
      
      alertBarOkBtn.addEventListener("click", OK);
      alertBarCloseBtn.addEventListener("click", cancel);
      alertDialog.show();
    }
  }



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
    matchText.innerText = `Draw! Both chose ${choice}`;
}

function nonDrawText(verb, humanChoice, computerChoice) {
    matchText.innerText = `You ${verb}! ${humanChoice} beats ${computerChoice}`;
}

function isWin(humanChoice, computerChoice) {
    return (humanChoice == ROCK && computerChoice == SCISSORS)
        || (humanChoice == SCISSORS && computerChoice == PAPER)
        || (humanChoice == PAPER && computerChoice == ROCK);
}

function toggleVisibility(elem, isVisible) {
    if (isVisible && elem.classList.contains(INVISIBLE_CLASS)) {
        elem.classList.remove(INVISIBLE_CLASS);
    } else if (!isVisible && !elem.classList.contains(INVISIBLE_CLASS)) {
        elem.classList.add(INVISIBLE_CLASS);
    }
}

function updateScoreText() {
    playerScoreText.innerText = "You: " + humanScore;
    computerScoreText.innerText = "Computer: " + computerScore;
}

function updateChoiceTexts(humanChoice, computerChoice) {
    playerChoiceText.innerText = "You chose " + humanChoice;
    computerChoiceText.innerText = "Computer chose " + computerChoice;
    toggleVisibility(computerChoiceText, true);
}

function defaultTexts() {
    playerChoiceText.innerText = "Choose rock, paper or scissors please!";
    toggleVisibility(computerChoiceText, false);
    toggleVisibility(matchText, false);
}

function isGameOver() {
    return computerScore == NUMBER_OF_WON_ROUNDS || humanScore == NUMBER_OF_WON_ROUNDS
}

function resetGame() {
    humanScore = 0;
    computerScore = 0;
    updateScoreText();
    defaultTexts();
    alertDialog.close();
}

function handleGameOver() {
    if (isGameOver()) {
        let winner = humanScore == NUMBER_OF_WON_ROUNDS ? "You" : "Computer"
        window.myAlert(`Game Over. ${winner} won`, resetGame, resetGame);
    }
}

function playRound(humanChoice, computerChoice) {
    if (alertDialog.open) {
        return;
    }

    updateChoiceTexts(humanChoice, computerChoice);

    if (humanChoice == computerChoice) {
        drawText(humanChoice);
    } else if (isWin(humanChoice, computerChoice)) {
        nonDrawText("win", humanChoice, computerChoice)
        humanScore++;
    } else {
        nonDrawText("lose", computerChoice, humanChoice)
        computerScore++;
    }
    toggleVisibility(matchText, true);
    updateScoreText();
    handleGameOver()
}

function addEvent(btn, id) {
    btn.addEventListener("click", () => {
        playRound(CHOICES[id], getComputerChoice());
    })
}

const rockBtn = document.getElementById("rockBtn");
const paperBtn = document.getElementById("paperBtn");
const scissorsBtn = document.getElementById("scissorsBtn");
addEvent(rockBtn, 0);
addEvent(paperBtn, 1);
addEvent(scissorsBtn, 2);