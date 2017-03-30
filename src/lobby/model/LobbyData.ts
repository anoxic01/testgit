module lobby.model {
	export class LobbyData {
		
//		private const TIME_OUT						:	int		=	2;								//返回超时
		
		private m_vecAccessTableList			:	PlayerTableOwnStatusStruct[];		//可进桌资料	
		private m_vecAdvList					:	AdvertisementStruct[];				//广告列表
		private m_vecGameBetLimitList			:	BetLimitListStruct[];				//限红列表
		private m_aGoodRoadMapList				:	any[];										//好路讯息
		private m_aGoodRoadTemp					:	any[];										//临时数据
		private m_lobbyInfo						:	LobbyInfo;									//大厅信息
//		private m_vecMarqueeList				:	<MarqueeStruct>;						//公告列表
		
//		private m_iRet							:	int		=	-1;								//返回结果
//		private m_iType							:	number;										//?
		
		public aSN								:	any[]	=	[];								//数据包号
		
		private aReply							:	any[]	=	[0x00,0x05,0x06,0x07,0x08,0x09,0x0A,0x0B,0x11,0x12,0x13,0x14,0x19,0x1A,0x03,0x0E,0x0F,0x10,0x15,0x16,0x17,0x21,0x1C,0x1D,0x1E,0x1F,0x24];	//回复协议		
		
//		private aChip							:	any[]	=	["Chip_Asset_10","Chip_Asset_50","Chip_Asset_100","Chip_Asset_300","Chip_Asset_500",
//																	"Chip_Asset_1000","Chip_Asset_3000","Chip_Asset_5000","Chip_Asset_10000","Chip_Asset_30000",
//																	"Chip_Asset_50000","Chip_Asset_100000","Chip_Asset_300000","Chip_Asset_500000",
//																	"Chip_Asset_x_10","Chip_Asset_x_50","Chip_Asset_x_100","Chip_Asset_x_300","Chip_Asset_x_500",
//																	"Chip_Asset_x_1000","Chip_Asset_x_3000","Chip_Asset_x_5000","Chip_Asset_x_10000","Chip_Asset_x_30000",
//																	"Chip_Asset_x_50000","Chip_Asset_x_100000","Chip_Asset_x_300000","Chip_Asset_x_500000"];
//		private aSound							:	any[]	=	[sound_number_0];
		
		private m_dicGameNo						:	Dictionary = new Dictionary();
		
		/**	多桌游戏Mode **/
		private m_dicGameMode					:	Dictionary = new Dictionary();
		
		/** 好路提示类型 **/
		private m_vecGoodRoadType				:	number[]	=	new Array<number>();
		
		/** 骰宝-珠子 **/
		public beadRoad_sic						 = manager.ResourceManager.getInstance().getInstanceByNameFromDomain(define.Define.SWF_ROAD_MAP,"linkSicBeadRoad");
		
		/** 好路多桌 **/
		private static m_vecSubscribed			:	number[]	=	new Array<number>();				//已订阅表
		
		/**  **/
		public static LTK						:	String			=	"";								//logToKen
		
		private static m_instance				:	LobbyData;
		
		/** rtmp **/
		private static m_vecRtmpPlayers			:	util.RTMPPlayer[] = new Array<RTMPPlayer>();
		
		public ThemeNameList					:	ThemeNameStruct[];
		public TableNameList					:	TableNameStruct[];
		private m_data							:	Object;
		private m_bInitMaintainAnnouncement		:	boolean;
		
		private m_MaintainTableStruct			:	TableStruct[] = new Array<TableStruct>();										//玩家所在的桌子关闭时，记录
		

		private static instance	:	LobbyData;

		public static getInstance():LobbyData{
			
			if(this.m_instance == null){
				
				this.m_instance = new LobbyData(new Singleton());
				
			}
			return this.m_instance;
		}
		
		public constructor(single:Singleton) {
			if(single==null){
				
				console.log("models.LobbyModel初始化异常...");
				
			}
		}

		public addMaintainTableStruct(_tableStruct:TableStruct):void{
			var len : number = this.m_MaintainTableStruct.length;
			for (var i:number= 0; i < len; i++) 
			{
				if(this.m_MaintainTableStruct[i].TableID == _tableStruct.TableID){
					return;
				}
			}
			
			this.m_MaintainTableStruct.push(_tableStruct);
		}
		public removeMaintainTableStruct(_tableStruct:TableStruct):void{
			var len : number = this.m_MaintainTableStruct.length;
			for (var i:number= 0; i < len; i++) 
			{
				if(this.m_MaintainTableStruct[i].TableID == _tableStruct.TableID){
					this.m_MaintainTableStruct.splice(i,1);
					break;
				}
			}
		}
		public removeAllMaintainTableStruct():void{
			var len : number = this.m_MaintainTableStruct.length;
			for (var i:number= 0; i < len; i++) 
			{
				this.m_MaintainTableStruct.pop();
			}
		}
		get MaintainTableStruct():TableStruct[]{
			return this.m_MaintainTableStruct;
		}
		public addRtmpPlayer(r:RTMPPlayer):void{
			if(this.m_vecRtmpPlayers.indexOf(r)==-1){
//				for (var i:number= 0; i < m_vecRtmpPlayers.length; i++) 
//				{
//					if(m_vecRtmpPlayers[i].stageVideoIndex == r.stageVideoIndex){
//						Log.getInstance().log(this,"使用相同的stagevideo频道"+String(r.stageVideoIndex));
//						return;
//					}
//				}
				
				this.m_vecRtmpPlayers.push(r);
			}
		}
		public removeRtmpPlayer(rtmp:RTMPPlayer):void{
			var index:number= this.m_vecRtmpPlayers.indexOf(rtmp);
			if(index!=-1){
				this.m_vecRtmpPlayers.splice(index,1);
				
			}
		}
		get RtmpPlayers():RTMPPlayer[]{
			return this.m_vecRtmpPlayers;
		}
		
		get AdvList():AdvertisementStruct[]
		{
			return this.m_vecAdvList;
		}

		set  AdvList(value:AdvertisementStruct[])
		{
			this.m_vecAdvList = value;
		}

		/**
		 *	大厅数据 
		 * @param oData
		 * 
		 */		
		public onLoginLobby( oData ):void{
			this.m_data = oData;
			
			this.LTK = this.m_data.LTK;
			
			this.m_vecAccessTableList = new Array<PlayerTableOwnStatusStruct>();
			var _accessStruct : PlayerTableOwnStatusStruct;
			var _count : number;
			for (var k:number= 0; k < oData.AccessTableList.length; k++) 
			{
				_accessStruct = new PlayerTableOwnStatusStruct(oData.AccessTableList[k]);
				this.m_vecAccessTableList.push(_accessStruct);
				if(_accessStruct.IsTableOwner){
					_count++;
					model.Player.getInstance().bIsTableOwner = true;
				}
			}
			if(_count>1){
				console.log("异常：玩家包桌数量超过1........");
			}
			if(_accessStruct){
				_accessStruct = null;
			}
			
			this.setAdvList(oData.AdvList);
			
			
			/* LobbyInfo */
			this.m_lobbyInfo = new LobbyInfo(oData.LobbyInfo);
			
			/* GameBetLimitList	*/
			m_vecGameBetLimitList = new Array<BetLimitListStruct>();
			var _betLimitListStruct : BetLimitListStruct;
			var _arrGameBetLimitList : any[] = oData.GameBetLimitList;
			if ( _arrGameBetLimitList != null ) {
				
				var uLen : number = _arrGameBetLimitList.length;
				for (var i:number= 0; i < uLen; i++) {
					_betLimitListStruct = new BetLimitListStruct(_arrGameBetLimitList[i]);
					m_vecGameBetLimitList.push( _betLimitListStruct );
				}
			}
			_betLimitListStruct = null;
			_arrGameBetLimitList = null;
			
			//好路通知
			m_aGoodRoadMapList = [];
			if (oData.GoodRoadMapList){
				for (var i2:number= 0; i2 < oData.GoodRoadMapList.length; i2++) 
				{
					var GoodRoadMapInfo:GoodRoadStruct = new GoodRoadStruct(oData.GoodRoadMapList[i2]);
					if(GoodRoadMapInfo.MatchList && GoodRoadMapInfo.MatchList.length>0){
					//if (GoodRoadMapInfo.TableID==25) test
						m_aGoodRoadMapList.push(GoodRoadMapInfo);
					}
				}
				resetGoodRoadTemp();
			}
			
			
			/* MarqueeList */
//			m_vecMarqueeList = new <MarqueeStruct>();
//			var marqueeStruct : MarqueeStruct;
//			for (var j:number= 0; j < oData.MarqueeList.length; j++) 
//			{
//				marqueeStruct = new MarqueeStruct(oData.MarqueeList[j]);
//				m_vecMarqueeList.push(marqueeStruct);
//			}
			
			
			/* PlayerInfo */
			Player.getInstance().PlayerInfo = oData.PlayerInfo;
			

			//设置密钥
			LobbyManager.getInstance().socketParser.setPData(Player.getInstance().sPrivateKey_Lobby);
			LobbyManager.getInstance().socketParser.setBData(Player.getInstance().sBroadcastKey_Lobby);
			LobbyManager.getInstance().socketParser.setAData(Player.getInstance().sAgentKey_Lobby);
			

			//显示 大厅
			LobbyManager.getInstance().lobbyView.setData();  
			
			//送登入確認封包
			LobbyManager.getInstance().sendLoginLobbySuccess();
			
			//订阅厅馆
			LobbyManager.getInstance().sendSubscribeTheme(m_lobbyInfo.DefThemeID);
			
			//好路类型
			var _type : any[] = SharedObjectManager.getGoodRoadSetting();
			var _typeLen : number = _type.length;
			for (var i3:number= 0; i3 < _typeLen; i3++) 
			{
				if(_type[i3]){
					addGoodRoadType(i3+1);
				}
			}
			
			LobbyManager.getInstance().getUserDataGameApi();
			
			//显示公告
//			readAnnouncement(oData.AnnouncementList);
			
			NoticeManeger.getInstance().NotAllowTableIDList = oData.NotAllowTableIDList;
			
		}
		
		public initMaintainAnnouncement():void{
			if(m_bInitMaintainAnnouncement){
				return;
			}else{
				m_bInitMaintainAnnouncement = true;
				if(m_data.MAList!=null){
//					for (var j:number= 0; j < m_data.MAList.length; j++) 
//					{
//						MAList.push(new MaintainAnnouncementStruct(m_data.MAList[j]));
//					}
					NoticeManeger.getInstance().setMaintains(m_data.MAList);
				}
			}
		}
		
		public setAdvList(_aAdv : any[]):void{
			m_vecAdvList = new Array<AdvertisementStruct>();
			
			if(_aAdv){
				var _adLen : number = _aAdv.length;
				if(_adLen>0){
					_aAdv.sortOn("SN",any[].NUMERIC);
					_adLen = _adLen>Define.Advertisement?Define.Advertisement:_adLen;
					for (var i4:number= 0; i4 < _adLen; i4++) 
					{
						//测试数据
						var obj : AdvertisementStruct = new AdvertisementStruct();
						obj.AdsUrl = _aAdv[i4].AdsUrl;
						obj.LinkUrl = _aAdv[i4].LinkUrl;
						obj.SN = _aAdv[i4].SN;
						//					m_vecAdvList.push(new AdvertisementStruct(_aAdv[i4]));
						m_vecAdvList.push(obj);
					}
				}
			}
			
		}
		
		get gameBetLimitList():BetLimitListStruct[]
		{
			return m_vecGameBetLimitList;
		}
		
		set  gameBetLimitList(value:BetLimitListStruct[]) 
		{
			m_vecGameBetLimitList = value;
		}
		
		public getBetLimitByGameID(_gameID:number):BetLimitListStruct{
			var _betLimitListStruct : BetLimitListStruct;
			var _len : number = m_vecGameBetLimitList.length;
			for (var i:number= 0; i < _len; i++) 
			{
				if(m_vecGameBetLimitList[i].GameID == _gameID){
					_betLimitListStruct = m_vecGameBetLimitList[i];
					return _betLimitListStruct;
				}
			}
			console.log("找不到对应的限红数据...");
			return _betLimitListStruct;
		}
		public getBetLimitByGL(_gameID:number, _limitID:number):BetLimitStruct{
			var _betLimitListStruct : BetLimitListStruct = getBetLimitByGameID(_gameID);
			var _len : number = _betLimitListStruct.vecBetLimitList.length;
			for (var i:number= 0; i < _len; i++) 
			{
				if(_betLimitListStruct.vecBetLimitList[i].ID==_limitID){
					return _betLimitListStruct.vecBetLimitList[i];
				}
			}
			
			return null;
		}
		
		//从好路列表中取出指定数量的好路
		public getGoodRoadToGame(_iCount:number):GoodRoadStruct[]{
			var _struct : TableStruct;
			var _len : number = m_aGoodRoadMapList.length>_iCount?_iCount:m_aGoodRoadMapList.length;
			var _vec : GoodRoadStruct[] = new Array<GoodRoadStruct>();
			for (var i:number= 0; i < _len; i++) 
			{
				_struct = lobbyInfo.findTableStructGT(GameDefine.BAC, (m_aGoodRoadMapList[i] as GoodRoadStruct).TableID);
				if(_struct){
					_vec.push(m_aGoodRoadMapList[i]);
				}
			}
			
			return _vec;
		}
		
		get aGoodRoadMapList():any[]
		{
			return m_aGoodRoadMapList;
		}
		
		set  aGoodRoadMapList(value:any[])
		{
			m_aGoodRoadMapList = value;
		}
		//新增好路
		public addGoodRoadMap(_goodRoadMapStruct:GoodRoadStruct):void{
			if(_goodRoadMapStruct.GameID==GameDefine.BAC){
				if(judgeAdd(_goodRoadMapStruct)){
//					console.log("加入好路：",_goodRoadMapStruct.TableID);
					m_aGoodRoadMapList.push(_goodRoadMapStruct);
				}
				
				//是否通知好路
				if( judgeToNotificationGoodRoad(_goodRoadMapStruct) ){
					if(judgeAddTemp(_goodRoadMapStruct)){
//						console.log("加入好路临时列表：",_goodRoadMapStruct.TableID);
						//添加至临时列表
						addGoodRoadTemp(_goodRoadMapStruct);
					}
					
					//好路多桌、好路通知
					LobbyManager.getInstance().addGoodRoadNotification(_goodRoadMapStruct);
				}else{
					//临时列表中移除
					removeGoodRoadTemp(_goodRoadMapStruct.TableID);
					
					//不符合好路设置 有可能之前已加入好路通知, 通知移除
					LobbyManager.getInstance().removeGoodRoadNotification(_goodRoadMapStruct.TableID);
				}
			}
		}
		
		//判断好路是否已添加过
		private judgeAdd(_goodRoadMapStruct:GoodRoadStruct): boolean{
			var _len : number = m_aGoodRoadMapList.length;
			for (var i:number= 0; i < _len; i++) 
			{
				if(m_aGoodRoadMapList[i].TableID == _goodRoadMapStruct.TableID){
					m_aGoodRoadMapList[i].MatchList = _goodRoadMapStruct.MatchList;
					return false;
				}
			}
			
			return true;
		}
		
		//判断好路是否添加过
		private judgeAddTemp(_goodRoadMapStruct:GoodRoadStruct): boolean{
			var _len : number = this.m_aGoodRoadTemp.length;
			for (var i:number= 0; i < _len; i++) 
			{
				if(this.m_aGoodRoadTemp[i].TableID == _goodRoadMapStruct.TableID){
					this.m_aGoodRoadTemp[i].MatchList = _goodRoadMapStruct.MatchList;
					return false;
				}
			}
			
			return true;
		}
		
		public removeGoodRoadMap(_TableID:number):void{
			//移除临时列表中
			this.removeGoodRoadTemp(_TableID);
			
			var _len : number = this.m_aGoodRoadMapList.length;
			for (var i:number= 0; i < _len; i++) 
			{
				if(_TableID == this.m_aGoodRoadMapList[i].TableID){
					this.m_aGoodRoadMapList.splice(i,1);
					
					manager.LobbyManager.getInstance().removeGoodRoadNotification(_TableID);
					break;
				}
			}
			
		}

		
		//多桌出现空桌时，取新好路填充
		public getGoodRoad():GoodRoadStruct{
			if(this.m_aGoodRoadTemp.length>0){
				return this.m_aGoodRoadTemp.shift() as GoodRoadStruct;
			}
			return null;
		}
		public getGoodRoadByIndex(_index:number):GoodRoadStruct{
			var struct : GoodRoadStruct = this.m_aGoodRoadTemp[_index];
			if(struct!=null){
				this.m_aGoodRoadTemp.splice(_index,1);
			}
			return struct;
		}
		
		//重置临时好路列表
		public resetGoodRoadTemp():void{
			this.m_aGoodRoadTemp = [];
			var _len : number = this.m_aGoodRoadMapList.length;
			var _goodRoadStruct : GoodRoadStruct;
			for (var i:number= 0; i < _len; i++) 
			{
				if(this.judgeToNotificationGoodRoad(this.m_aGoodRoadMapList[i])){
					_goodRoadStruct = new GoodRoadStruct();
					_goodRoadStruct.GameID = this.m_aGoodRoadMapList[i].GameID;
					_goodRoadStruct.TableID = this.m_aGoodRoadMapList[i].TableID;
					_goodRoadStruct.MatchList = (this.m_aGoodRoadMapList[i].MatchList as any[]).slice();
					this.m_aGoodRoadTemp.push(_goodRoadStruct);
				}
			}
			if(_goodRoadStruct){
				_goodRoadStruct = null;
			}
		}
		private addGoodRoadTemp(_goodRoadStruct:GoodRoadStruct):void{
			var goodRoadStruct : GoodRoadStruct;
			goodRoadStruct = new GoodRoadStruct();
			goodRoadStruct.GameID = _goodRoadStruct.GameID;
			goodRoadStruct.TableID = _goodRoadStruct.TableID;
			goodRoadStruct.MatchList = (_goodRoadStruct.MatchList as any[]).slice();
			
			this.m_aGoodRoadTemp.push(goodRoadStruct);
		}
		private removeGoodRoadTemp(_TableID:number):void{
			var _len : number = this.m_aGoodRoadTemp.length;
			for (var i:number= 0; i < _len; i++) 
			{
				if(_TableID == this.m_aGoodRoadTemp[i].TableID){
					this.m_aGoodRoadTemp.splice(i,1);
					break;
				}
			}
		}
		
		public addMarquee(struct:MarqueeStruct):void{
//			m_vecMarqueeList.unshift(struct);
		}
		get MarqueeList():MarqueeStruct[]
		{
//			return m_vecMarqueeList;
			return null;
		}
		
		set  MarqueeList(value:MarqueeStruct[]) 
		{
//			if(value==null){
//				value = new <MarqueeStruct>();
//			}
//			m_vecMarqueeList = value;
//			LobbyManager.getInstance().lobbyView.information.marquee.setData();
		}
		
		get lobbyInfo():LobbyInfo 
		{
			return this.m_lobbyInfo;
		}
		
		set  lobbyInfo(value:LobbyInfo) 
		{
			this.m_lobbyInfo = value;
		}
		
		
		
		/**
		 *	多桌入口 
		 * @return 
		 * 
		 */		
		public getMultiTableStruct(uGameID:number):TableStruct{
			var _len:number= this.m_lobbyInfo.themeVec.length;
			var _struct:TableStruct;
			
			if(this.m_lobbyInfo.themeVec[0] && this.m_lobbyInfo.themeVec[0].TableList[0]){
				this.m_lobbyInfo.multiTabelStrct = this.m_lobbyInfo.themeVec[0].TableList[0];
			}else{
				console.log("桌子数据为空...");
				return null;
			}
			
			for (var i:number= 0; i <_len ; i++) {
				for (var j:number= 0; j < this.m_lobbyInfo.themeVec[i].TableList.length; j++) 
				{
					if ( this.m_lobbyInfo.themeVec[i].TableList[j].GameID == uGameID ) {
						_struct = this.m_lobbyInfo.themeVec[i].TableList[j];
						if(this.m_lobbyInfo.multiTabelStrct.OnlinePlayers > _struct.OnlinePlayers){
							this.m_lobbyInfo.multiTabelStrct = _struct;
						}
					}
				}
			}
			
			return this.m_lobbyInfo.multiTabelStrct;
		}
		public getTableStructByTableID( _tableID:number):TableStruct{
			var _len:number= this.m_lobbyInfo.themeVec.length;
			
			for (var i:number= 0; i <_len ; i++) {
				for (var j:number= 0; j < this.m_lobbyInfo.themeVec[i].TableList.length; j++) 
				{
					if ( this.m_lobbyInfo.themeVec[i].TableList[j].TableID == _tableID ) {
						return this.m_lobbyInfo.themeVec[i].TableList[j];
						
					}
				}
			}
			
			return null;
		}
		
		/**
		 *	回复序号 
		 */		
		public addSN(_sn:number, _error: boolean):void{
			var struct : SNStruct = new SNStruct();
			struct.SN = _sn;
			struct.ERROR = _error;
			
			this.aSN.push(struct);
		}
		public getSN():SNStruct{
			if(this.aSN.length>0){
				var struct : SNStruct = this.aSN.shift();
				return struct;
			}else{
				console.log("回复收包序号异常...");
			}
			return null;
		}
		public needReply( _type:number ): boolean{
			return this.aReply.indexOf(_type)!=-1;
		}
		
		/**
		 *	好路通知 
		 */		
		public judgeToNotificationGoodRoad(_struct:GoodRoadStruct): boolean{
			var _len : number = _struct.MatchList.length;
			for (var i:number= 0; i <_len; i++) 
			{
				if(this.m_vecGoodRoadType.indexOf(_struct.MatchList[i]) != -1){
					return true;
				}
			}
			return false;
		}
		
		/**
		 *	游戏局数 
		 */
		public getTableGameNo(_TableID:number):number{
			if(this.m_dicGameNo[_TableID]==null){
				this.m_dicGameNo[_TableID] = 0;
			}
			return this.m_dicGameNo[_TableID];
		}
		
		/** 多桌游戏model **/
		public addGameModel(_TableID:number,gameModel:GameModel):void{
				this.m_dicGameMode[_TableID] =gameModel;
		}
		public removeGameMode(_TableID:number):void{
			if(this.m_dicGameMode[_TableID]){
				delete this.m_dicGameMode[_TableID];
			}
		}
		public getGameModel(_TableID:number):GameModel{
			if(this.m_dicGameMode[_TableID] != null){
				return this.m_dicGameMode[_TableID];
			}
			return null;
		}
		
		
		/**
		 * 好路提示类型 
		 */		
		public addGoodRoadType(_iType:number):void{
			if(this.m_vecGoodRoadType.indexOf(_iType)==-1){
				this.m_vecGoodRoadType.push(_iType);
			}
		}
		public removeGoodRoadType(_iType:number):void{
			var index:number=this.m_vecGoodRoadType.indexOf(_iType);
			if (index>-1){
				this.m_vecGoodRoadType.splice(index, 1);
			}
		}
		public judgeGoodRoadType(_iType:number): boolean{
			return this.m_vecGoodRoadType.indexOf(_iType) != -1;
		}
		public getGoodRoadTypeCount():Number{
			return this.m_vecGoodRoadType.length;
		}
		/**
		 *	可进桌判断 
		 */		
		public isAccess(_tableID:number): boolean{
			var _len : number = this.m_vecAccessTableList.length;
			for (var i:number= 0; i < _len; i++) 
			{
				if(this.m_vecAccessTableList[i].TableID==_tableID){
					return true;
				}
			}
			
			return false;
		}
		public getPlayerTableOwnStatusStruct(_tableID:number):PlayerTableOwnStatusStruct{
			var _len : number = m_vecAccessTableList.length;
			for (var i:number= 0; i < _len; i++) 
			{
				if(m_vecAccessTableList[i].TableID==_tableID){
					return m_vecAccessTableList[i];
				}
			}
			
			return null;
		}
		public addPlayerTableOwnStatusStruct(_struct:PlayerTableOwnStatusStruct):void{
			var _len : number = m_vecAccessTableList.length;
			for (var i:number= 0; i < _len; i++) 
			{
				if(m_vecAccessTableList[i].TableID == _struct.TableID){
					return;
				}
			}
			
			m_vecAccessTableList.push(_struct);
		}
		public removePlayerTableOwnStatusStruct(_tableID:number):void{
			var _len : number = m_vecAccessTableList.length;
			for (var i:number= 0; i < _len; i++) 
			{
				if(m_vecAccessTableList[i].TableID==_tableID){
					m_vecAccessTableList.splice(i,1);
					return;
				}
			}
			console.log("Error:删除可进桌数据异常...");
		}
		
		//好路多桌
		public addSubscribeTable(_TableID:number):void{
			if (m_vecSubscribed.indexOf(_TableID)==-1){
				m_vecSubscribed.push(_TableID);
			//	console.log("已订阅列表-----"+m_vecSubscribed);
				
			}
		}
		public removeSubscribeTable(_TableID:number):void{
			var _len : number = m_vecSubscribed.length;
			for (var i:number= 0; i < _len; i++) 
			{
				if(m_vecSubscribed[i] == _TableID){
					m_vecSubscribed.splice(i,1);
					break;
				}
			}
		}
		//false-可订阅 	true-已订阅
		public isSubscribed(_TableID:number): boolean{
			return m_vecSubscribed.indexOf(_TableID)!=-1;
		}
		
		
		public clearSubscribed():void{
			while(m_vecSubscribed.length>0){
				m_vecSubscribed.pop();
			}
		}
		
		/** 读取公告 **/
		public readAnnouncement(aAnnouncementList:any[]):void{
			if(aAnnouncementList && aAnnouncementList.length>0){
//				var message : String;
//				var _len : number = aAnnouncementList.length;
//				var _lang : number = LobbyManager.getInstance().lobbyAuth?LobbyManager.getInstance().lobbyAuth.Lang:0;
//				var table : String;
//				for(var i:number= 0 ; i <  _len; i++){
//					table = aAnnouncementList[i][_lang].Title;
//					if(table !=""){
//						if(table == "紧急公告" || table == "緊急公告" || table == "Emerency"||
//							table == "维护" || table == "維護" || table == "Maintain"){
//							
//							LobbyManager.getInstance().lobbyView.urgentNotice.setDataAnnouncement(aAnnouncementList);
//							LobbyManager.getInstance().lobbyView.urgentNotice_game.setDataAnnouncement(aAnnouncementList);
							NoticeManeger.getInstance().setUrgents(aAnnouncementList);
//							return;
//						}
//						
//						message = table + ":" + aAnnouncementList[i][_lang].Msg;
//					}
//					else{
//						message = aAnnouncementList[i][_lang].Msg;
//					}
//					LobbyManager.getInstance().aCloseWindowList.push(LobbyManager.getInstance().showDialog(message,null,null,true,Define.countDown));
//				}
			}
		}
		
		/** 用于维护公告 **/
		public getThemeNameStructByID(_id:number):ThemeNameStruct{
			if(ThemeNameList){
				var _len : number = ThemeNameList.length;
				for (var i:number= 0; i < _len; i++) 
				{
					if(ThemeNameList[i].ThemeID==_id){
						return ThemeNameList[i];
					}
				}
			}
			
			return null;
		}
		
		public getTableNameStructByID(_id:number):TableNameStruct{
			if(TableNameList){
				var _len : number = TableNameList.length;
				for (var i:number= 0; i < _len; i++) 
				{
					if(TableNameList[i].TableID==_id){
						return TableNameList[i];
					}
				}
			}
			
			return null;
		}
		
		/** utc时间转换 **/
		public utcToLocal(nTime:Number):String{
			var utc : Date = new Date();
			utc.setTime(nTime);
			
			var hour : String = utc.hours>9?utc.hours.toString():"0"+utc.hours.toString();
			var minute : String = utc.minutes>9?utc.minutes.toString():"0"+utc.minutes.toString();
			var seconds : String = utc.seconds>9?utc.seconds.toString():"0"+utc.seconds.toString();
			seconds = seconds.slice(0,2);
			
			return hour+":"+minute+":"+seconds;
		}
		public utcToLocal_1(nTime:Number):String{
			var utc : Date = new Date();
			utc.setTime(nTime);
			
			var month : String = (utc.month+1)>9?(utc.month+1).toString():"0"+(utc.month+1).toString();
			var dat : String = utc.date>9?utc.date.toString():"0"+utc.date.toString();
			var hour : String = utc.hours>9?utc.hours.toString():"0"+utc.hours.toString();
			var minute : String = utc.minutes>9?utc.minutes.toString():"0"+utc.minutes.toString();
			var seconds : String = utc.seconds>9?utc.seconds.toString():"0"+utc.seconds.toString();
			seconds = seconds.slice(0,2);
			
			return month + "/" + dat + " " + hour+":"+minute+":"+seconds;
		}

		
	}
}