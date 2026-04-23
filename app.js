const PROGRESS_KEY = "star-camp-progress";
const SETTINGS_KEY = "star-camp-settings";
const QUESTION_POOL_KEY = "star-camp-question-pool";
const USED_QUESTION_KEYS = "star-camp-used-question-keys";
const QUESTIONS_PER_BATCH = 8;
const QUESTION_POOL_TARGET = 50;
const TTS_ENDPOINT = "https://dashscope.aliyuncs.com/api/v1/services/audio/tts/SpeechSynthesizer";
const TTS_MODEL = "cosyvoice-v3-flash";
const TTS_VOICE = "longanyang";
const MIN_GRADE = 1;
const MAX_GRADE = 6;
const DIFFICULTY_LEVELS = ["easy", "medium", "hard"];
const DIFFICULTY_LABELS = {
  easy: "简单",
  medium: "普通",
  hard: "挑战"
};

const fallbackQuestionBanks = {
  easy: [
    {
      type: "数学思维",
      prompt: "小兔的篮子里有 6 根胡萝卜，又放进 2 根，现在一共有多少根？",
      options: ["6", "7", "8", "9"],
      answer: "8",
      explanation: "原来有 6 根，又放进 2 根，就是 8 根。"
    },
    {
      type: "数学思维",
      prompt: "宝箱密码是连续变大的数字：1，2，3，4，下一格最可能是什么？",
      options: ["3", "4", "5", "6"],
      answer: "5",
      explanation: "这些数字一个一个往上数，4 后面就是 5。"
    },
    {
      type: "语文阅读",
      prompt: "森林广播说：“小鹿先去河边，再去山坡。” 小鹿先去了哪里？",
      options: ["山坡", "河边", "树屋", "花园"],
      answer: "河边",
      explanation: "广播里先说河边，所以第一站是河边。"
    },
    {
      type: "语文阅读",
      prompt: "“开心”最像下面哪个词？",
      options: ["难过", "高兴", "安静", "生气"],
      answer: "高兴",
      explanation: "“开心”和“高兴”都表示心里很快乐。"
    },
    {
      type: "英语能力",
      prompt: "在水果小店看见 Banana，你会想到哪种水果？",
      options: ["苹果", "香蕉", "桃子", "葡萄"],
      answer: "香蕉",
      explanation: "Banana 的中文意思是香蕉。"
    },
    {
      type: "英语能力",
      prompt: "朋友早上见到你说 Hello! 你最适合怎么回应？",
      options: ["Hello!", "Good night!", "Bye!", "Thank you!"],
      answer: "Hello!",
      explanation: "别人打招呼说 Hello，你也可以回 Hello。"
    }
  ],
  medium: [
    {
      type: "数学思维",
      prompt: "魔法门上的数字在跳舞：2，4，8，16，下一盏会亮起哪一个数字？",
      options: ["18", "24", "32", "20"],
      answer: "32",
      explanation: "这些数字每次都会变成前一个的 2 倍，所以会轮到 32。"
    },
    {
      type: "数学思维",
      prompt: "小熊要给 5 位来参加派对的朋友发能量糖，每人 2 颗，一共要准备多少颗？",
      options: ["7", "10", "12", "15"],
      answer: "10",
      explanation: "5 位朋友每人 2 颗，就是 5 乘 2，答案是 10。"
    },
    {
      type: "语文阅读",
      prompt: "侦探线索：小雨先去图书馆，再去操场。你能找出她先去了哪里吗？",
      options: ["操场", "教室", "图书馆", "食堂"],
      answer: "图书馆",
      explanation: "线索里先写图书馆，后写操场，所以第一站是图书馆。"
    },
    {
      type: "语文阅读",
      prompt: "词语变身秀开始啦，“高兴”和下面哪个词最像好朋友？",
      options: ["难过", "开心", "安静", "着急"],
      answer: "开心",
      explanation: "“高兴”和“开心”都表示心里很快乐。"
    },
    {
      type: "英语能力",
      prompt: "英语小集市开门啦，看到招牌写着 Apple，你会拿起哪一样东西？",
      options: ["苹果", "香蕉", "书包", "老师"],
      answer: "苹果",
      explanation: "Apple 的中文就是苹果。"
    },
    {
      type: "英语能力",
      prompt: "机器人自我介绍说：“I am Tom.” 这句话里，哪个词是它的名字？",
      options: ["I", "am", "Tom", "这句话没有名字"],
      answer: "Tom",
      explanation: "Tom 是名字，I am 的意思是“我是”。"
    }
  ],
  hard: [
    {
      type: "数学思维",
      prompt: "飞艇补给站有 18 颗能量球，上午送走 7 颗，下午又补进 5 颗，现在还剩多少颗？",
      options: ["14", "15", "16", "17"],
      answer: "16",
      explanation: "先从 18 里减去 7，再加上 5，最后是 16。"
    },
    {
      type: "数学思维",
      prompt: "机关密码按规律变化：3，6，12，24，下一项最可能是多少？",
      options: ["30", "36", "48", "52"],
      answer: "48",
      explanation: "这些数每次都翻一倍，24 后面就是 48。"
    },
    {
      type: "语文阅读",
      prompt: "小船先停在柳树旁，后来划到石桥下。根据这句线索，小船最开始在哪里？",
      options: ["石桥下", "柳树旁", "岸边", "荷叶边"],
      answer: "柳树旁",
      explanation: "句子里“先停在柳树旁”，所以最开始的位置就是柳树旁。"
    },
    {
      type: "语文阅读",
      prompt: "“飞快”最接近下面哪个词？",
      options: ["缓慢", "迅速", "安静", "整齐"],
      answer: "迅速",
      explanation: "“飞快”和“迅速”都表示速度很快。"
    },
    {
      type: "英语能力",
      prompt: "宇航站的门牌写着 Library，最可能是哪个地方？",
      options: ["图书馆", "操场", "餐厅", "卧室"],
      answer: "图书馆",
      explanation: "Library 的中文意思是图书馆。"
    },
    {
      type: "英语能力",
      prompt: "句子 “She is my friend.” 里，friend 最接近下面哪个中文？",
      options: ["老师", "朋友", "姐姐", "同桌"],
      answer: "朋友",
      explanation: "friend 表示朋友。"
    }
  ]
};

