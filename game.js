// ============================================
// F1 CAREER SIMULATOR - GAME ENGINE
// ============================================

// ============ DATA ============

const TEAMS = [
  { id: 'mclaren', name: 'McLaren F1 Team', short: 'McLaren', car: 95, css: 'team-mclaren', salary: [12, 22] },
  { id: 'redbull', name: 'Oracle Red Bull Racing', short: 'Red Bull', car: 91, css: 'team-redbull', salary: [15, 25] },
  { id: 'mercedes', name: 'Mercedes-AMG Petronas', short: 'Mercedes', car: 87, css: 'team-mercedes', salary: [10, 20] },
  { id: 'ferrari', name: 'Scuderia Ferrari', short: 'Ferrari', car: 84, css: 'team-ferrari', salary: [12, 22] },
  { id: 'astonmartin', name: 'Aston Martin Aramco', short: 'Aston Martin', car: 77, css: 'team-astonmartin', salary: [6, 14] },
  { id: 'williams', name: 'Atlassian Williams Racing', short: 'Williams', car: 74, css: 'team-williams', salary: [5, 12] },
  { id: 'rb', name: 'Racing Bulls', short: 'Racing Bulls', car: 71, css: 'team-rb', salary: [3, 8] },
  { id: 'haas', name: 'MoneyGram Haas F1 Team', short: 'Haas', car: 69, css: 'team-haas', salary: [3, 7] },
  { id: 'alpine', name: 'BWT Alpine F1 Team', short: 'Alpine', car: 65, css: 'team-alpine', salary: [3, 8] },
  { id: 'sauber', name: 'Kick Sauber F1 Team', short: 'Kick Sauber', car: 62, css: 'team-alfa', salary: [2, 6] },
];

const TRACKS = [
  { name: '澳大利亚大奖赛', country: '墨尔本 🇦🇺', speed: 0.65, downforce: 0.6, wet: 0.4 },
  { name: '中国大奖赛', country: '上海 🇨🇳', speed: 0.6, downforce: 0.65, wet: 0.35, sprint: true },
  { name: '日本大奖赛', country: '铃鹿 🇯🇵', speed: 0.75, downforce: 0.8, wet: 0.45 },
  { name: '巴林大奖赛', country: '萨基尔 🇧🇭', speed: 0.6, downforce: 0.6, wet: 0.2 },
  { name: '沙特阿拉伯大奖赛', country: '吉达 🇸🇦', speed: 0.8, downforce: 0.5, wet: 0.15 },
  { name: '迈阿密大奖赛', country: '迈阿密 🇺🇸', speed: 0.7, downforce: 0.55, wet: 0.25, sprint: true },
  { name: '艾米利亚-罗马涅大奖赛', country: '伊莫拉 🇮🇹', speed: 0.65, downforce: 0.7, wet: 0.35 },
  { name: '摩纳哥大奖赛', country: '蒙特卡洛 🇲🇨', speed: 0.3, downforce: 1.0, wet: 0.3 },
  { name: '西班牙大奖赛', country: '巴塞罗那 🇪🇸', speed: 0.6, downforce: 0.8, wet: 0.3 },
  { name: '加拿大大奖赛', country: '蒙特利尔 🇨🇦', speed: 0.65, downforce: 0.5, wet: 0.4 },
  { name: '奥地利大奖赛', country: '红牛环 🇦🇹', speed: 0.75, downforce: 0.65, wet: 0.3, sprint: true },
  { name: '英国大奖赛', country: '银石 🇬🇧', speed: 0.8, downforce: 0.75, wet: 0.45 },
  { name: '比利时大奖赛', country: '斯帕 🇧🇪', speed: 0.85, downforce: 0.5, wet: 0.55, sprint: true },
  { name: '匈牙利大奖赛', country: '布达佩斯 🇭🇺', speed: 0.5, downforce: 0.8, wet: 0.3 },
  { name: '荷兰大奖赛', country: '赞德沃特 🇳🇱', speed: 0.6, downforce: 0.75, wet: 0.4 },
  { name: '意大利大奖赛', country: '蒙扎 🇮🇹', speed: 0.9, downforce: 0.3, wet: 0.25 },
  { name: '阿塞拜疆大奖赛', country: '巴库 🇦🇿', speed: 0.75, downforce: 0.4, wet: 0.2 },
  { name: '新加坡大奖赛', country: '滨海湾 🇸🇬', speed: 0.4, downforce: 0.9, wet: 0.35 },
  { name: '美国大奖赛', country: '奥斯汀 🇺🇸', speed: 0.65, downforce: 0.65, wet: 0.3, sprint: true },
  { name: '墨西哥大奖赛', country: '墨西哥城 🇲🇽', speed: 0.6, downforce: 0.55, wet: 0.2 },
  { name: '巴西大奖赛', country: '圣保罗 🇧🇷', speed: 0.7, downforce: 0.6, wet: 0.55, sprint: true },
  { name: '拉斯维加斯大奖赛', country: '拉斯维加斯 🇺🇸', speed: 0.8, downforce: 0.4, wet: 0.15 },
  { name: '卡塔尔大奖赛', country: '卢塞尔 🇶🇦', speed: 0.65, downforce: 0.6, wet: 0.15, sprint: true },
  { name: '阿布扎比大奖赛', country: '亚斯码头 🇦🇪', speed: 0.6, downforce: 0.7, wet: 0.15 },
];

// 2025赛季AI车手数据（按车队顺序：McLaren, Red Bull, Mercedes, Ferrari, Aston Martin, Williams, Racing Bulls, Haas, Alpine, Kick Sauber）
// 每队两位车手，共20位，玩家将替换其中一位
const AI_DRIVERS = [
  // McLaren (车队冠军，623分)
  { name: 'L. Norris', pace: 94, consistency: 89, wet: 86, defend: 86, attack: 90, raceIQ: 88, skill: 89 },
  { name: 'O. Piastri', pace: 93, consistency: 88, wet: 84, defend: 87, attack: 88, raceIQ: 89, skill: 87 },
  // Red Bull
  { name: 'M. Verstappen', pace: 97, consistency: 93, wet: 90, defend: 92, attack: 95, raceIQ: 91, skill: 91 },
  { name: 'L. Lawson', pace: 84, consistency: 80, wet: 79, defend: 81, attack: 83, raceIQ: 80, skill: 79 },
  // Mercedes
  { name: 'G. Russell', pace: 90, consistency: 86, wet: 84, defend: 85, attack: 87, raceIQ: 86, skill: 85 },
  { name: 'A.K. Antonelli', pace: 89, consistency: 78, wet: 80, defend: 80, attack: 86, raceIQ: 79, skill: 82 },
  // Ferrari
  { name: 'C. Leclerc', pace: 92, consistency: 83, wet: 86, defend: 83, attack: 88, raceIQ: 85, skill: 86 },
  { name: 'L. Hamilton', pace: 88, consistency: 89, wet: 92, defend: 88, attack: 84, raceIQ: 92, skill: 88 },
  // Aston Martin
  { name: 'F. Alonso', pace: 85, consistency: 91, wet: 89, defend: 90, attack: 83, raceIQ: 94, skill: 87 },
  { name: 'L. Stroll', pace: 79, consistency: 78, wet: 78, defend: 79, attack: 77, raceIQ: 78, skill: 77 },
  // Williams
  { name: 'A. Albon', pace: 84, consistency: 85, wet: 83, defend: 84, attack: 83, raceIQ: 84, skill: 82 },
  { name: 'C. Sainz', pace: 88, consistency: 88, wet: 84, defend: 87, attack: 85, raceIQ: 88, skill: 86 },
  // Racing Bulls
  { name: 'Y. Tsunoda', pace: 82, consistency: 76, wet: 79, defend: 78, attack: 82, raceIQ: 78, skill: 78 },
  { name: 'I. Hadjar', pace: 83, consistency: 79, wet: 78, defend: 80, attack: 82, raceIQ: 80, skill: 79 },
  // Haas
  { name: 'E. Ocon', pace: 82, consistency: 80, wet: 82, defend: 80, attack: 81, raceIQ: 80, skill: 79 },
  { name: 'O. Bearman', pace: 81, consistency: 76, wet: 77, defend: 77, attack: 80, raceIQ: 76, skill: 76 },
  // Alpine
  { name: 'P. Gasly', pace: 82, consistency: 81, wet: 84, defend: 80, attack: 82, raceIQ: 81, skill: 80 },
  { name: 'J. Doohan', pace: 78, consistency: 74, wet: 75, defend: 75, attack: 77, raceIQ: 75, skill: 74 },
  // Kick Sauber
  { name: 'N. Hulkenberg', pace: 82, consistency: 86, wet: 81, defend: 83, attack: 80, raceIQ: 85, skill: 81 },
  { name: 'G. Bortoleto', pace: 80, consistency: 75, wet: 76, defend: 76, attack: 79, raceIQ: 76, skill: 76 },
];

const BACKGROUNDS = [
  {
    id: 'academy',
    name: '青训新星',
    icon: '🌟',
    desc: '你是车队青训体系的骄傲，从小被培养为未来之星。速度快，天赋异禀，但大赛经验不足。',
    statMod: { pace: 5, attack: 3, consistency: -3, raceIQ: -2 },
    teamRange: [0, 3], // McLaren, Red Bull, Mercedes, Ferrari
    tags: ['速度+5', '进攻+3', '稳定-3', '赛道IQ-2'],
    tagTypes: ['positive', 'positive', 'negative', 'negative'],
  },
  {
    id: 'paydriver',
    name: '赞助车手',
    icon: '💰',
    desc: '你的背后是雄厚的资金支持。虽然能力不是最强，但你获得了一个不错的位置。',
    statMod: { pace: -3, consistency: -2, wet: -2, defend: -2, attack: -2, raceIQ: -2 },
    teamRange: [4, 7], // Aston Martin, Williams, Racing Bulls, Haas
    tags: ['全属性-2~3', '起始车队较好'],
    tagTypes: ['negative', 'positive'],
  },
  {
    id: 'champion',
    name: '低级别霸主',
    icon: '🏆',
    desc: '你在F2/F3碾压一切对手，凭借绝对实力赢得F1席位。稳定且聪明，但需要适应F1的节奏。',
    statMod: { consistency: 4, raceIQ: 4, pace: -2 },
    teamRange: [6, 9], // Racing Bulls, Haas, Alpine, Kick Sauber
    tags: ['稳定+4', '赛道IQ+4', '速度-2'],
    tagTypes: ['positive', 'positive', 'negative'],
  },
  {
    id: 'veteran',
    name: '跨界老将',
    icon: '🎖️',
    desc: '你从其他赛事转战F1。虽然年龄偏大，但丰富的比赛经验是你的优势。',
    statMod: { consistency: 5, raceIQ: 5, pace: -4, attack: -2 },
    teamRange: [5, 9], // Williams through Kick Sauber
    tags: ['稳定+5', '赛道IQ+5', '速度-4', '进攻-2'],
    tagTypes: ['positive', 'positive', 'negative', 'negative'],
  },
  {
    id: 'replacement',
    name: '临危受命',
    icon: '⚡',
    desc: '赛季开始前主力车手突然受伤，你作为替补被紧急召入。一切来得突然，但机会就在眼前。',
    statMod: { pace: 2, attack: 4, consistency: -4, raceIQ: -1 },
    teamRange: [3, 8], // Ferrari through Alpine
    tags: ['速度+2', '进攻+4', '稳定-4', '赛道IQ-1'],
    tagTypes: ['positive', 'positive', 'negative', 'negative'],
  },
  {
    id: 'prodigy',
    name: '天才少年',
    icon: '🧒',
    desc: '你是史上最年轻的F1车手，16岁就被顶级车队签下。天赋惊人但心智尚不成熟。',
    statMod: { pace: 6, wet: 3, consistency: -5, raceIQ: -4, defend: -2 },
    teamRange: [0, 2], // McLaren, Red Bull, Mercedes
    tags: ['速度+6', '雨战+3', '稳定-5', '赛道IQ-4', '防守-2'],
    tagTypes: ['positive', 'positive', 'negative', 'negative', 'negative'],
  },
  {
    id: 'comeback',
    name: '王者归来',
    icon: '🔄',
    desc: '你曾是F1车手，因故离开多年后重返围场。经验丰富但需要重新适应现代F1赛车。',
    statMod: { raceIQ: 6, defend: 4, consistency: 3, pace: -5, wet: -2 },
    teamRange: [4, 8], // Aston Martin through Alpine
    tags: ['赛道IQ+6', '防守+4', '稳定+3', '速度-5', '雨战-2'],
    tagTypes: ['positive', 'positive', 'positive', 'negative', 'negative'],
  },
  {
    id: 'simracer',
    name: '模拟器神童',
    icon: '🎮',
    desc: '你从电竞模拟赛车转战真实赛道。赛道智商极高，但身体素质和真实驾驶感还需磨练。',
    statMod: { raceIQ: 5, wet: 2, pace: -2, consistency: -3, defend: -1 },
    teamRange: [5, 9], // Williams through Kick Sauber
    tags: ['赛道IQ+5', '雨战+2', '速度-2', '稳定-3', '防守-1'],
    tagTypes: ['positive', 'positive', 'negative', 'negative', 'negative'],
  },
];

