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
  // 车手梗与趣闻
  { title: '围场趣闻', body: () => 'Verstappen又被拍到在车房里打F1电子游戏，而且选的角色不是自己。' },
  { title: '围场趣闻', body: () => 'Hamilton在社交媒体上发布了一张 vegan 食谱照片，获得超过200万点赞。' },
  { title: '围场趣闻', body: () => 'Alonso在采访中暗示自己"可能再赛十年"，围场集体沉默三秒后爆笑。' },
  { title: '围场趣闻', body: () => 'Norris和Piastri被拍到一起打迷你高尔夫，两人赌注是一顿晚餐。' },
  { title: '围场趣闻', body: () => 'Leclerc的钢琴演奏视频在社交媒体上走红，车迷纷纷要求出专辑。' },
  { title: '围场趣闻', body: () => 'Stroll的帽子系列又出了新色款，这次与加拿大本土设计师合作，限量版发售。' },
  { title: '围场趣闻', body: () => 'Tsunoda在无线电里又冒出经典台词了，这次FIA翻译官表示"需要时间理解其中的热情"。' },
  { title: '围场趣闻', body: () => 'Hulkenberg被问到职业生涯最自豪的时刻，他毫不犹豫地回答："勒芒24小时整体验。"' },
  { title: '围场趣闻', body: () => 'Russell在Mercedes车房里被发现正在认真研究空气动力学数据，队友表示"他从早到晚都在看数据"。' },
  { title: '围场趣闻', body: () => 'Sainz的"Smooth Operator"铃声在围场里传染了，已有5位车手手机设置为同一铃声。' },
  { title: '围场趣闻', body: () => 'Bearman又一次被叫去当替补，围场戏称他为"F1最强消防员"。' },
  { title: '围场趣闻', body: () => 'Gasly和Ocon在食堂被发现坐在一起讨论法国美食，看起来关系比外界想象的要好。' },
  { title: '围场趣闻', body: () => '一位车手的宠物狗在围场走丢，结果在另一个车队的车房里找到了——它正吃着顶级狗粮。' },
  { title: '围场趣闻', body: () => 'Antonelli被问到如何看待"新秀"标签时回答："什么新秀？我已经模拟器跑了5000小时了。"' },
  { title: '围场趣闻', body: () => '围场餐厅主厨透露，某位世界冠军每场比赛前必吃的"幸运餐"是一碗意大利面配两个荷包蛋。' },
  { title: '围场趣闻', body: () => '一位匿名车手承认自己赛前会听"Simply Red"的歌来放松，围场一片哗然。' },
  { title: '围场趣闻', body: () => 'F1官方考虑在赛车方向盘上安装"表情包按钮"，让车手在无线电中发送表情。' },
  { title: '围场趣闻', body: () => 'Alonso的Instagram更新了一张自拍，配文"El Plan 第17年"，评论区炸了。' },
  { title: '围场趣闻', body: () => 'Verstappen在模拟器赛中输给了一位12岁的少年，赛后他表示"这小孩未来可期"。' },
  { title: '围场趣闻', body: () => '某车手在赛前去当地著名景点打卡迷路了，差点错过自由练习赛。' },
  { title: '围场趣闻', body: () => 'F1车手协会正在讨论是否应该禁止在无线电中唱歌，因为"实在太难听了"。' },
  { title: '围场趣闻', body: () => '一位车队领队透露，他选择车手的首要标准不是速度，而是"能不能在赞助商面前吃相好看"。' },
  { title: '围场趣闻', body: () => 'Hamilton在采访中被问到退休计划，他说"等我拿到第八冠再说"，围场鸦雀无声。' },
  { title: '围场趣闻', body: () => 'Norris的直播频道粉丝数突破500万，有车迷打趣说"直播比比赛还努力"。' },
  { title: '围场趣闻', body: () => 'Leclerc在摩纳哥站前夕发布了一段钢琴演奏视频，配文"为家乡准备的小礼物"。' },
  { title: '围场趣闻', body: () => '一位F1记者试图数清Alonso到底有多少条"El Plan"，最后放弃了。' },
  { title: '围场趣闻', body: () => 'Stroll在停车场撞了自己的赛车，车队公关紧急声明"这只是友情碰撞测试"。' },
  // 领队新闻
  { title: '领队动态', body: () => 'Horner在记者会上妙语连珠，让在场记者集体鼓掌。' },
  { title: '领队动态', body: () => 'Toto Wolff表示"我们不会在压力下做出草率决定"，但他的表情出卖了他。' },
  { title: '领队动态', body: () => 'Vasseur被拍到和车手在围场散步聊天，看起来关系融洽。' },
  { title: '领队动态', body: () => '一位车队领队在赛后怒摔耳机，被摄像机完美捕捉。' },
  { title: '领队动态', body: () => 'Stella用数据说服了董事会追加研发预算，工程师们欢呼雀跃。' },
];

// ============ RANDOM RACE EVENTS ============

const RANDOM_EVENTS = [
  // === 赛道突发事件 ===
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
    desc: '赛道某处出现黄旗，marshal正在清理赛道。你需要减速通过。',
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
  // === 车队内斗事件 ===
  {
    title: '😤 队友无视指令',
    desc: '你的队友公然无视车队指令，强行超越了你！车队无线电一片混乱。',
    type: 'team_drama',
    options: [
      { label: 'A', text: '立刻反超回去 - 绝不退让！', effect: { attack: 4, pace: 2, teamTrust: -8, risk: 3 } },
      { label: 'B', text: '向车队抱怨 - 让他们处理', effect: { teamTrust: 3, raceIQ: 1, pace: -2 } },
      { label: 'C', text: '专注于自己的节奏 - 用成绩说话', effect: { consistency: 3, raceIQ: 2, pace: -1 } },
    ],
  },
  {
    title: '🤬 车队策略分歧',
    desc: '车队领队和你的赛道工程师在进站策略上产生了严重分歧，你被夹在中间。',
    type: 'team_drama',
    options: [
      { label: 'A', text: '支持工程师 - 他更了解赛道情况', effect: { raceIQ: 3, teamTrust: -3 } },
      { label: 'B', text: '听从领队 - 车队大局为重', effect: { teamTrust: 4, raceIQ: -1 } },
      { label: 'C', text: '自己做决定 - 谁都不听', effect: { pace: 2, raceIQ: 1, teamTrust: -5, risk: 2 } },
    ],
  },
  {
    title: '🔴 车队威胁降级',
    desc: '车队老板通过无线电警告你："如果再拿不出成绩，下一场就换人！"',
    type: 'team_drama',
    options: [
      { label: 'A', text: '化压力为动力 - 全力冲刺！', effect: { pace: 5, attack: 3, risk: 4, consistency: -2 } },
      { label: 'B', text: '稳扎稳打 - 用完赛证明自己', effect: { consistency: 4, raceIQ: 2, pace: -1 } },
      { label: 'C', text: '怒回无线电 - 给我一辆能跑的车再说！', effect: { teamTrust: -10, mediaRep: 2, fanPop: 5, pace: 1 } },
    ],
  },
  {
    title: '👥 队友暗讽',
    desc: '赛后采访中，你的队友暗示"某些人"占了太多车队资源，围场议论纷纷。',
    type: 'team_drama',
    options: [
      { label: 'A', text: '公开回怼 - 在社交媒体上反击', effect: { fanPop: 4, mediaRep: -3, driverRep: -2, teamTrust: -5 } },
      { label: 'B', text: '用成绩回应 - 下一场碾压他', effect: { pace: 3, attack: 2, raceIQ: 1 } },
      { label: 'C', text: '私下沟通 - 解决矛盾', effect: { teamTrust: 5, raceIQ: 2, driverRep: 3 } },
    ],
  },
  // === 媒体事件 ===
  {
    title: '📺 媒体恶意剪辑',
    desc: '一段你赛后在无线电中的抱怨被媒体恶意剪辑传播，车迷议论纷纷。',
    type: 'media',
    options: [
      { label: 'A', text: '发布声明澄清 - 公关处理', effect: { mediaRep: 4, fanPop: 1, raceIQ: 1 } },
      { label: 'B', text: '怒斥媒体 - 不装了！', effect: { mediaRep: -5, fanPop: 6, driverRep: 3, pace: 2 } },
      { label: 'C', text: '无视争议 - 专注比赛', effect: { consistency: 3, raceIQ: 2, mediaRep: -1 } },
    ],
  },
  {
    title: '📸 狗仔偷拍',
    desc: '你昨晚在夜店的照片被曝光，车队赞助商对此表示不满。',
    type: 'media',
    options: [
      { label: 'A', text: '道歉并承诺专注比赛', effect: { mediaRep: 3, teamTrust: 3, fanPop: -2 } },
      { label: 'B', text: '无所谓 - 我的私生活我做主', effect: { fanPop: 5, mediaRep: -4, teamTrust: -4, sponsorRep: -3 } },
      { label: 'C', text: '邀请媒体来训练基地 - 展示职业态度', effect: { mediaRep: 5, fanPop: 3, consistency: 1 } },
    ],
  },
  {
    title: '🎙️ 名嘴批评',
    desc: '知名F1评论员在直播中公开批评你的驾驶风格"过于鲁莽"，引发热议。',
    type: 'media',
    options: [
      { label: 'A', text: '虚心接受 - 下场证明自己', effect: { consistency: 3, raceIQ: 2, mediaRep: 3 } },
      { label: 'B', text: '反唇相讥 - 他懂什么赛车？', effect: { mediaRep: -3, fanPop: 4, driverRep: 2, attack: 2 } },
      { label: 'C', text: '邀请他坐车队墙 - 看看真实数据', effect: { mediaRep: 5, raceIQ: 1, teamTrust: 2 } },
    ],
  },
  {
    title: '📱 社交媒体风暴',
    desc: '你在社交媒体上的一条动态引发巨大争议，24小时内登上热搜。',
    type: 'media',
    options: [
      { label: 'A', text: '删除动态并道歉 - 危机公关', effect: { mediaRep: 3, fanPop: -3, teamTrust: 2 } },
      { label: 'B', text: '坚持立场 - 不删除', effect: { fanPop: 7, mediaRep: -4, driverRep: 3, sponsorRep: -2 } },
      { label: 'C', text: '发长文解释来龙去脉', effect: { mediaRep: 4, fanPop: 2, raceIQ: 1 } },
    ],
  },
  // === 赛道戏剧性事件 ===
  {
    title: '💥 前方连环碰撞',
    desc: '前方多车连环碰撞！赛道上到处都是碎片，红旗中断比赛！',
    type: 'chaos',
    options: [
      { label: 'A', text: '利用中断时间调整策略 - 重整旗鼓', effect: { raceIQ: 4, consistency: 2 } },
      { label: 'B', text: '重启后全力进攻 - 趁乱超车', effect: { pace: 4, attack: 3, risk: 4 } },
      { label: 'C', text: '保守起步重启 - 避免二次事故', effect: { consistency: 4, defend: 2, pace: -2 } },
    ],
  },
  {
    title: '🌧️ 突降暴雨',
    desc: '天气突变！大雨倾盆而下，赛道瞬间变成溜冰场，多辆赛车打滑！',
    type: 'chaos',
    options: [
      { label: 'A', text: '立即进站换全雨胎 - 雨战大师时间！', effect: { wet: 5, pace: 3, raceIQ: 2 } },
      { label: 'B', text: '继续用半雨胎 - 赌雨不会持续', effect: { pace: -2, risk: 5, wet: 2 } },
      { label: 'C', text: '减速保守 - 先活下来再说', effect: { consistency: 3, wet: 1, pace: -3 } },
    ],
  },
  {
    title: '🔧 技术故障',
    desc: '你的方向盘按钮突然失灵！DRS无法开启，变速箱也出现异常。',
    type: 'chaos',
    options: [
      { label: 'A', text: '手动操作绕过故障 - 硬核驾驶', effect: { raceIQ: 4, pace: -1, consistency: 2 } },
      { label: 'B', text: '进站维修 - 损失时间但修好', effect: { pace: -4, consistency: 3, raceIQ: 1 } },
      { label: 'C', text: '无视故障继续跑 - 纯靠技术！', effect: { pace: 2, risk: 4, attack: 3 } },
    ],
  },
  {
    title: '🃏 虚晃一枪',
    desc: '后车在你的镜子里疯狂闪灯，看起来要超车，但你不确定是不是假动作。',
    type: 'chaos',
    options: [
      { label: 'A', text: '防守内线 - 不给他机会', effect: { defend: 4, raceIQ: 2, pace: -1 } },
      { label: 'B', text: '放他过去 - 然后用尾流反超', effect: { raceIQ: 4, attack: 3, pace: 1 } },
      { label: 'C', text: '忽左忽右 - 迷惑对手', effect: { defend: 2, raceIQ: 1, risk: 3 } },
    ],
  },
  {
    title: '🏁 最后圈混乱',
    desc: '最后一圈！前车突然失误，你看到了胜利的曙光，但后车也咬得很紧！',
    type: 'chaos',
    options: [
      { label: 'A', text: '全力进攻前车 - 豪赌最后弯道！', effect: { attack: 6, pace: 4, risk: 5, consistency: -3 } },
      { label: 'B', text: '防守后车 - 保住当前位置', effect: { defend: 5, consistency: 3, pace: -1 } },
      { label: 'C', text: '等待机会 - 如果前车失误就超', effect: { raceIQ: 4, consistency: 2, pace: 1 } },
    ],
  },
  // === 围场八卦 ===
  {
    title: '🤫 转会传闻',
    desc: '围场盛传你正在与另一支车队秘密谈判转会，你的队友和车队都坐不住了。',
    type: 'paddock',
    options: [
      { label: 'A', text: '公开否认 - 专注当前赛季', effect: { teamTrust: 5, mediaRep: 2, consistency: 2 } },
      { label: 'B', text: '暧昧回应 - 让传闻继续发酵', effect: { mediaRep: -2, fanPop: 4, teamTrust: -6, pace: 2 } },
      { label: 'C', text: '要求经纪人处理 - 不让分心', effect: { raceIQ: 3, consistency: 2, mediaRep: 1 } },
    ],
  },
  {
    title: '👴 传奇点评',
    desc: '一位F1传奇车手在采访中点名评价你："他有天赋，但还需要磨练。"',
    type: 'paddock',
    options: [
      { label: 'A', text: '虚心接受指点 - 传奇说的对', effect: { raceIQ: 4, consistency: 2, driverRep: 4 } },
      { label: 'B', text: '不甘示弱 - 下场用冠军回应', effect: { pace: 4, attack: 3, driverRep: 2, risk: 2 } },
      { label: 'C', text: '邀请他做导师 - 虚心求教', effect: { raceIQ: 5, driverRep: 6, mediaRep: 3 } },
    ],
  },
  {
    title: '🏎️ 赞助商施压',
    desc: '车队的主要赞助商直接向老板施压，要求你必须在下一站登上领奖台。',
    type: 'paddock',
    options: [
      { label: 'A', text: '接受挑战 - 压力就是动力', effect: { pace: 4, attack: 2, risk: 3, consistency: -1 } },
      { label: 'B', text: '与管理层沟通 - 设定合理目标', effect: { teamTrust: 3, raceIQ: 2, mediaRep: 2 } },
      { label: 'C', text: '在采访中回击赞助商 - 赛车不是做生意', effect: { fanPop: 6, mediaRep: -3, sponsorRep: -5, teamTrust: -4 } },
    ],
  },
  {
    title: '🤝 车手好友相助',
    desc: '你的一位好友车手在赛道上给你让了位置，帮你保住了积分。围场友谊的力量！',
    type: 'social',
    options: [
      { label: 'A', text: '赛后感谢对方 - 友谊长存', effect: { consistency: 2, raceIQ: 1, driverRep: 3 } },
      { label: 'B', text: '下次也帮他 - 礼尚往来', effect: { raceIQ: 2, driverRep: 2, pace: 1 } },
    ],
  },
  {
    title: '😤 车手敌对冲突',
    desc: '一位与你关系不好的车手在赛道上恶意阻挡你，你损失了大量时间。',
    type: 'social',
    options: [
      { label: 'A', text: '无线电投诉 - 要求赛会处罚', effect: { raceIQ: 2, mediaRep: -1, driverRep: -2 } },
      { label: 'B', text: '下次找机会回敬 - 围场有仇必报', effect: { attack: 3, risk: 2, driverRep: -3 } },
      { label: 'C', text: '专注于超越他 - 用速度说话', effect: { pace: 3, attack: 2, raceIQ: 1 } },
    ],
  },
  {
    title: '🍻 围场聚餐',
    desc: '几位车手邀请你参加围场聚餐，这是一个增进关系的好机会。',
    type: 'social',
    options: [
      { label: 'A', text: '积极参加 - 多交朋友', effect: { driverRep: 4, fanPop: 2, mediaRep: 1, consistency: -1 } },
      { label: 'B', text: '婉拒 - 专注于比赛准备', effect: { raceIQ: 3, consistency: 2, driverRep: -1 } },
      { label: 'C', text: '只和队友去 - 保持距离', effect: { teamTrust: 3, driverRep: 1 } },
    ],
  },
];

// ============ DRIVER SOCIAL SYSTEM ============

// Team principals with personalities
const TEAM_PRINCIPALS = [
  { teamIdx: 0, name: 'Andrea Stella', style: 'analytical', desc: '数据驱动型，注重长期发展' },
  { teamIdx: 1, name: 'Christian Horner', style: 'aggressive', desc: '强势谈判者，赢家心态' },
  { teamIdx: 2, name: 'Toto Wolff', style: 'strategic', desc: '商业头脑，精于算计' },
  { teamIdx: 3, name: 'Frédéric Vasseur', style: 'passionate', desc: '热情直率，车手至上' },
  { teamIdx: 4, name: 'Andy Cowell', style: 'technical', desc: '工程师出身，细节控' },
  { teamIdx: 5, name: 'James Vowles', style: 'patient', desc: '耐心建设者，重承诺' },
  { teamIdx: 6, name: 'Laurent Mekies', style: 'pragmatic', desc: '实用主义者，结果导向' },
  { teamIdx: 7, name: 'Ayao Komatsu', style: 'honest', desc: '坦诚直接，不喜欢花招' },
  { teamIdx: 8, name: 'Oliver Oakes', style: 'ambitious', desc: '年轻有为，敢赌敢拼' },
  { teamIdx: 9, name: 'Mattia Binotto', style: 'conservative', desc: '保守稳重，按部就班' },
];

// ============ RESERVE DRIVERS (2025) ============

const RESERVE_DRIVERS = [
  { name: 'F. Colapinto', pace: 80, consistency: 75, wet: 76, defend: 77, attack: 79, raceIQ: 76, skill: 78 },
  { name: 'J. Doohan', pace: 78, consistency: 74, wet: 75, defend: 76, attack: 78, raceIQ: 75, skill: 76 },
  { name: 'L. Lawson', pace: 81, consistency: 76, wet: 74, defend: 77, attack: 80, raceIQ: 77, skill: 79 },
  { name: 'P. Aron', pace: 76, consistency: 75, wet: 73, defend: 74, attack: 76, raceIQ: 75, skill: 74 },
  { name: 'F. Drugovich', pace: 77, consistency: 76, wet: 75, defend: 75, attack: 76, raceIQ: 76, skill: 75 },
  { name: 'R. Hirakawa', pace: 75, consistency: 77, wet: 76, defend: 74, attack: 74, raceIQ: 77, skill: 75 },
  { name: 'D. Beganovic', pace: 76, consistency: 74, wet: 74, defend: 75, attack: 76, raceIQ: 74, skill: 74 },
  { name: 'A. Dunne', pace: 75, consistency: 73, wet: 72, defend: 73, attack: 76, raceIQ: 73, skill: 73 },
  { name: 'P. O\'Ward', pace: 76, consistency: 75, wet: 73, defend: 74, attack: 75, raceIQ: 75, skill: 75 },
  { name: 'F. Vesti', pace: 76, consistency: 76, wet: 75, defend: 75, attack: 75, raceIQ: 76, skill: 75 },
  { name: 'V. Bottas', pace: 83, consistency: 80, wet: 82, defend: 81, attack: 79, raceIQ: 82, skill: 82 },
  { name: 'A. Iwasa', pace: 75, consistency: 74, wet: 73, defend: 74, attack: 76, raceIQ: 74, skill: 74 },
  { name: 'L. Browning', pace: 74, consistency: 73, wet: 72, defend: 73, attack: 75, raceIQ: 73, skill: 73 },
  { name: 'V. Martins', pace: 75, consistency: 74, wet: 73, defend: 74, attack: 75, raceIQ: 74, skill: 74 },
];

let usedReserveDrivers = new Set();

function getNextReserveDriver() {
  const available = RESERVE_DRIVERS.filter(d => !usedReserveDrivers.has(d.name));
  if (available.length === 0) {
    // Reset and reuse
    usedReserveDrivers.clear();
    return RESERVE_DRIVERS[0];
  }
  const driver = available[Math.floor(Math.random() * available.length)];
  usedReserveDrivers.add(driver.name);
  return driver;
}

// ============ TRANSFER CASCADE SYSTEM ============

