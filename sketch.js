let spriteSheet;
let jumpSheet;
let spriteSheet2; // 第二個角色的圖片精靈
let bgImg; // 背景圖片
let spriteSheet3; // 新增：角色3 的圖片精靈
let spriteSheet4; // 新增：角色4 的圖片精靈
let spriteSheet5; // 新增：角色5 的圖片精靈
let bgX = 0; // 背景 X 座標
let screenShakeAmount = 0; // 新增：螢幕震動強度

let speedLines = []; // 新增：動漫感速度線
let footprints = []; // 存放腳印的陣列
let dustParticles = []; // 存放灰塵特效的陣列
let confettiParticles = []; // 新增：存放彩帶特效的陣列
let clearConfetti = []; // 新增：通關畫面的彩帶特效
let fireworks = []; // 存放煙火的陣列
let floatingTexts = []; // 新增：存放浮動數值的陣列
let notes = []; // 存放音符的陣列
let walkFrames = 4; // 圖片精靈中的影格總數 (若更換角色1圖片，請在此修改影格數量)
let allFrames2 = 4; // 第二個角色圖片精靈的影格總數
let allFrames3 = 5; // 角色3 的影格總數
let allFrames4 = 4; // 角色4 的影格總數
let allFrames5 = 4; // 角色5 的影格總數
let scaleFactor = 2; // 角色1的放大倍率
let scaleFactor2;    // 角色2的放大倍率 (將在 setup 中計算)
let scaleFactor3;    // 角色3的放大倍率 (將在 setup 中計算)
let scaleFactor4;    // 角色4的放大倍率 (將在 setup 中計算)
let scaleFactor5;    // 角色5的放大倍率 (將在 setup 中計算)

// --- 角色 1 (原始角色) 變數 ---
let charX, charY; // 角色的位置
let speed = 7;    // 角色的移動速度
let direction = 1; // 角色的方向 (1: 右, -1: 左)
let isMoving = false; // 角色是否正在移動
let char1MaxHP = 100; // 角色1最大血量
let char1HP = 100;    // 角色1目前血量
let hpBarShakeTimer = 0; // 新增：血量條震動計時器
let score = 0; // 新增：遊戲分數
let combo = 0; // 新增：連擊計數
let gemCount = 0; // 新增：寶石數量 (用於復活)
let maxCombo = 0; // 新增：最大連擊數
let gameStats = { jumps: 0, gemsCollected: 0 }; // 新增：遊戲統計數據
const ACHIEVEMENTS = [
  { id: 'jump_10', title: '跳躍新手', desc: '跳躍 10 次', type: 'jumps', target: 10, reward: 10, unlocked: false },
  { id: 'jump_50', title: '跳躍專家', desc: '跳躍 50 次', type: 'jumps', target: 50, reward: 30, unlocked: false },
  { id: 'jump_100', title: '跳躍大師', desc: '跳躍 100 次', type: 'jumps', target: 100, reward: 100, unlocked: false },
  { id: 'gem_10', title: '寶石獵人 I', desc: '收集 10 顆寶石', type: 'gems', target: 10, reward: 20, unlocked: false },
  { id: 'gem_50', title: '寶石獵人 II', desc: '收集 50 顆寶石', type: 'gems', target: 50, reward: 100, unlocked: false }
];
let hasShield = false; // 新增：是否擁有護盾
let gems = []; // 新增：寶石陣列
const GEM_TYPES = [
  { color: '#ef4444', score: 100, probability: 0.6 }, // 紅色 (普通)
  { color: '#3b82f6', score: 300, probability: 0.3 }, // 藍色 (稀有)
  { color: '#10b981', score: 500, probability: 0.1 }  // 綠色 (極稀有)
];
let magnets = []; // 新增：磁鐵道具陣列
let magnetTimer = 0; // 新增：磁鐵效果計時器
const MAGNET_DURATION = 600; // 磁鐵持續時間 (約10秒)
const MAGNET_RANGE = 400; // 吸取範圍
const MAGNET_SPEED = 15; // 吸取速度
let stars = []; // 新增：無敵星星陣列
let starTimer = 0; // 新增：無敵狀態計時器
const STAR_DURATION = 600; // 無敵持續時間 (約10秒)
let mushrooms = []; // 新增：巨大化蘑菇陣列
let giantTimer = 0; // 新增：巨大化狀態計時器
const GIANT_DURATION = 600; // 巨大化持續時間 (約10秒)
let timeStopWatches = []; // 新增：時間暫停懷錶陣列
let timeStopTimer = 0; // 新增：時間暫停計時器
let bombs = []; // 新增：炸彈障礙物陣列
let questionStartTime = 0; // 新增：題目開始時間 (用於計算速度獎勵)
const QUESTION_TIME_LIMIT = 20; // 新增：答題時間限制 (秒)
let gameStartTime = 0; // 新增：遊戲開始時間
let finalPlayTimeStr = '00:00'; // 新增：最終遊玩時間字串

// --- 角色 2 (新角色) 變數 ---
let char2X, char2Y;

// --- 角色 3 (新角色) 變數 ---
let char3X, char3Y;

// --- 角色 4 (新角色) 變數 ---
let char4X, char4Y;

// --- 角色 5 (新角色) 變數 ---
let char5X, char5Y;

// --- 角色 5 提示者變數 ---
let showChar5Hint = false;
let char5HintTimer = 0;
let consecutiveWrongAnswers = 0;
let char5AnimScale = 0; // 新增：角色5的動畫縮放比例

// --- 跳躍物理變數 ---
let velocityY = 0;    // 垂直速度
let gravity = 0.4;    // 重力大小 (調低讓滯空時間變長，手感更輕盈)
let jumpForce = -15;  // 向上跳躍的力道 (配合重力調整)
let isOnGround = false; // 角色是否在地面上
let jumpCount = 0; // 新增：跳躍次數計數
const MAX_JUMPS = 2; // 新增：最大跳躍次數 (二段跳)
let knockbackVx = 0; // 新增：擊退水平速度
 
let jumpFrames = 6; // jump.png 實際上有 6 個影格 (若更換跳躍圖片，請在此修改影格數量)

let shockwaves = []; // 存放衝擊波特效的陣列

let onomatopoeias = []; // 存放狀聲詞特效的陣列

// --- 對話變數 ---
let char1Input; // 角色1的輸入框

// --- 題庫變數 ---
let questionBank; // 儲存從 CSV 載入的題庫表格
let questionBank3; // 新增：角色3 的題庫
let questionBank4; // 新增：角色4 的題庫
let currentQuestion = null; // 當前顯示的題目物件

// --- 遊戲流程控制變數 ---
const questionerOrder = [2, 3, 4]; // 提問者出現順序
let currentQuestionerIndex = 0;
let questionsAnsweredForCurrent = 0;
const questionsPerQuestioner = 2; // 改為每位關主問 2 題
let totalCorrectAnswers = 0; // 總共答對題數
let displayedCorrectAnswers = 0; // 新增：用於顯示平滑動畫的答對題數

let dialogueState = 'idle'; // 對話狀態: 'idle', 'asking', 'feedback'
let npcDialogue = ''; // NPC 當前要顯示的文字 (通用)
let displayedNpcDialogue = ''; // 打字機效果顯示的文字
let lastNpcDialogue = ''; // 上一次的對話內容，用於偵測改變
let typewriterSpeed = 3; // 打字機速度 (數值越小越快)
let bubbleScale = 0; // 對話框縮放比例動畫變數
let retryButton; // 再作答一次的按鈕
let nextButton; // 下一題的按鈕

// --- 遊戲狀態變數 ---
let gameState = 'start'; // 遊戲狀態: 'start', 'playing'
let startButton; // 開始按鈕
let introButton; // 新增：簡介頁面的確認按鈕
let introFullText = "【 任務：挑戰汪汪知識王 】\n" +
              "冒險者，前方的公園住著三位博學的狗狗。\n" +
              "唯有通過牠們的考驗，才能獲得榮耀！\n\n" +
              "⚔️ 操作：左右移動 (← →) 探索地圖\n" +
              "❤️ 體力：答錯會受傷 (HP↓)，答對回血\n" +
              "🏆 勝利條件：完成三位關主的所有問答！";
let introDisplayedText = ""; // 用於顯示打字機效果的變數
let skipButton; // 新增：跳過按鈕
let isFastForwarding = false; // 新增：是否正在快轉
let restartButton; // 重新開始按鈕
let startBgOffset = 0; // 新增：開始畫面背景捲動位置

// --- 暫停選單變數 ---
let isPaused = false;
let isShopping = false; // 新增：是否正在商店中
let pausedScreenshot;
let resumeButton;
let reviveGemButton; // 新增：寶石復活按鈕
let reviveAdButton; // 新增：廣告復活按鈕
let pauseShopButton; // 新增：暫停選單的商店按鈕
let shopCloseButton; // 新增：商店關閉按鈕
let buyPotionBtn, buyMagnetBtn, buyShieldBtn; // 新增：購買按鈕
let pauseQuitButton; // 新增：暫停選單的結束遊戲按鈕
let pauseRestartButton; // 新增：暫停選單的重新開始按鈕
let pauseBtn; // 暫停按鈕
let submitButton; // 新增：送出按鈕
let optionButtons = []; // 新增：選項按鈕陣列

// --- 虛擬按鈕變數 ---
let leftBtn, rightBtn, jumpBtn;
let isLeftBtnDown = false, isRightBtnDown = false;

function preload() {
  // 修正：直接讀取根目錄檔案，確保沒有資料夾前綴
  spriteSheet = loadImage('walk.png'); 
  jumpSheet = loadImage('jump.png');
  
  // 修正：假設這些角色圖也上傳到了 GitHub 根目錄
  spriteSheet2 = loadImage('all_2.png'); 
  spriteSheet3 = loadImage('all_3.png'); 
  spriteSheet4 = loadImage('all_4.png'); 
  spriteSheet5 = loadImage('all_5.png'); 

  // 背景圖與表格路徑
  bgImg = loadImage('origbig.png');
  questionBank = loadTable('questions.csv', 'csv', 'header');
  questionBank3 = loadTable('questions_3.csv', 'csv', 'header'); 
  questionBank4 = loadTable('questions_4.csv', 'csv', 'header'); 
}