const WEATHER_TYPES = [
  { id: 'sunny', name: '晴天', icon: '☀️', wetMod: 0, chaosMod: 0 },
  { id: 'cloudy', name: '多云', icon: '⛅', wetMod: 0, chaosMod: 0.02 },
  { id: 'light_rain', name: '小雨', icon: '🌦️', wetMod: 0.3, chaosMod: 0.05 },
  { id: 'heavy_rain', name: '大雨', icon: '🌧️', wetMod: 0.7, chaosMod: 0.1 },
];

const POINTS_SYSTEM = [25, 18, 15, 12, 10, 8, 6, 4, 2, 1];

const STAT_NAMES = {
  pace: '⚡ 速度',
  consistency: '🎯 稳定',
  wet: '🌧️ 雨战',
  defend: '🛡️ 防守',
  attack: '⚔️ 进攻',
  raceIQ: '🧠 智商',
};

const STAT_COLORS = {
  pace: '#f97316',
  consistency: '#3b82f6',
  wet: '#06b6d4',
  defend: '#22c55e',
  attack: '#ef4444',
  raceIQ: '#a855f7',
};

// ============ NEWS TEMPLATES ============

const NEWS_TEMPLATES = [
  // 车队动态
  { title: '车队动态', body: (t) => `${t}宣布了重大赛车升级计划，目标在本赛季大幅提升竞争力。` },
  { title: '车队动态', body: (t) => `${t}的技术总监透露，新一版空气动力学套件将在下站比赛中首次亮相。` },
  { title: '车队动态', body: (t) => `消息人士透露，${t}内部对赛车研发方向存在分歧，车队领队面临压力。` },
  { title: '车队动态', body: (t) => `${t}确认将与引擎供应商延长合作合同至2028年。` },
  { title: '车队动态', body: (t) => `${t}工厂进行了大规模扩建，新增了最先进的模拟器设施。` },
  // 车手市场
  { title: '车手市场', body: () => '多支车队正在关注自由车手市场，下赛季的阵容可能发生变化。' },
  { title: '车手市场', body: () => '一位匿名车队领队暗示，本赛季结束后可能会有"重大车手变动"。' },
  { title: '车手市场', body: () => '年轻车手们在F2的表现引起了F1车队的注意，多位新秀收到测试邀请。' },
  { title: '车手市场', body: () => '有传言称某位世界冠军正在考虑退役，围场内议论纷纷。' },
  // 规则调整
  { title: '规则调整', body: () => 'FIA宣布对技术规则进行微调，旨在减少赛车的空气动力学效应。' },
  { title: '规则调整', body: () => '国际汽联发布了新的安全车程序指南，将影响比赛重启方式。' },
  { title: '规则调整', body: () => '从下赛季起，冲刺赛赛制将进行调整，积分分配有所变化。' },
  { title: '规则调整', body: () => 'FIA加强了对车队无线电通讯的监控，禁止传输某些类型的信息。' },
  // 赞助商与商业
  { title: '赞助商新闻', body: (t) => `${t}获得了新的主要赞助商，预算大幅增加。` },
  { title: '商业动态', body: () => 'F1官方宣布将在中东地区新增一场夜间赛事，赛历将继续扩展。' },
  { title: '商业动态', body: (t) => `${t}推出全新车队周边商品系列，首日销售创下纪录。` },
  // 赛道与技术
  { title: '赛道记录', body: () => '多位车手表示期待本周末的比赛，赛道条件看起来非常适合超车。' },
  { title: '技术分析', body: () => '专家指出，本赛季的研发竞赛已经进入白热化阶段，各车队差距极小。' },
  { title: '技术分析', body: () => '风洞数据显示，今年的赛车下压力水平比去年同期提升了8%。' },
  { title: '赛道前瞻', body: () => '天气预报显示本周末可能会有降雨，车队正在准备雨战策略。' },
  { title: '赛道前瞻', body: () => '赛道官员确认，赛道沥青已经重新铺设，抓地力将有所提升。' },
  // 争议与戏剧
  { title: '围场热议', body: () => '上周比赛中的碰撞事件仍在引发讨论，当事车手之间的气氛紧张。' },
  { title: '围场热议', body: () => '一位资深评论员批评某车手的驾驶风格"过于激进"，引发车迷争论。' },
  { title: '围场热议', body: () => '车队指令再次成为焦点，有人认为这违背了赛车精神。' },
  // 传奇与历史
  { title: 'F1历史', body: () => '今天是一位F1传奇车手的生日，围场上下纷纷送上祝福。' },
  { title: 'F1历史', body: () => '本周末的赛道曾见证过F1历史上最激动人心的超车之一。' },
  { title: 'F1历史', body: () => '恰逢某支传奇车队成立周年纪念，车队发布了特别版涂装。' },
];

// ============ RANDOM RACE EVENTS ============

const RANDOM_EVENTS = [
  {
    title: '⚠️ 安全车出动',
    desc: '前方赛道上有碎片，赛会出动安全车！这是一个进站的好机会。',
    type: 'safety_car',
    options: [
      { label: 'A', text: '立即进站换胎 - 利用安全车缩小差距', effect: { pace: 3, raceIQ: 2, risk: -1 } },
      { label: 'B', text: '留在赛道上 - 靠位置优势保持领先', effect: { defend: 2, risk: 0 } },
    ],
  },
  {
    title: '🔥 对手退赛',
    desc: '前方一位竞争对手的赛车爆缸了！你自动上升了一个位置。',
    type: 'bonus',
    options: [
      { label: 'A', text: '稳住节奏 - 保持当前优势', effect: { consistency: 2, raceIQ: 1 } },
      { label: 'B', text: '乘胜追击 - 继续向前推进', effect: { pace: 2, risk: 1 } },
    ],
  },
  {
    title: '💨 引擎模式',
    desc: '工程师询问是否要切换到高性能引擎模式来追赶前车。',
    type: 'engine',
    options: [
      { label: 'A', text: '开启高性能模式 - 追上前车！', effect: { pace: 4, risk: 3 } },
      { label: 'B', text: '保持省油模式 - 稳妥为上', effect: { consistency: 1, raceIQ: 1 } },
      { label: 'C', text: '短暂开启后关闭 - 折中方案', effect: { pace: 2, raceIQ: 2 } },
    ],
  },
  {
    title: '🚨 黄旗区',
    desc: '赛道某处出现黄旗， marshal正在清理赛道。你需要减速通过。',
    type: 'yellow_flag',
    options: [
      { label: 'A', text: '严格遵守黄旗 - 安全第一', effect: { consistency: 2, pace: -1 } },
      { label: 'B', text: '打擦边球 - 尽量不减速太多', effect: { pace: 1, risk: 3 } },
    ],
  },
  {
    title: '📻 工程师建议',
    desc: '工程师通过无线电建议你改变刹车平衡设置。',
    type: 'setup',
    options: [
      { label: 'A', text: '听从建议 - 调整前刹车平衡', effect: { raceIQ: 3, consistency: 1 } },
      { label: 'B', text: '保持原设置 - 我更了解自己的车', effect: { pace: 1, raceIQ: 1 } },
      { label: 'C', text: '反方向调整 - 我觉得需要更多后刹', effect: { pace: 2, risk: 2, raceIQ: -1 } },
    ],
  },
  {
    title: '🎯 DRS争夺',
    desc: '你即将进入DRS检测区，前方0.8秒是你的直接对手。',
    type: 'drs',
    options: [
      { label: 'A', text: '提前减速制造差距 - 避免被DRS超越', effect: { defend: 3, raceIQ: 2, pace: -1 } },
      { label: 'B', text: '全力推进 - 保持压力', effect: { pace: 2, risk: 1 } },
    ],
  },
];

// ============ RACE DECISIONS ============

function getRaceDecisions(raceIdx, state) {
  const track = TRACKS[raceIdx];
  const weather = state.currentWeather;
  const allDecisions = [];

  // Segment 1: Tire strategy decision
  allDecisions.push({
    segment: 1,
    title: '🛞 轮胎策略',
    desc: `赛道温度${weather.id === 'sunny' ? '很高' : '适中'}，你需要选择起步轮胎。`,
    options: [
      { label: 'A', text: '软胎起步 - 抓地力强但磨损快', effect: { pace: 4, tireWear: 3, risk: 1 } },
      { label: 'B', text: '中性胎起步 - 均衡选择', effect: { pace: 1, tireWear: 1, risk: 0 } },
      { label: 'C', text: '硬胎起步 - 保守策略，后期有优势', effect: { pace: -2, tireWear: -2, risk: -1 } },
    ],
  });

  // Segment 2: Weather-dependent OR random event (50% chance)
  if (weather.wetMod > 0.2) {
    allDecisions.push({
      segment: 2,
      title: '🌧️ 雨战决策',
      desc: '赛道开始变湿，你需要决定轮胎选择。',
      options: [
        { label: 'A', text: '立即换半雨胎 - 稳妥之选', effect: { pace: 2, risk: -2 } },
        { label: 'B', text: '继续用干胎 - 赌赛道会干', effect: { pace: -3, risk: 4 } },
        { label: 'C', text: '等一圈再看情况', effect: { pace: 0, risk: 1 } },
      ],
    });
  } else if (Math.random() < 0.5) {
    // 50% chance to get a random event instead of the standard overtake decision
    const randomEvent = RANDOM_EVENTS[Math.floor(Math.random() * RANDOM_EVENTS.length)];
    allDecisions.push({
      segment: 2,
      title: randomEvent.title,
      desc: randomEvent.desc,
      options: randomEvent.options,
      isRandomEvent: true,
    });
  } else {
    allDecisions.push({
      segment: 2,
      title: '⚔️ 超车机会',
      desc: '前方有一位速度相近的对手，你看到了超车的机会。',
      options: [
        { label: 'A', text: '激进超车 - 走内线硬挤', effect: { attack: 5, risk: 3, consistency: -2 } },
        { label: 'B', text: '耐心等待 - 等DRS区域再动手', effect: { raceIQ: 3, risk: 0 } },
        { label: 'C', text: '绕过他 - 不值得冒险', effect: { risk: -1, pace: -1 } },
      ],
    });
  }

  // Segment 3: Teammate decision
  allDecisions.push({
    segment: 3,
    title: '🤝 队友博弈',
    desc: '你的队友就在你身后，车队暗示让你保持位置。',
    options: [
      { label: 'A', text: '服从车队指令 - 保持位置', effect: { teamTrust: 5, pace: -1 } },
      { label: 'B', text: '无视指令继续拼 - 我要赢', effect: { teamTrust: -5, pace: 3, risk: 2 } },
      { label: 'C', text: '故意加速拉开差距', effect: { teamTrust: -2, pace: 2, risk: 1 } },
    ],
  });

  // Segment 4: Late race decision - randomly choose between final sprint or another random event
  if (Math.random() < 0.3) {
    // 30% chance for a second random event
    const randomEvent = RANDOM_EVENTS[Math.floor(Math.random() * RANDOM_EVENTS.length)];
    allDecisions.push({
      segment: 4,
      title: randomEvent.title,
      desc: randomEvent.desc,
      options: randomEvent.options,
      isRandomEvent: true,
    });
  } else {
    allDecisions.push({
      segment: 4,
      title: '🏁 最后冲刺',
      desc: '比赛进入最后10圈，你的轮胎状态如何管理？',
      options: [
        { label: 'A', text: '全力推进 - 不管轮胎了！', effect: { pace: 5, tireWear: 4, risk: 3 } },
        { label: 'B', text: '聪明保胎 - 为最后几圈留弹药', effect: { pace: -1, tireWear: -3, raceIQ: 3 } },
        { label: 'C', text: '稳定巡航 - 保住当前位置', effect: { pace: 0, risk: -2 } },
      ],
    });
  }

  // Media decision (after race)
  allDecisions.push({
    segment: 'post',
    title: '📰 赛后采访',
    desc: '记者问你关于比赛中一个争议判罚的看法。',
    options: [
      { label: 'A', text: '理性分析 - 尊重赛会决定', effect: { mediaRep: 3, fanPop: 1 } },
      { label: 'B', text: '直言不满 - 那个判罚太荒谬了', effect: { mediaRep: -2, fanPop: 4, driverRep: 2 } },
      { label: 'C', text: '回避问题 - 专注比赛', effect: { mediaRep: 1 } },
      { label: 'D', text: '炮轰对手 - 暗示对方有不当行为', effect: { mediaRep: -4, fanPop: 3, driverRep: -3 } },
    ],
  });

  return allDecisions;
}

