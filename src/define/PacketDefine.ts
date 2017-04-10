module define {
	export class PacketDefine {
		//client -> server
		/**大廳登入*/
		public static LOGIN_IN					:	number 	= 	0x01;
		/**登出*/
		public static C_LOGIN_OUT					:	number 	= 	0x03; 
		/**進桌(登入賭桌)*/
		public static ENTER_TABLE					:	number 	= 	0x00;
		/**登出賭桌*/
		public static C_EXIT_TABLE				:	number 	= 	0x07; 
		/**押注資訊(押注要求)*/
		public static C_BET_INFO					:	number 	= 	0x0B;	
		/**自訂籌碼*/
		public static C_SET_CHIP					:	number 	= 	0x15;	
		/** 厅馆资料管理 **/
		public static C_Lobby_Theme_Subscribe		:	number	=	0x1F;			//订阅厅别 or 取消订阅
		public static S_Lobby_Theme_Subscribe		:	number	=	0x20;			//订阅回复
		/** 赌桌路纸修改 **/
		public static S_Lobby_Update_Table_Road	:	number	=	0x21;
		public static S_Game_Update_Table_Road	:	number	=	0x18;
		
		/** 取得多桌入口资料 **/
		public static C_MultiTable_Entry			:	number	=	0x1D;
		public static S_MultiTable_Entry			:	number	=	0x1E;
		
		/**切換押注模式*/
		public static CHANGE_BET_MODE				:	number 	= 	0x13;	
		/**遊戲登入確認封包*/
		public static C_ENTER_TABLE_OK			:	number 	= 	0x14;
		/**取消押注*/
		public static CANCEL_BET					:	number 	= 	0x0C;	
		/** 请求大厅信息 **/
		public static C_LOBBY_INFO				:	number	=	0x1B;
		/**大廳登入確認封包*/
		public static C_LOGIN_LOBBY_OK			:	number	=	0x19;
		//百家樂//
		/**百家樂揭開牌面*/
		public static C_PEEK_OPEN_CARD			:	number 	=	0x1E;
		/**咪牌進度*/
		public static PEEK_PROGRESS				:	number 	= 	0x1F;
		
		
		//槍手 -> Client -> Server
		/**老闆要求配槍手*/
		public static C_BOSS_DEPUTY_REQUEST		:	number 	= 	0x0D;		
		/**老闆取消配槍手*/
		public static  C_BOSS_CANCEL_DEPUTY		:	number 	= 	0x0F;
		/**咪牌*/
		public static PEEK						:	number 	= 	0x40;
		/**玩家設定座位號碼*/
		public static C_SET_TABLE_SEAT			:	number 	= 	0x04;
		/**包桌桌主操作要求*/
		public static C_RESERVED_TABLE_OPERATION	:	number 	= 	0x1A;
		/**玩家 多桌要求*/
		public static C_MULTI_TABLE_REQ			:	number 	= 	0x1C;
		public static C_MULTI_TABLE_UNSUBSCRIBE 	: 	number 	= 	0x1D;
		
		
		
		/** 游戏賭桌回補資料 **/
		public static C_Game_Update_Table_Data	:	number	=	0x21;
		
		
		//server -> client 
		/**公告訊息*/
		public static  S_ANNOUNCELIST				:	number 	= 	0x00; 
		/**大廳登入*/
		public static S_LOGIN_IN					:	number 	= 	0x02;	
		/**大廳登出*/
		public static S_LOGIN_OUT				:	number 	= 	0x04;	
		/**通知幣別改變*/
		public static S_CHANGE_CURRENCY			:	number 	= 	0x05   
		/**更新賭桌資訊*/
		public static S_UPDATE_TABLE_INFO		:	number 	= 	0x06; 
		/**通知荷官資訊*/
		public static S_UPDATE_DEALER_INFO		:	number 	= 	0x07; 
		/**更新跑馬燈*/
		public static S_UPDATE_MARQUEE			:	number 	= 	0x08;		
		/**清除跑馬燈*/
		public static S_CLEAR_MARQUEE			:	number 	= 	0x09;		
		/**大廳 通知玩家可進桌的賭桌狀態**/
		public static S_CAN_ENTER_TABLE_STATUS	:	number	=	0x1A;			
		/** 收到大厅信息 **/
		public static S_LOBBY_INFO				:	number	=	0x1C;
		/**取的最熱門的三個賭桌*/
		public static S_GET_HOT_TABLE			:	number 	= 	0x0B;
		/**更新大廳資訊*/
		public static S_UPDATE_LOBBY_INFO			:	number 	= 	0x14;
		
		//槍手 -> Server -> Client
		/**回復槍手認證要求*/
		public static S_DEPUTY_AUTH				:	number 	= 	0x0C;
		/**Server回應槍手加入賭桌訊息*/
		public static S_DEPUTY_ENTER_TABLE		:	number 	= 	0x02;
		/**Server 玩家進桌/離桌通知*/
		public static S_TABLE_SEAT_UPDATE			:	number 	= 	0x03;
		
		/**回復老闆要求配槍手*/
		public static S_BOSS_DEPUTY_REQUEST		:	number 	= 	0xE;	
		/**回復老闆取消配槍手*/
		public static  S_BOSS_CANCEL_DEPUTY		:	number 	= 	0x10;		
		/**槍手老闆轉桌要求*/
		public static S_BOSS_TRANS_TABLE			:	number 	= 	0x11;	
		/**槍手登入或登出 通知老闆*/
		public static S_DEPUTY_LOGIN				:	number 	= 	0x12;
		/**回復老闆給小費要求*/
		public static S_GIVE_TIPS					:	number 	= 	0x12;

		/**回復切換押注模式*/	   
		public static  S_CHANGE_BET_MODE			:	number 	= 	0x14;	   
		/**通知此靴為最後一局*/
		public static S_LAST_GAME				:	number 	= 	0x39;		
		/**Server通知例外錯誤給玩家*/	
		public static S_ERROR_MSG				:	number 	= 	0x15;		
		/**Server通知賭桌暫停*/	
		public static S_TABLE_PAUSE				:	number 	= 	0x16;		
		/**Server通知玩家閒置資訊*/	
		public static S_PLAYER_IDLE_INFO			:	number 	= 	0x17;	
		/**Server進入賭桌*/
		public static S_ENTER_TABLE				:	number 	= 	0x01;
		/**Server回覆押注資訊跟發牌資訊*/
		public static S_BET_INFO_AND_DEAL_INFO	:	number 	= 	0x06;
		/**Server回復及時彩池資訊*/
		public static S_REAL_TIME_BET_INFO		:	number 	= 	0x0A;
		/**登出賭桌要求*/
		public static S_EXIT_TABLE				:	number 	= 	0x08;
		/**賭桌狀態通知*/
		public static S_TABLE_STATUS				:	number 	= 	0x09;
		/**Server回復押注要求*/
		public static S_BET_INFO					:	number 	= 	0x0D;
		/**Server通知client發牌資訊*/
		public static S_DEAL_INFO					:	number 	= 	0x0F;
		/**Server通知 輸贏結果*/
		public static S_WIN_INFO					:	number 	= 	0x10;
		/**Server通知 废局*/
		public static S_FAIL_GAME					:	number 	= 	0x20;
	
		/**Server回復自訂籌碼*/
		public static S_SET_CHIP					:	number 	= 	0x16;
		/**好路通知*/
		public static S_GOOD_ROAD					:	number 	= 	0x13;
		/**玩家設定座位號碼*/
		public static S_SET_TABLE_SEAT			:	number 	= 	0x05;
		/**更新壓住資訊*/
		public static S_UPDATE_BET_INFO			:	number 	= 	0x0E;
		/**回復包桌設定*/
		public static S_RESERVED_TABLE			:	number 	= 	0x19;
		/**回復包桌桌主操作要求*/
		public static S_RESERVED_TABLE_OPERATION	:	number 	= 	0x1B;
		/**回復玩家設定多桌觀看頁碼*/
		public static S_MUTLI_TABLE_SET_PAGE		:	number 	= 	0x1D;
		/**回復咪牌進度*/ //現在瞇牌Type改雙向的
		//public static S_PEEK_PROGRESS			:	number 	= 	0x20;
		/**出碼*/
		public static S_GET_CHIPS					:	number 	= 	0x18;
		
		/** 游戏賭桌回補資料 **/
		public static S_Game_Update_Table_Data	:	number	=	0x22;
			
		/**斷線*/
		public static DISCONNECT					:	number 	= 	0x88;
		/**以連線*/
		public static CONNECTTING					:	number 	= 	0x89;
		/**IO錯誤*/
		public static IO_ERROR					:	number 	= 	0x8A;
		/**安全性錯誤*/
		public static SEC_ERROR					:	number 	= 	0x8B;
		
		/**收到web資料*/
		public static R_WEB_DATA					:	number 	= 	0x7F;
		

		
		/**正常回應*/
		public static ACK							:	number 	= 	0xFC;
		/**錯誤回應*/
		public static N_ACK						:	number 	= 	0xFD;
		

		/**接*/
		public static RECEIVE						:	string 	= 	"RECEIVE";
		/**送*/
		public static SEND						:	string 	= 	"SEND";
		
		/**連線類型:大廳*/
		public static LOBBY						:	number 	= 	0;
		/**連線類型:遊戲*/
		public static GAME						:	number 	= 	999;
		public static GAME_BAC					:	number		=	991;
		public static GAME_DTF					:	number		=	992;
		public static GAME_SIC					:	number		=	993;
		public static GAME_ROU					:	number		=	994;
		public static GAME_BAC_GOOD				:	number		=	1001;
		
		
		/**連線類型:多桌遊戲*/
		public static MULTI						:	number 	= 	1000;
		/**連線類型:印表機*/
		public static PRINTER						:	number		=	2;
		/**連線類型:轉桌*/
		public static TRANSTABLE					:	number		=	3;

		
		
		/**發送列印瞇牌*/
		public static C_PRINT_PEEK_POKER			:	number	=	0x00;			
		/**接收列印瞇牌*/
		public static S_PRINT_PEEK_POKER			:	number	=	0x01;	
		/**發送印表機斷線*/
		public static C_PRINT_DISCONNECT			:	number	=	0x02;			
		/**接收列印瞇牌*/
		public static S_PRINT_DISCONNECT			:	number	=	0x03;	
		
		
		
		//***************新增的協議*************************//
		/**雙向封包*/
		public static C_Heart						:	number	=	0xFE;	//
		public static S_Heart						:	number	=	0xFF;	//心跳回复
		
		/** 所有维护类型通知 **/
		public static S_Maintenance				:	number	=	0x24;
	
		
		
		public constructor() {
		}
	}
}