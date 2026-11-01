```javascript
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
        question: "Which tag creates a hyperlink in HTML?",
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

function showQuestion() {
    answered = false;

    const q = questions[current];
    questionElement.textContent = q.question;
    progressElement.textContent =
        `Question ${current + 1} of ${questions.length}`;

    answersElement.replaceChildren();

    q.answers.forEach((answer, index) => {
        const button = document.createElement("button");
        button.textContent = answer;
        button.className = "answer";

        button.addEventListener("click", () => {
            if (answered) return;

            answered = true;

            const buttons = answersElement.querySelectorAll("button");

            buttons.forEach((b, i) => {
                b.disabled = true;

                if (i === q.correct) {
                    b.classList.add("correct");
                }
            });

            if (index !== q.correct) {
                button.classList.add("wrong");
            } else {
                score++;
            }

            nextButton.disabled = false;
        });

        answersElement.appendChild(button);
    });

    nextButton.textContent =
        current === questions.length - 1
            ? "See Results"
            : "Next Question";

    nextButton.disabled = true;
}

nextButton.addEventListener("click", () => {
    if (!answered) return;

    current++;

    if (current < questions.length) {
        showQuestion();
    } else {
        document.getElementById("quiz").hidden = true;
        document.getElementById("result").hidden = false;

        document.getElementById("score").textContent =
            `Your score: ${score} out of ${questions.length}`;
    }
});

document.getElementById("restart").addEventListener("click", () => {
    current = 0;
    score = 0;

    document.getElementById("result").hidden = true;
    document.getElementById("quiz").hidden = false;

    showQuestion();
});

showQuestion();
```