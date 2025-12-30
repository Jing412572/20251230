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
let introFullText = "【 任務：挑戰汪汪知識王 】\n冒險者，前方的公園住著三位博學的狗狗。\n唯有通過牠們的考驗，才能獲得榮耀！\n\n⚔️ 操作：左右移動 (← →) 探索地圖\n❤️ 體力：答錯會受傷 (HP↓)，答對回血\n🏆 勝利條件：完成三位關主的所有問答！";
let introDisplayedText = "", isFastForwarding = false, isPaused = false, isShopping = false, pausedScreenshot, resumeButton, reviveGemButton, reviveAdButton, pauseShopButton, shopCloseButton, buyPotionBtn, buyMagnetBtn, buyShieldBtn, pauseQuitButton, pauseRestartButton, pauseBtn, submitButton, optionButtons = [], leftBtn, rightBtn, jumpBtn, isLeftBtnDown = false, isRightBtnDown = false;
let gameStartTime = 0, finalPlayTimeStr = '00:00';

function preload() {
  // 修正圖片路徑至根目錄
  spriteSheet = loadImage('walk.png'); 
  jumpSheet = loadImage('jump.png');
  spriteSheet2 = loadImage('all_2.png'); 
  spriteSheet3 = loadImage('all_3.png'); 
  spriteSheet4 = loadImage('all_4.png'); 
  spriteSheet5 = loadImage('all_5.png'); 
  bgImg = loadImage('origbig.png');
  
  // CSV 載入
  questionBank = loadTable('questions.csv', 'csv', 'header');
  questionBank3 = loadTable('questions_3.csv', 'csv', 'header'); 
  questionBank4 = loadTable('questions_4.csv', 'csv', 'header'); 
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  imageMode(CENTER);
  
  // 初始化遊戲數據
  initQuestions();
  spawnGems(); spawnMagnets(); spawnBombs(); 
  spawnTimeStopWatches(); spawnStars(); spawnMushrooms();

  // 移除背景
  removeSpriteBackground(spriteSheet); removeSpriteBackground(jumpSheet);
  removeSpriteBackground(spriteSheet2); removeSpriteBackground(spriteSheet3);
  removeSpriteBackground(spriteSheet4); removeSpriteBackground(spriteSheet5);

  // 初始化按鈕與介面
  setupUI();
}

function draw() {
  // 核心遊戲迴圈
  if (gameState === 'start') {
    drawStartScreen();
  } else if (gameState === 'intro') {
    drawIntroScreen();
  } else if (gameState === 'playing') {
    drawGamePlay();
  }
}

// --- 介面初始化輔助函式 ---
function setupUI() {
  startButton = createButton('開始遊戲');
  startButton.position(width/2 - 100, height/2);
  startButton.size(200, 60);
  startButton.mousePressed(() => { 
    gameState = 'intro'; 
    startButton.hide(); 
  });
}

function drawStartScreen() {
  background(100);
  textAlign(CENTER);
  textSize(32);
  fill(255);
  text("汪汪知識王冒險", width/2, height/2 - 50);
}

function drawIntroScreen() {
  background(50);
  fill(255);
  textAlign(CENTER);
  text(introFullText, width/2, height/4);
  
  if (!introButton) {
    introButton = createButton('我準備好了！');
    introButton.position(width/2 - 100, height * 0.8);
    introButton.mousePressed(() => {
      gameState = 'playing';
      introButton.hide();
    });
  }
}

function drawGamePlay() {
  image(bgImg, width/2, height/2, width, height);
  // 繪製主角
  image(spriteSheet, charX, charY);
  
  // 簡易移動邏輯
  if (keyIsDown(LEFT_ARROW)) charX -= speed;
  if (keyIsDown(RIGHT_ARROW)) charX += speed;
}

// --- 以下為你補回的生成與功能函式 ---

function initQuestions() {
  // 這裡放置你之前的題庫邏輯代碼...
}

function spawnGems() {
  for (let i = 0; i < 15; i++) {
    gems.push({ x: random(width), y: random(height * 0.4), type: random(GEM_TYPES), collected: false });
  }
}

function spawnMagnets() { /* 邏輯代碼... */ }
function spawnBombs() { /* 邏輯代碼... */ }
function spawnTimeStopWatches() { /* 邏輯代碼... */ }
function spawnStars() { /* 邏輯代碼... */ }
function spawnMushrooms() { /* 邏輯代碼... */ }

function removeSpriteBackground(img) {
  if (!img) return;
  img.loadPixels();
  for (let i = 0; i < img.pixels.length; i += 4) {
    if (img.pixels[i] > 240 && img.pixels[i+1] > 240 && img.pixels[i+2] > 240) {
      img.pixels[i+3] = 0;
    }
  }
  img.updatePixels();
}

function styleControlBtn(btn) {
  btn.style('font-size', '30px');
  btn.style('background-color', 'rgba(254, 252, 232, 0.6)');
  btn.style('border', '3px solid rgba(63, 98, 18, 0.6)');
  btn.style('border-radius', '50%');
  btn.style('color', '#3f6212');
  btn.style('cursor', 'pointer');
}