function preload() {
  // 第 173 行
  spriteSheet = loadImage('walk.png'); 
  // 第 174 行
  jumpSheet = loadImage('jump.png');
  
  spriteSheet2 = loadImage('all_2.png');
  spriteSheet3 = loadImage('all_3.png');
  spriteSheet4 = loadImage('all_4.png');
  spriteSheet5 = loadImage('all_5.png');
  bgImg = loadImage('origbig.png');
  questionBank = loadTable('questions.csv', 'csv', 'header');
  questionBank3 = loadTable('questions_3.csv', 'csv', 'header'); 
  questionBank4 = loadTable('questions_4.csv', 'csv', 'header'); 
}

  // 初始化有趣的題目 (覆蓋 CSV 載入的內容)
  initQuestions();

  noSmooth(); // 關閉平滑濾鏡，讓像素圖放大後保持清晰，避免模糊重影

  // 加入彈跳動畫的 CSS 樣式
  let css = `
    @keyframes bounceIn {
      0% { transform: scale(0.1); opacity: 0; }
      60% { transform: scale(1.2); opacity: 1; }
      100% { transform: scale(1); opacity: 1; }
    }
    .bounce-in {
      animation: bounceIn 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275);
    }
  `;
  createElement('style', css);

  // 初始化角色位置
  charX = width / 2;
  charY = height * 0.85;
  isOnGround = true;

  char2X = width * 0.75; // 設定在角色1 (width/2) 的右邊
  char2Y = height * 0.85;

  char3X = width * 0.9; // 設定在角色2 的右邊
  char3Y = height * 0.85;

  char4X = width * 1.05; // 設定在角色3 的右邊
  char4Y = height * 0.85;

  spawnGems(); // 新增：初始化生成寶石
  spawnMagnets(); // 新增：初始化生成磁鐵
  spawnBombs(); // 新增：初始化生成炸彈
  spawnTimeStopWatches(); // 新增：初始化生成懷錶
  spawnStars(); // 新增：初始化生成星星
  spawnMushrooms(); // 新增：初始化生成蘑菇

  char5X = width * 1.2; // 設定在角色4 的右邊
  char5Y = height * 0.85;

  // 移除角色圖片背景
  removeSpriteBackground(spriteSheet);
  removeSpriteBackground(jumpSheet);
  removeSpriteBackground(spriteSheet2);
  removeSpriteBackground(spriteSheet3);
  removeSpriteBackground(spriteSheet4);
  removeSpriteBackground(spriteSheet5);

  // 計算縮放比例
  let frameWidth1 = spriteSheet.width / walkFrames;
  let frameWidth2 = spriteSheet2.width / allFrames2;
  let frameWidth3 = 329 / allFrames3;
  let frameWidth4 = 322 / allFrames4;
  let frameWidth5 = 114 / allFrames5;
  scaleFactor2 = scaleFactor * (spriteSheet.height / spriteSheet2.height);
  scaleFactor3 = scaleFactor * (spriteSheet.height / 77);
  scaleFactor4 = scaleFactor * (spriteSheet.height / 81);
  scaleFactor5 = scaleFactor * (spriteSheet.height / 30);

  // 建立輸入框
  char1Input = createInput('');
  char1Input.position(10, height - 40);
  char1Input.size(100, 30);
  char1Input.hide();
  char1Input.style('background-color', '#ffffff'); // 改為白色背景
  char1Input.style('border', '2px solid #cbd5e1'); // 淺灰邊框
  char1Input.style('border-radius', '8px'); // 圓角
  char1Input.style('outline', 'none');
  char1Input.style('font-size', '18px');
  char1Input.style('color', '#000');
  char1Input.style('text-align', 'center');
  char1Input.style('font-family', 'cursive, "Comic Sans MS", sans-serif');
  char1Input.elt.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
      submitAnswer();
    }
  });

  // 建立送出按鈕
  submitButton = createButton('✔');
  submitButton.size(40, 35);
  submitButton.style('font-size', '20px');
  submitButton.style('background-color', '#84cc16'); // 亮綠色
  submitButton.style('color', 'white');
  submitButton.style('border', '2px solid #3f6212');
  submitButton.style('border-radius', '10px');
  submitButton.style('cursor', 'pointer');
  submitButton.style('box-shadow', '2px 2px 5px rgba(0,0,0,0.2)');
  submitButton.addClass('bounce-in');
  submitButton.mousePressed(submitAnswer);
  submitButton.hide();

  // 建立選項按鈕 (3個)
  for (let i = 0; i < 3; i++) {
    let btn = createButton('');
    btn.size(200, 45);
    btn.style('font-family', 'cursive, "Comic Sans MS", sans-serif');
    btn.style('font-size', '18px');
    btn.style('cursor', 'pointer');
    btn.style('background-color', '#fff');
    btn.style('border', '3px solid #3f6212');
    btn.style('border-radius', '15px');
    btn.style('color', '#3f6212');
    btn.style('box-shadow', '4px 4px 0 #3f6212'); // 實心陰影
    btn.style('transition', 'transform 0.1s, background-color 0.1s');
    btn.addClass('bounce-in');
    
    // 滑鼠互動特效
    btn.elt.onmouseenter = () => {
        if (btn.elt.hasAttribute('disabled')) return; // 如果已停用(已作答)，不觸發特效
        btn.style('background-color', '#dcfce7'); // 淺綠
        btn.style('transform', 'scale(1.05)');
    };
    btn.elt.onmouseleave = () => {
        if (btn.elt.hasAttribute('disabled')) return; // 如果已停用，不觸發特效
        btn.style('background-color', '#fff');
        btn.style('transform', 'scale(1)');
    };
    btn.mousePressed(() => checkAnswer(btn.html())); // 點擊直接檢查答案
    btn.hide();
    optionButtons.push(btn);
  }

  // 建立互動按鈕
  retryButton = createButton('再回答一次');
  retryButton.style('font-family', 'cursive, "Comic Sans MS", sans-serif');
  retryButton.style('background-color', '#fee2e2'); // 淺紅背景
  retryButton.style('border', 'none'); // 去除邊框
  retryButton.style('border-radius', '15px');
  retryButton.style('box-shadow', 'none'); // 去除陰影
  retryButton.style('font-weight', 'bold');
  retryButton.style('font-size', '18px');
  retryButton.style('padding', '5px 15px');
  retryButton.style('cursor', 'pointer');
  retryButton.style('color', '#b91c1c'); // 深紅文字
  retryButton.style('transition', 'transform 0.1s, background-color 0.1s, box-shadow 0.1s, color 0.1s, border-color 0.1s, border-radius 0.1s');
  retryButton.addClass('bounce-in');
  
  // 自定義紅色系互動特效
  retryButton.elt.onmouseenter = () => {
    retryButton.style('box-shadow', '0 0 20px #f87171'); // 紅色發光
    retryButton.style('transform', 'scale(1.05) rotate(-2deg)');
    retryButton.style('background-color', '#fecaca');
  };
  retryButton.elt.onmouseleave = () => {
    retryButton.style('box-shadow', 'none');
    retryButton.style('transform', 'scale(1) rotate(0deg)');
    retryButton.style('background-color', '#fee2e2');
  };
  retryButton.elt.onmousedown = () => {
    retryButton.style('transform', 'scale(0.95)');
    retryButton.style('background-color', '#fca5a5');
  };
  retryButton.elt.onmouseup = () => {
    retryButton.style('transform', 'scale(1.05) rotate(-2deg)');
    retryButton.style('background-color', '#fecaca');
  };

  retryButton.hide();
  retryButton.mousePressed(retryQuestion);

  nextButton = createButton('下一題');
  nextButton.style('font-family', 'cursive, "Comic Sans MS", sans-serif');
  nextButton.style('background-color', '#dcfce7'); // 淺綠背景
  nextButton.style('border', 'none'); // 去除邊框
  nextButton.style('border-radius', '15px');
  nextButton.style('box-shadow', 'none'); // 去除陰影
  nextButton.style('font-weight', 'bold');
  nextButton.style('font-size', '18px');
  nextButton.style('padding', '5px 15px');
  nextButton.style('cursor', 'pointer');
  nextButton.style('color', '#15803d'); // 深綠文字
  nextButton.style('transition', 'transform 0.1s, background-color 0.1s, box-shadow 0.1s, color 0.1s, border-color 0.1s, border-radius 0.1s');
  nextButton.addClass('bounce-in');
  
  // 自定義綠色系互動特效
  nextButton.elt.onmouseenter = () => {
    nextButton.style('box-shadow', '0 0 20px #4ade80'); // 綠色發光
    nextButton.style('transform', 'scale(1.05) rotate(2deg)');
    nextButton.style('background-color', '#bbf7d0');
  };
  nextButton.elt.onmouseleave = () => {
    nextButton.style('box-shadow', 'none');
    nextButton.style('transform', 'scale(1) rotate(0deg)');
    nextButton.style('background-color', '#dcfce7');
  };
  nextButton.elt.onmousedown = () => {
    nextButton.style('transform', 'scale(0.95)');
    nextButton.style('background-color', '#86efac');
  };
  nextButton.elt.onmouseup = () => {
    nextButton.style('transform', 'scale(1.05) rotate(2deg)');
    nextButton.style('background-color', '#bbf7d0');
  };

  nextButton.hide();
  nextButton.mousePressed(nextQuestion);

  // 建立開始按鈕
  startButton = createButton('開始');
  startButton.position(width / 2 - 100, height * 0.75);
  startButton.size(200, 80);
  startButton.style('font-size', '32px');
  startButton.style('cursor', 'pointer');
  startButton.style('font-family', '"Comic Sans MS", "Chalkboard SE", "Arial Rounded MT Bold", "圓體-繁", "Microsoft JhengHei UI", sans-serif');
  startButton.style('background-color', '#ffffff'); // 白色背景
  startButton.style('border', '4px solid #000'); // 改回黑色邊框
  startButton.style('border-radius', '25px'); // 圓弧一點
  startButton.style('box-shadow', '0px 10px 20px rgba(0,0,0,0.3)'); // 改為柔和陰影
  startButton.style('font-weight', '900');
  startButton.style('color', '#000'); // 文字顏色也改回黑色
  startButton.style('transition', 'transform 0.1s, background-color 0.1s, box-shadow 0.1s');
  startButton.addClass('bounce-in');
  
  // 自定義懸停放大特效 (像素風格)
  startButton.elt.onmouseenter = () => {
    startButton.style('transform', 'scale(1.1)');
    startButton.style('background-color', '#f0f9ff');
    startButton.style('box-shadow', '0px 15px 25px rgba(0,0,0,0.3)');
  };
  startButton.elt.onmouseleave = () => {
    startButton.style('transform', 'scale(1)');
    startButton.style('background-color', '#ffffff');
    startButton.style('box-shadow', '0px 10px 20px rgba(0,0,0,0.3)');
  };
  startButton.elt.onmousedown = () => {
    startButton.style('transform', 'scale(0.95)');
    startButton.style('background-color', '#e2e8f0');
    startButton.style('box-shadow', '0px 5px 10px rgba(0,0,0,0.3)');
  };
  startButton.elt.onmouseup = () => {
    startButton.style('transform', 'scale(1.1)');
    startButton.style('background-color', '#f0f9ff');
    startButton.style('box-shadow', '0px 15px 25px rgba(0,0,0,0.3)');
  };

  startButton.mousePressed(enterIntro);

  // 建立簡介頁面的確認按鈕
  introButton = createButton('出發！');
  introButton.position(width / 2 - 100, height * 0.75);
  introButton.size(200, 80);
  introButton.style('font-size', '32px');
  introButton.style('cursor', 'pointer');
  introButton.style('font-family', '"Comic Sans MS", "Chalkboard SE", "Arial Rounded MT Bold", "圓體-繁", "Microsoft JhengHei UI", sans-serif');
  introButton.style('background-color', '#ffffff'); // 改為白色
  introButton.style('border', '4px solid #000'); // 粗黑框
  introButton.style('border-radius', '25px');
  introButton.style('box-shadow', '0px 10px 20px rgba(0,0,0,0.3)'); // 改為柔和陰影，與開始按鈕一致
  introButton.style('font-weight', '900');
  introButton.style('color', '#000');
  introButton.style('transform', 'none'); // 移除傾斜
  introButton.style('transition', 'transform 0.1s, background-color 0.1s, box-shadow 0.1s');
  introButton.addClass('bounce-in');
  
  // 自定義懸停放大特效
  introButton.elt.onmouseenter = () => {
    introButton.style('transform', 'scale(1.1)'); // 放大
    introButton.style('background-color', '#f0f9ff'); // 變淡藍色
    introButton.style('box-shadow', '0px 15px 25px rgba(0,0,0,0.3)'); // 陰影變大
  };
  introButton.elt.onmouseleave = () => {
    introButton.style('transform', 'scale(1)'); // 恢復原狀
    introButton.style('background-color', '#ffffff');
    introButton.style('box-shadow', '0px 10px 20px rgba(0,0,0,0.3)');
  };
  introButton.elt.onmousedown = () => {
    introButton.style('transform', 'scale(0.95)'); // 按下效果
    introButton.style('background-color', '#e2e8f0'); // 變淺灰
    introButton.style('box-shadow', '0px 5px 10px rgba(0,0,0,0.3)'); // 陰影縮小
  };
  introButton.elt.onmouseup = () => {
    introButton.style('transform', 'scale(1.1)');
    introButton.style('background-color', '#f0f9ff');
    introButton.style('box-shadow', '0px 15px 25px rgba(0,0,0,0.3)');
  };

  introButton.mousePressed(startGame);
  introButton.hide();

  // 建立跳過按鈕 (長按快轉)
  skipButton = createButton('⏩ 跳過');
  skipButton.position(width - 140, 30); // 右上角
  skipButton.size(110, 45);
  skipButton.style('font-size', '18px');
  skipButton.style('cursor', 'pointer');
  skipButton.style('font-family', '"Comic Sans MS", "Chalkboard SE", "Arial Rounded MT Bold", sans-serif');
  skipButton.style('background-color', '#ffffff');
  skipButton.style('border', '3px solid #000');
  skipButton.style('border-radius', '12px');
  skipButton.style('box-shadow', '0px 5px 10px rgba(0,0,0,0.2)'); // 柔和陰影
  skipButton.style('font-weight', 'bold');
  skipButton.style('color', '#000');
  skipButton.style('z-index', '1001');
  skipButton.addClass('bounce-in');

  // 快轉邏輯事件 (支援滑鼠與觸控)
  skipButton.elt.onmousedown = () => isFastForwarding = true;
  skipButton.elt.onmouseup = () => isFastForwarding = false;
  skipButton.elt.onmouseleave = () => isFastForwarding = false;
  skipButton.elt.ontouchstart = (e) => { e.preventDefault(); isFastForwarding = true; };
  skipButton.elt.ontouchend = (e) => { e.preventDefault(); isFastForwarding = false; };

  // 點擊直接顯示全部 (如果不想長按的話，點一下也可以直接完成)
  skipButton.mousePressed(() => {
    introDisplayedText = introFullText;
  });

  // 建立寶石復活按鈕
  reviveGemButton = createButton('💎 復活 (5寶石)');
  reviveGemButton.size(200, 60);
  reviveGemButton.style('font-size', '20px');
  reviveGemButton.style('cursor', 'pointer');
  reviveGemButton.style('font-family', '"Arial Rounded MT Bold", "圓體-繁", sans-serif');
  reviveGemButton.style('background-color', '#3b82f6'); // 藍色
  reviveGemButton.style('border', '3px solid #1d4ed8');
  reviveGemButton.style('border-radius', '15px');
  reviveGemButton.style('color', '#fff');
  reviveGemButton.style('font-weight', 'bold');
  reviveGemButton.addClass('bounce-in');
  reviveGemButton.hide();
  reviveGemButton.mousePressed(() => tryRevive('gem'));

  // 建立廣告復活按鈕
  reviveAdButton = createButton('📺 看廣告復活');
  reviveAdButton.size(200, 60);
  reviveAdButton.style('font-size', '20px');
  reviveAdButton.style('cursor', 'pointer');
  reviveAdButton.style('font-family', '"Arial Rounded MT Bold", "圓體-繁", sans-serif');
  reviveAdButton.style('background-color', '#8b5cf6'); // 紫色
  reviveAdButton.style('border', '3px solid #6d28d9');
  reviveAdButton.style('border-radius', '15px');
  reviveAdButton.style('color', '#fff');
  reviveAdButton.style('font-weight', 'bold');
  reviveAdButton.addClass('bounce-in');
  reviveAdButton.hide();
  reviveAdButton.mousePressed(() => tryRevive('ad'));

  skipButton.hide();

  // 建立重新開始按鈕
  restartButton = createButton('重新開始');
  restartButton.position(width / 2 - 100, height * 0.85);
  restartButton.size(200, 80);
  restartButton.style('font-size', '32px');
  restartButton.style('cursor', 'pointer');
  restartButton.style('font-family', '"Arial Rounded MT Bold", "圓體-繁", "Microsoft JhengHei UI", sans-serif');
  restartButton.style('background-color', '#fefce8');
  restartButton.style('border', '3px solid #3f6212');
  restartButton.style('border-radius', '25px');
  restartButton.style('box-shadow', '10px 10px 10px #3f6212');
  restartButton.style('font-weight', 'bold');
  restartButton.style('color', '#3f6212');
  restartButton.style('transition', 'transform 0.1s, background-color 0.1s, box-shadow 0.1s, color 0.1s, border-color 0.1s, border-radius 0.1s');
  restartButton.addClass('bounce-in');
  addClickEffect(restartButton, '10px 10px 10px #3f6212', '13px 13px 15px #3f6212', '25px');
  restartButton.hide();
  restartButton.mousePressed(resetToStart);

  // 建立繼續遊戲按鈕 (暫停選單用)
  resumeButton = createButton('繼續遊戲');
  resumeButton.size(200, 80);
  resumeButton.style('font-size', '32px');
  resumeButton.style('cursor', 'pointer');
  resumeButton.style('font-family', '"Arial Rounded MT Bold", "圓體-繁", "Microsoft JhengHei UI", sans-serif');
  resumeButton.style('background-color', '#fefce8');
  resumeButton.style('border', '3px solid #3f6212');
  resumeButton.style('border-radius', '25px');
  resumeButton.style('box-shadow', '10px 10px 10px #3f6212');
  resumeButton.style('font-weight', '900');
  resumeButton.style('color', '#3f6212');
  resumeButton.style('transition', 'transform 0.1s, background-color 0.1s, box-shadow 0.1s, color 0.1s, border-color 0.1s, border-radius 0.1s');
  resumeButton.addClass('bounce-in');
  resumeButton.style('z-index', '1001'); // 確保在最上層
  addClickEffect(resumeButton, '10px 10px 10px #3f6212', '13px 13px 15px #3f6212', '25px');
  resumeButton.hide();
  resumeButton.mousePressed(togglePause);

  // 建立商店按鈕 (暫停選單用)
  pauseShopButton = createButton('商店');
  pauseShopButton.size(200, 80);
  pauseShopButton.style('font-size', '32px');
  pauseShopButton.style('cursor', 'pointer');
  pauseShopButton.style('font-family', '"Arial Rounded MT Bold", "圓體-繁", "Microsoft JhengHei UI", sans-serif');
  pauseShopButton.style('background-color', '#e0f2fe'); // 淺藍背景
  pauseShopButton.style('border', '3px solid #0369a1'); // 深藍框
  pauseShopButton.style('border-radius', '25px');
  pauseShopButton.style('box-shadow', '10px 10px 10px #0369a1');
  pauseShopButton.style('font-weight', '900');
  pauseShopButton.style('color', '#0369a1');
  pauseShopButton.style('transition', 'transform 0.1s, background-color 0.1s, box-shadow 0.1s');
  pauseShopButton.addClass('bounce-in');
  pauseShopButton.style('z-index', '1001');
  addClickEffect(pauseShopButton, '10px 10px 10px #0369a1', '13px 13px 15px #0369a1', '25px');
  pauseShopButton.hide();
  pauseShopButton.mousePressed(openShop);

  // 建立商店介面按鈕
  shopCloseButton = createButton('返回');
  shopCloseButton.size(120, 50);
  shopCloseButton.style('font-size', '24px');
  shopCloseButton.style('cursor', 'pointer');
  shopCloseButton.style('font-family', '"Arial Rounded MT Bold", "圓體-繁", sans-serif');
  shopCloseButton.style('background-color', '#f1f5f9');
  shopCloseButton.style('border', '3px solid #334155');
  shopCloseButton.style('border-radius', '15px');
  shopCloseButton.style('color', '#334155');
  shopCloseButton.style('font-weight', 'bold');
  shopCloseButton.style('z-index', '1002');
  shopCloseButton.hide();
  shopCloseButton.mousePressed(closeShop);

  // 購買按鈕樣式設定函式
  function styleBuyBtn(btn, color) {
    btn.size(280, 60);
    btn.style('font-size', '20px');
    btn.style('cursor', 'pointer');
    btn.style('font-family', '"Arial Rounded MT Bold", "圓體-繁", sans-serif');
    btn.style('background-color', '#fff');
    btn.style('border', `3px solid ${color}`);
    btn.style('border-radius', '15px');
    btn.style('color', '#333');
    btn.style('font-weight', 'bold');
    btn.style('text-align', 'left');
    btn.style('padding-left', '20px');
    btn.style('z-index', '1002');
    btn.hide();
  }

  buyPotionBtn = createButton('❤️ 生命藥水 (5💎)');
  styleBuyBtn(buyPotionBtn, '#ef4444');
  buyPotionBtn.mousePressed(() => buyItem('potion', 5));

  buyMagnetBtn = createButton('🧲 磁鐵 (8💎)');
  styleBuyBtn(buyMagnetBtn, '#ef4444'); // 磁鐵也是紅色系道具
  buyMagnetBtn.mousePressed(() => buyItem('magnet', 8));

  buyShieldBtn = createButton('🛡️ 護盾 (10💎)');
  styleBuyBtn(buyShieldBtn, '#3b82f6');
  buyShieldBtn.mousePressed(() => buyItem('shield', 10));

  // 建立結束遊戲按鈕 (暫停選單用)
  pauseQuitButton = createButton('結束遊戲');
  pauseQuitButton.size(200, 80);
  pauseQuitButton.style('font-size', '32px');
  pauseQuitButton.style('cursor', 'pointer');
  pauseQuitButton.style('font-family', '"Arial Rounded MT Bold", "圓體-繁", "Microsoft JhengHei UI", sans-serif');
  pauseQuitButton.style('background-color', '#fee2e2'); // 淺紅背景
  pauseQuitButton.style('border', '3px solid #b91c1c'); // 深紅框
  pauseQuitButton.style('border-radius', '25px');
  pauseQuitButton.style('box-shadow', '10px 10px 10px #b91c1c');
  pauseQuitButton.style('font-weight', '900');
  pauseQuitButton.style('color', '#b91c1c');
  pauseQuitButton.style('transition', 'transform 0.1s, background-color 0.1s, box-shadow 0.1s');
  pauseQuitButton.addClass('bounce-in');
  pauseQuitButton.style('z-index', '1001'); // 確保在最上層
  addClickEffect(pauseQuitButton, '10px 10px 10px #b91c1c', '13px 13px 15px #b91c1c', '25px');
  pauseQuitButton.hide();
  pauseQuitButton.mousePressed(() => { 
    togglePause(); 
    // 跳至闖關失敗頁面
    gameState = 'gameover';
    calculatePlayTime(); // 計算遊玩時間
    // 隱藏遊戲 UI
    char1Input.hide();
    retryButton.hide();
    nextButton.hide();
    submitButton.hide();
    for (let btn of optionButtons) btn.hide();
    pauseBtn.hide();
    leftBtn.hide();
    rightBtn.hide();
    jumpBtn.hide();
  }); 

  // 建立重新開始按鈕 (暫停選單用)
  pauseRestartButton = createButton('重新開始');
  pauseRestartButton.size(200, 80);
  pauseRestartButton.style('font-size', '32px');
  pauseRestartButton.style('cursor', 'pointer');
  pauseRestartButton.style('font-family', '"Arial Rounded MT Bold", "圓體-繁", "Microsoft JhengHei UI", sans-serif');
  pauseRestartButton.style('background-color', '#fefce8');
  pauseRestartButton.style('border', '3px solid #3f6212');
  pauseRestartButton.style('border-radius', '25px');
  pauseRestartButton.style('box-shadow', '10px 10px 10px #3f6212');
  pauseRestartButton.style('font-weight', '900');
  pauseRestartButton.style('color', '#3f6212');
  pauseRestartButton.style('transition', 'transform 0.1s, background-color 0.1s, box-shadow 0.1s');
  pauseRestartButton.addClass('bounce-in');
  pauseRestartButton.style('z-index', '1001'); // 確保在最上層
  addClickEffect(pauseRestartButton, '10px 10px 10px #3f6212', '13px 13px 15px #3f6212', '25px');
  pauseRestartButton.hide();
  pauseRestartButton.mousePressed(() => location.reload()); // 重新載入頁面

  // 建立暫停按鈕 (右上角)
  pauseBtn = createButton('⏸');
  pauseBtn.position(width - 60, 20);
  pauseBtn.size(45, 45);
  pauseBtn.style('font-size', '20px');
  pauseBtn.style('background-color', '#fefce8');
  pauseBtn.style('border', '3px solid #3f6212');
  pauseBtn.style('border-radius', '10px');
  pauseBtn.style('color', '#3f6212');
  pauseBtn.style('cursor', 'pointer');
  pauseBtn.style('z-index', '1000');
  addClickEffect(pauseBtn, '3px 3px 5px #3f6212', '5px 5px 8px #3f6212', '10px');
  pauseBtn.mousePressed(togglePause);
  pauseBtn.hide();

  // 建立虛擬移動按鈕 (左)
  leftBtn = createButton('◀');
  leftBtn.position(20, height - 80);
  leftBtn.size(60, 60);
  styleControlBtn(leftBtn);
  leftBtn.elt.onmousedown = () => isLeftBtnDown = true;
  leftBtn.elt.onmouseup = () => isLeftBtnDown = false;
  leftBtn.elt.onmouseleave = () => isLeftBtnDown = false;
  leftBtn.elt.ontouchstart = (e) => { e.preventDefault(); isLeftBtnDown = true; };
  leftBtn.elt.ontouchend = (e) => { e.preventDefault(); isLeftBtnDown = false; };
  leftBtn.hide();

  // 建立虛擬移動按鈕 (右)
  rightBtn = createButton('▶');
  rightBtn.position(90, height - 80);
  rightBtn.size(60, 60);
  styleControlBtn(rightBtn);
  rightBtn.elt.onmousedown = () => isRightBtnDown = true;
  rightBtn.elt.onmouseup = () => isRightBtnDown = false;
  rightBtn.elt.onmouseleave = () => isRightBtnDown = false;
  rightBtn.elt.ontouchstart = (e) => { e.preventDefault(); isRightBtnDown = true; };
  rightBtn.elt.ontouchend = (e) => { e.preventDefault(); isRightBtnDown = false; };
  rightBtn.hide();

  // 建立虛擬跳躍按鈕
  jumpBtn = createButton('▲');
  jumpBtn.position(width - 80, height - 80);
  jumpBtn.size(60, 60);
  styleControlBtn(jumpBtn);
  jumpBtn.mousePressed(performJump);
  jumpBtn.elt.ontouchstart = (e) => { e.preventDefault(); performJump(); };
  jumpBtn.hide();

  // 設定動畫播放速度 (每秒的影格數)
  // 數值越小，動畫越慢
  frameRate(60);

  // 檢查每日登入獎勵
  checkDailyLogin();

  // 將圖片的繪製基準點設為中心
  imageMode(CENTER);
}

