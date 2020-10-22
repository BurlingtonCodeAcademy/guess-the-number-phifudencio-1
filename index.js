const readline = require("readline");
const rl = readline.createInterface(process.stdin, process.stdout);

function ask(questionText) {
  return new Promise((resolve, reject) => {
    rl.question(questionText, resolve);
  });
}

start(); // Calling the function to start the game.


//Function that start the game Asking the name of the plauyer and the mode to play.
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

//Start the player guess
async function startPlayer() {
  let maxNum = 100; // number max to be generate
  let guessCount = 7; // Number of Guesses atempt
  let randomNum = Math.floor(Math.random() * maxNum) + 1; // Generates random number

  while (guessCount >= 0) {
    //Ate count = 0 do the following.p
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
          console.log(  "The number is lower then " + guess + ".\n" + "You have " + guessCount +  " guesses!");
        } else if (guess < randomNum) {
          // if guess is lower then the number
          guessCount--;
          console.log( "The number is bigger then " + guess + ".\n" + "You have " + guessCount +  " guesses!");
        }
      } //Wen you guess < 0
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

//Function that is start computer guess
async function startComputer() {
  //Global variables
  let minNum = 1;
  let maxNum = 100;
  let guessCount = 7;
  let randomNumber = random(minNum, maxNum);

  console.log(
    "You will pick a number between 0 - 100 and i will try to guess !"
  );
  //Ask for a number of the player
  let playerNum = await ask("Chose Wisely , i wont cheat i promise!. \n");
  console.log("You chose " + playerNum + " ! \n");
  //Computer ask if is a random number first
  let computerGuess = await ask("Is your number " + randomNumber + " ?\n");

  //While guessCount >= 0 Let you play the game
  while (guessCount >= 0) {
    let finalGuess = randomNumber; // new variable for the randomNumber on line 85
    computerGuess = cleanLow(computerGuess); //Clean computer guess

    //Checks if the player say yes for the number that computer guessed
    if (computerGuess === "yes" || computerGuess === "y") {
      console.log("I won ,  as always :) !!!");
      computerGuess = cleanLow(computerGuess);
      break;
    }
    //Checks if the player say no for the number that computer guessed
    else if (computerGuess === "n" || computerGuess === "no") {
      computerGuess = await ask("Is the number higher or lower?\n"); //ask if the number is higher or lower
      computerGuess = cleanLow(computerGuess);

      //Check the answer of the player if the  computerGuess is higher
      if (computerGuess === "h" || computerGuess === "higher") {
        minNum = randomNumber + 1; // Add one to randdomNumber
        randomNumber = random(miniNum, MAXnumb); // Call randomNumber again
        computerGuess = await ask(
          "The number " + randomNumber + " is your number?\n" //Ask again if the randoNumber is the number
        );

        //Check if it is cheating
        if (finalGuess === randomNumber) {
          console.log(" Youre cheating ! Dont make me Hack your brain!!");
          break;
        }
      }
      //Check the answer of the player if the computerGuess is lower
      else if (computerGuess === "l" || computerGuess === "lower") {
        minNum = randomNumber - 1; //Takes 1 from randomNumber {NOT SURE IF THIS IS MAKING GUESS LOWER}
        randomNumber = random(miniNum, MAXnumb); //Calls randomNumber Again
        computerGuess = await ask(
          "The number " + randomNumber + " is your number?\n" //Ask again if the randomNUmber is the number
        );
        //Check if it is cheating
        if (finalGuess === randomNumber) {
          console.log(" Youre cheating ! Dont make me Hack your brain!!");
          break;
        }
      }
    }
  }
}
