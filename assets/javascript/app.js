$(document).ready(function() {

  // Functions

  function initialScreen() {
    startScreen =
      "<p class='text-center main-button-container'><a class='btn btn-info btn-lg btn-block startButton' href='#' role='button'>Start Game</a></p>";
    $(".mainArea").html(startScreen);
  }

  initialScreen();

  function timeoutLoss() {
    totalMissed++;
    gameHTML =
      "<p class='text-center timerP'>Time Remaining: <span class='timer'>" +
      counter +
      "</span></p>" +
      "<p class='text-center'>You ran out of time!   The correct answer was:  " +
      correctAnswers[qCount] +
      "</p>" +
      "<img class='center-block img-wrong' src='assets/images/wrong.gif'>";
    $(".mainArea").html(gameHTML);
    setTimeout(wait, 4000);
  }
  
  function addWin() {
    totalCorrect++;
    gameHTML =
      "<p class='text-center timerP'>Time Remaining: <span class='timer'>" +
      counter +
      "</span></p>" +
      "<p class='text-center'>Correct!  The answer was:  " +
      correctAnswers[qCount] +
      "</p>" +
      imageArray[qCount];
    $(".mainArea").html(gameHTML);
    setTimeout(wait, 4000);
  }

  function addLoss() {
    totalWrong++;
    gameHTML =
      "<p class='text-center timerP'>Time Remaining: <span class='timer'>" +
      counter +
      "</span></p>" +
      "<p class='text-center'>Wrong!  The correct answer was:  " +
      correctAnswers[qCount] +
      "</p>" +
      "<img class='center-block img-wrong' src='assets/images/wrong.gif'>";
    $(".mainArea").html(gameHTML);
    setTimeout(wait, 4000);
  }
  
  function createHTML() {
    gameHTML =
      "<p class='text-center timerP'>Time Remaining: <span class='timer'>30</span></p><p class='text-center question'>" +
      questionArray[qCount] +
      "</p><p class='firstAnswer answer'>A. " +
      answerArray[qCount][0] +
      "</p><p class='answer'>B. " +
      answerArray[qCount][1] +
      "</p><p class='answer'>C. " +
      answerArray[qCount][2] +
      "</p><p class='answer'>D. " +
      answerArray[qCount][3] +
      "</p>";
    $(".mainArea").html(gameHTML);
  }
  
  function wait() {
    if (qCount < 7) {
      qCount++;
      createHTML();
      counter = 30;
      timer();
    } else {
      finalScreen();
    }
  }
  
  function timer() {
    qTimer = setInterval(thirtySeconds, 1000);
    function thirtySeconds() {
      if (counter === 0) {
        clearInterval(qTimer);
        timeoutLoss();
      }
      if (counter > 0) {
        counter--;
      }
      $(".timer").html(counter);
    }
  }
  
  function finalScreen() {
    gameHTML =
      "<p class='text-center timerP'>Time Remaining: <span class='timer'>" +
      counter +
      "</span></p>" +
      "<p class='text-center'>All finished, here are your Final Results!" +
      "</p>" +
      "<p class='summary-correct'>Total Correct Answers: " +
      totalCorrect +
      "</p>" +
      "<p>Total Wrong Answers: " +
      totalWrong +
      "</p>" +
      "<p>Total Unanswered: " +
      totalMissed +
      "</p>" +
      "<p class='text-center resetButton-container'><a class='btn btn-info btn-lg btn-block resetButton' href='#' role='button'>Reset The Game!</a></p>";
    $(".mainArea").html(gameHTML);
  }
  
  function resetGame() {
    qCount = 0;
    totalCorrect = 0;
    totalWrong = 0;
    totalMissed = 0;
    counter = 30;
    createHTML();
    timer();
  }

  // Click Events

  $("body").on("click", ".startButton", function(event) { 
    createHTML();
    timer();
  });

  $("body").on("click", ".answer", function(event) {
    userAnswer = $(this).text();
    if (userAnswer === correctAnswers[qCount]) {
      clearInterval(qTimer);
      addWin();
    } else {
      clearInterval(qTimer);
      addLoss();
    }
  });

  $("body").on("click", ".resetButton", function(event) {
    resetGame();
  });
});

  // Variables
  var startScreen;
  var gameHTML;
  var counter = 30;
  var questionArray = [
    "What happened to Harry's Nimbus 2000 when the Dementors came to a Quidditch match?",
    "Who was Harry's third Defence Against the Dark Arts teacher?",
    "What colour were the sparks that flew out of Harry's wand the first time he held it?",
    "In which Quidditch position did Oliver Wood play when he was still at Hogwarts?",
    "What do the passwords for Dumbledore's office all have in common?",
    "Who is the attractive barmaid and owner of the Three Broomsticks in Hogsmeade?",
    "Which room did the DA use for their meetings?",
    "What is the number of the Gringotts vault that contained the Philosopher's Stone?"
  ];
  var answerArray = [
    ["He lost it", "It flew into the Whomping Willow", "Malfoy stole it", "Fluffy ate it"],
    ["Professor Lockhart", "Professor Snape", "Professor Lupin", "Professor Quirrel"],
    ["Blue & Silver", "Gold & Orange", "Red & Gold", "Gold & Silver"],
    ["Chaser", "Beater", "Keeper", "Seeker"],
    ["Names of Sweets", "Names of Spells", "Names of Professors", "Names of Fruit"],
    ["Madam Hooch", "Madam Pomfrey", "Madam Maxime", "Madam Rosmerta"],
    ["Chamber of Secrets", "Room of Requirement", "Prefects Bathroom", "Shrieking Shack"],
    ["714", "513", "530", "713"]
  ];
  var imageArray = [
    "<img class='center-block img-fluid' src='assets/images/whomping.gif'>",
    "<img class='center-block img-fluid' src='assets/images/lupin.gif'>",
    "<img class='center-block img-fluid' src='assets/images/wand.gif'>",
    "<img class='center-block img-fluid' src='assets/images/oliver.gif'>",
    "<img class='center-block img-fluid' src='assets/images/dumbledore.gif'>",
    "<img class='center-block img-fluid' src='assets/images/rosmerta.gif'>",
    "<img class='center-block img-fluid' src='assets/images/ror.gif'>",
    "<img class='center-block img-fluid' src='assets/images/713.gif'>"
  ];
  var correctAnswers = [
    "B. It flew into the Whomping Willow",
    "C. Professor Lupin",
    "C. Red & Gold",
    "C. Keeper",
    "A. Names of Sweets",
    "D. Madam Rosmerta",
    "B. Room of Requirement",
    "D. 713"
  ];
  var qCount = 0;
  var userAnswer;
  var qTimer;
  var totalCorrect = 0;
  var totalWrong = 0;
  var totalMissed = 0;