function styleControlBtn(btn) {
  btn.style('font-size', '30px');
  btn.style('background-color', 'rgba(254, 252, 232, 0.6)'); // 半透明米色
  btn.style('border', '3px solid rgba(63, 98, 18, 0.6)');
  btn.style('border-radius', '50%');
  btn.style('color', '#3f6212');
  btn.style('cursor', 'pointer');
  btn.style('user-select', 'none');
  btn.style('touch-action', 'manipulation'); // 防止雙擊縮放
  btn.addClass('bounce-in');
}

function enterIntro() {
  gameState = 'intro';
  startButton.hide();
  introButton.show();
  skipButton.show(); // 進入簡介時顯示跳過按鈕
  introDisplayedText = ""; // 重置打字機文字，確保每次進入都從頭播放
}

function startGame() {
  gameState = 'playing';
  gameStartTime = millis(); // 紀錄開始時間
  startButton.hide();
  introButton.hide();
  skipButton.hide(); // 開始遊戲後隱藏
  pauseBtn.show();
  leftBtn.show();
  rightBtn.show();
  jumpBtn.show();
}

function resetToStart() {
  gameState = 'start';
  char1HP = char1MaxHP;
  charX = width / 2;
  charY = height * 0.85;
  isOnGround = true;
  jumpCount = 0; // 重置跳躍次數
  char2X = width * 0.75;
  char2Y = height * 0.85;
  char3X = width * 0.9;
  char3Y = height * 0.85;
  char4X = width * 1.05;
  char4Y = height * 0.85;
  char5X = width * 1.2;
  char5Y = height * 0.85;
  showChar5Hint = false;
  char5HintTimer = 0;
  consecutiveWrongAnswers = 0;
  char5AnimScale = 0;
  dustParticles = [];
  speedLines = []; // 清空速度線
  floatingTexts = []; // 清空浮動文字
  combo = 0; // 重置連擊
  // gemCount = 0; // 移除重置，改為讀取存檔
  gemCount = parseInt(localStorage.getItem('gemCount') || '0');
  hasShield = false; // 重置護盾
  maxCombo = 0;
  hpBarShakeTimer = 0;
  confettiParticles = [];
  shockwaves = [];
  fireworks = []; // 清空煙火
  bgX = 0;
  gems = []; // 清空寶石
  spawnGems(); // 重新生成寶石
  magnets = []; // 清空磁鐵
  spawnMagnets(); // 重新生成磁鐵
  bombs = []; // 清空炸彈
  spawnBombs(); // 重新生成炸彈
  timeStopWatches = []; // 清空懷錶
  spawnTimeStopWatches(); // 重新生成懷錶
  stars = []; // 清空星星
  spawnStars(); // 重新生成星星
  starTimer = 0; // 重置無敵時間
  mushrooms = []; // 清空蘑菇
  spawnMushrooms(); // 重新生成蘑菇
  giantTimer = 0; // 重置巨大化時間
  timeStopTimer = 0; // 重置時間暫停
  magnetTimer = 0; // 重置磁鐵時間
  
  // 重置遊戲流程
  currentQuestionerIndex = 0;
  questionsAnsweredForCurrent = 0;
  totalCorrectAnswers = 0;
  displayedCorrectAnswers = 0;
  
  isShopping = false;
  pauseShopButton.hide();
  shopCloseButton.hide();
  buyPotionBtn.hide();
  buyMagnetBtn.hide();
  buyShieldBtn.hide();
  
  resumeButton.hide();
  pauseQuitButton.hide();
  pauseRestartButton.hide();
  reviveGemButton.hide();
  reviveAdButton.hide();
  isPaused = false;
  pausedScreenshot = null;
  
  dialogueState = 'idle';
  currentQuestion = null;
  char1Input.value('');
  char1Input.hide();
  submitButton.hide();
  for (let btn of optionButtons) {
    btn.hide();
  }
  retryButton.hide();
  nextButton.hide();
  
  restartButton.hide();
  introButton.hide();
  skipButton.hide();
  startButton.show();
  
  pauseBtn.hide();
  leftBtn.hide();
  rightBtn.hide();
  jumpBtn.hide();
}

function draw() {
  // 檢查遊戲狀態，如果是開始畫面則繪製開始畫面並停止執行後續邏輯
  if (gameState === 'start') {
    drawStartScreen();
    return;
  }
  
  if (gameState === 'intro') {
    drawIntroScreen();
    return;
  }

  // --- 暫停邏輯 ---
  if (isPaused) {
    // 繪製凍結的遊戲畫面
    if (pausedScreenshot) {
      image(pausedScreenshot, width / 2, height / 2);
    }
    
    if (isShopping) {
      drawShopMenu();
    } else {
      drawPauseMenu();
    }
    return; // 停止執行後續的遊戲更新邏輯
  }

  // --- 新提問者進場動畫 ---
  if (gameState === 'transition') {
    const activeQuestioner = questionerOrder[currentQuestionerIndex];
    let targetX;
    const lerpSpeed = 0.08; // 控制進場動畫的速度

    if (activeQuestioner === 2) {
        targetX = width * 0.75;
        char2X = lerp(char2X, targetX, lerpSpeed);
        if (abs(char2X - targetX) < 1) {
            char2X = targetX;
            gameState = 'playing';
        }
    } else if (activeQuestioner === 3) {
        targetX = width * 0.9;
        char3X = lerp(char3X, targetX, lerpSpeed);
        if (abs(char3X - targetX) < 1) {
            char3X = targetX;
            gameState = 'playing';
        }
    } else if (activeQuestioner === 4) {
        targetX = width * 1.05;
        char4X = lerp(char4X, targetX, lerpSpeed);
        if (abs(char4X - targetX) < 1) {
            char4X = targetX;
            gameState = 'playing';
        }
    }
  }

  // --- 玩家移動與背景捲動 ---
  // 修改為：玩家移動 charX，鏡頭(背景)再跟隨 charX
  let scrollSpeedX = 0;
  isMoving = false;
  
  // 1. 處理輸入，移動角色 (Screen Space)
  let currentMoveSpeed = speed;
  let isSprinting = keyIsDown(SHIFT); // 偵測 Shift 鍵

  if (isSprinting) {
    currentMoveSpeed = 12; // 衝刺速度 (原為 7)
  }

  if (gameState === 'playing' && isOnGround && (keyIsDown(LEFT_ARROW) || isLeftBtnDown)) {
    charX -= currentMoveSpeed; 
    direction = 1;
    isMoving = true;
    // 衝刺時產生更多灰塵
    if (frameCount % (isSprinting ? 2 : 4) === 0) {
      dustParticles.push(new DustParticle(charX, charY + 45));
    }
    // 衝刺時產生速度線
    if (isSprinting && frameCount % 3 === 0) {
      speedLines.push(new SpeedLine(1)); // 往右飛的線 (模擬風阻)
    }
  }
  if (gameState === 'playing' && isOnGround && (keyIsDown(RIGHT_ARROW) || isRightBtnDown)) {
    charX += currentMoveSpeed;
    direction = -1;
    isMoving = true;
    // 衝刺時產生更多灰塵
    if (frameCount % (isSprinting ? 2 : 4) === 0) {
      dustParticles.push(new DustParticle(charX, charY + 45));
    }
    // 衝刺時產生速度線
    if (isSprinting && frameCount % 3 === 0) {
      speedLines.push(new SpeedLine(-1)); // 往左飛的線
    }
  }

  // --- 擊退物理 (新增) ---
  if (abs(knockbackVx) > 0.1) {
    charX += knockbackVx;
    knockbackVx *= 0.9; // 阻力，讓擊退速度逐漸歸零
  } else {
    knockbackVx = 0;
  }

  // 2. 鏡頭跟隨邏輯 (Camera Follow)
  // 計算角色偏離中心的距離，並讓背景緩慢跟上 (Lerp)
  let targetCamX = width / 2;
  let camError = targetCamX - charX;
  scrollSpeedX = camError * 0.05; // 0.05 是跟隨係數，越小越平滑(延遲感越重)

  // 3. 應用捲動到所有世界物件
  bgX += scrollSpeedX;
  charX += scrollSpeedX; // 修正角色位置回中心

  // 設定畫布背景顏色
  background('#415a77');
  // background('#415a77'); // 移除原本的純色背景

  // --- 螢幕震動特效 (新增) ---
  push();
  if (screenShakeAmount > 0) {
    translate(random(-screenShakeAmount, screenShakeAmount), random(-screenShakeAmount, screenShakeAmount));
    screenShakeAmount *= 0.9; // 震動衰減
    if (screenShakeAmount < 1) screenShakeAmount = 0;
  }

  // --- 計算背景縮放比例以符合視窗大小並保持長寬比 (Cover) ---
  let bgRatio = bgImg.width / bgImg.height;
  let canvasRatio = width / height;
  let bgW, bgH;

  if (bgRatio > canvasRatio) {
    // 圖片比畫布寬，以畫布高度為準，寬度會超出
    bgH = height;
    bgW = height * bgRatio;
  } else {
    // 圖片比畫布高或比例相同，以畫布寬度為準，高度會超出
    bgW = width;
    bgH = width / bgRatio;
  }

  // --- 繪製背景 (三張圖串接) ---
  // 使用 width + 2 稍微重疊以避免接縫處出現白線，確保橫向連接平滑
  image(bgImg, bgX - bgW + width / 2, height / 2, bgW, bgH); // 左邊的複製圖
  image(bgImg, bgX + width / 2, height / 2, bgW, bgH);         // 中間的主圖
  image(bgImg, bgX + bgW + width / 2, height / 2, bgW, bgH); // 右邊的複製圖
  
  // --- 背景循環邏輯 ---
  if (bgX < -bgW) bgX += bgW;
  if (bgX > bgW) bgX -= bgW;

  // --- 繪製衝擊波特效 ---
  // 繪製在角色之前，讓衝擊波在地面上
  for (let i = shockwaves.length - 1; i >= 0; i--) {
    let sw = shockwaves[i];
    sw.update(scrollSpeedX);
    sw.display();
    if (sw.isDead()) {
      shockwaves.splice(i, 1);
    }
  }

  // --- 繪製煙火 (修復：原本漏掉的迴圈，用於爆炸特效) ---
  for (let i = fireworks.length - 1; i >= 0; i--) {
    let fw = fireworks[i];
    fw.update();
    fw.display();
    if (fw.isDead()) {
      fireworks.splice(i, 1);
    }
  }

  // --- 繪製速度線 (新增) ---
  for (let i = speedLines.length - 1; i >= 0; i--) {
    let sl = speedLines[i];
    sl.update();
    sl.display();
    if (sl.isDead()) {
      speedLines.splice(i, 1);
    }
  }

  // --- 繪製灰塵特效 ---
  for (let i = dustParticles.length - 1; i >= 0; i--) {
    let p = dustParticles[i];
    p.update(scrollSpeedX);
    p.display();
    if (p.isDead()) {
      dustParticles.splice(i, 1);
    }
  }

  // --- 磁鐵效果邏輯 (新增) ---
  if (magnetTimer > 0) {
    magnetTimer--;
    
    // 繪製磁力場特效 (在角色周圍畫圈)
    push();
    translate(charX, charY - 40);
    noFill();
    stroke(255, 50, 50, 100 + sin(frameCount * 0.2) * 50); // 閃爍紅光
    strokeWeight(2);
    let auraSize = 100 + sin(frameCount * 0.1) * 10;
    circle(0, 0, auraSize);
    // 畫一些向內的線條表示吸力
    if (frameCount % 10 === 0) {
       // 這裡可以加一些粒子特效，暫時省略保持效能
    }
    pop();
  }
  
  // --- 時間暫停邏輯 (新增) ---
  if (timeStopTimer > 0) {
    timeStopTimer--;
    if (dialogueState === 'asking') {
      questionStartTime += deltaTime; // 暫停題目計時 (讓開始時間隨時間推移，保持差值不變)
    }
  }
  
  // --- 無敵狀態邏輯 (新增) ---
  if (starTimer > 0) {
    starTimer--;
  }
  
  // --- 巨大化狀態邏輯 (新增) ---
  if (giantTimer > 0) {
    giantTimer--;
  }

  // --- 繪製炸彈障礙物 (新增) ---
  for (let i = bombs.length - 1; i >= 0; i--) {
    let b = bombs[i];
    b.update(scrollSpeedX);
    b.display();
    
    if (b.checkCollision(charX, charY)) {
      // 檢查無敵狀態 (新增)
      if (starTimer > 0) {
        bombs.splice(i, 1);
        floatingTexts.push(new FloatingText(charX, charY - 100, "INVINCIBLE!", '#facc15'));
        onomatopoeias.push(new Onomatopoeia(charX, charY - 100, "SMASH!", '#facc15'));
        shockwaves.push(new Shockwave(b.x, b.y, 1.5));
        
        // 產生金色爆炸特效
        let fw = new Firework();
        fw.x = b.x; fw.y = b.y; fw.targetY = b.y; fw.exploded = true; fw.color = color('#facc15');
        for(let k=0; k<15; k++) fw.particles.push(new FireworkParticle(b.x, b.y, fw.color));
        fireworks.push(fw);
        
        continue; // 跳過後續傷害邏輯
      }
      
      // 檢查巨大化狀態 (新增)
      if (giantTimer > 0) {
        bombs.splice(i, 1);
        floatingTexts.push(new FloatingText(charX, charY - 100, "CRUSHED!", '#ef4444'));
        onomatopoeias.push(new Onomatopoeia(charX, charY - 100, "STOMP!", '#ef4444'));
        shockwaves.push(new Shockwave(b.x, b.y, 2));
        screenShakeAmount = 15;
        
        // 產生爆炸特效
        let fw = new Firework();
        fw.x = b.x; fw.y = b.y; fw.targetY = b.y; fw.exploded = true; fw.color = color('#ef4444');
        for(let k=0; k<15; k++) fw.particles.push(new FireworkParticle(b.x, b.y, fw.color));
        fireworks.push(fw);
        continue;
      }

      // 檢查護盾
      if (hasShield) {
        hasShield = false;
        bombs.splice(i, 1);
        floatingTexts.push(new FloatingText(charX, charY - 100, "BLOCKED!", '#3b82f6'));
        onomatopoeias.push(new Onomatopoeia(charX, charY - 100, "SHIELD!", '#3b82f6'));
        shockwaves.push(new Shockwave(b.x, b.y, 1));
        continue; // 跳過傷害邏輯
      }

      // 觸發爆炸
      char1HP -= 30; // 扣血
      if (char1HP < 0) char1HP = 0;
      
      // 新增：擊退效果 (炸飛)
      velocityY = -12; // 給予向上的力道
      isOnGround = false; // 設定為離地狀態
      let dir = (charX < b.x) ? -1 : 1; // 判斷炸彈在角色哪一邊，往反方向推
      knockbackVx = 15 * dir; // 設定水平擊退速度
      
      screenShakeAmount = 20; // 強烈震動
      shockwaves.push(new Shockwave(b.x, b.y, 2)); // 產生衝擊波
      onomatopoeias.push(new Onomatopoeia(charX, charY - 100, "BOOM!", '#ef4444'));
      floatingTexts.push(new FloatingText(charX, charY - 100, "-30 HP", '#ef4444'));
      
      // 產生爆炸粒子特效 (利用 Firework 系統)
      let fw = new Firework();
      fw.x = b.x;
      fw.y = b.y;
      fw.targetY = b.y;
      fw.exploded = true; // 直接設為已爆炸
      fw.color = color('#ef4444'); // 紅色爆炸
      for(let k=0; k<20; k++) fw.particles.push(new FireworkParticle(b.x, b.y, fw.color));
      fireworks.push(fw);
      
      bombs.splice(i, 1); // 移除炸彈
    }
  }

  // --- 繪製磁鐵道具 (新增) ---
  for (let i = magnets.length - 1; i >= 0; i--) {
    let m = magnets[i];
    m.update(scrollSpeedX);
    m.display();
    
    if (m.checkCollision(charX, charY)) {
      magnetTimer = MAGNET_DURATION; // 啟動磁鐵效果
      floatingTexts.push(new FloatingText(m.x, m.y - 40, "MAGNET!", '#ef4444'));
      onomatopoeias.push(new Onomatopoeia(charX, charY - 100, "SUCK!", '#ef4444'));
      magnets.splice(i, 1);
    }
  }

  // --- 繪製無敵星星 (新增) ---
  for (let i = stars.length - 1; i >= 0; i--) {
    let s = stars[i];
    s.update(scrollSpeedX);
    s.display();
    
    if (s.checkCollision(charX, charY)) {
      starTimer = STAR_DURATION; // 啟動無敵
      floatingTexts.push(new FloatingText(s.x, s.y - 40, "STAR POWER!", '#facc15'));
      onomatopoeias.push(new Onomatopoeia(charX, charY - 100, "SUPER!", '#facc15'));
      stars.splice(i, 1);
      screenShakeAmount = 5; // 吃到時稍微震動
    }
  }

  // --- 繪製巨大化蘑菇 (新增) ---
  for (let i = mushrooms.length - 1; i >= 0; i--) {
    let m = mushrooms[i];
    m.update(scrollSpeedX);
    m.display();
    
    if (m.checkCollision(charX, charY)) {
      giantTimer = GIANT_DURATION; // 啟動巨大化
      floatingTexts.push(new FloatingText(m.x, m.y - 40, "GIANT!", '#ef4444'));
      onomatopoeias.push(new Onomatopoeia(charX, charY - 100, "GROW!", '#ef4444'));
      mushrooms.splice(i, 1);
      screenShakeAmount = 10;
    }
  }

  // --- 繪製時間暫停懷錶 (新增) ---
  for (let i = timeStopWatches.length - 1; i >= 0; i--) {
    let w = timeStopWatches[i];
    w.update(scrollSpeedX);
    w.display();
    
    if (w.checkCollision(charX, charY)) {
      timeStopTimer = 600; // 10秒 (60fps * 10)
      floatingTexts.push(new FloatingText(w.x, w.y - 40, "TIME STOP!", '#3b82f6'));
      onomatopoeias.push(new Onomatopoeia(charX, charY - 100, "FREEZE!", '#3b82f6'));
      timeStopWatches.splice(i, 1);
    }
  }

  // --- 繪製寶石 (新增) ---
  for (let i = gems.length - 1; i >= 0; i--) {
    let g = gems[i];
    
    // 磁鐵吸取邏輯
    if (magnetTimer > 0 && dist(charX, charY - 40, g.x, g.y) < MAGNET_RANGE) {
       let angle = atan2((charY - 40) - g.y, charX - g.x);
       g.x += cos(angle) * MAGNET_SPEED;
       g.y += sin(angle) * MAGNET_SPEED;
    }

    g.update(scrollSpeedX);
    g.display();
    
    // 檢查是否吃到寶石
    if (g.checkCollision(charX, charY)) {
      score += g.type.score;
      gemCount++; // 增加寶石數量
      
      // 新增：更新寶石統計與檢查成就
      gameStats.gemsCollected++;
      checkAchievements('gems');
      saveGameData(); // 統一儲存資料

      floatingTexts.push(new FloatingText(g.x, g.y - 20, `+${g.type.score}`, g.type.color));
      // 產生一些特效
      for (let j = 0; j < 5; j++) confettiParticles.push(new Confetti(g.x, g.y));
      gems.splice(i, 1); // 移除寶石
    }
  }

  // --- 繪製彩帶特效 ---
  for (let i = confettiParticles.length - 1; i >= 0; i--) {
    let p = confettiParticles[i];
    p.update(scrollSpeedX); // 加入捲動速度
    p.display();
    if (p.isDead()) {
      confettiParticles.splice(i, 1);
    }
  }

  // --- 繪製浮動文字 (新增) ---
  for (let i = floatingTexts.length - 1; i >= 0; i--) {
    let ft = floatingTexts[i];
    ft.update(scrollSpeedX); // 加入捲動速度
    ft.display();
    if (ft.isDead()) {
      floatingTexts.splice(i, 1);
    }
  }

  // --- 繪製狀聲詞特效 ---
  for (let i = onomatopoeias.length - 1; i >= 0; i--) {
    let ono = onomatopoeias[i];
    ono.update();
    ono.display();
    if (ono.isDead()) {
      onomatopoeias.splice(i, 1);
    }
  }

  // --- 角色物理更新 ---
  velocityY += gravity;
  charY += velocityY;
  if (charY >= height * 0.85) {
    charY = height * 0.85;
    if (!isOnGround) { // 偵測到落地瞬間
      let landingSpeed = velocityY;
      if (landingSpeed > 5) { // 只有在有一定掉落速度時才震動
        // 產生衝擊波特效
        let shockwavePower = map(landingSpeed, 5, 30, 0.5, 2, true);
        shockwaves.push(new Shockwave(charX, charY + 45, shockwavePower));
        onomatopoeias.push(new Onomatopoeia(charX, charY, "BAM!"));
        
        // 新增：落地震動與灰塵爆發
        // screenShakeAmount = map(landingSpeed, 5, 25, 5, 20, true);
        for (let i = 0; i < 8; i++) {
           let d = new DustParticle(charX, charY + 45);
           d.vx = random(-5, 5); // 落地時灰塵噴得更遠
           d.vy = random(-2, -5); // 落地時灰塵噴得更高
           dustParticles.push(d);
        }
      }
    }
    velocityY = 0;
    isOnGround = true;
    jumpCount = 0; // 落地重置跳躍次數
  } else {
    isOnGround = false;
  }

  // 更新所有 NPC 的位置 (隨鏡頭捲動)
  char2X += scrollSpeedX;
  char3X += scrollSpeedX;
  char4X += scrollSpeedX;
  char5X += scrollSpeedX;

  // --- 繪製角色 ---
  if (gameState !== 'cleared' && gameState !== 'gameover') {
    drawCharacter1();
    // 只繪製當前的提問者
    if (currentQuestionerIndex < questionerOrder.length) {
      const activeQuestioner = questionerOrder[currentQuestionerIndex];
      if (activeQuestioner === 2) drawCharacter2();
      else if (activeQuestioner === 3) drawCharacter3();
      else if (activeQuestioner === 4) drawCharacter4();
    }

    // --- 互動與對話邏輯 ---
    handleInteraction();

    // --- 角色5 提示邏輯 ---
    if (showChar5Hint) {
      char5AnimScale = lerp(char5AnimScale, 1, 0.2); // 彈出動畫：數值從 0 漸變到 1
      char5HintTimer--;
      if (char5HintTimer <= 0) {
        showChar5Hint = false;
      }
    } else {
      char5AnimScale = lerp(char5AnimScale, 0, 0.2); // 消失動畫：數值從 1 漸變到 0
    }

    // 只要還有縮放比例（還沒完全消失），就繼續繪製角色
    if (char5AnimScale > 0.01) {
      drawCharacter5();
      
      // 只有在「顯示中」才繪製對話框 (縮小消失時不顯示對話框)
      if (showChar5Hint) {
        let sHeight5 = 30;
        let targetNPCHeight = sHeight5 * scaleFactor5;
        let bubbleY = char5Y - (targetNPCHeight / 2) - 60;
        if (currentQuestion) {
          let hintText, bubbleType;
          if (consecutiveWrongAnswers >= 3) {
            hintText = "答案是：" + currentQuestion.getString('答案');
            bubbleType = 'reveal_answer'; // 設定為「揭示答案」類型
          } else {
            hintText = "提示：" + currentQuestion.getString('提示');
            bubbleType = 'hint'; // 設定為「提示」類型
          }
          displayDialogueBubble(char5X, bubbleY, hintText, bubbleType);
        }
      }
    }
  }

  pop(); // 結束震動特效的 push()

  // --- 繪製UI ---
  if (gameState !== 'cleared' && gameState !== 'gameover') {
    drawHPBar();
    drawScore(); // 繪製分數
  }

  // 如果血量歸零 或 狀態為 gameover，顯示遊戲結束
  if (char1HP <= 0 || gameState === 'gameover') {
    displayGameOver();
    return;
  }

  // 如果通關，顯示通關畫面 (繪製在最上層)
  if (gameState === 'cleared') {
    displayGameClear();
  }
}

