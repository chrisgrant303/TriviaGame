var triviaQuestions = [{
    question: "What is Mario's brothers name?",
    answerList: ["Jeff", "Luigi", "Hank", "Montezuma"],
    answer: 1
}, {
    question: "What is the name of the hero that saves Zelda?",
    answerList: ["Link", "Bill Gates", "Metroidia", "Pecker"],
    answer: 0
}, {
    question: "What was the name of the gaming console created by Sony?",
    answerList: ["Playstation", "Dreamcast", "Colecovision", "Nintendo"],
    answer: 0
}, {
    question: "What was the name of the 16 bit console created by Nintendo?",
    answerList: ["Super Nintendo", "TG 16", "Nintendo Amazing", "Genesis"],
    answer: 0
}, {
    question: "What is a classic puzzle game with Russian themes and music?",
    answerList: ["Tic Tac Toe", "Jenga", "Kid Icarus", "Tetris"],
    answer: 3
}, {
    question: "Which NAMCO character chews pellets, fruits, and ghosts?",
    answerList: ["Hank", "Sonic", "Steel Giant", "Pac-Man"],
    answer: 3
}, {
    question: "What is the name of the female protagonist from the Metroid series?",
    answerList: ["Jennifer", "Samus", "Samantha", "Rose"],
    answer: 1
}, {
    question: "The video game series where you go against the secret society known as the Knights Templar.",
    answerList: ["USA", "Martian Chronicles", "Assassins Creed", "Far Cry"],
    answer: 2
}, {
    question: "The name of Mega Man's dog companion?",
    answerList: ["Cujo", "Rush", "Kim Kardashian", "Bush"],
    answer: 1
}, {
    question: "This character first starred with Mario before having his own series collecting bananas.",
    answerList: ["Jeff", "Woody", "Buzz Lightyear", "Donkey Kong"],
    answer: 3
}, {
    question: "The name of Nintendo's 1st mobile console.",
    answerList: ["Gameboy", "Alpha 5", "Gadget Machine", "Astro Boy"],
    answer: 0
}, {
    question: "In Halo, the name of the popular protagonist.",
    answerList: ["The Brave Little Toaster", "Master Chief", "Miles", "Francis the Terminator"],
    answer: 1
}, {
    question: "The name of the princess in the Super Mario Series.",
    answerList: ["Hannah", "Eliza", "Samantha", "Peach"],
    answer: 3
}, {
    question: "Published by Bethesda, this game series takes place in a post apocalyptic world where you survive a nuclear war.",
    answerList: ["Fallout", "Nuclear Doom", "Hellhole", "Space Adventure"],
    answer: 0
}, {
    question: "The name of Mario's mushroom companion.",
    answerList: ["Trippy", "Mark5", "Toad", "Jeff"],
    answer: 2
}];

var gifArray = ['question1', 'question2', 'question3', 'question4', 'question5', 'question6', 'question7', 'question8', 'question9', 'question10', 'question11', 'question12', 'question13', 'question14', 'question15'];
var currentQuestion;
var correctAnswer;
var incorrectAnswer;
var unanswered;
var seconds;
var time;
var answered;
var userSelect;
var messages = {
    correct: "Yes, that's right!",
    incorrect: "No, that's not it.",
    endTime: "Out of time!",
    finished: "Alright! Let's see how well you did."
}

$('#startBtn').on('click', function () {
    $(this).hide();
    newGame();
});

$('#startOverBtn').on('click', function () {
    $(this).hide();
    newGame();
});

function newGame() {
    $('#finalMessage').empty();
    $('#correctAnswers').empty();
    $('#incorrectAnswers').empty();
    $('#unanswered').empty();
    currentQuestion = 0;
    correctAnswer = 0;
    incorrectAnswer = 0;
    unanswered = 0;
    newQuestion();
}

function newQuestion() {
    $('#message').empty();
    $('#correctedAnswer').empty();
    $('#gif').empty();
    answered = true;

    //sets up new questions & answerList
    $('#currentQuestion').html('Question #' + (currentQuestion + 1) + '/' + triviaQuestions.length);
    $('.question').html('<h2>' + triviaQuestions[currentQuestion].question + '</h2>');
    for (var i = 0; i < 4; i++) {
        var choices = $('<div>');
        choices.text(triviaQuestions[currentQuestion].answerList[i]);
        choices.attr({
            'data-index': i
        });
        choices.addClass('thisChoice');
        $('.answerList').append(choices);
    }
    countdown();
    //clicking an answer will pause the time and setup answerPage
    $('.thisChoice').on('click', function () {
        userSelect = $(this).data('index');
        clearInterval(time);
        answerPage();
    });
}

function countdown() {
    seconds = 15;
    $('#timeLeft').html('<h3>Time Remaining: ' + seconds + '</h3>');
    answered = true;
    //sets timer to go down
    time = setInterval(showCountdown, 1000);
}

function showCountdown() {
    seconds--;
    $('#timeLeft').html('<h3>Time Remaining: ' + seconds + '</h3>');
    if (seconds < 1) {
        clearInterval(time);
        answered = false;
        answerPage();
    }
}

function answerPage() {
    $('#currentQuestion').empty();
    $('.thisChoice').empty(); //Clears question page
    $('.question').empty();

    var rightAnswerText = triviaQuestions[currentQuestion].answerList[triviaQuestions[currentQuestion].answer];
    var rightAnswerIndex = triviaQuestions[currentQuestion].answer;
    // $('#gif').html('<img src = "assets/images/' + gifArray[currentQuestion] + '.gif" width = "400px">');
    //checks to see correct, incorrect, or unanswered
    if ((userSelect == rightAnswerIndex) && (answered == true)) {
        correctAnswer++;
        $('#message').html(messages.correct);
    } else if ((userSelect != rightAnswerIndex) && (answered == true)) {
        incorrectAnswer++;
        $('#message').html(messages.incorrect);
        $('#correctedAnswer').html('The correct answer was: ' + rightAnswerText);
    } else {
        unanswered++;
        $('#message').html(messages.endTime);
        $('#correctedAnswer').html('The correct answer was: ' + rightAnswerText);
        answered = true;
    }

    if (currentQuestion == (triviaQuestions.length - 1)) {
        setTimeout(scoreboard, 5000)
    } else {
        currentQuestion++;
        setTimeout(newQuestion, 5000);
    }
}

function scoreboard() {
    $('#timeLeft').empty();
    $('#message').empty();
    $('#correctedAnswer').empty();
    $('#gif').empty();

    $('#finalMessage').html(messages.finished);
    $('#correctAnswers').html("Correct Answers: " + correctAnswer);
    $('#incorrectAnswers').html("Incorrect Answers: " + incorrectAnswer);
    $('#unanswered').html("Unanswered: " + unanswered);
    $('#startOverBtn').addClass('reset');
    $('#startOverBtn').show();
    $('#startOverBtn').html('Start Over?');
}