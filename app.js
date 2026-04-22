const PROGRESS_KEY = "star-camp-progress";
const SETTINGS_KEY = "star-camp-settings";
const QUESTIONS_PER_BATCH = 8;
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
  difficulty: "medium"
};

const state = {
  totalStars: 0,
  medals: 0,
  sessionStars: 0,
  answeredCount: 0,
  currentQuestions: [],
  currentQuestion: null,
  answeringLocked: false,
  isLoadingMore: false,
  audioContext: null,
  settings: { ...defaultSettings },
  questionSource: "fallback"
};

const els = {
  totalStars: document.querySelector("#totalStars"),
  totalMedals: document.querySelector("#totalMedals"),
  medalShelf: document.querySelector("#medalShelf"),
  apiStatus: document.querySelector("#apiStatus"),
  difficultyValue: document.querySelector("#difficultyValue"),
  difficultyDownButton: document.querySelector("#difficultyDownButton"),
  difficultyUpButton: document.querySelector("#difficultyUpButton"),
  settingsDifficultyValue: document.querySelector("#settingsDifficultyValue"),
  settingsDifficultyDownButton: document.querySelector("#settingsDifficultyDownButton"),
  settingsDifficultyUpButton: document.querySelector("#settingsDifficultyUpButton"),
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
  questionTag: document.querySelector("#questionTag"),
  questionPrompt: document.querySelector("#questionPrompt"),
  answersGrid: document.querySelector("#answersGrid"),
  feedback: document.querySelector("#feedback"),
  celebration: document.querySelector("#celebration"),
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
  } catch {
    state.totalStars = 0;
    state.medals = 0;
  }
}

function saveProgress() {
  localStorage.setItem(
    PROGRESS_KEY,
    JSON.stringify({
      totalStars: state.totalStars,
      medals: state.medals
    })
  );
}

function loadSettings() {
  const raw = localStorage.getItem(SETTINGS_KEY);
  if (!raw) return;

  try {
    const parsed = JSON.parse(raw);
    const difficulty = DIFFICULTY_LEVELS.includes(parsed.difficulty) ? parsed.difficulty : defaultSettings.difficulty;
    state.settings = {
      apiKey: typeof parsed.apiKey === "string" ? parsed.apiKey : "",
      model: typeof parsed.model === "string" && parsed.model.trim() ? parsed.model.trim() : defaultSettings.model,
      endpoint: typeof parsed.endpoint === "string" && parsed.endpoint.trim() ? parsed.endpoint.trim() : defaultSettings.endpoint,
      difficulty
    };
  } catch {
    state.settings = { ...defaultSettings };
  }
}

function saveSettings() {
  localStorage.setItem(SETTINGS_KEY, JSON.stringify(state.settings));
}

function hydrateSettingsForm() {
  els.apiKeyInput.value = state.settings.apiKey;
  els.modelInput.value = state.settings.model;
  els.endpointInput.value = state.settings.endpoint;
}

function renderDifficulty() {
  const label = getDifficultyLabel(state.settings.difficulty);
  els.difficultyValue.textContent = label;
  els.settingsDifficultyValue.textContent = label;
  els.gameDifficulty.textContent = label;
}

function adjustDifficulty(offset) {
  const currentIndex = DIFFICULTY_LEVELS.indexOf(state.settings.difficulty);
  const nextIndex = Math.min(DIFFICULTY_LEVELS.length - 1, Math.max(0, currentIndex + offset));
  state.settings.difficulty = DIFFICULTY_LEVELS[nextIndex];
  renderDifficulty();
  saveSettings();
  renderSettingsStatus();
}

