document.addEventListener('DOMContentLoaded', () => {
  const quizData = [
    {
      question: "Which language runs in a web browser?",
      options: ["Java", "C", "Python", "JavaScript"],
      correct: "JavaScript"
    },
    {
      question: "What does CSS stand for?",
      options: [
        "Cascading Style Sheets",
        "Colorful Style Syntax",
        "Creative Style System",
        "Central Styling System"
      ],
      correct: "Cascading Style Sheets"
    },
    {
      question: "What does HTML stand for?",
      options: [
        "HyperText Markup Language",
        "Home Tool Markup Language",
        "Hyper Transfer Machine Language",
        "Hyper Trainer Marking Language"
      ],
      correct: "HyperText Markup Language"
    },
    {
      question: "Which year was JavaScript launched?",
      options: ["1996", "1995", "1994", "None of the above"],
      correct: "1995"
    }
  ];

  const questionTitle = document.getElementById('question-title');
  const questionText = document.querySelector('.question-text');
  const optionButtons = document.querySelectorAll('.option');
  const nextBtn = document.getElementById('nextBtn');
  const resultCard = document.getElementById('result');
  const questionCard = document.querySelector('.question-card');
  const scoreText = document.getElementById('scoreText');
  const restartBtn = document.getElementById('restartBtn');
  const progressBar = document.querySelector('.progress');

  let currentQuestion = 0;
  let score = 0;
  let selectedAnswer = null;
  let answered = false;

  loadQuestion();

  function loadQuestion() {
    const q = quizData[currentQuestion];
    questionTitle.textContent = `Question ${currentQuestion + 1} of ${quizData.length}`;
    questionText.textContent = q.question;
    optionButtons.forEach((btn, index) => {
      btn.textContent = q.options[index];
      btn.className = "option"; // reset classes
    });

    // Update progress bar
    const progressPercent = ((currentQuestion) / quizData.length) * 100;
    progressBar.style.width = `${progressPercent}%`;

    nextBtn.disabled = true;
    selectedAnswer = null;
    answered = false;
  }

  optionButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      if (answered) return; // prevent multiple answers

      optionButtons.forEach(b => b.classList.remove('selected'));
      btn.classList.add('selected');
      selectedAnswer = btn.textContent;
      nextBtn.disabled = false;
    });
  });

  nextBtn.addEventListener('click', () => {
    if (answered) return;
    answered = true;

    const correctAnswer = quizData[currentQuestion].correct;

    optionButtons.forEach(btn => {
      if (btn.textContent === correctAnswer) {
        btn.classList.add('correct');
      } else if (btn.classList.contains('selected')) {
        btn.classList.add('incorrect');
      }
      btn.disabled = true;
    });

    if (selectedAnswer === correctAnswer) {
      score++;
    }

    // Wait 1 second, then go to next question or show result
    setTimeout(() => {
      currentQuestion++;
      if (currentQuestion < quizData.length) {
        optionButtons.forEach(btn => (btn.disabled = false));
        loadQuestion();
      } else {
        showResult();
      }
    }, 1000);
  });

  function showResult() {
    questionCard.classList.add('hidden');
    resultCard.classList.remove('hidden');
    scoreText.textContent = `You scored ${score} / ${quizData.length}`;
    progressBar.style.width = "100%";
  }

  restartBtn.addEventListener('click', () => {
    currentQuestion = 0;
    score = 0;
    resultCard.classList.add('hidden');
    questionCard.classList.remove('hidden');
    optionButtons.forEach(btn => (btn.disabled = false));
    loadQuestion();
  });
});
