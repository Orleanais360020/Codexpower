const words = [
  {
    thai: 'แมว',
    romanization: 'maeo',
    japanese: '猫',
    image: 'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?auto=format&fit=crop&w=1000&q=80',
    alt: '猫の写真',
  },
  {
    thai: 'ข้าว',
    romanization: 'khao',
    japanese: 'ご飯',
    image: 'https://images.unsplash.com/photo-1512058564366-18510be2db19?auto=format&fit=crop&w=1000&q=80',
    alt: '白いご飯の写真',
  },
  {
    thai: 'น้ำ',
    romanization: 'nam',
    japanese: '水',
    image: 'https://images.unsplash.com/photo-1523362628745-0c100150b504?auto=format&fit=crop&w=1000&q=80',
    alt: '水の入ったグラス',
  },
  {
    thai: 'โรงเรียน',
    romanization: 'rong rian',
    japanese: '学校',
    image: 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&w=1000&q=80',
    alt: '学校の建物',
  },
  {
    thai: 'ตลาด',
    romanization: 'ta-lat',
    japanese: '市場',
    image: 'https://images.unsplash.com/photo-1516684732162-798a0062be99?auto=format&fit=crop&w=1000&q=80',
    alt: '市場の写真',
  },
];

const sentenceProblems = [
  {
    sentence: '私は毎朝 ____ を飲みます。',
    answer: 'น้ำ',
    hint: 'ヒント: 「水」',
  },
  {
    sentence: '彼は ____ で勉強しています。',
    answer: 'โรงเรียน',
    hint: 'ヒント: 「学校」',
  },
  {
    sentence: '母は ____ で野菜を買います。',
    answer: 'ตลาด',
    hint: 'ヒント: 「市場」',
  },
];

let currentWord = 0;
let showTranslation = false;
let currentQuestion = 0;

const flashcard = document.getElementById('flashcard');
const thaiWordEl = document.getElementById('thai-word');
const romanizationEl = document.getElementById('romanization');
const japaneseWordEl = document.getElementById('japanese-word');
const wordImageEl = document.getElementById('word-image');

const sentenceQuizEl = document.getElementById('sentence-quiz');
const quizResultEl = document.getElementById('quiz-result');

function renderWordCard() {
  const word = words[currentWord];
  thaiWordEl.textContent = word.thai;
  romanizationEl.textContent = `発音: ${word.romanization}`;
  japaneseWordEl.textContent = `日本語: ${word.japanese}`;
  wordImageEl.src = word.image;
  wordImageEl.alt = word.alt;

  flashcard.classList.toggle('hidden-translation', !showTranslation);
}

function renderQuestion() {
  const q = sentenceProblems[currentQuestion];
  sentenceQuizEl.innerHTML = `
    <p class="quiz-question">${q.sentence}</p>
    <label for="answer-input">タイ語で回答してください</label>
    <input id="answer-input" type="text" autocomplete="off" placeholder="例: น้ำ" />
    <p>${q.hint}</p>
  `;

  quizResultEl.textContent = '';
  quizResultEl.className = 'result';
}

function normalize(value) {
  return value.trim().toLowerCase();
}

document.getElementById('prev-btn').addEventListener('click', () => {
  currentWord = (currentWord - 1 + words.length) % words.length;
  renderWordCard();
});

document.getElementById('next-btn').addEventListener('click', () => {
  currentWord = (currentWord + 1) % words.length;
  renderWordCard();
});

document.getElementById('flip-btn').addEventListener('click', () => {
  showTranslation = !showTranslation;
  renderWordCard();
});

document.getElementById('check-btn').addEventListener('click', () => {
  const inputEl = document.getElementById('answer-input');
  const userAnswer = normalize(inputEl.value);
  const correct = normalize(sentenceProblems[currentQuestion].answer);

  if (userAnswer === correct) {
    quizResultEl.textContent = '正解です！';
    quizResultEl.className = 'result ok';
  } else {
    quizResultEl.textContent = `不正解です。正解: ${sentenceProblems[currentQuestion].answer}`;
    quizResultEl.className = 'result ng';
  }
});

document.getElementById('next-question-btn').addEventListener('click', () => {
  currentQuestion = (currentQuestion + 1) % sentenceProblems.length;
  renderQuestion();
});

renderWordCard();
renderQuestion();
