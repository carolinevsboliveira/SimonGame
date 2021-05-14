var buttonColors = ["red", "blue", "green", "yellow"]
var gamerPattern = []
var userClickedPatern = []
var gameStarted = false
var level = 0
function playTheAudio(randomChoosenColour){
    var audio = new Audio('./sounds/'+randomChoosenColour+'.mp3')
    audio.play()
}
function fadeEffect(selectedColor){
    $(`#${selectedColor}`).fadeTo(100, 0.3, function() { $(this).fadeTo(500, 1.0); });
}

function animatePress(currentElement, currentClass,delayTime){
    $(currentElement).addClass(currentClass);
    setTimeout(function(){
        $(currentElement).removeClass(currentClass)
    }, delayTime);
}
function updateH1Value(level){
    $("h1").text(`Level ${level}`)
}
function gamerOver(){
    $("h1").text(`Game Over, Press Any Key to Restart`)
    animatePress("body", "game-over",200)
}
function nextSequence(){
    var selectedColour = Math.floor(Math.random()*4)
    var randomChoosenColour = buttonColors[selectedColour]
    gamerPattern.push(randomChoosenColour)
    playTheAudio(randomChoosenColour)
    fadeEffect(randomChoosenColour)
    level+=1
    updateH1Value(level)
}
function checkAnswer(currentLevel1){
   if(userClickedPatern[currentLevel1] == gamerPattern[currentLevel1]){
       if(userClickedPatern.length == gamerPattern.length){
           userClickedPatern = []
           setTimeout(function(){
               nextSequence();
           },100)
       }
   }
   else
   {
      gamerOver() 
      startOver()
   }
}
function startOver(){
    level = 0
    gamerPattern = []
    gameStarted = false
    userClickedPatern = []
}
$(".btn").click(function(){
    var currentId = $(this).attr("id")
    userClickedPatern.push(currentId)
    playTheAudio(currentId)
    animatePress(`#${currentId}`, "pressed", 100)
    checkAnswer(userClickedPatern.length-1)
});

$(document).keypress(function(event){
    if(!gameStarted){
        nextSequence()
        gameStarted = true
    }
})