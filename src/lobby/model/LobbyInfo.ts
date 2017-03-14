module lobby.model {
	export class LobbyInfo {
		protected var m_vecorTheme			:	Vector.<ThemeStruct>;				//各厅资料
		protected var m_vectorPanoramaVec	:	Vector.<PanoramaStruct>;			//全景资料
		public var currentPanoramaStruct	:	PanoramaStruct;						//默认全景
		
		public var CashInOutUrl				:	String;								//出入金网址
		public var vecCDNList				:	Vector.<VideoCDNStruct>;			//视讯列表	四组CDN_URL
		public var CustServiceUrl			:	String;								//客服网址
		public var GameLogUrl				:	String;								//游戏记录网址
		public var GameRuleUrl				:	String;								//游戏规则网址
		public var MobileResolutionList		:	String;								//视讯分辨率
		public var NetBetLoginUrl			:	String;								//下注地址
		private var m_OnlinePlayers			:	int;								//在线人数
		
		public var vecResolutionList		:	Vector.<ResolutionStruct>;			//解析列表 rtmp://CDN_URL/AppName/StreamName@解析度		
		public var Tels						:	String;								//客服電話
		
		public var DefThemeID				:	int;								//默认厅馆
		
		/** 本地数据 **/
		public var multiTabelStrct			:	TableStruct;						//多桌入口资料(该类型桌子人数最少)
		private var m_currentCDN			:	VideoCDNStruct;						//当前频道
		private var m_currentResolution		:	ResolutionStruct;					//当前分辨率

		public constructor( oLobbyInfo:Object ) {
			CashInOutUrl = oLobbyInfo.CashInOutUrl;
			
			vecCDNList = new Vector.<VideoCDNStruct>;
			
			if(oLobbyInfo.CDNList){
				for (var k:int = 0; k < oLobbyInfo.CDNList.length; k++) 
				{
					vecCDNList.push(new VideoCDNStruct(oLobbyInfo.CDNList[k]));
					if(vecCDNList[k].IsDef){
						currentCDN = vecCDNList[k];
					}
				}
			}else{
				trace("Error:设置CDNList数据异常。。。");
			}
			
			CustServiceUrl = oLobbyInfo.CustServiceUrl;
			GameLogUrl = oLobbyInfo.GameLogUrl;
			GameRuleUrl = oLobbyInfo.GameRuleUrl==null?"":oLobbyInfo.GameRuleUrl;
			NetBetLoginUrl = oLobbyInfo.NetBetLoginUrl;
			OnlinePlayers = oLobbyInfo.OnlinePlayers;
			
			
			this.m_vecorTheme = new Vector.<ThemeStruct>();
			
			/* 全景资料	*/
			setPanoramaData(oLobbyInfo.PanoramaList);
			
			
			vecResolutionList = new Vector.<ResolutionStruct>;
			if(oLobbyInfo.ResolutionList){
				for (var i2:int = 0; i2 < oLobbyInfo.ResolutionList.length; i2++) 
				{
					vecResolutionList.push(new ResolutionStruct(oLobbyInfo.ResolutionList[i2]));
					if(vecResolutionList[i2].IsDef){
						currentResolution = vecResolutionList[i2];
					}
				}
			}else{
				trace("解析度列表读取异常...");
			}
			
			Tels = oLobbyInfo.Tels==null?"":oLobbyInfo.Tels;
			
			/* 各厅资料*/
			var _arrThemeList : Array = oLobbyInfo.ThemeList;
			if( _arrThemeList != null ){
				_arrThemeList.sortOn("SN",Array.NUMERIC);
				var uThemeListLen : uint = _arrThemeList.length;
				for (var j:int = 0; j < uThemeListLen; j++) 
				{
					if(_arrThemeList[j].ThemeID>0 && _arrThemeList[j].ThemeID<7){
						m_vecorTheme.push(new ThemeStruct(_arrThemeList[j]));
					}
				}
				_arrThemeList = null;
			}
			
			DefThemeID = oLobbyInfo.DefThemeID;
		}
		
		public function setPanoramaData(_arrPanoramaList : Array):void{
			this.m_vectorPanoramaVec = new Vector.<PanoramaStruct>();
			
			if ( _arrPanoramaList == null ) {
				return;
			}
			
			var _uLen : uint = _arrPanoramaList.length;
			var _panoramaStruct : PanoramaStruct;
			
			for ( var i:int = 0; i < _uLen; i++) {
				_panoramaStruct = new PanoramaStruct(_arrPanoramaList[i]);
				if(_panoramaStruct.IsDef){
					currentPanoramaStruct = _panoramaStruct;
				}
				m_vectorPanoramaVec.push( _panoramaStruct );
				trace("StreamUrl:",_panoramaStruct.StreamUrl);
			}
//			if(currentPanoramaStruct==null && m_vectorPanoramaVec.length>0){
//				currentPanoramaStruct = m_vectorPanoramaVec[0];
//			}
			_panoramaStruct = null;
			_arrPanoramaList = null;
		}
		
		public function get OnlinePlayers():int
		{
			return m_OnlinePlayers;
		}

		public function set OnlinePlayers(value:int):void
		{
			m_OnlinePlayers = value;
		}

		public function get currentResolution():ResolutionStruct
		{
			return m_currentResolution;
		}

		public function set currentResolution(value:ResolutionStruct):void
		{
			m_currentResolution = value;
			
		}

		public function get currentCDN():VideoCDNStruct
		{
			return m_currentCDN;
		}

		public function set currentCDN(value:VideoCDNStruct):void
		{
			m_currentCDN = value;
			if(m_currentCDN){
				LobbyManager.getInstance().lobbyView.toolView.setBtnChannelValue(m_currentCDN.ChannelNo);
			}else{
				LobbyManager.getInstance().lobbyView.toolView.setBtnChannelValue(5);
			}
			
		}
		
		public function getChannelIndex(_channelNo:int):int{
			for (var i:int = 0; i < vecCDNList.length; i++) 
			{
				if(vecCDNList[i].ChannelNo == _channelNo){
					return i+1;
				}
			}
			
			return 1;
		}
		
		public function addTableList(_ThemeIndex:int, _themeStruct:ThemeStruct):void{
			m_vecorTheme[_ThemeIndex] = _themeStruct;
		}
		public function addTable(_ThemeID:int, _tableStruct:TableStruct):void{
			var len : int = m_vecorTheme.length;
			for (var i:int = 0; i < len; i++) 
			{
				if(m_vecorTheme[i].ThemeID==_ThemeID){
					m_vecorTheme[i].addTableStruct(_tableStruct);
					break;
				}
			}
			
		}
		
		public function replaceTheme( theme:ThemeStruct ):void {
			var len:int = this.m_vecorTheme.length;
			for (var i:int = 0; i < len; i++) {
				if ( this.m_vecorTheme[i].ThemeID == theme.ThemeID ) {
					this.m_vecorTheme[i] = theme;
					break;
				}
			}
		}

		
		/**
		 * 找廳館資料
		 * @param	themeID
		 * @return
		 */
		public function findTheme(_themeID:int):ThemeStruct {
			var len:int = m_vecorTheme.length;
			var theme:ThemeStruct;
			for (var i:int = 0; i <len ; i++) {
				if ( m_vecorTheme[i].ThemeID == _themeID ) {
					theme = m_vecorTheme[i];
					break;
				}
			}
			
			return theme;
		}
		public function findTableStructByTT(_themeID:int, _tableID:uint):TableStruct{
			var _theme : ThemeStruct = findTheme(_themeID);
			var _tableStruct : TableStruct = _theme.findTableStruct(_tableID);
			return _tableStruct;
		}
		
		
		public function get themeVec():Vector.<ThemeStruct> 
		{
			return m_vecorTheme;
		}
		
		public function get panoramaVec():Vector.<PanoramaStruct> 
		{
			return m_vectorPanoramaVec;
		}
		
		public function set panoramaVec(_value:Vector.<PanoramaStruct> ):void
		{
			m_vectorPanoramaVec = _value;
		}		
		
		/**
		 *	桌子资料 
		 */		
		public function findTableStructGT(GameID:int, TableID:int):TableStruct{
			if( m_vecorTheme){
				var _uThemeListLen : uint = m_vecorTheme.length;
				var _themeStruct : ThemeStruct;
				var _tableStruct : TableStruct;
				for (var j:int = 0; j < _uThemeListLen; j++) 
				{
					_themeStruct = m_vecorTheme[j];
					for (var i:int = 0; i < _themeStruct.TableList.length; i++) 
					{
						if((_themeStruct.TableList[i].GameID==GameID) && (_themeStruct.TableList[i].TableID==TableID)){
							_tableStruct = _themeStruct.TableList[i];
							return _tableStruct;
						}
					}
					
				}
				
			}
			_themeStruct = null;
			
			return _tableStruct;
		}
		
		public function getThemeStruct(_themeID:int):ThemeStruct{
			var len : int = m_vecorTheme.length;
			for (var i:int = 0; i < len; i++) 
			{
				if(m_vecorTheme[i].ThemeID==_themeID){
					return m_vecorTheme[i];
				}
			}
			return null;
		}
		
		public function getThemeIndex( _iThemeID:int):int{
			var _len : int = m_vecorTheme.length;
			for (var i:int = 0; i < _len; i++) 
			{
				if(_iThemeID == m_vecorTheme[i].ThemeID){
					return i;
				}
			}
			return 0;
		}
		
		
		/**
		 *	视讯资料 
		 * @param _iIndex
		 * @return 
		 * 
		 */		
		public function setChanelByChannelNo(_channelNo:int, _struct:VideoCDNStruct):void{
			for (var i:int = 0; i < vecCDNList.length; i++) 
			{
				if(vecCDNList[i].ChannelNo == _channelNo){
					vecCDNList[i] = _struct;
					return;
				}
			}
		}
		public function getChannelByChannelNo(_channelNo:int):VideoCDNStruct{
			for (var i:int = 0; i < vecCDNList.length; i++) 
			{
				if(vecCDNList[i].ChannelNo == _channelNo){
					return vecCDNList[i];
				}
			}
			
//			if(vecCDNList.length>0){
//				return vecCDNList[0];
//			}
			
			return new VideoCDNStruct({ChannelNo:"0",IsDef:false,CDNUrl:"xxx"});
		}
		public function getDefaultCDNStruct():VideoCDNStruct{
			for (var i:int = 0; i < vecCDNList.length; i++) 
			{
				if(vecCDNList[i].IsDef == true){
					return vecCDNList[i];
				}
			}
			return null;
		}
		
		/**
		 *	视讯分辨率 
		 */	
		public function setResolutionByPriorityNo(_PriorityNo:int, _struct:ResolutionStruct):void{
			for (var i:int = 0; i < vecResolutionList.length; i++) 
			{
				if(vecResolutionList[i].PriorityNo == _PriorityNo){
					vecResolutionList[i] = _struct;
					return;
				}
			}
		}
		public function getResolutionByIndex(_iIndex:int):ResolutionStruct{
			for (var i:int = 0; i < vecResolutionList.length; i++) 
			{
				if(vecResolutionList[i].PriorityNo == _iIndex){
					return vecResolutionList[i];
				}
			}
			
			if(vecResolutionList.length>0){
				return vecResolutionList[0];
			}
			
			return null;
		}
		
	}
}