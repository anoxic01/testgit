module define {
	export class GameDefine {
		/** 游戏名称 **/
		public static BAC_NAME							:	string 	= 	"GameBaccarat";
		public static DTF_NAME							:	string 	= 	"GameDrTi";
		public static ROU_NAME							:	string 	= 	"GameRoulette";
		public static SIC_NAME							:	string 	= 	"GameSicBo";
		public static TEL_BAC_NAME						:	string 	= 	"Tel_GameBaccarat";
		public static TEL_BAC_SIDE_NAME						:	string 	= 	"Tel_GameBaccarat_Side";
		public static ROBOT_BAC_NAME						:	string 	= 	"GameMachineBaccarat";
		public static BAC_MULTI_NAME						:	string 	= 	"GameBaccaratMulti";
		
		/** 游戏类型 **/
		public static LOBBY								:	number 	= 	0;							//大厅
		public static BAC									:	number 	= 	1;							//百家乐
		public static SIC									:	number 	= 	2;							//骰宝
		public static ROU									:	number 	= 	3;							//轮盘
		public static DTF									:	number 	= 	4;							//龙虎
		public static TEL_BAC								:	number 	=	5;							//電投百家
		public static TEL_LOBBY							:	number 	=	6;							//電投大廳
		public static MACHINE_BAC							:	number 	=	7;							//機械臂百家
		public static BAC_MIN								:	number		=	100;						//好路百家
		public static BAC_PANEL							:	number 	=	101;						//好路百家操作
		public static GAME								:	number 	= 	999;						//游戏
		
		/** 进桌方式 **/
		public static SINGEL								:	number 	= 	0;							//一般進桌不配位
		public static NORMAL_PAIR_TABLE_SEAT				:	number 	= 	1;							//一般進桌(配桌配位)
		public static PEEK_TABLEER						:	number 	= 	2;							//競瞇下注進桌
		public static PEEK_OTHER							:	number 	= 	3;							//競瞇旁觀下注進桌
		public static CHARTER_TABLE_OWNER					:	number 	= 	4;							//包桌桌主進桌
		public static CHARTER_TABLER						:	number 	= 	5;							//包桌進桌下注進桌
		public static CHARTER_OTHER						:	number 	= 	6;							//包桌旁觀下注進桌
		public static MULTIPLE							:	number 	= 	7;							//多桌進桌
		public static TELBET								:	number 	= 	8;							//電投進桌
		public static DEPUTY								:	number 	= 	9;							//槍手進桌
		
		/** 好路提示类型 **/
		public static GOOD_ROAD_TYPE_1					:	number 	= 	1;							//.長庄
		public static GOOD_ROAD_TYPE_2					:	number 	= 	2;							//.長閑
		public static GOOD_ROAD_TYPE_3					:	number 	= 	3;							//.拍拍黐
		public static GOOD_ROAD_TYPE_4					:	number 	= 	4;							//.大路單跳
		public static GOOD_ROAD_TYPE_5					:	number 	= 	5;							//.一廳兩房(庄)
		public static GOOD_ROAD_TYPE_6					:	number 	= 	6;							//.一廳兩房(閑)
		public static GOOD_ROAD_TYPE_7					:	number 	= 	7;							//.逢庄黐
		public static GOOD_ROAD_TYPE_8					:	number 	= 	8;							//.逢閑黐
		public static GOOD_ROAD_TYPE_9					:	number 	= 	9;							//.隔黐庄
		public static GOOD_ROAD_TYPE_10					:	number 	= 	10;							//.隔黐閑
		
		/**獨享*/ 
		public static SINGLE								:	number 	= 	0;
		/**密碼可進*/  
		public static PRIVATE								:	number 	= 	1;
		/**公開*/ 	
		public static PUBLIC								:	number 	= 	2;
		
		/**游戏操作*/
		public static BET									:	number		=	1;
		public static CANCEL_BET							:	number		=	2;
		public static REBET								:	number 	= 	3;
		public static EXIT_GAME							:	number		=	10;
		/**咪牌进度*/
		public static PEEK_PROCCESS						:	number		=	11;
		/**咪牌翻牌*/
		public static OPEN_PEEKCARD						:	number		=	12;
		/**桌主操作*/
		public static CHARTER_OPERATION					:	number		=	13;
		/**补全路纸**/
		public static COMPLEMENTED_ROADMAP				:	number = 40;						/// 补全路纸
		
		/**桌主操作类型*/
		public static OPERATION_CHANGE_DEALER				:	number 	= 	0;							// 更換荷官
		public static OPERATION_CHANGE_SHOE				:	number 	= 	1;							//	更換牌靴
		public static OPERATION_FLY_POKER					:	number 	= 	2;							// 飛牌
		public static OPERATION_START_BET					:	number 	= 	3;							// 開始下注
		public static OPERATION_DEAL_POKER				:	number 	= 	4;							// 開牌
	
		
		
/************************登入错误返回值************************************************/		
		public static ENTER_OK							:	number 	= 	0;
		public static ENTER_FAIL							:	number 	= 	1;
		public static ENTER_INVALID						:	number 	= 	2;
		public static ENTER_NO_AVAILABLE_SEAT				:	number 	= 	3;
		public static ENTER_TABLE_OWNER_EXIST				:	number 	= 	4;
		//public static BOSS_NOT_LOGIN					:	number 	= 	5;
		public static ENTER_JOIN_TB_TYPE_NOT_EXIST		:	number		= 	6;
		public static ENTER_JOIN_TB_DATA_INCORRECT		:	number 	= 	7;
		public static ENTER_BALANCE_NOT_ENOUGH			:	number 	= 	8;
		public static ENTER_JOIN_TB_PASSWORD_INVAILD		:	number 	= 	9;							// 進桌密碼不正確
		public static ENTER_OVER_PLAYERS_LIMIT			:	number 	= 	10;
		public static ENTER_TABLE_IS_PRIVATE				:	number 	= 	11;							// 賭桌獨享
		public static ENTER_CHARTER_TYPE_IS_NOT_CORRECT	:	number 	= 	12;							// 包桌狀態不對
		public static ENTER_TIMEOUT						:	number 	= 	13;							// 逾時
		public static ENTER_PROTOCOL_VER_MISMATCH			:	number 	= 	14;							// 通訊版本不對
		public static ENTER_TRY_ACCOUNT_PERMISSION_DENY	:	number	 	= 	15;							//試玩帳號 權限拒絕
		public static ENTER_PERMISSION_DENY				:	number	 	= 	16;							//權限不允许，信用账号 枪手
		public static ENTER_MASTER_EXIT					:	number 	= 	17;							//桌主已离开
		public static ENTER_NOT_FINISH					:	number 	= 	18;							//此局尚未结束
		public static ENTER_MAINTAIN						:	number 	= 	19;							//维护中
		public static ROAD_MAP_ERROR						:	number 	= 	20;							//路紙錯誤
		public static ENTER_SERVER_BUSY					:	number		=	21;							//服務器忙碌中,需重新登入
		public static ENTER_CLOSED						:	number		=	22;							//赌桌关闭
		public static ENTER_NOSETTLED						:	number		=	23;							//玩家帳未結清
		public static ENTER_MAINTAIN_ALL					:	number		=	24;							//全站维护
		public static ENTER_MAINTAIN_THEME				:	number		=	25;							//厅馆维护
		public static ENTER_MAINTAIN_TABLE				:	number		=	26;							//赌桌维护
		public static ENTER_MAINTAIN_AGENT				:	number		=	27;							//代理维护
		public static ENTER_DIFFERENT_IP					:	number		=	28;							//玩家IP不同
		public static ENTER_SEAT_FAIL						:	number		=	29;							//保留進桌失败
		public static ENTER_PERMISSION_30					:	number		=	30;							//不允許 進入 網投桌(信用帳戶 限制 )
		/************************登入错误返回END************************************************/		
		
		/**押注回復*/
		public static BET_ERROR							:	number 	= 	-1;							// 押注錯誤
		public static BET_ACCEPT 							:	number 	= 	0;							// 押注成功
		public static BET_NOT_ENOUGH_MONY 				:	number 	= 	1;							// 餘額不夠
		public static BET_OVER_SELF_LIMIT 				:	number 	= 	2;							//超過玩家自選限紅
		public static BET_UNDER_SELF_LIMIT				:	number 	= 	3;							//低於玩家自選限紅
		public static BET_OVER_TABLE_LIMIT				:	number 	= 	4;							//超過賭桌限紅  (赌桌总投注额)
		public static BET_UNDER_TABLE_LIMIT				:	number 	= 	5;							//低於賭桌限紅
		public static BET_LIMIT_NOT_FOUND					:	number 	= 	6;							// 找不到押注上下限模式
		public static BET_POSITION_NOT_FOUND				:	number 	= 	7;							// 找不到押注位置
		public static BET_POSITION_DISABLE				:	number		=	8;							// 该位置不允许下注
		public static BET_TIME_OUT				:	number 	= 	9;							// 押注逾時
		public static BET_OFF_TIME				:	number		=	10;							// 非押注時間不允許下注
		
		
		/**下注限額判斷*/
		public static BETLIMIT_UNDER						:	number 	= 	2;							//下注額度低於最小額度
		public static BETLIMIT_OVER						:	number 	= 	3;							//此押注區已達押注上限
		
		/**老闆給小費*/
		public static TEL_BOSS_GIVE_CHIPS_SUCCESS			:	number 	= 	0;							//老闆給小費成功
		public static TEL_BOSS_GIVE_CHIPS_FAILED			:	number 	= 	1;							//老闆給小費失敗
		
		public static CHIP_LIST								:	number[]	= 	[10,50,100,300,500,1000,3000,5000,10000,30000,50000,100000,300000,500000];
		/** 缓动速度 **/
		public static CHIP_SPEED							:	number	=	0.8;
		public static COUNTDOWN_SPEED						:	number	=	0.3;
		public static TWEEN_SPEED							:	number	=	0.35;
		public static Transition_TableInfo				:	string	=   "Transition_TableInfo";
		public static Transition_Route					:	string	=   "Transition_Route";
		public static Transition_CountDown				:	string	=   "Transition_CountDown";
		public static Transition_GoodRoad					:	string	=	"Transition_GoodRoad";
		
		public constructor() {
		}
	}
}