const medalNames = [
  "晨光奖牌", "彩虹奖牌", "流星奖牌", "勇气奖牌", "智慧奖牌",
  "海风奖牌", "火花奖牌", "远航奖牌", "阳光奖牌", "冠军奖牌"
];

const defaultSettings = {
  apiKey: "",
  model: "qwen-plus",
  endpoint: "https://dashscope.aliyuncs.com/compatible-mode/v1/chat/completions",
  difficulty: "medium",
  grade: 3
};

const state = {
  totalStars: 0,
  medals: 0,
  trophies: 0,
  sessionStars: 0,
  answeredCount: 0,
  currentQuestion: null,
  currentQuestions: [],
  answeringLocked: false,
  audioContext: null,
  speechAudio: null,
  settings: { ...defaultSettings },
  questionSource: "fallback",
  questionPool: {
    easy: [],
    medium: [],
    hard: []
  },
  fillPoolPromise: null,
  usedQuestionKeys: new Set(),
  usedQuestionArchive: new Set(),
  speechReady: false,
  audioReady: false
};

const els = {
  totalStars: document.querySelector("#totalStars"),
  totalMedals: document.querySelector("#totalMedals"),
  totalTrophies: document.querySelector("#totalTrophies"),
  medalShelf: document.querySelector("#medalShelf"),
  apiStatus: document.querySelector("#apiStatus"),
  settingsDifficultyValue: document.querySelector("#settingsDifficultyValue"),
  settingsDifficultyDownButton: document.querySelector("#settingsDifficultyDownButton"),
  settingsDifficultyUpButton: document.querySelector("#settingsDifficultyUpButton"),
  gradeValue: document.querySelector("#gradeValue"),
  gradeDownButton: document.querySelector("#gradeDownButton"),
  gradeUpButton: document.querySelector("#gradeUpButton"),
  gameDifficulty: document.querySelector("#gameDifficulty"),
  homeScreen: document.querySelector("#homeScreen"),
  settingsScreen: document.querySelector("#settingsScreen"),
  gameScreen: document.querySelector("#gameScreen"),
  summaryScreen: document.querySelector("#summaryScreen"),
  startButton: document.querySelector("#startButton"),
  settingsButton: document.querySelector("#settingsButton"),
  resetButton: document.querySelector("#resetButton"),
  apiKeyInput: document.querySelector("#apiKeyInput"),
  modelInput: document.querySelector("#modelInput"),
  endpointInput: document.querySelector("#endpointInput"),
  saveSettingsButton: document.querySelector("#saveSettingsButton"),
  clearSettingsButton: document.querySelector("#clearSettingsButton"),
  backFromSettingsButton: document.querySelector("#backFromSettingsButton"),
  settingsMessage: document.querySelector("#settingsMessage"),
  questionIndex: document.querySelector("#questionIndex"),
  sessionStars: document.querySelector("#sessionStars"),
  loadingCard: document.querySelector("#loadingCard"),
  loadingText: document.querySelector("#loadingText"),
  questionCard: document.querySelector("#questionCard"),
  speakButton: document.querySelector("#speakButton"),
  questionTag: document.querySelector("#questionTag"),
  questionPrompt: document.querySelector("#questionPrompt"),
  answersGrid: document.querySelector("#answersGrid"),
  feedback: document.querySelector("#feedback"),
  celebration: document.querySelector("#celebration"),
  nextButton: document.querySelector("#nextButton"),
  endButton: document.querySelector("#endButton"),
  finalStars: document.querySelector("#finalStars"),
  earnedMedals: document.querySelector("#earnedMedals"),
  summaryCopy: document.querySelector("#summaryCopy"),
  playAgainButton: document.querySelector("#playAgainButton"),
  backHomeButton: document.querySelector("#backHomeButton")
};

