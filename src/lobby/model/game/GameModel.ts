module lobby.model.game {
	export class GameModel {
		/// <summary>
		/// 賭桌資訊
		/// </summary>
		public tableStruct 					:	struct.TableStruct;
		
		/// <summary>
		/// 押注模式資料(玩家自選)
		/// </summary>
		public betLimits 					:	GameBetLimitBase;
		
		public pays							:	any[];				//赔率数组
		
		/// <summary>
		/// 可用座位號碼
		/// </summary>
		public availableSeatList 			:	any[];
		
		public betAreaNum					:	number	=1;			//投注区数量
		public seatNum						:	number	=1;			//玩家座位数量
		
		
		public playerDict					; 		//房间玩家列表 包括旁注
		/**座位数组  0号位不用  */
		public seats						:	 player.PlayerVo[];
		public bBet							:	 boolean 			//下注未确定
		
		/// <summary>
		/// 局號
		/// </summary>
		public gameNoSettled				:   number;
		
		public isLastGame					:	boolean;				//是否最后一局
		
		protected m_sumArr					:	any[]					//统计数组
		
		public liveServer					:	string;			//视频服务器地址
		public streamAppName				:	string;			//视频
		
		public bGaming						:	boolean			//是否游戏进行中状态
		public bActive						:	boolean			//是否激活
		public bpsn							:	number;			//庄咪牌权  座位号
		public ppsn							:	number;			//闲咪牌权
		
		/**
		 *用于比对荷官变化 
		 */
		public dealerID 					:	string	=	"";				//荷官序号
		
		
		//==============================
		//客户端变量
		public prevShoeNo							:	number;			//	
		public prevStatus							:	string ="";    //前一次状态
		public bChanginComplete						:	boolean;
		
		public constructor() {
			this.playerDict = {};
			var  playerVo: player.PlayerVo =new  player.PlayerVo();
			playerVo.id = Player.getInstance().iPlayerID;
			this.playerDict[ playerVo.id ]= playerVo;
		}
		
		public reset():void{
			if(this.tableStruct){
				this.tableStruct.GameRecordNo = 0;
				this.tableStruct.TableID= 0;
				this.tableStruct.ShoeNo= 0;
				this.tableStruct.GameNo= 0;
				this.prevShoeNo = 0;
				this.gameNoSettled = 0;
				this.isLastGame=false;
				this.tableStruct.RoadMaps="";
				this.tableStruct.LastRoadMap="";
				this.tableStruct.CountDownTime = 0;
				this.tableStruct.OnlinePlayers=0;
				this.tableStruct.IsPaused	=false;
				this.tableStruct.IsChangingShoe= false;
				this.tableStruct.IsCurrFailGame= false;
				this.tableStruct.IsMaintaining= false;
				
				this.tableStruct.BetUpperLimit=0;
				this.tableStruct.BetLowerLimit=0;
				//joinTbStatus=tableInfo.JoinTbStatus;
				this.tableStruct.GameStatus = status.GameStatus.WAIT_NEXT_NEWGAME;
				if (this.tableStruct.StaticsInfo){
					this.tableStruct.StaticsInfo.clear();
				}
				
				//updateTableStaticInfo(tableInfo.staticsInfo)
				//				results=""	;
			}
			
			this.liveServer = ""
			this.streamAppName = "";
			
			
			this.gameNoSettled = 0;
			this.bActive = false;
			this.bGaming = false;
			this.bpsn = 0;
			this.ppsn = 0;
			this.playerDict = {};
			
		}
		
		public destroy():void{
			
			this.gameNoSettled = 0;
			this.setTableData(null);
			this.bActive = false;
			this.bGaming = false;
			this.bpsn = 0;
			this.ppsn = 0;
			
			this.seats=null;
			this.betLimits = null;
			this.tableStruct = null;
			var vo: player.PlayerVo 
			for (var sKey in this.playerDict) 
			{
				vo = this.playerDict[sKey];
				if(vo){
					vo.destroy();
					delete this.playerDict[sKey];
				}
			}
			vo = null;
			this.playerDict=null;
		}
		
		/**
		 *是否可以退出游戏 （已投注不可以退出） 
		 * @return 
		 * 
		 */
		get bCanExit(): boolean{
			if (this.tableStruct==null) return true;
			
			if(this.tableStruct.GameStatus== status.GameStatus.CHANGING_SHOE || this.tableStruct.GameStatus == status.GameStatus.CHANG_SHOE_COMPLETED ||
				this.tableStruct.GameStatus== status.GameStatus.FAILING_GAME || this.tableStruct.GameStatus == status.GameStatus.FAIL_GAME){
				return true;
			}
			
			if (this.tableStruct.GameStatus != status.GameStatus.WAIT_NEXT_NEWGAME &&  this.me && this.me.totalBet>0 ){
				return false;
			}
			
			return true;
		}
		
		
		
		/**
		 *添加玩家数据到列表 
		 * @param  player.PlayerVo
		 * 
		 */
		public addPlayer( $playerVo: player.PlayerVo):void{
			var seat:number=  $playerVo.seatNo;
			this.playerDict[ $playerVo.id]= player.PlayerVo;
			if(seat<0 || seat>this.seatNum){
				return;
			}else{
				console.log( $playerVo.nickName+ " 玩家入座"+ $playerVo.seatNo)
				this.seats[seat]	=  $playerVo;
			}
		}
		
		public removePlayer(id:number):void{
			var  playerVo: player.PlayerVo = this.playerDict[id];
				
				
			if ( playerVo ){
				 playerVo.clear();
				if (  playerVo.seatNo>0){
					this.removeSeatPlayer( playerVo.seatNo);
				}
			}
			this.playerDict[id]=null;
		}
		
		
		public removeSeatPlayer(seat:number):void{
			this.seats[seat]=null;
		}
		
		/**
		 *根据玩家ID 取player数据 
		 * @param id
		 * @return 
		 * 
		 */
		public getPlayer(id:number): player.PlayerVo{
			
			return this.playerDict[id];
		}
		
		/**
		 *根据座位号拿player 
		 * @param seat
		 * @return 
		 * 
		 */
		public getSeatPlayer(seat:number): player.PlayerVo{
			if(seat<0 || seat>this.seatNum) return null;
			return this.seats[seat];
		}
		
		
		private toPlayer(player: player.PlayerVo, info:player.SimplePlayer):void{
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
		public setTableData(tableInfo:struct.TableStruct):void{
			this.tableStruct =tableInfo;
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
				state =status.GameStatus.WAIT_NEXT_NEWGAME;
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
		get roomName():String{
			var str:String="";
			if(this.tableStruct){
				switch(manager.LobbyManager.getInstance().lobbyAuth.Lang)
				{
					case define.Define.LANGUAGE_CN:
						str = this.tableStruct.TableName_CN;
						break;
					case define.Define.LANGUAGE_TW:
						str = this.tableStruct.TableName_TW;
						break;
					case define.Define.LANGUAGE_EN:
						str = this.tableStruct.TableName_EN;
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
		
		get me(): player.PlayerVo{
			return this.getPlayer(Player.getInstance().iPlayerID);
		}
		
		/**
		 *取得对应区域赔率  没有使用
		 * @param id
		 * @return 
		 * 
		 */
		public getPay(id:number):number{
			return 1;
		}
		
		/**
		 *结果数量统计 
		 * @return 
		 * 
		 */
		set  sumArr(value:any[]){
			this.m_sumArr=value;
		}
		
		/**
		 *获取 结果数量统计 
		 * @return 
		 * 
		 */
		get sumArr():any[]{
			return this.m_sumArr;
		}
		
		
		/**更新彩池， 统计数据  * */
		public updateTableStaticInfo( staticData:Object  ):void	{
			this.tableStruct.StaticsInfo.updateStatic(staticData);
		}
		
		/**更新统计数据  * */
		public updateSum( staticData:Object  ):void	{
			this.tableStruct.StaticsInfo.updateSum(staticData);
		}
		
		
		
		public clearBetList():void{
			if (this.me){
				this.me.clearBetList();
				this.me.clearOutcomeList();
				this.me.clearTmpBetList();
			}
			
			for (var i:number= 1; i < this.seats.length; i++) 
			{
				var player: player.PlayerVo=this.seats[i];
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
		public setupLive():void{
			if (this.tableStruct){
				if(manager.SharedObjectManager.getCDNList() == null){
					this.liveServer = "rtmp://"+LobbyData.getInstance().lobbyInfo.getChannelByChannelNo(this.tableStruct.DefCDNID).CDNUrl+"/"+this.tableStruct.StreamAppName;
				}else{
					this.liveServer = "rtmp://"+LobbyData.getInstance().lobbyInfo.getChannelByChannelNo(manager.SharedObjectManager.getCDNList().ChannelNo).CDNUrl+"/"+this.tableStruct.StreamAppName;
				}
				
				if(manager.SharedObjectManager.getResolution()==null)
				{
					if(LobbyData.getInstance().lobbyInfo.currentResolution)
					{
						this.streamAppName = this.tableStruct.StreamName+LobbyData.getInstance().lobbyInfo.currentResolution.Resolution;
					}else 
					{
						this.streamAppName = "";
					}
				}else{
					this.streamAppName = this.tableStruct.StreamName + manager.SharedObjectManager.getResolution().Resolution;
				}
				
			}
		}
		
		
		/**
		 *本局是否支持重复下注 
		 * @return 
		 * 
		 */
		get bRetBet(): boolean{
			if(this.me && this.me.totalBet==0 && this.me.totalTmpBet ==0 && this.me.lastTotalBet>0){
				return true;
			}
			return false;
		}
		
		
		public copy(_model:GameModel):void{
			this.tableStruct=_model.tableStruct;
		//	this. betLimits=_model.betLimits;
			
			this.pays=_model.pays;				//赔率数组
			
			this.betAreaNum=_model.betAreaNum;			//投注区数量
			this.seatNum = _model.seatNum;			//玩家座位数量
			var player: player.PlayerVo;
			for (var key in _model.playerDict) 
			{
				player = _model.playerDict[key].clone();
				if(player){
					this.addPlayer(player);
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
		 protected onNotify(e):void {
			var o = e;
			if ( o.Type != undefined ) {
//				var data:* = this._dataStructure.parse( o.Type , o );
//				
//				this.notifyObservers( o.Type , data );		
			}
			
		}		
		
		
	}
}