function drawCharacter1() {
  let currentSheet, frameWidth, sHeight, currentFrame;

  if (isOnGround) {
    currentSheet = spriteSheet;
    frameWidth = currentSheet.width / walkFrames;
    sHeight = currentSheet.height;
    if (isMoving) {
      currentFrame = (floor(frameCount / 16) % 2) * 2;
    } else {
      currentFrame = 0;
    }
  } else {
    currentSheet = jumpSheet;
    frameWidth = currentSheet.width / jumpFrames;
    sHeight = currentSheet.height;
    // 不要播放動畫，固定顯示第一格
    currentFrame = 0;
  }

  let sx = currentFrame * frameWidth;

  // --- 巨大化縮放邏輯 (新增) ---
  let giantScale = (giantTimer > 0) ? 2 : 1;
  let yOffset = 0;
  if (giantTimer > 0) {
      yOffset = sHeight * scaleFactor * 0.5; // 往上移動一半高度，讓腳保持在地面
  }

  push();
  translate(charX, charY - yOffset);
  scale(direction * giantScale, giantScale);
  noStroke();

  // --- 新增：連擊霸氣特效 (Fever Aura) ---
  if (combo >= 3) {
    push();
    blendMode(ADD); // 發光疊加模式
    let auraSize = map(sin(frameCount * 0.2), -1, 1, 0.9, 1.1); // 呼吸效果
    fill(255, 200, 0, 100); // 金黃色光環
    ellipse(0, -sHeight * scaleFactor * 0.4, Math.round(frameWidth) * scaleFactor * 1.2 * auraSize, sHeight * scaleFactor * 0.8 * auraSize);
    pop();
  }

  // --- 護盾特效 (新增) ---
  if (hasShield) {
    push();
    noFill();
    stroke(0, 255, 255, 150 + sin(frameCount * 0.1) * 100); // 青色呼吸燈
    strokeWeight(4);
    circle(0, -sHeight * scaleFactor * 0.5, sHeight * scaleFactor * 1.2);
    pop();
  }
  
  // --- 無敵星星發光特效 (新增) ---
  if (starTimer > 0) {
    push();
    blendMode(ADD);
    noFill();
    strokeWeight(5);
    // 快速閃爍的金色光芒
    let alpha = map(sin(frameCount * 0.5), -1, 1, 100, 255);
    stroke(255, 215, 0, alpha); // 金色
    circle(0, -sHeight * scaleFactor * 0.5, sHeight * scaleFactor * 1.3);
    fill(255, 215, 0, 50); // 內部淡淡的金色填充
    circle(0, -sHeight * scaleFactor * 0.5, sHeight * scaleFactor * 1.1);
    pop();
  }

  // --- 漫畫風格描邊 ---
  let outlineOffset = 2; // 描邊寬度
  tint(0); // 黑色
  // 在八個方向上繪製偏移的圖像作為輪廓
  for (let i = -1; i <= 1; i++) {
    for (let j = -1; j <= 1; j++) {
      if (i === 0 && j === 0) continue;
      image(currentSheet, i * outlineOffset, j * outlineOffset, Math.round(frameWidth) * scaleFactor, sHeight * scaleFactor, Math.round(sx), 0, Math.round(frameWidth), sHeight);
    }
  }
  noTint(); // 移除色調，繪製主體

  image(
    currentSheet,
    0, 0,
    Math.round(frameWidth) * scaleFactor, sHeight * scaleFactor,
    Math.round(sx), 0,
    Math.round(frameWidth), sHeight
  );
  pop();
}

function drawCharacter2() {
  let frameWidth2 = spriteSheet2.width / allFrames2;
  let sHeight2 = spriteSheet2.height;
  
  let dist2 = abs(charX - char2X);
  let currentFrame2 = 0;
  if (dist2 < 150) {
    // 靠近時：播放走路/互動動畫
    currentFrame2 = floor((frameCount / 10) % allFrames2);
  } else {
    // 靜止時：預設顯示第0格，並偶爾切換到第1格來模擬眨眼
    currentFrame2 = 0;
    if (frameCount % 240 < 5) { // 每4秒 (240幀) 眨眼一次 (持續5幀)
      currentFrame2 = 1;
    }
  }
  
  let sx2 = currentFrame2 * frameWidth2;

  push();
  translate(char2X, char2Y);

  // --- 漫畫風格描邊 ---
  let outlineOffset = 2;
  tint(0);
  for (let i = -1; i <= 1; i++) {
    for (let j = -1; j <= 1; j++) {
      if (i === 0 && j === 0) continue;
      image(spriteSheet2, i * outlineOffset, j * outlineOffset, frameWidth2 * scaleFactor2, sHeight2 * scaleFactor2, sx2, 0, frameWidth2, sHeight2);
    }
  }
  noTint();

  image(
    spriteSheet2,
    0, 0,
    frameWidth2 * scaleFactor2, sHeight2 * scaleFactor2,
    sx2, 0,
    frameWidth2, sHeight2
  );
  pop();
}

function drawCharacter3() {
  let frameWidth3 = 329 / allFrames3;
  let sHeight3 = 77;
  
  let dist3 = abs(charX - char3X);
  let currentFrame3 = 0;
  if (dist3 < 150) {
    currentFrame3 = floor((frameCount / 10) % allFrames3);
  }

  let sx3 = currentFrame3 * frameWidth3;

  // 新增：當角色1靠近時，角色3面向角色1
  let char3Direction = 1;
  if (dist3 < 150) {
    char3Direction = (charX > char3X) ? -1 : 1;
  }

  push();
  translate(char3X, char3Y);
  scale(char3Direction, 1);

  // --- 漫畫風格描邊 ---
  let outlineOffset = 2;
  tint(0);
  for (let i = -1; i <= 1; i++) {
    for (let j = -1; j <= 1; j++) {
      if (i === 0 && j === 0) continue;
      image(spriteSheet3, i * outlineOffset, j * outlineOffset, frameWidth3 * scaleFactor3, sHeight3 * scaleFactor3, sx3, 0, frameWidth3, sHeight3);
    }
  }
  noTint();

  image(
    spriteSheet3,
    0, 0,
    frameWidth3 * scaleFactor3, sHeight3 * scaleFactor3,
    sx3, 0,
    frameWidth3, sHeight3
  );
  pop();
}

function drawCharacter4() {
  let frameWidth4 = 322 / allFrames4;
  let sHeight4 = 81;
  
  let dist4 = abs(charX - char4X);
  let currentFrame4 = 0;
  if (dist4 < 150) {
    currentFrame4 = floor((frameCount / 10) % allFrames4);
  }

  let sx4 = currentFrame4 * frameWidth4;

  let char4Direction = 1;
  if (dist4 < 150) {
    char4Direction = (charX > char4X) ? -1 : 1;
  }

  push();
  translate(char4X, char4Y);
  scale(char4Direction, 1);

  // --- 漫畫風格描邊 ---
  let outlineOffset = 2;
  tint(0);
  for (let i = -1; i <= 1; i++) {
    for (let j = -1; j <= 1; j++) {
      if (i === 0 && j === 0) continue;
      image(spriteSheet4, i * outlineOffset, j * outlineOffset, frameWidth4 * scaleFactor4, sHeight4 * scaleFactor4, sx4, 0, frameWidth4, sHeight4);
    }
  }
  noTint();

  image(
    spriteSheet4,
    0, 0,
    frameWidth4 * scaleFactor4, sHeight4 * scaleFactor4,
    sx4, 0,
    frameWidth4, sHeight4
  );
  pop();
}

function drawCharacter5() {
  let frameWidth5 = 114 / allFrames5;
  let sHeight5 = 30;
  
  // 當角色5出現時，持續播放動畫
  let currentFrame5 = floor((frameCount / 10) % allFrames5);

  let sx5 = currentFrame5 * frameWidth5;

  // 讓角色5面向玩家
  let char5Direction = (charX > char5X) ? -1 : 1;

  push();
  translate(char5X, char5Y);
  scale(char5Direction * char5AnimScale, char5AnimScale); // 應用彈出動畫縮放

  // --- 漫畫風格描邊 ---
  let outlineOffset = 2;
  tint(0);
  for (let i = -1; i <= 1; i++) {
    for (let j = -1; j <= 1; j++) {
      if (i === 0 && j === 0) continue;
      image(spriteSheet5, i * outlineOffset, j * outlineOffset, frameWidth5 * scaleFactor5, sHeight5 * scaleFactor5, sx5, 0, frameWidth5, sHeight5);
    }
  }
  noTint();

  image(
    spriteSheet5,
    0, 0,
    frameWidth5 * scaleFactor5, sHeight5 * scaleFactor5,
    sx5, 0,
    frameWidth5, sHeight5
  );
  pop();
}

