module lobby.model.game {
	export class GameModel {
		/// <summary>
		/// 賭桌資訊
		/// </summary>
		public var tableStruct 					:	TableStruct;
		
		/// <summary>
		/// 押注模式資料(玩家自選)
		/// </summary>
		public var betLimits 					:	GameBetLimitBase;
		
		public var pays							:	Array;				//赔率数组
		
		/// <summary>
		/// 可用座位號碼
		/// </summary>
		public var availableSeatList 			:	Array;
		
		public var betAreaNum					:	uint	=1;			//投注区数量
		public var seatNum						:	uint	=1;			//玩家座位数量
		
		
		public var playerDict					:	Dictionary; 		//房间玩家列表 包括旁注
		/**座位数组  0号位不用  */
		public var seats						:	Vector.<PlayerVo>;
		public var bBet							:	Boolean 			//下注未确定
		
		/// <summary>
		/// 局號
		/// </summary>
		public var gameNoSettled				:   int;
		
		public var isLastGame					:	Boolean;				//是否最后一局
		
		protected var m_sumArr					:	Array					//统计数组
		
		public var liveServer					:	String;			//视频服务器地址
		public var streamAppName				:	String;			//视频
		
		public var bGaming						:	Boolean			//是否游戏进行中状态
		public var bActive						:	Boolean			//是否激活
		public var bpsn							:	int;			//庄咪牌权  座位号
		public var ppsn							:	int;			//闲咪牌权
		
		/**
		 *用于比对荷官变化 
		 */
		public var dealerID 				:	String	=	"";				//荷官序号
		
		
		//==============================
		//客户端变量
		public var prevShoeNo							:	int;			//	
		public var prevStatus							:	String ="";    //前一次状态
		public var bChanginComplete						:	Boolean;
		
		public constructor() {
			playerDict = new Dictionary;
			var playerVo:PlayerVo =new PlayerVo();
			playerVo.id = Player.getInstance().iPlayerID;
			playerDict[playerVo.id]=playerVo;
		}
		
		public function reset():void{
			if(tableStruct){
				tableStruct.GameRecordNo = 0;
				tableStruct.TableID= 0;
				tableStruct.ShoeNo= 0;
				tableStruct.GameNo= 0;
				prevShoeNo = 0;
				gameNoSettled = 0;
				isLastGame=false;
				tableStruct.RoadMaps="";
				tableStruct.LastRoadMap="";
				tableStruct.CountDownTime = 0;
				tableStruct.OnlinePlayers=0;
				tableStruct.IsPaused	=false;
				tableStruct.IsChangingShoe= false;
				tableStruct.IsCurrFailGame= false;
				tableStruct.IsMaintaining= false;
				
				tableStruct.BetUpperLimit=0;
				tableStruct.BetLowerLimit=0;
				//joinTbStatus=tableInfo.JoinTbStatus;
				tableStruct.GameStatus=GameStatus.WAIT_NEXT_NEWGAME;
				if (tableStruct.StaticsInfo){
					tableStruct.StaticsInfo.clear();
				}
				
				//updateTableStaticInfo(tableInfo.staticsInfo)
				//				results=""	;
			}
			
			liveServer = ""
			streamAppName = "";
			
			
			gameNoSettled = 0;
			bActive = false;
			bGaming = false;
			bpsn = 0;
			ppsn = 0;
			playerDict = new Dictionary();
			
		}
		
		public function destroy():void{
			
			gameNoSettled = 0;
			setTableData(null);
			bActive = false;
			bGaming = false;
			bpsn = 0;
			ppsn = 0;
			
			seats=null;
			betLimits = null;
			tableStruct = null;
			var vo:PlayerVo 
			for (var sKey:String in playerDict) 
			{
				vo = playerDict[sKey];
				if(vo){
					vo.destroy();
					delete playerDict[sKey];
				}
			}
			vo = null;
			playerDict=null;
		}
		
		/**
		 *是否可以退出游戏 （已投注不可以退出） 
		 * @return 
		 * 
		 */
		public function get bCanExit():Boolean{
			if (tableStruct==null) return true;
			
			if(tableStruct.GameStatus== GameStatus.CHANGING_SHOE || tableStruct.GameStatus == GameStatus.CHANG_SHOE_COMPLETED ||
				tableStruct.GameStatus==GameStatus.FAILING_GAME || tableStruct.GameStatus == GameStatus.FAIL_GAME){
				return true;
			}
			
			if (tableStruct.GameStatus != GameStatus.WAIT_NEXT_NEWGAME &&  me && me.totalBet>0 ){
				return false;
			}
			
			return true;
		}
		
		
		
