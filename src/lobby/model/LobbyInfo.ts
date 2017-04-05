module lobby.model {
	export class LobbyInfo {
		protected m_vecorTheme			:	struct.ThemeStruct[];				//各厅资料
		protected m_vectorPanoramaVec	:	struct.PanoramaStruct[];			//全景资料
		public currentPanoramaStruct	:	struct.PanoramaStruct;						//默认全景
		
		public CashInOutUrl				:	String;								//出入金网址
		public vecCDNList				:	struct.VideoCDNStruct[];			//视讯列表	四组CDN_URL
		public CustServiceUrl			:	String;								//客服网址
		public GameLogUrl				:	String;								//游戏记录网址
		public GameRuleUrl				:	String;								//游戏规则网址
		public MobileResolutionList		:	String;								//视讯分辨率
		public NetBetLoginUrl			:	String;								//下注地址
		private m_OnlinePlayers			:	number;								//在线人数
		
		public vecResolutionList		:	struct.ResolutionStruct[];			//解析列表 rtmp://CDN_URL/AppName/StreamName@解析度		
		public Tels						:	String;								//客服電話
		
		public DefThemeID				:	number;								//默认厅馆
		
		/** 本地数据 **/
		public multiTabelStrct			:	struct.TableStruct;						//多桌入口资料(该类型桌子人数最少)
		private m_currentCDN			:	struct.VideoCDNStruct;						//当前频道
		private m_currentResolution		:	struct.ResolutionStruct;					//当前分辨率

		public constructor( oLobbyInfo ) {
			this.CashInOutUrl = oLobbyInfo.CashInOutUrl;
			
			this.vecCDNList = new Array<struct.VideoCDNStruct>();
			
			if(oLobbyInfo.CDNList){
				for (var k:number= 0; k < oLobbyInfo.CDNList.length; k++) 
				{
					this.vecCDNList.push(new struct.VideoCDNStruct(oLobbyInfo.CDNList[k]));
					if(this.vecCDNList[k].IsDef){
						this.currentCDN = this.vecCDNList[k];
					}
				}
			}else{
				console.log("Error:设置CDNList数据异常。。。");
			}
			
			this.CustServiceUrl = oLobbyInfo.CustServiceUrl;
			this.GameLogUrl = oLobbyInfo.GameLogUrl;
			this.GameRuleUrl = oLobbyInfo.GameRuleUrl==null?"":oLobbyInfo.GameRuleUrl;
			this.NetBetLoginUrl = oLobbyInfo.NetBetLoginUrl;
			this.OnlinePlayers = oLobbyInfo.OnlinePlayers;
			
			
			this.m_vecorTheme = new Array<struct.ThemeStruct>();
			
			/* 全景资料	*/
			this.setPanoramaData(oLobbyInfo.PanoramaList);
			
			
			this.vecResolutionList = new Array<struct.ResolutionStruct>();
			if(oLobbyInfo.ResolutionList){
				for (var i2:number= 0; i2 < oLobbyInfo.ResolutionList.length; i2++) 
				{
					this.vecResolutionList.push(new struct.ResolutionStruct(oLobbyInfo.ResolutionList[i2]));
					if(this.vecResolutionList[i2].IsDef){
						this.currentResolution = this.vecResolutionList[i2];
					}
				}
			}else{
				console.log("解析度列表读取异常...");
			}
			
			this.Tels = oLobbyInfo.Tels==null?"":oLobbyInfo.Tels;
			
			/* 各厅资料*/
			var _arrThemeList = oLobbyInfo.ThemeList;
			if( _arrThemeList != null ){
				_arrThemeList.sortOn("SN");
				var uThemeListLen : number = _arrThemeList.length;
				for (var j:number= 0; j < uThemeListLen; j++) 
				{
					if(_arrThemeList[j].ThemeID>0 && _arrThemeList[j].ThemeID<7){
						this.m_vecorTheme.push(new struct.ThemeStruct(_arrThemeList[j]));
					}
				}
				_arrThemeList = null;
			}
			
			this.DefThemeID = oLobbyInfo.DefThemeID;
		}
		
		public setPanoramaData(_arrPanoramaList : any[]):void{
			this.m_vectorPanoramaVec = new Array<struct.PanoramaStruct>();
			
			if ( _arrPanoramaList == null ) {
				return;
			}
			
			var _uLen : number = _arrPanoramaList.length;
			var _panoramaStruct : struct.PanoramaStruct;
			
			for ( var i:number= 0; i < _uLen; i++) {
				_panoramaStruct = new struct.PanoramaStruct(_arrPanoramaList[i]);
				if(_panoramaStruct.IsDef){
					this.currentPanoramaStruct = _panoramaStruct;
				}
				this.m_vectorPanoramaVec.push( _panoramaStruct );
				console.log("StreamUrl:",_panoramaStruct.StreamUrl);
			}
//			if(currentPanoramaStruct==null && m_vectorPanoramaVec.length>0){
//				currentPanoramaStruct = m_vectorPanoramaVec[0];
//			}
			_panoramaStruct = null;
			_arrPanoramaList = null;
		}
		
		get OnlinePlayers():number
		{
			return this.m_OnlinePlayers;
		}

		set  OnlinePlayers(value:number)
		{
			this.m_OnlinePlayers = value;
		}

		get currentResolution():struct.ResolutionStruct
		{
			return this.m_currentResolution;
		}

		set  currentResolution(value:struct.ResolutionStruct)
		{
			this.m_currentResolution = value;
			
		}

		get currentCDN():struct.VideoCDNStruct
		{
			return this.m_currentCDN;
		}

		set  currentCDN(value:struct.VideoCDNStruct)
		{
			this.m_currentCDN = value;
			if(this.m_currentCDN){
				manager.LobbyManager.getInstance().lobbyView.toolView.setBtnChannelValue(this.m_currentCDN.ChannelNo);
			}else{
				manager.LobbyManager.getInstance().lobbyView.toolView.setBtnChannelValue(5);
			}
			
		}
		
		public getChannelIndex(_channelNo:number):number{
			for (var i:number= 0; i < this.vecCDNList.length; i++) 
			{
				if(this.vecCDNList[i].ChannelNo == _channelNo){
					return i+1;
				}
			}
			
			return 1;
		}
		
		public addTableList(_ThemeIndex:number, _themeStruct:struct.ThemeStruct):void{
			this.m_vecorTheme[_ThemeIndex] = _themeStruct;
		}
		public addTable(_ThemeID:number, _tableStruct:struct.TableStruct):void{
			var len : number = this.m_vecorTheme.length;
			for (var i:number= 0; i < len; i++) 
			{
				if(this.m_vecorTheme[i].ThemeID==_ThemeID){
					this.m_vecorTheme[i].addTableStruct(_tableStruct);
					break;
				}
			}
			
		}
		
		public replaceTheme( theme:struct.ThemeStruct ):void {
			var len:number= this.m_vecorTheme.length;
			for (var i:number= 0; i < len; i++) {
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
		public findTheme(_themeID:number):struct.ThemeStruct {
			var len:number= this.m_vecorTheme.length;
			var theme:struct.ThemeStruct;
			for (var i:number= 0; i <len ; i++) {
				if ( this.m_vecorTheme[i].ThemeID == _themeID ) {
					theme = this.m_vecorTheme[i];
					break;
				}
			}
			
			return theme;
		}
		public findTableStructByTT(_themeID:number, _tableID:number):struct.TableStruct{
			var _theme : struct.ThemeStruct = this.findTheme(_themeID);
			var _tableStruct : struct.TableStruct = _theme.findTableStruct(_tableID);
			return _tableStruct;
		}
		
		
		get themeVec():struct.ThemeStruct[]
		{
			return this.m_vecorTheme;
		}
		
		get panoramaVec():struct.PanoramaStruct[] 
		{
			return this.m_vectorPanoramaVec;
		}
		
		set  panoramaVec(_value:struct.PanoramaStruct[] )
		{
			this.m_vectorPanoramaVec = _value;
		}		
		
		/**
		 *	桌子资料 
		 */		
		public findTableStructGT(GameID:number, TableID:number):struct.TableStruct{
			if( this.m_vecorTheme){
				var _uThemeListLen : number = this.m_vecorTheme.length;
				var _themeStruct : struct.ThemeStruct;
				var _tableStruct : struct.TableStruct;
				for (var j:number= 0; j < _uThemeListLen; j++) 
				{
					_themeStruct = this.m_vecorTheme[j];
					for (var i:number= 0; i < _themeStruct.TableList.length; i++) 
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
		
		public getThemeStruct(_themeID:number):struct.ThemeStruct{
			var len : number = this.m_vecorTheme.length;
			for (var i:number= 0; i < len; i++) 
			{
				if(this.m_vecorTheme[i].ThemeID==_themeID){
					return this.m_vecorTheme[i];
				}
			}
			return null;
		}
		
		public getThemeIndex( _iThemeID:number):number{
			var _len : number = this.m_vecorTheme.length;
			for (var i:number= 0; i < _len; i++) 
			{
				if(_iThemeID == this.m_vecorTheme[i].ThemeID){
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
		public setChanelByChannelNo(_channelNo:number, _struct:struct.VideoCDNStruct):void{
			for (var i:number= 0; i < this.vecCDNList.length; i++) 
			{
				if(this.vecCDNList[i].ChannelNo == _channelNo){
					this.vecCDNList[i] = _struct;
					return;
				}
			}
		}
		public getChannelByChannelNo(_channelNo:number):struct.VideoCDNStruct{
			for (var i:number= 0; i < this.vecCDNList.length; i++) 
			{
				if(this.vecCDNList[i].ChannelNo == _channelNo){
					return this.vecCDNList[i];
				}
			}
			
//			if(vecCDNList.length>0){
//				return vecCDNList[0];
//			}
			
			return new struct.VideoCDNStruct({ChannelNo:"0",IsDef:false,CDNUrl:"xxx"});
		}
		public getDefaultCDNStruct():struct.VideoCDNStruct{
			for (var i:number= 0; i < this.vecCDNList.length; i++) 
			{
				if(this.vecCDNList[i].IsDef == true){
					return this.vecCDNList[i];
				}
			}
			return null;
		}
		
		/**
		 *	视讯分辨率 
		 */	
		public setResolutionByPriorityNo(_PriorityNo:number, _struct:struct.ResolutionStruct):void{
			for (var i:number= 0; i < this.vecResolutionList.length; i++) 
			{
				if(this.vecResolutionList[i].PriorityNo == _PriorityNo){
					this.vecResolutionList[i] = _struct;
					return;
				}
			}
		}
		public getResolutionByIndex(_iIndex:number):struct.ResolutionStruct{
			for (var i:number= 0; i < this.vecResolutionList.length; i++) 
			{
				if(this.vecResolutionList[i].PriorityNo == _iIndex){
					return this.vecResolutionList[i];
				}
			}
			
			if(this.vecResolutionList.length>0){
				return this.vecResolutionList[0];
			}
			
			return null;
		}
		
	}
}