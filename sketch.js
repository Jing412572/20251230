
let spriteSheet, jumpSheet, spriteSheet2, bgImg, spriteSheet3, spriteSheet4, spriteSheet5;
let bgX = 0, screenShakeAmount = 0;
let speedLines = [], footprints = [], dustParticles = [], confettiParticles = [], clearConfetti = [], fireworks = [], floatingTexts = [], notes = [];
let walkFrames = 4, allFrames2 = 4, allFrames3 = 5, allFrames4 = 4, allFrames5 = 4;
let scaleFactor = 2, scaleFactor2, scaleFactor3, scaleFactor4, scaleFactor5;
let charX, charY, speed = 7, direction = 1, isMoving = false, char1MaxHP = 100, char1HP = 100, hpBarShakeTimer = 0;
let score = 0, combo = 0, gemCount = 0, maxCombo = 0;
let gameStats = { jumps: 0, gemsCollected: 0 };
const ACHIEVEMENTS = [
  { id: 'jump_10', title: '跳躍新手', desc: '跳躍 10 次', type: 'jumps', target: 10, reward: 10, unlocked: false },
  { id: 'jump_50', title: '跳躍專家', desc: '跳躍 50 次', type: 'jumps', target: 50, reward: 30, unlocked: false },
  { id: 'jump_100', title: '跳躍大師', desc: '跳躍 100 次', type: 'jumps', target: 100, reward: 100, unlocked: false },
  { id: 'gem_10', title: '寶石獵人 I', desc: '收集 10 顆寶石', type: 'gems', target: 10, reward: 20, unlocked: false },
  { id: 'gem_50', title: '寶石獵人 II', desc: '收集 50 顆寶石', type: 'gems', target: 50, reward: 100, unlocked: false }
];
let hasShield = false, gems = [], magnets = [], magnetTimer = 0, stars = [], starTimer = 0, mushrooms = [], giantTimer = 0, timeStopWatches = [], timeStopTimer = 0, bombs = [];
const GEM_TYPES = [
  { color: '#ef4444', score: 100, probability: 0.6 },
  { color: '#3b82f6', score: 300, probability: 0.3 },
  { color: '#10b981', score: 500, probability: 0.1 }
];
const MAGNET_DURATION = 600, MAGNET_RANGE = 400, MAGNET_SPEED = 15, STAR_DURATION = 600, GIANT_DURATION = 600, QUESTION_TIME_LIMIT = 20;
let char2X, char2Y, char3X, char3Y, char4X, char4Y, char5X, char5Y;
let showChar5Hint = false, char5HintTimer = 0, consecutiveWrongAnswers = 0, char5AnimScale = 0;
let velocityY = 0, gravity = 0.4, jumpForce = -15, isOnGround = false, jumpCount = 0;
const MAX_JUMPS = 2;
let knockbackVx = 0, jumpFrames = 6, shockwaves = [], onomatopoeias = [];
let char1Input, questionBank, questionBank3, questionBank4, currentQuestion = null;
const questionerOrder = [2, 3, 4];
let currentQuestionerIndex = 0, questionsAnsweredForCurrent = 0, totalCorrectAnswers = 0, displayedCorrectAnswers = 0;
let dialogueState = 'idle', npcDialogue = '', displayedNpcDialogue = '', lastNpcDialogue = '', typewriterSpeed = 3, bubbleScale = 0;
let retryButton, nextButton, gameState = 'start', startButton, introButton, skipButton, restartButton;
let introFullText = "【 任務：挑戰汪汪知識王 】\n" + "冒險者，前方的公園住著三位博學的狗狗。\n" + "唯有通過牠們的考驗，才能獲得榮耀！\n\n" + "⚔️ 操作：左右移動 (← →) 探索地圖\n" + "❤️ 體力：答錯會受傷 (HP↓)，答對回血\n" + "🏆 勝利條件：完成三位關主的所有問答！";
let introDisplayedText = "", isFastForwarding = false, isPaused = false, isShopping = false, pausedScreenshot, resumeButton, reviveGemButton, reviveAdButton, pauseShopButton, shopCloseButton, buyPotionBtn, buyMagnetBtn, buyShieldBtn, pauseQuitButton, pauseRestartButton, pauseBtn, submitButton, optionButtons = [], leftBtn, rightBtn, jumpBtn, isLeftBtnDown = false, isRightBtnDown = false;
let gameStartTime = 0, finalPlayTimeStr = '00:00';
function preload() {
  // 核心修正：根據報錯顯示，檔案應該在根目錄或特定編號資料夾
  // 嘗試將所有路徑改為相對路徑，並移除不確定的資料夾前綴
  
  spriteSheet = loadImage('walk.png'); 
  jumpSheet = loadImage('jump.png');
  
  // 如果這些檔案在資料夾內，請確保資料夾名稱正確
  spriteSheet2 = loadImage('all_2.png'); 
  spriteSheet3 = loadImage('all_3.png'); 
  spriteSheet4 = loadImage('all_4.png'); 
  spriteSheet5 = loadImage('all_5.png'); 

  bgImg = loadImage('origbig.png');
  
  // CSV 表格載入
  questionBank = loadTable('questions.csv', 'csv', 'header');
  questionBank3 = loadTable('questions_3.csv', 'csv', 'header'); 
  questionBank4 = loadTable('questions_4.csv', 'csv', 'header'); 
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  gemCount = parseInt(localStorage.getItem('gemCount') || '0');
  let savedStats = JSON.parse(localStorage.getItem('gameStats'));
  if (savedStats) gameStats = savedStats;
  let savedAch = JSON.parse(localStorage.getItem('achievements'));
  if (savedAch) {
    ACHIEVEMENTS.forEach(ach => { if (savedAch[ach.id]) ach.unlocked = true; });
  }
  function styleControlBtn(btn) {
  btn.style('font-size', '30px');
  btn.style('background-color', 'rgba(254, 252, 232, 0.6)');
  btn.style('border', '3px solid rgba(63, 98, 18, 0.6)');
  btn.style('border-radius', '50%');
  btn.style('color', '#3f6212');
  btn.style('cursor', 'pointer');
}

  initQuestions();
  noSmooth();

  let css = `@keyframes bounceIn { 0% { transform: scale(0.1); opacity: 0; } 60% { transform: scale(1.2); opacity: 1; } 100% { transform: scale(1); opacity: 1; } } .bounce-in { animation: bounceIn 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275); }`;
  createElement('style', css);

  charX = width / 2;
  charY = height * 0.85;
  isOnGround = true;
  char2X = width * 0.75; char2Y = height * 0.85;
  char3X = width * 0.9; char3Y = height * 0.85;
  char4X = width * 1.05; char4Y = height * 0.85;
  char5X = width * 1.2; char5Y = height * 0.85;

  spawnGems(); spawnMagnets(); spawnBombs(); spawnTimeStopWatches(); spawnStars(); spawnMushrooms();

  removeSpriteBackground(spriteSheet); removeSpriteBackground(jumpSheet); removeSpriteBackground(spriteSheet2);
  removeSpriteBackground(spriteSheet3); removeSpriteBackground(spriteSheet4); removeSpriteBackground(spriteSheet5);

  scaleFactor2 = scaleFactor * (spriteSheet.height / spriteSheet2.height);
  scaleFactor3 = scaleFactor * (spriteSheet.height / 77);
  scaleFactor4 = scaleFactor * (spriteSheet.height / 81);
  scaleFactor5 = scaleFactor * (spriteSheet.height / 30);

  // --- 初始化所有 UI 元件 ---
  char1Input = createInput('');
  char1Input.position(10, height - 40); char1Input.size(100, 30); char1Input.hide();
  char1Input.style('background-color', '#ffffff'); char1Input.style('border', '2px solid #cbd5e1');
  char1Input.elt.addEventListener('keydown', (e) => { if (e.key === 'Enter') submitAnswer(); });

  submitButton = createButton('✔');
  submitButton.size(40, 35); submitButton.hide(); submitButton.mousePressed(submitAnswer);

  for (let i = 0; i < 3; i++) {
    let btn = createButton('');
    btn.size(200, 45); btn.style('background-color', '#fff'); btn.hide();
    btn.mousePressed(() => checkAnswer(btn.html()));
    optionButtons.push(btn);
  }

  retryButton = createButton('再回答一次'); retryButton.hide(); retryButton.mousePressed(retryQuestion);
  nextButton = createButton('下一題'); nextButton.hide(); nextButton.mousePressed(nextQuestion);

  startButton = createButton('開始');
  startButton.position(width / 2 - 100, height * 0.75); startButton.size(200, 80);
  startButton.mousePressed(enterIntro);

  introButton = createButton('出發！');
  introButton.position(width / 2 - 100, height * 0.75); introButton.size(200, 80);
  introButton.hide(); introButton.mousePressed(startGame);

  skipButton = createButton('⏩ 跳過');
  skipButton.position(width - 140, 30); skipButton.hide();
  skipButton.mousePressed(() => { introDisplayedText = introFullText; });

  restartButton = createButton('重新開始');
  restartButton.position(width / 2 - 100, height * 0.85); restartButton.size(200, 80);
  restartButton.hide(); restartButton.mousePressed(resetToStart);

  resumeButton = createButton('繼續遊戲'); resumeButton.hide(); resumeButton.mousePressed(togglePause);
  pauseShopButton = createButton('商店'); pauseShopButton.hide(); pauseShopButton.mousePressed(openShop);
  pauseQuitButton = createButton('結束遊戲'); pauseQuitButton.hide(); pauseQuitButton.mousePressed(() => { togglePause(); gameState = 'gameover'; calculatePlayTime(); });
  pauseRestartButton = createButton('重新開始'); pauseRestartButton.hide(); pauseRestartButton.mousePressed(() => location.reload());

  pauseBtn = createButton('⏸');
  pauseBtn.position(width - 60, 20); pauseBtn.size(45, 45);
  pauseBtn.hide(); pauseBtn.mousePressed(togglePause);

  leftBtn = createButton('◀'); leftBtn.position(20, height - 80); leftBtn.size(60, 60); styleControlBtn(leftBtn);
  leftBtn.elt.onmousedown = () => isLeftBtnDown = true; leftBtn.elt.onmouseup = () => isLeftBtnDown = false;
  rightBtn = createButton('▶'); rightBtn.position(90, height - 80); rightBtn.size(60, 60); styleControlBtn(rightBtn);
  rightBtn.elt.onmousedown = () => isRightBtnDown = true; rightBtn.elt.onmouseup = () => isRightBtnDown = false;
  jumpBtn = createButton('▲'); jumpBtn.position(width - 80, height - 80); jumpBtn.size(60, 60); styleControlBtn(jumpBtn);
  jumpBtn.mousePressed(performJump);

  reviveGemButton = createButton('💎 復活 (5寶師)'); reviveGemButton.hide(); reviveGemButton.mousePressed(() => tryRevive('gem'));
  reviveAdButton = createButton('📺 看廣告復活'); reviveAdButton.hide(); reviveAdButton.mousePressed(() => tryRevive('ad'));

  checkDailyLogin();
  imageMode(CENTER);
}

// --- 剩餘的功能函式維持原樣 (draw, handleInteraction, classes 等) ---
