
// ==================================
// 1. FLOATING HEARTS
// ==================================

const heartsContainer = document.getElementById("hearts");

function createHeart() {
    const heart = document.createElement("span");

    heart.className = "heart";
    heart.textContent = Math.random() > 0.5 ? "♡" : "♥";

    heart.style.left = Math.random() * 100 + "vw";
    heart.style.fontSize = (14 + Math.random() * 20) + "px";
    heart.style.animationDuration = (6 + Math.random() * 5) + "s";

    heartsContainer.appendChild(heart);

    setTimeout(() => heart.remove(), 11000);
}

setInterval(createHeart, 650);


// ==================================
// 2. SORRY QUESTIONS
// ==================================

const questions = [
    {
        title: "Yesterday, what hurt you the most?",
        hint: "I want to understand, not argue. 💗",
        sticker: "🥺",
        answers: [
            {
                text: "The words I said",
                response: "I'm sorry my words hurt you. I should have chosen them more carefully."
            },
            {
                text: "I didn't understand your feelings",
                response: "I'm sorry I didn't understand your feelings properly. I want to listen better."
            },
            {
                text: "I didn't give you enough time",
                response: "I'm sorry I made you feel that you weren't getting my time and attention."
            },
            {
                text: "Something else",
                response: "I want to understand what happened from your side without interrupting you."
            }
        ]
    },

    {
        title: "What would help you feel better right now?",
        hint: "Choose what you really need. 🌷",
        sticker: "🌷",
        answers: [
            {
                text: "A sincere apology ❤️",
                response: "You deserve a sincere apology, not just words to end an argument."
            },
            {
                text: "For you to listen to me",
                response: "I'll give you space to speak and listen without defending myself."
            },
            {
                text: "A little time and space",
                response: "I'll respect your need for time. I won't pressure you."
            },
            {
                text: "A calm conversation",
                response: "I'd like us to talk calmly whenever you're ready."
            }
        ]
    },

    {
        title: "What should I do better from now on?",
        hint: "Your answer matters to me. 💞",
        sticker: "🧸",
        answers: [
            {
                text: "Be more patient",
                response: "I'll work on being more patient, especially when we disagree."
            },
            {
                text: "Understand before reacting",
                response: "I'll try to understand first instead of reacting too quickly."
            },
            {
                text: "Communicate honestly",
                response: "I'll try to communicate more clearly and honestly."
            },
            {
                text: "Show care through actions",
                response: "I'll show my care through actions, not only promises."
            }
        ]
    },

    {
        title: "Can we work through this together?",
        hint: "There's no wrong answer. Take your time. ❤️",
        sticker: "💗",
        answers: [
            {
                text: "Yes, let's try together ❤️",
                response: "Thank you for being willing to try. I'll do my part too.",
                ending: "Thank you for giving us a chance. Let's understand each other better. ❤️"
            },
            {
                text: "I need a little more time 🌸",
                response: "That's okay. Take the time you need. I'll respect your feelings.",
                ending: "Take the time you need. I'll respect your feelings and your space. 🌷"
            },
            {
                text: "I want to talk first 💌",
                response: "Of course. I'm ready to listen whenever you feel comfortable.",
                ending: "Whenever you're ready to talk, I'll be here to listen. 💌"
            }
        ]
    }
];

let currentQuestion = 0;
let answersChosen = [];

const welcomeScreen = document.getElementById("welcomeScreen");
const questionScreen = document.getElementById("questionScreen");
const finalScreen = document.getElementById("finalScreen");

function showScreen(screen) {
    [welcomeScreen, questionScreen, finalScreen].forEach(item => {
        item.classList.remove("active");
    });

    screen.classList.add("active");
}

function updateProgress() {
    const progress = (answersChosen.length / questions.length) * 100;

    document.getElementById("progressBar").style.width =
        progress + "%";
}

function renderQuestion() {
    const question = questions[currentQuestion];

    document.getElementById("questionNumber").textContent =
        `QUESTION 0${currentQuestion + 1} / 0${questions.length}`;

    document.getElementById("questionSticker").textContent =
        question.sticker;

    document.getElementById("questionTitle").textContent =
        question.title;

    document.getElementById("questionHint").textContent =
        question.hint;

    const answersArea = document.getElementById("answers");

    answersArea.innerHTML = "";

    question.answers.forEach(answer => {
        const button = document.createElement("button");

        button.className = "answer-btn";
        button.type = "button";
        button.textContent = answer.text;

        button.addEventListener("click", () => {
            answersChosen[currentQuestion] = answer;
            currentQuestion++;

            updateProgress();

            if (currentQuestion < questions.length) {
                renderQuestion();
            } else {
                showFinalMessage();
            }
        });

        answersArea.appendChild(button);
    });

    document.getElementById("backBtn").style.visibility =
        currentQuestion === 0 ? "hidden" : "visible";
}

function showFinalMessage() {
    const firstAnswer = answersChosen[0];

    document.getElementById("personalLine").textContent =
        firstAnswer
            ? "I heard what you shared with me. " + firstAnswer.response
            : "I know I hurt you, and I'm truly sorry.";

    const lastAnswer = answersChosen[answersChosen.length - 1];

    document.getElementById("endingLine").textContent =
        lastAnswer.ending || "Thank you for hearing me out. Your feelings matter. 💗";

    showScreen(finalScreen);
}

document.getElementById("startBtn").addEventListener("click", () => {
    currentQuestion = 0;
    answersChosen = [];

    updateProgress();
    renderQuestion();
    showScreen(questionScreen);
});

document.getElementById("backBtn").addEventListener("click", () => {
    if (currentQuestion > 0) {
        currentQuestion--;
        answersChosen.length = currentQuestion;

        updateProgress();
        renderQuestion();
    }
});

document.getElementById("restartBtn").addEventListener("click", () => {
    currentQuestion = 0;
    answersChosen = [];

    updateProgress();
    showScreen(welcomeScreen);
});


// ==================================
// 3. PROMISE BUTTONS
// ==================================

const promiseButtons = document.querySelectorAll(".promise-btn");

promiseButtons.forEach(button => {
    button.addEventListener("click", () => {

        const card = button.closest(".promise-card");

        card.classList.toggle("kept");

        if (card.classList.contains("kept")) {
            button.textContent = "Promise Made 💗";
        } else {
            button.textContent = "I Promise ❤️";
        }

    });
});


// ==================================
// 4. LOVE SURPRISE POPUP
// ==================================

const surpriseBtn = document.getElementById("surpriseBtn");
const surpriseModal = document.getElementById("surpriseModal");
const closeModal = document.getElementById("closeModal");

surpriseBtn.addEventListener("click", () => {
    surpriseModal.classList.add("show");
});

closeModal.addEventListener("click", () => {
    surpriseModal.classList.remove("show");
});

surpriseModal.addEventListener("click", (event) => {
    if (event.target === surpriseModal) {
        surpriseModal.classList.remove("show");
    }
});

document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
        surpriseModal.classList.remove("show");
    }
});


// ==================================
// 5. CONSOLE MESSAGE
// ==================================

console.log("Made with lots of love for my Kunju Kariii ❤️");