// ============ ACHIEVEMENTS ============

const ACHIEVEMENTS = [
  { id: 'first_win', name: '🏆 首胜', desc: '赢得你的第一场分站冠军', icon: '🏆', check: (gs) => gs.careerWins >= 1 },
  { id: 'first_podium', name: '🥉 初登领奖台', desc: '第一次登上领奖台', icon: '🥉', check: (gs) => gs.careerPodiums >= 1 },
  { id: 'champion', name: '👑 世界冠军', desc: '赢得世界冠军', icon: '👑', check: (gs) => gs.championships >= 1 },
  { id: 'five_wins', name: '⭐ 五冠王', desc: '职业生涯赢得5场分站冠军', icon: '⭐', check: (gs) => gs.careerWins >= 5 },
  { id: 'ten_podiums', name: '💎 常客', desc: '职业生涯10次登上领奖台', icon: '💎', check: (gs) => gs.careerPodiums >= 10 },
  { id: 'pole_master', name: '🎯 杆位大师', desc: '获得5次杆位', icon: '🎯', check: (gs) => (gs.careerPoles || 0) >= 5 },
  { id: 'rain_master', name: '🌧️ 雨神', desc: '在雨天比赛中获胜', icon: '🌧️', check: (gs) => gs.rainWins >= 1 },
  { id: 'comeback_king', name: '🔄 逆转之王', desc: '从P10以后发车获胜', icon: '🔄', check: (gs) => gs.comebackWin >= 1 },
  { id: 'ironman', name: '🛡️ 铁人', desc: '连续10场完赛', icon: '🛡️', check: (gs) => gs.consecutiveFinishes >= 10 },
  { id: 'team_loyalty', name: '❤️ 忠诚', desc: '在同一支车队效力3个赛季', icon: '❤️', check: (gs) => gs.seasonsAtCurrentTeam >= 3 },
  { id: 'century', name: '💯 百分俱乐部', desc: '单赛季获得超过100分', icon: '💯', check: (gs) => gs.seasonPoints >= 100 },
  { id: 'underdog', name: '🐺 黑马', desc: '在排名后5的车队中获得领奖台', icon: '🐺', check: (gs) => gs.underdogPodium >= 1 },
];

// ============ SPONSORS ============

const SPONSORS = [
  { id: 'energy', name: '能量饮料品牌', icon: '⚡', bonus: 'pace', amount: 2, salary: 3, desc: '速度+2，年薪+$3M' },
  { id: 'tech', name: '科技公司', icon: '💻', bonus: 'raceIQ', amount: 2, salary: 4, desc: '赛道IQ+2，年薪+$4M' },
  { id: 'luxury', name: '奢侈品牌', icon: '💎', bonus: null, amount: 0, salary: 6, desc: '年薪+$6M，无属性加成' },
  { id: 'automotive', name: '汽车配件', icon: '🔧', bonus: 'consistency', amount: 2, salary: 3, desc: '稳定+2，年薪+$3M' },
  { id: 'sports', name: '运动品牌', icon: '👟', bonus: 'defend', amount: 1, salary: 3, desc: '防守+1，年薪+$3M' },
  { id: 'crypto', name: '加密货币', icon: '₿', bonus: 'attack', amount: 2, salary: 5, desc: '进攻+2，年薪+$5M（高风险高回报）' },
];

// ============ GAME STATE ============

let gameState = null;

function createNewGame(name, backgroundId, selectedTeamIdx) {
  const bg = BACKGROUNDS.find(b => b.id === backgroundId);
  const teamIdx = selectedTeamIdx !== undefined ? selectedTeamIdx : bg.teamRange[0] + Math.floor(Math.random() * (bg.teamRange[1] - bg.teamRange[0] + 1));
  const team = TEAMS[teamIdx];

  // Base stats
  const baseStats = { pace: 80, consistency: 80, wet: 77, defend: 78, attack: 79, raceIQ: 78 };

  // Apply background modifiers
  const stats = {};
  for (const key in baseStats) {
    stats[key] = Math.max(50, Math.min(99, baseStats[key] + (bg.statMod[key] || 0)));
  }

  // Create AI drivers with team assignments
  const drivers = [];
  let aiIdx = 0;
  for (let t = 0; t < TEAMS.length; t++) {
    for (let d = 0; d < 2; d++) {
      if (t === teamIdx && d === 0) {
        // Player's slot
        drivers.push({
          name: name,
          teamId: team.id,
          teamIdx: teamIdx,
          isPlayer: true,
          stats: { ...stats },
          points: 0,
          positions: [],
          dnf: 0,
        });
      } else {
        const ai = AI_DRIVERS[aiIdx % AI_DRIVERS.length];
        aiIdx++;
        drivers.push({
          name: ai.name,
          teamId: TEAMS[t].id,
          teamIdx: t,
          isPlayer: false,
          stats: {
            pace: ai.pace,
            consistency: ai.consistency,
            wet: ai.wet,
            defend: ai.defend,
            attack: ai.attack,
            raceIQ: ai.raceIQ,
            skill: ai.skill,
          },
          points: 0,
          positions: [],
          dnf: 0,
        });
      }
    }
  }

  gameState = {
    playerName: name,
    background: backgroundId,
    teamId: team.id,
    teamIdx: teamIdx,
    season: 2025,
    currentRace: 0,
    stats: { ...stats },
    reputation: {
      teamTrust: 60,
      fanPopularity: 50,
      mediaRelation: 50,
      driverRespect: 50,
    },
    salary: team.salary[0], // millions per year
    contractYears: 1,
    drivers: drivers,
    teamStandings: TEAMS.map(t => ({ teamId: t.id, points: 0 })),
    raceResults: [],
    seasonNumber: 1,
    careerWins: 0,
    careerPodiums: 0,
    careerPoints: 0,
    careerPoles: 0,
    championships: 0,
    trainedThisWeek: false,
    // Achievement tracking
    achievements: [],
    rainWins: 0,
    comebackWin: 0,
    consecutiveFinishes: 0,
    seasonsAtCurrentTeam: 1,
    seasonPoints: 0,
    underdogPodium: 0,
    // Sponsor system
    sponsor: null,
    totalEarnings: 0,
  };

  return gameState;
}

// ============ ACHIEVEMENT CHECK ============

function checkAchievements() {
  const newlyUnlocked = [];
  ACHIEVEMENTS.forEach(ach => {
    if (!gameState.achievements.includes(ach.id) && ach.check(gameState)) {
      gameState.achievements.push(ach.id);
      newlyUnlocked.push(ach);
    }
  });
  return newlyUnlocked;
}

// ============ SPONSOR SYSTEM ============

function getSponsorOffers() {
  // Generate 3 random sponsor offers based on reputation
  const fanRep = gameState.reputation.fanPopularity;
  const shuffled = [...SPONSORS].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, 3).map(s => ({
    ...s,
    // Higher fan popularity = better salary terms
    salary: Math.round(s.salary * (0.8 + fanRep / 250) * 10) / 10,
  }));
}

function selectSponsor(sponsorId) {
  const offer = getSponsorOffers().find(s => s.id === sponsorId);
  if (!offer) return;

  // Remove old sponsor bonus
  if (gameState.sponsor && gameState.sponsor.bonus) {
    gameState.stats[gameState.sponsor.bonus] = clamp(gameState.stats[gameState.sponsor.bonus] - gameState.sponsor.amount, 50, 99);
  }

  gameState.sponsor = offer;

  // Apply new sponsor bonus
  if (offer.bonus) {
    gameState.stats[offer.bonus] = clamp(gameState.stats[offer.bonus] + offer.amount, 50, 99);
  }
}

// ============ GAME ENGINE ============

function getWeather() {
  const rand = Math.random();
  if (rand < 0.5) return WEATHER_TYPES[0]; // sunny
  if (rand < 0.75) return WEATHER_TYPES[1]; // cloudy
  if (rand < 0.9) return WEATHER_TYPES[2]; // light rain
  return WEATHER_TYPES[3]; // heavy rain
}

function simulateQualifying(raceIdx) {
  const track = TRACKS[raceIdx];
  const player = getPlayer();
  const results = [];

  gameState.drivers.forEach(driver => {
    let score;
    if (driver.isPlayer) {
      score = driver.stats.pace * 0.7 + getTeamCar() * 0.3;
      score += (Math.random() - 0.5) * 8;
    } else {
      const s = driver.stats;
      score = (s.pace || 75) * 0.6 + (s.skill || 75) * 0.1 + getCarForTeam(driver.teamIdx) * 0.3;
      score += (Math.random() - 0.5) * 8;
    }
    results.push({ driver, score });
  });

  results.sort((a, b) => b.score - a.score);

  const playerPos = results.findIndex(r => r.driver.isPlayer) + 1;
  return { results, playerPos };
}

