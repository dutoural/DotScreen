// Set the turn to player1 by default
let player1_turn = true;

// Boolean to handle resetting frame
let reset = false;

// Get the list of all cells / players
const cells = document.querySelectorAll(".cell");
const players = document.querySelectorAll(".player");

// Get elements of the countdown
const countDown_seconds = document.querySelector("#countdown > .seconds");
const countDown_minutes = document.querySelector("#countdown > .minutes");

// Launch countdown on page opening
launchCountdown();

// Set up the event listeners for each cell
cells.forEach((cell) => {
  cell.addEventListener("click", handleClick);
});

// Set up the countdown
function launchCountdown() {
  var countDownInterval = setInterval(function () {
    new_seconds = parseInt(countDown_seconds.textContent) - 1;
    if (new_seconds < 0) {
      new_minutes = parseInt(countDown_minutes.textContent) - 1;
      if (new_minutes < 0) {
        clearInterval(countDownInterval);
        resetBoard();
        displayWinner();
        return;
      }
      countDown_minutes.textContent = new_minutes.toString().padStart(2, "0");
      countDown_seconds.textContent = "59";
    } else {
      countDown_seconds.textContent = new_seconds.toString().padStart(2, "0");
    }
  }, 1000);
}

// Handle the click on a tic tac toe cell
function handleClick(event) {
  if (!reset) {
    const cell = event.target;
    if (cell.textContent == "") {
      cell.textContent = player1_turn ? "X" : "O";

      // check for win after each click
      if (checkWin()) {
        let score =
          document.querySelectorAll(".player-score")[player1_turn ? 0 : 1];
        score.textContent = parseInt(score.textContent) + 1;
        reset = true;
        setTimeout(() => {
          reset = false;
          resetBoard();
        }, 1000);
      } else if (checkTie()) {
        reset = true;
        setTimeout(() => {
          resetBoard();
          reset = false;
        }, 1000);
      }

      // switch player
      players.forEach((player) => {
        player.classList.toggle("active");
      });
      player1_turn = !player1_turn;
    }
  }
}

// Check if the round is a tie
function checkTie() {
  var tie = true;
  cells.forEach((cell) => {
    if (cell.textContent == "") {
      tie = false;
    }
  });
  return tie;
}

// Check if the round is won or not
function checkWin() {
  let combinations = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  // check if a combination is reached
  for (let combination of combinations) {
    if (
      cells[combination[0]].textContent == cells[combination[1]].textContent &&
      cells[combination[1]].textContent == cells[combination[2]].textContent &&
      cells[combination[0]].textContent != ""
    ) {
      cells[combination[0]].classList.add("win");
      cells[combination[1]].classList.add("win");
      1000;
      cells[combination[2]].classList.add("win");
      return true;
    }
  }
  return false;
}

// Establish the winner and display it in a modal
function displayWinner() {
  score_P1 = parseInt(
    document.querySelectorAll(".player-score")[0].textContent
  );
  score_P2 = parseInt(
    document.querySelectorAll(".player-score")[1].textContent
  );
  if (score_P1 > score_P2) {
    document.querySelector(
      "#result"
    ).textContent = `Winner : Player X ${score_P1} / ${score_P2}`;
  } else if (score_P2 > score_P1) {
    document.querySelector(
      "#result"
    ).textContent = `Winner : Player O ${score_P2} / ${score_P1}`;
  } else {
    document.querySelector(
      "#result"
    ).textContent = `It's a tie ${score_P1} / ${score_P2}`;
  }

  document.querySelector("#modal").style.display = "flex";
}

// Reset the board to the initial state and set the turn to player1
function resetBoard() {
  cells.forEach((cell) => {
    cell.textContent = "";
    cell.classList.remove("win");
  });
  player1_turn = true;
  players[0].classList.add("active");
  players[1].classList.remove("active");
}

// Restart the game
function restart() {
  resetBoard();
  document.querySelectorAll(".player-score").forEach((score) => {
    score.textContent = "0";
  });

  // restart the timer
  document.querySelector("#countdown > .minutes").textContent = "03";
  document.querySelector("#countdown > .seconds").textContent = "00";
  launchCountdown();

  // hide the modal
  document.querySelector("#modal").style.display = "none";
}