function handleInteraction() {
  // 如果所有提問者都問完了，就直接返回
  if (currentQuestionerIndex >= questionerOrder.length) {
    return;
  }

  const activeQuestioner = questionerOrder[currentQuestionerIndex];
  let dist, targetNPCX, targetNPCY, targetNPCHeight;

  // 根據當前活躍的提問者設定目標變數
  if (activeQuestioner === 2) {
    dist = abs(charX - char2X);
    targetNPCX = char2X;
    targetNPCY = char2Y;
    targetNPCHeight = spriteSheet2.height * scaleFactor2;
  } else if (activeQuestioner === 3) {
    dist = abs(charX - char3X);
    targetNPCX = char3X;
    targetNPCY = char3Y;
    targetNPCHeight = 77 * scaleFactor3;
  } else if (activeQuestioner === 4) {
    dist = abs(charX - char4X);
    targetNPCX = char4X;
    targetNPCY = char4Y;
    targetNPCHeight = 81 * scaleFactor4;
  }

  let proximityThreshold = 150;
  const isPlayer1Near = dist < proximityThreshold;

  if (isPlayer1Near) {
    bubbleScale = lerp(bubbleScale, 1, 0.2);
  } else {
    bubbleScale = lerp(bubbleScale, 0, 0.2);
  }

  if (isPlayer1Near) {
    if (dialogueState === 'idle') {
        dialogueState = 'asking';
        
        // 根據互動對象選擇題庫
        let targetBank = questionBank;
        if (activeQuestioner === 3) targetBank = questionBank3;
        else if (activeQuestioner === 4) targetBank = questionBank4;

        // 篩選出尚未問過的問題
        let unusedRows = targetBank.findRows('no', 'used');
        if (unusedRows.length > 0) {
            currentQuestion = random(unusedRows);
            currentQuestion.setString('used', 'yes'); // 標記為已使用
        } else {
            let randomIndex = floor(random(targetBank.getRowCount()));
            currentQuestion = targetBank.getRow(randomIndex);
        }
        npcDialogue = currentQuestion.getString('題目');
        consecutiveWrongAnswers = 0; // 新問題，重置計數器
        questionStartTime = millis(); // 開始計時

        // 重置選項按鈕樣式
        for (let btn of optionButtons) {
            btn.removeAttribute('disabled');
            btn.style('background-color', '#fff');
            btn.style('border-color', '#3f6212');
            btn.style('color', '#3f6212');
            btn.style('transform', 'scale(1)');
        }
    }

    if (npcDialogue) {
      if (npcDialogue !== lastNpcDialogue) {
        displayedNpcDialogue = '';
        lastNpcDialogue = npcDialogue;
      }
      if (displayedNpcDialogue.length < npcDialogue.length) {
        if (frameCount % typewriterSpeed === 0) {
          displayedNpcDialogue = npcDialogue.substring(0, displayedNpcDialogue.length + 1);
        }
      }

      let bubbleY = targetNPCY - (targetNPCHeight / 2) - 60;
      displayDialogueBubble(targetNPCX, bubbleY, displayedNpcDialogue);

      if (dialogueState === 'feedback_wrong') {
        drawResultPanel(targetNPCX, bubbleY - 110, false); // 繪製錯誤面板背景 (上移以避免遮擋對話)
        retryButton.position(targetNPCX - retryButton.width / 2, bubbleY - 110);
        retryButton.show();
      } else if (dialogueState === 'feedback_correct') {
        drawResultPanel(targetNPCX, bubbleY - 110, true); // 繪製正確面板背景 (上移以避免遮擋對話)
        nextButton.position(targetNPCX - nextButton.width / 2, bubbleY - 110);
        nextButton.show();
      }
    }

    if (displayedNpcDialogue.length >= npcDialogue.length) {
      // 只有在「詢問中」的狀態才顯示玩家的選項按鈕
      if (dialogueState === 'asking') {
        let sHeight = spriteSheet.height;
        let char1DisplayedHeight = sHeight * scaleFactor;

        // --- 倒數計時條 (新增) ---
        let elapsedTime = (millis() - questionStartTime) / 1000;
        let remainingTime = QUESTION_TIME_LIMIT - elapsedTime;

        if (remainingTime <= 0) {
          checkAnswer(null, true); // 觸發超時
        } else {
          let barW = 200;
          let barH = 12;
          let barX = charX - 100; // 與選項按鈕對齊
          let barY = charY - char1DisplayedHeight - 180 - 25; // 位於選項上方

          push();
          rectMode(CORNER);
          // 背景
          fill(255, 200);
          stroke(0);
          strokeWeight(2);
          rect(barX, barY, barW, barH, 6);

          // 進度條顏色與長度
          let progress = map(remainingTime, 0, QUESTION_TIME_LIMIT, 0, barW);
          
          if (timeStopTimer > 0) {
            fill('#3b82f6'); // 時間暫停時顯示藍色
          } else {
            if (remainingTime > QUESTION_TIME_LIMIT * 0.5) fill('#4ade80'); // 綠色
            else if (remainingTime > QUESTION_TIME_LIMIT * 0.25) fill('#facc15'); // 黃色
            else fill('#ef4444'); // 紅色
          }
          
          noStroke();
          rect(barX + 2, barY + 2, max(0, progress - 4), barH - 4, 4);

          // 剩餘秒數文字
          fill(0);
          noStroke();
          textSize(14);
          textAlign(RIGHT, BOTTOM);
          textStyle(BOLD);
          if (timeStopTimer > 0) {
             text("⏸ " + ceil(remainingTime), barX + barW, barY - 5);
          } else {
             text("⏱ " + ceil(remainingTime), barX + barW, barY - 5);
          }
          pop();
        }

        // --- 顯示選項按鈕 ---
        // 取得當前題目的選項
        let opts = [
            currentQuestion.getString('選項1'),
            currentQuestion.getString('選項2'),
            currentQuestion.getString('選項3')
        ];

        // 選項顯示在角色1的正上方
        let startX = charX - 100;
        let startY = charY - char1DisplayedHeight - 180;

        for (let i = 0; i < 3; i++) {
            let btn = optionButtons[i];
            btn.html(opts[i]); // 設定按鈕文字
            // 設定按鈕位置 (垂直排列)
            btn.position(startX, startY + i * 60); 
            btn.show();
        }
        
        // 隱藏舊的輸入框
        char1Input.hide();
        submitButton.hide();
      } else {
        // 其他狀態隱藏
        char1Input.hide();
        submitButton.hide();
        for (let btn of optionButtons) {
            btn.hide();
        }
      }
    } else {
      char1Input.hide();
      submitButton.hide();
      for (let btn of optionButtons) {
        btn.hide();
      }
    }
  } else {
    char1Input.hide();
    submitButton.hide();
    for (let btn of optionButtons) {
        btn.hide();
    }
    if (dialogueState !== 'idle') {
      dialogueState = 'idle';
      currentQuestion = null;
      npcDialogue = '';
      lastNpcDialogue = '';
      displayedNpcDialogue = '';
      retryButton.hide();
      nextButton.hide();
    }
  }
}

// --- 繪製結果面板背景 (新增) ---
function drawResultPanel(x, y, isCorrect) {
  push();
  translate(x, y + 20); // 移動到按鈕中心附近
  rectMode(CENTER);
  
  if (isCorrect) {
    // --- 答對：動漫風放射線與亮麗框 ---
    
    // 1. 背景旋轉光芒 (Sunburst)
    push();
    rotate(frameCount * 0.03); // 緩慢旋轉
    noStroke();
    fill(255, 215, 0, 100); // 半透明金色
    for (let i = 0; i < 8; i++) {
      rotate(TWO_PI / 8);
      rect(0, -55, 15, 50, 5); // 光束
    }
    pop();

    // 2. 主面板 (帶有漫畫陰影)
    fill(0, 80); // 黑色半透明陰影
    noStroke();
    rect(5, 5, 210, 75, 15);
    
    fill('#dcfce7'); // 淺綠底
    stroke('#15803d'); // 深綠框
    strokeWeight(4);
    rect(0, 0, 210, 75, 15);

    // 3. 裝飾圖示 (左側打勾)
    noFill();
    stroke('#15803d');
    strokeWeight(6);
    beginShape();
    vertex(-85, -5);
    vertex(-75, 10);
    vertex(-60, -15);
    endShape();

    // 4. 閃亮星星
    noStroke();
    fill('#fbbf24');
    circle(90, -25, 12);
    circle(100, 20, 8);

  } else {
    // --- 答錯：動漫風衝擊與鋸齒框 ---
    
    // 1. 鋸齒狀爆炸背景 (Impact Shape)
    fill('#fee2e2'); // 淺紅底
    stroke('#b91c1c'); // 深紅框
    strokeWeight(3);
    
    beginShape();
    for (let a = 0; a < TWO_PI; a += 0.3) {
      // 產生不規則鋸齒，並隨時間微微抖動
      let offset = map(noise(a * 5, frameCount * 0.2), 0, 1, -8, 8);
      // 讓形狀稍微寬一點以包覆按鈕
      let xOff = cos(a) * (115 + offset);
      let yOff = sin(a) * (45 + offset);
      vertex(xOff, yOff);
    }
    endShape(CLOSE);

    // 2. 左側大叉叉
    stroke('#b91c1c');
    strokeWeight(6);
    line(-85, -10, -65, 10);
    line(-65, -10, -85, 10);

    // 3. 動漫汗滴 (右側)
    noStroke();
    fill('#60a5fa'); // 藍色汗滴
    push();
    translate(85, -25);
    rotate(0.2);
    ellipse(0, 0, 8, 14);
    pop();
    push();
    translate(100, -15);
    rotate(0.4);
    ellipse(0, 0, 6, 10);
    pop();
  }
  
  pop();
}

function drawStartScreen() {
  // 繪製背景圖
  image(bgImg, width / 2, height / 2, width, height);

}

function drawIntroScreen() {
  // 繪製背景圖
  image(bgImg, width / 2, height / 2, width, height);

  // --- 遊戲簡介面板 ---
  push();
  rectMode(CORNER);
  fill(0, 80);
  noStroke();
  rect(0, 0, width, height);

  // --- 漫畫風格面板 ---
  translate(width / 2, height / 2 - 30); // 稍微往上移
  // rotate(-0.02); // 移除傾斜

  let panelW = 680;
  let panelH = 420;

  // 2. 陰影 (黑色實心偏移 - Pop Art 風格)
  fill(0);
  noStroke();
  rectMode(CENTER);
  rect(12, 12, panelW, panelH, 15);

  // 3. 主面板 (白色底 + 粗黑框)
  fill(224, 242, 254, 240); // 改為淡藍色底 (RGB: 224, 242, 254)，呼應背景色調
  stroke(0);
  strokeWeight(4);
  rect(0, 0, panelW, panelH, 15);

  // 4. 網點裝飾 (Halftone Dots) - 僅在角落繪製
  noStroke();
  fill(0, 15); // 極淡的黑色
  let dotSize = 6;
  let spacing = 15;
  // 左上角網點
  for(let x = -panelW/2 + 20; x < -panelW/2 + 150; x += spacing) {
    for(let y = -panelH/2 + 20; y < -panelH/2 + 150; y += spacing) {
       if ((x+y)%2 === 0) circle(x, y, dotSize);
    }
  }
  // 右下角網點
  for(let x = panelW/2 - 150; x < panelW/2 - 20; x += spacing) {
    for(let y = panelH/2 - 150; y < panelH/2 - 20; y += spacing) {
       if ((x+y)%2 === 0) circle(x, y, dotSize);
    }
  }

  // 5. 標題背景 (圓潤標題框)
  push();
  translate(0, -panelH/2 + 45);
  
  // 標題框陰影
  drawingContext.shadowOffsetX = 2;
  drawingContext.shadowOffsetY = 4;
  drawingContext.shadowBlur = 10;
  drawingContext.shadowColor = 'rgba(0,0,0,0.1)';
  
  fill('#facc15'); // 動漫黃
  stroke(0);
  strokeWeight(3);
  rectMode(CENTER);
  rect(0, 0, 280, 55, 27); // 膠囊形狀
  
  drawingContext.shadowBlur = 0; // 重置文字陰影

  // 6. 標題文字
  textAlign(CENTER, CENTER);
  fill(0);
  noStroke();
  textSize(32);
  textFont('sans-serif');
  textStyle(BOLD);
  text("遊戲說明", 0, 0);
  pop();

  // 7. 說明文字區域 (動漫風格對話框)
  let tx = -panelW/2 + 50;
  let ty = -panelH/2 + 90;
  let tw = panelW - 100;
  let th = panelH - 130;

  push();
  rectMode(CORNER);
  
  // 背景：半透明科技白
  fill(255, 255, 255, 180);
  stroke('#60a5fa'); // 亮藍色邊框
  strokeWeight(2);
  rect(tx, ty, tw, th, 10);
  
  // 裝飾：內部虛線框
  drawingContext.setLineDash([6, 6]); // 設定虛線
  stroke('#93c5fd');
  strokeWeight(2);
  noFill();
  rect(tx + 6, ty + 6, tw - 12, th - 12, 6);
  drawingContext.setLineDash([]); // 恢復實線

  // 繪製文字
  textAlign(LEFT, TOP);
  rectMode(CORNER); 
  fill('#1e293b'); // 深灰藍色，比純黑更有質感
  noStroke();
  textSize(18);
  textLeading(30);
  textFont('sans-serif'); 
  textStyle(BOLD);
  
  // 文字內縮
  text(introDisplayedText, tx + 25, ty + 25, tw - 50, th - 50);
  
  pop();

  // 8. 裝飾線條 (Action Lines)
  stroke(0);
  strokeWeight(3);
  // 左上角線條
  line(-panelW/2 - 20, -panelH/2 + 40, -panelW/2 + 10, -panelH/2 + 40);
  line(-panelW/2 - 20, -panelH/2 + 50, -panelW/2 + 5, -panelH/2 + 50);
  // 右上角線條
  line(panelW/2 + 20, -panelH/2 + 40, panelW/2 - 10, -panelH/2 + 40);
  line(panelW/2 + 20, -panelH/2 + 50, panelW/2 - 5, -panelH/2 + 50);
  
  // 打字機效果更新邏輯
  if (introDisplayedText.length < introFullText.length) {
    // 如果正在快轉，每幀增加 5 個字；否則每 2 幀增加 1 個字
    let charsToAdd = isFastForwarding ? 5 : (frameCount % 2 === 0 ? 1 : 0);
    if (charsToAdd > 0) {
      introDisplayedText = introFullText.substring(0, introDisplayedText.length + charsToAdd);
    }
  }
}

function displayGameClear() {
  push();
  
  // 1. 背景：動態放射光芒 (Sunburst)
  // 深藍色漸層背景
  let gradient = drawingContext.createRadialGradient(width / 2, height / 2, 0, width / 2, height / 2, max(width, height));
  gradient.addColorStop(0, 'rgba(0, 30, 60, 0.9)'); 
  gradient.addColorStop(1, 'rgba(0, 0, 0, 0.95)'); 
  drawingContext.fillStyle = gradient;
  rectMode(CORNER);
  rect(0, 0, width, height);

  // 旋轉光芒
  push();
  translate(width / 2, height / 2);
  rotate(frameCount * 0.005); // 緩慢旋轉
  noStroke();
  fill(255, 255, 255, 20); // 淡淡的白光
  for (let i = 0; i < 12; i++) {
    rotate(TWO_PI / 12);
    triangle(0, 0, -60, max(width, height), 60, max(width, height));
  }
  pop();

  // 2. 彩帶特效 (Confetti)
  if (frameCount % 10 === 0) { 
    let startX = random(width);
    let startY = height;
    for (let i = 0; i < 15; i++) {
      let c = new Confetti(startX, startY);
      c.vy = random(-15, -8); // 往上噴發
      clearConfetti.push(c);
    }
  }
  for (let i = clearConfetti.length - 1; i >= 0; i--) {
    let p = clearConfetti[i];
    p.update(0); 
    p.display();
    if (p.isDead()) {
      clearConfetti.splice(i, 1);
    }
  }

  // 3. 通關面板 (Card Style)
  rectMode(CENTER);
  let panelW = 500;
  let panelH = 420;
  
  // 面板陰影
  fill(0, 150);
  noStroke();
  rect(width / 2 + 15, height / 2 + 15, panelW, panelH, 25);
  
  // 面板本體
  fill(255, 252, 240); // 米白色
  stroke('#facc15'); // 金色邊框
  strokeWeight(8);
  rect(width / 2, height / 2, panelW, panelH, 25);
  
  // 內部裝飾框
  noFill();
  stroke('#facc15');
  strokeWeight(2);
  drawingContext.setLineDash([10, 10]); // 虛線
  rect(width / 2, height / 2, panelW - 30, panelH - 30, 15);
  drawingContext.setLineDash([]); // 恢復實線

  // 4. 標題文字
  let floatY = sin(frameCount * 0.05) * 10;
  textAlign(CENTER, CENTER);
  textSize(56);
  textStyle(BOLD);
  textFont('"ZCOOL KuaiLe", "Comic Sans MS", "Chalkboard SE", "Arial Rounded MT Bold", "圓體-繁", "Microsoft JhengHei UI", sans-serif');
  
  // 標題陰影
  fill(0, 50);
  noStroke();
  text('✨ 恭喜通關 ✨', width / 2 + 4, height / 2 - 140 + floatY + 4);
  
  // 標題本體
  fill('#ea580c'); // 橘紅色
  stroke(255);
  strokeWeight(4);
  text('✨ 恭喜通關 ✨', width / 2, height / 2 - 140 + floatY);

  // 5. 統計數據
  textSize(28);
  textStyle(BOLD);
  textFont('sans-serif');
  noStroke();
  
  let startY = height / 2 - 30;
  let gap = 50;
  
  // 左側標籤
  textAlign(RIGHT, CENTER);
  fill('#64748b'); // 灰藍色
  text("⏱️ 遊玩時間 :", width / 2 - 20, startY);
  text("💎 最終分數 :", width / 2 - 20, startY + gap);
  text("🔥 最大連擊 :", width / 2 - 20, startY + gap * 2);
  
  // 右側數值
  textAlign(LEFT, CENTER);
  fill('#0f172a'); // 深色
  text(finalPlayTimeStr, width / 2 + 20, startY);
  text(score, width / 2 + 20, startY + gap);
  text(maxCombo, width / 2 + 20, startY + gap * 2);

  // 6. 評級印章 (Rank Stamp)
  let rank = 'S';
  let rankColor = '#facc15'; // Gold
  if (score < 500) { rank = 'B'; rankColor = '#94a3b8'; }
  else if (score < 1000) { rank = 'A'; rankColor = '#c084fc'; }
  
  push();
  translate(width / 2 + 180, height / 2 - 150);
  rotate(0.4); // 傾斜
  
  // 印章圓圈
  noFill();
  stroke(rankColor);
  strokeWeight(5);
  circle(0, 0, 80);
  
  // 印章文字
  textAlign(CENTER, CENTER);
  fill(rankColor);
  noStroke();
  textSize(60);
  textStyle(BOLD);
  text(rank, 0, 5);
  
  textSize(16);
  text("RANK", 0, 55);
  pop();

  pop();

  // 隱藏不必要的復活按鈕 (通關不需要復活)
  reviveGemButton.hide();
  reviveAdButton.hide();

  // 設定並顯示重新開始按鈕 (放在面板下方)
  restartButton.position(width / 2 - 100, height / 2 + 120);
  restartButton.show();
}