function simulateRaceSegment(segIdx, totalSegs, driver, track, weather, modifiers) {
  const s = driver.stats;
  let score;

  if (driver.isPlayer) {
    score = s.pace * 0.22 +
            s.consistency * 0.18 +
            s.wet * weather.wetMod * 0.12 +
            s.raceIQ * 0.15 +
            s.attack * 0.1 +
            s.defend * 0.05 +
            getTeamCar() * 0.18;

    // Apply modifiers from decisions (amplified for player)
    if (modifiers) {
      score += (modifiers.pace || 0) * 3;
      score += (modifiers.raceIQ || 0) * 2.5;
      score += (modifiers.attack || 0) * 2;
      score += (modifiers.defend || 0) * 2;
      score += (modifiers.consistency || 0) * 2;
      score -= (modifiers.tireWear || 0) * (segIdx / totalSegs) * 1.5;
    }

    // Player gets a small skill bonus to make the game more fun
    score += 3;
  } else {
    score = (s.pace || 75) * 0.25 +
            (s.consistency || 75) * 0.2 +
            (s.wet || 75) * weather.wetMod * 0.15 +
            (s.raceIQ || 75) * 0.15 +
            (s.attack || 75) * 0.1 +
            (s.defend || 75) * 0.05 +
            getCarForTeam(driver.teamIdx) * 0.1;
  }

  // Randomness (reduced for player)
  const randRange = driver.isPlayer ? 8 : 12;
  score += (Math.random() - 0.5) * randRange;

  // Weather chaos
  score += (Math.random() - 0.5) * weather.chaosMod * 30;

  // DNF check (based on consistency, lower chance for player)
  const consistency = driver.isPlayer ? s.consistency : (s.consistency || 75);
  const dnfChance = driver.isPlayer
    ? Math.max(0.003, (100 - consistency) / 1200)
    : Math.max(0.005, (100 - consistency) / 1000);
  if (Math.random() < dnfChance && segIdx === totalSegs - 1) {
    return { score: -100, dnf: true };
  }

  return { score, dnf: false };
}

function simulateRace(raceIdx, allModifiers) {
  const track = TRACKS[raceIdx];
  const weather = gameState.currentWeather;
  const totalSegs = 5;
  const results = [];

  gameState.drivers.forEach(driver => {
    let totalScore = 0;
    let dnf = false;

    for (let seg = 0; seg < totalSegs; seg++) {
      let mods = null;
      if (driver.isPlayer && allModifiers) {
        // Apply segment-specific modifiers
        mods = {};
        allModifiers.forEach(m => {
          if (m.segment === seg || m.segment === 'any') {
            for (const key in m.effect) {
              mods[key] = (mods[key] || 0) + m.effect[key];
            }
          }
        });
      }

      const result = simulateRaceSegment(seg, totalSegs, driver, track, weather, mods);
      if (result.dnf) {
        dnf = true;
        break;
      }
      totalScore += result.score;
    }

    results.push({ driver, score: totalScore, dnf });
  });

  // Sort by score (DNF drivers go to bottom)
  results.sort((a, b) => {
    if (a.dnf && !b.dnf) return 1;
    if (!a.dnf && b.dnf) return -1;
    return b.score - a.score;
  });

  // Assign positions
  const classified = [];
  results.forEach((r, i) => {
    classified.push({
      ...r,
      position: r.dnf ? 0 : i + 1,
    });
  });

  return classified;
}

function applyRaceResults(raceResults) {
  // Update points
  raceResults.forEach(r => {
    if (!r.dnf && r.position > 0 && r.position <= 10) {
      const pts = POINTS_SYSTEM[r.position - 1];
      r.driver.points += pts;
      // Update team standings
      const teamStanding = gameState.teamStandings.find(ts => ts.teamId === r.driver.teamId);
      if (teamStanding) teamStanding.points += pts;
    }
    r.driver.positions.push(r.position);
    if (r.dnf) r.driver.dnf++;
  });

  // Update player career stats and achievement tracking
  const playerResult = raceResults.find(r => r.driver.isPlayer);
  if (playerResult) {
    const playerPts = (!playerResult.dnf && playerResult.position <= 10) ? POINTS_SYSTEM[playerResult.position - 1] : 0;

    if (!playerResult.dnf) {
      gameState.careerPoints += playerPts;
      gameState.seasonPoints += playerPts;
      gameState.consecutiveFinishes++;

      if (playerResult.position === 1) {
        gameState.careerWins++;
        // Rain win achievement tracking
        if (gameState.currentWeather && gameState.currentWeather.wetMod > 0.2) {
          gameState.rainWins++;
        }
        // Comeback win (started P10 or worse)
        if (raceState && raceState.qualifyingResult && raceState.qualifyingResult.playerPos >= 10) {
          gameState.comebackWin++;
        }
      }
      if (playerResult.position <= 3) {
        gameState.careerPodiums++;
        // Underdog podium (team in bottom 5)
        if (gameState.teamIdx >= 5) {
          gameState.underdogPodium++;
        }
      }
    } else {
      gameState.consecutiveFinishes = 0;
    }

    gameState.raceResults.push({
      raceIdx: gameState.currentRace,
      position: playerResult.position,
      dnf: playerResult.dnf,
      points: playerPts,
    });

    // Check for new achievements
    const newAchievements = checkAchievements();
    if (newAchievements.length > 0) {
      gameState.newAchievements = newAchievements;
    }
  }
}

function applyDecisionEffects(effects) {
  if (!effects) return;

  // Reputation changes
  if (effects.teamTrust) gameState.reputation.teamTrust = clamp(gameState.reputation.teamTrust + effects.teamTrust, 0, 100);
  if (effects.mediaRep) gameState.reputation.mediaRelation = clamp(gameState.reputation.mediaRelation + effects.mediaRep, 0, 100);
  if (effects.fanPop) gameState.reputation.fanPopularity = clamp(gameState.reputation.fanPopularity + effects.fanPop, 0, 100);
  if (effects.driverRep) gameState.reputation.driverRespect = clamp(gameState.reputation.driverRespect + effects.driverRep, 0, 100);

  // Stat micro-changes from race decisions (very small)
  const statKeys = ['pace', 'consistency', 'wet', 'defend', 'attack', 'raceIQ'];
  statKeys.forEach(key => {
    if (effects[key]) {
      gameState.stats[key] = clamp(gameState.stats[key] + Math.round(effects[key] * 0.3), 50, 99);
    }
  });
}

function train(statKey) {
  if (gameState.trainedThisWeek) return false;

  const gain = 4 + Math.floor(Math.random() * 4); // 4-7
  const otherKeys = Object.keys(gameState.stats).filter(k => k !== statKey);
  const lossKey = otherKeys[Math.floor(Math.random() * otherKeys.length)];

  gameState.stats[statKey] = clamp(gameState.stats[statKey] + gain, 50, 99);
  gameState.stats[lossKey] = clamp(gameState.stats[lossKey] - 1, 50, 99);
  gameState.trainedThisWeek = true;

  return { gained: statKey, gain, lost: lossKey };
}

function generateContractOffers() {
  const player = getPlayer();
  const avgPos = gameState.raceResults.length > 0
    ? gameState.raceResults.reduce((sum, r) => sum + (r.dnf ? 20 : r.position), 0) / gameState.raceResults.length
    : 10;

  const offers = [];
  const numOffers = Math.max(2, Math.min(5, Math.round(6 - avgPos / 5)));

  // Current team always offers
  const currentTeam = TEAMS[gameState.teamIdx];
  const baseSalary = currentTeam.salary[0] + (currentTeam.salary[1] - currentTeam.salary[0]) * (1 - avgPos / 20);
  offers.push({
    team: currentTeam,
    salary: Math.round(baseSalary * (0.9 + Math.random() * 0.3) * 10) / 10,
    years: Math.random() > 0.5 ? 2 : 1,
    isCurrent: true,
  });

  // Other teams
  const eligibleTeams = TEAMS.filter((t, i) => i !== gameState.teamIdx);
  const shuffled = eligibleTeams.sort(() => Math.random() - 0.5);

  for (let i = 0; i < numOffers - 1 && i < shuffled.length; i++) {
    const team = shuffled[i];
    // Better performing teams offer less (player is less proven)
    const performanceFactor = Math.max(0.3, 1 - avgPos / 25);
    const teamFactor = team.car / 95;
    const salary = Math.round((team.salary[0] + (team.salary[1] - team.salary[0]) * performanceFactor * teamFactor) * 10) / 10;

    offers.push({
      team,
      salary: Math.max(1, salary),
      years: 1 + Math.floor(Math.random() * 2),
      isCurrent: false,
    });
  }

  return offers;
}

function acceptContract(offer) {
  const teamIdx = TEAMS.findIndex(t => t.id === offer.team.id);
  gameState.teamId = offer.team.id;
  gameState.teamIdx = teamIdx;
  gameState.salary = offer.salary;
  gameState.contractYears = offer.years;

  // Update player's team in drivers array
  const player = getPlayer();
  player.teamId = offer.team.id;
  player.teamIdx = teamIdx;

  // Reputation effects
  if (offer.isCurrent) {
    gameState.reputation.teamTrust = clamp(gameState.reputation.teamTrust + 5, 0, 100);
  } else {
    gameState.reputation.teamTrust = 50; // Reset trust with new team
  }
}

function startNewSeason() {
  const oldTeamId = gameState.teamId;
  gameState.season++;
  gameState.currentRace = 0;
  gameState.seasonNumber++;
  gameState.raceResults = [];
  gameState.trainedThisWeek = false;
  gameState.seasonPoints = 0;

  // Track team loyalty
  if (gameState.teamId === oldTeamId) {
    gameState.seasonsAtCurrentTeam++;
  } else {
    gameState.seasonsAtCurrentTeam = 1;
  }

  // Reset points
  gameState.drivers.forEach(d => {
    d.points = 0;
    d.positions = [];
    d.dnf = 0;
  });
  gameState.teamStandings.forEach(ts => ts.points = 0);

  // Age effect - slight decline for older drivers, growth for younger
  gameState.drivers.forEach(d => {
    if (!d.isPlayer) {
      const growth = (Math.random() - 0.4) * 2;
      for (const key in d.stats) {
        if (key !== 'skill') {
          d.stats[key] = clamp((d.stats[key] || 75) + growth, 55, 98);
        }
      }
    }
  });

  // Small reputation decay
  gameState.reputation.teamTrust = clamp(gameState.reputation.teamTrust - 3, 0, 100);
  gameState.reputation.fanPopularity = clamp(gameState.reputation.fanPopularity - 2, 0, 100);

  // Check achievements at season start
  checkAchievements();
}

function checkChampion() {
  if (gameState.currentRace < TRACKS.length - 1) return false;
  const sorted = [...gameState.drivers].sort((a, b) => b.points - a.points);
  return sorted[0].isPlayer;
}

// ============ HELPERS ============

function getPlayer() {
  return gameState.drivers.find(d => d.isPlayer);
}

function getTeamCar() {
  return TEAMS[gameState.teamIdx].car;
}

function getCarForTeam(teamIdx) {
  return TEAMS[teamIdx].car;
}

function clamp(val, min, max) {
  return Math.max(min, Math.min(max, val));
}

function getDriverStandings() {
  return [...gameState.drivers]
    .sort((a, b) => b.points - a.points)
    .map((d, i) => ({ ...d, position: i + 1 }));
}

function getTeamStandings() {
  return [...gameState.teamStandings]
    .sort((a, b) => b.points - a.points)
    .map((ts, i) => ({
      ...ts,
      team: TEAMS.find(t => t.id === ts.teamId),
      position: i + 1,
    }));
}

function generateNews(raceIdx) {
  const news = [];
  const numNews = 1 + Math.floor(Math.random() * 2);
  for (let i = 0; i < numNews; i++) {
    const template = NEWS_TEMPLATES[Math.floor(Math.random() * NEWS_TEMPLATES.length)];
    const team = TEAMS[Math.floor(Math.random() * TEAMS.length)];
    news.push({
      title: template.title,
      body: template.body(team.short),
    });
  }
  return news;
}

// ============ SAVE / LOAD ============

function saveGame() {
  try {
    localStorage.setItem('f1_career_save', JSON.stringify(gameState));
    return true;
  } catch (e) {
    return false;
  }
}

