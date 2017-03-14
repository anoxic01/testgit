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
		public joinTableType			:	number		=	define.JoinTableType.NORMAL_PAIR_TABLE_SEAT;
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
		
		private m_table					:	view.table.Table;						//桌子引用
		private m_quickTable			:	view.quick.QuickTable;					//桌子引用
		public BetLimitID_Panel			:	number	=	-1;					//限红序号
		
		public constructor( oTable:Object=null ) {
			if (oTable==null) return;
			
			this.BetLimitID 				= 	oTable["BetLimitID"];
			this.BetLowerLimit 			= 	oTable["BetLowerLimit"];
			this.BetTimeLimit 			= 	oTable["BetTimeLimit"];
			this.BetUpperLimit 			= 	oTable["BetUpperLimit"];
			if(this.CharterSettingInfo==null){
				this.CharterSettingInfo = new struct.Struct_CharterSetting();
			}
			this.CharterSettingInfo.update(oTable["CharterSettingInfo"]);
		//	this.CharterSettingInfo		=	oTable["CharterSettingInfo"];
			this.CountDownTime			= 	oTable["CountDownTime"];
			this.DealerLoginID 			= 	oTable["DealerLoginID"];
			this.DealerName 				= 	oTable["DealerName"];
			this.DealerPageConnID		=	oTable["DealerPageConnID"];
			this.DealerPhotoUrl 			= 	oTable["DealerPhotoUrl"];
			this.GameID 					= 	oTable["GameID"];
			this.GameLogUrl 				= 	oTable["GameLogUrl"];
			this.GameNo 					= 	oTable["GameNo"];
			this.GameRecordNo			= 	oTable["GameRecordNo"];
			this.GameRuleUrl 			= 	oTable["GameRuleUrl"];
			this.GameStatus				= 	oTable["GameStatus"];
			this.IsChangingShoe			=	oTable["IsChangingShoe"];
			this.IsNeedPairTableSeat		=	oTable["IsNeedPairTableSeat"];
			this.IsPaused 				= 	oTable["IsPaused"];
			this.JoinTbStatus 			= 	oTable["JoinTbStatus"];
			this.LastRoadMap				=	oTable["LastRoadMap"];
			this.ManagerLoginID			=	oTable["ManagerLoginID"];
			this.ManagerName				=	oTable["ManagerName"];
			this.ManagerPhotoUrl			=	oTable["ManagerPhotoUrl"];
			this.OnlineCustServiceUrl 	= 	oTable["OnlineCustServiceUrl"];
			this.OnlinePlayers 			= 	oTable["OnlinePlayers"];
			this.OtherBetLimitID			=	oTable["OtherBetLimitID"];
			this.PeekTimeLimit1 			= 	oTable["PeekTimeLimit1"];
			this.PeekTimeLimit2 			= 	oTable["PeekTimeLimit2"];
			this.Ret 					= 	oTable["Ret"];
			this.RoadMaps 				= 	oTable["RoadMaps"];
			this.ServerIP 				= 	oTable["ServerIP"];
			this.ServerPort 				= 	oTable["ServerPort"];
			this.SettleTimeLimit 		= 	oTable["SettleTimeLimit"];
			this.ShoeNo 					= 	oTable["ShoeNo"];
			this.DefCDNID				=	oTable["DefCDNID"];
			this.IsCurrFailGame			=	oTable["IsCurrFailGame"];
			
			this.createStaticInfo(this.GameID);
			
			if( oTable["StaticsInfo"] != null ){
				var byte:egret.ByteArray = new egret.ByteArray();
				byte.writeObject(oTable["StaticsInfo"]);
				byte.position = 0;
				var obj:Object = byte.readObject();
				for (var param:string in obj) 
				{
					this.StaticsInfo[param] = oTable["StaticsInfo"][param];
				}
			}
			
			this.StreamAppName 			= 	oTable["StreamAppName"];
			this.StreamName 				= 	oTable["StreamName"];
			this.StreamUrl 				= 	oTable["StreamUrl"];
			this.TableID 				= 	oTable["TableID"];
			this.TableName_EN 			= 	oTable["TableName_EN"];
			this.TableName_TW 			= 	oTable["TableName_TW"];
			this.TableName_CN 			= 	oTable["TableName_CN"];
			this.TableStatus 			= 	oTable["TableStatus"];
			this.TableType 				= 	oTable["TableType"];
			this.ThemeID 				= 	oTable["ThemeID"];
			this.ThemeName 				= 	oTable["ThemeName"];
			this.VideoDelayTime			=	oTable["VideoDelayTime"];
			this.IsMaintaining 			=	oTable["IsMaintaining"];
			
			//			IsPeekTable 			= 	oTable["IsPeekTable"];
			//			IsSpeedyTable			= 	oTable["IsSpeedyTable"];
			//			IsRobotTable 			= 	oTable["IsRobotTable"];
			//			IsTelBetTable 			= 	oTable["IsTelBetTable"];
			//			IsCharter 				= 	oTable["IsCharter"];
			//			IsLastRound 			= 	oTable["IsLastRound"];
		}

		
		get IsChangingShoe():boolean
		{
			return this.m_IsChangingShoe;
		}

		set IsChangingShoe(value:boolean)
		{
			this.m_IsChangingShoe = value;
		}

		get CountDownTime():number
		{
			return this.m_iCountDownTime;
		}

		set CountDownTime(value:number)
		{
			this.m_iCountDownTime = value;
//			if(TableID==45){
//				trace("45桌更新倒计时：",CountDownTime);
//			}
		}
		
		public getRoadMaps():string 
		{
			var str:string = (this.RoadMaps!=null&&this.RoadMaps!="")?this.RoadMaps:"";
			str+=(this.LastRoadMap!=null&&this.LastRoadMap!="")?(str==""?this.LastRoadMap:("."+this.LastRoadMap)):"";
			return str;
		}
		
		

		public update(oTable:Object=null):void{
			if(oTable==null){
				return;
			}
			this.updateStaticsInfo(oTable["StaticsInfo"]);
			
			if(this.CharterSettingInfo==null){
				this.CharterSettingInfo = new struct.Struct_CharterSetting();
			}
			this.CharterSettingInfo.update(oTable["CharterSettingInfo"]);
			
			this.DealerLoginID 			= 	oTable["DealerLoginID"];
			this.DealerName 				= 	oTable["DealerName"];
			this.DealerPageConnID		=	oTable["DealerPageConnID"];
			
			this.DealerPhotoUrl 			= 	oTable["DealerPhotoUrl"];			
			this.GameID					=	oTable["GameID"];
			this.CountDownTime			= 	oTable["CountDownTime"];
			this.GameNo 					= 	oTable["GameNo"];
			this.GameRecordNo			= 	oTable["GameRecordNo"];
			this.GameStatus				= 	oTable["GameStatus"];
			this.TableType 				= 	oTable["TableType"];
			this.IsChangingShoe			=	oTable["IsChangingShoe"];
			this.IsNeedPairTableSeat		=	oTable["IsNeedPairTableSeat"];
			this.IsPaused 				= 	oTable["IsPaused"];
			this.JoinTbStatus 			= 	oTable["JoinTbStatus"];
			this.IsMaintaining			= 	oTable["IsMaintaining"];
			this.IsOffline				=	oTable["IsOffline"];
			this.IsCurrFailGame			=	oTable["IsCurrFailGame"];
			
			if(oTable["GameStatus"]==define.GameStatus.SETTLED){
				this.setParam("LastRoadMap",oTable);
			}
			
			this.OnlinePlayers 			= 	oTable["OnlinePlayers"];
			
			this.Ret 					= 	oTable["Ret"];
			if(this.TableID == 37){
				var a :string = oTable["DealerPhotoUrl"];
				console.log("update table struct：>>",oTable["RoadMaps"],"length:>>",oTable["RoadMaps"].length);
			}
			if(this.GameNo==0){
				this.RoadMaps = "";
			}else if(oTable["RoadMaps"]!="" && oTable["RoadMaps"]!=null){
				this.RoadMaps 				= 	oTable["RoadMaps"];
			}
			
			this.ShoeNo 					= 	oTable["ShoeNo"];
						
			
			if(this.m_table){
				this.m_table.update();
			}
			
			if(this.m_quickTable){
				this.m_quickTable.update();
			}
			
		}
		public updateStaticsInfo(_staticsInfo:Object):void{
			
			if(_staticsInfo==null){
				return;
			}
			this.createStaticInfo(_staticsInfo.GameID);
			
			if( _staticsInfo){
				switch(_staticsInfo.GameID){
					case define.GameDefine.BAC:
						(this.StaticsInfo as StaticsInfoBaccarat).updateStatic(_staticsInfo);
						break;
					
					case define.GameDefine.SIC:
						(this.StaticsInfo as StaticsInfoSic).updateStatic(_staticsInfo);
						break;
					
					case define.GameDefine.ROU:
						(this.StaticsInfo as StaticsInfoRoulette).updateStatic(_staticsInfo);
						break;
					
					case define.GameDefine.DTF:
						(this.StaticsInfo as StaticsInfoDTF).updateStatic(_staticsInfo);
						break;
				}
			}
			
			if(this.m_table){
				this.m_table.updateStaticsInfo();
			}
			if(this.m_quickTable){
				this.m_quickTable.updateStaticsInfo();
			}
		}
		
		
		public setTable(_table:view.table.Table):void{
			this.m_table = _table;
//			trace("table_struct_tableid",TableID, "_table_name",_table.name);
		}
		public getTable():view.table.Table{
			return this.m_table;
		}
		
		public setQuickTable(_quickTable:view.quick.QuickTable):void{
			this.m_quickTable = _quickTable;
		}
		public getQuicktable():view.quick.QuickTable{
			return this.m_quickTable;
		}
		
		public redrawRoad():void{
			if(this.m_table){
				this.m_table.updateRoad(true);
			}
			if(this.m_quickTable){
				this.m_quickTable.updateRoad(true);
			}
		}
		
		public destroy():void{
			if(this.m_table){
				this.m_table = null;
			}
			if(this.m_quickTable){
				this.m_quickTable = null;
			}
		}
		
		//密码判断
		public get IsNeedPwd():boolean{
			return<number>(this.JoinTbStatus.charAt(4))==1;
		}
		
		//独享判断
		public get IsAlone():boolean{
			return<number>(this.JoinTbStatus.charAt(3))==1;
		}
		
		private setParam(sParam:string, oData:Object):void{
			if(oData[sParam]!=null && oData[sParam]!=""){
				this[sParam] = oData[sParam];
			}
		}
		
		private createStaticInfo(_GameID:number):void{
			if(this.StaticsInfo==null){
				switch(_GameID){
					case define.GameDefine.BAC:
						this.StaticsInfo	=	new StaticsInfoBaccarat();
						break;
					
					case define.GameDefine.SIC:
						this.StaticsInfo	=	new StaticsInfoSic();
						break;
					
					case define.GameDefine.ROU:
						this.StaticsInfo	=	new StaticsInfoRoulette();
						break;
					
					case define.GameDefine.DTF:
						this.StaticsInfo	=	new StaticsInfoDTF();
						break;
				}
			}
		}


	}
}