function shuffle(list) {
  const clone = [...list];
  for (let i = clone.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [clone[i], clone[j]] = [clone[j], clone[i]];
  }
  return clone;
}

function getDifficultyLabel(level) {
  return DIFFICULTY_LABELS[level] || DIFFICULTY_LABELS.medium;
}

function getGradeLabel(grade) {
  return `${grade}年级`;
}

function getQuestionKey(question) {
  return `${question.type}__${question.prompt}__${question.answer}`;
}

function setSettingsMessage(text, type = "") {
  els.settingsMessage.textContent = text;
  els.settingsMessage.className = `settings-message ${type}`.trim();
}

function setApiStatus(text, type) {
  els.apiStatus.textContent = text;
  els.apiStatus.className = `status-chip ${type}`;
}

function loadProgress() {
  const raw = localStorage.getItem(PROGRESS_KEY);
  if (!raw) return;

  try {
    const data = JSON.parse(raw);
    state.totalStars = Number(data.totalStars) || 0;
    state.medals = Number(data.medals) || 0;
    state.trophies = Number(data.trophies) || Math.floor(state.medals / 4);
  } catch {
    state.totalStars = 0;
    state.medals = 0;
    state.trophies = 0;
  }
}

function saveProgress() {
  localStorage.setItem(
    PROGRESS_KEY,
    JSON.stringify({
      totalStars: state.totalStars,
      medals: state.medals,
      trophies: state.trophies
    })
  );
}

function loadSettings() {
  const raw = localStorage.getItem(SETTINGS_KEY);
  if (!raw) return;

  try {
    const parsed = JSON.parse(raw);
    const difficulty = DIFFICULTY_LEVELS.includes(parsed.difficulty) ? parsed.difficulty : defaultSettings.difficulty;
    const grade = Number(parsed.grade);
    state.settings = {
      apiKey: typeof parsed.apiKey === "string" ? parsed.apiKey : "",
      model: typeof parsed.model === "string" && parsed.model.trim() ? parsed.model.trim() : defaultSettings.model,
      endpoint: typeof parsed.endpoint === "string" && parsed.endpoint.trim() ? parsed.endpoint.trim() : defaultSettings.endpoint,
      difficulty,
      grade: Number.isInteger(grade) ? Math.min(MAX_GRADE, Math.max(MIN_GRADE, grade)) : defaultSettings.grade
    };
  } catch {
    state.settings = { ...defaultSettings };
  }
}

function saveSettings() {
  localStorage.setItem(SETTINGS_KEY, JSON.stringify(state.settings));
}

function normalizePool(raw) {
  const empty = { easy: [], medium: [], hard: [] };
  if (!raw || typeof raw !== "object") {
    return empty;
  }

  DIFFICULTY_LEVELS.forEach((level) => {
    const items = Array.isArray(raw[level]) ? raw[level] : [];
    empty[level] = items.map(sanitizeQuestion).filter(Boolean);
  });
  return empty;
}

function loadQuestionPool() {
  const raw = localStorage.getItem(QUESTION_POOL_KEY);
  if (!raw) return;

  try {
    state.questionPool = normalizePool(JSON.parse(raw));
  } catch {
    state.questionPool = { easy: [], medium: [], hard: [] };
  }
}

function saveQuestionPool() {
  localStorage.setItem(QUESTION_POOL_KEY, JSON.stringify(state.questionPool));
}

function loadUsedQuestionArchive() {
  const raw = localStorage.getItem(USED_QUESTION_KEYS);
  if (!raw) return;

  try {
    const parsed = JSON.parse(raw);
    const items = Array.isArray(parsed) ? parsed : [];
    state.usedQuestionArchive = new Set(items.map((item) => String(item)));
  } catch {
    state.usedQuestionArchive = new Set();
  }
}

function saveUsedQuestionArchive() {
  localStorage.setItem(USED_QUESTION_KEYS, JSON.stringify([...state.usedQuestionArchive]));
}

function resetQuestionPool() {
  state.questionPool = {
    easy: [],
    medium: [],
    hard: []
  };
  saveQuestionPool();
}

function hydrateSettingsForm() {
  els.apiKeyInput.value = state.settings.apiKey;
  els.modelInput.value = state.settings.model;
  els.endpointInput.value = state.settings.endpoint;
}

function renderDifficulty() {
  const label = getDifficultyLabel(state.settings.difficulty);
  els.settingsDifficultyValue.textContent = label;
  els.gameDifficulty.textContent = label;
  els.gradeValue.textContent = getGradeLabel(state.settings.grade);
}

function adjustDifficulty(offset) {
  const currentIndex = DIFFICULTY_LEVELS.indexOf(state.settings.difficulty);
  const nextIndex = Math.min(DIFFICULTY_LEVELS.length - 1, Math.max(0, currentIndex + offset));
  state.settings.difficulty = DIFFICULTY_LEVELS[nextIndex];
  renderDifficulty();
  saveSettings();
  renderSettingsStatus();
  fillQuestionPoolInBackground();
}