function loadGame() {
  try {
    const data = localStorage.getItem('f1_career_save');
    if (data) {
      gameState = JSON.parse(data);
      // Backward compatibility: add missing fields for old saves
      if (!gameState.achievements) gameState.achievements = [];
      if (!gameState.careerPoles) gameState.careerPoles = 0;
      if (gameState.rainWins === undefined) gameState.rainWins = 0;
      if (gameState.comebackWin === undefined) gameState.comebackWin = 0;
      if (gameState.consecutiveFinishes === undefined) gameState.consecutiveFinishes = 0;
      if (gameState.seasonsAtCurrentTeam === undefined) gameState.seasonsAtCurrentTeam = 1;
      if (gameState.seasonPoints === undefined) gameState.seasonPoints = 0;
      if (gameState.underdogPodium === undefined) gameState.underdogPodium = 0;
      if (gameState.sponsor === undefined) gameState.sponsor = null;
      if (gameState.totalEarnings === undefined) gameState.totalEarnings = 0;
      return true;
    }
    return false;
  } catch (e) {
    return false;
  }
}

function hasSaveGame() {
  return localStorage.getItem('f1_career_save') !== null;
}

function deleteSave() {
  localStorage.removeItem('f1_career_save');
}

// ============ UI CONTROLLER ============

let currentScreen = 'start';
let raceState = null; // temporary state during race weekend

function showScreen(screenId) {
  document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
  const screen = document.getElementById(screenId);
  if (screen) {
    screen.classList.add('active');
    currentScreen = screenId;
  }
}

function showToast(message, type = 'info') {
  const existing = document.querySelector('.toast');
  if (existing) existing.remove();

  const toast = document.createElement('div');
  toast.className = `toast toast-${type}`;
  toast.textContent = message;
  document.body.appendChild(toast);
  setTimeout(() => toast.remove(), 3000);
}

// ============ RENDER FUNCTIONS ============

function renderStartScreen() {
  const hasSave = hasSaveGame();
  document.getElementById('start-screen').innerHTML = `
    <div class="start-hero">
      <h1 class="font-display">F1 职业生涯</h1>
      <p class="subtitle">职业生涯模拟器</p>
      <div class="start-buttons">
        <button class="btn btn-primary btn-lg" onclick="renderBackgroundSelect()">
          🏎️ 开始新职业生涯
        </button>
        ${hasSave ? `
          <button class="btn btn-secondary btn-lg" onclick="loadAndResume()">
            📂 继续职业生涯
          </button>
          <button class="btn btn-secondary btn-sm" onclick="if(confirm('确定要删除存档吗？')){deleteSave();renderStartScreen();}">
            🗑️ 删除存档
          </button>
        ` : ''}
      </div>
    </div>
    <div class="footer">
      <p>F1 Career Simulator v1.0</p>
      <p style="margin-top:4px">一款文字模拟游戏 · 数据基于2025赛季</p>
    </div>
  `;
}

function renderBackgroundSelect() {
  showScreen('background-screen');
  let selectedBg = null;

  const container = document.getElementById('background-screen');
  container.innerHTML = `
    <div class="section-header">
      <h2 class="font-display">选择你的背景故事</h2>
    </div>
    <p class="text-muted" style="margin-bottom:20px">每个背景都会影响你的初始属性，下一步可以选择效力车队</p>
    <div class="bg-grid" id="bg-grid">
      ${BACKGROUNDS.map(bg => `
        <div class="bg-card" data-bg="${bg.id}">
          <div class="bg-icon">${bg.icon}</div>
          <div class="bg-name">${bg.name}</div>
          <div class="bg-desc">${bg.desc}</div>
          <div class="bg-stats">
            ${bg.tags.map((tag, i) => `<span class="stat-tag ${bg.tagTypes[i]}">${tag}</span>`).join('')}
          </div>
        </div>
      `).join('')}
    </div>
    <div class="input-group">
      <label>车手姓名</label>
      <input type="text" id="driver-name-input" placeholder="输入你的名字..." maxlength="20" value="">
    </div>
    <button class="btn btn-primary btn-lg" id="confirm-bg-btn" disabled onclick="confirmBackground()">
      确认并开始职业生涯
    </button>
  `;

  // Event listeners
  container.querySelectorAll('.bg-card').forEach(card => {
    card.addEventListener('click', () => {
      container.querySelectorAll('.bg-card').forEach(c => c.classList.remove('selected'));
      card.classList.add('selected');
      selectedBg = card.dataset.bg;
      updateConfirmBtn();
    });
  });

  function updateConfirmBtn() {
    const name = document.getElementById('driver-name-input').value.trim();
    document.getElementById('confirm-bg-btn').disabled = !(selectedBg && name.length > 0);
  }

  document.getElementById('driver-name-input').addEventListener('input', updateConfirmBtn);
}

function confirmBackground() {
  const name = document.getElementById('driver-name-input').value.trim();
  const selectedCard = document.querySelector('.bg-card.selected');
  if (!name || !selectedCard) return;
  const bgId = selectedCard.dataset.bg;

  // Go to team selection
  renderTeamSelect(name, bgId);
}

function renderTeamSelect(name, bgId) {
  showScreen('background-screen');
  const bg = BACKGROUNDS.find(b => b.id === bgId);

  const container = document.getElementById('background-screen');
  container.innerHTML = `
    <div class="section-header">
      <h2 class="font-display">选择你的车队</h2>
    </div>
    <p class="text-muted" style="margin-bottom:8px">背景故事「${bg.icon} ${bg.name}」将影响你的初始属性</p>
    <p class="text-muted" style="margin-bottom:20px;font-size:0.8rem;">不同车队的赛车性能差异很大，强队更容易获胜，但车迷期望也更高</p>

    <div class="team-select-grid">
      ${TEAMS.map((team, idx) => {
        const difficulty = idx <= 1 ? '简单' : idx <= 3 ? '普通' : idx <= 6 ? '困难' : '专家';
        const difficultyColor = idx <= 1 ? 'var(--green)' : idx <= 3 ? 'var(--blue)' : idx <= 6 ? 'var(--orange)' : 'var(--f1-red)';
        return `
          <div class="team-select-card" data-team="${idx}">
            <div class="team-select-header">
              <span class="team-badge ${team.css}">${team.short}</span>
              <span style="font-size:0.7rem;color:${difficultyColor};font-weight:600;">${difficulty}</span>
            </div>
            <div style="font-size:0.8rem;color:var(--text-secondary);margin:6px 0;">${team.name}</div>
            <div class="team-car-bar">
              <div class="team-car-fill" style="width:${team.car}%"></div>
            </div>
            <div style="display:flex;justify-content:space-between;font-size:0.75rem;">
              <span style="color:var(--text-muted);">赛车性能</span>
              <span style="font-family:'Orbitron';font-weight:700;color:${difficultyColor};">${team.car}</span>
            </div>
            <div style="font-size:0.7rem;color:var(--text-muted);margin-top:4px;">💰 $${team.salary[0]}-${team.salary[1]}M/年</div>
          </div>
        `;
      }).join('')}
    </div>

    <div class="card" style="margin-top:16px;padding:14px;display:flex;align-items:center;gap:10px;">
      <span style="font-size:1.2rem;">${bg.icon}</span>
      <div style="flex:1;">
        <div style="font-size:0.85rem;font-weight:600;">${bg.name}</div>
        <div style="font-size:0.75rem;color:var(--text-secondary);">${bg.tags.map(t => t).join(' · ')}</div>
      </div>
    </div>

    <button class="btn btn-primary btn-lg" id="confirm-team-btn" disabled onclick="confirmTeamSelect('${name}', '${bgId}')">
      确认并开始职业生涯 →
    </button>
    <button class="btn" style="margin-top:8px;background:transparent;color:var(--text-secondary);" onclick="renderBackgroundSelect()">
      ← 返回背景选择
    </button>
  `;

  container.querySelectorAll('.team-select-card').forEach(card => {
    card.addEventListener('click', () => {
      container.querySelectorAll('.team-select-card').forEach(c => c.classList.remove('selected'));
      card.classList.add('selected');
      document.getElementById('confirm-team-btn').disabled = false;
    });
  });
}

function confirmTeamSelect(name, bgId) {
  const selectedCard = document.querySelector('.team-select-card.selected');
  if (!selectedCard) return;
  const teamIdx = parseInt(selectedCard.dataset.team);
  createNewGame(name, bgId, teamIdx);
  showScreen('hub-screen');
  renderHub();
  saveGame();
  showToast('欢迎来到F1！', 'success');
}

function renderHub() {
  showScreen('hub-screen');
  const player = getPlayer();
  const team = TEAMS[gameState.teamIdx];
  const standings = getDriverStandings();
  const playerStanding = standings.find(d => d.isPlayer);
  const nextRace = gameState.currentRace < TRACKS.length ? TRACKS[gameState.currentRace] : null;

  document.getElementById('hub-screen').innerHTML = `
    <div class="top-bar">
      <div class="driver-info">
        <span class="driver-name">${gameState.playerName}</span>
        <span class="team-badge ${team.css}">${team.short}</span>
      </div>
      <div class="season-info">
        <div class="year">${gameState.season}</div>
        <div>第 ${gameState.seasonNumber} 个赛季 · 第 ${gameState.currentRace + 1}/${TRACKS.length} 站</div>
      </div>
    </div>

    ${nextRace ? `
      <div class="card" style="border-left: 3px solid var(--f1-red);">
        <div style="display:flex;justify-content:space-between;align-items:center;">
          <div>
            <div style="font-size:0.75rem;color:var(--f1-red);font-weight:600;letter-spacing:1px;margin-bottom:4px;">下一站</div>
            <div style="font-weight:700;font-size:1.1rem;">${nextRace.name}</div>
            <div style="font-size:0.85rem;color:var(--text-secondary);">${nextRace.country}</div>
          </div>
          <div style="text-align:right;">
            <div style="font-size:0.8rem;color:var(--text-secondary);">积分榜排名</div>
            <div style="font-family:'Orbitron';font-size:1.5rem;font-weight:800;color:var(--f1-red);">P${playerStanding ? playerStanding.position : '-'}</div>
            <div style="font-size:0.8rem;color:var(--text-secondary);">${player ? player.points : 0} 分</div>
          </div>
        </div>
      </div>
    ` : ''}

    <div class="hub-grid">
      <div class="hub-card" onclick="renderTraining()">
        <div class="hub-icon">🏋️</div>
        <div class="hub-title">训练</div>
        <div class="hub-desc">${gameState.trainedThisWeek ? '本周已训练' : '提升一项属性'}</div>
      </div>
      <div class="hub-card" onclick="renderDriverProfile()">
        <div class="hub-icon">👤</div>
        <div class="hub-title">车手档案</div>
        <div class="hub-desc">查看属性和声望</div>
      </div>
      <div class="hub-card" onclick="renderStandings()">
        <div class="hub-icon">📊</div>
        <div class="hub-title">积分榜</div>
        <div class="hub-desc">车手和车队排名</div>
      </div>
      <div class="hub-card" onclick="renderCalendar()">
        <div class="hub-icon">📅</div>
        <div class="hub-title">赛历</div>
        <div class="hub-desc">查看本赛季赛程</div>
      </div>
      <div class="hub-card" onclick="renderAchievements()">
        <div class="hub-icon">🏅</div>
        <div class="hub-title">成就</div>
        <div class="hub-desc">${gameState.achievements.length}/${ACHIEVEMENTS.length} 已解锁</div>
      </div>
      <div class="hub-card" onclick="renderSponsor()">
        <div class="hub-icon">💰</div>
        <div class="hub-title">赞助商</div>
        <div class="hub-desc">${gameState.sponsor ? gameState.sponsor.name : '尚未签约'}</div>
      </div>
    </div>

    ${gameState.currentRace < TRACKS.length ? `
      <button class="btn btn-primary btn-lg" onclick="startRaceWeekend()" style="margin-top:8px;">
        🏁 进入比赛周末
      </button>
    ` : `
      <button class="btn btn-primary btn-lg" onclick="endSeason()" style="margin-top:8px;">
        🏆 赛季结束
      </button>
    `}
  `;
}

