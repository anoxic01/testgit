module lobby.struct {
	export class Struct_Table {
        /** 以下变量与服务端相同，按字母顺序排列 **/
		public BetLimitID 				:	number;						//限红序号
		public BetLowerLimit			:	number;						//限红下限
		public BetTimeLimit				:	number;						//押注计时
		public BetUpperLimit			:	number;						//限红上限
		
		public CharterSettingInfo		:	Struct_CharterSetting;		//包桌设置
		
		private m_iCountDownTime		:	number;						//倒數時間 - 只有押注中/結算中有倒數時間
		
		public DealerLoginID 			:	string	=	"";				//荷官序号
		public DealerName				:	string	=	"";				//荷官名称
		public DealerPageConnID			:	number;						//荷官頁面連線 ID
		public DealerPhotoUrl			:	string	=	"";				//荷官相片
		
		public EnterTbBetLimit			:	number;						//進桌押注限制
		
		public GameID					:	number;						//游戏序号
		public GameLogUrl				:	string	=	"";				//游戏输出
		public GameNo					:	number;						//游戏局数(某一靴的局数，可能会重复)
		public GameRecordNo				:	number;						//游戏局数(不会重复出现)
		public GameRuleUrl				:	string	=	"";				//游戏规则
		public GameStatus				:	string	=	"";				//游戏状态
		
		private m_IsChangingShoe		:	boolean;					//是否换靴中
		public IsNeedPairTableSeat		:	boolean;					//是否配桌
		public IsPaused 				:	boolean;					//暂停状态	为true时大厅的桌子要显示维护中
		public IsOffline				:	boolean;					//是否离线	(赌桌异常导致的关闭)
		public JoinTbStatus				:	string	=	"";				//进桌状态	進桌狀態 格式: 0000000
		public LastRoadMap				:	string	=	"";				//最新数据	(单个路纸)
		
	
		public ManagerLoginID 			:	string	=	"";				//经理账号
		public ManagerName				:	string	=	"";				//经理名称
		public ManagerPhotoUrl 			:	string	=	"";				//经理相片
		
		public OnlineCustServiceUrl		:	string	=	"";				//线上客服
		
		public OnlinePlayers			:	number;						//在线人数
		
		public OtherBetLimitID			:	number;						//旁注限红(不使用)
		
		public PeekTimeLimit1			:	number;						//倒数时间	第一階段瞇牌
		public PeekTimeLimit2			:	number;						//倒数时间	第二階段瞇牌
		
		public Ret						:	boolean;					//结果
		
		public RoadMaps 				:	string	=	"";				//路单描述
		
		public ServerIP 				:	string	=	"";				//连接地址
		public ServerPort				:	number;						//连接端口
		
		public SettleTimeLimit			:	number;						//结算计时
		
		public ShoeNo					:	number;						//靴号?
		
		public StaticsInfo				:	Struct_StaticsInfo;				//即时彩池
		
		public StreamAppName			:	string	=	"";				//应用名称
		public StreamName				:	string	=	"";				//视讯名称
		public StreamUrl				:	string	=	"";				//视讯地址
		
		public TableID					:	number;						//桌子序号
		public TableName_EN				:	string	=	"";				//桌子名称
		public TableName_TW 			:	string	=	"";				//桌子名称
		public TableName_CN 			:	string	=	"";				//桌子名称
		public TableStatus				:	number;						//启用状态
		
	
		public DefCDNID					:	number;						//预设视频
		
		public IsCurrFailGame			:	boolean;					//废局状态
		
		
		/**客户端 
		 // 單桌進桌
		 public byte SINGEL = 0;
		 // 競瞇下注進桌
		 public byte PEEK_TABLEER = 1;
		 // 競瞇旁觀下注進桌
		 public byte PEEK_OTHER = 2;
		 // 包桌桌主進桌
		 public byte CHARTER_TABLE_OWNER = 3;
		 // 包桌進桌下注進桌
		 public byte CHARTER_TABLER = 4;
		 // 包桌旁觀下注進桌
		 public byte CHARTER_OTHER = 5;
		 // 多桌進桌
		 public byte MULTIPLE = 6;
		 */
		public joinTableType			:	number		=	lobby.define.JoinTableType.NORMAL_PAIR_TABLE_SEAT;
		public joinTbPwd				:	string	=	null;
		
		/**
		 * 賭桌種類
		 *  // 一般
		 publicnumberNORMAL = 1;
		 // 急速
		 publicnumberSPEEDY = 2;
		 // 競瞇
		 publicnumberPEEK = 3;
		 // 機械手臂
		 publicnumberROBOT = 4;
		 // 電投
		 publicnumberTELBET = 5;
		 // 包桌
		 publicnumberCHARTER = 6;
		 */
		public TableType				:	number;						//桌子类型
        
        public ThemeID					:	number;						//厅馆序号
		public ThemeName				:	string	=	"";				//厅馆名称
		
		public VideoDelayTime			:	number;						//延迟时间
		
		public IsMaintaining			:	boolean;					//维护状态
		
		//***********************************************************************************
		//***	客户端		****
		
		private m_table					:	lobby.view.Table;						//桌子引用
		private m_quickTable			:	lobby.view.QuickTable;					//桌子引用
		public BetLimitID_Panel			:	number	=	-1;					//限红序号
		
		public constructor() {
		}
	}
}