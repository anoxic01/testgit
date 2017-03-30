module lobby.view.gameRecord.dates {
	export class DatePannel extends BSprite{
		public var mcAsset					:	MovieClip;
		public var _aDate					:	any[];					//12個月各月的天數, 2月會拉出來 額外計算是否為閏年
		public var _iLimitMinYear			:	int = 2000;				//最小2000年
		
		public var btnPreious				:	SingleButtonMC;
		public var btnNext					:	SingleButtonMC;
		
		private var m_nSelectYear			:	Number;						//玩家選擇的年
		private var m_nSelectMonth			:	Number;						//玩家選擇的月
		private var m_nSelectDay			:	Number;						//玩家選擇的日
		
		private var m_nSelectYear2			:	Number;						//玩家選擇的年
		private var m_nSelectMonth2			:	Number;						//玩家選擇的月
		private var m_nSelectDay2			:	Number;						//玩家選擇的日
		
		private var m_vecDate				:	<McDate>;
		
		public var selectType				:	number;
		
		public const StartTimeType			:	int = 0;
		public const EndTimeType			:	int = 1;
		
		public const noCurrentMonthTextColor:number = 0xCCCCCC;		//不是當月的 文字格式
		public const selectTextColor		:number  = 0xFFFFFF;		//選取的文字格式
		public const normalTextColor		:number  = 0x767676;		//當月的文字格式
		
		private var m_tfSelect			:	TextFormat;
		private var m_tfNormal			:	TextFormat;
		private var m_tfNoCurrentMonth	:	TextFormat;
		
		public  var iCurrentYear		:	number;					//當年
		public  var iCurrentMonth		:	number;					//當月
		public  var iCurrentDay			:	number;					//當天
		
		private var m_iMinYear			:	number;					//最小查詢年
		private var m_iMinMonth			:	number;					//最小查詢月
		private var m_iMinDay			:	number;					//最小查詢天
		private var m_timer				:	JTimer;					//計時器
		private var m_bInit				:	 boolean;				//

		private var bgsprite			:	Sprite;					//背景
		public constructor() {
			
			drawBG();
			
			mcAsset = ResourceManager.getInstance().getInstanceByNameFromDomain(Define.SWF_BET_CORD,"Link_Date");
			
			addChild(mcAsset);
			
			
			_aDate = [ 31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31 ];	//index 0無用到

			init();
		}

		
		public function drawBG():void{
			var stageW:number= LobbyManager.getInstance().stage.width;
			var stageH:number= LobbyManager.getInstance().stage.height;
			
			bgsprite = new Sprite();
			bgsprite.graphics.beginFill(0x000000, 0);
			bgsprite.graphics.drawRect(-(stageW/2), -(stageH/2),stageW, stageH);
			bgsprite.graphics.endFill();
			this.addChild(bgsprite);
			
			bgsprite.addEventListener(MouseEvent.CLICK,clickhandler);
		}
		
		public function clickhandler(e:MouseEvent):void{
			this.visible = false;
		}
		
		set enabled( _bValue: boolean ) {
			if( _bValue ){
				m_timer.start();
			}else {
				this.visible = false;
			}
		}
		
		private function init():void {
			//設定當天的年月日
			setCurrentDate();
			var _nYear:Number = iCurrentYear;
			var _nMonth:Number =  iCurrentMonth;
			var _nDay:Number =  iCurrentDay;
			
			//預設玩家當天選擇的年月日
			m_nSelectYear2 = m_nSelectYear = iCurrentYear;
			m_nSelectMonth2 = m_nSelectMonth = iCurrentMonth;
			m_nSelectDay2 = m_nSelectDay = iCurrentDay;
			
			var _sYear:string =  string( _nYear )+ LobbyManager.getInstance().getLanguageString(Language.sYear);
			var _sMonth:string;
			if( _nMonth < 10 ){
				_sMonth =  string("0" + _nMonth )+ LobbyManager.getInstance().getLanguageString(Language.sMonth);
			}
			else {
				_sMonth =  string( _nMonth )+ LobbyManager.getInstance().getLanguageString(Language.sMonth);
			}
			
			
			var _sDay:string;
			if( _nDay < 10 ){
				_sDay =  string("0" + _nDay )+ LobbyManager.getInstance().getLanguageString(Language.sDay);
			}
			else {
				_sDay =  string( _nDay )+ LobbyManager.getInstance().getLanguageString(Language.sDay);
			}			
			
			//顯示面板中的 年月日
			mcAsset.tf_label.text = _sYear + "-" + _sMonth + "-"  + _sDay;
			
			//上一頁按鈕
			btnPreious = new SingleButtonMC( mcAsset.mc_previous , onPrevious );
			//下一頁按鈕
			btnNext =  new SingleButtonMC( mcAsset.mc_next , onNext );
			btnNext.enabled = false;
			
			m_vecDate = new <McDate>();
			
			//文字樣式  , 可選擇, 當月, 不是當月  
			m_tfSelect 			= new TextFormat( null, null ,selectTextColor); 
			m_tfNormal 			= new TextFormat( null, null ,normalTextColor);
			m_tfNoCurrentMonth 	= new TextFormat( null, null ,noCurrentMonthTextColor);
			
			//設定最小年月日
			setMinDate();
			
			var _iDate:number= countDate( m_nSelectYear2 , m_nSelectMonth2+1 );		//計算出這個月的第一天是 星期幾
			updateDateUI( _iDate );

			onChangeLanguage();
			m_timer = JTimer.getTimer(1000);
			m_timer.addTimerCallback(onTimer);
			/*m_timer = new Timer(1000);
			m_timer.addEventListener(TimerEvent.TIMER , onTimer );*/
//			m_timer.start();
		}	
		
		public function run():void {
			if( m_timer ){
				m_timer.start();
			}
		}
		
		public function stop():void {
			if( m_timer ){
				m_timer.stop();
			}
		}
		
		protected function onTimer():void{
//			console.log("Timer::::::::::::::::::::::::::::::::::::::::::::::::");
			
			//設定最新日期
			setCurrentDate();
			//設定最小日期
			setMinDate();
			
			var _date:Date = new Date();
			
			var _iDate:number= countDate( m_nSelectYear2 , m_nSelectMonth2+1 );		//計算出這個月的第一天是 星期幾
			updateDateUI(_iDate);
			
			
			var _nMinTimeMs:Number = _date.setFullYear(m_iMinYear , m_iMinMonth , 0 );
			var _nCurrentTimeMs:Number = _date.setFullYear(iCurrentYear , iCurrentMonth , 0 );
			var _nSelectTimeMs:Number = _date.setFullYear( m_nSelectYear2, m_nSelectMonth2 , 0  );
			
			if( _nSelectTimeMs >= _nCurrentTimeMs ){
				btnNext.enabled = false;
			}else {
				btnNext.enabled = true;
			}
			
			if( _nSelectTimeMs <= _nMinTimeMs ){
				btnPreious.enabled = false;
			}else {
				btnPreious.enabled = true;
			}
			
			_date = null;
		}
		
		private function setCurrentDate():void {
			var _date:Date = new Date();
			var _nYear:Number = _date.getFullYear();
			var _nMonth:Number =  _date.getMonth();
			var _nDay:Number =  _date.getDate();
			
			iCurrentYear  = _nYear;
			iCurrentMonth = _nMonth;
			iCurrentDay  = _nDay;			
			
		}
		
		/**
		 * 計算 最小所能蒐索的 下注紀錄 年月日
		 */
		private function setMinDate():void {
			
			var _date:Date = new Date(iCurrentYear , iCurrentMonth , iCurrentDay);
			var _ms:Number = 14 * 24 * 60 * 60 * 1000;		//毫秒 
			
			_date.setTime( _date.getTime() - _ms );			//少14天
			
			/*if( iCurrentDay >= 14 ){
				m_iMinYear = iCurrentYear;
				m_iMinMonth = iCurrentMonth;
				m_iMinDay = iCurrentDay - 14 + 1;
			}
			else {
				m_iMinYear = iCurrentYear;
				m_iMinMonth = iCurrentMonth;				
				m_iMinMonth -= 1;
				
				if( m_iMinMonth <= 0 ){
					m_iMinYear = iCurrentYear - 1;
					m_iMinMonth = 12;
				}
				
				var _isubDay:number= 14 - iCurrentDay;
				
				m_iMinDay = countTotalDay( m_iMinYear , m_iMinMonth );
				m_iMinDay = m_iMinDay - _isubDay + 1;
				
			}*/
			
			m_iMinYear = _date.getFullYear();
			m_iMinMonth = _date.getMonth();
			m_iMinDay = _date.getDate();
			
/*			console.log("最小年:" + m_iMinYear );
			console.log("最小月:" + (m_iMinMonth+1) );
			console.log("最小日:" + m_iMinDay );*/
			
		}
		
		
		
		public function reset():void {
			var _mc:McDate;
			var i:number;
			if( m_vecDate.length == 0 ){
				for( i = 0 ; i < 42 ; i++ ){
					_mc = new McDate(mcAsset["mc_" + i] , m_tfSelect , m_tfNormal );
					_mc.fClick = selectDate;
					_mc.enable 	= true;
					m_vecDate.push( _mc ); 
				}		
			}
			else {
				for( i = 0 ; i < 42 ; i++ ){
					m_vecDate[i].mcAsset.tf_label.text = "";
					m_vecDate[i].mcAsset.mc_0.visible = false;
					m_vecDate[i].enable 	= true;
					m_vecDate[i].bSelect	= false;
					TextField(m_vecDate[i].mcAsset.tf_label).defaultTextFormat = m_tfNormal;
				}	
				
			}
			
			

		}
		
		/**
		 * 選擇日期
		 */
		private function selectDate( _aDate:any[] ):void {

			m_nSelectYear	=  _aDate[0];
			m_nSelectMonth  =  _aDate[1];
			m_nSelectDay	= _aDate[2];
			
			GameRecordManager.getInstance().betRecordPannel.setDate( m_nSelectYear,  m_nSelectMonth , m_nSelectDay );
			updateTitle();
			GameRecordManager.getInstance().betRecordPannel.updateDate( m_nSelectYear,  m_nSelectMonth , m_nSelectDay );
			this.visible = false;
			

		}
		
		private function onPrevious(event:MouseEvent):void
		{
			SoundManager.getInstance().play(SoundPackage.sClick_Tools);
			
			var _iDate:number;
			
			if( m_nSelectMonth2 > 0 ){
				m_nSelectMonth = m_nSelectMonth2 = iCurrentMonth -1;
				m_nSelectDay2 = m_nSelectDay = 0;
			}
			else {
				
				m_nSelectYear2 = m_nSelectYear  = iCurrentYear-1;
				if( m_nSelectYear2 > _iLimitMinYear ){
					m_nSelectMonth2 = m_nSelectMonth = 11;
					m_nSelectDay2 = m_nSelectDay = 0;
				}
				else {
					m_nSelectYear2 = m_nSelectYear = _iLimitMinYear;
				}
			} 
			
			onTimer();

		}	
	
		
		private function onNext(event:MouseEvent):void
		{
			SoundManager.getInstance().play(SoundPackage.sClick_Tools);
			
			var _date:number;
			if( m_nSelectMonth2 < 11 ){
				m_nSelectMonth2 = m_nSelectMonth = m_nSelectMonth2+1;
				m_nSelectDay2 = m_nSelectDay = 0;
			}
			else {
				
				m_nSelectYear2 = m_nSelectYear = m_nSelectYear2+1;
				m_nSelectMonth2 = m_nSelectMonth = 0;
				m_nSelectDay2 = m_nSelectDay = 0;
			}
			
			onTimer();
			
			
			
		}	
		
		 public function set visible( _bValue: boolean ):void {
			super.visible = _bValue;
			onTimer();
		}
		
		 public function destroy():void {

			if( m_timer ){
				m_timer.dispose();
			}
			
			if ( this.bgsprite ) {
				if ( this.contains( this.bgsprite ) ) {
					bgsprite.removeEventListener(MouseEvent.CLICK,clickhandler);
					this.removeChild( this.bgsprite );
				}
				bgsprite  = null;
			}
			
		}
		
		
		 public function onChangeLanguage():void {
			mcAsset.gotoAndStop(LobbyManager.getInstance().lobbyAuth.Lang+1);
			updateTitle();
			
		}
		
		private function updateTitle():void {
			var _nYear:Number = m_nSelectYear;
			var _sYear:string =  string( _nYear )+ LobbyManager.getInstance().getLanguageString(Language.sYear);
			var _nMonth:Number =  m_nSelectMonth+1;
			var _sMonth:string;
			if( _nMonth < 10 ){
				_sMonth =  string("0" + _nMonth )+ LobbyManager.getInstance().getLanguageString(Language.sMonth);
			}
			else {
				_sMonth =  string( _nMonth )+ LobbyManager.getInstance().getLanguageString(Language.sMonth);
			}		
//			sDay
			var _sDay:string;
			if( m_nSelectDay < 10 && m_nSelectDay > 0 ){
				_sDay = string("0" + m_nSelectDay )+ LobbyManager.getInstance().getLanguageString(Language.sDay);
			}
			else {
				_sDay =  string( m_nSelectDay )+ LobbyManager.getInstance().getLanguageString(Language.sDay);
			}
			
			if( m_nSelectDay == 0 ){
				mcAsset.tf_label.text = _sYear + "-" + _sMonth ;  
			}
			else {
				mcAsset.tf_label.text = _sYear + "-" + _sMonth + "-"  + _sDay  ;  
			}
				
			
		}
		
		private function isLeapYear( _iYear:number):number{
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
		private function countDate( iYear:number, iMonth:number, iDay:number= 1 ):number{
			
			//如果是閏年，2月就多加1天變成29天 
			_aDate[1] = isLeapYear(iYear);
			//計算這一天是一年中的第幾天 
			var d:number;
			var i:number;
			d = iDay;
			for (i=0; i<iMonth-1; i++) {
				d += _aDate[i];
			}
			//根據公式去計算這一天是星期幾 
			iYear--;
			d += iYear + int(iYear/4) - int(iYear/100) + int(iYear/400);			//公式
			d += 7; //此處+7是避免d算出來是負值的情況
			d %= 7; //算出星期幾 		
			
			
			return d; 
		}
		
		
		/**
		 * @param _iDate 星期幾
		 */
		private function updateDateUI(_iDate:number):void {
			reset();
			
			var _iCurrentDay:number= countTotalDay( m_nSelectYear2 , m_nSelectMonth2+1 );		//計算當月天數
			var _idx:number= _iDate;
			var _date3:Date = new Date();
			var _nCurrentTimeMs:Number;
			var _nSelectTimeMs:Number;
			var _nMinTimeMs:Number;
			//禮拜日 統一 往後 推一星期
			if( _iDate == 0 ){
				_idx += 7;
			}			
			for( var i:number= 0 ; i < _iCurrentDay ; i++ ){
				m_vecDate[_idx].mcAsset.tf_label.text = string(i+1);
				m_vecDate[_idx].iYear = m_nSelectYear2;
				m_vecDate[_idx].iMonth = m_nSelectMonth2;
				m_vecDate[_idx].iDay = i+1;
				m_vecDate[_idx].tfNormal = m_tfNormal;
				m_vecDate[_idx].tfSelect = m_tfSelect;
				
				m_vecDate[_idx].canSelectState = true;
				
				_nCurrentTimeMs = _date3.setFullYear(iCurrentYear , iCurrentMonth , iCurrentDay );
				_nSelectTimeMs = _date3.setFullYear(m_nSelectYear2 , m_nSelectMonth2 , (i+1) );
				_nMinTimeMs = _date3.setFullYear(m_iMinYear , m_iMinMonth , m_iMinDay );
				if( _nSelectTimeMs > _nCurrentTimeMs ){		//超過當天日期
					m_vecDate[_idx].defaultState();
					m_vecDate[_idx].enable = false;
					m_vecDate[_idx].tfNormal = m_tfNoCurrentMonth;
					m_vecDate[_idx].tfSelect = m_tfSelect;
					m_vecDate[_idx].canSelectState = false;
				}
				else if( _nSelectTimeMs <= _nMinTimeMs ) {	//限制最小可選擇的日期
					m_vecDate[_idx].defaultState();
					m_vecDate[_idx].enable = false;
					m_vecDate[_idx].tfNormal = m_tfNoCurrentMonth;
					m_vecDate[_idx].tfSelect = m_tfSelect;	
					m_vecDate[_idx].canSelectState = false;
				}
				
				_idx+=1;
			}
			_date3 = null;
			
			var _nPreviousYear:number= m_nSelectYear2;					//上個月     年
			var _nPreviousMonth:number= m_nSelectMonth2;				//上個月    月
			var _iDayCount:number;										//上個月   天數
			var j:number;
			var _minDate:Date = new Date( m_iMinYear , m_iMinMonth , m_iMinDay );
			var _cmpDate:Date;
				
			if( _nPreviousMonth > 0 ){
				_nPreviousMonth-=1;
				
				//更新 上個月的日期
				_iDayCount = countTotalDay(_nPreviousYear , _nPreviousMonth+1);	//算出上個月總天數	
				
				if( _iDate > 0 ){
					while( _iDate > 0 ){
						_iDate-=1;
						
						TextField(m_vecDate[_iDate].mcAsset.tf_label).defaultTextFormat = m_tfNoCurrentMonth;
						m_vecDate[_iDate].mcAsset.tf_label.text = string(_iDayCount);
						m_vecDate[_iDate].iYear = _nPreviousYear;
						m_vecDate[_iDate].iMonth = _nPreviousMonth;
						m_vecDate[_iDate].iDay = _iDayCount;	
						m_vecDate[_iDate].tfSelect = m_tfSelect;
						m_vecDate[_iDate].tfNormal = m_tfNoCurrentMonth;
						m_vecDate[_iDate].canSelectState = true;
						
						_cmpDate = new Date( _nPreviousYear , _nPreviousMonth , _iDayCount );
						if( _cmpDate.getTime() <= _minDate.getTime()  ) {
							m_vecDate[_iDate].enable = false;
							m_vecDate[_iDate].canSelectState = false;
						}						
						_iDayCount -= 1;	
					}	
					
				}
				else if( _iDate == 0 ){
					for( j = 6 ; j >= 0 ; j-- ) {
						TextField(m_vecDate[j].mcAsset.tf_label).defaultTextFormat = m_tfNoCurrentMonth;
						m_vecDate[j].mcAsset.tf_label.text = string(_iDayCount);
						m_vecDate[j].iYear = _nPreviousYear;
						m_vecDate[j].iMonth = _nPreviousMonth;
						m_vecDate[j].iDay 	= _iDayCount;	
						m_vecDate[j].tfSelect = m_tfSelect;
						m_vecDate[j].tfNormal = m_tfNoCurrentMonth;		
						m_vecDate[j].canSelectState = true;
						
						_cmpDate = new Date( _nPreviousYear , _nPreviousMonth , _iDayCount );
						if( _cmpDate.getTime() <= _minDate.getTime()  ) {
							m_vecDate[j].enable = false;
							m_vecDate[j].canSelectState = false;
						}	
						
						_iDayCount -= 1;
					}
					
					
					
				}	
				
			}
			else {
				
				_nPreviousYear -=1;     //去年
				_nPreviousMonth = 11;   //去年從12月
				//更新 上個月的日期
				_iDayCount = countTotalDay(_nPreviousYear , _nPreviousMonth+1);	//算出上個月總天數	
				
				if( _iDate > 0 ){
					while( _iDate > 0 ){
						_iDate-=1;
						TextField(m_vecDate[_iDate].mcAsset.tf_label).defaultTextFormat = m_tfNoCurrentMonth;
						m_vecDate[_iDate].mcAsset.tf_label.text = string(_iDayCount);
						m_vecDate[_iDate].iYear = _nPreviousYear;
						m_vecDate[_iDate].iMonth = _nPreviousMonth;
						m_vecDate[_iDate].iDay = _iDayCount;	
						m_vecDate[_iDate].tfSelect = m_tfSelect;
						m_vecDate[_iDate].tfNormal = m_tfNoCurrentMonth;	
						m_vecDate[_iDate].canSelectState = true;
						
						_cmpDate = new Date( _nPreviousYear , _nPreviousMonth , _iDayCount );
						if( _cmpDate.getTime() <= _minDate.getTime()  ) {
							m_vecDate[_iDate].enable = false;
							m_vecDate[_iDate].canSelectState = false;
						}								
						_iDayCount -= 1;	
					}	
					
				}
				else if( _iDate == 0 ){
					for( j = 6 ; j >= 0 ; j--  ) {
						TextField(m_vecDate[j].mcAsset.tf_label).defaultTextFormat = m_tfNoCurrentMonth;
						m_vecDate[j].mcAsset.tf_label.text = string(_iDayCount);
						m_vecDate[j].iYear = _nPreviousYear;
						m_vecDate[j].iMonth = _nPreviousMonth;
						m_vecDate[j].iDay 	= _iDayCount;	
						m_vecDate[j].tfSelect = m_tfSelect;
						m_vecDate[j].tfNormal = m_tfNoCurrentMonth;	
						m_vecDate[j].canSelectState = true;
						
						_cmpDate = new Date( _nPreviousYear , _nPreviousMonth , _iDayCount );
						if( _cmpDate.getTime() <= _minDate.getTime()  ) {
							m_vecDate[j].enable = false;
							m_vecDate[j].canSelectState = false;
						}								
						_iDayCount -= 1;
					}
					
				}
	
			}// end else
			
			

	
			
			var _nNextMonth:number= m_nSelectMonth2;
			var _nNextYear:number= m_nSelectYear2;	
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
			var _d1:Date = new Date( iCurrentYear , iCurrentMonth , iCurrentDay );
			
			while( _idx < 42 ){
				TextField(m_vecDate[_idx].mcAsset.tf_label).defaultTextFormat = m_tfNoCurrentMonth;
				m_vecDate[_idx].mcAsset.tf_label.text = string(_iday);
				m_vecDate[_idx].iYear	= _nNextYear;
				m_vecDate[_idx].iMonth 	= _nNextMonth;
				m_vecDate[_idx].iDay 	= _iday;	
				m_vecDate[_idx].tfSelect = m_tfSelect;
				m_vecDate[_idx].tfNormal = m_tfNoCurrentMonth;	
				
				var _d2:Date = new Date( _nNextYear , _nNextMonth , _iday );
//				console.log("_d2.getTime() ::" + _d2.getTime()  );
//				console.log("_d1.getTime() ::" + _d1.getTime()  );
				if( _d2.getTime() > _d1.getTime()  ){
					m_vecDate[_idx].enable 	= false;
					m_vecDate[_idx].canSelectState = false;
				}
				else {
					m_vecDate[_idx].canSelectState = true;
				}
				
				_idx += 1;
				_iday +=1;
			}
			
			
		
			
			_d1 = null;
			_d2 = null;
			
			

			
			updateTitle();			
			
			
		}
		
		
		
		public function countTotalDay( _iYear:number, _iMonth:number):number{
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
		
		public function setDate( _iYear:number, _iYear:number, _iDay:number):void {
			/*var _iDate:number = countDate( _iYear , _iYear );		//計算出這個月的第一天是 星期幾
			updateDate( _iDate );*/
		}
		
		
		
			
		
		
	}
}
import flash.display.MovieClip;
import flash.events.MouseEvent;
import flash.text.TextField;
import flash.text.TextFormat;

import manager.SoundManager;

import sounds.SoundPackage;

class McDate {
	public var mcAsset:MovieClip;
	public var iYear:number;
	public var iMonth:number;
	public var iDay:number;
	public var fClick:Function;
	public var tfSelect:TextFormat;
	public var tfNormal:TextFormat;
	public var tfCanSelect:TextFormat;
	public var bSelect: boolean;
	public function McDate(_mcAsset:MovieClip , _tfSelect:TextFormat , _tfNormal:TextFormat ):void {
		mcAsset = _mcAsset;
		mcAsset.tf_label.text = "";
		mcAsset.mc_0.visible = false;
		mcAsset.buttonMode = true;
		mcAsset.mouseChildren =false;
		mcAsset.addEventListener(MouseEvent.MOUSE_OVER , mouseHandler );
		mcAsset.addEventListener(MouseEvent.MOUSE_OUT , mouseHandler );
		mcAsset.addEventListener(MouseEvent.CLICK , mouseHandler );
//		mcAsset.mc_red.visible = false;
		
		tfSelect = _tfSelect;
		tfNormal = _tfNormal;
		tfCanSelect = new TextFormat();
		tfCanSelect.color = 0xFF6600;
		TextField(mcAsset.tf_label).defaultTextFormat = tfNormal;
	}
	
	protected function mouseHandler(event:MouseEvent):void {
		
		if( event.type == MouseEvent.MOUSE_OVER ){
			mcAsset.mc_0.visible = true;
			TextField(mcAsset.tf_label).defaultTextFormat = tfSelect;
			TextField(mcAsset.tf_label).text = TextField(mcAsset.tf_label).text;
		}else if( event.type == MouseEvent.MOUSE_OUT ){
			mcAsset.mc_0.visible = false;
			
			if( !bSelect ){
				TextField(mcAsset.tf_label).defaultTextFormat = tfNormal;
			}else {
				TextField(mcAsset.tf_label).defaultTextFormat = tfCanSelect;
			}
			TextField(mcAsset.tf_label).text = TextField(mcAsset.tf_label).text;	
		}
		else if( event.type == MouseEvent.CLICK ) {
			SoundManager.getInstance().play(SoundPackage.sClick_Tools);
			if( fClick != null ) {
				fClick( [iYear , iMonth , iDay ] );
			}
			
		}
	}

	public function destroy():void {
		if( mcAsset ){
			mcAsset.removeEventListener(MouseEvent.MOUSE_OVER , mouseHandler );
			mcAsset.removeEventListener(MouseEvent.MOUSE_OUT , mouseHandler );
			mcAsset.removeEventListener(MouseEvent.CLICK , mouseHandler );	
			mcAsset = null;
		}
		
		if( fClick != null ){
			fClick = null;
		}
		
	}
	
	set enable( _bValue: boolean ) {
		mcAsset.mouseEnabled = _bValue;
		mcAsset.enabled = _bValue;
		mcAsset.buttonMode = _bValue;
	}
	
	set canSelectState (_bValue: boolean) {
//		mcAsset.mc_red.visible = _bValue;
		if( _bValue ){
			TextField(mcAsset.tf_label).defaultTextFormat = tfCanSelect;
			TextField(mcAsset.tf_label).text = TextField(mcAsset.tf_label).text;
		}
		else {
			TextField(mcAsset.tf_label).defaultTextFormat = tfNormal;
			TextField(mcAsset.tf_label).text = TextField(mcAsset.tf_label).text;	
		}
		bSelect = _bValue;
	}
	
	public function lightState():void {
		mcAsset.mouseEnabled = false;
		mcAsset.enabled = false;
		mcAsset.buttonMode = false;
		mcAsset.mc_0.visible = true;
		TextField(mcAsset.tf_label).defaultTextFormat = tfSelect;
		TextField(mcAsset.tf_label).text = TextField(mcAsset.tf_label).text;
	}
	
	public function defaultState():void {
		mcAsset.mouseEnabled = true;
		mcAsset.enabled = true;
		mcAsset.buttonMode = true;
		mcAsset.mc_0.visible = false;
		TextField(mcAsset.tf_label).defaultTextFormat = tfNormal;
		TextField(mcAsset.tf_label).text = TextField(mcAsset.tf_label).text;
	}
}