function adjustGrade(offset) {
  state.settings.grade = Math.min(MAX_GRADE, Math.max(MIN_GRADE, state.settings.grade + offset));
  resetQuestionPool();
  renderDifficulty();
  saveSettings();
  renderSettingsStatus();
  fillQuestionPoolInBackground(true);
}

function getPoolCount(level) {
  return state.questionPool[level]?.length || 0;
}

function renderSettingsStatus() {
  const difficultyText = `当前难度：${getDifficultyLabel(state.settings.difficulty)}`;
  const gradeText = `目标：${getGradeLabel(state.settings.grade)}`;
  const poolText = `已缓存 ${getPoolCount(state.settings.difficulty)} 题`;
  if (state.settings.apiKey) {
    setApiStatus(`已设置千问 API key，开始时会直接从缓存题库出题。${difficultyText}，${gradeText}，${poolText}`, "success");
  } else {
    setApiStatus(`未设置千问 API key，当前会使用本地题库。${difficultyText}，${gradeText}，${poolText}`, "warning");
  }
}

function switchScreen(target) {
  [els.homeScreen, els.settingsScreen, els.gameScreen, els.summaryScreen].forEach((screen) => {
    screen.classList.add("hidden");
  });
  target.classList.remove("hidden");
}

function renderStats() {
  els.totalStars.textContent = state.totalStars;
  els.totalMedals.textContent = state.medals;
  els.totalTrophies.textContent = state.trophies;
  els.sessionStars.textContent = state.sessionStars;
  els.questionIndex.textContent = state.answeredCount;
}

function renderMedals() {
  const currentMedals = state.medals % 4;
  const trophyCards = Array.from({ length: Math.max(state.trophies + 1, 1) }, (_, index) => {
    const unlocked = index < state.trophies;
    return `
      <article class="medal-slot ${unlocked ? "" : "locked"}">
        <div class="medal-icon">${unlocked ? "🏆" : "☆"}</div>
        <div class="medal-name">${unlocked ? `奖杯 ${index + 1}` : "下一座奖杯"}</div>
        <div class="medal-desc">${unlocked ? "4 枚奖牌已兑换" : "再集满 4 枚奖牌解锁"}</div>
      </article>
    `;
  });

  const medalCards = Array.from({ length: 4 }, (_, index) => {
    const unlocked = index < currentMedals;
    const medalNumber = index + 1;
    const label = medalNames[index % medalNames.length];
    return `
      <article class="medal-slot ${unlocked ? "" : "locked"}">
        <div class="medal-icon">${unlocked ? "🏅" : "☆"}</div>
        <div class="medal-name">${label}</div>
        <div class="medal-desc">${unlocked ? `本轮第 ${medalNumber} 枚奖牌` : "继续攒星星解锁"}</div>
      </article>
    `;
  });

  els.medalShelf.innerHTML = [...medalCards, ...trophyCards].join("");
}

function showLoading(text) {
  els.loadingText.textContent = text;
  els.loadingCard.classList.remove("hidden");
  els.questionCard.classList.add("hidden");
  els.endButton.disabled = false;
}

function showQuestionCard() {
  els.loadingCard.classList.add("hidden");
  els.questionCard.classList.remove("hidden");
  els.endButton.disabled = false;
}

function stopSpeaking() {
  if (state.speechAudio) {
    state.speechAudio.pause();
    state.speechAudio.currentTime = 0;
    state.speechAudio = null;
  }
  if ("speechSynthesis" in window) {
    window.speechSynthesis.cancel();
  }
}

function initSpeech() {
  if (!("speechSynthesis" in window)) {
    return false;
  }

  try {
    window.speechSynthesis.getVoices();
    window.speechSynthesis.resume();
    state.speechReady = true;
    return true;
  } catch {
    return false;
  }
}

async function initAudio() {
  const context = getAudioContext();
  if (!context) {
    return false;
  }

  try {
    if (context.state === "suspended") {
      await context.resume();
    }
    state.audioReady = context.state === "running";
    return state.audioReady;
  } catch {
    state.audioReady = false;
    return false;
  }
}

async function unlockMedia() {
  await initAudio();
  initSpeech();
}

function pickChineseVoice() {
  if (!("speechSynthesis" in window)) {
    return null;
  }

  const voices = window.speechSynthesis.getVoices();
  return voices.find((voice) => /zh|chinese|mandarin/i.test(`${voice.lang} ${voice.name}`)) || null;
}

function buildQuestionSpeechText(question) {
  if (!question) return "";
  const optionsText = question.options
    .map((option, index) => `选项${index + 1}，${option}`)
    .join("。");
  return `${question.type}。${question.prompt}。${optionsText}。`;
}