// --- 顯示遊戲結束畫面 (新增) ---
function displayGameOver() {
  push();
  
  // 1. 背景：深紅黑漸層 (Radial Gradient)
  let gradient = drawingContext.createRadialGradient(width / 2, height / 2, 0, width / 2, height / 2, max(width, height));
  gradient.addColorStop(0, 'rgba(60, 0, 0, 0.95)'); 
  gradient.addColorStop(1, 'rgba(0, 0, 0, 1)'); 
  drawingContext.fillStyle = gradient;
  rectMode(CORNER);
  rect(0, 0, width, height);

  // 2. 背景動態：飄落的灰燼 (使用 Confetti 類別但改顏色)
  if (frameCount % 5 === 0) {
    let ash = new Confetti(random(width), -10);
    ash.color = color(150, 150, 150); // 灰色
    ash.vy = random(2, 5); // 往下掉
    ash.gravity = 0.05;
    clearConfetti.push(ash);
  }
  
  for (let i = clearConfetti.length - 1; i >= 0; i--) {
    let p = clearConfetti[i];
    p.update(0); // 不隨地圖捲動
    p.display();
    if (p.isDead() || p.y > height) {
      clearConfetti.splice(i, 1);
    }
  }

  // 3. 失敗面板 (Card Style)
  rectMode(CENTER);
  let panelW = 500;
  let panelH = 420;
  
  // 面板陰影
  fill(0, 200);
  noStroke();
  rect(width / 2 + 15, height / 2 + 15, panelW, panelH, 25);
  
  // 面板本體
  fill(30, 30, 30); // 深灰色底
  stroke('#b91c1c'); // 深紅色邊框
  strokeWeight(8);
  rect(width / 2, height / 2, panelW, panelH, 25);
  
  // 內部裝飾框
  noFill();
  stroke('#b91c1c');
  strokeWeight(2);
  drawingContext.setLineDash([10, 10]); // 虛線
  rect(width / 2, height / 2, panelW - 30, panelH - 30, 15);
  drawingContext.setLineDash([]); // 恢復實線

  // 4. 標題文字
  let floatY = sin(frameCount * 0.05) * 5;
  textAlign(CENTER, CENTER);
  textSize(64); // 字體加大
  textStyle(BOLD);
  textFont('"ZCOOL KuaiLe", "Comic Sans MS", "Chalkboard SE", "Arial Rounded MT Bold", "圓體-繁", "Microsoft JhengHei UI", sans-serif');
  
  // 標題陰影
  fill(0, 150);
  noStroke();
  text('💔 闖關失敗 💔', width / 2 + 4, height / 2 - 140 + floatY + 4);
  
  // 標題本體
  fill('#ef4444'); // 亮紅色
  stroke(255);
  strokeWeight(4);
  text('💔 闖關失敗 💔', width / 2, height / 2 - 140 + floatY);

  // 5. 統計數據
  textSize(28);
  textStyle(BOLD);
  textFont('sans-serif');
  noStroke();
  
  let startY = height / 2 - 30;
  let gap = 50;
  
  // 左側標籤
  textAlign(RIGHT, CENTER);
  fill('#94a3b8'); // 淺灰色
  text("⏱️ 遊玩時間 :", width / 2 - 20, startY);
  text("💎 最終分數 :", width / 2 - 20, startY + gap);
  text("💀 狀態 :", width / 2 - 20, startY + gap * 2);
  
  // 右側數值
  textAlign(LEFT, CENTER);
  fill('#f8fafc'); // 亮白色
  text(finalPlayTimeStr, width / 2 + 20, startY);
  text(score, width / 2 + 20, startY + gap);
  text("體力耗盡", width / 2 + 20, startY + gap * 2);

  // 6. 失敗印章
  push();
  translate(width / 2 + 180, height / 2 - 150);
  rotate(0.4); 
  
  noFill();
  stroke('#ef4444');
  strokeWeight(5);
  circle(0, 0, 80);
  
  textAlign(CENTER, CENTER);
  fill('#ef4444');
  noStroke();
  textSize(36);
  textStyle(BOLD);
  text("FAILED", 0, 0);
  pop();

  pop();

  // 顯示按鈕
  // 重新開始按鈕放在面板內下方
  restartButton.position(width / 2 - 100, height / 2 + 120);
  restartButton.show();
  
  // 復活按鈕放在面板下方
  reviveGemButton.position(width / 2 - 210, height / 2 + 240);
  reviveAdButton.position(width / 2 + 10, height / 2 + 240);
  reviveGemButton.show();
  reviveAdButton.show();
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  
  // 如果在開始畫面，重新定位按鈕
  if (gameState === 'start' && startButton) {
    startButton.position(width / 2 - 100, height * 0.75);
  }

  if (gameState === 'intro' && introButton) {
    introButton.position(width / 2 - 100, height * 0.75);
  }

  if (gameState === 'intro' && skipButton) {
    skipButton.position(width - 140, 30);
  }
  
  if ((gameState === 'cleared' || gameState === 'gameover') && restartButton) {
    restartButton.position(width / 2 - 100, height * 0.85);
  }
  
  if (gameState === 'gameover' && reviveGemButton && reviveAdButton) {
    reviveGemButton.position(width / 2 - 210, height / 2 + 240);
    reviveAdButton.position(width / 2 + 10, height / 2 + 240);
  }
  
  if (isShopping) {
    // 更新商店按鈕位置
    updateShopButtonPositions();
  }

  if (isPaused && resumeButton) {
    let startY = height * 0.3;
    let gap = 90;
    resumeButton.position(width / 2 - 100, startY);
    pauseShopButton.position(width / 2 - 100, startY + gap);
    pauseQuitButton.position(width / 2 - 100, startY + gap * 2);
    pauseRestartButton.position(width / 2 - 100, startY + gap * 3);
  }
  
  // 更新遊戲按鈕位置
  if (pauseBtn) pauseBtn.position(width - 60, 20);
  if (leftBtn) leftBtn.position(20, height - 80);
  if (rightBtn) rightBtn.position(90, height - 80);
  if (jumpBtn) jumpBtn.position(width - 80, height - 80);
}

// --- 按鈕點擊特效函式 ---
function addClickEffect(btn, normalShadow, hoverShadow, originalRadius) {
  btn.elt.addEventListener('mouseenter', () => {
    if (hoverShadow) btn.style('box-shadow', hoverShadow);
    btn.style('color', '#3f6212'); // 懸停時文字變色
    btn.style('transform', 'scale(1.05) rotate(2deg)'); // 懸停時旋轉並放大
    btn.style('border-color', '#4d7c0f'); // 懸停時邊框變亮綠
    btn.style('border-radius', '50px'); // 懸停時變得更圓
    btn.style('background-color', '#fef9c3'); // 懸停時背景變淺黃
  });
  btn.elt.addEventListener('mousedown', () => {
    btn.style('transform', 'scale(0.95) rotate(2deg)'); // 按下時保持旋轉並縮小
    btn.style('background-color', '#fef08a'); // 按下時變更深黃
    btn.style('box-shadow', '0 0 15px #ffffff'); // 按下時發出白色的光芒
  });
  btn.elt.addEventListener('mouseup', () => {
    btn.style('transform', 'scale(1.05) rotate(2deg)'); // 放開時恢復懸停大小
    btn.style('background-color', '#fef9c3'); // 放開時變回懸停的淺黃色
    if (hoverShadow) btn.style('box-shadow', hoverShadow); // 放開時恢復懸停陰影
  });
  btn.elt.addEventListener('mouseleave', () => {
    btn.style('transform', 'scale(1) rotate(0deg)'); // 離開時復原
    btn.style('background-color', '#fefce8');
    if (normalShadow) btn.style('box-shadow', normalShadow);
    btn.style('color', '#3f6212'); // 恢復文字顏色
    btn.style('border-color', '#3f6212'); // 恢復邊框顏色
    btn.style('border-radius', originalRadius); // 恢復原本圓角
  });
  btn.elt.addEventListener('touchstart', () => {
    btn.style('transform', 'scale(0.95)');
    btn.style('background-color', '#fef08a');
    btn.style('box-shadow', '0 0 15px #ffffff');
  });
  btn.elt.addEventListener('touchend', () => {
    btn.style('transform', 'scale(1)');
    btn.style('background-color', '#fefce8');
    if (normalShadow) btn.style('box-shadow', normalShadow);
  });
}

function removeSpriteBackground(sheet) {
  sheet.loadPixels();
  if (sheet.pixels.length > 0) {
    let bgR = sheet.pixels[0];
    let bgG = sheet.pixels[1];
    let bgB = sheet.pixels[2];
    for (let i = 0; i < sheet.pixels.length; i += 4) {
      if (sheet.pixels[i] === bgR && sheet.pixels[i+1] === bgG && sheet.pixels[i+2] === bgB) {
        sheet.pixels[i + 3] = 0;
      }
    }
  }
  sheet.updatePixels();
}

function submitAnswer() {
  if (dialogueState === 'asking') {
    const userAnswer = char1Input.value().trim();
    checkAnswer(userAnswer);
  }
}

function checkAnswer(userAnswer, isTimeout = false) {
  if (!currentQuestion) return;

  const correctAnswer = currentQuestion.getString('答案');
  
  // 處理按鈕變色與停用
  for (let btn of optionButtons) {
    btn.attribute('disabled', ''); // 停用所有按鈕防止重複點擊
    if (btn.html() === userAnswer) {
        if (userAnswer === correctAnswer) {
            btn.style('background-color', '#4ade80'); // 答對變綠色
            btn.style('border-color', '#16a34a');
            btn.style('color', '#ffffff');
        } else {
            btn.style('background-color', '#f87171'); // 答錯變紅色
            btn.style('border-color', '#dc2626');
            btn.style('color', '#ffffff');
        }
    }
  }

  if (!isTimeout && userAnswer === correctAnswer) {
    // --- 計算分數與速度獎勵 ---
    combo++; // 累加連擊
    if (combo > maxCombo) maxCombo = combo;
    let timeTaken = (millis() - questionStartTime) / 1000; // 換算成秒
    let speedBonus = 0;
    if (timeTaken < 5) {
        speedBonus = 10; // 極速獎勵
    } else if (timeTaken < 15) {
        speedBonus = floor(map(timeTaken, 5, 15, 10, 0)); // 隨時間遞減
    }
    let comboBonus = (combo - 1) * 5; // 連擊加分
    let totalPoints = 20 + speedBonus + comboBonus;
    score += totalPoints;

    totalCorrectAnswers++; // 累計答對題數
    char1HP += 20;
    if (char1HP > char1MaxHP) {
      char1HP = char1MaxHP;
    }
    npcDialogue = currentQuestion.getString('答對回饋') + ` (HP+20, +${totalPoints}分)`;
    dialogueState = 'feedback_correct';
    onomatopoeias.push(new Onomatopoeia(charX, charY - 150, "CORRECT!", color(0, 255, 150)));
    
    // 答對時產生彩帶噴發特效
    for (let i = 0; i < 60; i++) {
      confettiParticles.push(new Confetti(charX, charY - 80));
    }
    // 產生浮動數值
    floatingTexts.push(new FloatingText(charX, charY - 100, "+20 HP", '#4ade80'));
    floatingTexts.push(new FloatingText(charX, charY - 140, `+${totalPoints}`, '#facc15')); // 顯示分數浮動文字
    
    // 顯示連擊浮動文字
    if (combo > 1) {
       floatingTexts.push(new FloatingText(charX, charY - 180, `COMBO x${combo}!`, '#f59e0b'));
       // 高連擊時額外噴發彩帶
       if (combo >= 3) {
         for (let i = 0; i < 20; i++) confettiParticles.push(new Confetti(charX, charY - 100));
       }
    }

    showChar5Hint = false; // 答對時，隱藏提示者
    consecutiveWrongAnswers = 0; // 答對，重置連續答錯計數器
    questionsAnsweredForCurrent++; // 為當前角色增加答對題數
  } else {
    combo = 0; // 答錯重置連擊
    screenShakeAmount = 10; // 答錯時螢幕震動，增加打擊感
    
    if (isTimeout) {
      npcDialogue = "時間到！" + currentQuestion.getString('答錯回饋');
      onomatopoeias.push(new Onomatopoeia(charX, charY - 150, "TIME'S UP!", color(255, 80, 80)));
    } else {
      npcDialogue = currentQuestion.getString('答錯回饋');
      onomatopoeias.push(new Onomatopoeia(charX, charY - 150, "WRONG!", color(255, 80, 80)));
    }
    
    dialogueState = 'feedback_wrong';
    char1HP -= 25;
    if (char1HP < 0) {
      char1HP = 0;
    }
    consecutiveWrongAnswers++; // 答錯，累加計數器
    
    // 產生浮動數值與震動
    floatingTexts.push(new FloatingText(charX, charY - 100, "-25", '#f87171'));
    hpBarShakeTimer = 20; // 震動 20 幀

    // 觸發角色5出現並給予提示
    if (!showChar5Hint) char5AnimScale = 0; // 如果原本沒顯示，重置動畫從 0 開始
    showChar5Hint = true;
    char5HintTimer = 300; // 提示顯示5秒

    // 決定角色5出現的位置 (在玩家的另一側)
    let questionerX = 0;
    const activeQuestioner = questionerOrder[currentQuestionerIndex];
    if (activeQuestioner === 2) questionerX = char2X;
    else if (activeQuestioner === 3) questionerX = char3X;
    else if (activeQuestioner === 4) questionerX = char4X;
    // 改為固定出現在角色1左邊，避免擋住右邊的提問者
    char5X = charX - 150;
    char5Y = charY;
  }
  char1Input.value('');
}

function retryQuestion() {
  dialogueState = 'asking';
  npcDialogue = currentQuestion.getString('題目');
  retryButton.hide();
  questionStartTime = millis(); // 重試時重新計時
  
  // 重置選項按鈕樣式 (再作答一次時)
  for (let btn of optionButtons) {
    btn.removeAttribute('disabled');
    btn.style('background-color', '#fff');
    btn.style('border-color', '#3f6212');
    btn.style('color', '#3f6212');
    btn.style('transform', 'scale(1)');
  }
}

function nextQuestion() {
  // 檢查當前提問者是否已問完兩題
  if (questionsAnsweredForCurrent >= questionsPerQuestioner) {
    currentQuestionerIndex++; // 切換到下一個提問者
    questionsAnsweredForCurrent = 0; // 重置計數

    // 檢查是否所有提問者都已結束
    if (currentQuestionerIndex >= questionerOrder.length) {
      gameState = 'cleared'; // 觸發通關
      calculatePlayTime(); // 計算遊玩時間
      // 隱藏所有UI
      char1Input.hide();
      retryButton.hide();
      nextButton.hide();
      npcDialogue = '';
      submitButton.hide();
      for (let btn of optionButtons) {
        btn.hide();
      }
      pauseBtn.hide();
      leftBtn.hide();
      rightBtn.hide();
      jumpBtn.hide();
      return; // 結束函式
    }
    
    // 準備下一個提問者的進場動畫
    gameState = 'transition';
    const nextQuestioner = questionerOrder[currentQuestionerIndex];
    // 將下一個角色放置在畫面右側外
    if (nextQuestioner === 2) {
        char2X = width + 150; 
    } else if (nextQuestioner === 3) {
        char3X = width + 150;
    } else if (nextQuestioner === 4) {
        char4X = width + 150;
    }
  }

  dialogueState = 'idle';
  currentQuestion = null;
  npcDialogue = '';
  lastNpcDialogue = '';
  nextButton.hide();
}

function drawHPBar() {
  push();
  rectMode(CORNER); 

  // --- 血量條震動特效 (新增) ---
  if (hpBarShakeTimer > 0) {
    let shakeX = random(-5, 5);
    let shakeY = random(-5, 5);
    translate(shakeX, shakeY);
    hpBarShakeTimer--;
  }
  
  // --- 頭像設定 ---
  let avatarX = 45;
  let avatarY = 45;
  let avatarSize = 60;
  
  // --- 血量條設定 ---
  let barWidth = 220;
  let barHeight = 28;
  let barX = 90; // 往右移，留空間給頭像
  let barY = 32; // 稍微調整垂直位置以對齊頭像中心

  // 1. 繪製頭像背景 (白色圓形 + 陰影)
  fill(0, 50); // 陰影
  noStroke();
  circle(avatarX + 4, avatarY + 4, avatarSize);
  
  fill(255);
  stroke(0);
  strokeWeight(3);
  circle(avatarX, avatarY, avatarSize);

  // 2. 繪製角色頭像 (裁切第一格)
  if (spriteSheet) {
    let frameW = spriteSheet.width / walkFrames;
    let frameH = spriteSheet.height;
    
    // 計算縮放比例以適應圓形
    let aspect = frameW / frameH;
    let drawH = avatarSize * 0.7; // 縮小一點留白
    let drawW = drawH * aspect;
    
    imageMode(CENTER);
    // 繪製角色 (取第一格靜止動作)
    image(spriteSheet, avatarX, avatarY + 5, drawW, drawH, 0, 0, frameW, frameH);
  }
  
  // 3. 頭像邊框 (再次繪製以確保邊緣清晰)
  noFill();
  stroke(0);
  strokeWeight(3);
  circle(avatarX, avatarY, avatarSize);

  // --- 繪製血量條 ---
  rectMode(CORNER);
  
  // 血量條背景 (深灰)
  fill(50);
  noStroke();
  rect(barX, barY, barWidth, barHeight, 14); // 圓角

  // 當前血量
  let currentHPWidth = map(char1HP, 0, char1MaxHP, 0, barWidth);
  currentHPWidth = max(0, currentHPWidth); // 確保不為負
  
  if (char1HP > char1MaxHP * 0.5) {
    fill('#4ade80'); // 綠
  } else if (char1HP > char1MaxHP * 0.25) {
    fill('#facc15'); // 黃
  } else {
    fill('#f87171'); // 紅
  }
  rect(barX, barY, currentHPWidth, barHeight, 14);

  // 血量條高光 (增加立體感)
  fill(255, 50);
  rect(barX, barY, barWidth, barHeight / 2, 14);

  // 血量條邊框
  noFill();
  stroke(0);
  strokeWeight(3);
  rect(barX, barY, barWidth, barHeight, 14);
  
  // 裝飾：HP 文字與數值
  fill(255);
  noStroke();
  textSize(16);
  textStyle(BOLD);
  textAlign(LEFT, CENTER);
  text("HP", barX + 12, barY + barHeight/2 + 1);
  
  textAlign(RIGHT, CENTER);
  text(char1HP + "/" + char1MaxHP, barX + barWidth - 12, barY + barHeight/2 + 1);

  pop();
}