		/**
		 *添加玩家数据到列表 
		 * @param playerVo
		 * 
		 */
		public function addPlayer(playerVo:PlayerVo):void{
			var seat:int = playerVo.seatNo;
			playerDict[playerVo.id]=playerVo;
			if(seat<0 || seat>seatNum){
				return;
			}else{
				trace(playerVo.nickName+ " 玩家入座"+playerVo.seatNo)
				seats[seat]	= playerVo;
			}
		}
		
		public function removePlayer(id:int):void{
			var playerVo:PlayerVo = playerDict[id];
				
				
			if (playerVo ){
				playerVo.clear();
				if ( playerVo.seatNo>0){
					removeSeatPlayer(playerVo.seatNo);
				}
			}
			playerDict[id]=null;
		}
		
		
		public function removeSeatPlayer(seat:int):void{
			seats[seat]=null;
		}
		
		/**
		 *根据玩家ID 取player数据 
		 * @param id
		 * @return 
		 * 
		 */
		public function getPlayer(id:int):PlayerVo{
			
			return playerDict[id];
		}
		
		/**
		 *根据座位号拿player 
		 * @param seat
		 * @return 
		 * 
		 */
		public function getSeatPlayer(seat:int):PlayerVo{
			if(seat<0 || seat>seatNum) return null;
			return seats[seat];
		}
		
		
		private function toPlayer(player:PlayerVo,info:SimplePlayer):void{
			player.id= info.PlayerID;
			player.nickName=info.NickName;
			player.accountType= info.AccountType;
			player.agentID =info.AgentID;
			player.balance=info.Balance;
			player.seatNo=info.SeatNo;
			player.BPSN=info.BPSN;
			player.PPSN=info.PPSN;
		}
		
		/**
		 *把 tabel 数据转为 游戏数据 
		 * @param tableInfo
		 * 
		 */
		public function setTableData(tableInfo:TableStruct):void{
			tableStruct =tableInfo;
		/*	if (tableInfo){
				tableStruct.ThemeID = tableInfo.ThemeID;				
				tableStruct.TableType = tableInfo.TableType;
				gameRecordNo = tableInfo.GameRecordNo;
//				gameID = tableInfo.GameID ;
//				tableID = tableInfo.TableID;
//				shoeNo  = tableInfo.ShoeNo;
//				prevShoeNo = shoeNo;
//				gameNo = tableInfo.GameNo;
//				dealerId = tableInfo.DealerLoginID;
//				dealerName = tableInfo.DealerName;
				//			result = tableInfo.RoadMaps;
				lastRoadMap=tableInfo.LastRoadMap;
//				countdown = tableInfo.CountDownTime;
//				onlinePlayers =tableInfo.OnlinePlayers;
				isPaused   	=tableInfo.IsPaused;
//				isChangingShoe = tableInfo.IsChangingShoe;
				upperLimit=tableInfo.BetUpperLimit;
				lowerLimit=tableInfo.BetLowerLimit;
				tableStruct.JoinTbStatus=tableInfo.JoinTbStatus;
				tableStruct.GameStatus= tableInfo.GameStatus;
				updateTableStaticInfo(tableInfo.staticsInfo)
				if( tableStruct.RoadMaps == null ){
					tableStruct.RoadMaps = "";
				}
				
				this.tableStruct = tableInfo;
			}else{
				gameRecordNo = 0;
//				gameID = 1 ;
//				tableID = 0;
//				shoeNo  = 0;
//				gameNo = 0;
				prevShoeNo = 0;
				gameNoSettled = 0;
				//			result = tableInfo.RoadMaps;
				isLastGame=false;
				lastRoadMap="";
//				countdown = 0;
//				onlinePlayers =0;
				isPaused   	=false;
//				isChangingShoe = false;
//				isCurrFailGame = false;
//				isMaintaining = false;
			
				upperLimit=0;
				lowerLimit=0;
				//joinTbStatus=tableInfo.JoinTbStatus;
				state =GameStatus.WAIT_NEXT_NEWGAME;
				pools.clear();
				//updateTableStaticInfo(tableInfo.staticsInfo)
//				results=""	;
				liveServer = ""
				streamAppName = "";
				this.tableStruct = null;
				
			}*/

		}
		
		
		/**
		 *当前语言的房间名 
		 * @return 
		 * 
		 */
		public function get roomName():String{
			var str:String="";
			if(tableStruct){
				switch(LobbyManager.getInstance().lobbyAuth.Lang)
				{
					case Define.LANGUAGE_CN:
						str = tableStruct.TableName_CN;
						break;
					case Define.LANGUAGE_TW:
						str = tableStruct.TableName_TW;
						break;
					case Define.LANGUAGE_EN:
						str = tableStruct.TableName_EN;
						break;
					
					default:
						
						break;
				}
			}
			
			if (str == null) str = "";
//			if (str.length>14){
//				str= str.substr(0,7)+"……"
//			}
			return str;
		}
		