function processTransferCascade(newTeamIdx, transferLog) {
  // The player is joining newTeamIdx, displacing one of their drivers
  // Find which driver gets displaced (the one with worse performance or random)
  const newTeamDrivers = gameState.drivers.filter(d => d.teamIdx === newTeamIdx && !d.isPlayer);

  if (newTeamDrivers.length === 0) return; // Empty team, no cascade needed

  // The weaker driver gets displaced
  let displacedDriver;
  if (newTeamDrivers.length === 1) {
    displacedDriver = newTeamDrivers[0];
  } else {
    // Compare by points, lower points gets displaced
    displacedDriver = newTeamDrivers.reduce((a, b) => (a.points < b.points ? a : b));
  }

  transferLog.push({
    driver: displacedDriver.name,
    from: TEAMS[newTeamIdx].short,
    to: null, // TBD
  });

  // Now this displaced driver needs to find a new team
  // Look for teams with an open seat (teams that lost a driver in this cascade)
  // Or find a team where they could replace a weaker driver

  const oldTeamIdx = gameState.drivers.find(d => d.isPlayer).teamIdx;
  const oldTeam = TEAMS[oldTeamIdx];

  // Priority 1: The player's old team has an open seat
  if (oldTeamIdx !== newTeamIdx) {
    const oldTeamDriverCount = gameState.drivers.filter(d => d.teamIdx === oldTeamIdx && !d.isPlayer).length;
    if (oldTeamDriverCount < 2) {
      // Old team has an open seat, displaced driver goes there
      displacedDriver.teamIdx = oldTeamIdx;
      displacedDriver.teamId = oldTeam.id;
      transferLog[transferLog.length - 1].to = oldTeam.short;
      return; // Cascade resolved
    }
  }

  // Priority 2: Find another team with an open seat from the cascade
  // (This handles multi-step cascades, but for simplicity we do one step)

  // Priority 3: The displaced driver replaces a weaker driver at another team
  // Find teams where this driver would be an upgrade
  const eligibleTeams = [];
  for (let t = 0; t < TEAMS.length; t++) {
    if (t === newTeamIdx) continue; // Skip the team player just joined
    const teamDrivers = gameState.drivers.filter(d => d.teamIdx === t && !d.isPlayer);
    if (teamDrivers.length < 2) {
      eligibleTeams.push({ teamIdx: t, reason: 'open_seat' });
    } else {
      // Check if displaced driver is better than the weaker one
      const weaker = teamDrivers.reduce((a, b) => (a.points < b.points ? a : b));
      const displacedScore = (displacedDriver.stats.pace + displacedDriver.stats.consistency + displacedDriver.stats.raceIQ) / 3;
      const weakerScore = (weaker.stats.pace + weaker.stats.consistency + weaker.stats.raceIQ) / 3;
      if (displacedScore > weakerScore + 3) {
        eligibleTeams.push({ teamIdx: t, reason: 'upgrade', replaceDriver: weaker });
      }
    }
  }

  if (eligibleTeams.length > 0) {
    // Prefer teams closer in performance to the displaced driver's level
    const chosen = eligibleTeams[Math.floor(Math.random() * eligibleTeams.length)];
    const chosenTeam = TEAMS[chosen.teamIdx];

    if (chosen.reason === 'upgrade' && chosen.replaceDriver) {
      // This creates another cascade - the replaced driver goes to reserve or finds another team
      const secondDisplaced = chosen.replaceDriver;
      transferLog.push({
        driver: secondDisplaced.name,
        from: chosenTeam.short,
        to: '替补/退役',
      });

      // 50% chance the second displaced driver becomes a reserve, 50% finds a weaker team
      if (Math.random() < 0.5) {
        // Replace with a reserve driver at this team
        const reserve = getNextReserveDriver();
        secondDisplaced.name = reserve.name;
        secondDisplaced.stats = {
          pace: reserve.pace, consistency: reserve.consistency, wet: reserve.wet,
          defend: reserve.defend, attack: reserve.attack, raceIQ: reserve.raceIQ, skill: reserve.skill,
        };
        secondDisplaced.teamIdx = chosen.teamIdx;
        secondDisplaced.teamId = chosenTeam.id;
        transferLog[transferLog.length - 1].to = '替补车手替换';
      } else {
        // Second displaced driver goes to a backmarker team or becomes reserve
        const backmarkerIdx = TEAMS.length - 1;
        const backmarkerDrivers = gameState.drivers.filter(d => d.teamIdx === backmarkerIdx && !d.isPlayer);
        if (backmarkerDrivers.length < 2) {
          secondDisplaced.teamIdx = backmarkerIdx;
          secondDisplaced.teamId = TEAMS[backmarkerIdx].id;
          transferLog[transferLog.length - 1].to = TEAMS[backmarkerIdx].short;
        } else {
          // Replace weakest backmarker driver with a reserve
          const weakest = backmarkerDrivers.reduce((a, b) => (a.points < b.points ? a : b));
          const reserve = getNextReserveDriver();
          weakest.name = reserve.name;
          weakest.stats = {
            pace: reserve.pace, consistency: reserve.consistency, wet: reserve.wet,
            defend: reserve.defend, attack: reserve.attack, raceIQ: reserve.raceIQ, skill: reserve.skill,
          };
          secondDisplaced.teamIdx = backmarkerIdx;
          secondDisplaced.teamId = TEAMS[backmarkerIdx].id;
          transferLog[transferLog.length - 1].to = TEAMS[backmarkerIdx].short;
        }
      }
    }

    displacedDriver.teamIdx = chosen.teamIdx;
    displacedDriver.teamId = chosenTeam.id;
    transferLog[transferLog.length - 1].to = chosenTeam.short;

  } else {
    // No team will take the displaced driver - use a reserve driver to replace them
    const reserve = getNextReserveDriver();
    transferLog[transferLog.length - 1].to = '退役，替补' + reserve.name + '上场';

    // Replace the displaced driver with a reserve driver at the player's old team
    displacedDriver.name = reserve.name;
    displacedDriver.stats = {
      pace: reserve.pace, consistency: reserve.consistency, wet: reserve.wet,
      defend: reserve.defend, attack: reserve.attack, raceIQ: reserve.raceIQ, skill: reserve.skill,
    };
    displacedDriver.teamIdx = oldTeamIdx;
    displacedDriver.teamId = oldTeam.id;
  }
}

// Initialize driver relationships
// Driver social circles for existing drivers - realistic friendships and rivalries
const DRIVER_SOCIAL_CIRCLES = {
  'M. Verstappen': { friends: ['S. Pérez', 'Y. Tsunoda'], rivals: ['L. Hamilton', 'G. Russell', 'L. Norris'] },
  'S. Pérez': { friends: ['M. Verstappen', 'F. Alonso'], rivals: ['C. Leclerc'] },
  'L. Norris': { friends: ['O. Piastri', 'C. Sainz', 'G. Russell'], rivals: ['M. Verstappen'] },
  'O. Piastri': { friends: ['L. Norris', 'C. Leclerc'], rivals: [] },
  'C. Leclerc': { friends: ['L. Hamilton', 'O. Piastri', 'P. Gasly'], rivals: ['M. Verstappen'] },
  'L. Hamilton': { friends: ['C. Leclerc', 'G. Russell', 'F. Alonso'], rivals: ['M. Verstappen', 'S. Pérez'] },
  'G. Russell': { friends: ['L. Norris', 'L. Hamilton', 'A.K. Antonelli'], rivals: ['M. Verstappen'] },
  'A.K. Antonelli': { friends: ['G. Russell', 'O. Bearman'], rivals: [] },
  'F. Alonso': { friends: ['L. Stroll', 'S. Pérez', 'L. Hamilton'], rivals: ['N. Hülkenberg'] },
  'L. Stroll': { friends: ['F. Alonso'], rivals: [] },
  'P. Gasly': { friends: ['C. Leclerc', 'E. Ocon'], rivals: ['F. Colapinto'] },
  'F. Colapinto': { friends: [], rivals: ['P. Gasly'] },
  'E. Ocon': { friends: ['P. Gasly'], rivals: [] },
  'N. Hülkenberg': { friends: ['K. Magnussen', 'V. Bottas'], rivals: ['F. Alonso'] },
  'O. Bearman': { friends: ['A.K. Antonelli', 'K. Magnussen'], rivals: [] },
  'G. Bortoleto': { friends: ['N. Hülkenberg'], rivals: [] },
  'A. Albon': { friends: ['C. Sainz', 'L. Lawson'], rivals: [] },
  'C. Sainz': { friends: ['L. Norris', 'A. Albon', 'F. Alonso'], rivals: ['C. Leclerc'] },
  'Y. Tsunoda': { friends: ['M. Verstappen', 'I. Hadjar'], rivals: [] },
  'I. Hadjar': { friends: ['Y. Tsunoda'], rivals: [] },
};

function initDriverRelationships() {
  if (gameState.driverRelationships) return;
  gameState.driverRelationships = {};
  const playerName = gameState.playerName;
  const socialCircle = DRIVER_SOCIAL_CIRCLES[playerName];

  gameState.drivers.forEach(d => {
    if (!d.isPlayer) {
      const isTeammate = d.teamIdx === gameState.teamIdx;

      if (gameState.background === 'existing' && socialCircle) {
        // Existing driver: use social circle data
        if (socialCircle.friends.includes(d.name)) {
          gameState.driverRelationships[d.name] = 65 + Math.floor(Math.random() * 15); // 65-80
        } else if (socialCircle.rivals.includes(d.name)) {
          gameState.driverRelationships[d.name] = 10 + Math.floor(Math.random() * 10); // 10-20
        } else if (isTeammate) {
          gameState.driverRelationships[d.name] = 50 + Math.floor(Math.random() * 15); // 50-65
        } else {
          gameState.driverRelationships[d.name] = 25 + Math.floor(Math.random() * 20); // 25-45
        }
      } else {
        // New driver: teammate starts higher, others random
        gameState.driverRelationships[d.name] = isTeammate ? 40 + Math.floor(Math.random() * 20) : 20 + Math.floor(Math.random() * 30);
      }
    }
  });
}

// Get relationship level text
function getRelationshipLevel(val) {
  if (val >= 80) return { label: '挚友', color: 'var(--green)', icon: '💚' };
  if (val >= 60) return { label: '好友', color: 'var(--green)', icon: '🤝' };
  if (val >= 40) return { label: '熟人', color: 'var(--blue)', icon: '😐' };
  if (val >= 20) return { label: '冷淡', color: 'var(--orange)', icon: '🙄' };
  return { label: '敌对', color: 'var(--f1-red)', icon: '😤' };
}

// Change relationship
function changeRelationship(driverName, delta) {
  if (!gameState.driverRelationships) initDriverRelationships();
  if (gameState.driverRelationships[driverName] === undefined) {
    gameState.driverRelationships[driverName] = 30;
  }
  gameState.driverRelationships[driverName] = Math.max(0, Math.min(100, gameState.driverRelationships[driverName] + delta));
}

// Social interaction options
const SOCIAL_ACTIONS = [
  { id: 'dinner', name: '一起晚餐', cost: 2, desc: '邀请车手共进晚餐，增进感情', repGain: 8, type: 'friendly' },
  { id: 'gym', name: '一起训练', cost: 0, desc: '邀请车手一起体能训练', repGain: 5, type: 'friendly' },
  { id: 'sim_racing', name: '模拟器对战', cost: 1, desc: '在线上模拟器赛一局', repGain: 6, type: 'friendly' },
  { id: 'gift', name: '送礼物', cost: 5, desc: '送一份精心挑选的礼物', repGain: 12, type: 'friendly' },
  { id: 'interview', name: '公开赞扬', cost: 0, desc: '在采访中公开称赞对方', repGain: 4, type: 'friendly', mediaCost: true },
  { id: 'taunt', name: '嘲讽', cost: 0, desc: '公开嘲讽对方，损害关系', repGain: -15, type: 'hostile', mediaCost: true },
];

function renderSocial() {
  showScreen('sponsor-screen'); // Reuse sponsor-screen as generic screen
  initDriverRelationships();
  const container = document.getElementById('sponsor-screen');

  const socialUsedThisWeek = gameState.socialUsedThisWeek;

  // Sort drivers by relationship (highest first), exclude player
  const otherDrivers = gameState.drivers
    .filter(d => !d.isPlayer)
    .map(d => ({
      driver: d,
      rel: gameState.driverRelationships[d.name] || 30,
      isTeammate: d.teamIdx === gameState.teamIdx,
    }))
    .sort((a, b) => b.rel - a.rel);

  container.innerHTML = `
    <button class="back-btn" onclick="renderHub()">← 返回主页</button>
    <div class="section-header">
      <h2 class="font-display">🤝 车手社交</h2>
    </div>
    <div class="card" style="padding:12px;margin-bottom:12px;display:flex;justify-content:space-between;align-items:center;">
      <div style="font-size:0.85rem;color:var(--text-secondary);">每周仅可进行一次社交互动${socialUsedThisWeek ? '（本周已用）' : ''}</div>
      <div style="font-size:0.85rem;color:var(--green);font-weight:700;">💵 $${(gameState.money || 0).toFixed(1)}M</div>
    </div>
    ${socialUsedThisWeek ? `
      <div class="card" style="text-align:center;padding:30px;margin-bottom:12px;">
        <div style="font-size:2.5rem;margin-bottom:8px;">⏸️</div>
        <h3 style="font-size:0.95rem;">本周社交互动已完成</h3>
        <p class="text-muted" style="margin-top:6px;font-size:0.8rem;">每站比赛周只能对一位车手进行一次社交行为</p>
      </div>
    ` : ''}
    <div style="display:grid;gap:10px;">
      ${otherDrivers.map(({ driver, rel, isTeammate }) => {
        const level = getRelationshipLevel(rel);
        const team = TEAMS[driver.teamIdx];
        const isMax = rel >= 100;
        const socialCircle = DRIVER_SOCIAL_CIRCLES[gameState.playerName];
        const isFriend = socialCircle && socialCircle.friends.includes(driver.name);
        const isRival = socialCircle && socialCircle.rivals.includes(driver.name);
        return `
          <div class="card" style="padding:12px;${isMax ? 'border-color:var(--gold);' : ''}">
            <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:8px;">
              <div>
                <span style="font-weight:700;">${driver.name}</span>
                ${isTeammate ? '<span style="font-size:0.7rem;color:var(--blue);margin-left:6px;">队友</span>' : ''}
                ${isFriend ? '<span style="font-size:0.7rem;color:var(--green);margin-left:6px;">好友</span>' : ''}
                ${isRival ? '<span style="font-size:0.7rem;color:var(--f1-red);margin-left:6px;">宿敌</span>' : ''}
                <span class="team-badge ${team.css}" style="font-size:0.7rem;padding:2px 6px;margin-left:6px;">${team.short}</span>
              </div>
              <div style="font-size:0.85rem;">
                ${level.icon} <span style="color:${level.color};font-weight:600;">${level.label}</span>
                <span style="color:${isMax ? 'var(--gold)' : 'var(--text-muted)'};margin-left:4px;font-weight:${isMax ? '700' : '400'};">${isMax ? 'MAX' : rel}</span>
              </div>
            </div>
            <div class="stat-bar-bg" style="height:6px;margin-bottom:8px;">
              <div class="stat-bar-fill" style="width:${rel}%;background:${isMax ? 'var(--gold)' : level.color};"></div>
            </div>
            <div style="display:flex;gap:6px;flex-wrap:wrap;">
              ${SOCIAL_ACTIONS.map(a => {
                const isHostile = a.type === 'hostile';
                const canAfford = (gameState.money || 0) >= a.cost;
                const disabled = socialUsedThisWeek || (isMax && !isHostile) || !canAfford;
                let disabledReason = '';
                if (socialUsedThisWeek) disabledReason = '本周已用';
                else if (isMax && !isHostile) disabledReason = '已满级';
                else if (!canAfford) disabledReason = '余额不足';

                return `
                <button class="btn" style="font-size:0.75rem;padding:4px 10px;${isHostile ? 'border-color:var(--f1-red);color:var(--f1-red);' : ''}${disabled ? 'opacity:0.35;cursor:not-allowed;' : ''}"
                  ${disabled ? 'disabled' : `onclick="doSocial('${driver.name}', '${a.id}')"`}
                  title="${a.desc}${disabledReason ? ' (' + disabledReason + ')' : ''}">
                  ${a.name} ${a.cost > 0 ? '$' + a.cost + 'M' : '免费'}
                </button>
              `}).join('')}
            </div>
          </div>
        `;
      }).join('')}
    </div>
  `;
}

function doSocial(driverName, actionId) {
  const action = SOCIAL_ACTIONS.find(a => a.id === actionId);
  if (!action) return;

  // Check weekly limit
  if (gameState.socialUsedThisWeek) {
    showToast('本周社交互动已用完！', 'error');
    return;
  }

  if ((gameState.money || 0) < action.cost) {
    showToast('余额不足！', 'error');
    return;
  }

  const currentRel = gameState.driverRelationships[driverName] || 30;

  // Check if MAX and friendly action
  if (currentRel >= 100 && action.type !== 'hostile') {
    showToast(`${driverName} 的亲密度已满级！`, 'info');
    return;
  }

  gameState.money -= action.cost;
  const oldRel = currentRel;

  let gain;
  if (action.type === 'hostile') {
    // Taunt: larger negative, with randomness
    gain = action.repGain + Math.floor(Math.random() * 5 - 2); // -17 to -13
  } else {
    gain = action.repGain + Math.floor(Math.random() * 4 - 2); // ±2 randomness
    // Diminishing returns near max
    if (oldRel >= 90) gain = Math.max(1, Math.floor(gain * 0.5));
    else if (oldRel >= 80) gain = Math.max(2, Math.floor(gain * 0.7));
  }

  changeRelationship(driverName, gain);
  const newRel = gameState.driverRelationships[driverName];
  gameState.socialUsedThisWeek = true;

  // Effects based on action type
  let bonusText = '';

  if (action.type === 'hostile') {
    // Taunt effects
    gameState.reputation.fanPopularity = Math.min(100, (gameState.reputation.fanPopularity || 0) + 3);
    gameState.reputation.mediaRelation = Math.max(0, (gameState.reputation.mediaRelation || 0) - 4);
    gameState.reputation.driverRespect = Math.max(0, (gameState.reputation.driverRespect || 0) - 5);

    if (oldRel >= 20 && newRel < 20) {
      bonusText = ' 💢 你们正式成为宿敌！';
    } else if (oldRel >= 40 && newRel < 40) {
      bonusText = ' 关系急剧恶化';
    } else {
      bonusText = ' 围场炸锅了！';
    }
  } else {
    // Friendly effects
    if (oldRel < 60 && newRel >= 60) {
      bonusText = ' 🎉 你们成为了好友！';
      gameState.reputation.driverRespect = Math.min(100, (gameState.reputation.driverRespect || 0) + 3);
    } else if (oldRel < 80 && newRel >= 80) {
      bonusText = ' 🎉 你们成为了挚友！转会时可能获得帮助';
      gameState.reputation.driverRespect = Math.min(100, (gameState.reputation.driverRespect || 0) + 5);
    } else if (newRel >= 100) {
      bonusText = ' ⭐ 亲密度已满级(MAX)！';
    }
  }

  if (action.mediaCost) {
    gameState.reputation.mediaRelation = Math.max(0, (gameState.reputation.mediaRelation || 0) - 2);
  }

  saveGame();

  const sign = gain >= 0 ? '+' : '';
  const toastType = action.type === 'hostile' ? 'info' : 'success';
  showToast(`${action.name} → ${driverName} 亲密度 ${sign}${gain}${bonusText}`, toastType, 4000);
  renderSocial();
}

// ============ TEAM PRINCIPAL EVENTS ============