// --- 繪製分數 UI (新增) ---
function drawScore() {
  push();
  textAlign(RIGHT, TOP);
  textSize(24);
  stroke(0);
  strokeWeight(4);
  textStyle(BOLD);
  textFont('sans-serif');
  
  fill('#3b82f6'); // 藍色
  text(`💎 ${gemCount}`, width - 20, 80); // 顯示寶石數量

  fill('#facc15'); // 金黃色
  text(`SCORE: ${score}`, width - 20, 110); 

  fill('#4ade80'); // 綠色
  text(`答對: ${totalCorrectAnswers} / 6`, width - 20, 140);

  // --- 進度條顯示 ---
  rectMode(CORNER);
  let barW = 120;
  let barH = 12;
  let barX = width - 20 - barW; // 右對齊
  let barY = 175; // 往下移

  // 背景 (半透明黑)
  noStroke();
  fill(0, 100);
  rect(barX, barY, barW, barH, 6);

  // 進度 (綠色)
  // 使用 lerp 進行平滑插值，讓進度條緩慢增長
  displayedCorrectAnswers = lerp(displayedCorrectAnswers, totalCorrectAnswers, 0.1);
  let progress = map(displayedCorrectAnswers, 0, 6, 0, barW);
  
  // 動態顏色計算 (紅 -> 黃 -> 綠)
  let ratio = displayedCorrectAnswers / 6;
  let c;
  if (ratio < 0.5) {
    // 前半段：紅到黃
    c = lerpColor(color('#f87171'), color('#facc15'), map(ratio, 0, 0.5, 0, 1));
  } else {
    // 後半段：黃到綠
    c = lerpColor(color('#facc15'), color('#4ade80'), map(ratio, 0.5, 1, 0, 1));
  }
  fill(c);
  rect(barX, barY, progress, barH, 6);

  // 邊框
  stroke(0);
  strokeWeight(2);
  noFill();
  rect(barX, barY, barW, barH, 6);

  // --- 連擊顯示 (Combo UI) ---
  if (combo > 1) {
    textAlign(RIGHT, TOP);
    textSize(32);
    fill('#facc15'); // 金黃色
    stroke(0);
    strokeWeight(4);
    textStyle(BOLDITALIC);
    // 加入彈跳動畫
    let bounce = abs(sin(frameCount * 0.2)) * 5;
    text(`${combo} COMBO!`, width - 20, 200 + bounce); // 往下移
  }

  pop();
}

function displayDialogueBubble(x, y, speech, bubbleType = 'normal') {
    push();
    translate(x, y);
    scale(bubbleScale);

    textSize(20);
    textAlign(CENTER, CENTER);
    let padding = 15; 
    let boxWidth = textWidth(speech) + padding * 2;
    let boxHeight = 45;

    drawComicBubble(0, 0, boxWidth, boxHeight, bubbleType);

    fill(0);
    noStroke();
    text(speech, 0, 0);
    pop();
}

function drawComicBubble(x, y, w, h, bubbleType = 'normal') {
  push();
  rectMode(CENTER);

  let fillColor;
  // 優先判斷特殊類型
  if (bubbleType === 'reveal_answer') {
    fillColor = color('#facc15'); // 亮黃色
  } else if (bubbleType === 'hint') {
    fillColor = color('#e0e7ff'); // 淡藍色
  } else if (dialogueState === 'feedback_correct') {
    fillColor = color('#bbf7d0');
    drawingContext.shadowBlur = 15 + sin(frameCount * 0.2) * 10;
    drawingContext.shadowColor = '#4ade80';
  } else if (dialogueState === 'feedback_wrong') {
    fillColor = color('#fca5a5');
  } else {
    fillColor = color(255);
  }

  let shadowOffsetX = 6;
  let shadowOffsetY = 6;

  noStroke();
  fill(0);
  rect(x + shadowOffsetX, y + shadowOffsetY, w, h, 20);
  triangle(x - 12 + shadowOffsetX, y + h/2 - 2 + shadowOffsetY, x + 12 + shadowOffsetX, y + h/2 - 2 + shadowOffsetY, x + shadowOffsetX, y + h/2 + 18 + shadowOffsetY);

  fill(fillColor);
  stroke(0);
  strokeWeight(4);
  rect(x, y, w, h, 20);
  triangle(x - 12, y + h/2 - 2, x + 12, y + h/2 - 2, x, y + h/2 + 18);

  fill(fillColor);
  noStroke();
  rect(x, y + h/2, 24, 6);

  drawingContext.shadowBlur = 0;
  drawingContext.shadowColor = 'transparent';

  pop();
}

// --- 初始化有趣題庫函式 ---
function initQuestions() {
  // 建立一個輔助函式來產生 p5.Table
  function createTableFromData(dataArray) {
    let table = new p5.Table();
    table.addColumn('題目');
    table.addColumn('答案');
    table.addColumn('提示');
    table.addColumn('答對回饋');
    table.addColumn('答錯回饋');
    table.addColumn('選項1'); // 新增選項欄位
    table.addColumn('選項2');
    table.addColumn('選項3');
    table.addColumn('used'); // 新增：使用狀態欄位
    
    for (let item of dataArray) {
      let row = table.addRow();
      row.setString('題目', item.q);
      row.setString('答案', item.a);
      row.setString('提示', item.h);
      row.setString('答對回饋', item.c);
      row.setString('答錯回饋', item.w);
      row.setString('選項1', item.o[0]); // 寫入選項
      row.setString('選項2', item.o[1]);
      row.setString('選項3', item.o[2]);
      row.setString('used', 'no'); // 初始化為未使用
    }
    return table;
  }

  // 角色 2 的題庫 (狗狗生理冷知識)
  questionBank = createTableFromData([
    { q: "哪種狗狗以擁有藍黑色的舌頭聞名？", a: "鬆獅犬", h: "毛蓬蓬像獅子", c: "答對了！是鬆獅犬", w: "不是喔", o: ["黃金獵犬", "鬆獅犬", "哈士奇"] },
    { q: "成年的狗狗通常擁有多少顆牙齒？", a: "42 顆", h: "比人類多", c: "沒錯！42顆", w: "再猜猜看", o: ["28 顆", "32 顆", "42 顆"] },
    { q: "狗狗身體的主要散熱（汗腺）部位在哪裡？", a: "腳掌", h: "肉墊那邊", c: "正確！在腳掌", w: "不是舌頭喔(那是喘氣)", o: ["舌頭", "背部", "腳掌"] },
    { q: "世界上奔跑速度最快的狗狗品種是？", a: "靈緹", h: "賽狗常用的品種", c: "咻——！答對了", w: "不是大麥町", o: ["邊境牧羊犬", "靈緹", "大麥町"] }
  ]);

  // 角色 3 的題庫 (狗狗感官與食物)
  questionBank3 = createTableFromData([
    { q: "哪種感官是狗狗最強大的？", a: "嗅覺", h: "鼻子很靈", c: "沒錯！嗅覺超強", w: "不是視覺喔", o: ["視覺", "聽覺", "嗅覺"] },
    { q: "以下哪種食物對狗狗是劇毒？", a: "巧克力", h: "情人節常見禮物", c: "正確！絕對不能吃", w: "雞肉可以吃啦", o: ["雞肉", "巧克力", "南瓜"] },
    { q: "被稱為「雪地救援犬」的是哪種狗？", a: "聖伯納犬", h: "脖子掛小酒桶", c: "答對了！", w: "不是哈士奇", o: ["聖伯納犬", "哈士奇", "薩摩耶"] },
    { q: "柯基犬（Corgi）原本是用來做什麼的？", a: "牧牛", h: "腿短才不會被踢", c: "沒錯，是牧牛犬", w: "不是捕鼠喔", o: ["捕鼠", "牧牛", "拉雪橇"] }
  ]);

  // 角色 4 的題庫 (狗狗行為與特徵)
  questionBank4 = createTableFromData([
    { q: "狗狗搖尾巴總是代表開心嗎？", a: "不一定", h: "看搖擺方式", c: "正確，也可能警戒", w: "不完全是喔", o: ["是，絕對開心", "不一定", "代表肚子餓"] },
    { q: "大麥町犬出生時身上的斑點情況？", a: "完全雪白", h: "長大才長出來", c: "沒錯！小時候是白的", w: "不是一出生就有喔", o: ["全身斑點", "只有頭部有", "完全雪白"] },
    { q: "為什麼狗狗的鼻子通常是濕濕的？", a: "吸附氣味", h: "跟嗅覺有關", c: "答對了！", w: "不是因為感冒", o: ["吸附氣味", "散熱", "感冒了"] },
    { q: "巴仙吉犬（Basenji）的特色是？", a: "不會吠叫", h: "非洲的狗狗", c: "正確！牠們不汪汪叫", w: "牠們有尾巴啦", o: ["不會吠叫", "沒有尾巴", "三隻腳"] }
  ]);
}

function keyPressed() {
  // 移除 isOnGround 檢查，改由 performJump 內部判斷次數
  if (gameState === 'playing' && keyCode === 32) {
    performJump();
  }

  // 暫停切換 (P 鍵 或 ESC 鍵)
  if (gameState === 'playing' && (key === 'p' || key === 'P' || keyCode === ESCAPE)) {
    togglePause();
  }
}

function performJump() {
  // 只要跳躍次數小於最大次數，就可以跳躍
  if (gameState === 'playing' && jumpCount < MAX_JUMPS) {
    velocityY = jumpForce;
    isOnGround = false;
    jumpCount++; // 增加跳躍次數

    if (jumpCount > 1) {
      onomatopoeias.push(new Onomatopoeia(charX, charY - 50, "DOUBLE!"));
      // 二段跳特效：在腳下產生一點向下噴射的灰塵
      for(let i=0; i<5; i++) {
           let d = new DustParticle(charX, charY + 45);
           d.vy = random(1, 3); 
           dustParticles.push(d);
      }
    } else {
      onomatopoeias.push(new Onomatopoeia(charX, charY - 50, "JUMP!"));
    }

    // 新增：更新跳躍統計與檢查成就
    gameStats.jumps++;
    checkAchievements('jumps');
    saveGameData();
  }
}

// --- 衝擊波類別 ---
class Shockwave {
  constructor(x, y, power = 1) {
    this.x = x;
    this.y = y; // 衝擊波應該在地面上
    this.radius = 0;
    this.maxRadius = 30 + 60 * power; // 最大半徑
    this.life = 255;
    this.speed = 1.5 + power;
  }

  update(scrollSpeed) {
    this.x += scrollSpeed; // 跟隨背景移動
    this.radius += this.speed;
    this.life -= 10; // 消失速度
  }

  display() {
    push();
    noFill();
    // 圓環的寬度隨著擴散而變細
    let sw = map(this.radius, 0, this.maxRadius, 12, 0, true);
    strokeWeight(sw);
    // 顏色隨著生命週期淡出
    stroke(255, 255, 255, this.life);
    ellipse(this.x, this.y, this.radius * 2);
    pop();
  }

  isDead() {
    return this.life <= 0 || this.radius >= this.maxRadius;
  }
}

// --- 灰塵粒子類別 ---
class DustParticle {
  constructor(x, y) {
    this.x = x + random(-10, 10);
    this.y = y + random(-5, 5);
    this.vx = random(-1, 1);
    this.vy = random(-1, -3); // 向上飄
    this.size = random(10, 20);
    this.alpha = 200;
    this.color = color(240, 240, 240); // 灰白色
  }

  update(scrollSpeed) {
    this.x += this.vx + scrollSpeed; // 跟隨背景移動
    this.y += this.vy;
    this.alpha -= 15; // 淡出速度
    this.size *= 0.9; // 逐漸變小
  }

  display() {
    noStroke();
    fill(red(this.color), green(this.color), blue(this.color), this.alpha);
    circle(this.x, this.y, this.size);
  }

  isDead() {
    return this.alpha <= 0;
  }
}

// --- 復活功能函式 (新增) ---
function tryRevive(type) {
  if (type === 'gem') {
    if (gemCount >= 5) {
      gemCount -= 5;
      localStorage.setItem('gemCount', gemCount); // 儲存寶石
      performRevive();
    } else {
      alert('寶石不足！請收集更多寶石。');
    }
  } else if (type === 'ad') {
    // 模擬看廣告
    let adConfirm = confirm("即將播放廣告 (模擬)... 觀看廣告以復活？");
    if (adConfirm) {
      performRevive();
    }
  }
}

function performRevive() {
  char1HP = char1MaxHP; // 恢復滿血
  gameState = 'playing';
  reviveGemButton.hide();
  reviveAdButton.hide();
  restartButton.hide();
  
  // 為了避免立刻死掉，將角色稍微往上移一點
  charY = height * 0.85 - 100;
  velocityY = 0;
  
  // 產生復活特效
  for (let i = 0; i < 30; i++) {
    confettiParticles.push(new Confetti(charX, charY));
  }
  floatingTexts.push(new FloatingText(charX, charY - 100, "REVIVED!", '#4ade80'));
}

// --- 商店系統函式 (新增) ---
function openShop() {
  isShopping = true;
  // 隱藏暫停選單按鈕
  resumeButton.hide();
  pauseQuitButton.hide();
  pauseRestartButton.hide();
  pauseShopButton.hide();
  
  // 顯示商店按鈕
  shopCloseButton.show();
  buyPotionBtn.show();
  buyMagnetBtn.show();
  buyShieldBtn.show();
  updateShopButtonPositions();
}

function closeShop() {
  isShopping = false;
  // 隱藏商店按鈕
  shopCloseButton.hide();
  buyPotionBtn.hide();
  buyMagnetBtn.hide();
  buyShieldBtn.hide();
  
  // 恢復暫停選單按鈕
  resumeButton.show();
  pauseQuitButton.show();
  pauseRestartButton.show();
  pauseShopButton.show();
}

function updateShopButtonPositions() {
  let startY = height * 0.35;
  let gap = 70;
  buyPotionBtn.position(width / 2 - 140, startY);
  buyMagnetBtn.position(width / 2 - 140, startY + gap);
  buyShieldBtn.position(width / 2 - 140, startY + gap * 2);
  shopCloseButton.position(width / 2 - 60, startY + gap * 3 + 20);
}

function buyItem(type, cost) {
  if (gemCount >= cost) {
    gemCount -= cost;
    localStorage.setItem('gemCount', gemCount); // 儲存寶石
    if (type === 'potion') {
      char1HP = min(char1HP + 30, char1MaxHP);
      alert("購買成功！HP +30");
    } else if (type === 'magnet') {
      magnetTimer = MAGNET_DURATION;
      alert("購買成功！磁鐵效果啟動");
    } else if (type === 'shield') {
      hasShield = true;
      alert("購買成功！獲得護盾");
    }
  } else {
    alert("寶石不足！");
  }
}

function drawShopMenu() {
  push();
  // 1. 半透明黑色遮罩
  fill(0, 180);
  rectMode(CORNER);
  rect(0, 0, width, height);

  // 2. 商店面板背景
  rectMode(CENTER);
  fill(255);
  stroke(0);
  strokeWeight(5);
  rect(width / 2, height / 2, 400, 500, 20);

  // 3. 標題
  textAlign(CENTER, CENTER);
  textSize(40);
  fill(0);
  noStroke();
  textStyle(BOLD);
  text("道具商店", width / 2, height / 2 - 200);
  
  // 4. 顯示目前寶石
  textSize(24);
  fill('#3b82f6');
  text(`持有寶石: 💎 ${gemCount}`, width / 2, height / 2 - 150);

  pop();
}

function togglePause() {
  if (gameState !== 'playing') return;

  isPaused = !isPaused;
  isShopping = false; // 確保暫停時不是在商店狀態

  if (isPaused) {
    // 暫停時：捕捉當前畫面，隱藏遊戲 UI，顯示暫停 UI
    pausedScreenshot = get();
    char1Input.hide();
    retryButton.hide();
    nextButton.hide();
    submitButton.hide();
    for (let btn of optionButtons) {
        btn.hide();
    }
    
    // 顯示四個按鈕，垂直排列
    let startY = height * 0.3;
    let gap = 90;
    
    resumeButton.position(width / 2 - 100, startY);
    resumeButton.show();
    
    pauseShopButton.position(width / 2 - 100, startY + gap);
    pauseShopButton.show();
    
    pauseQuitButton.position(width / 2 - 100, startY + gap * 2);
    pauseQuitButton.show();

    pauseRestartButton.position(width / 2 - 100, startY + gap * 3);
    pauseRestartButton.show();
    
    // 隱藏遊戲控制按鈕
    leftBtn.hide();
    rightBtn.hide();
    jumpBtn.hide();
  } else {
    // 繼續時：隱藏暫停 UI，恢復遊戲 UI (如果需要)
    resumeButton.hide();
    pauseShopButton.hide();
    shopCloseButton.hide();
    buyPotionBtn.hide();
    buyMagnetBtn.hide();
    buyShieldBtn.hide();
    pauseQuitButton.hide();
    pauseRestartButton.hide();
    pausedScreenshot = null;
    // 恢復輸入框顯示狀態 (如果原本是顯示的)
    // 這裡簡單處理：讓 draw() 下一幀自動判斷是否顯示
    // submitButton 會在 draw() 中自動處理
    leftBtn.show();
    rightBtn.show();
    jumpBtn.show();
  }
}

// --- 浮動數值類別 (新增) ---
class FloatingText {
  constructor(x, y, txt, col) {
    this.x = x;
    this.y = y;
    this.text = txt;
    this.color = col;
    this.life = 60; // 生命週期
    this.vy = -2;   // 上升速度
    this.alpha = 255;
    this.scale = 1;
  }

  update(scrollSpeed) {
    this.x += scrollSpeed; // 跟隨背景移動
    this.y += this.vy;
    this.life--;
    this.alpha = map(this.life, 0, 60, 0, 255);
    // 剛出現時稍微放大
    if (this.life > 50) this.scale = lerp(this.scale, 1.2, 0.2);
    else this.scale = lerp(this.scale, 1, 0.1);
  }

