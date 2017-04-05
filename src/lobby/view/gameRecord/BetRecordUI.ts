module lobby.view.gameRecord {
	export class BetRecordUI extends panel.PanelWindow{
		public txtStartTime					:	Text;								//開始時間
		public txtEndTime					:	Text;								//結束時間
		
		public selectStartTime				:	ui.button.SingleButtonMC;						//選擇開始時間
		public selectEndTime				:	ui.button.SingleButtonMC; 					//選擇結束時間
		
		public search						:	Btn; 								//查詢按鈕
		
		public txt_SingleShowPage			:	Text;								//單頁顯示
		public txt_TotalPage				:	Text;								//總頁數
		public txt_Page						:	Text;								//頁數
		
		public singleShowCount				:	number;								//單頁顯示幾筆
		public totalShowCount				:	number;								//共計幾筆
		
		public btnGo						:	ui.button.SingleButtonMC; 					//查詢按鈕
		
		public subListDistanceY				:	number 	=	30;						//下注細單 Y間距
		public mcMoveLight					;							//滑鼠移動亮條
		public mcClickLight					;							//滑鼠選擇亮條
		public mcPos						;							//下注細單 對位元件
		
		public btnClose						:	ui.button.SingleButtonMC;
		public btnFirstPage					:	ui.button.SingleButtonMC;						//第1頁
		public btnLastPage					:	ui.button.SingleButtonMC;						//最後1頁
		public btnPreviousPage				:	ui.button.SingleButtonMC;						//上1頁
		public btnNextPage					:	ui.button.SingleButtonMC;						//下1頁	
		
		public txt_inputPage				:	Text;								//輸入頁數框
		
		private m_iCurrentPage				:	number 	= 	1;						//當前頁碼
		private m_iCurrentIdx				:	number 	= 	0;						//當前索引
		private m_iMaxPage					:	number 	= 	1;						//最大頁數
		private m_iDataSize					:	number 	= 	0;						//資料筆數
		
		public gameID						:	number;
		public sStartTime					:	string;								//開始時間
		public sEndTime						:	string;								//結束時間
		
		private sPreStartTime				:	string;								//上一個搜尋的開始時間
		private sPreEndTime					:	string;								//上一個搜尋的結束時間
		
		public iRequestDataSize				:	number 	= 	12;						//要求資料筆數
		
		public txtBetGold_Sum				:	Text;								//下注金額(小計)
		public txtPayOut_Sum				:	Text;								//派彩(小計)
		public txtAvailableBet_Sum			:	Text;								//有效投注(小計)
		
		public txtBetGold_Total_Sum			:	Text;								//下注金額(總計)
		public txtPayOut_Total_Sum			:	Text;								//派彩(總計)
		public txtAvailableBet_Total_Sum	:	Text;								//有效投注(總計)
		
		private m_pool						: 	pool.SubListPool;
		public _dateChooser					: 	dates.DatePannel;
		public gameRecordApiStruct			: 	model.struct.GameRecordApiStruct;				//下注紀錄資料
		
		public m_txtInput					;							//輸入頁碼
		
		private m_nMinSearchTime			: 	number 	= 	0;						//最小可搜尋的  開始日期 毫秒
		private m_nMaxSearchTime			: 	number 	= 	0;						//最大可搜尋的 結束日期 毫秒
		
		private m_startYear					: 	number		= 	0;
		private m_startMonth				: 	number 	= 	0;
		private m_startDay					: 	number 	= 	0;
		
		private m_searchEndYear				: 	number 	= 	0;
		private m_searchEndMonth			: 	number 	= 	0;
		private m_searchEndDay				: 	number 	= 	0;		
		
		private m_searchStartYear			:	number 	= 	0;
		private m_searchStartMonth			:	number 	= 	0;
		private m_searchStartDay			: 	number 	= 	0;
		
		private m_gameLogListStruct			:	model.struct.GameRecordApiStruct;
		private m_mcNoLog					;
		private m_loading					;									//加载图标
		private m_selectSubList				: 	sub.SubBetList;							//選擇子單
		private m_stage						: 	egret.Stage;								//
		
		
		public constructor(_mcAsset ,$bShake: boolean = false ) {
			super( $bShake );
			
			this.m_mcAsset 		= _mcAsset;
			this.m_mcHot 		= _mcAsset.mc_hot;
			this.txtStartTime	= new Text( _mcAsset.betStartTime);
			this.txtEndTime		= new Text( _mcAsset.betEndTime);
			
			this.selectStartTime = new ui.button.SingleButtonMC(  _mcAsset.selectStartTime , this.selectStartTimeHandler );
			this.selectEndTime 	= new ui.button.SingleButtonMC(  _mcAsset.selectEndTime , this.selectEndTimeHandler );
			this.search			= new Btn( _mcAsset.mc_search , this.searchBetGameRecord , language.Language.sSearch );
			
			this.txt_SingleShowPage =  new Text( _mcAsset.tf_9 );
			this.txt_TotalPage = new Text( _mcAsset.tf_10 );
			this.txt_Page 	  =	new Text(  _mcAsset.tf_page );
			
			this.btnGo	= new ui.button.SingleButtonMC(_mcAsset.mc_go , this.goPage );
			this.mcMoveLight  = _mcAsset.mc_moveLight;
			this.mcMoveLight.visible = false;
			this.mcClickLight = _mcAsset.mc_ClickLight;
			this.mcClickLight.visible = false;
			
			this.mcPos	= _mcAsset.mc_pos;
			this.btnClose = new ui.button.SingleButtonMC( _mcAsset.mc_close , this.closeWindowHandler );
			
			this.nAssetWidth = this.m_mcAsset.width + 50;
			this.nAssetHeight = this.m_mcAsset.height + 50;
			
			this.btnFirstPage = new ui.button.SingleButtonMC(_mcAsset.mc_0 , this.firstPageHandler );
			this.btnLastPage = new ui.button.SingleButtonMC(_mcAsset.mc_3 , this.lastPageHandler );
			this.btnPreviousPage = new ui.button.SingleButtonMC( _mcAsset.mc_1 , this.previousPageHandler );
			this.btnNextPage = new  ui.button.SingleButtonMC( _mcAsset.mc_2 , this.nextPageHandler );
			
//			mc_input = new Btn2( _mcAsset.mc_input );
			_mcAsset.mc_input.gotoAndStop(1);
			// MovieClip(_mcAsset.mc_input).mouseChildren = false;
			// MovieClip(_mcAsset.mc_input).mouseEnabled = false;
			
			this.addChild( this.m_mcAsset );
			
			this.txtBetGold_Sum 			= new Text( _mcAsset.tf_log_1);
			this.txtPayOut_Sum 			= new Text( _mcAsset.tf_log_2);
			this.txtAvailableBet_Sum 	= new Text( _mcAsset.tf_log_3);
			
			
			this.txtBetGold_Total_Sum		= new Text( _mcAsset.tf_log_5);
			this.txtPayOut_Total_Sum			= new Text( _mcAsset.tf_log_6);
			this.txtAvailableBet_Total_Sum	= new Text( _mcAsset.tf_log_7);
			
			this.m_pool = new pool.SubListPool();
			this._dateChooser = new dates.DatePannel();
			this._dateChooser.visible = false;
			
			this.addChild( this._dateChooser );
			
			this.txt_SingleShowPage.text =  "" + (this.iRequestDataSize).toString;
			this.m_txtInput = _mcAsset.tf_input;
			// this.m_txtInput.type = TextFieldType.INPUT;
			this.m_txtInput.addEventListener( egret.TextEvent.LINK , this.playerInput );
			this.m_txtInput.restrict = "0-9";
			this.m_txtInput.addEventListener(mouse.MouseEvent.MOUSE_MOVE , this.mouseHandler );
			this.m_txtInput.addEventListener(mouse.MouseEvent.MOUSE_OUT , this.mouseHandler );
			this.m_txtInput.maxChars = 5;
		
			var _nowDate :Date = new Date( this._dateChooser.iCurrentYear , this._dateChooser.iCurrentMonth , this._dateChooser.iCurrentDay );
			
			this.m_nMinSearchTime = _nowDate.getTime();
			this.m_nMaxSearchTime = this.m_nMinSearchTime;
			
//			this.txtStartTime.txtAsset.autoSize = TextFieldAutoSize.RIGHT;
			this.txtStartTime.text = ( this._dateChooser.iCurrentYear ).toString + "/" + ( this._dateChooser.iCurrentMonth+1 ).toString + "/" + (  this._dateChooser.iCurrentDay ).toString;
//			this.txtEndTime.txtAsset.autoSize = TextFieldAutoSize.RIGHT;
			this.txtEndTime.text = ( this._dateChooser.iCurrentYear ).toString + "/" + ( this._dateChooser.iCurrentMonth+1 ).toString + "/" + (  this._dateChooser.iCurrentDay ).toString;
			
			//開始日期 跟 結束日期
			this.m_startYear = this.m_searchEndYear = this._dateChooser.iCurrentYear;
			this.m_startMonth = this.m_searchEndMonth = this._dateChooser.iCurrentMonth;
			this.m_startDay = this.m_searchEndDay = this._dateChooser.iCurrentDay;
			
			this.m_mcNoLog  = this.m_mcAsset.mc_No_log;
			this.m_mcNoLog.visible = false;
			
			this.m_loading = manager.ResourceManager.getInstance().getInstanceByNameFromDomain(define.Define.SWF_LOBBY,"LoadingLiveAsset");
			this.addChild(this.m_loading);
			this.m_loading.x = -67;
			this.m_loading.y = -47;		
			this.m_loading.tf_label.text = "";
			
			this.btnFirstPage.enabled = false;
			this.btnLastPage.enabled = false;
			this.btnPreviousPage.enabled = false;
			this.btnNextPage.enabled = false;
	
			this.setSearchStartDate();
			
			this.onChangeLanguage();
		}
		public addKeyBoardListen(_stage):void {
			this.m_stage = _stage;
			manager.KeyBoardManager.instance.addListener(this.onkeyHandler, this);
		}
		
		protected onkeyHandler(event:KeyboardEvent):void
		{
			/*if( event.charCode == 13 ){
				goPage(null);
			}*/
		}		
		
		protected mouseHandler(event:MouseEvent):void
		{
			if( event.type == mouse.MouseEvent.MOUSE_MOVE ){
				this.m_mcAsset.mc_input.gotoAndStop(2);
			}
			else {
				this.m_mcAsset.mc_input.gotoAndStop(1);
			}
			
		}
		
		private resetText():void {
			this.txtBetGold_Sum.text = "";
			this.txtPayOut_Sum.text = "";
			this.txtAvailableBet_Sum.text = "";
			
			
			this.txtBetGold_Total_Sum.text = "";
			this.txtPayOut_Total_Sum.text = "";
			this.txtAvailableBet_Total_Sum.text = "";
		}
		
		public init():void {
			this._dateChooser.enabled = true;
		}
		
		protected playerInput(event:TextEvent):void{
			if( this.m_txtInput.text == "0" ){
				this.m_txtInput.text = "";
			}
		}
		
		private nextPageHandler(event:MouseEvent):void
		{
			manager.SoundManager.getInstance().play(sound.SoundPackage.sClick_Tools);
			
			var _iFCurrentIdx:number= this.m_iCurrentIdx;
			if( this.m_iCurrentPage < this.m_iMaxPage ){
				this.m_iCurrentPage += 1;
				this.m_iCurrentIdx += this.iRequestDataSize;
			}
			if( _iFCurrentIdx != this.m_iCurrentIdx ){
				this.sPreStartTime = this.sStartTime;
				this.sPreEndTime = this.sEndTime;						
				this.showLoading();
				manager.GameRecordManager.getInstance().getBetRecord( this.m_iCurrentIdx+1 , this.iRequestDataSize , this.gameID ,  this.sStartTime , this.sEndTime );
			}
		}
		
		private previousPageHandler(event:MouseEvent):void{
			manager.SoundManager.getInstance().play(sound.SoundPackage.sClick_Tools);
			
			var _iFCurrentIdx:number= this.m_iCurrentIdx;
			if( this.m_iCurrentPage > 1 ){
				this.m_iCurrentPage -= 1;
				this.m_iCurrentIdx -= this.iRequestDataSize;
				if( this.m_iCurrentIdx < 0 ){
					this.m_iCurrentIdx = 0;
				}
			}
			if( _iFCurrentIdx != this.m_iCurrentIdx ){
				this.sPreStartTime = this.sStartTime;
				this.sPreEndTime = this.sEndTime;						
				this.showLoading();
				manager.GameRecordManager.getInstance().getBetRecord( this.m_iCurrentIdx+1 , this.iRequestDataSize , this.gameID ,  this.sStartTime , this.sEndTime );
			}
		}
		
		private lastPageHandler(event:MouseEvent):void
		{
			manager.SoundManager.getInstance().play(sound.SoundPackage.sClick_Tools);
			
			var _iFCurrentIdx:number= this.m_iCurrentIdx;
			if( this.m_iCurrentPage != this.m_iMaxPage ){
				this.m_iCurrentPage = this.m_iMaxPage;
				this.m_iCurrentIdx = this.iRequestDataSize * ( this.m_iMaxPage -1 );
				
				if( this.m_iCurrentIdx < 0 ){
					this.m_iCurrentIdx = 0;
				}
				
				if( _iFCurrentIdx != this.m_iCurrentIdx ){
					this.sPreStartTime = this.sStartTime;
					this.sPreEndTime = this.sEndTime;							
					this.showLoading();
					manager.GameRecordManager.getInstance().getBetRecord(  this.m_iCurrentIdx+1 , this.iRequestDataSize , this.gameID ,  this.sStartTime , this.sEndTime );
				}
			}

		}
		
		private firstPageHandler(event:MouseEvent):void
		{
			manager.SoundManager.getInstance().play(sound.SoundPackage.sClick_Tools);
			
			// TODO Auto Generated method stub
			var _iFCurrentIdx:number= this.m_iCurrentIdx;
			if( this.m_iCurrentPage != 1 ){
				this.m_iCurrentPage = 1;
				this.m_iCurrentIdx = 0;
				
				if( _iFCurrentIdx != this.m_iCurrentIdx ){
					this.sPreStartTime = this.sStartTime;
					this.sPreEndTime = this.sEndTime;					
					this.showLoading();
					manager.GameRecordManager.getInstance().getBetRecord( this.m_iCurrentIdx+1 , this.iRequestDataSize , this.gameID ,  this.sStartTime , this.sEndTime );
				}
				
			}

			
		}			
		
		private closeWindowHandler(event:MouseEvent):void{
			manager.SoundManager.getInstance().play(sound.SoundPackage.sClick_Tools);
			manager.GameRecordManager.getInstance().hideBetRecordPannel();
		}
		
		private selectEndTimeHandler(event:MouseEvent):void{
			manager.SoundManager.getInstance().play(sound.SoundPackage.sClick_Tools);
			
			if( this._dateChooser.selectType == this._dateChooser.EndTimeType ){
				this._dateChooser.visible = !this._dateChooser.visible;
			}
			else {
				this._dateChooser.visible = true;
			}
			
			this._dateChooser.selectType = this._dateChooser.EndTimeType;
			this._dateChooser.mcAsset.x = 269;
			this._dateChooser.mcAsset.y = -223;
			this.addChild( this._dateChooser );
		}
		
		private selectStartTimeHandler(event:MouseEvent):void{
			manager.SoundManager.getInstance().play(sound.SoundPackage.sClick_Tools);
			if( this._dateChooser.selectType == this._dateChooser.StartTimeType ){
				this._dateChooser.visible = !this._dateChooser.visible;
			}
			else {
				this._dateChooser.visible = true;
			}	

			this._dateChooser.selectType = this._dateChooser.StartTimeType;
			this._dateChooser.mcAsset.x = 28;
			this._dateChooser.mcAsset.y = -223;
			this.addChild( this._dateChooser );
		}
		
		//設定查詢開始日期
		private setSearchStartDate():void {
			var _year:number;			
			var _month:number;
			var _day:number;
			
			_year = this.m_startYear;
			_month = this.m_startMonth;
			_day = this.m_startDay;	
		
			var _date:Date = new Date(_year ,_month , _day );
			/*var _ms:number = 24 * 60 * 60 * 1000;				//搜尋日期須減一天
			_date.setTime( _date.getTime() - _ms );*/
			
			this.m_searchStartYear = _date.getFullYear();
			this.m_searchStartMonth = _date.getMonth();
			this.m_searchStartDay = _date.getDate();
			
		}
		
		/**
		 * 搜尋下注紀錄
		 */
		public searchBetGameRecord(event:MouseEvent=null):void {

			if(event != null){
				manager.SoundManager.getInstance().play(sound.SoundPackage.sClick_Tools);
			}
			
			//查詢時間 需要轉UTC
			var _startDate:Date = new Date(this.m_searchStartYear , this.m_searchStartMonth , this.m_searchStartDay); 
			this.sPreStartTime = this.sStartTime;
			this.sStartTime = _startDate.getUTCFullYear() + "-" + (_startDate.getUTCMonth()+1) + "-" + _startDate.getUTCDate() + " "+ _startDate.getUTCHours() + ":" + "00";
			
			var _endDate:Date = new Date( this.m_searchEndYear , this.m_searchEndMonth , this.m_searchEndDay);
			this.sPreEndTime = this.sEndTime;
			_endDate.setTime( _endDate.getTime() + 24 * 60 * 60 * 1000 );
			this.sEndTime = _endDate.getUTCFullYear() + "-" + (_endDate.getUTCMonth()+1) + "-" + (_endDate.getUTCDate()) + " "+ _endDate.getUTCHours() + ":" + "00";
			
			
			manager.GameRecordManager.getInstance().getBetRecord( this.m_iCurrentIdx+1 , this.iRequestDataSize , this.gameID ,  this.sStartTime , this.sEndTime );
			
			this.mcClickLight.visible = false;
			
			this.showLoading();
		}
		
		/**
		 * 跳轉頁
		 */
		private goPage(event:MouseEvent):void {
			manager.SoundManager.getInstance().play(sound.SoundPackage.sClick_Tools);
			
			var _iPage:number= <number>(this.m_txtInput.text); 
			var startRowNo:number= ( this.iRequestDataSize * ( this.m_iMaxPage -1 ) ) + 1;
			var _sMsg:string;
			if( _iPage > this.m_iMaxPage ){
				/*this.m_txtInput.text = <string>(this.m_iMaxPage);
				startRowNo = ( this.iRequestDataSize * ( this.m_iMaxPage -1 ) ) + 1;
				
				this.m_iCurrentPage = this.m_iMaxPage;
				this.m_iCurrentIdx = this.iRequestDataSize * ( this.m_iMaxPage -1 );
				
				manager.GameRecordManager.getInstance().getBetRecord( startRowNo , this.iRequestDataSize , gameID ,  sStartTime , sEndTime );*/
				
				if( this.m_iMaxPage > 1 ){
					_sMsg = manager.LobbyManager.getInstance().getLanguageString( language.Language.sPageLimit ) + "\n" +
						manager.LobbyManager.getInstance().getLanguageString( language.Language.sPleaseEnter ) + " 1-" + this.m_iMaxPage + 
						manager.LobbyManager.getInstance().getLanguageString( language.Language.sValue )	;
					manager.LobbyManager.getInstance().showDialog( _sMsg );
				}

			}
			else if( _iPage > 0 ) {
				startRowNo = ( this.iRequestDataSize * ( _iPage -1 ) ) + 1;
				
				this.m_iCurrentPage = _iPage;
				this.m_iCurrentIdx = this.iRequestDataSize * (_iPage - 1);

				this.sPreStartTime = this.sStartTime;
				this.sPreEndTime = this.sEndTime;
				manager.GameRecordManager.getInstance().getBetRecord( startRowNo , this.iRequestDataSize , this.gameID ,  this.sStartTime , this.sEndTime );
			}
			else {
//				this.m_txtInput.text = <string>(this.m_iCurrentPage);
//				startRowNo = ( this.iRequestDataSize * ( this.m_iCurrentPage -1 ) ) + 1;
//				manager.GameRecordManager.getInstance().getBetRecord( startRowNo , this.iRequestDataSize , gameID ,  sStartTime , sEndTime );
				if( this.m_iMaxPage > 1 ){
					_sMsg = manager.LobbyManager.getInstance().getLanguageString( language.Language.sPageLimit ) + "\n" +
						manager.LobbyManager.getInstance().getLanguageString( language.Language.sPleaseEnter ) + " 1-" + this.m_iMaxPage + 
						manager.LobbyManager.getInstance().getLanguageString( language.Language.sValue )	;
						manager.LobbyManager.getInstance().showDialog( _sMsg );	
				}
			
			}
		}
		
		/**
		 * 確認 開始日期跟結束日期 是否在正確範圍   開始日期 不能大於 結束日期
		 */
		public setDate( _iYear:number, _iMonth:number, _iDay:number ):void  {
			var _date:Date;
			
			if( this._dateChooser.selectType == this._dateChooser.StartTimeType ){
				_date = new Date(_iYear , _iMonth , _iDay );
				var _startTime:number = _date.getTime();
				if( _startTime > this.m_nMaxSearchTime ){	
					this.m_nMaxSearchTime = _startTime;
					this.m_nMinSearchTime = _startTime;
					
					
					this.txtEndTime.text = (_iYear).toString + "/" + (_iMonth+1 ).toString + "/" + ( _iDay ).toString;	
//					this.txtEndTime.txtAsset.autoSize = TextFieldAutoSize.RIGHT;
					
					this.m_searchEndYear = _iYear;
					this.m_searchEndMonth = _iMonth;
					this.m_searchEndDay = _iDay;
				}else{
					this.m_nMinSearchTime = _date.getTime();
					/*this.txtStartTime.txtAsset.autoSize = TextFieldAutoSize.RIGHT;
					this.txtStartTime.text = (_iYear).tostring + "/" + <string>(_iMonth+1 ) + "/" + <string>( _iDay );*/
										
				}
				

				this.txtStartTime.text = (_iYear).toString + "/" + (_iMonth+1 ).toString + "/" + ( _iDay ).toString;
//				this.txtStartTime.txtAsset.autoSize = TextFieldAutoSize.RIGHT;
				
				this.m_startYear = _iYear;
				this.m_startMonth = _iMonth;
				this.m_startDay = _iDay;
			}
			else if( this._dateChooser.selectType == this._dateChooser.EndTimeType ) {
				_date = new Date(_iYear , _iMonth , _iDay );
				var _endTime:number = _date.getTime();
				if( _endTime < this.m_nMinSearchTime ){			
					this.m_nMinSearchTime = _endTime;
					this.m_nMaxSearchTime = _endTime;
					
					this.txtStartTime.text = ( _iYear ).toString + "/" + ( _iMonth+1 ).toString + "/" + ( _iDay ).toString;
//					this.txtStartTime.txtAsset.autoSize = TextFieldAutoSize.RIGHT;
					
					this.m_startYear = _iYear;
					this.m_startMonth = _iMonth;
					this.m_startDay 	= _iDay;
				}else {
					this.m_nMaxSearchTime = _date.getTime();
					
				}
				
				this.txtEndTime.text = (_iYear).toString + "/" + (_iMonth+1 ).toString + "/" + ( _iDay ).toString;			
//				this.txtEndTime.txtAsset.autoSize = TextFieldAutoSize.RIGHT;
				
				this.m_searchEndYear = _iYear;
				this.m_searchEndMonth = _iMonth;
				this.m_searchEndDay = _iDay;				
			}
			
			//針對玩家選擇的開始日期 , 推出實際的搜尋開始日期
			this.setSearchStartDate();
			//選擇日期  還原索引
			this.m_iCurrentIdx = 0;			
		}
		
		/**
		 * 更新日期
		 */
		public updateDate( _iYear:number, _iMonth:number, _iDay:number):void {
			var _tfTarget:Text;
			if( this._dateChooser.selectType == this._dateChooser.StartTimeType ){
				_tfTarget = this.txtStartTime;
				_tfTarget.text = ( _iYear ).toString  + "/" + ( _iMonth+1 ).toString  + "/" + ( _iDay ).toString ;
			}
			else if( this._dateChooser.selectType == this._dateChooser.EndTimeType ) {
				_tfTarget = this.txtEndTime;
				_tfTarget.text = ( _iYear ).toString  + "/" + ( _iMonth+1 ).toString  + "/" + ( _iDay ).toString ;
			}
			// _tfTarget.txtAsset.autoSize = TextFieldAutoSize.RIGHT;
			
		}
		
		 public onChangeLanguage():void {
			this.m_mcAsset.gotoAndStop(manager.LobbyManager.getInstance().lobbyAuth.Lang+1);
			this.m_mcNoLog.gotoAndStop(manager.LobbyManager.getInstance().lobbyAuth.Lang+1);
			
			
			this.txtStartTime.text = ( this.m_startYear ).toString  + "/" + ( this.m_startMonth+1 ).toString  + "/" + (  this.m_startDay ).toString ;
			this.search.onChangeLanguage();
			this._dateChooser.onChangeLanguage();
		}
		
		/**
		 * 
		 */
		public updateUI(_gameRecordApiStruct:model.struct.GameRecordApiStruct):void {
			this.m_gameLogListStruct = _gameRecordApiStruct;
			var _bHasLog: boolean = false;
			var _gameLogListStruct = _gameRecordApiStruct.RecordList;
			if( _gameLogListStruct != null ){
				this.resetText();
				this.updateSummary( _gameLogListStruct.LogSummary );			//更新統計結果
				this.updateComplexGameList( _gameLogListStruct.ComplexGameList );
				this.gameRecordApiStruct = _gameRecordApiStruct;
				this.updateText();
				this.onChangeLanguage();
				
				if( _gameLogListStruct.LogSummary.TotalDataCount == 0 ){
					_bHasLog = false;
				}
				else {
					_bHasLog = true;
				}
			}else {
				_bHasLog = false;
			}
			
			//驗證是否有紀錄
			if( _bHasLog ){
				this.m_mcNoLog.visible = false;
			}else {
				this.m_mcNoLog.visible = true;
				this.m_mcNoLog.gotoAndStop(manager.LobbyManager.getInstance().lobbyAuth.Lang+1);
			}

			if( this._dateChooser ){
				this.addChild( this._dateChooser );
			}
			this.hideLoding();
		}
		
		private updateText():void {
			var _gameLogListStruct = this.m_gameLogListStruct.RecordList;
			var _iPage:number=(_gameLogListStruct.LogSummary.TotalDataCount / this.iRequestDataSize );
			
			//選擇其他日期
			if( (this.sPreEndTime != this.sEndTime) || (this.sPreStartTime != this.sStartTime) ){
				this.m_iCurrentPage = 1;
				this.m_iCurrentIdx = 0;
			}
			
			if( _gameLogListStruct.LogSummary.TotalDataCount > this.iRequestDataSize &&
				_gameLogListStruct.LogSummary.TotalDataCount % this.iRequestDataSize != 0 ){				
				this.txt_Page.text = (this.m_iCurrentPage).toString +"/" + ( _iPage  + 1 ).toString;
			}
			else {
				
				
				//一頁資料 或 不滿一頁資料
				if( _iPage == 0 ){
					_iPage = 1;
					this.m_iCurrentPage = 1;
					this.m_iCurrentIdx = 0;
				}
				
				this.txt_Page.text = (this.m_iCurrentPage).toString +"/" + ( _iPage ).toString;
			}			
		}
		
		private updateSummary(_gameLogSummaryStruct:model.struct.GameLogSummaryStruct):void {
			/**小計*/
			this.txtBetGold_Sum.text = "" + _gameLogSummaryStruct.SubtotalBetAmount.toString;
			this.txtPayOut_Sum.text = "" + (_gameLogSummaryStruct.SubtotalResultAmount).toString;
			this.txtAvailableBet_Sum.text = "" + (_gameLogSummaryStruct.SubtotalRakeAmount).toString;
			
			/**總計*/
			this.txtBetGold_Total_Sum.text = "" + (_gameLogSummaryStruct.TotalBetAmount).toString;
			this.txtPayOut_Total_Sum.text = "" + (_gameLogSummaryStruct.TotalResultAmount).toString;
			this.txtAvailableBet_Total_Sum.text = "" + (_gameLogSummaryStruct.TotalRakeAmount).toString;
			
			
			//共計
			this.m_iDataSize = _gameLogSummaryStruct.TotalDataCount;
			this.txt_TotalPage.text = "" + (this.m_iDataSize).toString;
			
//			if( _gameLogSummaryStruct.TotalBetAmount < 0 ){
//				this.txtBetGold_Sum.text = "";
//				this.txtPayOut_Sum.text = "";
//				this.txtAvailableBet_Sum.text = "";
//				this.txtBetGold_Total_Sum.text = "";
//				this.txtPayOut_Total_Sum.text = "";
//				this.txtAvailableBet_Total_Sum.text = "";
//			}
		}
		
		/**
		 * 更新下注紀錄結果
		 */
		public updateGameRecord( _sGameNo:string ):void {
			var _bRes: boolean = this.m_pool.find( _sGameNo );
			if( _bRes ){
				this.searchBetGameRecord();
			}
			
		}

		
		private updateComplexGameList( _aComplexGameList:any[] ):void {
			if( !this.m_pool ){
				return;
			}
			
			if( !_aComplexGameList ){
				return;
			}
			
			this.m_pool.reset();
			var _iDateSize:number= this.m_gameLogListStruct.RecordList.LogSummary.TotalDataCount;				//總資料筆數
			
			if( _iDateSize % this.iRequestDataSize > 0 ){
				this.m_iMaxPage = ( _iDateSize / this.iRequestDataSize) + 1 ;							//最大頁數 = 總筆數 / 單頁資料筆數
			}
			else {
				this.m_iMaxPage = ( _iDateSize / this.iRequestDataSize);
			}
			
			if( this.m_iMaxPage == 0 ){
				this.m_iMaxPage = 1;
			}
			
			if( this.m_iMaxPage == 1 ){			//只有一頁 鎖按鈕
				this.btnGo.enabled = false;
				this.m_txtInput.mouseEnabled = false;
				this.btnFirstPage.enabled = false;
				this.btnLastPage.enabled = false;
				this.btnPreviousPage.enabled = false;
				this.btnNextPage.enabled = false;
			}
			else {
				this.btnGo.enabled = true;
				this.m_txtInput.mouseEnabled = true;
				this.btnFirstPage.enabled = true;
				this.btnLastPage.enabled = true;
				this.btnPreviousPage.enabled = true;
				this.btnNextPage.enabled = true;				
			}
			
			var _iLength:number= this.m_gameLogListStruct.RecordList.ComplexGameList.length;
			var _subList;
			
			var listNumber:string = "";
			var betTime:string = "";
			var gameType:string = "";
			var tableId:string = "";
			var result:string = "";
			var totalBet:string = "";
			var payOut:string = "";
			var availableBet:string = "";
			var state:string = "";
			
			for( var i:number= 0; i < _iLength ; i++)
			{
				_subList = this.m_pool.getSubList();
				_subList.complexGameRecordStruct = _aComplexGameList[i];
				_subList.fMouseOver = this.showMoveLight;
				_subList.fMouseOut = this.hideMoveLight;
				_subList.fClick	   = this.showClickLight;
				
				
				var _gameID:number= _aComplexGameList[i].BaseRecord.GameID;
				var _baseRecordStruct = ( _aComplexGameList[i].BaseRecord); 
				var _baccaratData	= ( _aComplexGameList[i].BaccaratData );
				var _sicboData	= ( _aComplexGameList[i].SicboData );
				var _dragonTigerData	= ( _aComplexGameList[i].DragonTigerData);
				var _rouletteData	= ( _aComplexGameList[i].RouletteData);
				
				listNumber = <string>(_baseRecordStruct.RecordGameNumber);		
				availableBet =  <string>(_baseRecordStruct.RakeAmount);		
				//_subList.txtListNumber.text 	=  <string>(_baseRecordStruct.RecordGameNumber);		
				//_subList.txtAvailableBet.text 	=  <string>(_baseRecordStruct.RakeAmount);		
				
				var _str:string = <string>(_baseRecordStruct.BetCreateDateTime);
				var _ar:any[] = _str.split("T");
				var _ar2:any[] = _ar[0].split('-');
				var _nYear:number = (_ar2[0]);
				var _nMonth:number = (_ar2[1])-1
				var _nDay:number = (_ar2[2]);

				var _ar3:any[] = _ar[1].split(':');
				var _nHour:number = (_ar3[0]);
				var _nMin:number = (_ar3[1])
				var _nSec:number = (_ar3[2]);			
				
				//UTC 轉本地時間
				var _date:Date = new Date(_nYear , _nMonth ,_nDay , _nHour , _nMin , _nSec  );
				var offsetMilliseconds:number = _date.getTimezoneOffset() * 60 * 1000;
				
//				console.log("offsetMilliseconds::" + offsetMilliseconds );
				_date.setTime( _date.getTime() - offsetMilliseconds );
				var _iMonth:number= _date.getMonth();
				var _sMonth:string;
				if( _iMonth < 9 ){
					_sMonth = "0" + (_iMonth+1).toString;
				}
				else {
					_sMonth = ""+(_iMonth+1).toString;
				}
				
				var _iDay:number= _date.getDate();
				var _sDay:string;
				if( _iDay < 10 ){
					_sDay = "0" + (_iDay).toString;
				}
				else {
					_sDay = ""+(_iDay).toString;
				}
				
				
				var _iHours:number= _date.getHours();
				var _sHours:string;
				if( _iHours < 10 ){
					_sHours = "0" + (_iHours);
				}
				else if( _iHours == 0 ){
					_sHours = "24";
				}
				else {
					_sHours = ""+(_iHours).toString;
				}
				
				var _iMin:number= _date.getMinutes();
				var _sMin:string;
				
				
				if( _iMin < 10 ){
					_sMin = "0" + (_iMin).toString;
				}
				else {
					_sMin = "" + (_iMin).toString;
				}
				
				var _iSecond = _date.getSeconds();
				var _sSecond;
				if(_iSecond<10){
					_sSecond = "0" + _iSecond;
				}else{
					_sSecond = (_iSecond).toString;
				}
				
				//2016-03-11T09:31:13  ->   2016-03—07 09:09
				betTime = <string>(_date.getFullYear() +"-"+  _sMonth + "-" + _sDay + " " + _sHours + ":" + _sMin + ":" + _sSecond );
				tableId = <string>(_baseRecordStruct.TableID);
				totalBet = <string>(_baseRecordStruct.GoldCoinBet);
				payOut = <string>(_baseRecordStruct.ResultAmount);
				availableBet = <string>(_baseRecordStruct.RakeAmount );
				//_subList.txtBetTime.text 		=  <string>(_date.getFullYear() +"-"+  _sMonth + "-" + _sDay + " " + _sHours + ":" + _sMin );
				//_subList.txtTableID.text 		=  <string>(_baseRecordStruct.TableID);
				//_subList.txtTotalBet.text		=  <string>(_baseRecordStruct.GoldCoinBet);
				//_subList.txtPayOut.text			=  <string>(_baseRecordStruct.ResultAmount);
				//_subList.txtAvailableBet.text	=  <string>(_baseRecordStruct.RakeAmount );
				
		
				if( _gameID == define.GameDefine.BAC )
				{
					gameType = manager.LobbyManager.getInstance().getLanguageString( language.Language.sGame_Name_Bac );
					//_subList.txtGameType.text 	=  manager.LobbyManager.getInstance().getLanguageString( Language.sGame_Name_Bac );
					var _sPlayer:string =manager.LobbyManager.getInstance().getLanguageString( language.Language.sP ) ;
					var _sBanker:string = manager.LobbyManager.getInstance().getLanguageString( language.Language.sB ) ;
					result = _sPlayer + <string>(_baccaratData.PlayerTotalPoint) + _sBanker +  <string>(_baccaratData.BankerTotalPoint);
					//_subList.txtResult.text =  _sPlayer + <string>(_baccaratData.PlayerTotalPoint) + _sBanker +  <string>(_baccaratData.BankerTotalPoint);
				}
				else if( _gameID == define.GameDefine.SIC ){
					gameType 	=  manager.LobbyManager.getInstance().getLanguageString( language.Language.sGame_Name_Sic );
					var _sicAr = [_sicboData.Dice_1 , _sicboData.Dice_2 , _sicboData.Dice_3 ];
					_sicAr.sort();
					result = <string>(_sicAr[0]) + <string>(_sicAr[1]) + <string>(_sicAr[2]);
					//_subList.txtResult.text = <string>(_sicAr[0]) + <string>(_sicAr[1]) + <string>(_sicAr[2]);
				}
				else if( _gameID == define.GameDefine.ROU ){
					gameType 	=  manager.LobbyManager.getInstance().getLanguageString( language.Language.sGame_Name_Rou );
					result = <string>(_rouletteData.RouletteNumber);
					//_subList.txtResult.text = <string>(_rouletteData.RouletteNumber);
				}
				else if( _gameID == define.GameDefine.DTF ){
					gameType 	=  manager.LobbyManager.getInstance().getLanguageString( language.Language.sGame_Name_DTF );
					var _sDragon:string = manager.LobbyManager.getInstance().getLanguageString( language.Language.sD );
					var _sTiger:string = manager.LobbyManager.getInstance().getLanguageString( language.Language.sT );
					result = <string>( _sDragon + this.transDtfPoints(_dragonTigerData.DragonPoint)+_sTiger + this.transDtfPoints(_dragonTigerData.TigerPoint) );
					//_subList.txtResult.text = <string>( _sDragon + transDtfPoints(_dragonTigerData.DragonPoint) + 
					//						 _sTiger + transDtfPoints(_dragonTigerData.TigerPoint) );
				}
				
				if( _baseRecordStruct.IsResult ){
					state = manager.LobbyManager.getInstance().getLanguageString( language.Language.sIsPayOuted );
					//_subList.txtState.text			=   manager.LobbyManager.getInstance().getLanguageString( Language.sIsPayOuted );
				}
				else 
				{
					state =  manager.LobbyManager.getInstance().getLanguageString( language.Language.sNoPayOut );
					//_subList.txtState.text			=   manager.LobbyManager.getInstance().getLanguageString( Language.sNoPayOut );
				}	//end else
				
				
				_subList.updateUI(listNumber,betTime,gameType,tableId,result,totalBet,payOut,availableBet,state,_baseRecordStruct.IsResult);
				_subList.x = this.mcPos.x;
				_subList.y = this.mcPos.y + i*this.subListDistanceY;
				
				this.addChild( _subList );
			}//end for
		
		}
		
		private transDtfPoints(_iPoint:number):string {
			var _str:string = "";
			
			if( _iPoint == 1 ){
				_str = "A";
			}
			else if( _iPoint == 11){
				_str = "J";
			}
			else if(  _iPoint == 12){
				_str = "Q";
			}
			else if(  _iPoint == 13){
				_str = "K";
			}
			else {
				_str = "" + (_iPoint).toString;
			}
			
			
			return _str;
		}		
		
		private hideMoveLight(event:MouseEvent):void{
			this.mcMoveLight.visible = false;
		}
		
		private showMoveLight(event:egret.Event):void {
			if( this.m_selectSubList == event.currentTarget ){
				return;
			}			
			this.mcMoveLight.x = event.currentTarget.x - 1;
			this.mcMoveLight.y = event.currentTarget.y - 1;
			this.mcMoveLight.visible = true;
		}
		
		private showClickLight(_target):void {
			this.m_selectSubList = _target;
			this.mcClickLight.x = _target.x - 1;
			this.mcClickLight.y = _target.y - 1;
			this.mcClickLight.visible = true;			
		}
		
		public hideClickLight():void {
			this.mcClickLight.visible = false;
		}
		
		 public destroy():void {
			if( this._dateChooser ){
				this._dateChooser.enabled = false;
			}
						
		}
		
		set  enabled( _bValue: boolean ) {
			if( this._dateChooser ){
				this._dateChooser.enabled = true;
			}
		}
		
		public showLoading():void{
			if(this.m_loading){
				this.m_loading.gotoAndPlay(1);
				this.m_loading.visible = true;
			}
			if(this.m_mcNoLog) {
				this.m_mcNoLog.visible = false;
			}
			
		}
		public hideLoding():void{
			if(this.m_loading){
				this.m_loading.gotoAndStop(1);
				this.m_loading.visible = false;
			}
			
		}	
		
		public checkBetCord():void {
			//
			if( !this.m_gameLogListStruct ){
				//驗證是否有紀錄
				if( _bHasLog ){
					this.m_mcNoLog.visible = false;
				}else {
					this.m_mcNoLog.visible = true;
					this.m_mcNoLog.gotoAndStop(manager.LobbyManager.getInstance().lobbyAuth.Lang+1);
					this.hideLoding();
				}		
				return;
			}
			
			
			var _bHasLog: boolean = false;
			var _gameLogListStruct = this.m_gameLogListStruct.RecordList;			
			if( _gameLogListStruct.LogSummary.TotalDataCount == 0 ){
				_bHasLog = false;
			}
			else {
				_bHasLog = true;
			}		
			//驗證是否有紀錄
			if( _bHasLog ){
				this.m_mcNoLog.visible = false;
			}else {
				this.m_mcNoLog.visible = true;
				this.m_mcNoLog.gotoAndStop(manager.LobbyManager.getInstance().lobbyAuth.Lang+1);
				this.hideLoding();
			}
		}
		
		
	}
}
