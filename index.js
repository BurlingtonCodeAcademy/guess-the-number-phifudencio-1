const readline = require("readline");
const rl = readline.createInterface(process.stdin, process.stdout);

function ask(questionText) {
  return new Promise((resolve, reject) => {
    rl.question(questionText, resolve);
  });
}

start();

async function start() {
  let name = await ask("What is your name?\n");
  console.log("Hello " + name + " Lets Play a guessing game.");
  let pickMode = await ask(
    "Please chose your gaming mode : Player or Computer.\n"
  );
  if (pickMode == "player") {
    startPlayer(); // Start Player Mode
  } else if (pickMode == "computer") {
    startComputer(); //Start Computer Mode
  }
}

//Start Player Function
async function startPlayer() {
  let maxNum = 100; // number max to be generate
  let guessCount = 7; // Number of Guesses atempt
  let randomNum = Math.floor(Math.random() * maxNum) + 1; // Generates random number

  console.log("I'm thinking of a number from 1-100!");
  while (guessCount <= 0) {
    //Ate count = 0 do the following.
    let guess = parseInt(await ask("What am i thinking?\n"));
    if (guess < 1 || guess > 100) {
      console.log("Please chose a number between 1 - 100!");
    } else {
      if (guess >= 1) {
        if (guess === randomNum) {
          // Compare the guess with the randomNum.
          console.log("Winner Winner chicken dinner!");
          process.exit();
        } else if (guess > randomNum) {
          // If guess is bigger then the number.
          guessCount--;
          console.log(
            "The number is lower then " +
              guess +
              ".\n" +
              "You have " +
              guessCount +
              " guesses!"
          );
        } else if (guess < randomNum) {
          // if guess is lower then the number
          guessCount--;
          console.log(
            "The number is bigger then " +
              guess +
              ".\n" +
              "You have " +
              guessCount +
              " guesses!"
          );
        }
      }
      if (guessCount <= 0) {
        console.log("If you can accept losing, you can't win!\
        Try again.");
        process.exit();
      }
    }
  }
}
