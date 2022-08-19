const readline = require("readline");
const fs = require("fs").promises;
const { program } = require("commander");
require("colors");
program.option("-f, --file [type]", "file for saving game results", "results.txt");
program.parse(process.argv);

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

let count = 0;
const logFile = program.opts().file;
const mind = Math.floor(Math.random() * 10) + 1;

const isValid = value => {
  if (isNaN(value)) {
    console.log("Type number".red);
    return false;
  }
  if (value < 1 || value > 10) {
    console.log("Number should be betwen 1 and 10".red);
    return false;
  }
  return true;
};

const log = async data => {
  try {
    await fs.appendFile(logFile, `${data}\n`);
    console.log(`Succesfuly saved result in the file ${logFile}`.red);
  } catch (error) {
    console.log(`Could not save the file ${logFile}`.red);
  }
};

const game = () => {
  rl.question("Type any number from 1 to 10 to guess random generated number: ".yellow, value => {
    let a = +value;
    if (!isValid(a)) {
      game();
      return;
    }
    count += 1;
    if (a === mind) {
      console.log("Congratulations you guessed number for %d step(s)".green, count);
      log(`${new Date().toLocaleDateString()}: Congratulations you guessed number for ${count} step(s)`).finally(() =>
        rl.close()
      );
      return;
    }
    console.log("You did not guess, try once again".red);
    game();
  });
};

game();