async function speakWithBrowser(question) {
  if (!("speechSynthesis" in window) || !question) {
    return false;
  }

  initSpeech();
  stopSpeaking();
  window.speechSynthesis.resume();
  const utterance = new SpeechSynthesisUtterance(buildQuestionSpeechText(question));
  utterance.lang = "zh-CN";
  utterance.rate = 0.95;
  utterance.pitch = 1.05;
  utterance.volume = 1;
  const voice = pickChineseVoice();
  if (voice) {
    utterance.voice = voice;
  }

  return new Promise((resolve) => {
    utterance.onend = () => resolve(true);
    utterance.onerror = () => resolve(false);
    window.speechSynthesis.speak(utterance);
  });
}

async function speakWithTts(question) {
  if (!question || !state.settings.apiKey) {
    return false;
  }

  const response = await fetch(TTS_ENDPOINT, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${state.settings.apiKey}`
    },
    body: JSON.stringify({
      model: TTS_MODEL,
      input: {
        text: buildQuestionSpeechText(question),
        voice: TTS_VOICE,
        format: "mp3",
        sample_rate: 24000,
        volume: 60,
        rate: 0.95
      }
    })
  });

  if (!response.ok) {
    throw new Error(`TTS 请求失败：${response.status}`);
  }

  const data = await response.json();
  const audioUrl = data?.output?.audio?.url;
  if (!audioUrl) {
    throw new Error("TTS 返回里没有音频地址。");
  }

  stopSpeaking();
  const audio = new Audio(audioUrl);
  audio.preload = "auto";
  state.speechAudio = audio;
  await audio.play();
  return true;
}

async function speakQuestion(question) {
  if (!question) {
    return;
  }

  try {
    if (state.settings.apiKey) {
      const played = await speakWithTts(question);
      if (played) {
        return;
      }
    }
  } catch (error) {
    console.error(error);
  }

  const browserPlayed = await speakWithBrowser(question);
  if (!browserPlayed) {
    els.feedback.textContent = "朗读没有成功，建议检查手机音量，或稍后再点一次“再读一遍”。";
    els.feedback.className = "feedback error";
  }
}

function createFallbackBatch(level) {
  const bank = fallbackQuestionBanks[level] || fallbackQuestionBanks.medium;
  const repeated = [];
  while (repeated.length < QUESTIONS_PER_BATCH) {
    repeated.push(...shuffle(bank));
  }
  const filtered = dedupeQuestions(repeated.map((item) => ({ ...item })))
    .filter((question) => !state.usedQuestionArchive.has(getQuestionKey(question)));
  return filtered.slice(0, QUESTIONS_PER_BATCH);
}

function sanitizeQuestion(item) {
  if (!item || typeof item !== "object") return null;

  const type = String(item.type || "").trim();
  const prompt = String(item.prompt || "").trim();
  const answer = String(item.answer || "").trim();
  const explanation = String(item.explanation || "").trim();
  const options = Array.isArray(item.options)
    ? item.options.map((option) => String(option).trim()).filter(Boolean)
    : [];

  if (!type || !prompt || !answer || options.length !== 4 || !options.includes(answer)) {
    return null;
  }

  return { type, prompt, options, answer, explanation };
}

function dedupeQuestions(questions) {
  const seen = new Set();
  return questions.filter((question) => {
    const key = getQuestionKey(question);
    if (seen.has(key)) {
      return false;
    }
    seen.add(key);
    return true;
  });
}

function extractJson(text) {
  const cleaned = text.trim()
    .replace(/^```json/i, "")
    .replace(/^```/i, "")
    .replace(/```$/, "")
    .trim();

  const firstBrace = cleaned.indexOf("{");
  const lastBrace = cleaned.lastIndexOf("}");
  if (firstBrace === -1 || lastBrace === -1) {
    throw new Error("模型没有返回 JSON。");
  }

  return cleaned.slice(firstBrace, lastBrace + 1);
}

function getDifficultyPrompt(level) {
  if (level === "easy") {
    return "难度设为简单：更适合低年级，句子更短，计算更直接，英语以高频基础词为主。";
  }
  if (level === "hard") {
    return "难度设为挑战：更适合高年级，允许两步思考、稍复杂的规律、稍长一点的阅读线索，但仍必须是小学生范围。";
  }
  return "难度设为普通：适合大多数小学生，题目有轻挑战但不过难。";
}

function getEnglishVocabPrompt(grade) {
  const map = {
    1: "英语词汇必须严格限制在一年级常见入门词，如颜色、数字、家庭成员、基础动物、简单问候。",
    2: "英语词汇必须严格限制在二年级常见高频词，如日常物品、基础食物、简单动作、简单问候。",
    3: "英语词汇必须严格限制在三年级常见校园和生活词汇，不要出现抽象词和复杂语法。",
    4: "英语词汇必须严格限制在四年级常见高频词，不要出现低频词、复杂时态和抽象表达。",
    5: "英语词汇必须严格限制在五年级常见教材词汇，不要出现明显超纲词。",
    6: "英语词汇可以使用六年级常见教材词汇，但不要超过小学毕业水平。"
  };
  return map[grade] || map[3];
}