function renderSettingsStatus() {
  const difficultyText = `当前难度：${getDifficultyLabel(state.settings.difficulty)}`;
  if (state.settings.apiKey) {
    setApiStatus(`已设置千问 API key，开局会优先使用 ${state.settings.model} 出题。${difficultyText}`, "success");
  } else {
    setApiStatus(`未设置千问 API key，当前会使用本地题库。${difficultyText}`, "warning");
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
  els.sessionStars.textContent = state.sessionStars;
  els.questionIndex.textContent = state.answeredCount;
}

function renderMedals() {
  const showSlots = Math.max(state.medals + 2, 4);
  const medalsHtml = Array.from({ length: showSlots }, (_, index) => {
    const unlocked = index < state.medals;
    const medalNumber = index + 1;
    const label = medalNames[index % medalNames.length];
    return `
      <article class="medal-slot ${unlocked ? "" : "locked"}">
        <div class="medal-icon">${unlocked ? "🏅" : "☆"}</div>
        <div class="medal-name">${label}</div>
        <div class="medal-desc">${unlocked ? `第 ${medalNumber} 枚奖牌` : "继续攒星星解锁"}</div>
      </article>
    `;
  }).join("");

  els.medalShelf.innerHTML = medalsHtml;
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

function buildFallbackBatch() {
  const bank = fallbackQuestionBanks[state.settings.difficulty] || fallbackQuestionBanks.medium;
  const repeated = [];
  while (repeated.length < QUESTIONS_PER_BATCH) {
    repeated.push(...shuffle(bank));
  }
  state.questionSource = "fallback";
  return repeated.slice(0, QUESTIONS_PER_BATCH);
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

async function generateQuestionsFromQwen() {
  const prompt = [
    `请以 JSON 格式返回 ${QUESTIONS_PER_BATCH} 道适合中国 6-12 岁小学生的选择题。`,
    "题目要混合数学思维、语文阅读、英语能力，不要让用户先选学科。",
    getDifficultyPrompt(state.settings.difficulty),
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

  if (normalized.length < QUESTIONS_PER_BATCH) {
    throw new Error("模型返回的合格题目数量不足。");
  }

  state.questionSource = "model";
  return normalized.slice(0, QUESTIONS_PER_BATCH);
}

async function prepareBatch() {
  if (!state.settings.apiKey) {
    return buildFallbackBatch();
  }

  try {
    const generated = await generateQuestionsFromQwen();
    setApiStatus(`本轮题目由 ${state.settings.model} 生成。当前难度：${getDifficultyLabel(state.settings.difficulty)}`, "success");
    return generated;
  } catch (error) {
    console.error(error);
    setApiStatus(`千问出题失败，已自动切回本地题库。当前难度：${getDifficultyLabel(state.settings.difficulty)}`, "error");
    return buildFallbackBatch();
  }
}

async function ensureQuestionQueue(minCount = 1) {
  if (state.currentQuestions.length >= minCount || state.isLoadingMore) {
    return;
  }

  state.isLoadingMore = true;
  const nextBatch = await prepareBatch();
  state.currentQuestions.push(...nextBatch);
  state.isLoadingMore = false;
}

function renderQuestion() {
  const nextQuestion = state.currentQuestions.shift();
  if (!nextQuestion) {
    showLoading("正在准备更多题目...");
    ensureQuestionQueue(1).then(() => {
      renderQuestion();
    });
    return;
  }

  state.currentQuestion = nextQuestion;
  state.answeringLocked = false;
  els.questionTag.textContent = state.currentQuestion.type;
  els.questionPrompt.textContent = state.currentQuestion.prompt;
  els.feedback.textContent = "";
  els.feedback.className = "feedback";
  els.celebration.classList.add("hidden");

  const options = shuffle(state.currentQuestion.options);
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

  if (state.currentQuestions.length <= 2) {
    ensureQuestionQueue(4);
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

  if (context.state === "suspended") {
    context.resume().catch(() => {});
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
  if (state.currentQuestions.length === 0) {
    showLoading("正在准备更多题目...");
    await ensureQuestionQueue(1);
  }
  renderQuestion();
}

function handleAnswer(selected, button) {
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

  window.setTimeout(() => {
    moveToNextQuestion();
  }, isCorrect ? 1150 : 1450);
}

async function startRound() {
  state.sessionStars = 0;
  state.answeredCount = 0;
  state.currentQuestions = [];
  state.currentQuestion = null;
  state.answeringLocked = false;
  state.questionSource = "fallback";
  renderStats();
  renderDifficulty();
  switchScreen(els.gameScreen);
  showLoading(state.settings.apiKey ? "正在让千问准备新题目..." : "正在准备本地题目...");

  await ensureQuestionQueue(1);
  renderQuestion();
}

function finishRound() {
  const previousMedals = state.medals;
  state.totalStars += state.sessionStars;
  state.medals = Math.floor(state.totalStars / 20);
  const newMedals = state.medals - previousMedals;

  saveProgress();
  renderStats();
  renderMedals();
  renderSettingsStatus();

  els.finalStars.textContent = state.sessionStars;
  els.earnedMedals.textContent = newMedals > 0 ? newMedals : 0;

  const sourceLabel = state.questionSource === "model" ? "这局题目主要由千问生成。" : "这局题目来自本地题库。";
  els.summaryCopy.textContent = newMedals > 0
    ? `${sourceLabel} 你一共答了 ${state.answeredCount} 题，新获得了 ${newMedals} 枚奖牌，快回主页看看奖牌展柜吧。`
    : `${sourceLabel} 你一共答了 ${state.answeredCount} 题，收获 ${state.sessionStars} 颗星，再攒一攒就能解锁新的奖牌。`;

  switchScreen(els.summaryScreen);
}

function resetProgress() {
  state.totalStars = 0;
  state.medals = 0;
  state.sessionStars = 0;
  state.answeredCount = 0;
  state.currentQuestions = [];
  state.currentQuestion = null;
  localStorage.removeItem(PROGRESS_KEY);
  renderStats();
  renderMedals();
  switchScreen(els.homeScreen);
}

function openSettings() {
  hydrateSettingsForm();
  setSettingsMessage("");
  renderDifficulty();
  switchScreen(els.settingsScreen);
}

function saveSettingsFromForm() {
  state.settings.apiKey = els.apiKeyInput.value.trim();
  state.settings.model = els.modelInput.value.trim() || defaultSettings.model;
  state.settings.endpoint = els.endpointInput.value.trim() || defaultSettings.endpoint;
  saveSettings();
  renderDifficulty();
  renderSettingsStatus();
  setSettingsMessage("设置已保存。", "success");
}

function clearSettings() {
  state.settings = { ...defaultSettings, difficulty: state.settings.difficulty };
  saveSettings();
  hydrateSettingsForm();
  renderDifficulty();
  renderSettingsStatus();
  setSettingsMessage("API key 已清空，之后会使用本地题库。", "success");
}

els.startButton.addEventListener("click", startRound);
els.playAgainButton.addEventListener("click", startRound);
els.backHomeButton.addEventListener("click", () => switchScreen(els.homeScreen));
els.endButton.addEventListener("click", finishRound);
els.resetButton.addEventListener("click", resetProgress);
els.settingsButton.addEventListener("click", openSettings);
els.saveSettingsButton.addEventListener("click", saveSettingsFromForm);
els.clearSettingsButton.addEventListener("click", clearSettings);
els.backFromSettingsButton.addEventListener("click", () => switchScreen(els.homeScreen));
els.difficultyDownButton.addEventListener("click", () => adjustDifficulty(-1));
els.difficultyUpButton.addEventListener("click", () => adjustDifficulty(1));
els.settingsDifficultyDownButton.addEventListener("click", () => adjustDifficulty(-1));
els.settingsDifficultyUpButton.addEventListener("click", () => adjustDifficulty(1));

loadProgress();
loadSettings();
hydrateSettingsForm();
renderDifficulty();
renderStats();
renderMedals();
renderSettingsStatus();
