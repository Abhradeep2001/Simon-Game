//Colors Array
var buttonColors = ["red", "blue", "green", "yellow"];
//Empty Array(nextSequence)
var gamePattern = [];
//Empty Array(for click function)
var userClickedPattern = [];
//To keep track if the game has started or not
var started = false;
//Level variable
var level = 0;
//KeyBoard Press activation of game
$(document).keypress(function() {
  if (!started) {
    $("#level-title").text("Level " + level);
    nextSequence();
    started = true;
  }
});
//To generate any random number between 0 and 3
function nextSequence() {
  //Once nextSequence() is triggered, reset the userClickedPattern to an empty array ready for the next level.
  userClickedPattern = [];
  //Increment level
  level++;
  //Updating h1
  $("#level-title").text("level " + level);

  //To store random number in the variable
  var randomNumber = Math.random();
  randomNumber = Math.floor(randomNumber * 4);
  //To select any random Color from the buttonColors Array
  var randomChosenColor = buttonColors[randomNumber];
  //To add randomChosenColor at the end of the empty Array
  gamePattern.push(randomChosenColor);
  //To set a flasing animation to a randomply
  $("#" + randomChosenColor).fadeIn(100).fadeOut(100).fadeIn(100);
  //To play sound for random generated button
  playSound(randomChosenColor);
  //Animation for randomly generated button
  animatePress(randomChosenColor);
}

//Click response and console logging id
$(".btn").click(function() {
  var userChosenColor = $(this).attr("id");
  userClickedPattern.push(userChosenColor);
  //To play sound on click
  playSound(userChosenColor);
  //Click animation
  animatePress(userChosenColor);
  //Call checkAnswer
  checkAnswer(userClickedPattern.length - 1);
});

function checkAnswer(currentLevel) {
  // To check if the most recent user answer is the same as the game pattern.
  if (userClickedPattern[currentLevel] === gamePattern[currentLevel]) {
    console.log("Success");
    // If the user got the most recent answer right in step 3, then check that they have finished their sequence with another if statement.
    if (userClickedPattern.length === gamePattern.length) {
      setTimeout(function() {
        nextSequence();
      }, 1000);
    }
  } else {
    console.log("Wrong");
    var audio = new Audio("sounds/wrong.mp3");
    $("body").addClass("game-over");
    setTimeout(function() {
      $("body").removeClass("game-over");
    }, 200);
    $("#level-title").text("Game Over, Press Any Key To Restart!!");
    startOver();
  }

}

//Sound function
function playSound(name) {
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}

//Press Animation function
function animatePress(currentColor) {
  $("#" + currentColor).addClass("pressed");
  setInterval(function() {
    $("#" + currentColor).removeClass("pressed");
  }, 100);
}

//Start-over(Restart the game)
function startOver() {
  level = 0;
  gamePattern = [];
  started = false;
}
