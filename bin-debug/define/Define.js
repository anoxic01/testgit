var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var define;
(function (define) {
    var Define = (function () {
        function Define() {
        }
        return Define;
    }());
    /** 加载文件 **/
    Define.SWF_BET_CORD = "BetCord.swf"; //账号记录
    Define.SWF_CARD = "card.swf"; //账号记录
    Define.SWF_CHIP = "chip.swf"; //筹码
    Define.SWF_LOBBY = "lobby.swf"; //大厅
    Define.SWF_MULTITABLE = "Multi_tabling.swf"; //多桌
    Define.SWF_NUMBER = "number.swf"; //数字
    Define.SWF_PANEL = "panel.swf"; //面板
    Define.SWF_PANEL_GAME = "panel_game.swf"; //游戏面板
    Define.SWF_ROAD_MAP = "roadMap.swf"; //路纸
    Define.SWF_TABLE = "table.swf"; //桌子
    Define.SWF_TEL = "TelUi.swf"; //电投
    Define.SWF_THEME = "theme.swf"; //厅馆
    Define.SWF_WIN = "WIN_C.swf"; //胜利
    Define.SWF_WINA = "winA.swf"; //胜利
    Define.SWF_FONT = "Font.swf"; //账号记录
    Define.SWF_TEL_BAC = "Tel_GameBaccarat.swf"; //電投百家
    Define.SWF_MOBILE_APP = "mobileApp.swf"; //手机客户端
    /** 系统设置 **/
    Define.MUSIC = 0; //游戏音乐
    Define.EFFECT = 1; //游戏音效
    Define.LIVE = 2; //现场声音
    /** 语言定义 **/
    Define.LANGUAGE_CN = 0; //简体中文
    Define.LANGUAGE_TW = 1; //繁体中文
    Define.LANGUAGE_EN = 2; //英文语言
    /** 退出等级 **/
    Define.EXIT_LOBBY = 0; //退出大厅
    Define.EXIT_GAME = 1; //退出游戏
    Define.EXIT_TEL_LOBBY = 2; //退出電投大厅		
    Define.EXIT_MULTI_TABLE = 3; //退出多桌
    /** 帳戶種類 **/
    Define.CASH = "C"; //现金货币
    Define.CREDIT = "M"; //信用货币
    /** 珠盘路子 **/
    Define.BEAD_NUM = 60; //珠子数量
    Define.BEAD_BANKER = "banker"; //珠子位图
    Define.BEAD_PLAYER = "player"; //珠子位图
    Define.BEAD_TIE = "tie"; //珠子位图
    Define.BEAD_DRAGON = "dragon"; //珠子位图
    Define.BEAD_TIGER = "tiger"; //珠子位图
    Define.BEAD_DAN = "dan"; //珠子位图
    Define.BEAD_DAN_DZ = "dan_DZ";
    Define.BEAD_SHUANG = "shuang"; //珠子位图
    Define.BEAD_SHUANG_DZ = "shuang_DZ"; //珠子位图
    Define.BEAD_SMALL = "small"; //珠子位图
    Define.BEAD_BIG = "big"; //珠子位图
    Define.BEAD_NUMBER = "number";
    Define.BEAD_SMALL_DZ = "small_DZ"; //珠子位图
    Define.BEAD_BIG_DZ = "big_DZ"; //珠子位图
    Define.BEAD_RED = "red"; //珠子位图
    Define.BEAD_RED_DZ = "red_DZ"; //珠子位图
    Define.BEAD_BLACK = "black"; //黑位图
    Define.BEAD_BLACK_DZ = "black_DZ"; //珠子位图
    Define.BEAD_WEI = "wei"; //珠子位图
    Define.BEAD_WEI_DZ = "wei_DZ";
    Define.BEAD_ZERO = "zero"; //珠子位图
    Define.BEAD_ZERO_DZ = "zero_ez"; //
    /** 桌子类型 **/
    Define.TABLE_TYPE_NORMAL = 1; // 一般
    Define.TABLE_TYPE_SPEEDY = 2; // 急速
    Define.TABLE_TYPE_PEEK = 3; // 競瞇
    Define.TABLE_TYPE_ROBOT = 4; // 機械手臂
    Define.TABLE_TYPE_TELBET = 5; // 電投
    Define.TABLE_TYPE_CHARTER = 6; // 包桌
    Define.TABLE_TYPE_DTF = 7; // 龙虎
    Define.TABLE_TYPE_ROU = 8; // 轮盘
    Define.TABLE_TYPE_SIC = 9; // 骰宝
    Define.TABLE_TYPE_GOOD = 1001; // 好路桌(只在好路通知中)
    /** 主題類型 **/
    //***** QC ***********//
    //		public static var THEME_DIAMOND					:	number	=	1;				//钻石厅
    //		public static var THEME_PLATINUM				:	number	=	2;				//铂金厅
    //		public static var THEME_BID						:	number	=	3;				//翡翠厅
    //		public static var THEME_VIP						:	number	=	4;				//银臂厅
    //		public static var THEME_TELPHONE		 		:	number	=	5;				//電話投注
    //		public static var THEME_ARM						:	number	=	6;				//金臂厅
    //		public static var THEME_MULTI_TABLE				:	number	=	7;				//好路多桌
    //***** RTM ***********//
    Define.THEME_6 = 1; //钻石厅
    Define.THEME_0 = 2; //铂金厅
    Define.THEME_5 = 3; //翡翠厅
    Define.THEME_4 = 4; //金臂厅
    Define.THEME_3 = 5; //银臂厅
    Define.THEME_1 = 6; //電話投注
    Define.THEME_2 = 7; //好路多桌			
    /** 多桌模式 **/
    Define.MULTI_TABLE_MODE_0 = 1000; //多桌入口桌
    Define.MULTI_TABLE_MODE_4 = 4; //好路多桌
    Define.MULTI_TABLE_MODE_8 = 8; //好路多桌
    Define.MULTI_TABLE_MODE_16 = 16; //好路多桌
    /** 大廳種類 **/
    Define.INTERNET_BET_LOBBY = 0; //網投大廳				
    Define.TEL_BET_LOBBY = 1; //電投大廳
    /** 登陆大厅 **/
    Define.RET_0 = 0; //成功
    Define.RET_1 = 1; //失败
    Define.RET_2 = 2; //超时
    Define.RET_4 = 4; //通讯版本不对
    Define.RET_5 = 5; //老板尚未登录
    Define.RET_6 = 6; //配抢手尚未审核
    Define.RET_7 = 7; //维护中
    Define.RET_8 = 8; //帳號使用中
    Define.RET_9 = 9; //槍手配對碼不正確
    Define.RET_10 = 10; //服務器忙碌中,請重新登入
    Define.RET_11 = 11; //全站維護中不允許登入
    Define.RET_12 = 12; //代理維護中不允許登入
    Define.RET_13 = 13; //同ip不同账号不能登陆
    Define.RET_14 = 14; //不允許登入真人視訊網投大廳(信用帳戶限制)
    /**配槍手回復*/
    Define.TEL_GUNNERS_SUCCESS = 0; //配槍手成功
    Define.TEL_GUNNERS_TEL_FAILED = 1; //電話打不通
    Define.TEL_GUNNERS_NOT_ENOUGH = 2; //槍手不夠
    /**槍手狀態*/
    Define.TEL_GUNNERS_LOGIN = 0; //槍手登入
    Define.TEL_GUNNERS_FINISH_LOGOUT = 1; //槍手收工登出
    Define.TEL_GUNNERS_SHIFT_LOGOUT = 2; //槍手換班登出
    Define.TEL_GUNNERS_DISCONNECT = 3; //槍手斷線
    /** 缓动速度 **/
    Define.SPEED = 0.3;
    Define.SCALE_MIN = 0.1;
    Define.SCALE_MAX = 1;
    /** 视讯模式 **/
    Define.HD = 1; //高清
    Define.SD = 2; //标清
    /**個人資訊面板*/
    Define.PERSON_INFO_IN_POSX = 1660; //個人資訊面板移入座標X
    Define.PERSON_INFO_IN_POSY = 185; //個人資訊面板移入座標Y
    Define.PERSON_INFO_OUT_POSX = 1660; //個人資訊面板移入座標X
    Define.PERSON_INFO_OUT_POSY = -300; //個人資訊面板移入座標Y	
    /**登出原因
        2: 槍手換班登出
     *
     *
     * */
    Define.LOGOUT_REPEAT_LOGIN = 0; //重複登入
    Define.LOGOUT_Active_LOGOUT = 1; //玩家/槍手自己登出
    Define.LOGOUT_TRY_ACCOUNT_TIME_OUT = 3; //試玩帳號超過試玩時間，自動登出
    Define.LOGOUT_CANCEL_SUBSCRIPTION_MULTI = 4; //取消訂閱多桌登出
    Define.LOGOUT_DISCONNECT = 5; //斷線
    Define.DISCONNECTED_LOBBY = 5; //斷線
    Define.DISCONNECTED_GAME = 18; //斷線
    Define.LOGOUT_TABLER_DISCONNECT = 6; //包桌桌主離線
    Define.LOGOUT_TIME_OUT = 7; //逾時
    Define.LOGOUT_SERVER_MAINTAIN = 8; //伺服器維護中 	
    Define.LOGOUT_PROXY_PLAYER_SUSPENDED = 9; //後台或代理後台停用玩家
    Define.LOGOUT_DEPUTY_FINISHED_LOGOUT = 10; //槍手收工登出
    Define.LOGOUT_RESET_PASSWORD = 11; //重设密码
    Define.LOGOUT_TABLE_CLOSE = 12; //赌桌关闭
    Define.LOGOUT_MAINTAIN_ALL = 13; //全站维护
    Define.LOGOUT_MAINTAIN_THEME = 14; //厅馆维护
    Define.LOGOUT_MAINTAIN_TABLE = 15; //赌桌维护
    Define.LOGOUT_MAINTAIN_AGENT = 16; //代理维护中
    Define.LOGOUT_MULTI_BET_TIME_OUT = 17; //多桌超时未下注（6分钟）
    Define.LOGOUT_LOCK_ACCOUNT = 19; //密碼錯誤三次,锁定账号
    /**客戶端判斷的連線狀態**/
    //大廳連線狀態
    Define.LobbyDisconnect = -2; //大廳斷線
    Define.LobbyConnectFailed = -3; //大廳連接失敗
    Define.LobbyConnected = -4; //大廳連接成功
    Define.LobbyActiveLogOut = -5; //玩家主動在大廳登出
    Define.LobbyTryAccountDisConnect = -6; //試玩帳號玩家斷線
    //遊戲連線狀態
    Define.GameDisconnect = -55; //遊戲斷線
    Define.GameConnectFailed = -56; //遊戲連接失敗
    Define.GameConnected = -57; //遊戲連接成功
    Define.GameTransTable = -58; //遊戲轉桌
    Define.GameMultiTableDisconnect = -59; //好路多桌斷線
    Define.GameMultiTableFailed = -60; //好路多桌連接埠上
    //		public static WebAPIKey							:	string	=	")%75*4i}XyqB~95@"; //之後會改做法,不寫在代碼中CN
    //		public static WebAPIKey							:	string	=	"!=~4b7#1R814@4a8"; //*****TWQC  臨時處裡***********//
    /**玩家身分*/
    Define.iPlayer = 0; //玩家
    Define.iGunner = 1; //槍手
    Define.iTryAccount = 2; //試玩帳號
    Define.iRobot = 3; //機器人
    /** 窗口倒计时 **/
    Define.countDown = 30;
    Define.Advertisement = 5; //广告显示数量
    /** Js交互 **/
    Define.JS_Index = 0; //回到首页
    Define.JS_Recharge = 1; //充值页面
    Define.JS_Contact = 2; //联系客服
    Define.JS_Rule = 3; //游戏规则
    Define.JS_Regist = 4; //注册网址
    Define.JS_Refresh = 5; //刷新
    Define.JS_JUMP_TELBET = 999; //跳转電投
    /** 嵌入字 **/
    Define.FONT_WRYH_BOLD = "微软雅黑 Bold";
    define.Define = Define;
    __reflect(Define.prototype, "define.Define");
})(define || (define = {}));
//# sourceMappingURL=Define.js.map