function renderTraining() {
  showScreen('training-screen');
  const trained = gameState.trainedThisWeek;

  document.getElementById('training-screen').innerHTML = `
    <button class="back-btn" onclick="renderHub()">← 返回主页</button>
    <div class="section-header">
      <h2 class="font-display">🏋️ 训练中心</h2>
    </div>

    ${trained ? `
      <div class="card" style="text-align:center;padding:40px;">
        <div style="font-size:3rem;margin-bottom:12px;">✅</div>
        <h3>本周训练已完成</h3>
        <p class="text-muted" style="margin-top:8px;">每站比赛前只能训练一次</p>
      </div>
    ` : `
      <p class="text-muted" style="margin-bottom:16px;">选择训练重点。提升一项属性的同时，另一项会略微下降。</p>
      <div id="training-list">
        ${Object.keys(gameState.stats).map(key => `
          <div class="training-option" data-stat="${key}" onclick="selectTraining('${key}')">
            <div class="train-name">${STAT_NAMES[key]}</div>
            <div class="train-effect">
              当前: <strong style="color:${STAT_COLORS[key]}">${gameState.stats[key]}</strong>
              → 预计提升至 <strong style="color:var(--green)">${gameState.stats[key] + 4}~${gameState.stats[key] + 7}</strong>
              · 随机另一属性 -1
            </div>
          </div>
        `).join('')}
      </div>
    `}
  `;
}

function selectTraining(statKey) {
  const result = train(statKey);
  if (result) {
    showToast(`${STAT_NAMES[result.gained]} +${result.gain}，${STAT_NAMES[result.lost]} -1`, 'success');
    renderTraining();
    saveGame();
  }
}

function renderDriverProfile() {
  showScreen('driver-screen');
  const player = getPlayer();
  const team = TEAMS[gameState.teamIdx];
  const bg = BACKGROUNDS.find(b => b.id === gameState.background);

  document.getElementById('driver-screen').innerHTML = `
    <button class="back-btn" onclick="renderHub()">← 返回主页</button>
    <div class="section-header">
      <h2 class="font-display">👤 车手档案</h2>
    </div>

    <div class="card">
      <div style="display:flex;justify-content:space-between;align-items:start;margin-bottom:16px;">
        <div>
          <h2 style="margin-bottom:4px;">${gameState.playerName}</h2>
          <span class="team-badge ${team.css}">${team.short}</span>
          <span class="badge badge-red" style="margin-left:8px;">${bg.icon} ${bg.name}</span>
        </div>
        <div style="text-align:right;">
          <div style="font-size:0.75rem;color:var(--text-muted);">赛季</div>
          <div style="font-family:'Orbitron';font-weight:700;">${gameState.season}</div>
        </div>
      </div>

      <div class="divider"></div>

      <h3 style="margin-bottom:12px;font-size:0.9rem;color:var(--text-secondary);">能力属性</h3>
      ${Object.keys(gameState.stats).map(key => `
        <div class="stat-row">
          <span class="stat-label">${STAT_NAMES[key].split(' ')[1]}</span>
          <div class="stat-bar-bg">
            <div class="stat-bar-fill" style="width:${gameState.stats[key]}%;background:${STAT_COLORS[key]}"></div>
          </div>
          <span class="stat-value" style="color:${STAT_COLORS[key]}">${gameState.stats[key]}</span>
        </div>
      `).join('')}

      <div class="divider"></div>

      <h3 style="margin-bottom:12px;font-size:0.9rem;color:var(--text-secondary);">声望</h3>
      <div class="rep-bar">
        <span class="rep-label">车队信任</span>
        <div class="rep-track">
          <div class="rep-fill" style="width:${gameState.reputation.teamTrust}%;background:var(--blue);"></div>
        </div>
        <span style="width:30px;text-align:right;font-size:0.8rem;font-weight:600;">${gameState.reputation.teamTrust}</span>
      </div>
      <div class="rep-bar">
        <span class="rep-label">车迷人气</span>
        <div class="rep-track">
          <div class="rep-fill" style="width:${gameState.reputation.fanPopularity}%;background:var(--green);"></div>
        </div>
        <span style="width:30px;text-align:right;font-size:0.8rem;font-weight:600;">${gameState.reputation.fanPopularity}</span>
      </div>
      <div class="rep-bar">
        <span class="rep-label">媒体关系</span>
        <div class="rep-track">
          <div class="rep-fill" style="width:${gameState.reputation.mediaRelation}%;background:var(--yellow);"></div>
        </div>
        <span style="width:30px;text-align:right;font-size:0.8rem;font-weight:600;">${gameState.reputation.mediaRelation}</span>
      </div>
      <div class="rep-bar">
        <span class="rep-label">车手尊重</span>
        <div class="rep-track">
          <div class="rep-fill" style="width:${gameState.reputation.driverRespect}%;background:var(--purple);"></div>
        </div>
        <span style="width:30px;text-align:right;font-size:0.8rem;font-weight:600;">${gameState.reputation.driverRespect}</span>
      </div>

      <div class="divider"></div>

      <h3 style="margin-bottom:12px;font-size:0.9rem;color:var(--text-secondary);">生涯统计</h3>
      <div style="display:grid;grid-template-columns:repeat(4,1fr);gap:12px;text-align:center;">
        <div>
          <div style="font-family:'Orbitron';font-size:1.5rem;font-weight:800;color:var(--f1-red);">${gameState.championships}</div>
          <div style="font-size:0.75rem;color:var(--text-muted);">世界冠军</div>
        </div>
        <div>
          <div style="font-family:'Orbitron';font-size:1.5rem;font-weight:800;">${gameState.careerWins}</div>
          <div style="font-size:0.75rem;color:var(--text-muted);">分站冠军</div>
        </div>
        <div>
          <div style="font-family:'Orbitron';font-size:1.5rem;font-weight:800;">${gameState.careerPodiums}</div>
          <div style="font-size:0.75rem;color:var(--text-muted);">登上领奖台</div>
        </div>
        <div>
          <div style="font-family:'Orbitron';font-size:1.5rem;font-weight:800;">${gameState.careerPoints}</div>
          <div style="font-size:0.75rem;color:var(--text-muted);">生涯积分</div>
        </div>
      </div>

      <div style="display:grid;grid-template-columns:repeat(3,1fr);gap:12px;text-align:center;margin-top:12px;">
        <div>
          <div style="font-family:'Orbitron';font-size:1.2rem;font-weight:700;color:var(--gold);">${gameState.careerPoles || 0}</div>
          <div style="font-size:0.75rem;color:var(--text-muted);">杆位</div>
        </div>
        <div>
          <div style="font-family:'Orbitron';font-size:1.2rem;font-weight:700;">${gameState.achievements.length}</div>
          <div style="font-size:0.75rem;color:var(--text-muted);">成就解锁</div>
        </div>
        <div>
          <div style="font-family:'Orbitron';font-size:1.2rem;font-weight:700;">${gameState.consecutiveFinishes}</div>
          <div style="font-size:0.75rem;color:var(--text-muted);">连续完赛</div>
        </div>
      </div>

      <div class="divider"></div>
      <div style="display:flex;justify-content:space-between;font-size:0.85rem;color:var(--text-secondary);">
        <span>年薪: <strong style="color:var(--green);">$${gameState.salary}M</strong></span>
        ${gameState.sponsor ? `<span>赞助商: <strong style="color:var(--green);">${gameState.sponsor.icon} ${gameState.sponsor.name}</strong></span>` : '<span>赞助商: <strong style="color:var(--text-muted);">无</strong></span>'}
        <span>合同: <strong>${gameState.contractYears}年</strong></span>
      </div>
    </div>
  `;
}

function renderStandings() {
  showScreen('standings-screen');
  const driverStandings = getDriverStandings();
  const teamStandings = getTeamStandings();

  document.getElementById('standings-screen').innerHTML = `
    <button class="back-btn" onclick="renderHub()">← 返回主页</button>
    <div class="section-header">
      <h2 class="font-display">📊 积分榜</h2>
    </div>

    <div class="card">
      <h3 style="margin-bottom:12px;font-size:0.9rem;color:var(--text-secondary);">车手积分榜</h3>
      <table class="standings-table">
        <thead>
          <tr>
            <th class="pos-col">#</th>
            <th>车手</th>
            <th>车队</th>
            <th class="pts-col">积分</th>
          </tr>
        </thead>
        <tbody>
          ${driverStandings.map(d => {
            const team = TEAMS.find(t => t.id === d.teamId);
            const posClass = d.position <= 3 ? `pos-${d.position}` : '';
            return `
              <tr class="${d.isPlayer ? 'player-row' : ''}">
                <td class="pos-col ${posClass}">${d.position}</td>
                <td>${d.name} ${d.isPlayer ? '⭐' : ''}</td>
                <td><span class="team-badge ${team.css}" style="font-size:0.7rem;padding:2px 6px;">${team.short}</span></td>
                <td class="pts-col">${d.points}</td>
              </tr>
            `;
          }).join('')}
        </tbody>
      </table>
    </div>

    <div class="card">
      <h3 style="margin-bottom:12px;font-size:0.9rem;color:var(--text-secondary);">车队积分榜</h3>
      <table class="standings-table">
        <thead>
          <tr>
            <th class="pos-col">#</th>
            <th>车队</th>
            <th class="pts-col">积分</th>
          </tr>
        </thead>
        <tbody>
          ${teamStandings.map(ts => {
            const posClass = ts.position <= 3 ? `pos-${ts.position}` : '';
            const isPlayerTeam = ts.teamId === gameState.teamId;
            return `
              <tr class="${isPlayerTeam ? 'player-row' : ''}">
                <td class="pos-col ${posClass}">${ts.position}</td>
                <td><span class="team-badge ${ts.team.css}" style="font-size:0.75rem;padding:3px 8px;">${ts.team.short}</span></td>
                <td class="pts-col">${ts.points}</td>
              </tr>
            `;
          }).join('')}
        </tbody>
      </table>
    </div>
  `;
}

function renderCalendar() {
  showScreen('calendar-screen');

  document.getElementById('calendar-screen').innerHTML = `
    <button class="back-btn" onclick="renderHub()">← 返回主页</button>
    <div class="section-header">
      <h2 class="font-display">📅 ${gameState.season} 赛季赛程</h2>
    </div>

    <div class="card" style="padding:16px;">
      ${TRACKS.map((track, i) => {
        const result = gameState.raceResults.find(r => r.raceIdx === i);
        let statusHtml = '';
        if (result) {
          if (result.dnf) {
            statusHtml = '<span class="badge badge-red">DNF</span>';
          } else {
            const posClass = result.position <= 3 ? `badge-gold` : result.position <= 10 ? 'badge-green' : 'badge-blue';
            statusHtml = `<span class="badge ${posClass}">P${result.position}</span>`;
          }
        } else if (i === gameState.currentRace) {
          statusHtml = '<span class="badge badge-red">下一站</span>';
        }

        return `
          <div style="display:flex;justify-content:space-between;align-items:center;padding:10px 0;border-bottom:1px solid rgba(255,255,255,0.03);${i === gameState.currentRace ? 'background:rgba(225,6,0,0.05);margin:0 -16px;padding:10px 16px;' : ''}">
            <div style="display:flex;align-items:center;gap:12px;">
              <span style="font-family:'Orbitron';font-size:0.75rem;color:var(--text-muted);width:24px;">${String(i + 1).padStart(2, '0')}</span>
              <div>
                <div style="font-weight:${i === gameState.currentRace ? '700' : '500'};font-size:0.9rem;">${track.name} ${track.sprint ? '<span style="font-size:0.65rem;color:var(--purple);background:rgba(168,85,247,0.15);padding:1px 5px;border-radius:3px;margin-left:4px;">冲刺赛</span>' : ''}</div>
                <div style="font-size:0.75rem;color:var(--text-muted);">${track.country}</div>
              </div>
            </div>
            ${statusHtml}
          </div>
        `;
      }).join('')}
    </div>
  `;
}

