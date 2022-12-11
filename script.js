const Questions = [
  {
    question: "(3 + 6) × (8 - 5)",
    answer: 27,
    options: [46, 67, 42, 27],
  },
  {
    question: "9 × (3 + 3)",
    answer: 54,
    options: [21, 30, 54, 24],
  },
  {
    question: "6 × 7 - 4 × 8",
    answer: 10,
    options: [144, 10, 304, 17],
  },
  {
    question: "(7²+ 11) ÷ 5",
    answer: 12,
    options: [5, 3.7, 12, 51],
  },
  {
    question: "(11 X 2)-(5 X 2)",
    answer: 12,
    options: [48, 43, 10, 12],
  },
];

let correctAnswer = 0;

const startBtn = document.querySelector("#start");

const questionBox = document.querySelector(".question-box");

// Below code will create Timer function
const timer = () => {
  const timer = document.createElement("p");

  timer.setAttribute("class", "timer");

  let count = 5;

  timer.innerText = count--;

  setInterval(() => {
    if (count >= 0) {
      timer.innerText = count--;
    }
  }, 1000);

  return timer;
};

// Below code will create function which return Array of random numbers
const RandomArrayNumbers = (limit) => {
  let array = [];

  while (array.length < limit) {
    let r = Math.floor(Math.random() * limit);

    if (array.indexOf(r) === -1) {
      array.push(r);
    }
  }

  return array;
};

// This will generate Array of random number for Questions
let RandomNumArray = RandomArrayNumbers(Questions.length);

// Below will create
const createQuestion = () => {
  let count = 1;
  const questions = document.createElement("h2");

  questions.setAttribute("class", "question");

  let i = 0;

  let j = 0;

  let k = 0;

  questionBox.append(timer());

  questions.innerText = `Q${count < Questions.length && count++} : ${
    Questions[RandomNumArray[i++]].question
  }`;

  let x = setInterval(() => {
    if (i < Questions.length) {
      questionBox.append(timer());
      questions.innerText = `Q${count <= Questions.length && count++} : ${
        Questions[RandomNumArray[i++]]?.question
      }`;

      document.querySelector(".options")?.remove();

      document.querySelector(".timer").remove();

      createOptions(j++);
      checkAnswers(Questions[RandomNumArray[k++]].answer);
    } else {
      !document.querySelector(".panel") && createResultPanel(correctAnswer);
      RestartQuiz();
      clearInterval(x);
    }
    console.log(correctAnswer);
  }, 6000);

  questionBox.append(questions);

  createOptions(j++);

  checkAnswers(Questions[RandomNumArray[k++]].answer);
};

// Below code will create function which provide Options
const createOptions = (Num) => {
  let randomNum = RandomArrayNumbers(Questions[0].options.length);

  const options = document.createElement("div");

  options.setAttribute("class", "options");

  randomNum.map((item) => {
    let Input = Questions[RandomNumArray[Num]]?.options[item];

    const div = document.createElement("div");

    const input = document.createElement("input");

    input.setAttribute("type", "radio");

    input.setAttribute("value", Input);

    input.setAttribute("name", "options");

    const label = document.createElement("label");

    label.innerText = Input;

    div.append(input);

    div.append(label);

    options.appendChild(div);
  });

  questionBox.append(options);
};

// Below code will generate function which will check the Answer
const checkAnswers = (Answer) => {
  let inputs = document.querySelectorAll("input[type='radio']");

  inputs.forEach((input) => {
    input.addEventListener("click", (e) => {
      console.log(Number(e.target.value));
      console.log(Answer);

      if (Number(e.target.value) == Answer) {
        correctAnswer += 1;
      }
    });
  });
};

//below code will generate function which update and create Result panel
const createResultPanel = (score) => {
  document.querySelector(".question-box").style.display = "none";

  const panel = document.createElement("div");

  panel.setAttribute("class", "panel");

  panel.innerHTML = `<h3>Your score is ${score}/${Questions.length}</h3>`;

  const button = document.createElement("button");

  button.setAttribute("id", "restart");

  panel.append(button);

  button.innerText = "Restart Quiz";

  panel.style.display = "flex";

  document.querySelector("#wrapper").append(panel);
};

// Below code will start the quiz
startBtn.addEventListener("click", () => {
  startBtn.style.display = "none";

  questionBox.style.display = "flex";

  createQuestion();
});

//below code will create function to Restart the quiz
const RestartQuiz = () => {
  RandomNumArray = RandomArrayNumbers(Questions.length);
  const Restart = document.querySelector("#restart");

  Restart.addEventListener("click", () => {
    document.querySelector(".panel").remove();

    document.querySelector(".question").remove();

    document.querySelector(".options").remove();

    correctAnswer = 0;

    questionBox.style.display = "flex";

    createQuestion();
  });
};
