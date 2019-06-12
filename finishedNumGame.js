const readline = require('readline');
const rl = readline.createInterface(process.stdin, process.stdout);

function ask(questionText) {
  return new Promise((resolve) => {
    rl.question(questionText, resolve);
  });
}

start();
async function start() { 
 
  console.log("Comp: Let's play a game where you think of a number between 1-100 and I (Comp) try to guess it.\n");

  min = 1  //assign starting minimum
  max = 100 // assign starting maximum
  compGuess = Math.floor((min + max) / 2) //variable to make the computer guess the median between a min/max (binary search, but not really) 
  humanResponse = await ask('Is your number ' + compGuess + '?\n' + 'If it is... answer yes, or give me one of two hints: lower/higher.\n\n');
  
//console.log(response); - why does this log the users input (yes,higher,lower)
  
  while (humanResponse.toLowerCase() !== 'yes') { //while the response does NOT = yes (!==) we want to run a loop. Loop doesnt start if response === yes
    
    if (humanResponse.toLowerCase() === 'lower') {  //if response = lower, 
      max = compGuess; //reassign the variable-max value to the value of variable-guess so we dont "guess" any numbers higher than that starting "guess"  
      compGuess = Math.floor((min + max) / 2); //since we have a new max, we need to rerun and re assign the variable-guess so we can get our next "guess"                      
      humanResponse = await ask('\nIs your number ' + compGuess + '?\n' + 'If it is... answer yes, or give me one of two hints: lower/higher.\n\n');    
    }
    else if (humanResponse.toLowerCase() === 'higher') {
      min = compGuess;
      compGuess = Math.floor((min + max) / 2);
      humanResponse = await ask('\nIs your number ' + compGuess + '?\n' + 'If it is... answer yes, or give me one of two hints: lower/higher.\n\n');    
    }
    else if (humanResponse.toLowerCase() !== 'lower' , 'higher') {  //allows the human to type w/e they want in error and not break the program
      humanResponse = await ask('\nPlease answer with "yes", "lower" or "higher"\n\n');
    } 
    
  }
  console.log('\nI have guessed your number, game over!')
  process.exit();
}    
     
  