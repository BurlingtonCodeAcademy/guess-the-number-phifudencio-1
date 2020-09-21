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

  while (true) {
    //Ate count = 0 do the following.
    console.log("I'm thinking of a number from 1-100!");
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
        console.log(
          "If you can accept losing, you can't win!\
        Try again."
        );
        process.exit();
      }
    }
  }
}
async function startComputer() {
  let miniNum = 1;
  let MAXnumb = 100;
  let x = random(miniNum, MAXnumb);

  console.log(
    "You will pick a number between 0 - 100 and i will try to guess !"
  );
  let playerNum = await ask("Chose Wisely , i wont cheat i promise!. \n");
  console.log("You chose " + playerNum + " ! \n");

  let ComputerGuess = await ask("Is your number " + x + " ?\n");
  while (ComputerGuess !== "y" || ComputerGuess !== "yes") {
    let finalGuess = x;
    ComputerGuess = cleanLow(ComputerGuess);

    if (ComputerGuess === "yes" || ComputerGuess === "y") {
      console.log("I won ,  as always :) !!!");
      ComputerGuess = cleanLow(ComputerGuess);
      break;
    }
    // /\ This line to top is right /\ \\
    /// \/ FIX the code bellow ( Still chossing random numbers not higher or lower).
    else if (ComputerGuess === "n" || ComputerGuess === "no") {
      ComputerGuess = await ask("Is the number higher or lower?\n");
      ComputerGuess = cleanLow(ComputerGuess);

      if (ComputerGuess === "h" || ComputerGuess === "higher") {
        miniNum = x + 1;
        x = random(miniNum, MAXnumb);
        ComputerGuess = await ask("The number " + x + " is your number?\n");
        if (finalGuess === x) {
          console.log(" Youre cheating ! Dont make me Hack your brain!!");
          break;
        }
      } else if (ComputerGuess === "l" || ComputerGuess === "lower") {
        miniNum = x - 1;
        x = random(miniNum, MAXnumb);
        ComputerGuess = await ask("The number " + x + " is your number?\n");
        if (finalGuess === x) {
          conso(" Youre cheating ! Dont make me Hack your brain!!");
          break;
        }
      }
    }
  }
}
