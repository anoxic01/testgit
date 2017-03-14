module define {
	export class Define {

		/** 加载文件 **/
		
		public static SWF_BET_CORD				:	string	=	"BetCord.swf";				//账号记录
		public static SWF_CARD					:	string	=	"card.swf";					//账号记录
		public static SWF_CHIP					:	string	=	"chip.swf";					//筹码
		public static SWF_LOBBY					:	string	=	"lobby.swf";				//大厅
		public static SWF_MULTITABLE				:	string	=	"Multi_tabling.swf";		//多桌
		public static SWF_NUMBER					:	string	=	"number.swf";				//数字
		public static SWF_PANEL					:	string	=	"panel.swf";				//面板
		public static SWF_PANEL_GAME				:	string	=	"panel_game.swf";			//游戏面板
		public static SWF_ROAD_MAP				:	string	=	"roadMap.swf";				//路纸
		public static SWF_TABLE					:	string	=	"table.swf";				//桌子
		public static SWF_TEL						:	string	=	"TelUi.swf";				//电投
		public static SWF_THEME					:	string	=	"theme.swf";				//厅馆
		public static SWF_WIN						:	string	=	"WIN_C.swf";				//胜利
		public static SWF_WINA					:	string	=	"winA.swf";					//胜利
		public static SWF_FONT					:	string	=	"Font.swf";					//账号记录
		public static SWF_TEL_BAC					:	string	=	"Tel_GameBaccarat.swf";		//電投百家
		public static SWF_MOBILE_APP				:	string	=	"mobileApp.swf";			//手机客户端
		
		
		/** 系统设置 **/
		public static MUSIC						:	number=	0;					//游戏音乐
		public static EFFECT						:	number=	1;					//游戏音效
		public static LIVE						:	number=	2;					//现场声音
		
		/** 语言定义 **/
		public static LANGUAGE_CN					:	number=	0;					//简体中文
		public static LANGUAGE_TW					:	number=	1;					//繁体中文
		public static LANGUAGE_EN					:	number=	2;					//英文语言
				
		
		/** 退出等级 **/
		public static EXIT_LOBBY					:	number=	0;				//退出大厅
		public static EXIT_GAME					:	number=	1;				//退出游戏
		public static EXIT_TEL_LOBBY				:	number=	2;				//退出電投大厅		
		public static EXIT_MULTI_TABLE			:	number=	3;				//退出多桌
		
		/** 帳戶種類 **/
		public static CASH						:	String 	= 	"C";			//现金货币
		public static CREDIT						:	String 	= 	"M";			//信用货币
		
		/** 珠盘路子 **/
		public static BEAD_NUM					:	number	=	60;				//珠子数量
		public static BEAD_BANKER					:	string	=	"banker";		//珠子位图
		public static BEAD_PLAYER					:	string	=	"player";		//珠子位图
		public static BEAD_TIE					:	string	=	"tie";			//珠子位图
		public static BEAD_DRAGON					:	string	=	"dragon";		//珠子位图
		public static BEAD_TIGER					:	string	=	"tiger";		//珠子位图
		public static BEAD_DAN					:	string	=	"dan";			//珠子位图
		public static BEAD_DAN_DZ					:	string	=	"dan_DZ";
		public static BEAD_SHUANG					:	string	=	"shuang";		//珠子位图
		public static BEAD_SHUANG_DZ				:	string	=	"shuang_DZ";	//珠子位图
		public static BEAD_SMALL					:	string	=	"small";		//珠子位图
		public static BEAD_BIG					:	string	=	"big";			//珠子位图
		public static BEAD_NUMBER					:	string	=	"number";
		public static BEAD_SMALL_DZ				:	string	=	"small_DZ";		//珠子位图
		public static BEAD_BIG_DZ					:	string	=	"big_DZ";		//珠子位图
		public static BEAD_RED					:	string	=	"red";			//珠子位图
		public static BEAD_RED_DZ					:	string	=	"red_DZ";		//珠子位图
		public static BEAD_BLACK					:	string	=	"black";		//黑位图
		public static BEAD_BLACK_DZ				:	string	=	"black_DZ";		//珠子位图
		public static BEAD_WEI					:	string	=	"wei";			//珠子位图
		public static BEAD_WEI_DZ					:	string	=	"wei_DZ";
		public static BEAD_ZERO					:	string	=	"zero";			//珠子位图
		public static BEAD_ZERO_DZ				:	string	=	"zero_ez";		//
		
		
		/** 桌子类型 **/
		public static TABLE_TYPE_NORMAL			:	number 	= 	1;				// 一般
		public static TABLE_TYPE_SPEEDY			:	number 	= 	2;				// 急速
		public static TABLE_TYPE_PEEK				:	number 	= 	3;				// 競瞇
		public static TABLE_TYPE_ROBOT			:	number 	= 	4;				// 機械手臂
		public static TABLE_TYPE_TELBET			:	number 	= 	5;				// 電投
		public static TABLE_TYPE_CHARTER			:	number 	= 	6;				// 包桌
		public static TABLE_TYPE_DTF				:	number 	= 	7;				// 龙虎
		public static TABLE_TYPE_ROU				:	number 	= 	8;				// 轮盘
		public static TABLE_TYPE_SIC				:	number 	= 	9;				// 骰宝
		public static TABLE_TYPE_GOOD				:	number 	= 	1001;			// 好路桌(只在好路通知中)
		
		/** 主題類型 **/
		//***** QC ***********//
//		public static THEME_DIAMOND					:	number	=	1;				//钻石厅
//		public static THEME_PLATINUM				:	number	=	2;				//铂金厅
//		public static THEME_BID						:	number	=	3;				//翡翠厅
//		public static THEME_VIP						:	number	=	4;				//银臂厅
//		public static THEME_TELPHONE		 		:	number	=	5;				//電話投注
//		public static THEME_ARM						:	number	=	6;				//金臂厅
//		public static THEME_MULTI_TABLE				:	number	=	7;				//好路多桌
		
		//***** RTM ***********//
		public static THEME_6			=	1;				//钻石厅
		public static THEME_0			=	2;				//铂金厅
		public static THEME_5			=	3;				//翡翠厅
		public static THEME_4			=	4;				//金臂厅
		public static THEME_3			=	5;				//银臂厅
		public static THEME_1		 	=	6;				//電話投注
		public static THEME_2			=	7;				//好路多桌			
		
		/** 多桌模式 **/
		public static MULTI_TABLE_MODE_0			:	number	=	1000;			//多桌入口桌
		public static MULTI_TABLE_MODE_4			:	number	=	4;				//好路多桌
		public static MULTI_TABLE_MODE_8			:	number	=	8;				//好路多桌
		public static MULTI_TABLE_MODE_16			:	number	=	16;				//好路多桌
		
		/** 大廳種類 **/
		public static INTERNET_BET_LOBBY			:	number	=	0;				//網投大廳				
		public static TEL_BET_LOBBY				:	number	=	1;				//電投大廳
		
		/** 登陆大厅 **/
		public static RET_0						:	number	=	0;				//成功
		public static RET_1						:	number	=	1;				//失败
		public static RET_2						:	number	=	2;				//超时
		public static RET_4						:	number	=	4;				//通讯版本不对
		public static RET_5						:	number	=	5;				//老板尚未登录
		public static RET_6						:	number	=	6;				//配抢手尚未审核
		public static RET_7						:	number	=	7;				//维护中
		public static RET_8						:	number	=	8;				//帳號使用中
		public static RET_9						:	number	=	9;				//槍手配對碼不正確
		public static RET_10						:	number	=	10;				//服務器忙碌中,請重新登入
		public static RET_11						:	number	=	11;				//全站維護中不允許登入
		public static RET_12						:	number	=	12;				//代理維護中不允許登入
		public static RET_13						:	number	=	13;				//同ip不同账号不能登陆
		public static RET_14						:	number	=	14;				//不允許登入真人視訊網投大廳(信用帳戶限制)
		
		
		
		/**配槍手回復*/
		public static TEL_GUNNERS_SUCCESS			:	number	=	0;				//配槍手成功
		public static TEL_GUNNERS_TEL_FAILED		:	number	=	1;				//電話打不通
		public static TEL_GUNNERS_NOT_ENOUGH		:	number	=	2;				//槍手不夠
		
		/**槍手狀態*/
		public static TEL_GUNNERS_LOGIN			:	number	=	0;				//槍手登入
		public static TEL_GUNNERS_FINISH_LOGOUT	:	number	=	1;				//槍手收工登出
		public static TEL_GUNNERS_SHIFT_LOGOUT	:	number	=	2;				//槍手換班登出
		public static TEL_GUNNERS_DISCONNECT		:	number	=	3;				//槍手斷線
		
		/** 缓动速度 **/
		public static SPEED						:	number	=	0.3;
		public static SCALE_MIN					:	number	=	0.1;
		public static SCALE_MAX					:	number	=	1;
		
		/** 视讯模式 **/
		public static HD							:	number	=	1;				//高清
		public static SD							:	number	=	2;				//标清
		
		/**個人資訊面板*/
		public static PERSON_INFO_IN_POSX			:	number	=	1660;			//個人資訊面板移入座標X
		public static PERSON_INFO_IN_POSY			:	number	=	185;			//個人資訊面板移入座標Y
		public static PERSON_INFO_OUT_POSX		:	number	=	1660;			//個人資訊面板移入座標X
		public static PERSON_INFO_OUT_POSY		:	number	=	-300;			//個人資訊面板移入座標Y	
		
		/**登出原因
			2: 槍手換班登出
		 * 
		 * 
		 * */
		public static LOGOUT_REPEAT_LOGIN					:	number	=	0;				//重複登入
		public static LOGOUT_Active_LOGOUT				:	number	=	1;				//玩家/槍手自己登出
		public static LOGOUT_TRY_ACCOUNT_TIME_OUT			:	number	=	3;				//試玩帳號超過試玩時間，自動登出
		public static LOGOUT_CANCEL_SUBSCRIPTION_MULTI	:	number	=	4;				//取消訂閱多桌登出
		public static LOGOUT_DISCONNECT					:	number	=	5;				//斷線
		public static DISCONNECTED_LOBBY					:	number	=	5;				//斷線
		public static DISCONNECTED_GAME					:	number	=	18;				//斷線
		public static LOGOUT_TABLER_DISCONNECT			:	number	=	6;				//包桌桌主離線
		public static LOGOUT_TIME_OUT						:	number	=	7;				//逾時
		public static LOGOUT_SERVER_MAINTAIN				:	number	=	8;				//伺服器維護中 	
		public static LOGOUT_PROXY_PLAYER_SUSPENDED		:	number	=	9;				//後台或代理後台停用玩家
		public static LOGOUT_DEPUTY_FINISHED_LOGOUT		:	number	=	10;				//槍手收工登出
		public static LOGOUT_RESET_PASSWORD				:	number	=	11;				//重设密码
		public static LOGOUT_TABLE_CLOSE					:	number	=	12;				//赌桌关闭
		public static LOGOUT_MAINTAIN_ALL					:	number	=	13;				//全站维护
		public static LOGOUT_MAINTAIN_THEME				:	number	=	14;				//厅馆维护
		public static LOGOUT_MAINTAIN_TABLE				:	number	=	15;				//赌桌维护
		public static LOGOUT_MAINTAIN_AGENT				:	number	=	16;				//代理维护中
		public static LOGOUT_MULTI_BET_TIME_OUT			:	number	=	17;				//多桌超时未下注（6分钟）
		public static LOGOUT_LOCK_ACCOUNT					:	number	=	19;				//密碼錯誤三次,锁定账号
		
		
		
		/**客戶端判斷的連線狀態**/
		//大廳連線狀態
		public static LobbyDisconnect						:	number 	= 	-2;					//大廳斷線
		public static LobbyConnectFailed					:	number 	= 	-3;					//大廳連接失敗
		public static LobbyConnected						:	number	=	-4;					//大廳連接成功
		public static LobbyActiveLogOut					:	number	=	-5;					//玩家主動在大廳登出
		public static LobbyTryAccountDisConnect			:	number	=	-6;					//試玩帳號玩家斷線
		
		//遊戲連線狀態
		public static GameDisconnect						:	number 	= 	-55;				//遊戲斷線
		public static GameConnectFailed					:	number 	= 	-56;				//遊戲連接失敗
		public static GameConnected						:	number	=	-57;				//遊戲連接成功
		public static GameTransTable						:	number	=	-58;				//遊戲轉桌
		public static GameMultiTableDisconnect			:	number	=	-59;				//好路多桌斷線
		public static GameMultiTableFailed				:	number	=	-60;				//好路多桌連接埠上
		
		
//		public static WebAPIKey							:	string	=	")%75*4i}XyqB~95@"; //之後會改做法,不寫在代碼中CN
//		public static WebAPIKey							:	string	=	"!=~4b7#1R814@4a8"; //*****TWQC  臨時處裡***********//
		
		/**玩家身分*/
		public static iPlayer								:	number	=	0;					//玩家
		public static iGunner								:	number	=	1;					//槍手
		public static iTryAccount							:	number	=	2;					//試玩帳號
		public static iRobot								:	number	=	3;					//機器人
		
		/** 窗口倒计时 **/
		public static countDown							:	number	=	30;
		
		public static Advertisement                       :   number     =    5;                //广告显示数量
		
		/** Js交互 **/
		public static JS_Index							:	number	=	0;					//回到首页
		public static JS_Recharge							:	number	=	1;					//充值页面
		public static JS_Contact							:	number	=	2;					//联系客服
		public static JS_Rule								:	number	=	3;					//游戏规则
		public static JS_Regist							:	number	=	4;					//注册网址
		public static JS_Refresh							:	number	=	5;					//刷新
		public static JS_JUMP_TELBET						:	number	=	999;				//跳转電投
		
		/** 嵌入字 **/
		public static FONT_WRYH_BOLD						:	string	=	"微软雅黑 Bold";	

			

		public constructor() {
		}
	}
}