  display() {
    push();
    translate(this.x, this.y);
    scale(this.scale);
    textAlign(CENTER, CENTER);
    textSize(28);
    textStyle(BOLD);
    textFont('"Arial Rounded MT Bold", "圓體-繁", sans-serif');
    
    // 文字描邊
    stroke(255, this.alpha);
    strokeWeight(4);
    fill(red(this.color), green(this.color), blue(this.color), this.alpha);
    text(this.text, 0, 0);
    pop();
  }

  isDead() {
    return this.life <= 0;
  }
}

// --- 彩帶粒子類別 ---
class Confetti {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.vx = random(-5, 5); // 水平隨機擴散
    this.vy = random(-10, -5); // 初始向上噴發力道
    this.size = random(6, 12);
    this.color = color(random(255), random(255), random(255)); // 隨機顏色
    this.angle = random(TWO_PI);
    this.angularVelocity = random(-0.2, 0.2); // 旋轉速度
    this.life = 255;
    this.gravity = 0.4;
  }

  update(scrollSpeed) {
    this.x += this.vx + scrollSpeed; // 跟隨背景移動
    this.y += this.vy;
    this.vy += this.gravity; // 受重力影響下墜
    this.angle += this.angularVelocity; // 持續旋轉
    this.life -= 2; // 慢慢消失
  }

  display() {
    push();
    translate(this.x, this.y);
    rotate(this.angle);
    noStroke();
    fill(red(this.color), green(this.color), blue(this.color), this.life);
    rectMode(CENTER);
    rect(0, 0, this.size, this.size * 0.4); // 長條狀彩帶
    pop();
  }

  isDead() {
    return this.life <= 0 || this.y > height;
  }
}

// --- 狀聲詞類別 ---
class Onomatopoeia {
  constructor(x, y, txt, col = color(255, 220, 0)) {
    this.x = x;
    this.y = y;
    this.text = txt;
    this.life = 100; // 生命週期
    this.scale = 0.1;
    this.rotation = random(-0.4, 0.4);
    this.color = col;
  }

  update() {
    this.life -= 4;
    // 動畫：快速放大，然後縮小消失
    if (this.life > 50) {
      this.scale = lerp(this.scale, 1.5, 0.3);
    } else {
      this.scale = lerp(this.scale, 0, 0.2);
    }
  }

  display() {
    push();
    translate(this.x, this.y);
    rotate(this.rotation);
    scale(this.scale);
    
    textAlign(CENTER, CENTER);
    textFont('"Arial Rounded MT Bold", "圓體-繁", "Microsoft JhengHei UI", sans-serif');
    textSize(50);
    
    let alpha = map(this.life, 0, 100, 0, 255);
    stroke(0, alpha);
    strokeWeight(8);
    fill(red(this.color), green(this.color), blue(this.color), alpha);
    text(this.text, 0, 0);
    pop();
  }

  isDead() {
    return this.life <= 0;
  }
}

function drawPauseMenu() {
  push();
  // 1. 半透明黑色遮罩
  fill(0, 150);
  rectMode(CORNER);
  rect(0, 0, width, height);

  // 2. 漫畫風格半色調背景 (Halftone Dots)
  fill(255, 50); // 半透明白點
  noStroke();
  let dotSize = 10;
  let spacing = 20;
  // 加入 frameCount 來讓圓點產生動態流動效果
  let timeOffset = frameCount * 2;
  for (let x = 0; x < width; x += spacing) {
    for (let y = 0; y < height; y += spacing) {
      // 透過時間偏移量改變圓點的顯示條件，創造流動感
      if ((x + y + timeOffset) % (spacing * 2) === 0) {
        circle(x, y, dotSize);
      }
    }
  }

  // 3. "PAUSED" 標題
  translate(width / 2, height / 2 - 80);
  rotate(sin(frameCount * 0.05) * 0.05); // 輕微搖晃
  scale(1 + sin(frameCount * 0.1) * 0.05); // 呼吸效果

  textSize(100);
  textFont('cursive, "Comic Sans MS", sans-serif');
  textAlign(CENTER, CENTER);
  // 文字陰影/描邊
  fill(0);
  text("PAUSED", 5, 5);
  fill('#facc15'); // 黃色文字
  stroke(0);
  strokeWeight(5);
  text("PAUSED", 0, 0);

  // 4. 掃描線/雜訊效果
  let w = textWidth("PAUSED");
  noStroke();
  for (let i = 0; i < 50; i++) { // 畫 50 條線
    let y = random(-60, 60); // 在文字垂直範圍內隨機
    let h = random(1, 3);   // 線條高度
    let a = random(50, 100); // 線條透明度
    fill(0, a); // 黑色半透明
    rect(-w / 2, y, w, h); // 畫一條橫線
  }

  pop();
}

// --- 寶石生成函式 ---
function spawnGems() {
  gems = [];
  // 在起點到終點之間隨機產生寶石
  for (let i = 0; i < 15; i++) {
    let x = random(width * 0.5, width * 2.5);
    let y = height * 0.85 - random(60, 180); // 在跳躍高度範圍內
    gems.push(new Gem(x, y));
  }
}

// --- 炸彈生成函式 (新增) ---
function spawnBombs() {
  bombs = [];
  // 隨機生成 3~5 個炸彈
  for (let i = 0; i < 5; i++) {
    let x = random(width * 0.6, width * 2.5);
    let y = height * 0.85 - random(20, 100); // 可能在地面或低空
    bombs.push(new Bomb(x, y));
  }
}

// --- 磁鐵生成函式 ---
function spawnMagnets() {
  magnets = [];
  // 隨機生成 2~3 個磁鐵
  for (let i = 0; i < 3; i++) {
    let x = random(width * 0.8, width * 2.5);
    let y = height * 0.85 - random(80, 150);
    magnets.push(new Magnet(x, y));
  }
}

// --- 懷錶生成函式 (新增) ---
function spawnTimeStopWatches() {
  timeStopWatches = [];
  // 隨機生成 2 個懷錶 (稀有道具)
  for (let i = 0; i < 2; i++) {
    let x = random(width * 0.8, width * 2.5);
    let y = height * 0.85 - random(80, 150);
    timeStopWatches.push(new TimeStopWatch(x, y));
  }
}

// --- 星星生成函式 (新增) ---
function spawnStars() {
  stars = [];
  // 隨機生成 1~2 個星星 (稀有道具)
  for (let i = 0; i < 2; i++) {
    let x = random(width * 0.8, width * 2.5);
    let y = height * 0.85 - random(80, 150);
    stars.push(new Star(x, y));
  }
}

// --- 蘑菇生成函式 (新增) ---
function spawnMushrooms() {
  mushrooms = [];
  // 隨機生成 1 個蘑菇 (稀有道具)
  for (let i = 0; i < 1; i++) {
    let x = random(width * 0.8, width * 2.5);
    let y = height * 0.85 - 40; // 貼近地面
    mushrooms.push(new Mushroom(x, y));
  }
}

// --- 寶石類別 ---
class Gem {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.size = 15;
    this.floatOffset = random(TWO_PI);
    
    // 隨機決定寶石類型
    let r = random();
    let probSum = 0;
    for (let type of GEM_TYPES) {
      probSum += type.probability;
      if (r < probSum) {
        this.type = type;
        break;
      }
    }
    if (!this.type) this.type = GEM_TYPES[0];
  }

  update(scrollSpeed) {
    this.x += scrollSpeed;
  }

  display() {
    push();
    translate(this.x, this.y + sin(frameCount * 0.1 + this.floatOffset) * 5);
    
    // 發光效果
    drawingContext.shadowBlur = 10;
    drawingContext.shadowColor = this.type.color;
    
    fill(this.type.color);
    stroke(255);
    strokeWeight(2);
    
    beginShape();
    vertex(0, -this.size);
    vertex(this.size * 0.7, 0);
    vertex(0, this.size);
    vertex(-this.size * 0.7, 0);
    endShape(CLOSE);
    
    drawingContext.shadowBlur = 0;
    pop();
  }

  checkCollision(px, py) {
    // 簡單的距離碰撞偵測
    // 假設 py 是角色腳底位置，寶石通常在空中，所以偵測點往上提一點
    let d = dist(px, py - 40, this.x, this.y);
    return d < 40; // 碰撞半徑
  }
}

// --- 磁鐵類別 ---
class Magnet {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.floatOffset = random(TWO_PI);
  }

  update(scrollSpeed) {
    this.x += scrollSpeed;
  }

  display() {
    push();
    translate(this.x, this.y + sin(frameCount * 0.1 + this.floatOffset) * 5);
    
    // 繪製 U 型磁鐵
    noFill();
    stroke('#ef4444'); // 紅色
    strokeWeight(8);
    strokeCap(SQUARE);
    arc(0, 0, 20, 20, 0, PI); // 底部圓弧
    line(-10, 0, -10, -10);   // 左臂
    line(10, 0, 10, -10);     // 右臂
    
    // 銀色尖端
    stroke('#e5e7eb');
    line(-10, -10, -10, -15);
    line(10, -10, 10, -15);
    
    pop();
  }

  checkCollision(px, py) {
    let d = dist(px, py - 40, this.x, this.y);
    return d < 40;
  }
}

// --- 炸彈類別 (新增) ---
class Bomb {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.size = 20;
  }

  update(scrollSpeed) {
    this.x += scrollSpeed;
  }

  display() {
    push();
    translate(this.x, this.y);
    
    // 炸彈本體
    fill(0);
    stroke(50);
    strokeWeight(2);
    circle(0, 0, this.size * 2);
    
    // 光澤
    noStroke();
    fill(255, 100);
    circle(-5, -5, 8);
    
    // 引信與火花
    if (frameCount % 10 < 5) {
      fill('#facc15'); // 黃色火花
      circle(0, -this.size - 5, 8);
      fill('#ef4444'); // 紅色核心
      circle(0, -this.size - 5, 4);
    }
    
    pop();
  }

  checkCollision(px, py) {
    let d = dist(px, py - 40, this.x, this.y);
    return d < 30;
  }
}

// --- 無敵星星類別 (新增) ---
class Star {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.floatOffset = random(TWO_PI);
    this.angle = 0;
  }

  update(scrollSpeed) {
    this.x += scrollSpeed;
    this.angle += 0.05; // 自轉
  }

  display() {
    push();
    translate(this.x, this.y + sin(frameCount * 0.1 + this.floatOffset) * 5);
    rotate(this.angle);
    
    // 繪製五角星
    fill('#facc15'); // 金黃色
    stroke('#b45309'); // 深橘色邊框
    strokeWeight(3);
    beginShape();
    for (let i = 0; i < 5; i++) {
      let angle = TWO_PI * i / 5 - HALF_PI;
      let r1 = 20; // 外半徑
      let r2 = 10; // 內半徑
      vertex(cos(angle) * r1, sin(angle) * r1);
      let angle2 = angle + TWO_PI / 10;
      vertex(cos(angle2) * r2, sin(angle2) * r2);
    }
    endShape(CLOSE);
    
    // 眼睛 (讓星星看起來像經典遊戲道具)
    fill(0);
    noStroke();
    rectMode(CENTER);
    rect(-5, -2, 3, 8);
    rect(5, -2, 3, 8);
    pop();
  }

  checkCollision(px, py) {
    let d = dist(px, py - 40, this.x, this.y);
    return d < 40;
  }
}

// --- 巨大化蘑菇類別 (新增) ---
class Mushroom {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }

  update(scrollSpeed) {
    this.x += scrollSpeed;
  }

  display() {
    push();
    translate(this.x, this.y);
    // 繪製蘑菇
    fill(255); // 梗
    rectMode(CENTER);
    rect(0, 10, 15, 20, 5);
    fill('#ef4444'); // 傘蓋 (紅色)
    arc(0, 0, 40, 30, PI, TWO_PI);
    fill(255); // 圓點
    circle(-10, -5, 6);
    circle(10, -5, 6);
    circle(0, -10, 8);
    pop();
  }

  checkCollision(px, py) {
    let d = dist(px, py - 40, this.x, this.y);
    return d < 40;
  }
}

// --- 時間暫停懷錶類別 (新增) ---
class TimeStopWatch {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.floatOffset = random(TWO_PI);
  }

  update(scrollSpeed) {
    this.x += scrollSpeed;
  }

  display() {
    push();
    translate(this.x, this.y + sin(frameCount * 0.1 + this.floatOffset) * 5);
    
    // 繪製懷錶
    fill(255);
    stroke('#3b82f6'); // 藍色邊框
    strokeWeight(3);
    circle(0, 0, 30);
    // 指針
    stroke(0);
    strokeWeight(2);
    line(0, 0, 0, -10); // 分針
    line(0, 0, 5, 5);   // 時針
    // 按鈕
    noStroke();
    fill('#3b82f6');
    rectMode(CENTER);
    rect(0, -18, 6, 4);
    pop();
  }

  checkCollision(px, py) {
    let d = dist(px, py - 40, this.x, this.y);
    return d < 40;
  }
}

// --- 計算遊玩時間函式 (新增) ---
function calculatePlayTime() {
  let duration = millis() - gameStartTime;
  let seconds = floor(duration / 1000);
  let minutes = floor(seconds / 60);
  seconds = seconds % 60;
  finalPlayTimeStr = nf(minutes, 2) + ":" + nf(seconds, 2);
}

// --- 煙火類別 ---
class Firework {
  constructor() {
    this.x = random(width * 0.1, width * 0.9);
    this.y = height;
    this.targetY = random(height * 0.1, height * 0.5); // 在上半部爆炸
    this.speed = random(8, 14);
    this.color = color(random(150, 255), random(150, 255), random(150, 255)); // 亮色系
    this.particles = [];
    this.exploded = false;
  }

  update() {
    if (!this.exploded) {
      this.y -= this.speed;
      if (this.y <= this.targetY) {
        this.explode();
      }
    }

    for (let i = this.particles.length - 1; i >= 0; i--) {
      this.particles[i].update();
      if (this.particles[i].isDead()) {
        this.particles.splice(i, 1);
      }
    }
  }

  explode() {
    this.exploded = true;
    // 產生爆炸粒子
    for (let i = 0; i < 60; i++) {
      this.particles.push(new FireworkParticle(this.x, this.y, this.color));
    }
  }

  display() {
    if (!this.exploded) {
      stroke(this.color);
      strokeWeight(4);
      point(this.x, this.y);
    }
    for (let p of this.particles) {
      p.display();
    }
  }

  isDead() {
    return this.exploded && this.particles.length === 0;
  }
}

class FireworkParticle {
  constructor(x, y, col) {
    this.x = x;
    this.y = y;
    let angle = random(TWO_PI);
    let speed = random(2, 6);
    this.vx = cos(angle) * speed;
    this.vy = sin(angle) * speed;
    this.alpha = 255;
    this.color = col;
    this.gravity = 0.15;
    this.decay = random(3, 6);
  }

  update() {
    this.x += this.vx;
    this.y += this.vy;
    this.vy += this.gravity;
    this.vx *= 0.95; // 空氣阻力
    this.vy *= 0.95;
    this.alpha -= this.decay;
  }

  display() {
    noStroke();
    fill(red(this.color), green(this.color), blue(this.color), this.alpha);
    circle(this.x, this.y, 4);
  }

  isDead() {
    return this.alpha <= 0;
  }
}

// --- 每日登入獎勵函式 (新增) ---
function checkDailyLogin() {
  let today = new Date().toDateString(); // 取得今天的日期字串 (例如 "Fri Oct 27 2023")
  let lastLogin = localStorage.getItem('lastLoginDate');

  if (lastLogin !== today) {
    // 是新的一天 (或第一次玩)
    let reward = 50; // 每日獎勵寶石數
    gemCount += reward;
    localStorage.setItem('gemCount', gemCount);
    localStorage.setItem('lastLoginDate', today);
    
    // 延遲一點顯示特效，確保畫面已準備好
    setTimeout(() => {
        floatingTexts.push(new FloatingText(width / 2, height / 2 - 100, "每日登入獎勵!", '#facc15'));
        floatingTexts.push(new FloatingText(width / 2, height / 2 - 50, `+${reward} 💎`, '#3b82f6'));
        for (let i = 0; i < 50; i++) {
            confettiParticles.push(new Confetti(width / 2, height / 2));
        }
    }, 500);
  }
}

// --- 成就系統函式 (新增) ---
function checkAchievements(type) {
  ACHIEVEMENTS.forEach(ach => {
    if (!ach.unlocked && ach.type === type) {
      let currentVal = 0;
      if (type === 'jumps') currentVal = gameStats.jumps;
      if (type === 'gems') currentVal = gameStats.gemsCollected;
      
      if (currentVal >= ach.target) {
        unlockAchievement(ach);
      }
    }
  });
}

function unlockAchievement(ach) {
  ach.unlocked = true;
  gemCount += ach.reward;
  
  // 顯示成就解鎖特效
  floatingTexts.push(new FloatingText(charX, charY - 150, `🏆 成就解鎖: ${ach.title}`, '#facc15'));
  floatingTexts.push(new FloatingText(charX, charY - 110, `+${ach.reward} 💎`, '#3b82f6'));
  
  // 播放音效 (如果有實作 playTone)
  // playLevelUpSound(); 
}

function saveGameData() {
  localStorage.setItem('gemCount', gemCount);
  localStorage.setItem('gameStats', JSON.stringify(gameStats));
  let achStatus = {};
  ACHIEVEMENTS.forEach(ach => {
      if (ach.unlocked) achStatus[ach.id] = true;
  });
  localStorage.setItem('achievements', JSON.stringify(achStatus));
}

// --- 速度線類別 (新增) ---
class SpeedLine {
  constructor(dir) {
    this.x = random(width);
    this.y = random(height * 0.2, height * 0.8);
    this.w = random(100, 300);
    this.h = random(2, 5);
    this.speed = random(20, 40);
    this.dir = dir; // 1: 往右飛, -1: 往左飛
    this.life = 15;
  }
  update() {
    this.x += this.speed * this.dir;
    this.life--;
  }
  display() {
    push();
    noStroke();
    fill(255, map(this.life, 0, 15, 0, 150));
    rect(this.x, this.y, this.w, this.h);
    pop();
  }
  isDead() { return this.life <= 0; }
}
