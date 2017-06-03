/**
* A code breaker game in javascript
* Author : Alapan Chatterjee; Date : 03-06-2017
*/
var answer = document.getElementById('answer'), attempt = document.getElementById('attempt');

function guess() {

    if(answer.value == '' || attempt.value == ''){
        setHiddenFields();
    }

    var input = document.getElementById('user-guess');
    //add functionality to guess function here
    if(validateInput(input.value)){
      attempt.value = parseInt(attempt.value) + 1;
    }
    else{
      return false;
    }

    if(getResults(input.value)){
        setMessage("You Win! :)");
        showAnswer(true);
        showReplay();
    }
    else{
      if(attempt.value >= 10){
        setMessage("You Lose! :(");
        showAnswer(false);
        showReplay();
      }
      else{
        setMessage("Incorrect, try again.");
      }
    }
}

//implement new functions here

/*----- Function to get random 4 digit output -----*/
function setHiddenFields(){
    answer.value = Math.floor(Math.random() * 1000).toString();
    while(answer.value.length < 4){
      answer.value = "0" + answer.value;
    }
    attempt.value = "0";
}

/*----- Function to set message to show -----*/
function setMessage(message){
    document.getElementById("message").innerHTML = message;
}

/*----- Function to validate user input -----*/
function validateInput(userInput){
    if(userInput.length == 4){
      return true;
    }
    else{
      setMessage("Guesses must be exactly 4 characters long.");
      return false;
    }
}

/*----- Function to set result -----*/
function getResults(userInput){
    var output = '<div class="row"><span class="col-md-6">' + userInput + '</span><div class="col-md-6">', correctCount = 0;
    for(var i=0,count=userInput.length; i<count; i++){
          //We get this character at perfect position
          if(userInput.charAt(i) === answer.value.charAt(i)){
              output += '<span class="glyphicon glyphicon-ok"></span>';
              correctCount++;
          }
          //Character at another position
          else if(answer.value.indexOf(userInput.charAt(i)) !== -1){
             output += '<span class="glyphicon glyphicon-transfer"></span>';
          }
          //Character not found
          else{
            output += '<span class="glyphicon glyphicon-remove"></span>';
          }
    }
    output += '</div></div>';
    document.getElementById('results').innerHTML = document.getElementById('results').innerHTML + output;

    return correctCount === answer.value.length;
}

/*----- Function to show answer to user -----*/
function showAnswer(status){
  document.getElementById("code").innerHTML = answer.value;
  if(status === true){
    document.getElementById("code").classList.add("success");
  }
  else{
    document.getElementById("code").classList.add("failure");
  }
}

function showReplay(){
  document.getElementById("guessing-div").style.display = "none";
  document.getElementById("replay-div").style.display   = "block";

}
