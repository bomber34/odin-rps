console.log("This is a simple Rock Paper Scissors game");

const CHOICES = ["rock", "paper", "scissors"];

function getComputerChoice() {
    let choiceIndex = Math.floor(Math.random() * CHOICES.length);
    return CHOICES[choiceIndex];
}