
// script.js

const questions = [
  {
    question: "你最喜歡的早晨儀式是？",
    answers: [
      { text: "一杯手沖咖啡", type: "wood" },
      { text: "晨跑或瑜珈", type: "citrus" },
      { text: "在被窩裡多賴十分鐘", type: "musk" },
      { text: "聽一段冥想引導", type: "floral" }
    ]
  },
  {
    question: "你理想的午後時光？",
    answers: [
      { text: "閱讀一本書", type: "floral" },
      { text: "去市場採買食材", type: "woody" },
      { text: "在城市中散步", type: "citrus" },
      { text: "窩在咖啡廳放空", type: "musk" }
    ]
  },
  {
    question: "你最嚮往的旅行目的地？",
    answers: [
      { text: "京都的寺院", type: "woody" },
      { text: "普羅旺斯花田", type: "floral" },
      { text: "地中海海岸", type: "citrus" },
      { text: "北歐森林小屋", type: "musk" }
    ]
  },
  {
    question: "你在朋友眼中的特質是？",
    answers: [
      { text: "溫柔療癒", type: "floral" },
      { text: "充滿活力", type: "citrus" },
      { text: "安靜神秘", type: "musk" },
      { text: "可靠穩定", type: "woody" }
    ]
  },
  {
    question: "你最常用哪種方式放鬆自己？",
    answers: [
      { text: "精油泡澡", type: "floral" },
      { text: "運動流汗", type: "citrus" },
      { text: "冥想靜坐", type: "woody" },
      { text: "香氛蠟燭與音樂", type: "musk" }
    ]
  },
  {
    question: "你理想中的居家香氣空間？",
    answers: [
      { text: "木質溫暖的書房", type: "woody" },
      { text: "充滿陽光氣息的客廳", type: "citrus" },
      { text: "淡雅清新的臥室", type: "floral" },
      { text: "沉靜深邃的香氣角落", type: "musk" }
    ]
  }
];

const results = {
  woody: {
    title: "木質沉穩型",
    image: "images/result_woody.jpg",
    description: "你是沈穩內斂的人，像森林般包容而寧靜。你對生活有自己的步調，重視深度與穩定感。",
    analysis: "你選擇的多數選項展現出你喜歡踏實安定，偏好與自然、經典連結的事物。你的香氣屬性是『木質』，適合選擇檀香、雪松、岩蘭草等香氣，讓你在混亂中也能找回內在平衡。"
  },
  citrus: {
    title: "柑橘清新型",
    image: "images/result_citrus.jpg",
    description: "你充滿活力與朝氣，是群體中的開朗陽光角色。你的存在總能為周圍注入新鮮能量。",
    analysis: "你傾向選擇輕盈、具行動力的選項，顯示你偏愛自由與刺激。你的香氣人格屬於『柑橘清新型』，適合葡萄柚、香檸檬、橙花等氣味，能提升情緒並帶來清爽感。"
  },
  floral: {
    title: "花香柔和型",
    image: "images/result_floral.jpg",
    description: "你擁有溫柔細膩的特質，能敏銳捕捉情感，是個極富同理心的人。",
    analysis: "你的選擇展現出浪漫、溫柔及關懷特質。你的香氣人格是『花香柔和型』，可選擇玫瑰、茉莉、橙花等香氣，讓香氛成為你療癒他人的秘密力量。"
  },
  musk: {
    title: "麝香神秘型",
    image: "images/result_musk.jpg",
    description: "你是一位安靜卻充滿深度的人，擁有內斂氣質與感性直覺。你像月色般神秘卻吸引人靠近。",
    analysis: "你的回答透露出喜愛獨處、內省與感官沉澱的傾向。你適合『麝香神秘型』香氣，使用麝香、龍涎香、廣藿香等香氣，能展現你深沉獨特的靈魂氣息。"
  }
};

let currentQuestion = 0;
let scores = {};

const questionContainer = document.getElementById("question-container");
const questionTitle = document.getElementById("question-title");
const answerButtons = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-button");
const resultContainer = document.getElementById("result-container");
const resultTitle = document.getElementById("result-title");
const resultImage = document.getElementById("result-image");
const resultDescription = document.getElementById("result-description");
const resultAnalysis = document.getElementById("result-analysis");
const restartButton = document.getElementById("restart-button");

function startQuiz() {
  currentQuestion = 0;
  scores = {};
  resultContainer.style.display = "none";
  questionContainer.style.display = "block";
  nextButton.style.display = "none";
  showQuestion();
}

function showQuestion() {
  const question = questions[currentQuestion];
  questionTitle.textContent = question.question;
  answerButtons.innerHTML = "";
  question.answers.forEach((answer) => {
    const button = document.createElement("button");
    button.textContent = answer.text;
    button.classList.add("answer-button");
    button.addEventListener("click", () => selectAnswer(answer));
    answerButtons.appendChild(button);
  });
}

function selectAnswer(answer) {
  const type = answer.type;
  if (!scores[type]) scores[type] = 0;
  scores[type]++;

  answerButtons.querySelectorAll("button").forEach((btn) => {
    btn.disabled = true;
  });

  nextButton.style.display = "inline-block";
}

nextButton.addEventListener("click", () => {
  currentQuestion++;
  if (currentQuestion < questions.length) {
    showQuestion();
    nextButton.style.display = "none";
  } else {
    showResult();
  }
});

function showResult() {
  questionContainer.style.display = "none";
  resultContainer.style.display = "block";

  let highest = null;
  let maxScore = -1;
  for (const type in scores) {
    if (scores[type] > maxScore) {
      maxScore = scores[type];
      highest = type;
    }
  }

  const result = results[highest];
  resultTitle.textContent = result.title;
  resultImage.src = result.image;
  resultDescription.textContent = result.description;
  resultAnalysis.innerHTML = `因為你在測驗中的選擇多偏向「<strong>${result.title}</strong>」的氣質，<br>我們推薦你屬於 <strong>${result.title}</strong>：<br>${result.analysis}`;
}

restartButton.addEventListener("click", () => {
  startQuiz();
});

startQuiz();
