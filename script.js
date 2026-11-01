document.addEventListener("DOMContentLoaded", function () {
    const questions = [
        {
            question: "Which language creates the structure of a website?",
            answers: ["Python", "HTML", "CSS", "SQL"],
            correct: 1
        },
        {
            question: "Which language is used to style websites?",
            answers: ["Java", "Python", "CSS", "C++"],
            correct: 2
        },
        {
            question: "Which language makes websites interactive?",
            answers: ["JavaScript", "HTML", "CSS", "SQL"],
            correct: 0
        },
        {
            question: "Which HTML tag creates a hyperlink?",
            answers: ["<p>", "<h1>", "<a>", "<br>"],
            correct: 2
        },
        {
            question: "Which keyword declares a variable in JavaScript?",
            answers: ["print", "let", "echo", "select"],
            correct: 1
        }
    ];

    let current = 0;
    let score = 0;
    let answered = false;

    const questionElement = document.getElementById("question");
    const answersElement = document.getElementById("answers");
    const progressElement = document.getElementById("progress");
    const nextButton = document.getElementById("next");
    const feedbackElement = document.getElementById("feedback");
    const quizElement = document.getElementById("quiz");
    const resultElement = document.getElementById("result");
    const scoreElement = document.getElementById("score");
    const restartButton = document.getElementById("restart");

    function showQuestion() {
        answered = false;

        const q = questions[current];

        questionElement.textContent = q.question;
        progressElement.textContent =
            `Question ${current + 1} of ${questions.length}`;

        answersElement.replaceChildren();
        feedbackElement.textContent = "";
        nextButton.disabled = true;

        nextButton.textContent =
            current === questions.length - 1
                ? "See Results"
                : "Next Question";

        q.answers.forEach(function (answer, index) {
            const button = document.createElement("button");

            button.type = "button";
            button.textContent = answer;
            button.className = "answer";

            button.addEventListener("click", function () {
                if (answered) return;

                answered = true;

                const buttons = answersElement.querySelectorAll("button");

                buttons.forEach(function (b, i) {
                    b.disabled = true;

                    if (i === q.correct) {
                        b.classList.add("correct");
                    }
                });

                if (index === q.correct) {
                    score++;
                    feedbackElement.textContent = "Correct answer!";
                } else {
                    button.classList.add("wrong");
                    feedbackElement.textContent =
                        "Incorrect. The correct answer is " +
                        q.answers[q.correct] + ".";
                }

                nextButton.disabled = false;
            });

            answersElement.appendChild(button);
        });
    }

    nextButton.addEventListener("click", function () {
        if (!answered) return;

        if (current < questions.length - 1) {
            current++;
            showQuestion();
        } else {
            quizElement.hidden = true;
            resultElement.hidden = false;

            scoreElement.textContent =
                `Your score: ${score} out of ${questions.length}`;
        }
    });

    restartButton.addEventListener("click", function () {
        current = 0;
        score = 0;

        quizElement.hidden = false;
        resultElement.hidden = true;

        showQuestion();
    });

    showQuestion();
});