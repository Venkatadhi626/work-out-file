const choices = {
    rock: "✊",
    paper: "✋",
    scissors: "✌"
};

// Load stored game state from local storage
let winCount = localStorage.getItem("winCount") ? parseInt(localStorage.getItem("winCount")) : 0;
let loseCount = localStorage.getItem("loseCount") ? parseInt(localStorage.getItem("loseCount")) : 0;
let drawCount = localStorage.getItem("drawCount") ? parseInt(localStorage.getItem("drawCount")) : 0;
let lastPlayerChoice = localStorage.getItem("lastPlayerChoice") || "❓";
let lastComputerChoice = localStorage.getItem("lastComputerChoice") || "❓";

// Update UI with stored values
document.getElementById("win-count").textContent = winCount;
document.getElementById("lose-count").textContent = loseCount;
document.getElementById("draw-count").textContent = drawCount;
document.getElementById("player-choice").textContent = lastPlayerChoice;
document.getElementById("computer-choice").textContent = lastComputerChoice;

function playGame(playerChoice) {
    const computerChoice = Object.keys(choices)[Math.floor(Math.random() * 3)];
    let result = "";

    if (playerChoice === computerChoice) {
        result = "It's a draw!";
        drawCount++;
    } else if (
        (playerChoice === "rock" && computerChoice === "scissors") ||
        (playerChoice === "paper" && computerChoice === "rock") ||
        (playerChoice === "scissors" && computerChoice === "paper")
    ) {
        result = "You win!";
        winCount++;
    } else {
        result = "You lose!";
        loseCount++;
    }

    // Update the result text
    document.getElementById("result").textContent = result;

    // Update the last choices
    document.getElementById("player-choice").textContent = choices[playerChoice];
    document.getElementById("computer-choice").textContent = choices[computerChoice];

    // Store game state in local storage
    localStorage.setItem("winCount", winCount);
    localStorage.setItem("loseCount", loseCount);
    localStorage.setItem("drawCount", drawCount);
    localStorage.setItem("lastPlayerChoice", choices[playerChoice]);
    localStorage.setItem("lastComputerChoice", choices[computerChoice]);

    // Update scoreboard
    updateScoreboard();
}

function updateScoreboard() {
    document.getElementById("win-count").textContent = winCount;
    document.getElementById("lose-count").textContent = loseCount;
    document.getElementById("draw-count").textContent = drawCount;
}

function resetGame() {
    winCount = 0;
    loseCount = 0;
    drawCount = 0;

    // Reset stored values
    localStorage.setItem("winCount", 0);
    localStorage.setItem("loseCount", 0);
    localStorage.setItem("drawCount", 0);
    localStorage.setItem("lastPlayerChoice", "❓");
    localStorage.setItem("lastComputerChoice", "❓");

    // Reset UI
    document.getElementById("result").textContent = "Make Your Move!";
    document.getElementById("player-choice").textContent = "❓";
    document.getElementById("computer-choice").textContent = "❓";
    updateScoreboard();
}