// ============ ACHIEVEMENTS & SPONSORS ============

function renderAchievements() {
  showScreen('achievements-screen');

  document.getElementById('achievements-screen').innerHTML = `
    <button class="back-btn" onclick="renderHub()">← 返回主页</button>
    <div class="section-header">
      <h2 class="font-display">🏅 成就</h2>
      <span class="badge badge-gold">${gameState.achievements.length}/${ACHIEVEMENTS.length}</span>
    </div>

    <div style="display:grid;grid-template-columns:1fr;gap:10px;">
      ${ACHIEVEMENTS.map(ach => {
        const unlocked = gameState.achievements.includes(ach.id);
        return `
          <div class="card" style="padding:16px;display:flex;align-items:center;gap:14px;${unlocked ? 'border-color:var(--gold);' : 'opacity:0.5;'}">
            <span style="font-size:2rem;${unlocked ? '' : 'filter:grayscale(1);'}">${ach.icon}</span>
            <div style="flex:1;">
              <div style="font-weight:700;${unlocked ? 'color:var(--gold);' : ''}">${ach.name}</div>
              <div style="font-size:0.8rem;color:var(--text-secondary);">${ach.desc}</div>
            </div>
            ${unlocked ? '<span class="badge badge-gold">已解锁</span>' : '<span class="badge" style="background:rgba(255,255,255,0.05);color:var(--text-muted);">未解锁</span>'}
          </div>
        `;
      }).join('')}
    </div>
  `;
}

function renderSponsor() {
  showScreen('sponsor-screen');
  const currentSponsor = gameState.sponsor;
  const offers = getSponsorOffers();

  document.getElementById('sponsor-screen').innerHTML = `
    <button class="back-btn" onclick="renderHub()">← 返回主页</button>
    <div class="section-header">
      <h2 class="font-display">💰 赞助商</h2>
    </div>

    ${currentSponsor ? `
      <div class="card" style="border-color:var(--green);">
        <div style="font-size:0.8rem;color:var(--green);font-weight:600;margin-bottom:8px;">当前赞助商</div>
        <div style="display:flex;align-items:center;gap:12px;">
          <span style="font-size:2rem;">${currentSponsor.icon}</span>
          <div>
            <div style="font-weight:700;">${currentSponsor.name}</div>
            <div style="font-size:0.85rem;color:var(--text-secondary);">${currentSponsor.desc}</div>
          </div>
        </div>
      </div>
    ` : `
      <div class="card" style="text-align:center;padding:30px;">
        <div style="font-size:2.5rem;margin-bottom:8px;">🤝</div>
        <p class="text-muted">你还没有赞助商。选择一个赞助商来获得额外收入和属性加成。</p>
      </div>
    `}

    <h3 style="margin:20px 0 12px;font-size:0.9rem;color:var(--text-secondary);">可签约赞助商</h3>
    <div style="display:grid;gap:10px;">
      ${offers.map(offer => `
        <div class="contract-card" onclick="confirmSponsor('${offer.id}')">
          <div class="contract-team">
            <span style="font-size:1.5rem;margin-right:8px;">${offer.icon}</span>
            ${offer.name}
            ${currentSponsor && currentSponsor.id === offer.id ? '<span class="badge badge-green" style="margin-left:8px;">当前</span>' : ''}
          </div>
          <div class="contract-details">
            <div class="contract-detail">💰 年薪加成: <span class="value">+$${offer.salary}M</span></div>
            ${offer.bonus ? `<div class="contract-detail">📈 属性加成: <span class="value">${STAT_NAMES[offer.bonus].split(' ')[1]} +${offer.amount}</span></div>` : '<div class="contract-detail">📈 无属性加成</div>'}
          </div>
        </div>
      `).join('')}
    </div>

    <p style="font-size:0.8rem;color:var(--text-muted);margin-top:16px;text-align:center;">
      更换赞助商会替换当前赞助商的加成效果
    </p>
  `;
}

function confirmSponsor(sponsorId) {
  selectSponsor(sponsorId);
  showToast(`已签约 ${gameState.sponsor.name}！`, 'success');
  renderSponsor();
  saveGame();
}

// ============ RACE WEEKEND ============

function startRaceWeekend() {
  const raceIdx = gameState.currentRace;
  const track = TRACKS[raceIdx];
  const weather = getWeather();
  gameState.currentWeather = weather;

  raceState = {
    raceIdx,
    track,
    weather,
    phase: 'news', // news, qualifying, race, results
    modifiers: [],
    qualifyingResult: null,
    raceResult: null,
    currentDecisionIdx: 0,
    decisions: getRaceDecisions(raceIdx, gameState),
    news: generateNews(raceIdx),
  };

  renderRaceNews();
}

function renderRaceNews() {
  showScreen('race-screen');
  const { track, weather, news } = raceState;

  document.getElementById('race-screen').innerHTML = `
    <div class="race-header">
      <div class="race-round">第 ${raceState.raceIdx + 1} 站 · ${gameState.season} 赛季</div>
      <div class="race-name">${track.name}</div>
      <div class="race-country">${track.country}</div>
      <div class="weather-badge">${weather.icon} ${weather.name}</div>
    </div>

    <div class="section-header">
      <h2 class="font-display">📰 围场新闻</h2>
    </div>

    ${news.map(n => `
      <div class="news-card">
        <div class="news-title">${n.title}</div>
        <div class="news-body">${n.body}</div>
      </div>
    `).join('')}

    <button class="btn btn-primary btn-lg" onclick="startQualifying()" style="margin-top:20px;">
      进入排位赛 →
    </button>
  `;
}

function startQualifying() {
  const result = simulateQualifying(raceState.raceIdx);
  raceState.qualifyingResult = result;
  raceState.phase = 'qualifying';

  // Track pole position
  if (result.playerPos === 1) {
    gameState.careerPoles = (gameState.careerPoles || 0) + 1;
  }

  const player = getPlayer();
  const team = TEAMS[gameState.teamIdx];

  // Show qualifying results
  const top10 = result.results.slice(0, 10);

  document.getElementById('race-screen').innerHTML = `
    <div class="race-header">
      <div class="race-round">排位赛结果</div>
      <div class="race-name">${raceState.track.name}</div>
    </div>

    <div class="card" style="text-align:center;padding:30px;">
      <div style="font-size:0.85rem;color:var(--text-secondary);margin-bottom:8px;">你的排位赛成绩</div>
      <div style="font-family:'Orbitron';font-size:3rem;font-weight:900;color:${result.playerPos <= 3 ? 'var(--gold)' : result.playerPos <= 10 ? 'var(--f1-red)' : 'var(--text-primary)'};">
        P${result.playerPos}
      </div>
      <div style="font-size:0.85rem;color:var(--text-secondary);margin-top:4px;">
        ${result.playerPos === 1 ? '🎉 杆位！' : result.playerPos <= 3 ? '前排发车！' : result.playerPos <= 10 ? '不错的排位成绩' : '明天需要从后方追赶'}
      </div>
    </div>

    <div class="card">
      <h3 style="margin-bottom:12px;font-size:0.9rem;color:var(--text-secondary);">前十名</h3>
      <table class="standings-table">
        <thead>
          <tr>
            <th class="pos-col">#</th>
            <th>车手</th>
            <th>车队</th>
          </tr>
        </thead>
        <tbody>
          ${top10.map((r, i) => {
            const t = TEAMS.find(t => t.id === r.driver.teamId);
            const posClass = i + 1 <= 3 ? `pos-${i + 1}` : '';
            return `
              <tr class="${r.driver.isPlayer ? 'player-row' : ''}">
                <td class="pos-col ${posClass}">${i + 1}</td>
                <td>${r.driver.name} ${r.driver.isPlayer ? '⭐' : ''}</td>
                <td><span class="team-badge ${t.css}" style="font-size:0.7rem;padding:2px 6px;">${t.short}</span></td>
              </tr>
            `;
          }).join('')}
        </tbody>
      </table>
    </div>

    <button class="btn btn-primary btn-lg" onclick="startRace()" style="margin-top:16px;">
      🏁 开始正赛 →
    </button>
  `;
}

function startRace() {
  raceState.phase = 'race';
  raceState.currentDecisionIdx = 0;
  showNextRaceDecision();
}

function showNextRaceDecision() {
  const decisions = raceState.decisions.filter(d => d.segment !== 'post');
  const idx = raceState.currentDecisionIdx;

  if (idx >= decisions.length) {
    // All decisions made, simulate race
    finishRace();
    return;
  }

  const decision = decisions[idx];
  const totalSegs = decisions.length;
  const progress = ((idx) / totalSegs) * 100;

  // Generate some commentary
  const commentaries = [
    `比赛正在进行中，${raceState.track.name}的赛道条件${raceState.weather.wetMod > 0.3 ? '湿滑' : '良好'}。`,
    `你已经完成了大约${Math.round((idx / totalSegs) * 100)}%的比赛距离。`,
    `赛道上的竞争非常激烈，每一个决定都至关重要。`,
    `工程师通过无线电与你保持沟通，策略选择将决定比赛走向。`,
  ];

  document.getElementById('race-screen').innerHTML = `
    <div class="race-header">
      <div class="race-round">正赛 · ${raceState.track.name}</div>
      <div class="race-name" style="font-size:1.3rem;">${raceState.weather.icon} ${raceState.weather.name}</div>
    </div>

    <div class="race-progress">
      <div class="progress-bar-container">
        <div class="progress-bar-fill" style="width:${progress}%"></div>
      </div>
      <div class="race-commentary">
        ${commentaries[idx % commentaries.length]}
      </div>
    </div>

    <div class="decision-box">
      <div class="decision-title">${decision.title}</div>
      <div class="decision-desc">${decision.desc}</div>
      <div class="decision-options">
        ${decision.options.map(opt => `
          <button class="decision-option" onclick="makeRaceDecision(${idx}, '${opt.label}')">
            <span class="option-label">${opt.label}.</span> ${opt.text}
          </button>
        `).join('')}
      </div>
    </div>
  `;
}

function makeRaceDecision(decisionIdx, optionLabel) {
  const decisions = raceState.decisions.filter(d => d.segment !== 'post');
  const decision = decisions[decisionIdx];
  const option = decision.options.find(o => o.label === optionLabel);

  if (option) {
    raceState.modifiers.push({
      segment: decision.segment,
      effect: option.effect,
    });
    applyDecisionEffects(option.effect);
  }

  raceState.currentDecisionIdx++;
  showNextRaceDecision();
}

function finishRace() {
  const raceResult = simulateRace(raceState.raceIdx, raceState.modifiers);
  raceState.raceResult = raceResult;

  // Apply results to game state
  applyRaceResults(raceResult);

  // Find player result
  const playerResult = raceResult.find(r => r.driver.isPlayer);
  const pos = playerResult.position;
  const dnf = playerResult.dnf;
  const pts = dnf ? 0 : (pos <= 10 ? POINTS_SYSTEM[pos - 1] : 0);

  // Show post-race media decision
  const mediaDecision = raceState.decisions.find(d => d.segment === 'post');
  if (mediaDecision && !dnf) {
    showMediaDecision(mediaDecision, pos, pts, dnf);
  } else {
    showRaceResults(pos, pts, dnf);
  }
}

