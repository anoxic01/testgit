module lobby.view.gameRecord {
	export class BetRecordUI extends PanelWindow{
		public txtStartTime					:	Text;								//開始時間
		public txtEndTime					:	Text;								//結束時間
		
		public selectStartTime				:	SingleButtonMC;						//選擇開始時間
		public selectEndTime				:	SingleButtonMC; 					//選擇結束時間
		
		public search						:	Btn; 								//查詢按鈕
		
		public txt_SingleShowPage			:	Text;								//單頁顯示
		public txt_TotalPage				:	Text;								//總頁數
		public txt_Page						:	Text;								//頁數
		
		public singleShowCount				:	number;								//單頁顯示幾筆
		public totalShowCount				:	number;								//共計幾筆
		
		public btnGo						:	SingleButtonMC; 					//查詢按鈕
		
		public subListDistanceY				:	int 	=	30;						//下注細單 Y間距
		public mcMoveLight					:	MovieClip;							//滑鼠移動亮條
		public mcClickLight					:	MovieClip;							//滑鼠選擇亮條
		public mcPos						:	MovieClip;							//下注細單 對位元件
		
		public btnClose						:	SingleButtonMC;
		public btnFirstPage					:	SingleButtonMC;						//第1頁
		public btnLastPage					:	SingleButtonMC;						//最後1頁
		public btnPreviousPage				:	SingleButtonMC;						//上1頁
		public btnNextPage					:	SingleButtonMC;						//下1頁	
		
		public txt_inputPage				:	Text;								//輸入頁數框
		
		private m_iCurrentPage				:	int 	= 	1;						//當前頁碼
		private m_iCurrentIdx				:	int 	= 	0;						//當前索引
		private m_iMaxPage					:	int 	= 	1;						//最大頁數
		private m_iDataSize					:	int 	= 	0;						//資料筆數
		
		public gameID						:	number;
		public sStartTime					:	String;								//開始時間
		public sEndTime						:	String;								//結束時間
		
		private sPreStartTime				:	String;								//上一個搜尋的開始時間
		private sPreEndTime					:	String;								//上一個搜尋的結束時間
		
		public iRequestDataSize				:	int 	= 	12;						//要求資料筆數
		
		public txtBetGold_Sum				:	Text;								//下注金額(小計)
		public txtPayOut_Sum				:	Text;								//派彩(小計)
		public txtAvailableBet_Sum			:	Text;								//有效投注(小計)
		
		public txtBetGold_Total_Sum			:	Text;								//下注金額(總計)
		public txtPayOut_Total_Sum			:	Text;								//派彩(總計)
		public txtAvailableBet_Total_Sum	:	Text;								//有效投注(總計)
		
		private m_pool						: 	SubListPool;
		public _dateChooser					: 	DatePannel;
		public gameRecordApiStruct			: 	GameRecordApiStruct;				//下注紀錄資料
		
		public m_txtInput					: 	TextField;							//輸入頁碼
		
		private m_nMinSearchTime			: 	Number 	= 	0;						//最小可搜尋的  開始日期 毫秒
		private m_nMaxSearchTime			: 	Number 	= 	0;						//最大可搜尋的 結束日期 毫秒
		
		private m_startYear					: 	int		= 	0;
		private m_startMonth				: 	int 	= 	0;
		private m_startDay					: 	int 	= 	0;
		
		private m_searchEndYear				: 	int 	= 	0;
		private m_searchEndMonth			: 	int 	= 	0;
		private m_searchEndDay				: 	int 	= 	0;		
		
		private m_searchStartYear			:	int 	= 	0;
		private m_searchStartMonth			:	int 	= 	0;
		private m_searchStartDay			: 	int 	= 	0;
		
		private m_gameLogListStruct			:	GameRecordApiStruct;
		private m_mcNoLog					: 	MovieClip;
		private m_loading					: 	*;									//加载图标
		private m_selectSubList				: 	SubBetList;							//選擇子單
		private m_stage						: 	Stage;								//
		
		
		public constructor(_mcAsset:MovieClip ,$bShake: boolean = false ) {
			super( $bShake );
			
			m_mcAsset 		= _mcAsset;
			m_mcHot 		= _mcAsset.mc_hot;
			txtStartTime	= new Text( _mcAsset.betStartTime);
			txtEndTime		= new Text( _mcAsset.betEndTime);
			
			selectStartTime = new SingleButtonMC(  _mcAsset.selectStartTime , selectStartTimeHandler );
			selectEndTime 	= new SingleButtonMC(  _mcAsset.selectEndTime , selectEndTimeHandler );
			search			= new Btn( _mcAsset.mc_search , searchBetGameRecord , Language.sSearch );
			
			txt_SingleShowPage =  new Text( _mcAsset.tf_9 );
			txt_TotalPage = new Text( _mcAsset.tf_10 );
			txt_Page 	  =	new Text(  _mcAsset.tf_page );
			
			btnGo	= new SingleButtonMC(_mcAsset.mc_go , goPage );
			mcMoveLight  = _mcAsset.mc_moveLight;
			mcMoveLight.visible = false;
			mcClickLight = _mcAsset.mc_ClickLight;
			mcClickLight.visible = false;
			
			mcPos	= _mcAsset.mc_pos;
			btnClose = new SingleButtonMC( _mcAsset.mc_close , closeWindowHandler );
			
			nAssetWidth = m_mcAsset.width + 50;
			nAssetHeight = m_mcAsset.height + 50;
			
			btnFirstPage = new SingleButtonMC(_mcAsset.mc_0 , firstPageHandler );
			btnLastPage = new SingleButtonMC(_mcAsset.mc_3 , lastPageHandler );
			btnPreviousPage = new SingleButtonMC( _mcAsset.mc_1 , previousPageHandler );
			btnNextPage = new  SingleButtonMC( _mcAsset.mc_2 , nextPageHandler );
			
//			mc_input = new Btn2( _mcAsset.mc_input );
			_mcAsset.mc_input.gotoAndStop(1);
			MovieClip(_mcAsset.mc_input).mouseChildren = false;
			MovieClip(_mcAsset.mc_input).mouseEnabled = false;
			
			addChild( m_mcAsset );
			
			txtBetGold_Sum 			= new Text( _mcAsset.tf_log_1);
			txtPayOut_Sum 			= new Text( _mcAsset.tf_log_2);
			txtAvailableBet_Sum 	= new Text( _mcAsset.tf_log_3);
			
			
			txtBetGold_Total_Sum		= new Text( _mcAsset.tf_log_5);
			txtPayOut_Total_Sum			= new Text( _mcAsset.tf_log_6);
			txtAvailableBet_Total_Sum	= new Text( _mcAsset.tf_log_7);
			
			m_pool = new SubListPool();
			_dateChooser = new DatePannel();
			_dateChooser.visible = false;
			
			addChild( _dateChooser );
			
			txt_SingleShowPage.text = String(iRequestDataSize);
			m_txtInput = _mcAsset.tf_input;
			m_txtInput.type = TextFieldType.INPUT;
			m_txtInput.addEventListener( TextEvent.TEXT_INPUT , playerInput );
			m_txtInput.restrict = "0-9";
			m_txtInput.addEventListener(MouseEvent.MOUSE_MOVE , mouseHandler );
			m_txtInput.addEventListener(MouseEvent.MOUSE_OUT , mouseHandler );
			m_txtInput.maxChars = 5;
		
			var _nowDate :Date = new Date( _dateChooser.iCurrentYear , _dateChooser.iCurrentMonth , _dateChooser.iCurrentDay );
			
			m_nMinSearchTime = _nowDate.getTime();
			m_nMaxSearchTime = m_nMinSearchTime;
			
//			txtStartTime.txtAsset.autoSize = TextFieldAutoSize.RIGHT;
			txtStartTime.text = String( _dateChooser.iCurrentYear ) + "/" + String( _dateChooser.iCurrentMonth+1 ) + "/" + String(  _dateChooser.iCurrentDay );
//			txtEndTime.txtAsset.autoSize = TextFieldAutoSize.RIGHT;
			txtEndTime.text = String( _dateChooser.iCurrentYear ) + "/" + String( _dateChooser.iCurrentMonth+1 ) + "/" + String(  _dateChooser.iCurrentDay );
			
			//開始日期 跟 結束日期
			m_startYear = m_searchEndYear = _dateChooser.iCurrentYear;
			m_startMonth = m_searchEndMonth = _dateChooser.iCurrentMonth;
			m_startDay = m_searchEndDay = _dateChooser.iCurrentDay;
			
			m_mcNoLog  = m_mcAsset.mc_No_log;
			m_mcNoLog.visible = false;
			
			m_loading = ResourceManager.getInstance().getInstanceByNameFromDomain(Define.SWF_LOBBY,"LoadingLiveAsset");
			addChild(m_loading);
			m_loading.x = -67;
			m_loading.y = -47;		
			m_loading.tf_label.text = "";
			
			btnFirstPage.enabled = false;
			btnLastPage.enabled = false;
			btnPreviousPage.enabled = false;
			btnNextPage.enabled = false;
	
			setSearchStartDate();
			
			onChangeLanguage();
		}
		public addKeyBoardListen(_stage:Stage):void {
			m_stage = _stage;
			m_stage.addEventListener(KeyboardEvent.KEY_DOWN, onkeyHandler);
		}
		
		protected onkeyHandler(event:KeyboardEvent):void
		{
			/*if( event.charCode == 13 ){
				goPage(null);
			}*/
		}		
		
		protected mouseHandler(event:MouseEvent):void
		{
			if( event.type == MouseEvent.MOUSE_MOVE ){
				m_mcAsset.mc_input.gotoAndStop(2);
			}
			else {
				m_mcAsset.mc_input.gotoAndStop(1);
			}
			
		}
		
		private resetText():void {
			txtBetGold_Sum.text = "";
			txtPayOut_Sum.text = "";
			txtAvailableBet_Sum.text = "";
			
			
			txtBetGold_Total_Sum.text = "";
			txtPayOut_Total_Sum.text = "";
			txtAvailableBet_Total_Sum.text = "";
		}
		
		public init():void {
			_dateChooser.enabled = true;
		}
		
		protected playerInput(event:TextEvent):void{
			if( m_txtInput.text == "0" ){
				m_txtInput.text = "";
			}
		}
		
		private nextPageHandler(event:MouseEvent):void
		{
			SoundManager.getInstance().play(SoundPackage.sClick_Tools);
			
			var _iFCurrentIdx:number= m_iCurrentIdx;
			if( m_iCurrentPage < m_iMaxPage ){
				m_iCurrentPage += 1;
				m_iCurrentIdx += iRequestDataSize;
			}
			if( _iFCurrentIdx != m_iCurrentIdx ){
				sPreStartTime = sStartTime;
				sPreEndTime = sEndTime;						
				showLoading();
				GameRecordManager.getInstance().getBetRecord( m_iCurrentIdx+1 , iRequestDataSize , gameID ,  sStartTime , sEndTime );
			}
		}
		
		private previousPageHandler(event:MouseEvent):void{
			SoundManager.getInstance().play(SoundPackage.sClick_Tools);
			
			var _iFCurrentIdx:number= m_iCurrentIdx;
			if( m_iCurrentPage > 1 ){
				m_iCurrentPage -= 1;
				m_iCurrentIdx -= iRequestDataSize;
				if( m_iCurrentIdx < 0 ){
					m_iCurrentIdx = 0;
				}
			}
			if( _iFCurrentIdx != m_iCurrentIdx ){
				sPreStartTime = sStartTime;
				sPreEndTime = sEndTime;						
				showLoading();
				GameRecordManager.getInstance().getBetRecord( m_iCurrentIdx+1 , iRequestDataSize , gameID ,  sStartTime , sEndTime );
			}
		}
		
		private lastPageHandler(event:MouseEvent):void
		{
			SoundManager.getInstance().play(SoundPackage.sClick_Tools);
			
			var _iFCurrentIdx:number= m_iCurrentIdx;
			if( m_iCurrentPage != m_iMaxPage ){
				m_iCurrentPage = m_iMaxPage;
				m_iCurrentIdx = iRequestDataSize * ( m_iMaxPage -1 );
				
				if( m_iCurrentIdx < 0 ){
					m_iCurrentIdx = 0;
				}
				
				if( _iFCurrentIdx != m_iCurrentIdx ){
					sPreStartTime = sStartTime;
					sPreEndTime = sEndTime;							
					showLoading();
					GameRecordManager.getInstance().getBetRecord(  m_iCurrentIdx+1 , iRequestDataSize , gameID ,  sStartTime , sEndTime );
				}
			}

		}
		
		private firstPageHandler(event:MouseEvent):void
		{
			SoundManager.getInstance().play(SoundPackage.sClick_Tools);
			
			// TODO Auto Generated method stub
			var _iFCurrentIdx:number= m_iCurrentIdx;
			if( m_iCurrentPage != 1 ){
				m_iCurrentPage = 1;
				m_iCurrentIdx = 0;
				
				if( _iFCurrentIdx != m_iCurrentIdx ){
					sPreStartTime = sStartTime;
					sPreEndTime = sEndTime;					
					showLoading();
					GameRecordManager.getInstance().getBetRecord( m_iCurrentIdx+1 , iRequestDataSize , gameID ,  sStartTime , sEndTime );
				}
				
			}

			
		}			
		
		private closeWindowHandler(event:MouseEvent):void{
			SoundManager.getInstance().play(SoundPackage.sClick_Tools);
			GameRecordManager.getInstance().hideBetRecordPannel();
		}
		
		private selectEndTimeHandler(event:MouseEvent):void{
			SoundManager.getInstance().play(SoundPackage.sClick_Tools);
			
			if( _dateChooser.selectType == _dateChooser.EndTimeType ){
				_dateChooser.visible = !_dateChooser.visible;
			}
			else {
				_dateChooser.visible = true;
			}
			
			_dateChooser.selectType = _dateChooser.EndTimeType;
			_dateChooser.mcAsset.x = 269;
			_dateChooser.mcAsset.y = -223;
			addChild( _dateChooser );
		}
		
		private selectStartTimeHandler(event:MouseEvent):void{
			SoundManager.getInstance().play(SoundPackage.sClick_Tools);
			if( _dateChooser.selectType == _dateChooser.StartTimeType ){
				_dateChooser.visible = !_dateChooser.visible;
			}
			else {
				_dateChooser.visible = true;
			}	

			_dateChooser.selectType = _dateChooser.StartTimeType;
			_dateChooser.mcAsset.x = 28;
			_dateChooser.mcAsset.y = -223;
			addChild( _dateChooser );
		}
		
		//設定查詢開始日期
		private setSearchStartDate():void {
			var _year:number;			
			var _month:number;
			var _day:number;
			
			_year = m_startYear;
			_month = m_startMonth;
			_day = m_startDay;	
		
			var _date:Date = new Date(_year ,_month , _day );
			/*var _ms:Number = 24 * 60 * 60 * 1000;				//搜尋日期須減一天
			_date.setTime( _date.getTime() - _ms );*/
			
			m_searchStartYear = _date.getFullYear();
			m_searchStartMonth = _date.getMonth();
			m_searchStartDay = _date.getDate();
			
		}
		
		/**
		 * 搜尋下注紀錄
		 */
		public searchBetGameRecord(event:MouseEvent=null):void {

			if(event != null){
				SoundManager.getInstance().play(SoundPackage.sClick_Tools);
			}
			
			//查詢時間 需要轉UTC
			var _startDate:Date = new Date(m_searchStartYear , m_searchStartMonth , m_searchStartDay); 
			sPreStartTime = sStartTime;
			sStartTime = _startDate.getUTCFullYear() + "-" + (_startDate.getUTCMonth()+1) + "-" + _startDate.getUTCDate() + " "+ _startDate.getUTCHours() + ":" + "00";
			
			var _endDate:Date = new Date( m_searchEndYear , m_searchEndMonth , m_searchEndDay);
			sPreEndTime = sEndTime;
			_endDate.setTime( _endDate.getTime() + 24 * 60 * 60 * 1000 );
			sEndTime = _endDate.getUTCFullYear() + "-" + (_endDate.getUTCMonth()+1) + "-" + (_endDate.getUTCDate()) + " "+ _endDate.getUTCHours() + ":" + "00";
			
			
			GameRecordManager.getInstance().getBetRecord( m_iCurrentIdx+1 , iRequestDataSize , gameID ,  sStartTime , sEndTime );
			
			mcClickLight.visible = false;
			
			showLoading();
		}
		
		/**
		 * 跳轉頁
		 */
		private goPage(event:MouseEvent):void {
			SoundManager.getInstance().play(SoundPackage.sClick_Tools);
			
			var _iPage:number= int(m_txtInput.text); 
			var startRowNo:number= ( iRequestDataSize * ( m_iMaxPage -1 ) ) + 1;
			var _sMsg:String;
			if( _iPage > m_iMaxPage ){
				/*m_txtInput.text = String(m_iMaxPage);
				startRowNo = ( iRequestDataSize * ( m_iMaxPage -1 ) ) + 1;
				
				m_iCurrentPage = m_iMaxPage;
				m_iCurrentIdx = iRequestDataSize * ( m_iMaxPage -1 );
				
				GameRecordManager.getInstance().getBetRecord( startRowNo , iRequestDataSize , gameID ,  sStartTime , sEndTime );*/
				
				if( m_iMaxPage > 1 ){
					_sMsg = LobbyManager.getInstance().getLanguageString( Language.sPageLimit ) + "\n" +
						LobbyManager.getInstance().getLanguageString( Language.sPleaseEnter ) + " 1-" + m_iMaxPage + 
						LobbyManager.getInstance().getLanguageString( Language.sValue )	;
					LobbyManager.getInstance().showDialog( _sMsg );
				}

			}
			else if( _iPage > 0 ) {
				startRowNo = ( iRequestDataSize * ( _iPage -1 ) ) + 1;
				
				m_iCurrentPage = _iPage;
				m_iCurrentIdx = iRequestDataSize * (_iPage - 1);

				sPreStartTime = sStartTime;
				sPreEndTime = sEndTime;
				GameRecordManager.getInstance().getBetRecord( startRowNo , iRequestDataSize , gameID ,  sStartTime , sEndTime );
			}
			else {
//				m_txtInput.text = String(m_iCurrentPage);
//				startRowNo = ( iRequestDataSize * ( m_iCurrentPage -1 ) ) + 1;
//				GameRecordManager.getInstance().getBetRecord( startRowNo , iRequestDataSize , gameID ,  sStartTime , sEndTime );
				if( m_iMaxPage > 1 ){
					_sMsg = LobbyManager.getInstance().getLanguageString( Language.sPageLimit ) + "\n" +
						LobbyManager.getInstance().getLanguageString( Language.sPleaseEnter ) + " 1-" + m_iMaxPage + 
						LobbyManager.getInstance().getLanguageString( Language.sValue )	;
						LobbyManager.getInstance().showDialog( _sMsg );	
				}
			
			}
		}
		
		/**
		 * 確認 開始日期跟結束日期 是否在正確範圍   開始日期 不能大於 結束日期
		 */
		public setDate( _iYear:number, _iMonth:number, _iDay:number ):void  {
			var _date:Date;
			
			if( _dateChooser.selectType == _dateChooser.StartTimeType ){
				_date = new Date(_iYear , _iMonth , _iDay );
				var _startTime:Number = _date.getTime();
				if( _startTime > m_nMaxSearchTime ){	
					m_nMaxSearchTime = _startTime;
					m_nMinSearchTime = _startTime;
					
					
					txtEndTime.text = String(_iYear) + "/" + String(_iMonth+1 ) + "/" + String( _iDay );	
//					txtEndTime.txtAsset.autoSize = TextFieldAutoSize.RIGHT;
					
					m_searchEndYear = _iYear;
					m_searchEndMonth = _iMonth;
					m_searchEndDay = _iDay;
				}else{
					m_nMinSearchTime = _date.getTime();
					/*txtStartTime.txtAsset.autoSize = TextFieldAutoSize.RIGHT;
					txtStartTime.text = String(_iYear) + "/" + String(_iMonth+1 ) + "/" + String( _iDay );*/
										
				}
				

				txtStartTime.text = String(_iYear) + "/" + String(_iMonth+1 ) + "/" + String( _iDay );
//				txtStartTime.txtAsset.autoSize = TextFieldAutoSize.RIGHT;
				
				m_startYear = _iYear;
				m_startMonth = _iMonth;
				m_startDay = _iDay;
			}
			else if( _dateChooser.selectType == _dateChooser.EndTimeType ) {
				_date = new Date(_iYear , _iMonth , _iDay );
				var _endTime:Number = _date.getTime();
				if( _endTime < m_nMinSearchTime ){			
					m_nMinSearchTime = _endTime;
					m_nMaxSearchTime = _endTime;
					
					txtStartTime.text = String( _iYear ) + "/" + String( _iMonth+1 ) + "/" + String( _iDay );
//					txtStartTime.txtAsset.autoSize = TextFieldAutoSize.RIGHT;
					
					m_startYear = _iYear;
					m_startMonth = _iMonth;
					m_startDay 	= _iDay;
				}else {
					m_nMaxSearchTime = _date.getTime();
					
				}
				
				txtEndTime.text = String(_iYear) + "/" + String(_iMonth+1 ) + "/" + String( _iDay );			
//				txtEndTime.txtAsset.autoSize = TextFieldAutoSize.RIGHT;
				
				m_searchEndYear = _iYear;
				m_searchEndMonth = _iMonth;
				m_searchEndDay = _iDay;				
			}
			
			//針對玩家選擇的開始日期 , 推出實際的搜尋開始日期
			setSearchStartDate();
			//選擇日期  還原索引
			m_iCurrentIdx = 0;			
		}
		
		/**
		 * 更新日期
		 */
		public updateDate( _iYear:number, _iMonth:number, _iDay:number):void {
			var _tfTarget:Text;
			if( _dateChooser.selectType == _dateChooser.StartTimeType ){
				_tfTarget = txtStartTime;
				_tfTarget.text = String( _iYear ) + "/" + String( _iMonth+1 ) + "/" + String( _iDay );
			}
			else if( _dateChooser.selectType == _dateChooser.EndTimeType ) {
				_tfTarget = txtEndTime;
				_tfTarget.text = String( _iYear ) + "/" + String( _iMonth+1 ) + "/" + String( _iDay );
			}
			_tfTarget.txtAsset.autoSize = TextFieldAutoSize.RIGHT;
			
		}
		
		 public onChangeLanguage():void {
			m_mcAsset.gotoAndStop(LobbyManager.getInstance().lobbyAuth.Lang+1);
			m_mcNoLog.gotoAndStop(LobbyManager.getInstance().lobbyAuth.Lang+1);
			
			
			txtStartTime.text = String( m_startYear ) + "/" + String( m_startMonth+1 ) + "/" + String(  m_startDay );
			search.onChangeLanguage();
			_dateChooser.onChangeLanguage();
		}
		
		/**
		 * 
		 */
		public updateUI(_gameRecordApiStruct:GameRecordApiStruct):void {
			m_gameLogListStruct = _gameRecordApiStruct;
			var _bHasLog: boolean = false;
			var _gameLogListStruct:GameLogListStruct = _gameRecordApiStruct.RecordList;
			if( _gameLogListStruct != null ){
				resetText();
				updateSummary( _gameLogListStruct.LogSummary );			//更新統計結果
				updateComplexGameList( _gameLogListStruct.ComplexGameList );
				gameRecordApiStruct = _gameRecordApiStruct;
				updateText();
				onChangeLanguage();
				
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
				m_mcNoLog.visible = false;
			}else {
				m_mcNoLog.visible = true;
				m_mcNoLog.gotoAndStop(LobbyManager.getInstance().lobbyAuth.Lang+1);
			}

			if( _dateChooser ){
				addChild( _dateChooser );
			}
			hideLoding();
		}
		
		private updateText():void {
			var _gameLogListStruct:GameLogListStruct = m_gameLogListStruct.RecordList;
			var _iPage:number=int(_gameLogListStruct.LogSummary.TotalDataCount / iRequestDataSize );
			
			//選擇其他日期
			if( (sPreEndTime != sEndTime) || (sPreStartTime != sStartTime) ){
				m_iCurrentPage = 1;
				m_iCurrentIdx = 0;
			}
			
			if( _gameLogListStruct.LogSummary.TotalDataCount > iRequestDataSize &&
				_gameLogListStruct.LogSummary.TotalDataCount % iRequestDataSize != 0 ){				
				txt_Page.text = String(m_iCurrentPage) +"/" + String( _iPage  + 1 );
			}
			else {
				
				
				//一頁資料 或 不滿一頁資料
				if( _iPage == 0 ){
					_iPage = 1;
					m_iCurrentPage = 1;
					m_iCurrentIdx = 0;
				}
				
				txt_Page.text = String(m_iCurrentPage) +"/" +String( _iPage );
			}			
		}
		
		private updateSummary(_gameLogSummaryStruct:GameLogSummaryStruct):void {
			/**小計*/
			txtBetGold_Sum.text = String(_gameLogSummaryStruct.SubtotalBetAmount);
			txtPayOut_Sum.text = String(_gameLogSummaryStruct.SubtotalResultAmount);
			txtAvailableBet_Sum.text = String(_gameLogSummaryStruct.SubtotalRakeAmount);
			
			/**總計*/
			txtBetGold_Total_Sum.text = String(_gameLogSummaryStruct.TotalBetAmount);
			txtPayOut_Total_Sum.text = String(_gameLogSummaryStruct.TotalResultAmount);
			txtAvailableBet_Total_Sum.text = String(_gameLogSummaryStruct.TotalRakeAmount);
			
			
			//共計
			m_iDataSize = _gameLogSummaryStruct.TotalDataCount;
			txt_TotalPage.text = String(m_iDataSize);
			
//			if( _gameLogSummaryStruct.TotalBetAmount < 0 ){
//				txtBetGold_Sum.text = "";
//				txtPayOut_Sum.text = "";
//				txtAvailableBet_Sum.text = "";
//				txtBetGold_Total_Sum.text = "";
//				txtPayOut_Total_Sum.text = "";
//				txtAvailableBet_Total_Sum.text = "";
//			}
		}
		
		/**
		 * 更新下注紀錄結果
		 */
		public updateGameRecord( _sGameNo:String ):void {
			var _bRes: boolean = m_pool.find( _sGameNo );
			if( _bRes ){
				searchBetGameRecord();
			}
			
		}

		
		private updateComplexGameList( _aComplexGameList:any[] ):void {
			if( !m_pool ){
				return;
			}
			
			if( !_aComplexGameList ){
				return;
			}
			
			m_pool.reset();
			var _iDateSize:number= m_gameLogListStruct.RecordList.LogSummary.TotalDataCount;				//總資料筆數
			
			if( _iDateSize % iRequestDataSize > 0 ){
				m_iMaxPage = int( _iDateSize / iRequestDataSize) + 1 ;							//最大頁數 = 總筆數 / 單頁資料筆數
			}
			else {
				m_iMaxPage = int( _iDateSize / iRequestDataSize);
			}
			
			if( m_iMaxPage == 0 ){
				m_iMaxPage = 1;
			}
			
			if( m_iMaxPage == 1 ){			//只有一頁 鎖按鈕
				btnGo.enabled = false;
				m_txtInput.mouseEnabled = false;
				btnFirstPage.enabled = false;
				btnLastPage.enabled = false;
				btnPreviousPage.enabled = false;
				btnNextPage.enabled = false;
			}
			else {
				btnGo.enabled = true;
				m_txtInput.mouseEnabled = true;
				btnFirstPage.enabled = true;
				btnLastPage.enabled = true;
				btnPreviousPage.enabled = true;
				btnNextPage.enabled = true;				
			}
			
			var _iLength:number= m_gameLogListStruct.RecordList.ComplexGameList.length;
			var _subList:SubBetList;
			
			var listNumber:String = "";
			var betTime:String = "";
			var gameType:String = "";
			var tableId:String = "";
			var result:String = "";
			var totalBet:String = "";
			var payOut:String = "";
			var availableBet:String = "";
			var state:String = "";
			
			for( var i:number= 0; i < _iLength ; i++)
			{
				_subList = m_pool.getSubList();
				_subList.complexGameRecordStruct = _aComplexGameList[i];
				_subList.fMouseOver = showMoveLight;
				_subList.fMouseOut = hideMoveLight;
				_subList.fClick	   = showClickLight;
				
				
				var _gameID:number= ComplexGameRecordStruct( _aComplexGameList[i] ).BaseRecord.GameID;
				var _baseRecordStruct:BaseRecordStruct = ( _aComplexGameList[i].BaseRecord as BaseRecordStruct); 
				var _baccaratData:BaccaratGameRecordStruct	= ( _aComplexGameList[i].BaccaratData as BaccaratGameRecordStruct);
				var _sicboData:SicboGameRecordStruct	= ( _aComplexGameList[i].SicboData as SicboGameRecordStruct);
				var _dragonTigerData:DragonTigerGameRecordStruct	= ( _aComplexGameList[i].DragonTigerData as DragonTigerGameRecordStruct);
				var _rouletteData:RouletteGameRecordStruct	= ( _aComplexGameList[i].RouletteData as RouletteGameRecordStruct);
				
				listNumber = String(_baseRecordStruct.RecordGameNumber);		
				availableBet =  String(_baseRecordStruct.RakeAmount);		
				//_subList.txtListNumber.text 	=  String(_baseRecordStruct.RecordGameNumber);		
				//_subList.txtAvailableBet.text 	=  String(_baseRecordStruct.RakeAmount);		
				
				var _str:String = String(_baseRecordStruct.BetCreateDateTime);
				var _ar:any[] = _str.split("T");
				var _ar2:any[] = _ar[0].split('-');
				var _nYear:Number = Number(_ar2[0]);
				var _nMonth:Number = Number(_ar2[1])-1
				var _nDay:Number = Number(_ar2[2]);

				var _ar3:any[] = _ar[1].split(':');
				var _nHour:Number = Number(_ar3[0]);
				var _nMin:Number = Number(_ar3[1])
				var _nSec:Number = Number(_ar3[2]);			
				
				//UTC 轉本地時間
				var _date:Date = new Date(_nYear , _nMonth ,_nDay , _nHour , _nMin , _nSec  );
				var offsetMilliseconds:Number = _date.getTimezoneOffset() * 60 * 1000;
				
//				console.log("offsetMilliseconds::" + offsetMilliseconds );
				_date.setTime( _date.getTime() - offsetMilliseconds );
				var _iMonth:number= _date.getMonth();
				var _sMonth:String;
				if( _iMonth < 9 ){
					_sMonth = "0" + (_iMonth+1);
				}
				else {
					_sMonth = String(_iMonth+1);
				}
				
				var _iDay:number= _date.getDate();
				var _sDay:String;
				if( _iDay < 10 ){
					_sDay = "0" + (_iDay);
				}
				else {
					_sDay = String(_iDay);
				}
				
				
				var _iHours:number= _date.getHours();
				var _sHours:String;
				if( _iHours < 10 ){
					_sHours = "0" + (_iHours);
				}
				else if( _iHours == 0 ){
					_sHours = "24";
				}
				else {
					_sHours = String(_iHours);
				}
				
				var _iMin:number= _date.getMinutes();
				var _sMin:String;
				
				
				if( _iMin < 10 ){
					_sMin = "0" + (_iMin);
				}
				else {
					_sMin = String(_iMin);
				}
				
				var _iSecond : int = _date.getSeconds();
				var _sSecond : String;
				if(_iSecond<10){
					_sSecond = "0" + _iSecond;
				}else{
					_sSecond = String(_iSecond);
				}
				
				//2016-03-11T09:31:13  ->   2016-03—07 09:09
				betTime = String(_date.getFullYear() +"-"+  _sMonth + "-" + _sDay + " " + _sHours + ":" + _sMin + ":" + _sSecond );
				tableId = String(_baseRecordStruct.TableID);
				totalBet = String(_baseRecordStruct.GoldCoinBet);
				payOut = String(_baseRecordStruct.ResultAmount);
				availableBet = String(_baseRecordStruct.RakeAmount );
				//_subList.txtBetTime.text 		=  String(_date.getFullYear() +"-"+  _sMonth + "-" + _sDay + " " + _sHours + ":" + _sMin );
				//_subList.txtTableID.text 		=  String(_baseRecordStruct.TableID);
				//_subList.txtTotalBet.text		=  String(_baseRecordStruct.GoldCoinBet);
				//_subList.txtPayOut.text			=  String(_baseRecordStruct.ResultAmount);
				//_subList.txtAvailableBet.text	=  String(_baseRecordStruct.RakeAmount );
				
		
				if( _gameID == GameDefine.BAC )
				{
					gameType = LobbyManager.getInstance().getLanguageString( Language.sGame_Name_Bac );
					//_subList.txtGameType.text 	=  LobbyManager.getInstance().getLanguageString( Language.sGame_Name_Bac );
					var _sPlayer:String =LobbyManager.getInstance().getLanguageString( Language.sP ) ;
					var _sBanker:String = LobbyManager.getInstance().getLanguageString( Language.sB ) ;
					result = _sPlayer + String(_baccaratData.PlayerTotalPoint) + _sBanker +  String(_baccaratData.BankerTotalPoint);
					//_subList.txtResult.text =  _sPlayer + String(_baccaratData.PlayerTotalPoint) + _sBanker +  String(_baccaratData.BankerTotalPoint);
				}
				else if( _gameID == GameDefine.SIC ){
					gameType 	=  LobbyManager.getInstance().getLanguageString( Language.sGame_Name_Sic );
					var _sicAr:any[] = [_sicboData.Dice_1 , _sicboData.Dice_2 , _sicboData.Dice_3 ];
					_sicAr.sort(Array.NUMERIC);
					result = String(_sicAr[0]) + String(_sicAr[1]) + String(_sicAr[2]);
					//_subList.txtResult.text = String(_sicAr[0]) + String(_sicAr[1]) + String(_sicAr[2]);
				}
				else if( _gameID == GameDefine.ROU ){
					gameType 	=  LobbyManager.getInstance().getLanguageString( Language.sGame_Name_Rou );
					result = String(_rouletteData.RouletteNumber);
					//_subList.txtResult.text = String(_rouletteData.RouletteNumber);
				}
				else if( _gameID == GameDefine.DTF ){
					gameType 	=  LobbyManager.getInstance().getLanguageString( Language.sGame_Name_DTF );
					var _sDragon:String = LobbyManager.getInstance().getLanguageString( Language.sD );
					var _sTiger:String = LobbyManager.getInstance().getLanguageString( Language.sT );
					result = String( _sDragon+transDtfPoints(_dragonTigerData.DragonPoint)+_sTiger+transDtfPoints(_dragonTigerData.TigerPoint) );
					//_subList.txtResult.text = String( _sDragon + transDtfPoints(_dragonTigerData.DragonPoint) + 
					//						 _sTiger + transDtfPoints(_dragonTigerData.TigerPoint) );
				}
				
				if( _baseRecordStruct.IsResult ){
					state = LobbyManager.getInstance().getLanguageString( Language.sIsPayOuted );
					//_subList.txtState.text			=   LobbyManager.getInstance().getLanguageString( Language.sIsPayOuted );
				}
				else 
				{
					state =  LobbyManager.getInstance().getLanguageString( Language.sNoPayOut );
					//_subList.txtState.text			=   LobbyManager.getInstance().getLanguageString( Language.sNoPayOut );
				}	//end else
				
				
				_subList.updateUI(listNumber,betTime,gameType,tableId,result,totalBet,payOut,availableBet,state,_baseRecordStruct.IsResult);
				_subList.x = mcPos.x;
				_subList.y = mcPos.y + i*subListDistanceY;
				
				addChild( _subList );
			}//end for
		
		}
		
		private transDtfPoints(_iPoint:number):String {
			var _str:String = "";
			
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
				_str = String(_iPoint);
			}
			
			
			return _str;
		}		
		
		private hideMoveLight(event:MouseEvent):void{
			mcMoveLight.visible = false;
		}
		
		private showMoveLight(event:MouseEvent):void {
			if( m_selectSubList == event.currentTarget ){
				return;
			}			
			mcMoveLight.x = event.currentTarget.x - 1;
			mcMoveLight.y = event.currentTarget.y - 1;
			mcMoveLight.visible = true;
		}
		
		private showClickLight(_target:SubBetList):void {
			m_selectSubList = _target;
			mcClickLight.x = _target.x - 1;
			mcClickLight.y = _target.y - 1;
			mcClickLight.visible = true;			
		}
		
		public hideClickLight():void {
			mcClickLight.visible = false;
		}
		
		 public destroy():void {
			if( _dateChooser ){
				_dateChooser.enabled = false;
			}
						
		}
		
		set  enabled( _bValue: boolean ) {
			if( _dateChooser ){
				_dateChooser.enabled = true;
			}
		}
		
		public showLoading():void{
			if(m_loading){
				m_loading.gotoAndPlay(1);
				m_loading.visible = true;
			}
			if(m_mcNoLog) {
				m_mcNoLog.visible = false;
			}
			
		}
		public hideLoding():void{
			if(m_loading){
				m_loading.gotoAndStop(1);
				m_loading.visible = false;
			}
			
		}	
		
		public checkBetCord():void {
			//
			if( !m_gameLogListStruct ){
				//驗證是否有紀錄
				if( _bHasLog ){
					m_mcNoLog.visible = false;
				}else {
					m_mcNoLog.visible = true;
					m_mcNoLog.gotoAndStop(LobbyManager.getInstance().lobbyAuth.Lang+1);
					hideLoding();
				}		
				return;
			}
			
			
			var _bHasLog: boolean = false;
			var _gameLogListStruct:GameLogListStruct = m_gameLogListStruct.RecordList;			
			if( _gameLogListStruct.LogSummary.TotalDataCount == 0 ){
				_bHasLog = false;
			}
			else {
				_bHasLog = true;
			}		
			//驗證是否有紀錄
			if( _bHasLog ){
				m_mcNoLog.visible = false;
			}else {
				m_mcNoLog.visible = true;
				m_mcNoLog.gotoAndStop(LobbyManager.getInstance().lobbyAuth.Lang+1);
				hideLoding();
			}
		}
		
		
	}
}
import flash.display.MovieClip;
import flash.events.MouseEvent;
import flash.text.TextField;

import component.button.SingleButtonMC;

import manager.LobbyManager;


class Btn extends SingleButtonMC {
	public txtLabel:MovieClip;
	public Btn(mcButton:MovieClip, $fOnClick:Function , sLangLey:String ):void {
		super(mcButton , $fOnClick );
		txtLabel = mcButton.tf_label;
	}
	
	public onChangeLanguage():void {
		txtLabel.gotoAndStop(LobbyManager.getInstance().lobbyAuth.Lang+1);
	}	
}