console.log("This is a simple Rock Paper Scissors game");

const CHOICES = ["rock", "paper", "scissors"];

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