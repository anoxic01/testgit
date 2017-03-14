module define {
	export class PacketDefine {
		//client -> server
		/**大廳登入*/
		public static const LOGIN_IN					:	uint 	= 	0x01;
		/**登出*/
		public static const C_LOGIN_OUT					:	uint 	= 	0x03; 
		/**進桌(登入賭桌)*/
		public static const ENTER_TABLE					:	uint 	= 	0x00;
		/**登出賭桌*/
		public static const C_EXIT_TABLE				:	uint 	= 	0x07; 
		/**押注資訊(押注要求)*/
		public static const C_BET_INFO					:	uint 	= 	0x0B;	
		/**自訂籌碼*/
		public static const C_SET_CHIP					:	uint 	= 	0x15;	
		/** 厅馆资料管理 **/
		public static const C_Lobby_Theme_Subscribe		:	uint	=	0x1F;			//订阅厅别 or 取消订阅
		public static const S_Lobby_Theme_Subscribe		:	uint	=	0x20;			//订阅回复
		/** 赌桌路纸修改 **/
		public static const S_Lobby_Update_Table_Road	:	uint	=	0x21;
		public static const S_Game_Update_Table_Road	:	uint	=	0x18;
		
		/** 取得多桌入口资料 **/
		public static const C_MultiTable_Entry			:	uint	=	0x1D;
		public static const S_MultiTable_Entry			:	uint	=	0x1E;
		
		/**切換押注模式*/
		public static const CHANGE_BET_MODE				:	uint 	= 	0x13;	
		/**遊戲登入確認封包*/
		public static const C_ENTER_TABLE_OK			:	uint 	= 	0x14;
		/**取消押注*/
		public static const CANCEL_BET					:	uint 	= 	0x0C;	
		/** 请求大厅信息 **/
		public static const C_LOBBY_INFO				:	uint	=	0x1B;
		/**大廳登入確認封包*/
		public static const C_LOGIN_LOBBY_OK			:	uint	=	0x19;
		//百家樂//
		/**百家樂揭開牌面*/
		public static const C_PEEK_OPEN_CARD			:	uint 	=	0x1E;
		/**咪牌進度*/
		public static const PEEK_PROGRESS				:	uint 	= 	0x1F;
		
		
		//槍手 -> Client -> Server
		/**老闆要求配槍手*/
		public static const	 C_BOSS_DEPUTY_REQUEST		:	uint 	= 	0x0D;		
		/**老闆取消配槍手*/
		public static const  C_BOSS_CANCEL_DEPUTY		:	uint 	= 	0x0F;
		/**咪牌*/
		public static const PEEK						:	uint 	= 	0x40;
		/**玩家設定座位號碼*/
		public static const C_SET_TABLE_SEAT			:	uint 	= 	0x04;
		/**包桌桌主操作要求*/
		public static const C_RESERVED_TABLE_OPERATION	:	uint 	= 	0x1A;
		/**玩家 多桌要求*/
		public static const C_MULTI_TABLE_REQ			:	uint 	= 	0x1C;
		public static const C_MULTI_TABLE_UNSUBSCRIBE 	: 	uint 	= 	0x1D;
		
		
		
		/** 游戏賭桌回補資料 **/
		public static const C_Game_Update_Table_Data	:	uint	=	0x21;
		
		
		//server -> client 
		/**公告訊息*/
		public static const  S_ANNOUNCELIST				:	uint 	= 	0x00; 
		/**大廳登入*/
		public static const	 S_LOGIN_IN					:	uint 	= 	0x02;	
		/**大廳登出*/
		public static const	 S_LOGIN_OUT				:	uint 	= 	0x04;	
		/**通知幣別改變*/
		public static const	 S_CHANGE_CURRENCY			:	uint 	= 	0x05   
		/**更新賭桌資訊*/
		public static const	 S_UPDATE_TABLE_INFO		:	uint 	= 	0x06; 
		/**通知荷官資訊*/
		public static const	 S_UPDATE_DEALER_INFO		:	uint 	= 	0x07; 
		/**更新跑馬燈*/
		public static const	 S_UPDATE_MARQUEE			:	uint 	= 	0x08;		
		/**清除跑馬燈*/
		public static const	 S_CLEAR_MARQUEE			:	uint 	= 	0x09;		
		/**大廳 通知玩家可進桌的賭桌狀態**/
		public static const S_CAN_ENTER_TABLE_STATUS	:	uint	=	0x1A;			
		/** 收到大厅信息 **/
		public static const S_LOBBY_INFO				:	uint	=	0x1C;
		/**取的最熱門的三個賭桌*/
		public static const	 S_GET_HOT_TABLE			:	uint 	= 	0x0B;
		/**更新大廳資訊*/
		public static const S_UPDATE_LOBBY_INFO			:	uint 	= 	0x14;
		
		//槍手 -> Server -> Client
		/**回復槍手認證要求*/
		public static const S_DEPUTY_AUTH				:	uint 	= 	0x0C;
		/**Server回應槍手加入賭桌訊息*/
		public static const S_DEPUTY_ENTER_TABLE		:	uint 	= 	0x02;
		/**Server 玩家進桌/離桌通知*/
		public static const S_TABLE_SEAT_UPDATE			:	uint 	= 	0x03;
		
		/**回復老闆要求配槍手*/
		public static const	 S_BOSS_DEPUTY_REQUEST		:	uint 	= 	0xE;	
		/**回復老闆取消配槍手*/
		public static const  S_BOSS_CANCEL_DEPUTY		:	uint 	= 	0x10;		
		/**槍手老闆轉桌要求*/
		public static const	 S_BOSS_TRANS_TABLE			:	uint 	= 	0x11;	
		/**槍手登入或登出 通知老闆*/
		public static const S_DEPUTY_LOGIN				:	uint 	= 	0x12;
		/**回復老闆給小費要求*/
		public static const S_GIVE_TIPS					:	uint 	= 	0x12;

		/**回復切換押注模式*/	   
		public static const  S_CHANGE_BET_MODE			:	uint 	= 	0x14;	   
		/**通知此靴為最後一局*/
		public static const	 S_LAST_GAME				:	uint 	= 	0x39;		
		/**Server通知例外錯誤給玩家*/	
		public static const	 S_ERROR_MSG				:	uint 	= 	0x15;		
		/**Server通知賭桌暫停*/	
		public static const	 S_TABLE_PAUSE				:	uint 	= 	0x16;		
		/**Server通知玩家閒置資訊*/	
		public static const	 S_PLAYER_IDLE_INFO			:	uint 	= 	0x17;	
		/**Server進入賭桌*/
		public static const S_ENTER_TABLE				:	uint 	= 	0x01;
		/**Server回覆押注資訊跟發牌資訊*/
		public static const S_BET_INFO_AND_DEAL_INFO	:	uint 	= 	0x06;
		/**Server回復及時彩池資訊*/
		public static const S_REAL_TIME_BET_INFO		:	uint 	= 	0x0A;
		/**登出賭桌要求*/
		public static const S_EXIT_TABLE				:	uint 	= 	0x08;
		/**賭桌狀態通知*/
		public static const S_TABLE_STATUS				:	uint 	= 	0x09;
		/**Server回復押注要求*/
		public static const S_BET_INFO					:	uint 	= 	0x0D;
		/**Server通知client發牌資訊*/
		public static const S_DEAL_INFO					:	uint 	= 	0x0F;
		/**Server通知 輸贏結果*/
		public static const S_WIN_INFO					:	uint 	= 	0x10;
		/**Server通知 废局*/
		public static const S_FAIL_GAME					:	uint 	= 	0x20;
	
		/**Server回復自訂籌碼*/
		public static const S_SET_CHIP					:	uint 	= 	0x16;
		/**好路通知*/
		public static const S_GOOD_ROAD					:	uint 	= 	0x13;
		/**玩家設定座位號碼*/
		public static const S_SET_TABLE_SEAT			:	uint 	= 	0x05;
		/**更新壓住資訊*/
		public static const S_UPDATE_BET_INFO			:	uint 	= 	0x0E;
		/**回復包桌設定*/
		public static const S_RESERVED_TABLE			:	uint 	= 	0x19;
		/**回復包桌桌主操作要求*/
		public static const S_RESERVED_TABLE_OPERATION	:	uint 	= 	0x1B;
		/**回復玩家設定多桌觀看頁碼*/
		public static const S_MUTLI_TABLE_SET_PAGE		:	uint 	= 	0x1D;
		/**回復咪牌進度*/ //現在瞇牌Type改雙向的
		//public static const S_PEEK_PROGRESS			:	uint 	= 	0x20;
		/**出碼*/
		public static const S_GET_CHIPS					:	uint 	= 	0x18;
		
		/** 游戏賭桌回補資料 **/
		public static const S_Game_Update_Table_Data	:	uint	=	0x22;
			
		/**斷線*/
		public static const DISCONNECT					:	uint 	= 	0x88;
		/**以連線*/
		public static const CONNECTTING					:	uint 	= 	0x89;
		/**IO錯誤*/
		public static const IO_ERROR					:	uint 	= 	0x8A;
		/**安全性錯誤*/
		public static const SEC_ERROR					:	uint 	= 	0x8B;
		
		/**收到web資料*/
		public static const R_WEB_DATA					:	uint 	= 	0x7F;
		

		
		/**正常回應*/
		public static const ACK							:	uint 	= 	0xFC;
		/**錯誤回應*/
		public static const N_ACK						:	uint 	= 	0xFD;
		

		/**接*/
		public static const RECEIVE						:	String 	= 	"RECEIVE";
		/**送*/
		public static const SEND						:	String 	= 	"SEND";
		
		/**連線類型:大廳*/
		public static const LOBBY						:	int 	= 	0;
		/**連線類型:遊戲*/
		public static const GAME						:	int 	= 	999;
		public static const GAME_BAC					:	int		=	991;
		public static const GAME_DTF					:	int		=	992;
		public static const GAME_SIC					:	int		=	993;
		public static const GAME_ROU					:	int		=	994;
		public static const GAME_BAC_GOOD				:	int		=	1001;
		
		
		/**連線類型:多桌遊戲*/
		public static const MULTI						:	int 	= 	1000;
		/**連線類型:印表機*/
		public static const PRINTER						:	int		=	2;
		/**連線類型:轉桌*/
		public static const TRANSTABLE					:	int		=	3;

		
		
		/**發送列印瞇牌*/
		public static const C_PRINT_PEEK_POKER			:	uint	=	0x00;			
		/**接收列印瞇牌*/
		public static const S_PRINT_PEEK_POKER			:	uint	=	0x01;	
		/**發送印表機斷線*/
		public static const C_PRINT_DISCONNECT			:	uint	=	0x02;			
		/**接收列印瞇牌*/
		public static const S_PRINT_DISCONNECT			:	uint	=	0x03;	
		
		
		
		//***************新增的協議*************************//
		/**雙向封包*/
		public static const C_Heart						:	uint	=	0xFE;	//
		public static const S_Heart						:	uint	=	0xFF;	//心跳回复
		
		/** 所有维护类型通知 **/
		public static const S_Maintenance				:	uint	=	0x24;
	
		
		
		public constructor() {
		}
	}
}