function showMediaDecision(decision, pos, pts, dnf) {
  document.getElementById('race-screen').innerHTML = `
    <div class="race-header">
      <div class="race-round">赛后采访</div>
      <div class="race-name" style="font-size:1.3rem;">${raceState.track.name}</div>
    </div>

    <div class="card" style="text-align:center;padding:20px;">
      <div style="font-size:0.85rem;color:var(--text-secondary);">比赛成绩</div>
      <div style="font-family:'Orbitron';font-size:2.5rem;font-weight:900;color:${pos === 1 ? 'var(--gold)' : pos <= 3 ? 'var(--silver)' : 'var(--text-primary)'};">
        ${dnf ? 'DNF' : 'P' + pos}
      </div>
      ${!dnf ? `<div style="color:var(--f1-red);font-weight:600;">+${pts} 分</div>` : ''}
    </div>

    <div class="decision-box">
      <div class="decision-title">${decision.title}</div>
      <div class="decision-desc">${decision.desc}</div>
      <div class="decision-options">
        ${decision.options.map(opt => `
          <button class="decision-option" onclick="makeMediaDecision('${opt.label}', ${pos}, ${pts}, ${dnf})">
            <span class="option-label">${opt.label}.</span> ${opt.text}
          </button>
        `).join('')}
      </div>
    </div>
  `;
}

function makeMediaDecision(optionLabel, pos, pts, dnf) {
  const mediaDecision = raceState.decisions.find(d => d.segment === 'post');
  const option = mediaDecision.options.find(o => o.label === optionLabel);
  if (option) {
    applyDecisionEffects(option.effect);
  }
  showRaceResults(pos, pts, dnf);
}

function showRaceResults(pos, pts, dnf) {
  const posClass = pos === 1 ? 'p1' : pos === 2 ? 'p2' : pos === 3 ? 'p3' : '';
  const standings = getDriverStandings();
  const playerStanding = standings.find(d => d.isPlayer);

  // Show top 10 finishers
  const finishers = raceState.raceResult.filter(r => !r.dnf).slice(0, 10);

  // Get newly unlocked achievements
  const newAchs = gameState.newAchievements || [];
  gameState.newAchievements = null;

  document.getElementById('race-screen').innerHTML = `
    <div class="result-hero">
      <div style="font-size:0.85rem;color:var(--text-secondary);margin-bottom:8px;">比赛成绩</div>
      <div class="result-position ${posClass}">
        ${dnf ? 'DNF' : 'P' + pos}
      </div>
      ${!dnf ? `
        <div class="result-points">获得 <span>+${pts}</span> 积分</div>
        ${pos === 1 ? '<div style="margin-top:12px;font-size:1.5rem;">🏆 🎉 冠军！</div>' : ''}
        ${pos === 2 ? '<div style="margin-top:12px;font-size:1.2rem;">🥈 亚军！</div>' : ''}
        ${pos === 3 ? '<div style="margin-top:12px;font-size:1.2rem;">🥉 季军！</div>' : ''}
      ` : `
        <div class="result-points" style="color:var(--f1-red);">遗憾退赛</div>
      `}
    </div>

    <div class="card">
      <h3 style="margin-bottom:12px;font-size:0.9rem;color:var(--text-secondary);">比赛结果</h3>
      <table class="standings-table">
        <thead>
          <tr>
            <th class="pos-col">#</th>
            <th>车手</th>
            <th>车队</th>
          </tr>
        </thead>
        <tbody>
          ${finishers.map((r, i) => {
            const t = TEAMS.find(t => t.id === r.driver.teamId);
            const pClass = r.position <= 3 ? `pos-${r.position}` : '';
            return `
              <tr class="${r.driver.isPlayer ? 'player-row' : ''}">
                <td class="pos-col ${pClass}">${r.position}</td>
                <td>${r.driver.name} ${r.driver.isPlayer ? '⭐' : ''}</td>
                <td><span class="team-badge ${t.css}" style="font-size:0.7rem;padding:2px 6px;">${t.short}</span></td>
              </tr>
            `;
          }).join('')}
        </tbody>
      </table>
    </div>

    <div class="card">
      <div style="display:flex;justify-content:space-between;align-items:center;">
        <div>
          <div style="font-size:0.8rem;color:var(--text-muted);">积分榜排名</div>
          <div style="font-family:'Orbitron';font-size:1.8rem;font-weight:800;color:var(--f1-red);">P${playerStanding ? playerStanding.position : '-'}</div>
        </div>
        <div style="text-align:right;">
          <div style="font-size:0.8rem;color:var(--text-muted);">总积分</div>
          <div style="font-family:'Orbitron';font-size:1.8rem;font-weight:800;">${playerStanding ? playerStanding.points : 0}</div>
        </div>
      </div>
    </div>

    ${newAchs.length > 0 ? `
      <div class="card card-glow" style="border-color: var(--gold); text-align:center;">
        <div style="font-size:0.85rem;color:var(--gold);font-weight:600;letter-spacing:1px;margin-bottom:12px;">🏅 新成就解锁！</div>
        ${newAchs.map(ach => `
          <div style="display:flex;align-items:center;gap:12px;padding:10px;background:rgba(255,215,0,0.05);border-radius:8px;margin-bottom:8px;">
            <span style="font-size:2rem;">${ach.icon}</span>
            <div style="text-align:left;">
              <div style="font-weight:700;color:var(--gold);">${ach.name}</div>
              <div style="font-size:0.8rem;color:var(--text-secondary);">${ach.desc}</div>
            </div>
          </div>
        `).join('')}
      </div>
    ` : ''}

    <button class="btn btn-primary btn-lg" onclick="afterRace()" style="margin-top:16px;">
      继续 →
    </button>
  `;

  saveGame();
}

function afterRace() {
  gameState.currentRace++;
  gameState.trainedThisWeek = false;
  raceState = null;
  renderHub();
  saveGame();
}

// ============ SEASON END ============

function endSeason() {
  const isChampion = checkChampion();
  if (isChampion) {
    gameState.championships++;
  }

  const standings = getDriverStandings();
  const playerStanding = standings.find(d => d.isPlayer);
  const teamStandings = getTeamStandings();
  const playerTeamStanding = teamStandings.find(ts => ts.teamId === gameState.teamId);

  showScreen('season-end-screen');
  document.getElementById('season-end-screen').innerHTML = `
    <div class="result-hero">
      ${isChampion ? `
        <div style="font-size:4rem;margin-bottom:16px;">🏆</div>
        <h1 class="font-display" style="color:var(--gold);margin-bottom:8px;">世界冠军！</h1>
        <p class="text-muted">恭喜你赢得了 ${gameState.season} 赛季的世界冠军！</p>
      ` : `
        <div style="font-size:3rem;margin-bottom:16px;">🏁</div>
        <h1 class="font-display" style="margin-bottom:8px;">${gameState.season} 赛季结束</h1>
        <p class="text-muted">赛季已结束，以下是你的赛季总结</p>
      `}
    </div>

    <div class="card">
      <h3 style="margin-bottom:16px;font-size:0.9rem;color:var(--text-secondary);">赛季总结</h3>
      <div style="display:grid;grid-template-columns:repeat(3,1fr);gap:16px;text-align:center;">
        <div>
          <div style="font-family:'Orbitron';font-size:2rem;font-weight:800;color:var(--f1-red);">P${playerStanding ? playerStanding.position : '-'}</div>
          <div style="font-size:0.75rem;color:var(--text-muted);">最终排名</div>
        </div>
        <div>
          <div style="font-family:'Orbitron';font-size:2rem;font-weight:800;">${playerStanding ? playerStanding.points : 0}</div>
          <div style="font-size:0.75rem;color:var(--text-muted);">总积分</div>
        </div>
        <div>
          <div style="font-family:'Orbitron';font-size:2rem;font-weight:800;">${gameState.raceResults.filter(r => !r.dnf && r.position <= 3).length}</div>
          <div style="font-size:0.75rem;color:var(--text-muted);">领奖台次数</div>
        </div>
      </div>

      <div class="divider"></div>

      <div style="display:grid;grid-template-columns:repeat(3,1fr);gap:16px;text-align:center;">
        <div>
          <div style="font-family:'Orbitron';font-size:1.5rem;font-weight:700;color:var(--gold);">${gameState.raceResults.filter(r => !r.dnf && r.position === 1).length}</div>
          <div style="font-size:0.75rem;color:var(--text-muted);">分站冠军</div>
        </div>
        <div>
          <div style="font-family:'Orbitron';font-size:1.5rem;font-weight:700;">${gameState.raceResults.filter(r => r.dnf).length}</div>
          <div style="font-size:0.75rem;color:var(--text-muted);">退赛次数</div>
        </div>
        <div>
          <div style="font-family:'Orbitron';font-size:1.5rem;font-weight:700;">P${playerTeamStanding ? playerTeamStanding.position : '-'}</div>
          <div style="font-size:0.75rem;color:var(--text-muted);">车队排名</div>
        </div>
      </div>
    </div>

    <button class="btn btn-primary btn-lg" onclick="showContractOffers()" style="margin-top:16px;">
      进入合同谈判 →
    </button>
  `;

  saveGame();
}

function showContractOffers() {
  const offers = generateContractOffers();
  raceState = { contractOffers: offers, selectedOffer: null };

  showScreen('contract-screen');
  document.getElementById('contract-screen').innerHTML = `
    <div class="section-header">
      <h2 class="font-display">💼 合同报价</h2>
    </div>
    <p class="text-muted" style="margin-bottom:20px;">选择一份合同，开始新的赛季</p>

    <div id="contract-list">
      ${offers.map((offer, i) => `
        <div class="contract-card" data-idx="${i}" onclick="selectContract(${i})">
          <div class="contract-team">
            <span class="team-badge ${offer.team.css}" style="margin-right:8px;">${offer.team.short}</span>
            ${offer.isCurrent ? '<span class="badge badge-green">续约</span>' : '<span class="badge badge-blue">新报价</span>'}
          </div>
          <div class="contract-details">
            <div class="contract-detail">💰 年薪: <span class="value">$${offer.salary}M</span></div>
            <div class="contract-detail">📅 年限: <span class="value">${offer.years}年</span></div>
            <div class="contract-detail">🏎️ 赛车性能: <span class="value">${offer.team.car}</span></div>
          </div>
        </div>
      `).join('')}
    </div>

    <button class="btn btn-primary btn-lg" id="accept-contract-btn" disabled onclick="acceptContractOffer()" style="margin-top:16px;">
      接受合同
    </button>
  `;
}

function selectContract(idx) {
  document.querySelectorAll('.contract-card').forEach(c => c.classList.remove('selected'));
  document.querySelectorAll('.contract-card')[idx].classList.add('selected');
  raceState.selectedOffer = idx;
  document.getElementById('accept-contract-btn').disabled = false;
}

function acceptContractOffer() {
  const offer = raceState.contractOffers[raceState.selectedOffer];
  acceptContract(offer);
  startNewSeason();
  raceState = null;
  renderHub();
  saveGame();
  showToast(`${gameState.season} 赛季开始！`, 'success');
}

// ============ LOAD AND RESUME ============

function loadAndResume() {
  if (loadGame()) {
    renderHub();
    showToast('存档已加载', 'success');
  } else {
    showToast('加载存档失败', 'error');
  }
}

// ============ INITIALIZATION ============

document.addEventListener('DOMContentLoaded', () => {
  renderStartScreen();
});