function getGradePrompt(grade) {
  return `目标学生为小学${grade}年级。英语词汇绝不能超过这个年级的常见教材范围；数学思维和语文阅读按这个年级的较高要求来设计，但仍要让孩子能通过思考完成。`;
}

async function generateQuestionsFromQwen(level) {
  const prompt = [
    `请以 JSON 格式返回 ${QUESTIONS_PER_BATCH} 道适合中国 6-12 岁小学生的选择题。`,
    "题目要混合数学思维、语文阅读、英语能力，不要让用户先选学科。",
    getDifficultyPrompt(level),
    getGradePrompt(state.settings.grade),
    getEnglishVocabPrompt(state.settings.grade),
    "整套题必须有趣味、像小游戏里的挑战，不要像学校作业或试卷。",
    "优先使用小侦探、动物派对、魔法商店、太空探险、寻宝、校园趣事这类轻剧情场景。",
    "题干要短小、有画面感、带一点俏皮感，但不能幼稚过头。",
    "不要使用“请计算”“请阅读短文并回答”“下列说法正确的是”这种作业口吻。",
    "每题必须有 type、prompt、options、answer、explanation 五个字段。",
    'type 只能是“数学思维”“语文阅读”“英语能力”之一。',
    "options 必须恰好 4 个，answer 必须与其中一个选项完全一致。",
    "prompt 和 explanation 都要简短、友好、儿童化，不要超纲，不要恐吓。",
    "explanation 要像鼓励式提示，帮助孩子明白为什么对，不要像老师批改。",
    "错误选项要合理但不能太离谱，避免一眼看穿。",
    "不要出重复题，不要只考死记硬背，尽量让孩子像在闯关。",
    "请只输出一个 JSON 对象，格式为：",
    '{"questions":[{"type":"","prompt":"","options":["","","",""],"answer":"","explanation":""}]}'
  ].join("\n");

  const response = await fetch(state.settings.endpoint, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${state.settings.apiKey}`
    },
    body: JSON.stringify({
      model: state.settings.model,
      temperature: 0.95,
      response_format: { type: "json_object" },
      messages: [
        {
          role: "system",
          content: "你是一个小学游戏题目设计师，请始终输出 JSON，不要输出任何多余文字。"
        },
        {
          role: "user",
          content: prompt
        }
      ]
    })
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`接口请求失败：${response.status} ${errorText}`);
  }

  const data = await response.json();
  const content = data?.choices?.[0]?.message?.content;
  if (!content) {
    throw new Error("接口返回里没有题目内容。");
  }

  const parsed = JSON.parse(extractJson(content));
  const list = Array.isArray(parsed.questions) ? parsed.questions : [];
  const normalized = list.map(sanitizeQuestion).filter(Boolean);
  const deduped = dedupeQuestions(normalized);

  if (deduped.length < QUESTIONS_PER_BATCH) {
    throw new Error("模型返回的合格题目数量不足。");
  }

  return deduped.slice(0, QUESTIONS_PER_BATCH);
}

async function fetchBatchForLevel(level) {
  if (!state.settings.apiKey) {
    state.questionSource = "fallback";
    return createFallbackBatch(level);
  }

  try {
    const generated = await generateQuestionsFromQwen(level);
    state.questionSource = "model";
    return generated;
  } catch (error) {
    console.error(error);
    state.questionSource = "fallback";
    setApiStatus(`千问补题失败，已自动切回本地题库。当前难度：${getDifficultyLabel(level)}`, "error");
    return createFallbackBatch(level);
  }
}

function takeQuestionFromPool(level) {
  const pool = state.questionPool[level] || [];
  const question = pool.shift() || null;
  saveQuestionPool();
  renderSettingsStatus();
  return question;
}

function pushQuestionsToPool(level, questions) {
  const existing = new Set((state.questionPool[level] || []).map(getQuestionKey));
  const filtered = questions.filter((question) => {
    const key = getQuestionKey(question);
    if (existing.has(key) || state.usedQuestionArchive.has(key)) {
      return false;
    }
    existing.add(key);
    return true;
  });
  state.questionPool[level].push(...filtered);
  state.questionPool[level] = state.questionPool[level].slice(-QUESTION_POOL_TARGET);
  saveQuestionPool();
  renderSettingsStatus();
}

async function fillQuestionPoolInBackground(force = false) {
  if (state.fillPoolPromise && !force) {
    return state.fillPoolPromise;
  }

  state.fillPoolPromise = (async () => {
    const level = state.settings.difficulty;
    while (getPoolCount(level) < QUESTION_POOL_TARGET) {
      const batch = await fetchBatchForLevel(level);
      pushQuestionsToPool(level, batch);
      if (!state.settings.apiKey) {
        break;
      }
    }
  })().finally(() => {
    state.fillPoolPromise = null;
  });

  return state.fillPoolPromise;
}

async function ensureSessionQuestions(minCount = 1) {
  const level = state.settings.difficulty;

  while (state.currentQuestions.length < minCount) {
    const fromPool = takeQuestionFromPool(level);
    if (fromPool) {
      if (state.usedQuestionKeys.has(getQuestionKey(fromPool)) || state.usedQuestionArchive.has(getQuestionKey(fromPool))) {
        continue;
      }
      state.currentQuestions.push(fromPool);
      continue;
    }

    const batch = await fetchBatchForLevel(level);
    if (!batch.length) {
      break;
    }

    const freshBatch = batch.filter((question) => {
      const key = getQuestionKey(question);
      return !state.usedQuestionKeys.has(key) && !state.usedQuestionArchive.has(key);
    });
    if (!freshBatch.length) {
      break;
    }

    state.currentQuestions.push(freshBatch[0]);
    if (freshBatch.length > 1) {
      pushQuestionsToPool(level, freshBatch.slice(1));
    }
  }

  fillQuestionPoolInBackground();
}

function renderQuestion() {
  const nextQuestion = state.currentQuestions.shift();
  if (!nextQuestion) {
    showLoading("正在准备题目...");
    ensureSessionQuestions(1).then(() => {
      renderQuestion();
    });
    return;
  }

  state.currentQuestion = nextQuestion;
  state.usedQuestionKeys.add(getQuestionKey(nextQuestion));
  state.usedQuestionArchive.add(getQuestionKey(nextQuestion));
  saveUsedQuestionArchive();
  state.answeringLocked = false;
  els.questionTag.textContent = state.currentQuestion.type;
  els.questionPrompt.textContent = state.currentQuestion.prompt;
  els.feedback.textContent = "";
  els.feedback.className = "feedback";
  els.celebration.classList.add("hidden");
  els.nextButton.classList.add("hidden");

  const options = shuffle(state.currentQuestion.options);
  state.currentQuestion.options = options;
  els.answersGrid.innerHTML = "";

  options.forEach((option) => {
    const button = document.createElement("button");
    button.className = "answer-btn";
    button.textContent = option;
    button.addEventListener("click", () => handleAnswer(option, button));
    els.answersGrid.appendChild(button);
  });

  renderStats();
  showQuestionCard();
  window.setTimeout(() => {
    speakQuestion(state.currentQuestion);
  }, 120);

  if (state.currentQuestions.length <= 3) {
    ensureSessionQuestions(6);
  }
}

function getAudioContext() {
  if (!state.audioContext) {
    const AudioContextClass = window.AudioContext || window.webkitAudioContext;
    if (!AudioContextClass) {
      return null;
    }
    state.audioContext = new AudioContextClass();
  }
  return state.audioContext;
}

function playCorrectSound() {
  const context = getAudioContext();
  if (!context) return;

  if (context.state !== "running") {
    return;
  }

  const now = context.currentTime;
  [740, 988, 1320].forEach((frequency, index) => {
    const oscillator = context.createOscillator();
    const gain = context.createGain();
    oscillator.type = "triangle";
    oscillator.frequency.setValueAtTime(frequency, now + index * 0.08);
    gain.gain.setValueAtTime(0.0001, now + index * 0.08);
    gain.gain.exponentialRampToValueAtTime(0.08, now + index * 0.08 + 0.02);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + index * 0.08 + 0.2);
    oscillator.connect(gain);
    gain.connect(context.destination);
    oscillator.start(now + index * 0.08);
    oscillator.stop(now + index * 0.08 + 0.22);
  });
}

function revealCelebration() {
  els.celebration.classList.remove("hidden");
  playCorrectSound();
  window.setTimeout(() => {
    els.celebration.classList.add("hidden");
  }, 950);
}

function lockAnswers(correctAnswer, clickedButton, isCorrect) {
  const buttons = Array.from(els.answersGrid.querySelectorAll("button"));
  buttons.forEach((btn) => {
    btn.disabled = true;
    if (btn.textContent === correctAnswer) {
      btn.classList.add("correct");
    }
  });

  if (!isCorrect && clickedButton) {
    clickedButton.classList.add("wrong");
  }
}

async function moveToNextQuestion() {
  await unlockMedia();
  stopSpeaking();
  state.currentQuestion = null;
  if (state.currentQuestions.length === 0) {
    await ensureSessionQuestions(1);
  }
  renderQuestion();
}

async function handleAnswer(selected, button) {
  await unlockMedia();
  if (state.answeringLocked) return;
  state.answeringLocked = true;

  const correctAnswer = state.currentQuestion.answer;
  const explanation = state.currentQuestion.explanation || `正确答案是：${correctAnswer}`;
  const isCorrect = selected === correctAnswer;

  lockAnswers(correctAnswer, button, isCorrect);

  state.answeredCount += 1;
  if (isCorrect) {
    state.sessionStars += 1;
    els.feedback.textContent = "答对了，收下一颗闪亮星星。";
    els.feedback.classList.add("success");
    renderStats();
    revealCelebration();
  } else {
    els.feedback.textContent = `正确答案是：${correctAnswer}。${explanation}`;
    els.feedback.classList.add("error");
    renderStats();
  }

  els.nextButton.classList.remove("hidden");
  fillQuestionPoolInBackground();
}

async function startRound() {
  await unlockMedia();
  state.sessionStars = 0;
  state.answeredCount = 0;
  state.currentQuestions = [];
  state.currentQuestion = null;
  state.answeringLocked = false;
  state.usedQuestionKeys = new Set();
  renderStats();
  renderDifficulty();
  switchScreen(els.gameScreen);

  if (getPoolCount(state.settings.difficulty) === 0) {
    showLoading("第一次准备题库，请稍等...");
    await ensureSessionQuestions(1);
  } else {
    ensureSessionQuestions(6);
  }

  renderQuestion();
}

function finishRound() {
  stopSpeaking();
  state.totalStars += state.sessionStars;
  state.medals = Math.floor(state.totalStars / 20);
  state.trophies = Math.floor(state.medals / 4);
  const currentMedals = state.medals % 4;

  saveProgress();
  renderStats();
  renderMedals();
  renderSettingsStatus();

  els.finalStars.textContent = state.sessionStars;
  els.earnedMedals.textContent = state.medals;

  const sourceLabel = state.settings.apiKey ? "题目优先来自后台缓存的千问题库。" : "这局题目来自本地题库。";
  els.summaryCopy.textContent = `${sourceLabel} 你一共答了 ${state.answeredCount} 题，收获 ${state.sessionStars} 颗星。当前已点亮 ${currentMedals} 枚奖牌，累计奖杯 ${state.trophies} 座。`;

  els.loadingCard.classList.add("hidden");
  els.questionCard.classList.add("hidden");
  switchScreen(els.summaryScreen);
}

function resetProgress() {
  stopSpeaking();
  state.totalStars = 0;
  state.medals = 0;
  state.trophies = 0;
  state.sessionStars = 0;
  state.answeredCount = 0;
  state.currentQuestions = [];
  state.currentQuestion = null;
  localStorage.removeItem(PROGRESS_KEY);
  localStorage.removeItem(USED_QUESTION_KEYS);
  state.usedQuestionArchive = new Set();
  renderStats();
  renderMedals();
  switchScreen(els.homeScreen);
}

function openSettings() {
  stopSpeaking();
  hydrateSettingsForm();
  setSettingsMessage("");
  renderDifficulty();
  switchScreen(els.settingsScreen);
}

function saveSettingsFromForm() {
  const oldDifficulty = state.settings.difficulty;
  const oldGrade = state.settings.grade;
  state.settings.apiKey = els.apiKeyInput.value.trim();
  state.settings.model = els.modelInput.value.trim() || defaultSettings.model;
  state.settings.endpoint = els.endpointInput.value.trim() || defaultSettings.endpoint;
  saveSettings();
  renderDifficulty();
  renderSettingsStatus();
  setSettingsMessage("设置已保存。", "success");

  if (oldDifficulty !== state.settings.difficulty || oldGrade !== state.settings.grade) {
    if (oldGrade !== state.settings.grade) {
      resetQuestionPool();
    }
    fillQuestionPoolInBackground(true);
  } else {
    fillQuestionPoolInBackground();
  }
}

function clearSettings() {
  state.settings = { ...defaultSettings, difficulty: state.settings.difficulty };
  saveSettings();
  hydrateSettingsForm();
  renderDifficulty();
  renderSettingsStatus();
  setSettingsMessage("API key 已清空，之后会使用本地题库。", "success");
  fillQuestionPoolInBackground(true);
}

els.startButton.addEventListener("click", startRound);
els.playAgainButton.addEventListener("click", startRound);
els.backHomeButton.addEventListener("click", () => {
  stopSpeaking();
  switchScreen(els.homeScreen);
});
els.speakButton.addEventListener("click", async () => {
  await unlockMedia();
  speakQuestion(state.currentQuestion);
});
els.nextButton.addEventListener("click", moveToNextQuestion);
els.endButton.addEventListener("click", finishRound);
els.resetButton.addEventListener("click", resetProgress);
els.settingsButton.addEventListener("click", openSettings);
els.saveSettingsButton.addEventListener("click", saveSettingsFromForm);
els.clearSettingsButton.addEventListener("click", clearSettings);
els.backFromSettingsButton.addEventListener("click", () => switchScreen(els.homeScreen));
els.settingsDifficultyDownButton.addEventListener("click", () => adjustDifficulty(-1));
els.settingsDifficultyUpButton.addEventListener("click", () => adjustDifficulty(1));
els.gradeDownButton.addEventListener("click", () => adjustGrade(-1));
els.gradeUpButton.addEventListener("click", () => adjustGrade(1));

loadProgress();
loadSettings();
loadQuestionPool();
loadUsedQuestionArchive();
hydrateSettingsForm();
renderDifficulty();
renderStats();
renderMedals();
renderSettingsStatus();
fillQuestionPoolInBackground();

if ("speechSynthesis" in window) {
  window.speechSynthesis.onvoiceschanged = () => {
    initSpeech();
  };
}
