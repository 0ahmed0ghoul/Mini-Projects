let plays = 0; // Tracks total number of plays
let scorep = 0; // Tracks number of wins

function draw(playerChoice) {
    const btn0 = document.getElementById("btn0");
    const btn1 = document.getElementById("btn1");
    const btn2 = document.getElementById("btn2");
    const score = document.getElementById("score");
    const analyse = document.getElementById("analyse");
    const resultText = document.getElementById("res");

    // Random choice for the game (0, 1, or 2)
    const computerChoice = Math.floor(Math.random() * 3);

    // Disable buttons to prevent additional clicks
    btn0.disabled = true;
    btn1.disabled = true;
    btn2.disabled = true;

    // Update button colors based on results
    if (computerChoice === playerChoice) {
        document.getElementById(`btn${playerChoice}`).style.backgroundColor = 'green';
        resultText.textContent = 'YOU WON!';
        scorep++;
    } else {
        document.getElementById(`btn${playerChoice}`).style.backgroundColor = 'red';
        document.getElementById(`btn${computerChoice}`).style.backgroundColor = 'green';
        resultText.textContent = 'YOU LOST!';
    }

    // Update stats
    plays++;
    score.textContent = `Score: ${scorep}`;
    analyse.textContent = `Plays: ${plays}, Wins: ${scorep}`;

    // Add retry button
    const retryButton = document.createElement('button');
    retryButton.textContent = 'Retry';
    retryButton.addEventListener('click', resetGame);
    document.getElementById("div").appendChild(retryButton);
}

function resetGame() {
    const btn0 = document.getElementById("btn0");
    const btn1 = document.getElementById("btn1");
    const btn2 = document.getElementById("btn2");
    const resultText = document.getElementById("res");

    // Reset button states and colors
    btn0.disabled = false;
    btn1.disabled = false;
    btn2.disabled = false;
    btn0.style.backgroundColor = 'gray';
    btn1.style.backgroundColor = 'gray';
    btn2.style.backgroundColor = 'gray';

    // Clear result text
    resultText.textContent = '';

    // Remove retry button
    const retryButton = document.querySelector('#div button:last-of-type');
    if (retryButton) retryButton.remove();
}