		public function get me():PlayerVo{
			return getPlayer(Player.getInstance().iPlayerID);
		}
		
		/**
		 *取得对应区域赔率  没有使用
		 * @param id
		 * @return 
		 * 
		 */
		public function getPay(id:int):uint{
			return 1;
		}
		
		/**
		 *结果数量统计 
		 * @return 
		 * 
		 */
		public function set sumArr(value:Array):void{
			m_sumArr=value;
		}
		
		/**
		 *获取 结果数量统计 
		 * @return 
		 * 
		 */
		public function get sumArr():Array{
			return m_sumArr;
		}
		
		
		/**更新彩池， 统计数据  * */
		public function updateTableStaticInfo( staticData:Object  ):void	{
			tableStruct.StaticsInfo.updateStatic(staticData);
		}
		
		/**更新统计数据  * */
		public function updateSum( staticData:Object  ):void	{
			tableStruct.StaticsInfo.updateSum(staticData);
		}
		
		
		
		public function clearBetList():void{
			if (me){
				me.clearBetList();
				me.clearOutcomeList();
				me.clearTmpBetList();
			}
			
			for (var i:int = 1; i < seats.length; i++) 
			{
				var player:PlayerVo=seats[i];
				if (player){
					player.clearBetList();
					player.clearOutcomeList();
					player.clearTmpBetList();
				}
				
			}
			
				
			
		}
		
		/**
		 *设置视频连接地址 
		 * 
		 */
		public function setupLive():void{
			if (tableStruct){
				if(SharedObjectManager.getCDNList() == null){
					liveServer = "rtmp://"+LobbyData.getInstance().lobbyInfo.getChannelByChannelNo(tableStruct.DefCDNID).CDNUrl+"/"+tableStruct.StreamAppName;
				}else{
					liveServer = "rtmp://"+LobbyData.getInstance().lobbyInfo.getChannelByChannelNo(SharedObjectManager.getCDNList().ChannelNo).CDNUrl+"/"+tableStruct.StreamAppName;
				}
				
				if(SharedObjectManager.getResolution()==null)
				{
					if(LobbyData.getInstance().lobbyInfo.currentResolution)
					{
						streamAppName=tableStruct.StreamName+LobbyData.getInstance().lobbyInfo.currentResolution.Resolution;
					}else 
					{
						streamAppName = "";
					}
				}else{
					streamAppName=tableStruct.StreamName+SharedObjectManager.getResolution().Resolution;
				}
				
			}
		}
		
		
		/**
		 *本局是否支持重复下注 
		 * @return 
		 * 
		 */
		public function get bRetBet():Boolean{
			if(me && me.totalBet==0 && me.totalTmpBet ==0 && me.lastTotalBet>0){
				return true;
			}
			return false;
		}
		
		
		public function copy(_model:GameModel):void{
			this.tableStruct=_model.tableStruct;
		//	this. betLimits=_model.betLimits;
			
			this.pays=_model.pays;				//赔率数组
			
			this.betAreaNum=_model.betAreaNum;			//投注区数量
			this.seatNum = _model.seatNum;			//玩家座位数量
			var player:PlayerVo;
			for (var key:String in _model.playerDict) 
			{
				player = _model.playerDict[key].clone();
				if(player){
					addPlayer(player);
				}
			
			}
			
			this.tableStruct.GameStatus	=_model.tableStruct.GameStatus;
			this.bBet	=_model.bBet			//下注未确定
			this.gameNoSettled	=_model.gameNoSettled
			this.m_sumArr		=_model.sumArr.concat();			//统计数组
			this.liveServer			=_model.liveServer;
			this.streamAppName		=_model.streamAppName;
			this.bGaming			=_model.bGaming;
			this.bActive			=_model.bActive;
			this.bpsn				=_model.bpsn;
			this.ppsn				=_model.ppsn;
			
			
			//==============================
			//客户端变量
			this.prevShoeNo				=_model.prevShoeNo;
			this.prevStatus				=_model.prevStatus;
			this.bChanginComplete		=_model.bChanginComplete;
		}
		
		
		/**確認通知觀察者 view */
		 protected function onNotify(e:Object):void {
			var o:Object = e;
			if ( o.Type != undefined ) {
//				var data:* = this._dataStructure.parse( o.Type , o );
//				
//				this.notifyObservers( o.Type , data );		
			}
			
		}		
		
		
	}
}