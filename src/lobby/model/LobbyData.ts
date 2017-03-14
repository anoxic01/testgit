module lobby.data {
	export class LobbyData {

		public lobbyInfo;
		
//		private const TIME_OUT						:	int		=	2;								//返回超时
		
		private var m_vecAccessTableList			:	Vector.<PlayerTableOwnStatusStruct>;		//可进桌资料	
		private var m_vecAdvList					:	Vector.<AdvertisementStruct>;				//广告列表
		private var m_vecGameBetLimitList			:	Vector.<BetLimitListStruct>;				//限红列表
		private var m_aGoodRoadMapList				:	Array;										//好路讯息
		private var m_aGoodRoadTemp					:	Array;										//临时数据
		private var m_lobbyInfo						:	LobbyInfo;									//大厅信息
//		private var m_vecMarqueeList				:	Vector.<MarqueeStruct>;						//公告列表
		
//		private var m_iRet							:	int		=	-1;								//返回结果
//		private var m_iType							:	int;										//?
		
		public var aSN								:	Array	=	[];								//数据包号
		
		private var aReply							:	Array	=	[0x00,0x05,0x06,0x07,0x08,0x09,0x0A,0x0B,0x11,0x12,0x13,0x14,0x19,0x1A,0x03,0x0E,0x0F,0x10,0x15,0x16,0x17,0x21,0x1C,0x1D,0x1E,0x1F,0x24];	//回复协议		
		
//		private var aChip							:	Array	=	["Chip_Asset_10","Chip_Asset_50","Chip_Asset_100","Chip_Asset_300","Chip_Asset_500",
//																	"Chip_Asset_1000","Chip_Asset_3000","Chip_Asset_5000","Chip_Asset_10000","Chip_Asset_30000",
//																	"Chip_Asset_50000","Chip_Asset_100000","Chip_Asset_300000","Chip_Asset_500000",
//																	"Chip_Asset_x_10","Chip_Asset_x_50","Chip_Asset_x_100","Chip_Asset_x_300","Chip_Asset_x_500",
//																	"Chip_Asset_x_1000","Chip_Asset_x_3000","Chip_Asset_x_5000","Chip_Asset_x_10000","Chip_Asset_x_30000",
//																	"Chip_Asset_x_50000","Chip_Asset_x_100000","Chip_Asset_x_300000","Chip_Asset_x_500000"];
//		private var aSound							:	Array	=	[sound_number_0];
		
		private var m_dicGameNo						:	Dictionary = new Dictionary();
		
		/**	多桌游戏Mode **/
		private var m_dicGameMode					:	Dictionary = new Dictionary();
		
		/** 好路提示类型 **/
		private var m_vecGoodRoadType				:	Vector.<int>	=	new Vector.<int>();
		
		/** 骰宝-珠子 **/
		public var beadRoad_sic						:	* = ResourceManager.getInstance().getInstanceByNameFromDomain(Define.SWF_ROAD_MAP,"linkSicBeadRoad");
		
		/** 好路多桌 **/
		private static var m_vecSubscribed			:	Vector.<int>	=	new Vector.<int>();				//已订阅表
		
		/**  **/
		public static var LTK						:	String			=	"";								//logToKen
		
		private static var m_instance				:	LobbyData;
		
		/** rtmp **/
		private static var m_vecRtmpPlayers			:	Vector.<RTMPPlayer> = new Vector.<RTMPPlayer>();
		
		public var ThemeNameList					:	Vector.<ThemeNameStruct>;
		public var TableNameList					:	Vector.<TableNameStruct>;
		private var m_data							:	Object;
		private var m_bInitMaintainAnnouncement		:	Boolean;
		
		private var m_MaintainTableStruct			:	Vector.<TableStruct> = new Vector.<TableStruct>();										//玩家所在的桌子关闭时，记录
		

		private static instance	:	LobbyData;

		public static getInstance():LobbyData{
			if(this.instance == null){
				this.instance = new LobbyData();
			}
			return this.instance;
     		}

		public constructor() {
		}

		public function addMaintainTableStruct(_tableStruct:TableStruct):void{
			var len : int = m_MaintainTableStruct.length;
			for (var i:int = 0; i < len; i++) 
			{
				if(m_MaintainTableStruct[i].TableID == _tableStruct.TableID){
					return;
				}
			}
			
			m_MaintainTableStruct.push(_tableStruct);
		}
		public function removeMaintainTableStruct(_tableStruct:TableStruct):void{
			var len : int = m_MaintainTableStruct.length;
			for (var i:int = 0; i < len; i++) 
			{
				if(m_MaintainTableStruct[i].TableID == _tableStruct.TableID){
					m_MaintainTableStruct.splice(i,1);
					break;
				}
			}
		}
		public function removeAllMaintainTableStruct():void{
			var len : int = m_MaintainTableStruct.length;
			for (var i:int = 0; i < len; i++) 
			{
				m_MaintainTableStruct.pop();
			}
		}
		public function get MaintainTableStruct():Vector.<TableStruct>{
			return m_MaintainTableStruct;
		}
		public function addRtmpPlayer(r:RTMPPlayer):void{
			if(m_vecRtmpPlayers.indexOf(r)==-1){
//				for (var i:int = 0; i < m_vecRtmpPlayers.length; i++) 
//				{
//					if(m_vecRtmpPlayers[i].stageVideoIndex == r.stageVideoIndex){
//						Log.getInstance().log(this,"使用相同的stagevideo频道"+String(r.stageVideoIndex));
//						return;
//					}
//				}
				
				m_vecRtmpPlayers.push(r);
			}
		}
		public function removeRtmpPlayer(rtmp:RTMPPlayer):void{
			var index:int = m_vecRtmpPlayers.indexOf(rtmp);
			if(index!=-1){
				m_vecRtmpPlayers.splice(index,1);
				
			}
		}
		public function get RtmpPlayers():Vector.<RTMPPlayer>{
			return m_vecRtmpPlayers;
		}
		
		public function get AdvList():Vector.<AdvertisementStruct>
		{
			return m_vecAdvList;
		}

		public function set AdvList(value:Vector.<AdvertisementStruct>):void
		{
			m_vecAdvList = value;
		}

		public static function getInstance():LobbyData{
			
			if(m_instance == null){
				
				m_instance = new LobbyData(new Singleton());
				
			}
			return m_instance;
		}
		
		public function LobbyData(single:Singleton){
			
			if(single==null){
				
				trace("models.LobbyModel初始化异常...");
				
			}
			
		}
		
		/**
		 *	大厅数据 
		 * @param oData
		 * 
		 */		
		public function onLoginLobby( oData:Object ):void{
			m_data = oData;
			
			LTK = m_data.LTK;
			
			m_vecAccessTableList = new Vector.<PlayerTableOwnStatusStruct>;
			var _accessStruct : PlayerTableOwnStatusStruct;
			var _count : int;
			for (var k:int = 0; k < oData.AccessTableList.length; k++) 
			{
				_accessStruct = new PlayerTableOwnStatusStruct(oData.AccessTableList[k]);
				m_vecAccessTableList.push(_accessStruct);
				if(_accessStruct.IsTableOwner){
					_count++;
					Player.getInstance().bIsTableOwner = true;
				}
			}
			if(_count>1){
				trace("异常：玩家包桌数量超过1........");
			}
			if(_accessStruct){
				_accessStruct = null;
			}
			
			setAdvList(oData.AdvList);
			
			
			/* LobbyInfo */
			m_lobbyInfo = new LobbyInfo(oData.LobbyInfo);
			
			/* GameBetLimitList	*/
			m_vecGameBetLimitList = new Vector.<BetLimitListStruct>();
			var _betLimitListStruct : BetLimitListStruct;
			var _arrGameBetLimitList : Array = oData.GameBetLimitList;
			if ( _arrGameBetLimitList != null ) {
				
				var uLen : uint = _arrGameBetLimitList.length;
				for (var i:int = 0; i < uLen; i++) {
					_betLimitListStruct = new BetLimitListStruct(_arrGameBetLimitList[i]);
					m_vecGameBetLimitList.push( _betLimitListStruct );
				}
			}
			_betLimitListStruct = null;
			_arrGameBetLimitList = null;
			
			//好路通知
			m_aGoodRoadMapList = [];
			if (oData.GoodRoadMapList){
				for (var i2:int = 0; i2 < oData.GoodRoadMapList.length; i2++) 
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
//			m_vecMarqueeList = new Vector.<MarqueeStruct>();
//			var marqueeStruct : MarqueeStruct;
//			for (var j:int = 0; j < oData.MarqueeList.length; j++) 
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
			var _type : Array = SharedObjectManager.getGoodRoadSetting();
			var _typeLen : int = _type.length;
			for (var i3:int = 0; i3 < _typeLen; i3++) 
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
		
		public function initMaintainAnnouncement():void{
			if(m_bInitMaintainAnnouncement){
				return;
			}else{
				m_bInitMaintainAnnouncement = true;
				if(m_data.MAList!=null){
//					for (var j:int = 0; j < m_data.MAList.length; j++) 
//					{
//						MAList.push(new MaintainAnnouncementStruct(m_data.MAList[j]));
//					}
					NoticeManeger.getInstance().setMaintains(m_data.MAList);
				}
			}
		}
		
		public function setAdvList(_aAdv : Array):void{
			m_vecAdvList = new Vector.<AdvertisementStruct>;
			
			if(_aAdv){
				var _adLen : int = _aAdv.length;
				if(_adLen>0){
					_aAdv.sortOn("SN",Array.NUMERIC);
					_adLen = _adLen>Define.Advertisement?Define.Advertisement:_adLen;
					for (var i4:int = 0; i4 < _adLen; i4++) 
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
		
		public function get gameBetLimitList():Vector.<BetLimitListStruct> 
		{
			return m_vecGameBetLimitList;
		}
		
		public function set gameBetLimitList(value:Vector.<BetLimitListStruct>):void 
		{
			m_vecGameBetLimitList = value;
		}
		
		public function getBetLimitByGameID(_gameID:int):BetLimitListStruct{
			var _betLimitListStruct : BetLimitListStruct;
			var _len : int = m_vecGameBetLimitList.length;
			for (var i:int = 0; i < _len; i++) 
			{
				if(m_vecGameBetLimitList[i].GameID == _gameID){
					_betLimitListStruct = m_vecGameBetLimitList[i];
					return _betLimitListStruct;
				}
			}
			trace("找不到对应的限红数据...");
			return _betLimitListStruct;
		}
		public function getBetLimitByGL(_gameID:int, _limitID:int):BetLimitStruct{
			var _betLimitListStruct : BetLimitListStruct = getBetLimitByGameID(_gameID);
			var _len : int = _betLimitListStruct.vecBetLimitList.length;
			for (var i:int = 0; i < _len; i++) 
			{
				if(_betLimitListStruct.vecBetLimitList[i].ID==_limitID){
					return _betLimitListStruct.vecBetLimitList[i];
				}
			}
			
			return null;
		}
		
		//从好路列表中取出指定数量的好路
		public function getGoodRoadToGame(_iCount:int):Vector.<GoodRoadStruct>{
			var _struct : TableStruct;
			var _len : int = m_aGoodRoadMapList.length>_iCount?_iCount:m_aGoodRoadMapList.length;
			var _vec : Vector.<GoodRoadStruct> = new Vector.<GoodRoadStruct>;
			for (var i:int = 0; i < _len; i++) 
			{
				_struct = lobbyInfo.findTableStructGT(GameDefine.BAC, (m_aGoodRoadMapList[i] as GoodRoadStruct).TableID);
				if(_struct){
					_vec.push(m_aGoodRoadMapList[i]);
				}
			}
			
			return _vec;
		}
		
		public function get aGoodRoadMapList():Array
		{
			return m_aGoodRoadMapList;
		}
		
		public function set aGoodRoadMapList(value:Array):void
		{
			m_aGoodRoadMapList = value;
		}
		//新增好路
		public function addGoodRoadMap(_goodRoadMapStruct:GoodRoadStruct):void{
			if(_goodRoadMapStruct.GameID==GameDefine.BAC){
				if(judgeAdd(_goodRoadMapStruct)){
//					trace("加入好路：",_goodRoadMapStruct.TableID);
					m_aGoodRoadMapList.push(_goodRoadMapStruct);
				}
				
				//是否通知好路
				if( judgeToNotificationGoodRoad(_goodRoadMapStruct) ){
					if(judgeAddTemp(_goodRoadMapStruct)){
//						trace("加入好路临时列表：",_goodRoadMapStruct.TableID);
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
		private function judgeAdd(_goodRoadMapStruct:GoodRoadStruct):Boolean{
			var _len : int = m_aGoodRoadMapList.length;
			for (var i:int = 0; i < _len; i++) 
			{
				if(m_aGoodRoadMapList[i].TableID == _goodRoadMapStruct.TableID){
					m_aGoodRoadMapList[i].MatchList = _goodRoadMapStruct.MatchList;
					return false;
				}
			}
			
			return true;
		}
		
		//判断好路是否添加过
		private function judgeAddTemp(_goodRoadMapStruct:GoodRoadStruct):Boolean{
			var _len : int = m_aGoodRoadTemp.length;
			for (var i:int = 0; i < _len; i++) 
			{
				if(m_aGoodRoadTemp[i].TableID == _goodRoadMapStruct.TableID){
					m_aGoodRoadTemp[i].MatchList = _goodRoadMapStruct.MatchList;
					return false;
				}
			}
			
			return true;
		}
		
		public function removeGoodRoadMap(_TableID:int):void{
			//移除临时列表中
			removeGoodRoadTemp(_TableID);
			
			var _len : int = m_aGoodRoadMapList.length;
			for (var i:int = 0; i < _len; i++) 
			{
				if(_TableID == m_aGoodRoadMapList[i].TableID){
					m_aGoodRoadMapList.splice(i,1);
					
					LobbyManager.getInstance().removeGoodRoadNotification(_TableID);
					break;
				}
			}
			
		}

		
		//多桌出现空桌时，取新好路填充
		public function getGoodRoad():GoodRoadStruct{
			if(m_aGoodRoadTemp.length>0){
				return m_aGoodRoadTemp.shift() as GoodRoadStruct;
			}
			return null;
		}
		public function getGoodRoadByIndex(_index:int):GoodRoadStruct{
			var struct : GoodRoadStruct = m_aGoodRoadTemp[_index];
			if(struct!=null){
				m_aGoodRoadTemp.splice(_index,1);
			}
			return struct;
		}
		
		//重置临时好路列表
		public function resetGoodRoadTemp():void{
			m_aGoodRoadTemp = [];
			var _len : int = m_aGoodRoadMapList.length;
			var _goodRoadStruct : GoodRoadStruct;
			for (var i:int = 0; i < _len; i++) 
			{
				if(judgeToNotificationGoodRoad(m_aGoodRoadMapList[i])){
					_goodRoadStruct = new GoodRoadStruct();
					_goodRoadStruct.GameID = m_aGoodRoadMapList[i].GameID;
					_goodRoadStruct.TableID = m_aGoodRoadMapList[i].TableID;
					_goodRoadStruct.MatchList = (m_aGoodRoadMapList[i].MatchList as Array).slice();
					m_aGoodRoadTemp.push(_goodRoadStruct);
				}
			}
			if(_goodRoadStruct){
				_goodRoadStruct = null;
			}
		}
		private function addGoodRoadTemp(_goodRoadStruct:GoodRoadStruct):void{
			var goodRoadStruct : GoodRoadStruct;
			goodRoadStruct = new GoodRoadStruct();
			goodRoadStruct.GameID = _goodRoadStruct.GameID;
			goodRoadStruct.TableID = _goodRoadStruct.TableID;
			goodRoadStruct.MatchList = (_goodRoadStruct.MatchList as Array).slice();
			
			m_aGoodRoadTemp.push(goodRoadStruct);
		}
		private function removeGoodRoadTemp(_TableID:int):void{
			var _len : int = m_aGoodRoadTemp.length;
			for (var i:int = 0; i < _len; i++) 
			{
				if(_TableID == m_aGoodRoadTemp[i].TableID){
					m_aGoodRoadTemp.splice(i,1);
					break;
				}
			}
		}
		
		public function addMarquee(struct:MarqueeStruct):void{
//			m_vecMarqueeList.unshift(struct);
		}
		public function get MarqueeList():Vector.<MarqueeStruct> 
		{
//			return m_vecMarqueeList;
			return null;
		}
		
		public function set MarqueeList(value:Vector.<MarqueeStruct>):void 
		{
//			if(value==null){
//				value = new Vector.<MarqueeStruct>();
//			}
//			m_vecMarqueeList = value;
//			LobbyManager.getInstance().lobbyView.infomation.marquee.setData();
		}
		
		public function get lobbyInfo():LobbyInfo 
		{
			return m_lobbyInfo;
		}
		
		public function set lobbyInfo(value:LobbyInfo):void 
		{
			m_lobbyInfo = value;
		}
		
		
		
		/**
		 *	多桌入口 
		 * @return 
		 * 
		 */		
		public function getMultiTableStruct(uGameID:uint):TableStruct{
			var _len:int = m_lobbyInfo.themeVec.length;
			var _struct:TableStruct;
			
			if(m_lobbyInfo.themeVec[0] && m_lobbyInfo.themeVec[0].TableList[0]){
				m_lobbyInfo.multiTabelStrct = m_lobbyInfo.themeVec[0].TableList[0];
			}else{
				trace("桌子数据为空...");
				return null;
			}
			
			for (var i:int = 0; i <_len ; i++) {
				for (var j:int = 0; j < m_lobbyInfo.themeVec[i].TableList.length; j++) 
				{
					if ( m_lobbyInfo.themeVec[i].TableList[j].GameID == uGameID ) {
						_struct = m_lobbyInfo.themeVec[i].TableList[j];
						if(m_lobbyInfo.multiTabelStrct.OnlinePlayers > _struct.OnlinePlayers){
							m_lobbyInfo.multiTabelStrct = _struct;
						}
					}
				}
			}
			
			return m_lobbyInfo.multiTabelStrct;
		}
		public function getTableStructByTableID( _tableID:int):TableStruct{
			var _len:int = m_lobbyInfo.themeVec.length;
			
			for (var i:int = 0; i <_len ; i++) {
				for (var j:int = 0; j < m_lobbyInfo.themeVec[i].TableList.length; j++) 
				{
					if ( m_lobbyInfo.themeVec[i].TableList[j].TableID == _tableID ) {
						return m_lobbyInfo.themeVec[i].TableList[j];
						
					}
				}
			}
			
			return null;
		}
		
		/**
		 *	回复序号 
		 */		
		public function addSN(_sn:uint, _error:Boolean):void{
			var struct : SNStruct = new SNStruct();
			struct.SN = _sn;
			struct.ERROR = _error;
			
			aSN.push(struct);
		}
		public function getSN():SNStruct{
			if(aSN.length>0){
				var struct : SNStruct = aSN.shift();
				return struct;
			}else{
				trace("回复收包序号异常...");
			}
			return null;
		}
		public function needReply( _type:uint ):Boolean{
			return aReply.indexOf(_type)!=-1;
		}
		
		/**
		 *	好路通知 
		 */		
		public function judgeToNotificationGoodRoad(_struct:GoodRoadStruct):Boolean{
			var _len : int = _struct.MatchList.length;
			for (var i:int = 0; i <_len; i++) 
			{
				if(m_vecGoodRoadType.indexOf(_struct.MatchList[i]) != -1){
					return true;
				}
			}
			return false;
		}
		
		/**
		 *	游戏局数 
		 */
		public function getTableGameNo(_TableID:int):int{
			if(m_dicGameNo[_TableID]==null){
				m_dicGameNo[_TableID] = 0;
			}
			return m_dicGameNo[_TableID];
		}
		
		/** 多桌游戏model **/
		public function addGameModel(_TableID:int,gameModel:GameModel):void{
				m_dicGameMode[_TableID] =gameModel;
		}
		public function removeGameMode(_TableID:int):void{
			if(m_dicGameMode[_TableID]){
				delete m_dicGameMode[_TableID];
			}
		}
		public function getGameModel(_TableID:int):GameModel{
			if(m_dicGameMode[_TableID] != null){
				return m_dicGameMode[_TableID];
			}
			return null;
		}
		
		
		/**
		 * 好路提示类型 
		 */		
		public function addGoodRoadType(_iType:int):void{
			if(m_vecGoodRoadType.indexOf(_iType)==-1){
				m_vecGoodRoadType.push(_iType);
			}
		}
		public function removeGoodRoadType(_iType:int):void{
			var index:int =m_vecGoodRoadType.indexOf(_iType);
			if (index>-1){
				m_vecGoodRoadType.splice(index, 1);
			}
		}
		public function judgeGoodRoadType(_iType:int):Boolean{
			return m_vecGoodRoadType.indexOf(_iType) != -1;
		}
		public function getGoodRoadTypeCount():Number{
			return m_vecGoodRoadType.length;
		}
		/**
		 *	可进桌判断 
		 */		
		public function isAccess(_tableID:int):Boolean{
			var _len : int = m_vecAccessTableList.length;
			for (var i:int = 0; i < _len; i++) 
			{
				if(m_vecAccessTableList[i].TableID==_tableID){
					return true;
				}
			}
			
			return false;
		}
		public function getPlayerTableOwnStatusStruct(_tableID:int):PlayerTableOwnStatusStruct{
			var _len : int = m_vecAccessTableList.length;
			for (var i:int = 0; i < _len; i++) 
			{
				if(m_vecAccessTableList[i].TableID==_tableID){
					return m_vecAccessTableList[i];
				}
			}
			
			return null;
		}
		public function addPlayerTableOwnStatusStruct(_struct:PlayerTableOwnStatusStruct):void{
			var _len : int = m_vecAccessTableList.length;
			for (var i:int = 0; i < _len; i++) 
			{
				if(m_vecAccessTableList[i].TableID == _struct.TableID){
					return;
				}
			}
			
			m_vecAccessTableList.push(_struct);
		}
		public function removePlayerTableOwnStatusStruct(_tableID:int):void{
			var _len : int = m_vecAccessTableList.length;
			for (var i:int = 0; i < _len; i++) 
			{
				if(m_vecAccessTableList[i].TableID==_tableID){
					m_vecAccessTableList.splice(i,1);
					return;
				}
			}
			trace("Error:删除可进桌数据异常...");
		}
		
		//好路多桌
		public function addSubscribeTable(_TableID:int):void{
			if (m_vecSubscribed.indexOf(_TableID)==-1){
				m_vecSubscribed.push(_TableID);
			//	trace("已订阅列表-----"+m_vecSubscribed);
				
			}
		}
		public function removeSubscribeTable(_TableID:int):void{
			var _len : int = m_vecSubscribed.length;
			for (var i:int = 0; i < _len; i++) 
			{
				if(m_vecSubscribed[i] == _TableID){
					m_vecSubscribed.splice(i,1);
					break;
				}
			}
		}
		//false-可订阅 	true-已订阅
		public function isSubscribed(_TableID:int):Boolean{
			return m_vecSubscribed.indexOf(_TableID)!=-1;
		}
		
		
		public function clearSubscribed():void{
			while(m_vecSubscribed.length>0){
				m_vecSubscribed.pop();
			}
		}
		
		/** 读取公告 **/
		public function readAnnouncement(aAnnouncementList:Array):void{
			if(aAnnouncementList && aAnnouncementList.length>0){
//				var message : String;
//				var _len : int = aAnnouncementList.length;
//				var _lang : int = LobbyManager.getInstance().lobbyAuth?LobbyManager.getInstance().lobbyAuth.Lang:0;
//				var table : String;
//				for(var i:int = 0 ; i <  _len; i++){
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
		public function getThemeNameStructByID(_id:int):ThemeNameStruct{
			if(ThemeNameList){
				var _len : int = ThemeNameList.length;
				for (var i:int = 0; i < _len; i++) 
				{
					if(ThemeNameList[i].ThemeID==_id){
						return ThemeNameList[i];
					}
				}
			}
			
			return null;
		}
		
		public function getTableNameStructByID(_id:int):TableNameStruct{
			if(TableNameList){
				var _len : int = TableNameList.length;
				for (var i:int = 0; i < _len; i++) 
				{
					if(TableNameList[i].TableID==_id){
						return TableNameList[i];
					}
				}
			}
			
			return null;
		}
		
		/** utc时间转换 **/
		public function utcToLocal(nTime:Number):String{
			var utc : Date = new Date();
			utc.setTime(nTime);
			
			var hour : String = utc.hours>9?utc.hours.toString():"0"+utc.hours.toString();
			var minute : String = utc.minutes>9?utc.minutes.toString():"0"+utc.minutes.toString();
			var seconds : String = utc.seconds>9?utc.seconds.toString():"0"+utc.seconds.toString();
			seconds = seconds.slice(0,2);
			
			return hour+":"+minute+":"+seconds;
		}
		public function utcToLocal_1(nTime:Number):String{
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