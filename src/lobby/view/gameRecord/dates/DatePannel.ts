module lobby.view.gameRecord.dates {
	export class DatePannel extends BSprite{
		public mcAsset					;
		public _aDate					:	any[];					//12個月各月的天數, 2月會拉出來 額外計算是否為閏年
		public _iLimitMinYear			:	number = 2000;				//最小2000年
		
		public btnPreious				:	ui.button.SingleButtonMC;
		public btnNext					:	ui.button.SingleButtonMC;
		
		private m_nSelectYear			:	number;						//玩家選擇的年
		private m_nSelectMonth			:	number;						//玩家選擇的月
		private m_nSelectDay			:	number;						//玩家選擇的日
		
		private m_nSelectYear2			:	number;						//玩家選擇的年
		private m_nSelectMonth2			:	number;						//玩家選擇的月
		private m_nSelectDay2			:	number;						//玩家選擇的日
		
		private m_vecDate				:	McDate[];
		
		public selectType				:	number;
		
		public StartTimeType			:	number = 0;
		public EndTimeType				:	number = 1;
		
		public noCurrentMonthTextColor	:	number = 0xCCCCCC;		//不是當月的 文字格式
		public selectTextColor			:	number  = 0xFFFFFF;		//選取的文字格式
		public normalTextColor			:	number  = 0x767676;		//當月的文字格式
		
		private m_tfSelect				;
		private m_tfNormal				;
		private m_tfNoCurrentMonth		;
		
		public  iCurrentYear			:	number;					//當年
		public  iCurrentMonth			:	number;					//當月
		public  iCurrentDay				:	number;					//當天
		
		private m_iMinYear				:	number;					//最小查詢年
		private m_iMinMonth				:	number;					//最小查詢月
		private m_iMinDay				:	number;					//最小查詢天
		private m_timer					:	egret.Timer;					//計時器
		private m_bInit					:	boolean;				//

		private bgsprite				:	egret.Sprite;					//背景

		public constructor() {
			
			super();
			this.drawBG();
			
			this.mcAsset = manager.ResourceManager.getInstance().getInstanceByNameFromDomain(define.Define.SWF_BET_CORD,"Link_Date");
			
			this.addChild(this.mcAsset);
			
			
			this._aDate = [ 31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31 ];	//index 0無用到

			this.init();
		}

		
		public drawBG():void{
			var stageW:number= manager.LobbyManager.getInstance().stage.width;
			var stageH:number= manager.LobbyManager.getInstance().stage.height;
			
			this.bgsprite = new egret.Sprite();
			this.bgsprite.graphics.beginFill(0x000000, 0);
			this.bgsprite.graphics.drawRect(-(stageW/2), -(stageH/2),stageW, stageH);
			this.bgsprite.graphics.endFill();
			this.addChild(this.bgsprite);
			
			this.bgsprite.addEventListener(egret.TouchEvent.TOUCH_TAP,this.clickhandler, this);
		}
		
		public clickhandler(e:MouseEvent):void{
			this.visible = false;
		}
		
		set enabled( _bValue: boolean ) {
			if( _bValue ){
				this.m_timer.start();
			}else {
				this.visible = false;
			}
		}
		
		private init():void {
			//設定當天的年月日
			this.setCurrentDate();
			var _nYear:number = this.iCurrentYear;
			var _nMonth:number =  this.iCurrentMonth;
			var _nDay:number =  this.iCurrentDay;
			
			//預設玩家當天選擇的年月日
			this.m_nSelectYear2 =this. m_nSelectYear = this.iCurrentYear;
			this.m_nSelectMonth2 = this.m_nSelectMonth = this.iCurrentMonth;
			this.m_nSelectDay2 = this.m_nSelectDay = this.iCurrentDay;
			
			var _sYear:string =  ( _nYear ).toString + manager.LobbyManager.getInstance().getLanguageString(language.Language.sYear);
			var _sMonth:string;
			if( _nMonth < 10 ){
				_sMonth =  "0" + (_nMonth ).toString + manager.LobbyManager.getInstance().getLanguageString(language.Language.sMonth);
			}
			else {
				_sMonth =  ( _nMonth ).toString + manager.LobbyManager.getInstance().getLanguageString(language.Language.sMonth);
			}
			
			
			var _sDay:string;
			if( _nDay < 10 ){
				_sDay =  "0" + (_nDay).toString + manager.LobbyManager.getInstance().getLanguageString(language.Language.sDay);
			}
			else {
				_sDay =  ( _nDay ).toString + manager.LobbyManager.getInstance().getLanguageString(language.Language.sDay);
			}			
			
			//顯示面板中的 年月日
			this.mcAsset.tf_label.text = _sYear + "-" + _sMonth + "-"  + _sDay;
			
			//上一頁按鈕
			this.btnPreious = new ui.button.SingleButtonMC( this.mcAsset.mc_previous , this.onPrevious );
			//下一頁按鈕
			this.btnNext =  new ui.button.SingleButtonMC( this.mcAsset.mc_next , this.onNext );
			this.btnNext.enabled = false;
			
			this.m_vecDate = new Array<McDate>();
			
			//文字樣式  , 可選擇, 當月, 不是當月  
			// this.m_tfSelect 			= new TextFormat( null, null , this.selectTextColor); 
			// this.m_tfNormal 			= new TextFormat( null, null , this.normalTextColor);
			// this.m_tfNoCurrentMonth 	= new TextFormat( null, null , this.noCurrentMonthTextColor);
			
			//設定最小年月日
			this.setMinDate();
			
			var _iDate:number = this.countDate( this.m_nSelectYear2 , this.m_nSelectMonth2+1 );		//計算出這個月的第一天是 星期幾
			this.updateDateUI( _iDate );

			this.onChangeLanguage();
			// this.m_timer = JTimer.getTimer(1000);
			// this.m_timer.addTimerCallback(this.onTimer);
			this.m_timer = new egret.Timer(1000);
			this.m_timer.addEventListener(egret.TimerEvent.TIMER , this.onTimer, this );
			this.m_timer.start();
		}	
		
		public run():void {
			if( this.m_timer ){
				this.m_timer.start();
			}
		}
		
		public stop():void {
			if( this.m_timer ){
				this.m_timer.stop();
			}
		}
		
		protected onTimer():void{
//			console.log("Timer::::::::::::::::::::::::::::::::::::::::::::::::");
			
			//設定最新日期
			this.setCurrentDate();
			//設定最小日期
			this.setMinDate();
			
			var _date:Date = new Date();
			
			var _iDate:number= this.countDate( this.m_nSelectYear2 , this.m_nSelectMonth2+1 );		//計算出這個月的第一天是 星期幾
			this.updateDateUI(_iDate);
			
			
			var _nMinTimeMs:number = _date.setFullYear(this.m_iMinYear , this.m_iMinMonth , 0 );
			var _nCurrentTimeMs:number = _date.setFullYear(this.iCurrentYear , this.iCurrentMonth , 0 );
			var _nSelectTimeMs:number = _date.setFullYear( this.m_nSelectYear2, this.m_nSelectMonth2 , 0  );
			
			if( _nSelectTimeMs >= _nCurrentTimeMs ){
				this.btnNext.enabled = false;
			}else {
				this.btnNext.enabled = true;
			}
			
			if( _nSelectTimeMs <= _nMinTimeMs ){
				this.btnPreious.enabled = false;
			}else {
				this.btnPreious.enabled = true;
			}
			
			_date = null;
		}
		
		private setCurrentDate():void {
			var _date:Date = new Date();
			var _nYear:number = _date.getFullYear();
			var _nMonth:number =  _date.getMonth();
			var _nDay:number =  _date.getDate();
			
			this.iCurrentYear  = _nYear;
			this.iCurrentMonth = _nMonth;
			this.iCurrentDay  = _nDay;			
			
		}
		
		/**
		 * 計算 最小所能蒐索的 下注紀錄 年月日
		 */
		private setMinDate():void {
			
			var _date:Date = new Date(this.iCurrentYear , this.iCurrentMonth , this.iCurrentDay);
			var _ms:number = 14 * 24 * 60 * 60 * 1000;		//毫秒 
			
			_date.setTime( _date.getTime() - _ms );			//少14天
			
			/*if( this.iCurrentDay >= 14 ){
				this.m_iMinYear = this.iCurrentYear;
				this.m_iMinMonth = this.iCurrentMonth;
				this.m_iMinDay = this.iCurrentDay - 14 + 1;
			}
			else {
				this.m_iMinYear = this.iCurrentYear;
				this.m_iMinMonth = this.iCurrentMonth;				
				this.m_iMinMonth -= 1;
				
				if( this.m_iMinMonth <= 0 ){
					this.m_iMinYear = this.iCurrentYear - 1;
					this.m_iMinMonth = 12;
				}
				
				var _isubDay:number= 14 - this.iCurrentDay;
				
				this.m_iMinDay = countTotalDay( this.m_iMinYear , this.m_iMinMonth );
				this.m_iMinDay = this.m_iMinDay - _isubDay + 1;
				
			}*/
			
			this.m_iMinYear = _date.getFullYear();
			this.m_iMinMonth = _date.getMonth();
			this.m_iMinDay = _date.getDate();
			
/*			console.log("最小年:" + this.m_iMinYear );
			console.log("最小月:" + (this.m_iMinMonth+1) );
			console.log("最小日:" + this.m_iMinDay );*/
			
		}
		
		
		
		public reset():void {
			var _mc:McDate;
			var i:number;
			if( this.m_vecDate.length == 0 ){
				for( i = 0 ; i < 42 ; i++ ){
					_mc = new McDate(this.mcAsset["mc_" + i] , this.m_tfSelect , this.m_tfNormal );
					_mc.fClick = this.selectDate;
					_mc.enable 	= true;
					this.m_vecDate.push( _mc ); 
				}		
			}
			else {
				for( i = 0 ; i < 42 ; i++ ){
					this.m_vecDate[i].mcAsset.tf_label.text = "";
					this.m_vecDate[i].mcAsset.mc_0.visible = false;
					this.m_vecDate[i].enable 	= true;
					this.m_vecDate[i].bSelect	= false;
					// TextField(this.m_vecDate[i].mcAsset.tf_label).defaultTextFormat = this.m_tfNormal;
				}	
				
			}
			
			

		}
		
		/**
		 * 選擇日期
		 */
		private selectDate( _aDate:any[] ):void {

			this.m_nSelectYear	=  _aDate[0];
			this.m_nSelectMonth  =  _aDate[1];
			this.m_nSelectDay	= _aDate[2];
			
			manager.GameRecordManager.getInstance().betRecordPannel.setDate( this.m_nSelectYear,  this.m_nSelectMonth , this.m_nSelectDay );
			this.updateTitle();
			manager.GameRecordManager.getInstance().betRecordPannel.updateDate( this.m_nSelectYear,  this.m_nSelectMonth , this.m_nSelectDay );
			this.visible = false;
			

		}
		
		private onPrevious(event:MouseEvent):void
		{
			manager.SoundManager.getInstance().play(sound.SoundPackage.sClick_Tools);
			
			var _iDate:number;
			
			if( this.m_nSelectMonth2 > 0 ){
				this.m_nSelectMonth = this.m_nSelectMonth2 = this.iCurrentMonth -1;
				this.m_nSelectDay2 = this.m_nSelectDay = 0;
			}
			else {
				
				this.m_nSelectYear2 = this.m_nSelectYear  = this.iCurrentYear-1;
				if( this.m_nSelectYear2 > this._iLimitMinYear ){
					this.m_nSelectMonth2 = this.m_nSelectMonth = 11;
					this.m_nSelectDay2 = this.m_nSelectDay = 0;
				}
				else {
					this.m_nSelectYear2 = this.m_nSelectYear = this._iLimitMinYear;
				}
			} 
			
			this.onTimer();

		}	
	
		
		private onNext(event:MouseEvent):void
		{
			manager.SoundManager.getInstance().play(sound.SoundPackage.sClick_Tools);
			
			var _date:number;
			if( this.m_nSelectMonth2 < 11 ){
				this.m_nSelectMonth2 = this.m_nSelectMonth = this.m_nSelectMonth2+1;
				this.m_nSelectDay2 = this.m_nSelectDay = 0;
			}
			else {
				
				this.m_nSelectYear2 = this.m_nSelectYear = this.m_nSelectYear2+1;
				this.m_nSelectMonth2 = this.m_nSelectMonth = 0;
				this.m_nSelectDay2 = this.m_nSelectDay = 0;
			}
			
			this.onTimer();
			
			
			
		}	
		
		 set visible( _bValue: boolean ) {
			this.onTimer();
		}
		
		 public destroy():void {

			if( this.m_timer ){
				this.m_timer.stop();
			}
			
			if ( this.bgsprite ) {
				if ( this.contains( this.bgsprite ) ) {
					this.bgsprite.removeEventListener(egret.TouchEvent.TOUCH_TAP,this.clickhandler, this);
					this.removeChild( this.bgsprite );
				}
				this.bgsprite  = null;
			}
			
		}
		
		
		 public onChangeLanguage():void {
			this.mcAsset.gotoAndStop(manager.LobbyManager.getInstance().lobbyAuth.Lang+1);
			this.updateTitle();
			
		}
		
		private updateTitle():void {
			var _nYear:number = this.m_nSelectYear;
			var _sYear:string =  ( _nYear ).toString + manager.LobbyManager.getInstance().getLanguageString(language.Language.sYear);
			var _nMonth:number =  this.m_nSelectMonth+1;
			var _sMonth:string;
			if( _nMonth < 10 ){
				_sMonth =  "0" + (_nMonth ).toString + manager.LobbyManager.getInstance().getLanguageString(language.Language.sMonth);
			}
			else {
				_sMonth =  ( _nMonth ).toString + manager.LobbyManager.getInstance().getLanguageString(language.Language.sMonth);
			}		
//			sDay
			var _sDay:string;
			if( this.m_nSelectDay < 10 && this.m_nSelectDay > 0 ){
				_sDay = "0" + (this.m_nSelectDay ).toString + manager.LobbyManager.getInstance().getLanguageString(language.Language.sDay);
			}
			else {
				_sDay =  ( this.m_nSelectDay ).toString + manager.LobbyManager.getInstance().getLanguageString(language.Language.sDay);
			}
			
			if( this.m_nSelectDay == 0 ){
				this.mcAsset.tf_label.text = _sYear + "-" + _sMonth ;  
			}
			else {
				this.mcAsset.tf_label.text = _sYear + "-" + _sMonth + "-"  + _sDay  ;  
			}
				
			
		}
		
		private isLeapYear( _iYear:number):number{
			if( ( _iYear % 4 == 0 ) && ( _iYear % 100 != 0 ) ||  _iYear % 400 == 0 ){
				return 29;		//閏年
			}
			else {
				return 28;
			}
		}
		
		/**
		 * 計算星期幾
		 * 年月日
		 */
		private countDate( iYear:number, iMonth:number, iDay:number= 1 ):number{
			
			//如果是閏年，2月就多加1天變成29天 
			this._aDate[1] = this.isLeapYear(iYear);
			//計算這一天是一年中的第幾天 
			var d:number;
			var i:number;
			d = iDay;
			for (i=0; i<iMonth-1; i++) {
				d += this._aDate[i];
			}
			//根據公式去計算這一天是星期幾 
			iYear--;
			d += iYear + (iYear/4) - (iYear/100) + (iYear/400);			//公式
			d += 7; //此處+7是避免d算出來是負值的情況
			d %= 7; //算出星期幾 		
			
			
			return d; 
		}
		
		
		/**
		 * @param _iDate 星期幾
		 */
		private updateDateUI(_iDate:number):void {
			this.reset();
			
			var _iCurrentDay:number= this.countTotalDay( this.m_nSelectYear2 , this.m_nSelectMonth2+1 );		//計算當月天數
			var _idx:number= _iDate;
			var _date3:Date = new Date();
			var _nCurrentTimeMs:number;
			var _nSelectTimeMs:number;
			var _nMinTimeMs:number;
			//禮拜日 統一 往後 推一星期
			if( _iDate == 0 ){
				_idx += 7;
			}			
			for( var i:number= 0 ; i < _iCurrentDay ; i++ ){
				this.m_vecDate[_idx].mcAsset.tf_label.text = (i+1).toString;
				this.m_vecDate[_idx].iYear = this.m_nSelectYear2;
				this.m_vecDate[_idx].iMonth = this.m_nSelectMonth2;
				this.m_vecDate[_idx].iDay = i+1;
				this.m_vecDate[_idx].tfNormal = this.m_tfNormal;
				this.m_vecDate[_idx].tfSelect = this.m_tfSelect;
				
				this.m_vecDate[_idx].canSelectState = true;
				
				_nCurrentTimeMs = _date3.setFullYear(this.iCurrentYear , this.iCurrentMonth , this.iCurrentDay );
				_nSelectTimeMs = _date3.setFullYear(this.m_nSelectYear2 , this.m_nSelectMonth2 , (i+1) );
				_nMinTimeMs = _date3.setFullYear(this.m_iMinYear , this.m_iMinMonth , this.m_iMinDay );
				if( _nSelectTimeMs > _nCurrentTimeMs ){		//超過當天日期
					this.m_vecDate[_idx].defaultState();
					this.m_vecDate[_idx].enable = false;
					this.m_vecDate[_idx].tfNormal = this.m_tfNoCurrentMonth;
					this.m_vecDate[_idx].tfSelect = this.m_tfSelect;
					this.m_vecDate[_idx].canSelectState = false;
				}
				else if( _nSelectTimeMs <= _nMinTimeMs ) {	//限制最小可選擇的日期
					this.m_vecDate[_idx].defaultState();
					this.m_vecDate[_idx].enable = false;
					this.m_vecDate[_idx].tfNormal = this.m_tfNoCurrentMonth;
					this.m_vecDate[_idx].tfSelect = this.m_tfSelect;	
					this.m_vecDate[_idx].canSelectState = false;
				}
				
				_idx+=1;
			}
			_date3 = null;
			
			var _nPreviousYear:number= this.m_nSelectYear2;					//上個月     年
			var _nPreviousMonth:number= this.m_nSelectMonth2;				//上個月    月
			var _iDayCount:number;										//上個月   天數
			var j:number;
			var _minDate:Date = new Date( this.m_iMinYear , this.m_iMinMonth , this.m_iMinDay );
			var _cmpDate:Date;
				
			if( _nPreviousMonth > 0 ){
				_nPreviousMonth-=1;
				
				//更新 上個月的日期
				_iDayCount = this.countTotalDay(_nPreviousYear , _nPreviousMonth+1);	//算出上個月總天數	
				
				if( _iDate > 0 ){
					while( _iDate > 0 ){
						_iDate-=1;
						
						// TextField(this.m_vecDate[_iDate].mcAsset.tf_label).defaultTextFormat = this.m_tfNoCurrentMonth;
						this.m_vecDate[_iDate].mcAsset.tf_label.text = (_iDayCount).toString;
						this.m_vecDate[_iDate].iYear = _nPreviousYear;
						this.m_vecDate[_iDate].iMonth = _nPreviousMonth;
						this.m_vecDate[_iDate].iDay = _iDayCount;	
						this.m_vecDate[_iDate].tfSelect = this.m_tfSelect;
						this.m_vecDate[_iDate].tfNormal = this.m_tfNoCurrentMonth;
						this.m_vecDate[_iDate].canSelectState = true;
						
						_cmpDate = new Date( _nPreviousYear , _nPreviousMonth , _iDayCount );
						if( _cmpDate.getTime() <= _minDate.getTime()  ) {
							this.m_vecDate[_iDate].enable = false;
							this.m_vecDate[_iDate].canSelectState = false;
						}						
						_iDayCount -= 1;	
					}	
					
				}
				else if( _iDate == 0 ){
					for( j = 6 ; j >= 0 ; j-- ) {
						// TextField(this.m_vecDate[j].mcAsset.tf_label).defaultTextFormat = this.m_tfNoCurrentMonth;
						this.m_vecDate[j].mcAsset.tf_label.text = (_iDayCount).toString;
						this.m_vecDate[j].iYear = _nPreviousYear;
						this.m_vecDate[j].iMonth = _nPreviousMonth;
						this.m_vecDate[j].iDay 	= _iDayCount;	
						this.m_vecDate[j].tfSelect = this.m_tfSelect;
						this.m_vecDate[j].tfNormal = this.m_tfNoCurrentMonth;		
						this.m_vecDate[j].canSelectState = true;
						
						_cmpDate = new Date( _nPreviousYear , _nPreviousMonth , _iDayCount );
						if( _cmpDate.getTime() <= _minDate.getTime()  ) {
							this.m_vecDate[j].enable = false;
							this.m_vecDate[j].canSelectState = false;
						}	
						
						_iDayCount -= 1;
					}
					
					
					
				}	
				
			}
			else {
				
				_nPreviousYear -=1;     //去年
				_nPreviousMonth = 11;   //去年從12月
				//更新 上個月的日期
				_iDayCount = this.countTotalDay(_nPreviousYear , _nPreviousMonth+1);	//算出上個月總天數	
				
				if( _iDate > 0 ){
					while( _iDate > 0 ){
						_iDate-=1;
						// TextField(this.m_vecDate[_iDate].mcAsset.tf_label).defaultTextFormat = this.m_tfNoCurrentMonth;
						this.m_vecDate[_iDate].mcAsset.tf_label.text = (_iDayCount).toString;
						this.m_vecDate[_iDate].iYear = _nPreviousYear;
						this.m_vecDate[_iDate].iMonth = _nPreviousMonth;
						this.m_vecDate[_iDate].iDay = _iDayCount;	
						this.m_vecDate[_iDate].tfSelect = this.m_tfSelect;
						this.m_vecDate[_iDate].tfNormal = this.m_tfNoCurrentMonth;	
						this.m_vecDate[_iDate].canSelectState = true;
						
						_cmpDate = new Date( _nPreviousYear , _nPreviousMonth , _iDayCount );
						if( _cmpDate.getTime() <= _minDate.getTime()  ) {
							this.m_vecDate[_iDate].enable = false;
							this.m_vecDate[_iDate].canSelectState = false;
						}								
						_iDayCount -= 1;	
					}	
					
				}
				else if( _iDate == 0 ){
					for( j = 6 ; j >= 0 ; j--  ) {
						// TextField(this.m_vecDate[j].mcAsset.tf_label).defaultTextFormat = this.m_tfNoCurrentMonth;
						this.m_vecDate[j].mcAsset.tf_label.text = (_iDayCount).toString;
						this.m_vecDate[j].iYear = _nPreviousYear;
						this.m_vecDate[j].iMonth = _nPreviousMonth;
						this.m_vecDate[j].iDay 	= _iDayCount;	
						this.m_vecDate[j].tfSelect = this.m_tfSelect;
						this.m_vecDate[j].tfNormal = this.m_tfNoCurrentMonth;	
						this.m_vecDate[j].canSelectState = true;
						
						_cmpDate = new Date( _nPreviousYear , _nPreviousMonth , _iDayCount );
						if( _cmpDate.getTime() <= _minDate.getTime()  ) {
							this.m_vecDate[j].enable = false;
							this.m_vecDate[j].canSelectState = false;
						}								
						_iDayCount -= 1;
					}
					
				}
	
			}// end else
			
			

	
			
			var _nNextMonth:number= this.m_nSelectMonth2;
			var _nNextYear:number= this.m_nSelectYear2;	
			var _iCmpMonth:number= _nNextMonth +1 ;
			if( _iCmpMonth < 11 ){
				_nNextMonth+=1;
			}
			else {
				_nNextYear += 1;		
				_nNextMonth = 0;
			}
			
			//更新下個月的日期
			var _iday:number= 1;
			var _d1:Date = new Date( this.iCurrentYear , this.iCurrentMonth , this.iCurrentDay );
			
			while( _idx < 42 ){
				// TextField(this.m_vecDate[_idx].mcAsset.tf_label).defaultTextFormat = this.m_tfNoCurrentMonth;
				this.m_vecDate[_idx].mcAsset.tf_label.text = (_iday).toString;
				this.m_vecDate[_idx].iYear	= _nNextYear;
				this.m_vecDate[_idx].iMonth 	= _nNextMonth;
				this.m_vecDate[_idx].iDay 	= _iday;	
				this.m_vecDate[_idx].tfSelect = this.m_tfSelect;
				this.m_vecDate[_idx].tfNormal = this.m_tfNoCurrentMonth;	
				
				var _d2:Date = new Date( _nNextYear , _nNextMonth , _iday );
//				console.log("_d2.getTime() ::" + _d2.getTime()  );
//				console.log("_d1.getTime() ::" + _d1.getTime()  );
				if( _d2.getTime() > _d1.getTime()  ){
					this.m_vecDate[_idx].enable 	= false;
					this.m_vecDate[_idx].canSelectState = false;
				}
				else {
					this.m_vecDate[_idx].canSelectState = true;
				}
				
				_idx += 1;
				_iday +=1;
			}
			
			
		
			
			_d1 = null;
			_d2 = null;
			
			

			
			this.updateTitle();			
			
			
		}
		
		
		
		public countTotalDay( _iYear:number, _iMonth:number):number{
			if( _iMonth == 2 ){			//2月 天數
				if( ( _iYear % 4 == 0 ) && ( _iYear % 100 != 0 ) ||  _iYear % 400 == 0 ){
					return 29;
				}
				else {
					return 28;  
				}	
			}
			else {						//其他月 天數
				
				if (_iMonth==1||_iMonth==3||_iMonth==5||_iMonth==7||_iMonth==8||_iMonth==10||_iMonth==12) {
					return 31;
				}
				else if( _iMonth ==4||_iMonth==6||_iMonth==9 ||_iMonth==11 )
					return 30;
				}
			return 0;
		}
		
		public setDate( _iYear:number, _iMonth:number, _iDay:number):void {
			/*var _iDate:number = countDate( _iYear , _iYear );		//計算出這個月的第一天是 星期幾
			updateDate( _iDate );*/
		}
		
		
		
			
		
		
	}
}