const PRINCIPAL_EVENTS = [
  {
    title: '📋 领队一对一谈话',
    desc: (p) => `${p.name} 邀请你到办公室进行一对一谈话，讨论你的未来。`,
    type: 'principal',
    options: [
      { label: 'A', text: '表达忠诚 - 承诺长期效力', effect: { teamTrust: 8, driverRep: 3 }, principalMsg: '领队对你的忠诚表示赞赏' },
      { label: 'B', text: '提出改进需求 - 要更好的赛车', effect: { teamTrust: -4, pace: 2, driverRep: -2 }, principalMsg: '领队表示会考虑你的要求' },
      { label: 'C', text: '询问车队计划 - 了解发展方向', effect: { raceIQ: 3, teamTrust: 2 }, principalMsg: '领队分享了车队的长期规划' },
    ],
  },
  {
    title: '⚡ 领队施压',
    desc: (p) => `${p.name} 在赛前会议上公开对你施压："本站必须拿到积分。"`,
    type: 'principal',
    options: [
      { label: 'A', text: '接受挑战 - 压力就是燃料', effect: { pace: 4, attack: 2, risk: 3, consistency: -1 }, principalMsg: '领队期待你的表现' },
      { label: 'B', text: '冷静回应 - 设定合理期望', effect: { raceIQ: 3, teamTrust: 2, consistency: 1 }, principalMsg: '领队理解了你的立场' },
      { label: 'C', text: '反问领队 - 赛车够不够快？', effect: { teamTrust: -6, fanPop: 3, pace: 1 }, principalMsg: '领队表情不太好看' },
    ],
  },
  {
    title: '🤝 领队信任投票',
    desc: (p) => `${p.name} 在董事会上为你投了信任票，挡住了换掉你的提议。`,
    type: 'principal',
    options: [
      { label: 'A', text: '感恩 - 用成绩回报信任', effect: { pace: 3, consistency: 2, teamTrust: 5 }, principalMsg: '领队拍了拍你的肩膀' },
      { label: 'B', text: '要求更多资源 - 既然信任我', effect: { teamTrust: -2, pace: 1, driverRep: -1 }, principalMsg: '领队提醒你不要太贪心' },
    ],
  },
  {
    title: '📢 领队媒体战',
    desc: (p) => `${p.name} 在媒体前为你辩护，称"他是围场最有天赋的车手之一"。`,
    type: 'principal',
    options: [
      { label: 'A', text: '公开感谢领队支持', effect: { mediaRep: 4, teamTrust: 4, fanPop: 2 }, principalMsg: '领队微笑回应' },
      { label: 'B', text: '低调处理 - 用成绩说话', effect: { consistency: 3, raceIQ: 1, mediaRep: 1 }, principalMsg: '领队欣赏你的职业态度' },
    ],
  },
  {
    title: '🔄 领队暗示转会',
    desc: (p) => `${p.name} 暗示你"如果有更好的机会，他不会阻拦"，这是在考验你还是在赶人？`,
    type: 'principal',
    options: [
      { label: 'A', text: '表态留下 - 我忠于这支车队', effect: { teamTrust: 10, fanPop: 5, consistency: 2 }, principalMsg: '领队松了口气' },
      { label: 'B', text: '试探性地询问 - 哪支车队？', effect: { raceIQ: 3, teamTrust: -5, mediaRep: -2 }, principalMsg: '领队含糊其辞' },
      { label: 'C', text: '直接要求转会 - 时机到了', effect: { teamTrust: -15, fanPop: -3, pace: 2 }, principalMsg: '领队说"我会考虑的"' },
    ],
  },
];

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

  // Segment 2: Weather-dependent OR random event (70% chance)
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
  } else if (Math.random() < 0.7) {
    // 70% chance to get a random event instead of the standard overtake decision
    const randomEvent = RANDOM_EVENTS[Math.floor(Math.random() * RANDOM_EVENTS.length)];
    allDecisions.push({
      segment: 2,
      title: randomEvent.title,
      desc: randomEvent.desc,
      options: randomEvent.options,
      isRandomEvent: true,
      eventType: randomEvent.type,
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

  // Segment 3.5: Team principal event (20% chance, before segment 4)
  if (Math.random() < 0.20) {
    const principal = TEAM_PRINCIPALS[gameState.teamIdx];
    const principalEvent = PRINCIPAL_EVENTS[Math.floor(Math.random() * PRINCIPAL_EVENTS.length)];
    allDecisions.push({
      segment: 3,
      title: principalEvent.title,
      desc: principalEvent.desc(principal),
      options: principalEvent.options.map(opt => ({
        ...opt,
        text: opt.text + ` (${opt.principalMsg})`,
      })),
      isPrincipalEvent: true,
    });
  }

  // Segment 4: Late race decision - 60% chance for a second random event (different from segment 2)
  const usedEventTypes = allDecisions.filter(d => d.isRandomEvent).map(d => d.eventType);
  const availableEvents = RANDOM_EVENTS.filter(e => !usedEventTypes.includes(e.type) || RANDOM_EVENTS.length <= usedEventTypes.length);
  if (Math.random() < 0.6 && availableEvents.length > 0) {
    // 60% chance for a second random event
    const randomEvent = availableEvents[Math.floor(Math.random() * availableEvents.length)];
    allDecisions.push({
      segment: 4,
      title: randomEvent.title,
      desc: randomEvent.desc,
      options: randomEvent.options,
      isRandomEvent: true,
      eventType: randomEvent.type,
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
  // === 普通 (Common) - 首赛季/基础里程碑 ===
  { id: 'first_points', name: '📍 首获积分', desc: '第一次获得锦标赛积分', icon: '📍', rarity: 'common', check: (gs) => gs.careerPoints >= 1 },
  { id: 'first_podium', name: '🥉 初登领奖台', desc: '第一次登上领奖台', icon: '🥉', rarity: 'common', check: (gs) => gs.careerPodiums >= 1 },
  { id: 'first_win', name: '🏆 首胜', desc: '赢得你的第一场分站冠军', icon: '🏆', rarity: 'common', check: (gs) => gs.careerWins >= 1 },
  { id: 'first_pole', name: '🎯 首个杆位', desc: '获得你的第一个杆位', icon: '🎯', rarity: 'common', check: (gs) => (gs.careerPoles || 0) >= 1 },
  { id: 'ironman', name: '🛡️ 铁人', desc: '连续10场完赛', icon: '🛡️', rarity: 'common', check: (gs) => gs.consecutiveFinishes >= 10 },
  { id: 'team_loyalty', name: '❤️ 忠诚', desc: '在同一支车队效力3个赛季', icon: '❤️', rarity: 'common', check: (gs) => gs.seasonsAtCurrentTeam >= 3 },
  { id: 'century', name: '💯 百分俱乐部', desc: '单赛季获得超过100分', icon: '💯', rarity: 'common', check: (gs) => gs.seasonPoints >= 100 },
  { id: 'social_butterfly', name: '🤝 社交达人', desc: '与5位车手达到好友关系(60+)', icon: '🤝', rarity: 'common', check: (gs) => {
    if (!gs.driverRelationships) return false;
    return Object.values(gs.driverRelationships).filter(v => v >= 60).length >= 5;
  }},
  { id: 'best_friend', name: '💚 挚友', desc: '与一位车手达到挚友关系(80+)', icon: '💚', rarity: 'common', check: (gs) => {
    if (!gs.driverRelationships) return false;
    return Object.values(gs.driverRelationships).filter(v => v >= 80).length >= 1;
  }},

  // === 稀有 (Rare) - 多赛季积累/需要技巧 ===
  { id: 'five_wins', name: '⭐ 五冠王', desc: '职业生涯赢得5场分站冠军', icon: '⭐', rarity: 'rare', check: (gs) => gs.careerWins >= 5 },
  { id: 'ten_podiums', name: '💎 常客', desc: '职业生涯10次登上领奖台', icon: '💎', rarity: 'rare', check: (gs) => gs.careerPodiums >= 10 },
  { id: 'pole_master', name: '🎯 杆位大师', desc: '获得5次杆位', icon: '🎯', rarity: 'rare', check: (gs) => (gs.careerPoles || 0) >= 5 },
  { id: 'rain_master', name: '🌧️ 雨神', desc: '在雨天比赛中获胜', icon: '🌧️', rarity: 'rare', check: (gs) => gs.rainWins >= 1 },
  { id: 'underdog', name: '🐺 黑马', desc: '在排名后5的车队中获得领奖台', icon: '🐺', rarity: 'rare', check: (gs) => gs.underdogPodium >= 1 },
  { id: 'double_century', name: '💰 200分赛季', desc: '单赛季获得超过200分', icon: '💰', rarity: 'rare', check: (gs) => gs.seasonPoints >= 200 },
  { id: 'ironman_20', name: '🔩 钢铁侠', desc: '连续20场完赛', icon: '🔩', rarity: 'rare', check: (gs) => gs.consecutiveFinishes >= 20 },
  { id: 'sprint_win', name: '🏁 冲刺赛冠军', desc: '赢得一场冲刺赛', icon: '🏁', rarity: 'rare', check: (gs) => (gs.sprintWins || 0) >= 1 },
  { id: 'perfect_weekend', name: '✨ 完美周末', desc: '同一站获得杆位并夺冠', icon: '✨', rarity: 'rare', check: (gs) => (gs.perfectWeekends || 0) >= 1 },
  { id: 'all_rounds', name: '🌍 赛季全勤', desc: '单赛季全部24站完赛', icon: '🌍', rarity: 'rare', check: (gs) => (gs.seasonFinishes || 0) >= 24 },

  // === 史诗 (Epic) - 重大成就/需要多个赛季的卓越表现 ===
  { id: 'champion', name: '👑 世界冠军', desc: '赢得世界冠军', icon: '👑', rarity: 'epic', check: (gs) => gs.championships >= 1 },
  { id: 'ten_wins', name: '🔮 十胜', desc: '职业生涯赢得10场分站冠军', icon: '🔮', rarity: 'epic', check: (gs) => gs.careerWins >= 10 },
  { id: 'twenty_podiums', name: '🌟 二十次领奖台', desc: '职业生涯20次登上领奖台', icon: '🌟', rarity: 'epic', check: (gs) => gs.careerPodiums >= 20 },
  { id: 'pole_sweep', name: '🎪 杆位横扫', desc: '获得10次杆位', icon: '🎪', rarity: 'epic', check: (gs) => (gs.careerPoles || 0) >= 10 },
  { id: 'grand_slam', name: '🎖️ 大满贯', desc: '单赛季杆位+冠军+最多胜场', icon: '🎖️', rarity: 'epic', check: (gs) => gs.grandSlam === true },
  { id: 'back_to_back', name: '🔗 连胜', desc: '连续3场分站冠军', icon: '🔗', rarity: 'epic', check: (gs) => (gs.consecutiveWins || 0) >= 3 },
  { id: 'rain_dominance', name: '⛈️ 雨天统治', desc: '在雨天比赛中获得3场胜利', icon: '⛈️', rarity: 'epic', check: (gs) => (gs.rainWins || 0) >= 3 },
  { id: 'comeback_king', name: '🔄 逆转之王', desc: '从P10或更后发车获胜', icon: '🔄', rarity: 'epic', check: (gs) => gs.comebackWin >= 1 },
  { id: 'max_stat', name: '💯 极限突破', desc: '任意一项属性达到100(MAX)', icon: '💯', rarity: 'epic', check: (gs) => {
    return Object.values(gs.stats).some(v => v >= 100);
  }},

  // === 传说 (Legendary) - 近乎不可能/职业生涯定义级 ===
  { id: 'double_champion', name: '👑👑 双冠王', desc: '赢得2次世界冠军', icon: '👑', rarity: 'legendary', check: (gs) => gs.championships >= 2 },
  { id: 'triple_champion', name: '👑👑👑 三冠王', desc: '赢得3次世界冠军', icon: '👑', rarity: 'legendary', check: (gs) => gs.championships >= 3 },
  { id: 'fifteen_wins', name: '💥 十五胜', desc: '职业生涯赢得15场分站冠军', icon: '💥', rarity: 'legendary', check: (gs) => gs.careerWins >= 15 },
  { id: 'fivestar_season', name: '⭐⭐⭐⭐⭐ 统治赛季', desc: '单赛季获得超过350分', icon: '⭐', rarity: 'legendary', check: (gs) => gs.seasonPoints >= 350 },
  { id: 'paddock_king', name: '🏰 围场之王', desc: '与所有车手达到好友关系(60+)', icon: '🏰', rarity: 'legendary', check: (gs) => {
    if (!gs.driverRelationships) return false;
    return Object.values(gs.driverRelationships).filter(v => v >= 60).length >= 19;
  }},
  { id: 'flawless_season', name: '🏆🏆 完美赛季', desc: '单赛季全部24站完赛且零DNF，同时获得冠军', icon: '🏆', rarity: 'legendary', check: (gs) => gs.flawlessSeason === true },
  { id: 'comeback_legend', name: '🌅 逆转传奇', desc: '从P15或更后发车获胜', icon: '🌅', rarity: 'legendary', check: (gs) => (gs.comebackWin || 0) >= 1 && (gs.comebackFromPos || 0) >= 15 },
];

const RARITY_INFO = {
  common: { label: '普通', color: 'var(--text-secondary)', bgColor: 'rgba(128,128,128,0.15)' },
  rare: { label: '稀有', color: 'var(--blue)', bgColor: 'rgba(59,130,246,0.15)' },
  epic: { label: '史诗', color: 'var(--purple)', bgColor: 'rgba(168,85,247,0.15)' },
  legendary: { label: '传说', color: 'var(--gold)', bgColor: 'rgba(234,179,8,0.15)' },
};

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

function createNewGame(name, backgroundId, selectedTeamIdx, replaceSlot) {
  const bg = BACKGROUNDS.find(b => b.id === backgroundId);
  const teamIdx = selectedTeamIdx !== undefined ? selectedTeamIdx : bg.teamRange[0] + Math.floor(Math.random() * (bg.teamRange[1] - bg.teamRange[0] + 1));
  const team = TEAMS[teamIdx];

  // If replaceSlot not specified, default to slot 0
  if (replaceSlot === undefined) replaceSlot = 0;

  // Base stats
  const baseStats = { pace: 80, consistency: 80, wet: 77, defend: 78, attack: 79, raceIQ: 78 };

  // Apply background modifiers
  const stats = {};
  for (const key in baseStats) {
    stats[key] = Math.max(50, Math.min(100, baseStats[key] + (bg.statMod[key] || 0)));
  }

  // Create AI drivers with team assignments
  const drivers = [];
  for (let t = 0; t < TEAMS.length; t++) {
    for (let d = 0; d < 2; d++) {
      if (t === teamIdx && d === replaceSlot) {
        // Player's slot - replaces the selected driver
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
        const aiIdx = t * 2 + d;
        const ai = AI_DRIVERS[aiIdx];
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
    sponsorYearsLeft: 0,
    totalEarnings: 0,
    money: 15, // Starting balance in $M - tight budget early on
    socialUsedThisWeek: false,
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
    gameState.stats[gameState.sponsor.bonus] = clamp(gameState.stats[gameState.sponsor.bonus] - gameState.sponsor.amount, 50, 100);
  }

  gameState.sponsor = offer;

  // Apply new sponsor bonus
  if (offer.bonus) {
    gameState.stats[offer.bonus] = clamp(gameState.stats[offer.bonus] + offer.amount, 50, 100);
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

function simulateQualifying(raceIdx, playerStrategy) {
  const track = TRACKS[raceIdx];
  const player = getPlayer();
  const results = [];

  gameState.drivers.forEach(driver => {
    let score;
    if (driver.isPlayer) {
      // Player score: pace dominant, car matters, consistency helps avoid mistakes
      score = driver.stats.pace * 0.45 +
              getTeamCar() * 0.30 +
              driver.stats.consistency * 0.15 +
              driver.stats.raceIQ * 0.10;
      score += (Math.random() - 0.5) * 10; // Wider randomness

      // Apply qualifying strategy modifier
      if (playerStrategy) {
        if (playerStrategy === 'push') {
          score += 3; // Push hard: more pace but risk of mistake (handled by wider random below)
          score += (Math.random() - 0.5) * 6; // Extra randomness for pushing
        } else if (playerStrategy === 'balanced') {
          score += 1; // Balanced: small bonus, normal randomness
        } else if (playerStrategy === 'conservative') {
          score -= 2; // Conservative: slower but consistent
          score += (Math.random() - 0.5) * 4; // Less randomness
        }
      }
    } else {
      const s = driver.stats;
      // AI: pace + skill + car, with wet/track adaptation
      score = (s.pace || 75) * 0.45 +
              (s.skill || 75) * 0.10 +
              getCarForTeam(driver.teamIdx) * 0.30 +
              (s.consistency || 75) * 0.15;
      score += (Math.random() - 0.5) * 10;
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
    score = s.pace * 0.20 +
            s.consistency * 0.18 +
            s.wet * weather.wetMod * 0.14 +
            s.raceIQ * 0.16 +
            s.attack * 0.10 +
            s.defend * 0.07 +
            getTeamCar() * 0.15;

    // Apply modifiers from decisions (moderate amplification)
    if (modifiers) {
      score += (modifiers.pace || 0) * 2;
      score += (modifiers.raceIQ || 0) * 1.8;
      score += (modifiers.attack || 0) * 1.5;
      score += (modifiers.defend || 0) * 1.5;
      score += (modifiers.consistency || 0) * 1.5;
      score -= (modifiers.tireWear || 0) * (segIdx / totalSegs) * 1.2;
    }
  } else {
    score = (s.pace || 75) * 0.25 +
            (s.consistency || 75) * 0.20 +
            (s.wet || 75) * weather.wetMod * 0.15 +
            (s.raceIQ || 75) * 0.15 +
            (s.attack || 75) * 0.10 +
            (s.defend || 75) * 0.05 +
            getCarForTeam(driver.teamIdx) * 0.10;
  }

  // Randomness (same for all drivers)
  const randRange = 12;
  score += (Math.random() - 0.5) * randRange;

  // Weather chaos
  score += (Math.random() - 0.5) * weather.chaosMod * 30;

  // DNF check (based on consistency)
  const consistency = driver.isPlayer ? s.consistency : (s.consistency || 75);
  const dnfChance = Math.max(0.005, (100 - consistency) / 1100);
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
      gameState.seasonFinishes = (gameState.seasonFinishes || 0) + 1;

      // Track consecutive wins
      if (playerResult.position === 1) {
        gameState.consecutiveWins = (gameState.consecutiveWins || 0) + 1;
      } else {
        gameState.consecutiveWins = 0;
      }

      if (playerResult.position === 1) {
        gameState.careerWins++;
        // Rain win achievement tracking
        if (gameState.currentWeather && gameState.currentWeather.wetMod > 0.2) {
          gameState.rainWins = (gameState.rainWins || 0) + 1;
        }
        // Comeback win (started P10 or worse)
        if (raceState && raceState.qualifyingResult && raceState.qualifyingResult.playerPos >= 10) {
          gameState.comebackWin = (gameState.comebackWin || 0) + 1;
          gameState.comebackFromPos = raceState.qualifyingResult.playerPos;
        }
        // Sprint win tracking
        if (raceState.sprintResult && raceState.sprintResult.position === 1) {
          gameState.sprintWins = (gameState.sprintWins || 0) + 1;
        }
        // Perfect weekend (pole + win)
        if (raceState.qualifyingResult && raceState.qualifyingResult.playerPos === 1) {
          gameState.perfectWeekends = (gameState.perfectWeekends || 0) + 1;
        }
      }
      if (playerResult.position <= 3) {
        gameState.careerPodiums++;
        // Underdog podium (team in bottom 5)
        if (gameState.teamIdx >= 5) {
          gameState.underdogPodium = (gameState.underdogPodium || 0) + 1;
        }
      }
    } else {
      gameState.consecutiveFinishes = 0;
      gameState.consecutiveWins = 0;
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
      gameState.stats[key] = clamp(gameState.stats[key] + Math.round(effects[key] * 0.3), 50, 100);
    }
  });
}

function train(statKey) {
  if (gameState.trainedThisWeek) return false;
  if (gameState.stats[statKey] >= 100) return false;

  const currentVal = gameState.stats[statKey];
  // Diminishing returns: higher stats grow slower
  let baseGain;
  if (currentVal < 70) baseGain = 5 + Math.floor(Math.random() * 3);      // 5-7
  else if (currentVal < 85) baseGain = 3 + Math.floor(Math.random() * 3); // 3-5
  else if (currentVal < 95) baseGain = 2 + Math.floor(Math.random() * 2); // 2-3
  else baseGain = 1;                                                       // 1 at 95+

  const actualGain = Math.min(baseGain, 100 - currentVal);
  const otherKeys = Object.keys(gameState.stats).filter(k => k !== statKey);
  const lossKey = otherKeys[Math.floor(Math.random() * otherKeys.length)];

  gameState.stats[statKey] = clamp(currentVal + actualGain, 50, 100);
  gameState.stats[lossKey] = clamp(gameState.stats[lossKey] - 1, 50, 100);
  gameState.trainedThisWeek = true;

  // AI drivers also train - maintain competitiveness
  aiDriverTraining();

  // Track total training sessions for milestone achievements
  gameState.totalTrainings = (gameState.totalTrainings || 0) + 1;

  return { gained: statKey, gain: actualGain, lost: lossKey };
}

// AI drivers train when player trains - keeps competition alive
function aiDriverTraining() {
  const player = getPlayer();
  const playerAvgStat = Object.values(gameState.stats).reduce((a, b) => a + b, 0) / Object.keys(gameState.stats).length;

  gameState.drivers.forEach(d => {
    if (d.isPlayer) return;

    // Each AI driver has a chance to "train" - influenced by team budget and driver age
    const teamCar = getCarForTeam(d.teamIdx);
    const driverAvg = Object.values(d.stats).reduce((a, b) => a + b, 0) / Object.values(d.stats).length;

    // Better teams train more effectively; drivers below player's level train harder to catch up
    let trainChance = 0.35; // Base 35% chance
    if (driverAvg < playerAvgStat - 5) trainChance += 0.20; // Lagging behind: +20%
    if (teamCar >= 85) trainChance += 0.10; // Top team: +10%
    if (teamCar <= 70) trainChance -= 0.10; // Backmarker: -10%

    if (Math.random() < trainChance) {
      // Pick a random stat to improve
      const statKeys = Object.keys(d.stats).filter(k => k !== 'skill' && d.stats[k] < 99);
      if (statKeys.length > 0) {
        const trainKey = statKeys[Math.floor(Math.random() * statKeys.length)];
        let aiGain;
        const currentStat = d.stats[trainKey];

        // AI growth is slightly less than player but still meaningful
        if (currentStat < 75) aiGain = 1 + Math.floor(Math.random() * 2); // 1-2
        else if (currentStat < 90) aiGain = 1;                             // 1
        else aiGain = Math.random() < 0.5 ? 1 : 0;                        // 50% chance of +1

        d.stats[trainKey] = clamp(d.stats[trainKey] + aiGain, 55, 99);

        // Small chance of a stat declining (age/injury)
        if (Math.random() < 0.15) {
          const declineKeys = Object.keys(d.stats).filter(k => k !== 'skill' && k !== trainKey);
          const declineKey = declineKeys[Math.floor(Math.random() * declineKeys.length)];
          d.stats[declineKey] = clamp(d.stats[declineKey] - 1, 55, 99);
        }
      }
    }
  });
}

function generateContractOffers() {
  const player = getPlayer();
  const avgPos = gameState.raceResults.length > 0
    ? gameState.raceResults.reduce((sum, r) => sum + (r.dnf ? 20 : r.position), 0) / gameState.raceResults.length
    : 10;

  // Calculate player's market value
  const wins = gameState.raceResults.filter(r => !r.dnf && r.position === 1).length;
  const podiums = gameState.raceResults.filter(r => !r.dnf && r.position <= 3).length;
  const playerStanding = getDriverStandings().find(d => d.isPlayer);
  const champPos = playerStanding ? playerStanding.position : 10;
  const reputation = (gameState.reputation.teamTrust + gameState.reputation.mediaRelation + gameState.reputation.fanPopularity + gameState.reputation.driverRespect) / 4;

  // Market value score: higher = more attractive to top teams
  const marketScore = Math.max(0, 100 - avgPos * 3 + wins * 5 + podiums * 2 + (reputation - 50) * 0.3);

  const offers = [];

  // === Current team offer ===
  const currentTeam = TEAMS[gameState.teamIdx];
  const loyaltyBonus = gameState.seasonsAtCurrentTeam * 0.5;
  const currentBaseSalary = currentTeam.salary[0] + (currentTeam.salary[1] - currentTeam.salary[0]) * (1 - avgPos / 20);
  const currentSalary = Math.round((currentBaseSalary * (0.9 + Math.random() * 0.3) + loyaltyBonus) * 10) / 10;

  offers.push({
    team: currentTeam,
    salary: currentSalary,
    years: 1 + Math.floor(Math.random() * 3),
    isCurrent: true,
    interest: Math.min(100, 60 + marketScore * 0.3 + loyaltyBonus * 2),
    signingBonus: Math.round(currentSalary * 0.3 * 10) / 10,
    expectation: champPos <= 3 ? '争夺世界冠军' : champPos <= 7 ? '稳定得分' : '提升车队排名',
    expectationPos: champPos <= 3 ? 3 : champPos <= 7 ? 7 : 10,
    rivalDriver: null,
    clause: gameState.seasonsAtCurrentTeam >= 3 ? '一号车手条款' : '平等对待条款',
  });

  // === Other teams ===
  const eligibleTeams = TEAMS.filter((t, i) => i !== gameState.teamIdx);

  // Calculate interest for each team
  const teamInterests = eligibleTeams.map(team => {
    const teamIdx = TEAMS.findIndex(t => t.id === team.id);
    // Top teams only interested if player is performing well
    let interest = 30;
    if (team.car >= 90) {
      // Top teams need strong performance
      interest = Math.max(0, marketScore - 30 + (champPos <= 3 ? 30 : 0));
    } else if (team.car >= 80) {
      // Mid-top teams
      interest = Math.max(0, marketScore - 10 + (champPos <= 7 ? 20 : 0));
    } else if (team.car >= 70) {
      // Midfield teams - more welcoming
      interest = Math.max(20, marketScore + 10);
    } else {
      // Backmarker teams - always interested
      interest = Math.max(40, marketScore + 20);
    }

    // Reputation factor
    interest += (reputation - 50) * 0.2;

    // Driver relationship factor - if a friend is on the team, boost interest
    if (gameState.driverRelationships) {
      const teammate = gameState.drivers.find(d => d.teamIdx === teamIdx && !d.isPlayer);
      if (teammate) {
        const rel = gameState.driverRelationships[teammate.name] || 30;
        if (rel >= 80) {
          interest += 15; // Close friend recommends you to their team
        } else if (rel >= 60) {
          interest += 8;
        } else if (rel < 20) {
          interest -= 10; // Enemy blocks your transfer
        }
      }
    }

    // Random factor
    interest += (Math.random() - 0.5) * 20;

    return { team, teamIdx, interest: Math.min(100, Math.max(0, interest)) };
  });

  // Sort by interest and take top teams
  teamInterests.sort((a, b) => b.interest - a.interest);

  // Number of offers based on performance (2-5 additional offers)
  const numAdditionalOffers = Math.max(1, Math.min(4, Math.round(marketScore / 25)));

  for (let i = 0; i < numAdditionalOffers && i < teamInterests.length; i++) {
    const { team, teamIdx, interest } = teamInterests[i];

    // Only offer if interest is high enough
    if (interest < 25) continue;

    const performanceFactor = Math.max(0.3, 1 - avgPos / 25);
    const teamFactor = team.car / 95;
    const interestFactor = interest / 100;
    const salary = Math.round((team.salary[0] + (team.salary[1] - team.salary[0]) * performanceFactor * teamFactor * interestFactor) * 10) / 10;

    // Generate a rival driver for the seat
    const rivals = ['F2新秀', '自由车手', '其他车队车手', '青训车手'];
    const rivalName = rivals[Math.floor(Math.random() * rivals.length)];

    // Generate expectations based on team strength
    let expectation, expectationPos;
    if (team.car >= 90) {
      expectation = '争夺世界冠军';
      expectationPos = 3;
    } else if (team.car >= 80) {
      expectation = '频繁登上领奖台';
      expectationPos = 5;
    } else if (team.car >= 70) {
      expectation = '稳定进入积分区';
      expectationPos = 8;
    } else {
      expectation = '争取积分完赛';
      expectationPos = 12;
    }

    // Generate clauses
    const clauses = ['平等对待条款', '一号车手条款', '成绩奖金条款', '续约选项条款', '无条款'];
    const clause = clauses[Math.floor(Math.random() * clauses.length)];

    offers.push({
      team,
      salary: Math.max(1, salary),
      years: 1 + Math.floor(Math.random() * 3),
      isCurrent: false,
      interest: Math.round(interest),
      signingBonus: Math.round(Math.max(0, salary * (0.2 + Math.random() * 0.4)) * 10) / 10,
      expectation,
      expectationPos,
      rivalDriver: rivalName,
      rivalInterest: Math.round(Math.max(10, 80 - interest * 0.5 + Math.random() * 20)),
      clause,
    });
  }

  // Sort offers: current team first, then by team car performance
  offers.sort((a, b) => {
    if (a.isCurrent) return -1;
    if (b.isCurrent) return 1;
    return b.team.car - a.team.car;
  });

  return offers;
}

function acceptContract(offer) {
  const teamIdx = TEAMS.findIndex(t => t.id === offer.team.id);
  const oldTeamIdx = gameState.teamIdx;

  // Process transfer cascade before updating player's team
  const transferLog = [];
  if (oldTeamIdx !== teamIdx) {
    processTransferCascade(teamIdx, transferLog);
  }

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

  // Store transfer log for display
  gameState.lastTransferLog = transferLog;
}

function startNewSeason() {
  const oldTeamId = gameState.teamId;
  // Save career race results before resetting
  if (!gameState.careerRaceResults) gameState.careerRaceResults = [];
  gameState.careerRaceResults = gameState.careerRaceResults.concat(gameState.raceResults);

  gameState.season++;
  gameState.currentRace = 0;
  gameState.seasonNumber++;
  gameState.raceResults = [];
  gameState.trainedThisWeek = false;
  gameState.socialUsedThisWeek = false;
  gameState.seasonPoints = 0;
  gameState.seasonFinishes = 0;
  gameState.consecutiveWins = 0;
  gameState.flawlessSeason = false;
  gameState.grandSlam = false;

  // Track team loyalty
  if (gameState.teamId === oldTeamId) {
    gameState.seasonsAtCurrentTeam++;
  } else {
    gameState.seasonsAtCurrentTeam = 1;
  }

  // Pay salary + sponsor income + race bonuses at start of new season
  const team = TEAMS[gameState.teamIdx];
  const sponsorIncome = gameState.sponsor ? (gameState.sponsor.salary || 0) : 0;
  const baseSalary = gameState.salary || team.salary[0] || 5;

  // Calculate race bonuses from last season
  let raceBonus = 0;
  const wins = gameState.raceResults.filter(r => !r.dnf && r.position === 1).length;
  const podiums = gameState.raceResults.filter(r => !r.dnf && r.position <= 3).length;
  const p2Count = gameState.raceResults.filter(r => !r.dnf && r.position === 2).length;
  const p3Count = gameState.raceResults.filter(r => !r.dnf && r.position === 3).length;
  // Podium bonuses: P1=2.0M each, P2=1.0M each, P3=0.5M each
  raceBonus += wins * 2.0 + p2Count * 1.0 + p3Count * 0.5;
  // Championship bonus
  if (isChampion) raceBonus += 10;
  // Team standing bonus (top 3 teams)
  const teamStanding = getTeamStandings().find(ts => ts.teamId === gameState.teamId);
  if (teamStanding) {
    if (teamStanding.position === 1) raceBonus += 5;
    else if (teamStanding.position === 2) raceBonus += 3;
    else if (teamStanding.position === 3) raceBonus += 2;
  }

  const seasonIncome = baseSalary + sponsorIncome + raceBonus;
  gameState.money += seasonIncome;
  gameState.totalEarnings += seasonIncome;

  // Store last season income breakdown for display
  gameState.lastSeasonIncome = {
    salary: baseSalary,
    sponsor: sponsorIncome,
    raceBonus: raceBonus,
    total: seasonIncome,
    wins: wins,
    podiums: podiums,
    isChampion: isChampion,
    teamStandingPos: teamStanding ? teamStanding.position : null,
  };

  // Decrement sponsor contract years
  if (gameState.sponsorYearsLeft > 0) {
    gameState.sponsorYearsLeft--;
    if (gameState.sponsorYearsLeft <= 0) {
      // Sponsor contract expired
      if (gameState.sponsor && gameState.sponsor.bonus) {
        gameState.stats[gameState.sponsor.bonus] = clamp(gameState.stats[gameState.sponsor.bonus] - gameState.sponsor.amount, 50, 100);
      }
      gameState.sponsor = null;
    }
  }

  // Reset points
  gameState.drivers.forEach(d => {
    d.points = 0;
    d.positions = [];
    d.dnf = 0;
  });
  gameState.teamStandings.forEach(ts => ts.points = 0);

  // Age effect - performance-based growth for AI drivers
  gameState.drivers.forEach(d => {
    if (!d.isPlayer) {
      // Drivers who performed well grow more; poor performers decline
      const avgPos = d.positions.length > 0
        ? d.positions.reduce((a, b) => a + (b || 20), 0) / d.positions.length
        : 15;
      const performanceBonus = avgPos <= 5 ? 1.5 : avgPos <= 10 ? 0.5 : -0.5;

      for (const key in d.stats) {
        if (key !== 'skill') {
          const growth = (Math.random() - 0.35) * 2 + performanceBonus * 0.5;
          d.stats[key] = clamp((d.stats[key] || 75) + growth, 55, 99);
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
      if (gameState.money === undefined) gameState.money = 15;
      if (gameState.sponsorYearsLeft === undefined) gameState.sponsorYearsLeft = 0;
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

function showToast(message, type = 'info', duration = 3000) {
  const existing = document.querySelector('.toast');
  if (existing) existing.remove();

  const toast = document.createElement('div');
  toast.className = `toast toast-${type}`;
  toast.style.whiteSpace = 'pre-line';
  toast.textContent = message;
  document.body.appendChild(toast);
  setTimeout(() => toast.remove(), duration);
}

// ============ RENDER FUNCTIONS ============

function renderStartScreen() {
  showScreen('start-screen');
  const hasSave = hasSaveGame();
  document.getElementById('start-screen').innerHTML = `
    <div class="start-hero">
      <h1 class="font-display">F1 职业生涯</h1>
      <p class="subtitle">职业生涯模拟器</p>
      <div class="start-buttons">
        <button class="btn btn-primary btn-lg" onclick="renderNameInput()">
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

function renderNameInput() {
  showScreen('background-screen');
  const container = document.getElementById('background-screen');
  container.innerHTML = `
    <div class="section-header">
      <h2 class="font-display">🏎️ 开始你的职业生涯</h2>
    </div>
    <div class="card" style="padding:30px;text-align:center;margin-bottom:16px;cursor:pointer;border:2px solid var(--border);transition:all 0.2s;"
      onmouseover="this.style.borderColor='var(--f1-red)'"
      onmouseout="this.style.borderColor='var(--border)'"
      onclick="renderNewDriverNameInput()">
      <div style="font-size:3rem;margin-bottom:12px;">🏁</div>
      <h3 style="margin-bottom:8px;">新建车手</h3>
      <p class="text-muted">创建属于你自己的F1车手，选择背景故事和车队</p>
      <div style="margin-top:8px;font-size:0.8rem;color:var(--green);">→ 自定义姓名、背景、车队</div>
    </div>
    <div class="card" style="padding:30px;text-align:center;cursor:pointer;border:2px solid var(--border);transition:all 0.2s;"
      onmouseover="this.style.borderColor='var(--gold)'"
      onmouseout="this.style.borderColor='var(--border)'"
      onclick="renderExistingDriverSelect()">
      <div style="font-size:3rem;margin-bottom:12px;">👤</div>
      <h3 style="margin-bottom:8px;">扮演现役车手</h3>
      <p class="text-muted">选择一位真实F1车手，以他们的能力开启赛季</p>
      <div style="margin-top:8px;font-size:0.8rem;color:var(--gold);">→ 20位现役车手任选</div>
    </div>
  `;
}

function renderNewDriverNameInput() {
  showScreen('background-screen');
  const container = document.getElementById('background-screen');
  container.innerHTML = `
    <div class="section-header">
      <h2 class="font-display">🏎️ 创建你的车手</h2>
    </div>
    <div class="card" style="padding:30px;text-align:center;">
      <div style="font-size:3rem;margin-bottom:16px;">🏁</div>
      <p class="text-muted" style="margin-bottom:24px;">输入你的车手姓名，开启F1职业生涯</p>
      <div class="input-group" style="max-width:400px;margin:0 auto;">
        <input type="text" id="driver-name-input" placeholder="输入车手姓名..." maxlength="20" value=""
          style="text-align:center;font-size:1.2rem;padding:14px;"
          onkeydown="if(event.key==='Enter'){var n=document.getElementById('driver-name-input').value.trim();if(n.length>0)renderBackgroundSelect(n);}"
        >
      </div>
      <button class="btn btn-primary btn-lg" id="confirm-name-btn" disabled onclick="var n=document.getElementById('driver-name-input').value.trim();if(n.length>0)renderBackgroundSelect(n);" style="margin-top:20px;">
        下一步：选择背景 →
      </button>
    </div>
    <button class="btn" style="margin-top:12px;background:transparent;color:var(--text-secondary);" onclick="renderNameInput()">← 返回</button>
  `;

  const input = document.getElementById('driver-name-input');
  const btn = document.getElementById('confirm-name-btn');
  input.addEventListener('input', () => {
    btn.disabled = input.value.trim().length === 0;
  });
  input.focus();
}

function renderExistingDriverSelect() {
  showScreen('background-screen');
  const container = document.getElementById('background-screen');

  let selectedDriverIdx = null;

  container.innerHTML = `
    <div class="section-header">
      <h2 class="font-display">👤 选择现役车手</h2>
    </div>
    <p class="text-muted" style="margin-bottom:16px;">选择一位真实F1车手，以他们的能力属性开始职业生涯</p>
    <div style="display:grid;gap:10px;">
      ${TEAMS.map((team, teamIdx) => {
        const d1 = AI_DRIVERS[teamIdx * 2];
        const d2 = AI_DRIVERS[teamIdx * 2 + 1];
        return `
          <div style="border:1px solid var(--border);border-radius:10px;overflow:hidden;">
            <div style="background:var(--bg);padding:8px 12px;display:flex;align-items:center;gap:8px;">
              <span class="team-badge ${team.css}" style="font-size:0.8rem;">${team.short}</span>
              <span style="font-size:0.8rem;color:var(--text-muted);">赛车性能 ${team.car}</span>
            </div>
            <div style="display:grid;grid-template-columns:1fr 1fr;gap:1px;background:var(--border);">
              ${[d1, d2].map((d, di) => {
                const idx = teamIdx * 2 + di;
                const overall = Math.round((d.pace + d.consistency + d.wet + d.defend + d.attack + d.raceIQ) / 6);
                return `
                  <div class="existing-driver-card" data-idx="${idx}" style="border-radius:0;"
                    onclick="selectExistingDriver(${idx})">
                    <div style="font-weight:700;font-size:0.95rem;">${d.name}</div>
                    <div style="font-size:0.75rem;color:var(--text-muted);margin:4px 0;">综合: <span style="color:var(--gold);font-weight:700;">${overall}</span></div>
                    <div style="display:flex;gap:6px;font-size:0.7rem;flex-wrap:wrap;">
                      <span style="color:var(--f1-red);">⚡${d.pace}</span>
                      <span style="color:var(--green);">🎯${d.consistency}</span>
                      <span style="color:var(--blue);">🌧️${d.wet}</span>
                      <span style="color:var(--orange);">🧠${d.raceIQ}</span>
                    </div>
                  </div>
                `;
              }).join('')}
            </div>
          </div>
        `;
      }).join('')}
    </div>
    <button class="btn btn-primary btn-lg" id="confirm-existing-btn" disabled onclick="confirmExistingDriver()" style="margin-top:16px;">
      确认并开始职业生涯 →
    </button>
    <button class="btn" style="margin-top:8px;background:transparent;color:var(--text-secondary);" onclick="renderNameInput()">← 返回</button>
  `;
}

function selectExistingDriver(idx) {
  document.querySelectorAll('.existing-driver-card').forEach(c => c.classList.remove('selected'));
  const card = document.querySelector(`.existing-driver-card[data-idx="${idx}"]`);
  if (card) {
    card.classList.add('selected');
  }
  selectedExistingDriverIdx = idx;
  document.getElementById('confirm-existing-btn').disabled = false;
}

let selectedExistingDriverIdx = null;

function confirmExistingDriver() {
  if (selectedExistingDriverIdx === null) return;
  createGameAsExistingDriver(selectedExistingDriverIdx);
}

function createGameAsExistingDriver(driverIdx) {
  const teamIdx = Math.floor(driverIdx / 2);
  const driverSlot = driverIdx % 2; // 0 or 1 - which driver in the team
  const team = TEAMS[teamIdx];
  const aiDriver = AI_DRIVERS[driverIdx];

  // Player gets the real driver's stats
  const stats = {
    pace: aiDriver.pace,
    consistency: aiDriver.consistency,
    wet: aiDriver.wet,
    defend: aiDriver.defend,
    attack: aiDriver.attack,
    raceIQ: aiDriver.raceIQ,
  };

  // Create all 20 drivers, player replaces the selected one
  const drivers = [];
  for (let t = 0; t < TEAMS.length; t++) {
    for (let d = 0; d < 2; d++) {
      const aiIdx = t * 2 + d;
      if (t === teamIdx && d === driverSlot) {
        // Player's slot - use real driver's name and stats
        drivers.push({
          name: aiDriver.name,
          teamId: team.id,
          teamIdx: teamIdx,
          isPlayer: true,
          stats: { ...stats, skill: aiDriver.skill },
          points: 0,
          positions: [],
          dnf: 0,
        });
      } else {
        const ai = AI_DRIVERS[aiIdx];
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
    playerName: aiDriver.name,
    background: 'existing',
    teamId: team.id,
    teamIdx: teamIdx,
    season: 2025,
    currentRace: 0,
    stats: { ...stats },
    reputation: {
      teamTrust: 65,
      fanPopularity: 60,
      mediaRelation: 55,
      driverRespect: 55,
    },
    salary: team.salary[0],
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
    seasonPoints: 0,
    seasonsAtCurrentTeam: 1,
    achievements: [],
    sponsor: null,
    sponsorYearsLeft: 0,
    totalEarnings: 0,
    money: 15,
    socialUsedThisWeek: false,
  };

  showScreen('hub-screen');
  renderHub();
  saveGame();
  showToast(`欢迎，${aiDriver.name}！开始你的${team.short}生涯`, 'success');
}

function renderBackgroundSelect(driverName) {
  showScreen('background-screen');
  let selectedBg = null;

  const container = document.getElementById('background-screen');
  container.innerHTML = `
    <div class="section-header">
      <h2 class="font-display">欢迎，${driverName}！</h2>
    </div>
    <p class="text-muted" style="margin-bottom:20px">选择你的背景故事 — 每个背景都会影响你的初始属性，下一步可以选择效力车队</p>
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
    <button class="btn btn-primary btn-lg" id="confirm-bg-btn" disabled onclick="confirmBackground('${driverName}')">
      确认并选择车队
    </button>
  `;

  // Event listeners
  container.querySelectorAll('.bg-card').forEach(card => {
    card.addEventListener('click', () => {
      container.querySelectorAll('.bg-card').forEach(c => c.classList.remove('selected'));
      card.classList.add('selected');
      selectedBg = card.dataset.bg;
      document.getElementById('confirm-bg-btn').disabled = !selectedBg;
    });
  });
}

function confirmBackground(driverName) {
  const selectedCard = document.querySelector('.bg-card.selected');
  if (!driverName || !selectedCard) return;
  const bgId = selectedCard.dataset.bg;

  // Go to team selection
  renderTeamSelect(driverName, bgId);
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
        const d1 = AI_DRIVERS[idx * 2];
        const d2 = AI_DRIVERS[idx * 2 + 1];
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
            <div style="font-size:0.7rem;color:var(--text-secondary);margin-top:4px;border-top:1px solid var(--border);padding-top:4px;">
              🏎️ ${d1.name} · ${d2.name}
            </div>
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
      下一步：选择替代车手 →
    </button>
    <button class="btn" style="margin-top:8px;background:transparent;color:var(--text-secondary);" onclick="renderBackgroundSelect('${name}')">
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
  renderReplaceDriverSelect(name, bgId, teamIdx);
}

function renderReplaceDriverSelect(name, bgId, teamIdx) {
  showScreen('background-screen');
  const team = TEAMS[teamIdx];
  const bg = BACKGROUNDS.find(b => b.id === bgId);
  const d1 = AI_DRIVERS[teamIdx * 2];
  const d2 = AI_DRIVERS[teamIdx * 2 + 1];

  const container = document.getElementById('background-screen');
  let selectedSlot = null;

  container.innerHTML = `
    <div class="section-header">
      <h2 class="font-display">🔄 选择替代车手</h2>
    </div>
    <p class="text-muted" style="margin-bottom:8px;">你将加入 <span class="team-badge ${team.css}">${team.short}</span> ，取代以下一位车手</p>
    <p class="text-muted" style="margin-bottom:20px;font-size:0.8rem;">被替代的车手将离开F1围场，你将占据他们的席位</p>

    <div style="display:grid;grid-template-columns:1fr 1fr;gap:12px;">
      ${[d1, d2].map((d, di) => {
        const overall = Math.round((d.pace + d.consistency + d.wet + d.defend + d.attack + d.raceIQ) / 6);
        return `
          <div class="replace-driver-card" data-slot="${di}" style="text-align:center;">
            <div style="font-size:0.75rem;color:var(--text-muted);margin-bottom:4px;">${di === 0 ? '一号车手' : '二号车手'}</div>
            <div style="font-size:1.1rem;font-weight:700;margin-bottom:8px;">${d.name}</div>
            <div style="font-size:0.8rem;color:var(--gold);font-weight:700;margin-bottom:8px;">综合 ${overall}</div>
            <div style="display:flex;gap:8px;font-size:0.7rem;justify-content:center;flex-wrap:wrap;">
              <span style="color:var(--f1-red);">⚡${d.pace}</span>
              <span style="color:var(--green);">🎯${d.consistency}</span>
              <span style="color:var(--blue);">🌧️${d.wet}</span>
              <span style="color:var(--orange);">⚔️${d.attack}</span>
              <span style="color:var(--purple);">🛡️${d.defend}</span>
              <span style="color:var(--gold);">🧠${d.raceIQ}</span>
            </div>
          </div>
        `;
      }).join('')}
    </div>

    <div class="card" style="margin-top:16px;padding:14px;display:flex;align-items:center;gap:10px;">
      <span style="font-size:1.2rem;">${bg.icon}</span>
      <div style="flex:1;">
        <div style="font-size:0.85rem;font-weight:600;">${bg.name} · ${name} → ${team.short}</div>
        <div style="font-size:0.75rem;color:var(--text-secondary);">${bg.tags.map(t => t).join(' · ')}</div>
      </div>
    </div>

    <button class="btn btn-primary btn-lg" id="confirm-replace-btn" disabled onclick="confirmReplaceDriver('${name}', '${bgId}', ${teamIdx})">
      确认并开始职业生涯 →
    </button>
    <button class="btn" style="margin-top:8px;background:transparent;color:var(--text-secondary);" onclick="renderTeamSelect('${name}', '${bgId}')">
      ← 返回车队选择
    </button>
  `;

  container.querySelectorAll('.replace-driver-card').forEach(card => {
    card.addEventListener('click', () => {
      container.querySelectorAll('.replace-driver-card').forEach(c => c.classList.remove('selected'));
      card.classList.add('selected');
      selectedSlot = parseInt(card.dataset.slot);
      document.getElementById('confirm-replace-btn').disabled = false;
    });
  });

  // Store selected slot in a global for confirmReplaceDriver
  window._selectedReplaceSlot = null;
  container.querySelectorAll('.replace-driver-card').forEach(card => {
    card.addEventListener('click', () => {
      window._selectedReplaceSlot = parseInt(card.dataset.slot);
    });
  });
}

function confirmReplaceDriver(name, bgId, teamIdx) {
  const replaceSlot = window._selectedReplaceSlot;
  if (replaceSlot === null && replaceSlot !== 0) return;
  createNewGame(name, bgId, teamIdx, replaceSlot);
  showScreen('hub-screen');
  renderHub();
  saveGame();
  showToast(`欢迎来到F1！你取代了 ${AI_DRIVERS[teamIdx * 2 + replaceSlot].name} 的席位`, 'success');
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
        <span style="font-size:0.8rem;color:var(--green);margin-left:8px;">💵 $${(gameState.money || 0).toFixed(1)}M</span>
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
      <div class="hub-card" onclick="renderPR()">
        <div class="hub-icon">📺</div>
        <div class="hub-title">公关管理</div>
        <div class="hub-desc">花费金钱提升声望</div>
      </div>
      <div class="hub-card" onclick="renderSocial()">
        <div class="hub-icon">🤝</div>
        <div class="hub-title">车手社交</div>
        <div class="hub-desc">建立车手关系</div>
      </div>
    </div>

    ${gameState.currentRace < TRACKS.length ? `
      <button class="btn btn-primary btn-lg" onclick="startRaceWeekend()" style="margin-top:8px;">
        🏁 进入比赛周末
      </button>
      <button class="btn" onclick="confirmQuickSim()" style="margin-top:8px;width:100%;background:transparent;border:1px solid var(--border);color:var(--text-secondary);">
        ⚡ 一键模拟剩余赛季（${TRACKS.length - gameState.currentRace}站）
      </button>
    ` : `
      <button class="btn btn-primary btn-lg" onclick="endSeason()" style="margin-top:8px;">
        🏆 赛季结束
      </button>
    `}
    <button class="btn" onclick="confirmRetire()" style="margin-top:8px;width:100%;background:transparent;border:1px solid var(--f1-red);color:var(--f1-red);opacity:0.7;">
      🏳️ 退役结束职业生涯
    </button>
  `;
}

function confirmRetire() {
  showScreen('hub-screen');
  document.getElementById('hub-screen').innerHTML = `
    <div class="section-header">
      <h2 class="font-display">🏳️ 确认退役</h2>
    </div>
    <div class="card" style="text-align:center;padding:30px;">
      <div style="font-size:3rem;margin-bottom:16px;">🏳️</div>
      <h3>你确定要退役吗？</h3>
      <p class="text-muted" style="margin-top:8px;line-height:1.6;">
        退役后将结束你的F1职业生涯，并展示完整的生涯总结。<br>
        此操作不可撤销，但你可以开始新的职业生涯。
      </p>
      <div style="margin-top:20px;display:flex;gap:10px;justify-content:center;">
        <button class="btn" onclick="renderHub()" style="background:transparent;border:1px solid var(--border);">继续 racing</button>
        <button class="btn btn-primary" onclick="retire()" style="background:var(--f1-red);">确认退役</button>
      </div>
    </div>
  `;
}

function retire() {
  const player = getPlayer();
  const team = TEAMS[gameState.teamIdx];
  const standings = getDriverStandings();
  const playerStanding = standings.find(d => d.isPlayer);
  const teamStandings = getTeamStandings();
  const playerTeamStanding = teamStandings.find(ts => ts.teamId === gameState.teamId);

  // Calculate career stats - use careerRaceResults (all seasons) + current season
  const allRaceResults = (gameState.careerRaceResults || []).concat(gameState.raceResults);
  const totalRaces = allRaceResults.length;
  const wins = gameState.careerWins || 0;
  const podiums = gameState.careerPodiums || 0;
  const poles = gameState.careerPoles || 0;
  const points = gameState.careerPoints || 0;
  const championships = gameState.championships || 0;
  const dnfs = allRaceResults.filter(r => r.dnf).length;
  const bestFinish = allRaceResults.reduce((best, r) => {
    if (r.dnf) return best;
    return r.position < best ? r.position : best;
  }, 99);
  const avgPos = totalRaces > 0
    ? (allRaceResults.reduce((sum, r) => sum + (r.dnf ? 20 : r.position), 0) / totalRaces).toFixed(1)
    : '-';
  const winRate = totalRaces > 0 ? ((wins / totalRaces) * 100).toFixed(1) : '0';
  const podiumRate = totalRaces > 0 ? ((podiums / totalRaces) * 100).toFixed(1) : '0';

  // Career rating
  let rating = 50;
  rating += championships * 15;
  rating += wins * 3;
  rating += podiums * 1.5;
  rating += poles * 1;
  rating += (gameState.seasonNumber - 1) * 2;
  rating += (gameState.reputation.driverRespect - 50) * 0.2;
  rating = Math.min(100, Math.max(0, Math.round(rating)));

  let ratingLabel, ratingColor, ratingDesc;
  if (rating >= 95) { ratingLabel = 'S+'; ratingColor = 'var(--gold)'; ratingDesc = 'F1传奇 — 你将被载入史册'; }
  else if (rating >= 85) { ratingLabel = 'S'; ratingColor = 'var(--gold)'; ratingDesc = '名人堂级别 — 伟大的职业生涯'; }
  else if (rating >= 75) { ratingLabel = 'A'; ratingColor = 'var(--green)'; ratingDesc = '顶级车手 — 令人印象深刻'; }
  else if (rating >= 60) { ratingLabel = 'B'; ratingColor = 'var(--f1-red)'; ratingDesc = '优秀的F1车手'; }
  else if (rating >= 40) { ratingLabel = 'C'; ratingColor = 'var(--text-secondary)'; ratingDesc = '稳健的职业生涯'; }
  else { ratingLabel = 'D'; ratingColor = 'var(--text-muted)'; ratingDesc = '还有进步空间'; }

  // Unlock achievements
  const newAchievements = checkAchievements();

  showScreen('hub-screen');
  document.getElementById('hub-screen').innerHTML = `
    <div style="text-align:center;padding:30px 20px;">
      <div style="font-size:4rem;margin-bottom:12px;">🏁</div>
      <h1 class="font-display" style="margin-bottom:8px;">职业生涯结束</h1>
      <p style="font-size:1.1rem;color:var(--text-secondary);">
        ${gameState.playerName} · ${team.name}
      </p>
      <p style="font-size:0.85rem;color:var(--text-muted);margin-top:4px;">
        ${gameState.season - gameState.seasonNumber + 1} - ${gameState.season} · ${gameState.seasonNumber}个赛季
      </p>
    </div>

    <div class="card" style="text-align:center;padding:30px;border:2px solid ${ratingColor};box-shadow:0 0 30px rgba(255,215,0,0.1);">
      <div style="font-size:0.85rem;color:var(--text-muted);margin-bottom:8px;">生涯评级</div>
      <div style="font-family:'Orbitron';font-size:4rem;font-weight:900;color:${ratingColor};line-height:1;">${ratingLabel}</div>
      <div style="margin-top:8px;font-size:0.95rem;color:var(--text-secondary);">${ratingDesc}</div>
      <div style="margin-top:8px;font-size:0.75rem;color:var(--text-muted);">综合评分: ${rating}/100</div>
    </div>

    <div class="card" style="padding:20px;margin-top:12px;">
      <h3 style="margin-bottom:16px;font-size:0.9rem;color:var(--text-secondary);">生涯数据总览</h3>
      <div style="display:grid;grid-template-columns:repeat(3,1fr);gap:16px;text-align:center;">
        <div>
          <div style="font-family:'Orbitron';font-size:2rem;font-weight:800;color:var(--gold);">${championships}</div>
          <div style="font-size:0.75rem;color:var(--text-muted);">世界冠军</div>
        </div>
        <div>
          <div style="font-family:'Orbitron';font-size:2rem;font-weight:800;color:var(--gold);">${wins}</div>
          <div style="font-size:0.75rem;color:var(--text-muted);">分站冠军</div>
        </div>
        <div>
          <div style="font-family:'Orbitron';font-size:2rem;font-weight:800;">${podiums}</div>
          <div style="font-size:0.75rem;color:var(--text-muted);">领奖台</div>
        </div>
      </div>
      <div class="divider"></div>
      <div style="display:grid;grid-template-columns:repeat(3,1fr);gap:16px;text-align:center;">
        <div>
          <div style="font-family:'Orbitron';font-size:1.5rem;font-weight:700;">${poles}</div>
          <div style="font-size:0.75rem;color:var(--text-muted);">杆位</div>
        </div>
        <div>
          <div style="font-family:'Orbitron';font-size:1.5rem;font-weight:700;color:var(--f1-red);">${points}</div>
          <div style="font-size:0.75rem;color:var(--text-muted);">生涯积分</div>
        </div>
        <div>
          <div style="font-family:'Orbitron';font-size:1.5rem;font-weight:700;">${totalRaces}</div>
          <div style="font-size:0.75rem;color:var(--text-muted);">参赛场次</div>
        </div>
      </div>
      <div class="divider"></div>
      <div style="display:grid;grid-template-columns:repeat(3,1fr);gap:16px;text-align:center;">
        <div>
          <div style="font-family:'Orbitron';font-size:1.3rem;font-weight:700;color:var(--green);">${bestFinish <= 99 ? 'P' + bestFinish : '-'}</div>
          <div style="font-size:0.75rem;color:var(--text-muted);">最佳完赛</div>
        </div>
        <div>
          <div style="font-family:'Orbitron';font-size:1.3rem;font-weight:700;">${avgPos}</div>
          <div style="font-size:0.75rem;color:var(--text-muted);">平均名次</div>
        </div>
        <div>
          <div style="font-family:'Orbitron';font-size:1.3rem;font-weight:700;color:var(--f1-red);">${dnfs}</div>
          <div style="font-size:0.75rem;color:var(--text-muted);">退赛次数</div>
        </div>
      </div>
      <div class="divider"></div>
      <div style="display:grid;grid-template-columns:repeat(2,1fr);gap:16px;text-align:center;">
        <div>
          <div style="font-family:'Orbitron';font-size:1.3rem;font-weight:700;color:var(--green);">${winRate}%</div>
          <div style="font-size:0.75rem;color:var(--text-muted);">胜率</div>
        </div>
        <div>
          <div style="font-family:'Orbitron';font-size:1.3rem;font-weight:700;color:var(--gold);">${podiumRate}%</div>
          <div style="font-size:0.75rem;color:var(--text-muted);">领奖台率</div>
        </div>
      </div>
    </div>

    <div class="card" style="padding:16px;margin-top:12px;">
      <h3 style="margin-bottom:12px;font-size:0.9rem;color:var(--text-secondary);">声誉</h3>
      <div style="display:grid;grid-template-columns:repeat(2,1fr);gap:12px;font-size:0.85rem;">
        <div>🏎️ 车队信任: <strong style="color:var(--text-primary);">${gameState.reputation.teamTrust}</strong></div>
        <div>📺 媒体关系: <strong style="color:var(--text-primary);">${gameState.reputation.mediaRelation}</strong></div>
        <div>👥 车迷人气: <strong style="color:var(--text-primary);">${gameState.reputation.fanPopularity}</strong></div>
        <div>🤝 车手尊重: <strong style="color:var(--text-primary);">${gameState.reputation.driverRespect}</strong></div>
      </div>
    </div>

    ${gameState.achievements.length > 0 ? `
      <div class="card" style="padding:16px;margin-top:12px;border-color:var(--gold);">
        <h3 style="margin-bottom:12px;font-size:0.9rem;color:var(--gold);">🏅 已解锁成就 (${gameState.achievements.length}/${ACHIEVEMENTS.length})</h3>
        ${gameState.achievements.map(id => {
          const a = ACHIEVEMENTS.find(a => a.id === id);
          return a ? `<div style="padding:4px 0;font-size:0.85rem;">${a.icon} <strong>${a.name}</strong> <span style="color:var(--text-muted);">- ${a.desc}</span></div>` : '';
        }).join('')}
      </div>
    ` : ''}

    <div style="text-align:center;padding:30px 20px;margin-top:12px;">
      <p style="color:var(--text-muted);font-size:0.85rem;line-height:1.6;">
        感谢游玩 F1 职业生涯模拟器！<br>
        ${gameState.playerName} 的传奇故事将永远被铭记。
      </p>
      <button class="btn btn-primary btn-lg" onclick="resetGame()" style="margin-top:16px;">
        🏎️ 开始新的职业生涯
      </button>
    </div>
  `;

  // Clear save
  localStorage.removeItem('f1_career_save');
}

function resetGame() {
  gameState = null;
  raceState = null;
  renderStartScreen();
}

function confirmQuickSim() {
  const remaining = TRACKS.length - gameState.currentRace;
  showScreen('hub-screen');
  document.getElementById('hub-screen').innerHTML = `
    <div class="section-header">
      <h2 class="font-display">⚡ 快速模拟赛季</h2>
    </div>
    <div class="card" style="text-align:center;padding:30px;">
      <div style="font-size:3rem;margin-bottom:16px;">⚡</div>
      <h3>即将模拟剩余 ${remaining} 站比赛</h3>
      <p class="text-muted" style="margin-top:8px;line-height:1.6;">
        系统将自动模拟所有剩余比赛，包括排位赛和正赛。<br>
        每站比赛会自动选择最优策略，但不会触发随机事件决策。<br>
        <span style="color:var(--yellow);">⚠️ 快速模拟的比赛不会获得训练加成</span>
      </p>
      <div style="margin-top:16px;display:flex;gap:10px;justify-content:center;">
        <button class="btn btn-primary" onclick="quickSimSeason()">确认模拟</button>
        <button class="btn" onclick="renderHub()" style="background:transparent;border:1px solid var(--border);">取消</button>
      </div>
    </div>
  `;
}

function quickSimSeason() {
  showScreen('hub-screen');
  const container = document.getElementById('hub-screen');
  const totalRemaining = TRACKS.length - gameState.currentRace;

  container.innerHTML = `
    <div class="section-header">
      <h2 class="font-display">⚡ 赛季模拟中...</h2>
    </div>
    <div class="card" style="padding:24px;">
      <div id="sim-progress-bar" style="height:8px;background:var(--bg);border-radius:4px;overflow:hidden;margin-bottom:16px;">
        <div id="sim-progress-fill" style="height:100%;width:0%;background:linear-gradient(90deg,var(--f1-red),var(--gold));transition:width 0.3s;"></div>
      </div>
      <div id="sim-status" style="text-align:center;font-size:0.9rem;color:var(--text-secondary);">准备开始...</div>
      <div id="sim-results" style="margin-top:16px;"></div>
    </div>
  `;

  let simStep = 0;
  const simResults = [];

  function simNextRace() {
    if (gameState.currentRace >= TRACKS.length) {
      // Season complete, show summary
      finishQuickSim(simResults);
      return;
    }

    const raceIdx = gameState.currentRace;
    const track = TRACKS[raceIdx];
    const weather = getWeather();
    gameState.currentWeather = weather;

    // Update progress
    const progress = Math.round((simStep / totalRemaining) * 100);
    document.getElementById('sim-progress-fill').style.width = progress + '%';
    document.getElementById('sim-status').textContent = `正在模拟第 ${raceIdx + 1}/${TRACKS.length} 站: ${track.name}`;

    // Auto-train: pick the stat with lowest value
    if (!gameState.trainedThisWeek) {
      const statKeys = Object.keys(gameState.stats);
      let lowestStat = statKeys[0];
      statKeys.forEach(k => {
        if (gameState.stats[k] < gameState.stats[lowestStat]) lowestStat = k;
      });
      train(lowestStat);
    }

    // Simulate qualifying
    const qualiResult = simulateQualifying(raceIdx);

    // Track pole
    if (qualiResult.playerPos === 1) {
      gameState.careerPoles = (gameState.careerPoles || 0) + 1;
    }

    // Auto-generate modifiers (pick best option for each decision)
    const decisions = getRaceDecisions(raceIdx, gameState);
    const allModifiers = [];
    decisions.forEach(decision => {
      // Pick the option with highest total positive effect
      let bestOption = decision.options[0];
      let bestScore = -999;
      decision.options.forEach(opt => {
        let score = 0;
        const eff = opt.effect;
        if (eff.pace) score += eff.pace;
        if (eff.consistency) score += eff.consistency;
        if (eff.raceIQ) score += eff.raceIQ;
        if (eff.attack) score += eff.attack;
        if (eff.defend) score += eff.defend;
        if (eff.wet) score += eff.wet;
        if (eff.risk) score -= eff.risk;
        if (eff.tireWear) score -= eff.tireWear;
        // Reputation changes
        if (eff.teamTrust) score += eff.teamTrust * 0.3;
        if (eff.mediaRep) score += eff.mediaRep * 0.3;
        if (eff.fanPop) score += eff.fanPop * 0.3;
        if (eff.driverRep) score += eff.driverRep * 0.3;
        if (eff.sponsorRep) score += eff.sponsorRep * 0.3;
        if (score > bestScore) {
          bestScore = score;
          bestOption = opt;
        }
      });
      allModifiers.push({ segment: decision.segment, effect: bestOption.effect });

      // Apply decision effects
      applyDecisionEffects(bestOption.effect);
    });

    // Simulate race
    const raceResults = simulateRace(raceIdx, allModifiers);
    applyRaceResults(raceResults);

    // Record result
    const playerResult = raceResults.find(r => r.driver.isPlayer);
    const playerPts = (!playerResult.dnf && playerResult.position <= 10) ? POINTS_SYSTEM[playerResult.position - 1] : 0;

    simResults.push({
      raceIdx,
      trackName: track.name,
      qualiPos: qualiResult.playerPos,
      racePos: playerResult.dnf ? 'DNF' : 'P' + playerResult.position,
      points: playerPts,
      dnf: playerResult.dnf,
    });

    // Update display
    const resultsHtml = simResults.slice(-5).reverse().map(r => `
      <div style="display:flex;justify-content:space-between;align-items:center;padding:8px 12px;border-bottom:1px solid var(--border);font-size:0.85rem;">
        <span style="color:var(--text-secondary);">${r.trackName}</span>
        <span>
          <span style="color:var(--text-muted);font-size:0.75rem;">Q${r.qualiPos}</span>
          →
          <span style="color:${r.dnf ? 'var(--f1-red)' : r.racePos === 'P1' ? 'var(--gold)' : r.racePos.startsWith('P') && parseInt(r.racePos.substring(1)) <= 3 ? 'var(--gold)' : 'var(--text-primary)'};font-weight:700;">
            ${r.racePos}
          </span>
          ${r.points > 0 ? `<span style="color:var(--green);font-size:0.75rem;">+${r.points}</span>` : ''}
        </span>
      </div>
    `).join('');

    document.getElementById('sim-results').innerHTML = resultsHtml;

    // Advance race
    gameState.currentRace++;
    gameState.trainedThisWeek = false;
    gameState.socialUsedThisWeek = false;
    simStep++;

    // Save periodically
    if (simStep % 5 === 0) saveGame();

    // Continue to next race with a small delay for UI update
    setTimeout(simNextRace, 150);
  }

  simNextRace();
}

function finishQuickSim(simResults) {
  saveGame();

  // Count stats
  const wins = simResults.filter(r => r.racePos === 'P1').length;
  const podiums = simResults.filter(r => !r.dnf && parseInt(r.racePos.substring(1)) <= 3).length;
  const dnfs = simResults.filter(r => r.dnf).length;
  const totalPoints = simResults.reduce((sum, r) => sum + r.points, 0);
  const bestFinish = simResults.reduce((best, r) => {
    if (r.dnf) return best;
    const pos = parseInt(r.racePos.substring(1));
    return pos < best ? pos : best;
  }, 99);

  const standings = getDriverStandings();
  const playerStanding = standings.find(d => d.isPlayer);
  const finalPos = playerStanding ? playerStanding.position : '-';
  const finalPoints = playerStanding ? playerStanding.points : 0;

  const isChampion = finalPos === 1;
  if (isChampion) gameState.championships++;

  document.getElementById('hub-screen').innerHTML = `
    <div class="section-header">
      <h2 class="font-display">⚡ 赛季模拟完成</h2>
    </div>

    ${isChampion ? `
      <div class="card" style="text-align:center;padding:30px;border-color:var(--gold);box-shadow:0 0 30px rgba(255,215,0,0.15);">
        <div style="font-size:4rem;margin-bottom:12px;">🏆</div>
        <h2 class="font-display" style="color:var(--gold);">世界冠军！</h2>
        <p class="text-muted" style="margin-top:8px;">恭喜赢得 ${gameState.season} 赛季冠军！</p>
      </div>
    ` : ''}

    <div class="card" style="padding:20px;">
      <h3 style="margin-bottom:16px;font-size:0.9rem;color:var(--text-secondary);">模拟结果总览</h3>
      <div style="display:grid;grid-template-columns:repeat(3,1fr);gap:16px;text-align:center;">
        <div>
          <div style="font-family:'Orbitron';font-size:2rem;font-weight:800;color:var(--f1-red);">P${finalPos}</div>
          <div style="font-size:0.75rem;color:var(--text-muted);">最终排名</div>
        </div>
        <div>
          <div style="font-family:'Orbitron';font-size:2rem;font-weight:800;">${finalPoints}</div>
          <div style="font-size:0.75rem;color:var(--text-muted);">总积分</div>
        </div>
        <div>
          <div style="font-family:'Orbitron';font-size:2rem;font-weight:800;color:var(--gold);">${wins}</div>
          <div style="font-size:0.75rem;color:var(--text-muted);">分站冠军</div>
        </div>
      </div>
      <div class="divider"></div>
      <div style="display:grid;grid-template-columns:repeat(3,1fr);gap:16px;text-align:center;">
        <div>
          <div style="font-family:'Orbitron';font-size:1.5rem;font-weight:700;">${podiums}</div>
          <div style="font-size:0.75rem;color:var(--text-muted);">领奖台</div>
        </div>
        <div>
          <div style="font-family:'Orbitron';font-size:1.5rem;font-weight:700;color:var(--f1-red);">${dnfs}</div>
          <div style="font-size:0.75rem;color:var(--text-muted);">退赛</div>
        </div>
        <div>
          <div style="font-family:'Orbitron';font-size:1.5rem;font-weight:700;color:var(--green);">${bestFinish <= 99 ? 'P' + bestFinish : '-'}</div>
          <div style="font-size:0.75rem;color:var(--text-muted);">最佳完赛</div>
        </div>
      </div>
    </div>

    <div class="card" style="padding:16px;margin-top:12px;">
      <h3 style="margin-bottom:12px;font-size:0.9rem;color:var(--text-secondary);">每站成绩</h3>
      ${simResults.map(r => `
        <div style="display:flex;justify-content:space-between;align-items:center;padding:6px 0;border-bottom:1px solid var(--border);font-size:0.85rem;">
          <span style="color:var(--text-secondary);">${r.trackName}</span>
          <span>
            <span style="color:var(--text-muted);font-size:0.75rem;">Q${r.qualiPos}</span>
            →
            <span style="color:${r.dnf ? 'var(--f1-red)' : r.racePos === 'P1' ? 'var(--gold)' : r.racePos.startsWith('P') && parseInt(r.racePos.substring(1)) <= 3 ? 'var(--gold)' : 'var(--text-primary)'};font-weight:700;">
              ${r.racePos}
            </span>
            ${r.points > 0 ? `<span style="color:var(--green);font-size:0.75rem;">+${r.points}</span>` : ''}
          </span>
        </div>
      `).join('')}
    </div>

    ${gameState.newAchievements && gameState.newAchievements.length > 0 ? `
      <div class="card" style="padding:16px;margin-top:12px;border-color:var(--gold);">
        <h3 style="margin-bottom:8px;font-size:0.9rem;color:var(--gold);">🏅 新成就解锁</h3>
        ${gameState.newAchievements.map(a => `
          <div style="padding:6px 0;font-size:0.85rem;">
            <strong>${a.name}</strong> - <span style="color:var(--text-secondary);">${a.desc}</span>
          </div>
        `).join('')}
      </div>
    ` : ''}

    <button class="btn btn-primary btn-lg" onclick="showContractOffers()" style="margin-top:16px;">
      进入合同谈判 →
    </button>
  `;

  // Note: income is calculated in advanceSeason() which is called after contract signing
  // So we show projected income here based on current stats
  const projectedWins = gameState.raceResults.filter(r => !r.dnf && r.position === 1).length;
  const projectedPodiums = gameState.raceResults.filter(r => !r.dnf && r.position <= 3).length;
  const projectedP2 = gameState.raceResults.filter(r => !r.dnf && r.position === 2).length;
  const projectedP3 = gameState.raceResults.filter(r => !r.dnf && r.position === 3).length;
  let projectedBonus = projectedWins * 2.0 + projectedP2 * 1.0 + projectedP3 * 0.5;
  if (isChampion) projectedBonus += 10;
  if (teamStandings) {
    const ts = teamStandings.find(ts => ts.teamId === gameState.teamId);
    if (ts) {
      if (ts.position === 1) projectedBonus += 5;
      else if (ts.position === 2) projectedBonus += 3;
      else if (ts.position === 3) projectedBonus += 2;
    }
  }
  const projectedSponsor = gameState.sponsor ? (gameState.sponsor.salary || 0) : 0;
  const projectedTotal = (gameState.salary || 5) + projectedSponsor + projectedBonus;

  // Insert income summary before the button
  const btn = document.querySelector('#season-end-screen .btn-primary');
  if (btn) {
    const incomeDiv = document.createElement('div');
    incomeDiv.className = 'card';
    incomeDiv.style.cssText = 'margin-top:12px;padding:14px;border-color:var(--green);';
    incomeDiv.innerHTML = `
      <h3 style="margin-bottom:10px;font-size:0.9rem;color:var(--text-secondary);">💰 赛季收入预估</h3>
      <div style="display:grid;gap:6px;font-size:0.85rem;">
        <div style="display:flex;justify-content:space-between;">
          <span style="color:var(--text-muted);">💵 基础年薪</span>
          <span style="color:var(--green);font-weight:600;">$${(gameState.salary || 5).toFixed(1)}M</span>
        </div>
        ${projectedSponsor > 0 ? `
        <div style="display:flex;justify-content:space-between;">
          <span style="color:var(--text-muted);">🤝 赞助商收入</span>
          <span style="color:var(--green);font-weight:600;">$${projectedSponsor.toFixed(1)}M</span>
        </div>` : ''}
        <div style="display:flex;justify-content:space-between;">
          <span style="color:var(--text-muted);">🏆 比赛奖金</span>
          <span style="color:var(--green);font-weight:600;">$${projectedBonus.toFixed(1)}M</span>
        </div>
        ${projectedBonus > 0 ? `
        <div style="font-size:0.75rem;color:var(--text-muted);padding-left:12px;">
          ${projectedWins > 0 ? `分站冠军 ×${projectedWins} = $${(projectedWins * 2.0).toFixed(1)}M<br>` : ''}
          ${projectedP2 > 0 ? `亚军 ×${projectedP2} = $${(projectedP2 * 1.0).toFixed(1)}M<br>` : ''}
          ${projectedP3 > 0 ? `季军 ×${projectedP3} = $${(projectedP3 * 0.5).toFixed(1)}M<br>` : ''}
          ${isChampion ? `世界冠军奖金 = $10.0M<br>` : ''}
        </div>` : ''}
        <div style="display:flex;justify-content:space-between;padding-top:6px;border-top:1px solid var(--border);">
          <span style="font-weight:600;">总计</span>
          <span style="color:var(--green);font-weight:700;font-family:'Orbitron';">$${projectedTotal.toFixed(1)}M</span>
        </div>
      </div>
    `;
    btn.parentElement.insertBefore(incomeDiv, btn);
  }

  saveGame();
}

function renderTraining() {
  showScreen('training-screen');
  const trained = gameState.trainedThisWeek;
  const player = getPlayer();
  const playerAvg = Object.values(gameState.stats).reduce((a, b) => a + b, 0) / Object.keys(gameState.stats).length;

  // Get top 5 AI drivers by average stat for comparison
  const aiAvgs = gameState.drivers
    .filter(d => !d.isPlayer)
    .map(d => ({
      name: d.name,
      avg: Object.values(d.stats).reduce((a, b) => a + b, 0) / Object.values(d.stats).length,
      team: TEAMS[d.teamIdx],
    }))
    .sort((a, b) => b.avg - a.avg)
    .slice(0, 5);

  const totalTrainings = gameState.totalTrainings || 0;

  document.getElementById('training-screen').innerHTML = `
    <button class="back-btn" onclick="renderHub()">← 返回主页</button>
    <div class="section-header">
      <h2 class="font-display">🏋️ 训练中心</h2>
    </div>

    <div class="card" style="padding:14px;margin-bottom:12px;">
      <div style="display:flex;justify-content:space-between;align-items:center;">
        <div>
          <div style="font-size:0.8rem;color:var(--text-muted);">你的综合评分</div>
          <div style="font-family:'Orbitron';font-size:1.5rem;font-weight:800;color:${playerAvg >= 90 ? 'var(--gold)' : playerAvg >= 80 ? 'var(--green)' : 'var(--f1-red)'};">${playerAvg.toFixed(1)}</div>
        </div>
        <div style="text-align:center;">
          <div style="font-size:0.8rem;color:var(--text-muted);">累计训练</div>
          <div style="font-family:'Orbitron';font-size:1.5rem;font-weight:800;color:var(--blue);">${totalTrainings}</div>
        </div>
        <div style="text-align:right;">
          <div style="font-size:0.8rem;color:var(--text-muted);">围场最高</div>
          <div style="font-family:'Orbitron';font-size:1.5rem;font-weight:800;color:var(--gold);">${aiAvgs[0] ? aiAvgs[0].avg.toFixed(1) : '-'}</div>
        </div>
      </div>
    </div>

    ${playerAvg >= 90 ? `
      <div class="card" style="padding:12px;margin-bottom:12px;background:rgba(234,179,8,0.1);border-color:var(--gold);">
        <div style="font-size:0.85rem;color:var(--gold);">✨ 你的综合评分已超过90！你已是围场中的顶级车手。</div>
      </div>
    ` : ''}

    <div class="card" style="padding:12px;margin-bottom:12px;">
      <h3 style="font-size:0.8rem;color:var(--text-secondary);margin-bottom:8px;">🔥 围场竞争对手动态</h3>
      <div style="display:grid;gap:4px;">
        ${aiAvgs.map((d, i) => `
          <div style="display:flex;align-items:center;gap:8px;font-size:0.8rem;">
            <span style="color:var(--text-muted);width:20px;">${i + 1}.</span>
            <span class="team-badge ${d.team.css}" style="font-size:0.65rem;padding:1px 4px;">${d.team.short}</span>
            <span style="flex:1;">${d.name}</span>
            <span style="color:${d.avg > playerAvg ? 'var(--f1-red)' : 'var(--green)'};font-weight:600;">${d.avg.toFixed(1)}</span>
            ${d.avg > playerAvg ? '<span style="color:var(--f1-red);font-size:0.7rem;">↑领先</span>' : '<span style="color:var(--green);font-size:0.7rem;">↓你领先</span>'}
          </div>
        `).join('')}
      </div>
    </div>

    ${trained ? `
      <div class="card" style="text-align:center;padding:40px;">
        <div style="font-size:3rem;margin-bottom:12px;">✅</div>
        <h3>本周训练已完成</h3>
        <p class="text-muted" style="margin-top:8px;">每站比赛前只能训练一次，其他车手也在不断进步</p>
      </div>
    ` : `
      <p class="text-muted" style="margin-bottom:12px;">选择训练重点。高属性区域收益递减，低属性区域提升更快。每次训练其他车手也有概率同步提升。</p>
      <div id="training-list">
        ${Object.keys(gameState.stats).map(key => {
          const val = gameState.stats[key];
          const isMax = val >= 100;
          let gainRange;
          if (val < 70) gainRange = '+5~7';
          else if (val < 85) gainRange = '+3~5';
          else if (val < 95) gainRange = '+2~3';
          else gainRange = '+1';

          return `
          <div class="training-option" data-stat="${key}" ${isMax ? 'style="opacity:0.5;cursor:not-allowed;"' : `onclick="selectTraining('${key}')"`}>
            <div class="train-name">${STAT_NAMES[key]}</div>
            <div class="train-effect">
              当前: <strong style="color:${STAT_COLORS[key]}">${isMax ? '<span style="color:var(--gold);">MAX</span>' : val}</strong>
              ${isMax ? '<span style="color:var(--gold);font-size:0.75rem;"> (已满级)</span>' : `
                → 预计 <strong style="color:var(--green)">${gainRange}</strong>
                ${val >= 95 ? '<span style="color:var(--gold);font-size:0.75rem;"> (接近上限)</span>' : ''}
                ${val < 70 ? '<span style="color:var(--blue);font-size:0.75rem;"> (快速提升区)</span>' : ''}
                · 随机另一属性 -1
              `}
            </div>
          </div>
          `;
        }).join('')}
      </div>
    `}
  `;
}

function selectTraining(statKey) {
  const beforeStats = {};
  gameState.drivers.forEach(d => {
    if (!d.isPlayer) {
      beforeStats[d.name] = Object.values(d.stats).reduce((a, b) => a + b, 0) / Object.values(d.stats).length;
    }
  });

  const result = train(statKey);
  if (result) {
    // Check which AI drivers improved
    const aiImprovements = [];
    gameState.drivers.forEach(d => {
      if (!d.isPlayer) {
        const afterAvg = Object.values(d.stats).reduce((a, b) => a + b, 0) / Object.values(d.stats).length;
        const beforeAvg = beforeStats[d.name];
        if (afterAvg > beforeAvg + 0.1) {
          aiImprovements.push(d.name);
        }
      }
    });

    let msg = `${STAT_NAMES[result.gained]} +${result.gain}，${STAT_NAMES[result.lost]} -1`;
    if (aiImprovements.length > 0) {
      msg += `\n📊 ${aiImprovements.length}位车手也在进步: ${aiImprovements.slice(0, 3).join(', ')}${aiImprovements.length > 3 ? '...' : ''}`;
    }
    showToast(msg, 'success', 4000);
    renderTraining();
    saveGame();
  }
}

function renderDriverProfile() {
  showScreen('driver-screen');
  const player = getPlayer();
  const team = TEAMS[gameState.teamIdx];
  const bg = BACKGROUNDS.find(b => b.id === gameState.background);
  const bgDisplay = bg ? `${bg.icon} ${bg.name}` : '👤 现役车手';

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
          <span class="badge badge-red" style="margin-left:8px;">${bgDisplay}</span>
        </div>
        <div style="text-align:right;">
          <div style="font-size:0.75rem;color:var(--text-muted);">赛季</div>
          <div style="font-family:'Orbitron';font-weight:700;">${gameState.season}</div>
        </div>
      </div>

      <div class="divider"></div>

      <h3 style="margin-bottom:12px;font-size:0.9rem;color:var(--text-secondary);">能力属性</h3>
      ${Object.keys(gameState.stats).map(key => {
        const val = gameState.stats[key];
        const isMax = val >= 100;
        return `
        <div class="stat-row">
          <span class="stat-label">${STAT_NAMES[key].split(' ')[1]}</span>
          <div class="stat-bar-bg">
            <div class="stat-bar-fill" style="width:${val}%;background:${STAT_COLORS[key]}"></div>
          </div>
          <span class="stat-value" style="color:${isMax ? 'var(--gold)' : STAT_COLORS[key]}">${isMax ? 'MAX' : val}</span>
        </div>
        `;
      }).join('')}

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
      <h3 style="margin-bottom:12px;font-size:0.9rem;color:var(--text-secondary);">车手积分榜 <span style="font-size:0.75rem;color:var(--text-muted);">(点击车手名查看详情)</span></h3>
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
                <td><span style="cursor:pointer;color:var(--f1-red);" onclick="showDriverDetail('${d.name}')">${d.name}</span> ${d.isPlayer ? '⭐' : ''}</td>
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

function showDriverDetail(driverName) {
  const driver = gameState.drivers.find(d => d.name === driverName);
  if (!driver) return;

  const team = TEAMS.find(t => t.id === driver.teamId);
  const standings = getDriverStandings();
  const standing = standings.find(d => d.name === driverName);
  const pos = standing ? standing.position : '-';

  // Calculate driver stats
  const totalRaces = driver.positions.length;
  const wins = driver.positions.filter(p => p === 1).length;
  const podiums = driver.positions.filter(p => p <= 3).length;
  const dnfs = driver.dnf || 0;
  const bestFinish = totalRaces > 0 ? Math.min(...driver.positions.filter(p => p > 0)) : '-';

  // Driver-specific memes - unique, fun, non-offensive
  const DRIVER_MEMES = {
    'M. Verstappen': [
      '🏆 "三连冠缔造者，围场里最年轻的传奇之一。"',
      '🎮 "赛后第一件事？打开模拟器再跑几圈。"',
      '🏎️ "从小看爸爸比赛，现在爸爸看他破纪录。"',
      '⚡ "排位赛单圈速度，让所有人怀疑自己的赛车。"',
    ],
    'L. Hamilton': [
      '👑 "七冠王，F1历史上最伟大的车手之一。"',
      '🎵 "赛道之外是音乐人，时尚圈也有他的一席之地。"',
      '🌱 "Vegan生活方式的倡导者，用行动证明速度不分饮食。"',
      '📖 "Still I Rise — 他的座右铭激励了无数人。"',
    ],
    'F. Alonso': [
      '😤 "两冠王但永远充满斗志，El Plan仍在执行。"',
      '🎯 "围场最狡猾的老狐狸，策略博弈的大师。"',
      '🏁 "从雷诺到阿斯顿马丁，20年仍在前排战斗。"',
      '🏆 "勒芒24小时冠军 + F1世界冠军 = 全能赛车手。"',
    ],
    'L. Norris': [
      '🎮 "Twitch直播间的常客，车手圈最会整活的选手。"',
      '🏌️ "高尔夫比F1还认真，赛后必去球场。"',
      '😊 "围场人缘最好的车手之一，所有人都是他的朋友。"',
      '🧇 "Norris vs Verstappen的友谊赛比正赛还精彩。"',
    ],
    'C. Leclerc': [
      '🎹 "钢琴弹得比赛车还好？至少车迷是这么认为的。"',
      '❤️ "摩纳哥的儿子，为家乡而战是他的执念。"',
      '🔥 "排位赛之王，Q3永远能跑出惊人圈速。"',
      '🎶 "如果F1不行了，出张钢琴专辑应该也能畅销。"',
    ],
    'O. Piastri': [
      '🧊 "面无表情地超你的车，然后面无表情地庆祝。"',
      '🎓 "雷诺青训出品，学霸型车手的代表。"',
      '🤝 "Norris的最佳搭档，迈凯伦和谐车房的基石。"',
      '🏆 "F2和F3双料冠军，天赋不需要多言。"',
    ],
    'A.K. Antonelli': [
      '🚀 "Mercedes签下的天才少年，Hamilton的接班人？"',
      '🇮🇹 "意大利赛车的希望，来自博洛尼亚的骄傲。"',
      '📚 "年轻的头脑配上成熟的驾驶风格，前途无量。"',
      '⭐ "从F3直接跳F1？Mercedes相信他可以。"',
    ],
    'L. Stroll': [
      '💎 "阿斯顿马丁的掌舵人之一，车队就是家族事业。"',
      '🌍 "加拿大唯一的F1车手，整个国家的骄傲。"',
      '🏀 "篮球迷，赛前必看NBA赛程。"',
      '📈 "每年都在进步，数据不会说谎。"',
    ],
    'G. Russell': [
      '📐 "Mercedes的新一代领航者，冷静而精准。"',
      '🇬🇧 "英国赛车精英教育的产物，从GP3到F1一路夺冠。"',
      '🤓 "围场里的学霸，数学和工程学都不在话下。"',
      '📊 "每场比赛后都会仔细分析数据，最理性的车手。"',
    ],
    'A. Albon': [
      '🐘 "泰国国宝级车手，亚洲赛车的旗帜。"',
      '🐈 "养猫达人，社交媒体上全是猫咪照片。"',
      '🛡️ "Williams的守护者，中游车队的隐形英雄。"',
      '🏌️ "和Norris的高尔夫球友，但水平差了一截。"',
    ],
    'C. Sainz': [
      '🌶️ "Smooth Operator — 从法拉利到Williams，永远从容。"',
      '🏎️ "拉力赛世家的孩子，父亲是达喀尔传奇。"',
      '🎤 "围场里最会穿西装的男人，时尚博主兼职。"',
      '🇪🇸 "西班牙赛车的新旗帜，阿隆索的接班人。"',
    ],
    'Y. Tsunoda': [
      '🍱 "日本最快的男人，寿司是他的秘密燃料。"',
      '🎌 "AlphaTauri/V-CARB的灵魂人物，日本车迷的骄傲。"',
      '🔊 "无线电内容最丰富的车手，每句都是金句。"',
      '🥋 "将柔道精神带入赛车，永不放弃的斗士。"',
    ],
    'I. Hadjar': [
      '🇫🇷 "法国新生代的力量，红牛青训的新希望。"',
      '📚 "学霸车手，方程式赛车之外的物理学爱好者。"',
      '🏁 "F2亚军直奔F1，速度证明了一切。"',
    ],
    'E. Ocon': [
      '🇫🇷 "法国方程式赛车的坚持者，永不言弃的代表。"',
      '🏭 "雷诺/Alpine的忠实战士，蓝色血脉。"',
      '♟️ "国际象棋爱好者，赛道上也是策略大师。"',
      '💪 "从测试车手到分站冠军，逆袭之路的典范。"',
    ],
    'O. Bearman': [
      '🐻 "超级替补的代名词，随时准备上场。"',
      '🇬🇧 "英国赛车的新星，Ferrari青训的骄傲。"',
      '⚡ "首秀即得分，天赋不需要解释。"',
      '🤝 "Haas的新核心，未来可期。"',
    ],
    'P. Gasly': [
      '🇫🇷 "Monza 2020的英雄，那个奇迹之夜永远难忘。"',
      '🍦 "法国美食的忠实粉丝，赛后必找当地餐厅。"',
      '🔵 "从红牛到AlphaTauri再到Alpine，每段旅程都有故事。"',
      '📈 "用实力证明自己，从替补到核心的蜕变。"',
    ],
    'J. Doohan': [
      '🏍️ "拉力赛传奇之子，赛车基因刻在骨子里。"',
      '🇦🇺 "澳大利亚的F1新希望，家乡车迷的宠儿。"',
      '🏆 "从F2到Alpine，蓝色战车的新引擎。"',
    ],
    'N. Hulkenberg': [
      '🇩🇪 "德国赛车的坚守者，F1最可靠的替补和主力。"',
      '🌧️ "雨战大师，湿地条件下总能创造奇迹。"',
      '💼 "围场里最低调的实力派，从不抱怨只管开。"',
      '🏎️ "勒芒24小时冠军，F1之外同样闪耀。"',
    ],
    'G. Bortoleto': [
      '🇧🇷 "巴西赛车的新希望，继承塞纳与巴里切罗的衣钵。"',
      '🏆 "F2冠军直升F1，拉丁美洲的速度天赋。"',
      '🌟 "Kick Sauber的未来核心，新生代的巴西风暴。"',
    ],
  };

  // Get driver-specific memes
  const memes = [...(DRIVER_MEMES[driver.name] || [])];

  // Add dynamic memes based on current season performance (only a few, non-duplicate)
  if (wins > 0 && wins <= 3) memes.push(`🏆 本赛季已赢 ${wins} 场，状态正佳。`);
  if (wins > 3) memes.push(`🏆 本赛季 ${wins} 场胜利，冠军有力争夺者。`);
  if (podiums > 5) memes.push(`🥈 本赛季 ${podiums} 次登台，稳定性惊人。`);
  if (pos === 1) memes.push(`🥇 当前积分榜领跑者，所有人的目标。`);

  showScreen('standings-screen');
  document.getElementById('standings-screen').innerHTML = `
    <button class="back-btn" onclick="renderStandings()">← 返回积分榜</button>
    <div class="section-header">
      <h2 class="font-display">👤 ${driver.name}</h2>
    </div>

    <div class="card" style="padding:20px;">
      <div style="display:flex;align-items:center;gap:16px;margin-bottom:16px;">
        <span class="team-badge ${team.css}" style="font-size:1rem;padding:6px 12px;">${team.short}</span>
        <div>
          <div style="font-size:0.8rem;color:var(--text-secondary);">当前排名</div>
          <div style="font-family:'Orbitron';font-size:1.8rem;font-weight:800;color:var(--f1-red);">P${pos}</div>
        </div>
        <div style="margin-left:auto;text-align:right;">
          <div style="font-size:0.8rem;color:var(--text-secondary);">赛季积分</div>
          <div style="font-family:'Orbitron';font-size:1.8rem;font-weight:800;">${driver.points}</div>
        </div>
      </div>

      <div style="display:grid;grid-template-columns:repeat(2,1fr);gap:12px;margin-bottom:16px;">
        <div style="text-align:center;padding:12px;background:var(--bg);border-radius:8px;">
          <div style="font-family:'Orbitron';font-size:1.5rem;font-weight:700;color:var(--gold);">${wins}</div>
          <div style="font-size:0.75rem;color:var(--text-muted);">分站冠军</div>
        </div>
        <div style="text-align:center;padding:12px;background:var(--bg);border-radius:8px;">
          <div style="font-family:'Orbitron';font-size:1.5rem;font-weight:700;">${podiums}</div>
          <div style="font-size:0.75rem;color:var(--text-muted);">领奖台</div>
        </div>
        <div style="text-align:center;padding:12px;background:var(--bg);border-radius:8px;">
          <div style="font-family:'Orbitron';font-size:1.5rem;font-weight:700;color:var(--green);">${bestFinish !== '-' ? 'P' + bestFinish : '-'}</div>
          <div style="font-size:0.75rem;color:var(--text-muted);">最佳完赛</div>
        </div>
        <div style="text-align:center;padding:12px;background:var(--bg);border-radius:8px;">
          <div style="font-family:'Orbitron';font-size:1.5rem;font-weight:700;color:var(--f1-red);">${dnfs}</div>
          <div style="font-size:0.75rem;color:var(--text-muted);">退赛次数</div>
        </div>
      </div>
    </div>

    <div class="card" style="padding:20px;">
      <h3 style="margin-bottom:16px;font-size:0.9rem;color:var(--text-secondary);">能力属性</h3>
      ${Object.keys(driver.stats).filter(k => k !== 'skill').map(key => {
        const val = driver.stats[key];
        const barColor = val >= 90 ? 'var(--gold)' : val >= 80 ? 'var(--green)' : val >= 70 ? 'var(--f1-red)' : 'var(--text-secondary)';
        return `
          <div style="margin-bottom:10px;">
            <div style="display:flex;justify-content:space-between;font-size:0.85rem;margin-bottom:4px;">
              <span>${STAT_NAMES[key]}</span>
              <strong style="color:${barColor};">${val}</strong>
            </div>
            <div style="height:6px;background:var(--bg);border-radius:3px;overflow:hidden;">
              <div style="height:100%;width:${val}%;background:${barColor};border-radius:3px;transition:width 0.3s;"></div>
            </div>
          </div>
        `;
      }).join('')}
    </div>

    ${memes.length > 0 ? `
      <div class="card" style="padding:16px;border-color:var(--gold);">
        <h3 style="margin-bottom:12px;font-size:0.9rem;color:var(--gold);">🎭 围场梗</h3>
        ${memes.map(m => `<div style="padding:4px 0;font-size:0.85rem;">${m}</div>`).join('')}
      </div>
    ` : ''}

    <button class="btn btn-secondary" onclick="renderStandings()" style="margin-top:12px;">← 返回积分榜</button>
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

  const rarityOrder = ['common', 'rare', 'epic', 'legendary'];
  const rarityLabels = { common: '普通', rare: '稀有', epic: '史诗', legendary: '传说' };
  const rarityIcons = { common: '⚪', rare: '🔵', epic: '🟣', legendary: '🟡' };

  const unlockedCount = gameState.achievements.length;
  const totalCount = ACHIEVEMENTS.length;

  document.getElementById('achievements-screen').innerHTML = `
    <button class="back-btn" onclick="renderHub()">← 返回主页</button>
    <div class="section-header">
      <h2 class="font-display">🏅 成就</h2>
      <span class="badge badge-gold">${unlockedCount}/${totalCount}</span>
    </div>

    <div style="display:flex;gap:6px;margin-bottom:16px;flex-wrap:wrap;">
      ${rarityOrder.map(r => {
        const rAchs = ACHIEVEMENTS.filter(a => a.rarity === r);
        const rUnlocked = rAchs.filter(a => gameState.achievements.includes(a.id)).length;
        const info = RARITY_INFO[r];
        return `
          <div style="padding:6px 12px;border-radius:8px;background:${info.bgColor};border:1px solid ${info.color}33;">
            <span style="font-size:0.8rem;color:${info.color};font-weight:600;">${rarityIcons[r]} ${rarityLabels[r]}</span>
            <span style="font-size:0.75rem;color:var(--text-muted);margin-left:4px;">${rUnlocked}/${rAchs.length}</span>
          </div>
        `;
      }).join('')}
    </div>

    ${rarityOrder.map(rarity => {
      const achs = ACHIEVEMENTS.filter(a => a.rarity === rarity);
      const info = RARITY_INFO[rarity];
      return `
        <div style="margin-bottom:20px;">
          <div style="display:flex;align-items:center;gap:8px;margin-bottom:10px;">
            <span style="font-size:1rem;">${rarityIcons[rarity]}</span>
            <h3 style="font-size:0.95rem;color:${info.color};font-weight:700;margin:0;">${rarityLabels[rarity]}</h3>
            <div style="flex:1;height:1px;background:${info.color}33;"></div>
          </div>
          <div style="display:grid;gap:8px;">
            ${achs.map(ach => {
              const unlocked = gameState.achievements.includes(ach.id);
              return `
                <div class="card" style="padding:14px;display:flex;align-items:center;gap:12px;${unlocked ? `border-color:${info.color};background:${info.bgColor};` : 'opacity:0.45;'}">
                  <span style="font-size:1.8rem;${unlocked ? '' : 'filter:grayscale(1);'}">${ach.icon}</span>
                  <div style="flex:1;">
                    <div style="font-weight:700;font-size:0.9rem;${unlocked ? `color:${info.color};` : ''}">${ach.name}</div>
                    <div style="font-size:0.78rem;color:var(--text-secondary);">${ach.desc}</div>
                  </div>
                  ${unlocked
                    ? `<span style="font-size:0.7rem;padding:3px 8px;border-radius:6px;background:${info.color}22;color:${info.color};font-weight:600;">已解锁</span>`
                    : `<span style="font-size:0.7rem;padding:3px 8px;border-radius:6px;background:rgba(255,255,255,0.05);color:var(--text-muted);">未解锁</span>`
                  }
                </div>
              `;
            }).join('')}
          </div>
        </div>
      `;
    }).join('')}
  `;
}

// ============ PR MANAGEMENT ============

const PR_OPTIONS = [
  {
    id: 'press_conf',
    name: '新闻发布会',
    icon: '🎤',
    desc: '召开正式新闻发布会，提升媒体关系',
    cost: 2,
    effects: { mediaRep: 8 },
    effectDesc: '媒体关系 +8',
  },
  {
    id: 'fan_event',
    name: '车迷见面会',
    icon: '👋',
    desc: '举办车迷互动活动，提升车迷人气',
    cost: 3,
    effects: { fanPop: 10 },
    effectDesc: '车迷人气 +10',
  },
  {
    id: 'charity',
    name: '慈善活动',
    icon: '❤️',
    desc: '参与慈善公益，全面提升声誉',
    cost: 5,
    effects: { fanPop: 5, mediaRep: 5, driverRep: 8, teamTrust: 3 },
    effectDesc: '全属性小幅提升',
  },
  {
    id: 'social_media',
    name: '社交媒体营销',
    icon: '📱',
    desc: '聘请专业团队运营社交媒体',
    cost: 4,
    effects: { fanPop: 12, mediaRep: 4 },
    effectDesc: '车迷人气 +12, 媒体 +4',
  },
  {
    id: 'team_dinner',
    name: '车队团建',
    icon: '🍽️',
    desc: '邀请车队成员共进晚餐，增进关系',
    cost: 3,
    effects: { teamTrust: 10 },
    effectDesc: '车队信任 +10',
  },
  {
    id: 'luxury_pr',
    name: '顶级公关团队',
    icon: '✨',
    desc: '聘请顶级公关团队全面包装形象',
    cost: 10,
    effects: { mediaRep: 15, fanPop: 15, driverRep: 10, teamTrust: 5 },
    effectDesc: '全属性大幅提升',
  },
];

function renderPR() {
  showScreen('sponsor-screen');

  const rep = gameState.reputation;

  document.getElementById('sponsor-screen').innerHTML = `
    <button class="back-btn" onclick="renderHub()">← 返回主页</button>
    <div class="section-header">
      <h2 class="font-display">📺 公关管理</h2>
    </div>

    <div class="card" style="padding:12px 16px;margin-bottom:12px;">
      <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:8px;">
        <span style="font-size:0.85rem;color:var(--text-secondary);">💵 当前余额</span>
        <strong style="font-family:'Orbitron';font-size:1.3rem;color:var(--green);">$${(gameState.money || 0).toFixed(1)}M</strong>
      </div>
      <div style="display:grid;grid-template-columns:repeat(2,1fr);gap:8px;font-size:0.8rem;">
        <div>🏎️ 车队信任: <strong style="color:var(--text-primary);">${rep.teamTrust}</strong></div>
        <div>📺 媒体关系: <strong style="color:var(--text-primary);">${rep.mediaRelation}</strong></div>
        <div>👥 车迷人气: <strong style="color:var(--text-primary);">${rep.fanPopularity}</strong></div>
        <div>🤝 车手尊重: <strong style="color:var(--text-primary);">${rep.driverRespect}</strong></div>
      </div>
    </div>

    <h3 style="margin:16px 0 12px;font-size:0.9rem;color:var(--text-secondary);">公关活动</h3>
    <div style="display:grid;gap:10px;">
      ${PR_OPTIONS.map(opt => {
        const canAfford = (gameState.money || 0) >= opt.cost;
        return `
          <div class="contract-card" ${canAfford ? `onclick="confirmPR('${opt.id}')"` : ''} style="${canAfford ? '' : 'opacity:0.5;cursor:not-allowed;'}">
            <div class="contract-team">
              <span style="font-size:1.5rem;margin-right:8px;">${opt.icon}</span>
              ${opt.name}
              <span style="margin-left:auto;font-family:'Orbitron';font-weight:700;color:${canAfford ? 'var(--green)' : 'var(--f1-red)'};">$${opt.cost}M</span>
            </div>
            <div style="font-size:0.85rem;color:var(--text-secondary);margin-top:4px;">
              ${opt.desc}
            </div>
            <div style="font-size:0.8rem;color:var(--gold);margin-top:4px;">
              📈 ${opt.effectDesc}
            </div>
          </div>
        `;
      }).join('')}
    </div>
  `;
}

function confirmPR(prId) {
  const opt = PR_OPTIONS.find(o => o.id === prId);
  if (!opt) return;
  if ((gameState.money || 0) < opt.cost) {
    showToast('余额不足！', 'error');
    return;
  }

  showScreen('sponsor-screen');
  document.getElementById('sponsor-screen').innerHTML = `
    <button class="back-btn" onclick="renderPR()">← 返回公关</button>
    <div class="section-header">
      <h2 class="font-display">${opt.icon} 确认</h2>
    </div>
    <div class="card" style="padding:24px;text-align:center;">
      <div style="font-size:3rem;margin-bottom:12px;">${opt.icon}</div>
      <h3>${opt.name}</h3>
      <p class="text-muted" style="margin-top:8px;">${opt.desc}</p>
      <div style="margin-top:16px;font-size:0.85rem;line-height:1.8;">
        <div>💵 花费: <strong style="color:var(--f1-red);">$${opt.cost}M</strong></div>
        <div>📈 效果: <strong style="color:var(--gold);">${opt.effectDesc}</strong></div>
        <div>💵 签约后余额: <strong style="color:var(--green);">$${((gameState.money || 0) - opt.cost).toFixed(1)}M</strong></div>
      </div>
      <div style="margin-top:20px;display:flex;gap:10px;justify-content:center;">
        <button class="btn btn-secondary" onclick="renderPR()">取消</button>
        <button class="btn btn-primary" onclick="executePR('${opt.id}')">确认</button>
      </div>
    </div>
  `;
}

function executePR(prId) {
  const opt = PR_OPTIONS.find(o => o.id === prId);
  if (!opt) return;
  if ((gameState.money || 0) < opt.cost) {
    showToast('余额不足！', 'error');
    return;
  }

  gameState.money -= opt.cost;
  const rep = gameState.reputation;

  if (opt.effects.mediaRep) rep.mediaRelation = clamp(rep.mediaRelation + opt.effects.mediaRep, 0, 100);
  if (opt.effects.fanPop) rep.fanPopularity = clamp(rep.fanPopularity + opt.effects.fanPop, 0, 100);
  if (opt.effects.driverRep) rep.driverRespect = clamp(rep.driverRespect + opt.effects.driverRep, 0, 100);
  if (opt.effects.teamTrust) rep.teamTrust = clamp(rep.teamTrust + opt.effects.teamTrust, 0, 100);

  showToast(`已执行 ${opt.name}！${opt.effectDesc}`, 'success');
  renderPR();
  saveGame();
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

    <div class="card" style="padding:12px 16px;margin-bottom:12px;">
      <div style="display:flex;justify-content:space-between;align-items:center;">
        <span style="font-size:0.85rem;color:var(--text-secondary);">💵 当前余额</span>
        <strong style="font-family:'Orbitron';font-size:1.3rem;color:var(--green);">$${(gameState.money || 0).toFixed(1)}M</strong>
      </div>
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
        ${gameState.sponsorYearsLeft > 0 ? `
          <div style="margin-top:8px;padding-top:8px;border-top:1px solid var(--border);font-size:0.8rem;">
            📅 合同剩余: <strong style="color:var(--gold);">${gameState.sponsorYearsLeft}年</strong>
            ${gameState.sponsorYearsLeft > 0 ? `<br>⚠️ 提前解约需支付违约金 <strong style="color:var(--f1-red);">$${(currentSponsor.salary * gameState.sponsorYearsLeft * 2).toFixed(1)}M</strong>` : ''}
          </div>
        ` : ''}
      </div>
    ` : `
      <div class="card" style="text-align:center;padding:30px;">
        <div style="font-size:2.5rem;margin-bottom:8px;">🤝</div>
        <p class="text-muted">你还没有赞助商。选择一个赞助商来获得额外收入和属性加成。</p>
      </div>
    `}

    <h3 style="margin:20px 0 12px;font-size:0.9rem;color:var(--text-secondary);">可签约赞助商</h3>
    <div style="display:grid;gap:10px;">
      ${offers.map(offer => {
        const contractYears = 1 + Math.floor(Math.random() * 3);
        const isLocked = gameState.sponsorYearsLeft > 0;
        const isCurrent = currentSponsor && currentSponsor.id === offer.id;
        return `
          <div class="contract-card" ${isLocked || isCurrent ? '' : `onclick="confirmSponsor('${offer.id}', ${contractYears})"`} style="${isLocked || isCurrent ? 'opacity:0.5;cursor:not-allowed;' : ''}">
            <div class="contract-team">
              <span style="font-size:1.5rem;margin-right:8px;">${offer.icon}</span>
              ${offer.name}
              ${isCurrent ? '<span class="badge badge-green" style="margin-left:8px;">当前</span>' : ''}
              ${isLocked && !isCurrent ? '<span class="badge" style="margin-left:8px;background:var(--bg);color:var(--text-muted);">合同锁定中</span>' : ''}
            </div>
            <div class="contract-details">
              <div class="contract-detail">💰 年薪加成: <span class="value">+$${offer.salary}M</span></div>
              <div class="contract-detail">📅 合同年限: <span class="value">${contractYears}年</span></div>
              ${offer.bonus ? `<div class="contract-detail">📈 属性加成: <span class="value">${STAT_NAMES[offer.bonus].split(' ')[1]} +${offer.amount}</span></div>` : '<div class="contract-detail">📈 无属性加成</div>'}
            </div>
          </div>
        `;
      }).join('')}
    </div>

    ${gameState.sponsorYearsLeft > 0 ? `
      <button class="btn btn-secondary" onclick="confirmBreakSponsor()" style="margin-top:16px;border-color:var(--f1-red);color:var(--f1-red);">
        💔 提前解约 (违约金 $${(currentSponsor.salary * gameState.sponsorYearsLeft * 2).toFixed(1)}M)
      </button>
    ` : ''}

    <p style="font-size:0.8rem;color:var(--text-muted);margin-top:16px;text-align:center;">
      签约后合同年限内不可更换，提前解约需支付违约金
    </p>
  `;
}

function confirmSponsor(sponsorId, contractYears) {
  const offer = getSponsorOffers().find(s => s.id === sponsorId);
  if (!offer) return;

  showScreen('sponsor-screen');
  document.getElementById('sponsor-screen').innerHTML = `
    <button class="back-btn" onclick="renderSponsor()">← 返回赞助商</button>
    <div class="section-header">
      <h2 class="font-display">🤝 确认签约</h2>
    </div>
    <div class="card" style="padding:24px;text-align:center;">
      <div style="font-size:3rem;margin-bottom:12px;">${offer.icon}</div>
      <h3>${offer.name}</h3>
      <p class="text-muted" style="margin-top:8px;">${offer.desc}</p>
      <div style="margin-top:16px;text-align:left;font-size:0.85rem;line-height:1.8;">
        <div>💰 年薪加成: <strong style="color:var(--green);">+$${offer.salary}M/年</strong></div>
        <div>📅 合同年限: <strong>${contractYears}年</strong></div>
        <div>💵 签约奖金: <strong style="color:var(--green);">$${(offer.salary * 0.5).toFixed(1)}M</strong> (签约即得)</div>
        ${offer.bonus ? `<div>📈 属性加成: <strong>${STAT_NAMES[offer.bonus].split(' ')[1]} +${offer.amount}</strong></div>` : ''}
        <div>⚠️ 合同期内不可更换，提前解约需支付违约金</div>
      </div>
      <div style="margin-top:20px;display:flex;gap:10px;justify-content:center;">
        <button class="btn btn-secondary" onclick="renderSponsor()">取消</button>
        <button class="btn btn-primary" onclick="signSponsor('${sponsorId}', ${contractYears})">确认签约</button>
      </div>
    </div>
  `;
}

function signSponsor(sponsorId, contractYears) {
  const offer = getSponsorOffers().find(s => s.id === sponsorId);
  if (!offer) return;

  // Remove old sponsor bonus if any (shouldn't happen if locked, but just in case)
  if (gameState.sponsor && gameState.sponsor.bonus) {
    gameState.stats[gameState.sponsor.bonus] = clamp(gameState.stats[gameState.sponsor.bonus] - gameState.sponsor.amount, 50, 100);
  }

  gameState.sponsor = offer;
  gameState.sponsorYearsLeft = contractYears;

  // Apply new sponsor bonus
  if (offer.bonus) {
    gameState.stats[offer.bonus] = clamp(gameState.stats[offer.bonus] + offer.amount, 50, 100);
  }

  // Signing bonus
  const signingBonus = offer.salary * 0.5;
  gameState.money += signingBonus;
  gameState.totalEarnings += signingBonus;

  showToast(`已签约 ${offer.name}！获得签约奖金 $${signingBonus.toFixed(1)}M`, 'success');
  renderSponsor();
  saveGame();
}

function confirmBreakSponsor() {
  const currentSponsor = gameState.sponsor;
  if (!currentSponsor || gameState.sponsorYearsLeft <= 0) return;

  const penalty = currentSponsor.salary * gameState.sponsorYearsLeft * 2;

  showScreen('sponsor-screen');
  document.getElementById('sponsor-screen').innerHTML = `
    <button class="back-btn" onclick="renderSponsor()">← 返回赞助商</button>
    <div class="section-header">
      <h2 class="font-display">💔 确认解约</h2>
    </div>
    <div class="card" style="padding:24px;text-align:center;">
      <div style="font-size:3rem;margin-bottom:12px;">💔</div>
      <h3>确定要与 ${currentSponsor.name} 解约吗？</h3>
      <p class="text-muted" style="margin-top:8px;">
        解约后将失去所有属性加成和年薪加成。<br>
        需要支付违约金: <strong style="color:var(--f1-red);">$${penalty.toFixed(1)}M</strong><br>
        当前余额: <strong style="color:var(--green);">$${(gameState.money || 0).toFixed(1)}M</strong>
      </p>
      ${gameState.money < penalty ? '<p style="color:var(--f1-red);margin-top:8px;">⚠️ 余额不足，无法支付违约金！</p>' : ''}
      <div style="margin-top:20px;display:flex;gap:10px;justify-content:center;">
        <button class="btn btn-secondary" onclick="renderSponsor()">取消</button>
        <button class="btn btn-primary" onclick="breakSponsor()" style="background:var(--f1-red);" ${gameState.money < penalty ? 'disabled' : ''}>确认解约</button>
      </div>
    </div>
  `;
}

function breakSponsor() {
  const currentSponsor = gameState.sponsor;
  if (!currentSponsor) return;

  const penalty = currentSponsor.salary * gameState.sponsorYearsLeft * 2;
  if (gameState.money < penalty) return;

  gameState.money -= penalty;

  // Remove sponsor bonus
  if (currentSponsor.bonus) {
    gameState.stats[currentSponsor.bonus] = clamp(gameState.stats[currentSponsor.bonus] - currentSponsor.amount, 50, 100);
  }

  gameState.sponsor = null;
  gameState.sponsorYearsLeft = 0;

  showToast(`已与 ${currentSponsor.name} 解约，支付违约金 $${penalty.toFixed(1)}M`, 'info');
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

    <button class="btn btn-primary btn-lg" onclick="renderQualifyingStrategy()" style="margin-top:20px;">
      进入排位赛 →
    </button>
  `;
}

function renderQualifyingStrategy() {
  showScreen('race-screen');
  const { track, weather } = raceState;
  const player = getPlayer();
  const team = TEAMS[gameState.teamIdx];
  const isSprintWeekend = track.sprint;

  document.getElementById('race-screen').innerHTML = `
    <div class="race-header">
      <div class="race-round">排位赛策略</div>
      <div class="race-name">${track.name}</div>
      <div class="race-country">${track.country}</div>
      <div class="weather-badge">${weather.icon} ${weather.name}</div>
    </div>

    <div class="card" style="padding:16px;margin-bottom:16px;">
      <div style="display:flex;justify-content:space-between;font-size:0.85rem;">
        <div>🏎️ <strong style="color:${team.css.includes('red') ? 'var(--f1-red)' : 'var(--text-primary)'};">${team.short}</strong> 赛车性能: <strong>${team.car}</strong></div>
        <div>⚡ 你的速度: <strong style="color:var(--f1-red);">${player.stats.pace}</strong></div>
      </div>
      ${weather.wetMod > 0.2 ? '<div style="margin-top:6px;font-size:0.8rem;color:var(--blue);">🌧️ 湿地条件 — 雨战能力将影响排位</div>' : ''}
    </div>

    <div class="section-header">
      <h2 class="font-display">🏁 选择排位赛策略</h2>
    </div>
    <p class="text-muted" style="margin-bottom:16px;">不同策略会影响你的排位赛成绩和风险</p>

    <div style="display:grid;gap:10px;">
      <div class="contract-card" onclick="runQualifying('push')" style="border-color:var(--f1-red);">
        <div class="contract-team">
          <span style="font-size:1.5rem;margin-right:8px;">🔥</span>
          全力推进
          <span style="margin-left:auto;font-size:0.75rem;color:var(--f1-red);font-weight:600;">高风险高回报</span>
        </div>
        <div style="font-size:0.85rem;color:var(--text-secondary);margin-top:4px;">
          赛车推向极限，速度提升但失误风险增大
        </div>
        <div style="font-size:0.8rem;margin-top:4px;">
          <span style="color:var(--green);">📈 速度 +3</span> ·
          <span style="color:var(--f1-red);">⚠️ 随机性增大</span>
        </div>
      </div>

      <div class="contract-card" onclick="runQualifying('balanced')">
        <div class="contract-team">
          <span style="font-size:1.5rem;margin-right:8px;">⚖️</span>
          均衡策略
          <span style="margin-left:auto;font-size:0.75rem;color:var(--green);font-weight:600;">推荐</span>
        </div>
        <div style="font-size:0.85rem;color:var(--text-secondary);margin-top:4px;">
          在速度和稳定之间取得平衡
        </div>
        <div style="font-size:0.8rem;margin-top:4px;">
          <span style="color:var(--green);">📈 速度 +1</span> ·
          <span style="color:var(--text-muted);">正常随机性</span>
        </div>
      </div>

      <div class="contract-card" onclick="runQualifying('conservative')" style="border-color:var(--blue);">
        <div class="contract-team">
          <span style="font-size:1.5rem;margin-right:8px;">🛡️</span>
          保守稳健
          <span style="margin-left:auto;font-size:0.75rem;color:var(--blue);font-weight:600;">低风险</span>
        </div>
        <div style="font-size:0.85rem;color:var(--text-secondary);margin-top:4px;">
          确保稳定圈速，避免失误但速度略慢
        </div>
        <div style="font-size:0.8rem;margin-top:4px;">
          <span style="color:var(--f1-red);">📉 速度 -2</span> ·
          <span style="color:var(--green);">✅ 随机性减小</span>
        </div>
      </div>
    </div>
  `;
}

function runQualifying(strategy) {
  const result = simulateQualifying(raceState.raceIdx, strategy);
  raceState.qualifyingResult = result;
  raceState.qualifyingStrategy = strategy;
  raceState.phase = 'qualifying';

  // Track pole position
  if (result.playerPos === 1) {
    gameState.careerPoles = (gameState.careerPoles || 0) + 1;
  }

  const player = getPlayer();
  const team = TEAMS[gameState.teamIdx];
  const top10 = result.results.slice(0, 10);

  const strategyText = {
    'push': '🔥 全力推进',
    'balanced': '⚖️ 均衡策略',
    'conservative': '🛡️ 保守稳健',
  };

  document.getElementById('race-screen').innerHTML = `
    <div class="race-header">
      <div class="race-round">排位赛结果 · ${strategyText[strategy] || ''}</div>
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

    ${raceState.track.sprint ? `
      <button class="btn btn-primary btn-lg" onclick="renderSprintRace()" style="margin-top:16px;">
        🏁 进入冲刺赛 →
      </button>
    ` : `
      <button class="btn btn-primary btn-lg" onclick="startRace()" style="margin-top:16px;">
        🏁 开始正赛 →
      </button>
    `}
  `;
}

// ============ SPRINT RACE ============

const SPRINT_POINTS = [8, 7, 6, 5, 4, 3, 2, 1]; // Top 8 score

function renderSprintRace() {
  showScreen('race-screen');
  const { track, weather, qualifyingResult } = raceState;
  const player = getPlayer();
  const team = TEAMS[gameState.teamIdx];
  const gridPos = qualifyingResult.playerPos;

  document.getElementById('race-screen').innerHTML = `
    <div class="race-header">
      <div class="race-round">🏁 冲刺赛</div>
      <div class="race-name">${track.name}</div>
      <div class="race-country">${track.country}</div>
      <div class="weather-badge">${weather.icon} ${weather.name}</div>
    </div>

    <div class="card" style="padding:16px;margin-bottom:16px;">
      <div style="display:flex;justify-content:space-between;font-size:0.85rem;">
        <div>🏁 发车位: <strong style="color:var(--gold);">P${gridPos}</strong></div>
        <div>🏎️ ${team.short} · 性能 ${team.car}</div>
        <div>⚡ 速度 ${player.stats.pace} · 🎯 稳定 ${player.stats.consistency}</div>
      </div>
      ${weather.wetMod > 0.2 ? '<div style="margin-top:6px;font-size:0.8rem;color:var(--blue);">🌧️ 湿地条件 — 雨战能力将发挥关键作用</div>' : ''}
    </div>

    <div class="section-header">
      <h2 class="font-display">🏁 冲刺赛策略</h2>
    </div>
    <p class="text-muted" style="margin-bottom:16px;">冲刺赛约100公里，前8名获得积分（8-7-6-5-4-3-2-1）。选择你的开局策略：</p>

    <div style="display:grid;gap:10px;">
      <div class="contract-card" onclick="runSprintRace('attack')">
        <div class="contract-team">
          <span style="font-size:1.5rem;margin-right:8px;">⚔️</span>
          激进进攻
          <span style="margin-left:auto;font-size:0.75rem;color:var(--f1-red);font-weight:600;">超车模式</span>
        </div>
        <div style="font-size:0.85rem;color:var(--text-secondary);margin-top:4px;">开局就猛攻，争取提升名次</div>
        <div style="font-size:0.8rem;margin-top:4px;">
          <span style="color:var(--green);">📈 进攻 +5, 速度 +3</span> ·
          <span style="color:var(--f1-red);">⚠️ 稳定 -3, 轮胎磨损 +</span>
        </div>
      </div>

      <div class="contract-card" onclick="runSprintRace('hold')">
        <div class="contract-team">
          <span style="font-size:1.5rem;margin-right:8px;">🛡️</span>
          稳守位置
          <span style="margin-left:auto;font-size:0.75rem;color:var(--green);font-weight:600;">保位模式</span>
        </div>
        <div style="font-size:0.85rem;color:var(--text-secondary);margin-top:4px;">守住当前位置，减少风险</div>
        <div style="font-size:0.8rem;margin-top:4px;">
          <span style="color:var(--green);">📈 防守 +5, 稳定 +2</span> ·
          <span style="color:var(--text-muted);">速度正常</span>
        </div>
      </div>

      <div class="contract-card" onclick="runSprintRace('balanced')">
        <div class="contract-team">
          <span style="font-size:1.5rem;margin-right:8px;">⚖️</span>
          均衡应对
          <span style="margin-left:auto;font-size:0.75rem;color:var(--blue);font-weight:600;">灵活模式</span>
        </div>
        <div style="font-size:0.85rem;color:var(--text-secondary);margin-top:4px;">根据赛道情况灵活调整</div>
        <div style="font-size:0.8rem;margin-top:4px;">
          <span style="color:var(--green);">📈 全属性 +1</span> ·
          <span style="color:var(--text-muted);">无负面效果</span>
        </div>
      </div>
    </div>
  `;
}

function runSprintRace(strategy) {
  const { track, weather, qualifyingResult } = raceState;
  const player = getPlayer();

  // Sprint race: 2 segments, simplified
  const totalSegs = 2;
  const gridOrder = [...qualifyingResult.results];

  // Apply strategy modifiers for player
  let sprintMods = {};
  if (strategy === 'attack') {
    sprintMods = { pace: 3, attack: 5, consistency: -3, defend: -1, tireWear: 2 };
  } else if (strategy === 'hold') {
    sprintMods = { defend: 5, consistency: 2, pace: -1 };
  } else {
    sprintMods = { pace: 1, consistency: 1, attack: 1, defend: 1, raceIQ: 1 };
  }

  // Simulate sprint race
  const driverScores = {};
  gridOrder.forEach(r => {
    driverScores[r.driver.name] = { total: 0, dnf: false, driver: r.driver };
  });

  for (let seg = 0; seg < totalSegs; seg++) {
    gridOrder.forEach(r => {
      const driver = r.driver;
      const mods = driver.isPlayer ? sprintMods : null;
      const result = simulateRaceSegment(seg, totalSegs, driver, track, weather, mods);
      if (result.dnf) {
        driverScores[driver.name].dnf = true;
      }
      driverScores[driver.name].total += result.score;
    });
  }

  // Sort by total score (DNFs go to back)
  const sprintResults = Object.values(driverScores).sort((a, b) => {
    if (a.dnf && !b.dnf) return 1;
    if (!a.dnf && b.dnf) return -1;
    return b.total - a.total;
  });

  const playerSprintPos = sprintResults.findIndex(r => r.driver.isPlayer) + 1;
  const sprintPoints = playerSprintPos <= 8 ? SPRINT_POINTS[playerSprintPos - 1] : 0;

  // Award sprint points (don't add to main championship in this simplified version,
  // but track for display)
  raceState.sprintResult = { position: playerSprintPos, points: sprintPoints, results: sprintResults };

  const strategyText = {
    'attack': '⚔️ 激进进攻',
    'hold': '🛡️ 稳守位置',
    'balanced': '⚖️ 均衡应对',
  };

  const gridPos = qualifyingResult.playerPos;
  const posChange = gridPos - playerSprintPos;

  document.getElementById('race-screen').innerHTML = `
    <div class="race-header">
      <div class="race-round">🏁 冲刺赛结果 · ${strategyText[strategy]}</div>
      <div class="race-name">${track.name}</div>
    </div>

    <div class="card" style="text-align:center;padding:30px;">
      <div style="font-size:0.85rem;color:var(--text-secondary);margin-bottom:8px;">冲刺赛成绩</div>
      <div style="font-family:'Orbitron';font-size:3rem;font-weight:900;color:${playerSprintPos <= 3 ? 'var(--gold)' : playerSprintPos <= 8 ? 'var(--green)' : 'var(--text-primary)'};">
        P${playerSprintPos}
      </div>
      <div style="font-size:0.85rem;margin-top:4px;">
        ${posChange > 0 ? `<span style="color:var(--green);">↑ 提升 ${posChange} 位</span>` : posChange < 0 ? `<span style="color:var(--f1-red);">↓ 下降 ${Math.abs(posChange)} 位</span>` : '<span style="color:var(--text-muted);">位置不变</span>'}
        ${sprintPoints > 0 ? ` · <span style="color:var(--gold);">+${sprintPoints} 冲刺积分</span>` : ''}
      </div>
    </div>

    <div class="card">
      <h3 style="margin-bottom:12px;font-size:0.9rem;color:var(--text-secondary);">冲刺赛前十名</h3>
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
          ${sprintResults.slice(0, 10).map((r, i) => {
            const t = TEAMS.find(t => t.id === r.driver.teamId);
            const posClass = i + 1 <= 3 ? `pos-${i + 1}` : '';
            const pts = i + 1 <= 8 ? SPRINT_POINTS[i] : 0;
            return `
              <tr class="${r.driver.isPlayer ? 'player-row' : ''}">
                <td class="pos-col ${posClass}">${r.dnf ? 'DNF' : i + 1}</td>
                <td>${r.driver.name} ${r.driver.isPlayer ? '⭐' : ''}</td>
                <td><span class="team-badge ${t.css}" style="font-size:0.7rem;padding:2px 6px;">${t.short}</span></td>
                <td class="pts-col">${pts > 0 ? '+' + pts : '-'}</td>
              </tr>
            `;
          }).join('')}
        </tbody>
      </table>
    </div>

    <button class="btn btn-primary btn-lg" onclick="startRace()" style="margin-top:16px;">
      🏁 进入正赛 →
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
        ${raceState.sprintResult ? `<div style="margin-top:4px;font-size:0.85rem;color:var(--gold);">🏁 冲刺赛: P${raceState.sprintResult.position} (+${raceState.sprintResult.points}pts)</div>` : ''}
        ${pos === 1 ? '<div style="margin-top:12px;font-size:1.5rem;">🏆 🎉 冠军！</div>' : ''}
        ${pos === 2 ? '<div style="margin-top:12px;font-size:1.2rem;">🥈 亚军！</div>' : ''}
        ${pos === 3 ? '<div style="margin-top:12px;font-size:1.2rem;">🥉 季军！</div>' : ''}
      ` : `
        <div class="result-points" style="color:var(--f1-red);">遗憾退赛</div>
        ${raceState.sprintResult ? `<div style="margin-top:4px;font-size:0.85rem;color:var(--gold);">🏁 冲刺赛: P${raceState.sprintResult.position} (+${raceState.sprintResult.points}pts)</div>` : ''}
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
  gameState.socialUsedThisWeek = false;
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
      <h2 class="font-display">💼 合同谈判</h2>
    </div>
    <div class="card" style="padding:14px;margin-bottom:16px;">
      <div style="font-size:0.85rem;color:var(--text-secondary);line-height:1.6;">
        📋 赛季结束，以下车队对你表示了兴趣。点击卡片选择合同，查看详情后确认签约。<br>
        ⚠️ 注意：其他车手也在竞争席位，如果犹豫太久可能被抢走机会。
      </div>
    </div>

    <div id="contract-list">
      ${offers.map((offer, i) => {
        const interestColor = offer.interest >= 70 ? 'var(--green)' : offer.interest >= 40 ? 'var(--yellow)' : 'var(--f1-red)';
        const interestLabel = offer.interest >= 70 ? '非常感兴趣' : offer.interest >= 50 ? '有兴趣' : offer.interest >= 30 ? '一般' : '勉强考虑';
        return `
          <div class="contract-card" data-idx="${i}">
            <div class="contract-team">
              <span class="team-badge ${offer.team.css}" style="margin-right:8px;">${offer.team.short}</span>
              ${offer.isCurrent ? '<span class="badge badge-green">续约</span>' : '<span class="badge badge-blue">新报价</span>'}
              <span style="font-size:0.75rem;color:${interestColor};font-weight:600;margin-left:auto;">${interestLabel} ${offer.interest}%</span>
            </div>
            <div class="contract-details">
              <div class="contract-detail">💰 年薪: <span class="value">$${offer.salary}M</span></div>
              <div class="contract-detail">📅 年限: <span class="value">${offer.years}年</span></div>
              <div class="contract-detail">🏎️ 赛车性能: <span class="value">${offer.team.car}</span></div>
              <div class="contract-detail">🎁 签字费: <span class="value">$${offer.signingBonus}M</span></div>
            </div>
            <div style="margin-top:8px;padding-top:8px;border-top:1px solid var(--border);font-size:0.8rem;color:var(--text-secondary);">
              <div>🎯 车队期望: <span style="color:var(--text-primary);">${offer.expectation}</span></div>
              <div>📝 合同条款: <span style="color:var(--text-primary);">${offer.clause}</span></div>
              ${offer.rivalDriver ? `<div>⚔️ 竞争对手: <span style="color:var(--f1-red);">${offer.rivalDriver}</span> (对此席位兴趣 ${offer.rivalInterest}%)</div>` : '<div>⚔️ 竞争对手: <span style="color:var(--green);">无</span></div>'}
            </div>
          </div>
        `;
      }).join('')}
    </div>

    <div id="contract-detail-panel" style="display:none;margin-top:16px;"></div>

    <button class="btn btn-primary btn-lg" id="accept-contract-btn" disabled style="margin-top:16px;">
      签约并开始新赛季
    </button>
  `;

  // Use event listeners instead of inline onclick to fix selection bug
  const cards = document.querySelectorAll('.contract-card');
  cards.forEach(card => {
    card.addEventListener('click', function() {
      const idx = parseInt(this.dataset.idx);
      selectContract(idx);
    });
  });

  document.getElementById('accept-contract-btn').addEventListener('click', function() {
    acceptContractOffer();
  });
}

function selectContract(idx) {
  const cards = document.querySelectorAll('.contract-card');
  cards.forEach(c => c.classList.remove('selected'));
  if (cards[idx]) {
    cards[idx].classList.add('selected');
  }
  raceState.selectedOffer = idx;

  // Show detail panel
  const offer = raceState.contractOffers[idx];
  const detailPanel = document.getElementById('contract-detail-panel');
  detailPanel.style.display = 'block';
  detailPanel.innerHTML = `
    <div class="card" style="border-color:var(--gold);box-shadow:0 0 20px rgba(255,215,0,0.1);">
      <h3 style="margin-bottom:12px;font-size:0.95rem;">📋 合同详情 — ${offer.team.short}</h3>
      <div style="font-size:0.85rem;line-height:1.8;color:var(--text-secondary);">
        <div>💰 <strong style="color:var(--text-primary);">年薪 $${offer.salary}M/年</strong> × ${offer.years}年 = 总价值 $${(offer.salary * offer.years).toFixed(1)}M</div>
        <div>🎁 签字费: <strong style="color:var(--green);">$${offer.signingBonus}M</strong>（签约即得）</div>
        <div>🎯 赛季目标: <strong style="color:var(--text-primary);">${offer.expectation}</strong>（年终排名需进入P${offer.expectationPos}以内）</div>
        <div>📝 合同条款: <strong style="color:var(--text-primary);">${offer.clause}</strong></div>
        ${offer.rivalDriver ? `<div>⚠️ <strong style="color:var(--f1-red);">${offer.rivalDriver}</strong>也在竞争这个席位，对方兴趣度 ${offer.rivalInterest}%</div>` : '<div>✅ <strong style="color:var(--green);">无竞争对手</strong>，车队专门为你预留席位</div>'}
      </div>
    </div>
  `;

  // Scroll to detail
  detailPanel.scrollIntoView({ behavior: 'smooth', block: 'nearest' });

  document.getElementById('accept-contract-btn').disabled = false;
}

function acceptContractOffer() {
  if (raceState.selectedOffer === null || raceState.selectedOffer === undefined) return;
  const offer = raceState.contractOffers[raceState.selectedOffer];
  acceptContract(offer);

  // Show transfer cascade info if there were transfers
  if (gameState.lastTransferLog && gameState.lastTransferLog.length > 0) {
    showTransferResults(offer);
  } else {
    startNewSeason();
    raceState = null;
    renderHub();
    saveGame();
    showToast(`已签约 ${offer.team.short}！${gameState.season} 赛季开始！`, 'success');
  }
}

function showTransferResults(offer) {
  showScreen('contract-screen');
  const log = gameState.lastTransferLog;
  document.getElementById('contract-screen').innerHTML = `
    <div class="section-header">
      <h2 class="font-display">🔄 转会连锁反应</h2>
    </div>
    <div class="card" style="padding:16px;margin-bottom:16px;">
      <div style="font-size:0.9rem;line-height:1.6;">
        <strong>你的转会引发了一系列连锁反应：</strong><br>
        <span style="color:var(--text-secondary);font-size:0.85rem;">你加入了 ${offer.team.name}，被替代的车手也需要找到新去处。</span>
      </div>
    </div>

    <div style="display:grid;gap:10px;">
      ${log.map((t, i) => `
        <div class="card" style="padding:14px;display:flex;align-items:center;gap:12px;">
          <div style="font-size:1.5rem;">${i + 1}</div>
          <div style="flex:1;">
            <div style="font-weight:700;font-size:0.95rem;">${t.driver}</div>
            <div style="font-size:0.8rem;color:var(--text-secondary);">
              ${t.from} → <span style="color:var(--gold);font-weight:600;">${t.to}</span>
            </div>
          </div>
        </div>
      `).join('')}
    </div>

    <div class="card" style="margin-top:16px;padding:14px;background:var(--bg-card-hover);">
      <div style="font-size:0.85rem;color:var(--text-secondary);">
        💡 围场中每位车手的转会都可能引发连锁反应。表现不佳的车手可能被替补车手替换，而实力强劲的车手则会找到新的归宿。
      </div>
    </div>

    <button class="btn btn-primary btn-lg" onclick="finishTransferAndStart()" style="margin-top:16px;">
      确认并开始新赛季 →
    </button>
  `;
}

function finishTransferAndStart() {
  gameState.lastTransferLog = null;
  startNewSeason();
  raceState = null;
  renderHub();
  saveGame();
  showToast(`${gameState.season - 1}赛季结束！${gameState.season}赛季开始！`, 'success');
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
