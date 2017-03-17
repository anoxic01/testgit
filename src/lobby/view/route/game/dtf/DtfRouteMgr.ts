module lobby.view.route.game.dtf {
	export class DtfRouteMgr implements ISprite {
		public static const ASK_MODE_DRAGON	:	int					=	0;
		public static const ASK_MODE_TIGER	:	int					=	1;
		
		protected var m_view				:	MovieClip;
		protected var m_routeView			:	MovieClip;
		
		protected var m_isBtnOpen			:	Boolean 			= 	false;
		
		protected var m_islock				:	Boolean 			=	true;
		protected var m_isUp				:	Boolean 			= 	false;
		
		/**當前顯示路*/
		protected var m_nowRoad				:	String = "";
		
		protected var m_beadPlate			:	DtfBeadPlate;
		
		protected var m_roadString			:	RoadStringObject 	= 	new RoadStringObject;
		protected var m_bigSprite			:	DtfRoadCanvas 		= 	new DtfRoadCanvas;
		protected var m_bigEyeSprite		:	DtfRoadCanvas 		= 	new DtfRoadCanvas;
		protected var m_smallSprite			:	DtfRoadCanvas 		= 	new DtfRoadCanvas;
		protected var m_roachSprite			:	DtfRoadCanvas 		= 	new DtfRoadCanvas;
		
		/*protected var m_roadUpdateTimer		:	JTimer;*/
		protected var m_roadBufferTime		:	uint 				= 	100;
		protected var m_beadInfo			:	BeadInfo;
		private var m_askTimer				:	JTimer;
		private var m_bAsk					:	Boolean;														//问路状态
		
		public var bError					:	Boolean;														//错误状态
		
		
		public constructor(view:MovieClip) {
		
			this.m_routeView = view;
			
//			this._beadPlate = new DtfBeadPlate(this._routeView.mcBeadPlate); //珠路盤
			this.m_beadPlate = new DtfBeadPlate(m_routeView.getChildByName("mc_0") as MovieClip, BeadItemDTF); //珠路盤
			this.init();
			this.setRoadInf();
			
			
			/*this.m_roadUpdateTimer = new Timer(m_roadBufferTime,1);
			this.m_roadUpdateTimer.addEventListener(TimerEvent.TIMER_COMPLETE , updateRoadHandler );*/
			/*m_roadUpdateTimer = JTimer.getTimer(m_roadBufferTime,1);
			m_roadUpdateTimer.addTimerCallback(null,updateRoadHandler);*/
			
			/*this.m_askTimer = new Timer(300,6);
			this.m_askTimer.addEventListener(TimerEvent.TIMER,flash);
			this.m_askTimer.addEventListener(TimerEvent.TIMER_COMPLETE,stopAsk);	*/
			m_askTimer = JTimer.getTimer(300,6);
			m_askTimer.addTimerCallback(flash,stopAsk);
		}
		
		public function destroy():void {
			if( this.m_routeView != null){
				this.m_routeView = null;
			}
			
			if( this.m_roadString != null) {
				this.m_roadString= null;
			}
			
			if( this.m_bigSprite != null) {
				this.m_bigSprite.destroy();
				this.m_bigSprite = null;
			}
			
			if( this.m_bigEyeSprite != null ){
				this.m_bigEyeSprite.destroy();
				this.m_bigEyeSprite = null;
			}
			if( this.m_smallSprite != null){
				this.m_smallSprite.destroy();
				this.m_smallSprite = null;
			}
			if( this.m_roachSprite != null){
				this.m_roachSprite.destroy();
				this.m_roachSprite = null;
			}

			/*if( m_roadUpdateTimer != null) {
				m_roadUpdateTimer.dispose();
				this.m_roadUpdateTimer = null;	
			}*/

			if( this.m_askTimer != null) {
				/*this.m_askTimer.removeEventListener(TimerEvent.TIMER,flash);
				this.m_askTimer.removeEventListener(TimerEvent.TIMER_COMPLETE,stopAsk);	*/
				m_askTimer.dispose();
				this.m_askTimer = null;
			}

			if( this.m_bigSprite != null){
				this.m_bigSprite.destroy();
				this.m_bigSprite = null;
			}
			if( this.m_bigEyeSprite != null){
				this.m_bigEyeSprite.destroy();
				this.m_bigEyeSprite = null;
			}
			if( this.m_smallSprite != null){
				this.m_smallSprite.destroy();
				this.m_smallSprite = null;
			}
			if( this.m_roachSprite != null){
				this.m_roachSprite.destroy();
				this.m_roachSprite = null;
			}
			
			if( this.m_beadPlate != null){
				this.m_beadPlate.destroy();
				this.m_beadPlate = null;
			}
			
		}
		
		private function stopAsk() : void {
			m_bAsk = false;
			m_askTimer.stop();
			this.showRoadViewInit();
			this.showRoad(this.m_nowRoad);
//			this.cacheToBmp(true);
		}
		/**
		 *当前路子个数 
		 * @return 
		 * 
		 */
		public function get roadNum():uint{
			if (this.m_nowRoad==null ||this.m_nowRoad==""){
				return 0;
			}else{
				var len:int = m_nowRoad.split(".").length;
				return len;
			}
			return 0;
		}
		
		/**
		 * 清掉路單
		 */
		public function clearRoad():void {
			bError = false;
			this.m_nowRoad = "";			
			this.showRoadViewInit();
			//trace("clearRoad:" + this._nowRoad);
		}		
		
		/** 更新路單 */
		public function addRoad(road:String):void {
			//trace("更新路單 : " + road);
			//road = "iiaaaeeeaeaaeeaeaaaaeaaeiaiia";
			//road = "aaaaabcaeeeifeaaiabaaeaibaeeeafaeeaaeafeeeaeaaehlgahaeeeefieeieeeeeegeeefaeikagaeeaagaaejiiaaaaaakabceaaaeeeeeeeeaaaaaeeeeaeaeaaaaaabbbbbbbbbbbbbeeeeeeeeeeee";
			//road = "aaaaabcaee" + "eifeaaiaba" + "aeaibaeeea" + "faeeaaeafe" + "eeaeaaehlg" + "ahaeceaeak" + "akaaeieeeg" + "cefefeeeieeaaceeaacaeeaabefcheafdafbcaaedaabbfeeejaeeeaabaafebeeeeeeeeeeeeebfeeeeaaceeeeceeeeeeeeeafeeeefieeieeeeeegeeefaeikagaeeaagaaejiiaaaaaakabce";
			//road = "iiiiibbbeeeibbeeibbbeeiibbbbbbbeeiiibbbbbbbcccdddefghefghefgh";
			//road = "aaaaabcaeeeifeaaiabaaeaibaeeeafaeeaaeafeeeaeaaehlgahaeeeefieeieeeeeegeeefaeikagaeeaagaaejiiaaaaaakabcccc";
			//road = "aaaaaaaaeeeeeeeaaaaaaaeeeeeeeaaaaaae";
		
			
			if (road == null || road == '' || road == "null") {
				
				return;
			}
			
			if ( road.indexOf( "#" ) != -1 ) {
				//路紙有錯
				bError = true;
				return;
			}else{
				bError = false;
			}
			
			
			
			if(m_nowRoad==""){
				this.m_nowRoad += road;
			}else{
				this.m_nowRoad += "." + road;
			}
			
			trace("addRoad::" + this.m_nowRoad );
			//this._nowRoad = road;
			
			/*if ( !this.m_roadUpdateTimer.running ) {
				this.m_roadUpdateTimer.start();
			}*/
			updateRoadHandler();
			
			//this.cacheToBmp(false);
			//this.showRoadViewInit();
			/*this.showRoad( this._nowRoad + "a", false);
			this.askBankerRoad();
			this.showRoad( this._nowRoad + "e", false);
			this.askPlayerRoad();*/
			//this.showRoad( this._nowRoad);
			
			//this.cacheToBmp(true);
		}
		
		public function onChangeLanguage():void{
			if(m_beadPlate){
				m_beadPlate.onChangeLanguage();
			}
		}
		
		protected function showRoad(road:String, isAsk:Boolean = false):void {
			//this.showRoadViewInit();
			this.m_roadString = BeadRoad.createRoadReanderString(road);
			this.m_beadPlate.addRoad(road, isAsk);
			
			var grids:Array = BeadRoad.createBigRoadRenderGrid( this.m_roadString.bigRoad, null );
			this.m_bigSprite.drawBigRoadDataGrid( grids , RoadBallPool.BIG_ROAD , isAsk );
			this.m_bigEyeSprite.drawReaderDataGrid( BeadRoad.createRoadRenderGrid(this.m_roadString.bigEyeRoad, null , 6) , isAsk , RoadBallPool.BIG_EYE_ROAD );
			this.m_smallSprite.drawReaderDataGrid( BeadRoad.createRoadRenderGrid(this.m_roadString.smallRoad, null , 6) , isAsk  , RoadBallPool.SMALL_EYE_ROAD );
			this.m_roachSprite.drawReaderDataGrid( BeadRoad.createRoadRenderGrid(this.m_roadString.roachRoad, null , 6 ) , isAsk , RoadBallPool.COCKROACH_ROAD );

		}		
		
		/** 路單初始 */
		protected function showRoadViewInit():void {
			
			this.m_beadPlate.init();
			this.m_bigEyeSprite.init();
			this.m_bigSprite.init();
			this.m_roachSprite.init();
			this.m_smallSprite.init();
		}
		
		protected function flash():void{
			m_beadPlate.flash();
			m_bigSprite.flash();
			m_bigEyeSprite.flash();
			m_smallSprite.flash();
			m_roachSprite.flash();
		}	
		
		protected function updateRoadHandler():void {
			trace("updateRoadHandler::" + m_nowRoad);
			if ( ( this.m_nowRoad != "null" ) && (this.m_nowRoad != null) && ( m_nowRoad != "") )  {
//				this.cacheToBmp(false);
				this.showRoadViewInit();
				this.showRoad( this.m_nowRoad);
//				this.cacheToBmp(true);			
			}
			
		}			
		
		protected function setRoadInf():void{
			//路紙參數均在此設定
			this.m_beadInfo = new BeadInfo();
			this.m_beadInfo.gridWidth = 40;
			this.m_beadInfo.gridHeight = 6;
			
			//this._beadInfo.bigRoad_OfftenWidth =  1.125;
			this.m_beadInfo.bigRoad_OfftenWidth =  6.8;
			//this._beadInfo.bigRoad_OfftenHeight =  1.155;
			this.m_beadInfo.bigRoad_OfftenHeight =  5.9;
			this.m_beadInfo.bigRoad_OfftenX =  0.4;
			//this._beadInfo.bigRoad_OfftenY =  1.125;
			this.m_beadInfo.bigRoad_OfftenY =  0;
			this.m_beadInfo.beadW =  9.5;				//設定大路元件大小
			this.m_beadInfo.beadH =  9.5;
			
			//this._beadInfo.bigEyeRoad_OfftenWidth = 0.5;
			this.m_beadInfo.bigEyeRoad_OfftenWidth = 1.58;
			this.m_beadInfo.bigEyeRoad_OfftenHeight = 0.5;
			this.m_beadInfo.bigEyeRoad_OfftenX = 0.25;
			this.m_beadInfo.bigEyeRoad_OfftenY = 0.25;
			
			//this._beadInfo.smallRoad_OfftenWidth = 0.5;
			this.m_beadInfo.smallRoad_OfftenWidth = 1.58;
			//this._beadInfo.smallRoad_OfftenHeight = 0.5;
			this.m_beadInfo.smallRoad_OfftenHeight = 0.35;
			this.m_beadInfo.smallRoad_OfftenX = 0;
			this.m_beadInfo.smallRoad_OfftenY = 0;
			
			//this._beadInfo.roachRoad_OfftenWidth = 0.025;
			this.m_beadInfo.roachRoad_OfftenWidth = 1.08;
			this.m_beadInfo.roachRoad_OfftenHeight = 0.5;
			this.m_beadInfo.roachRoad_OfftenX = 0;
			this.m_beadInfo.roachRoad_OfftenY =  0.25;
			
			this.m_bigSprite.setBeadSize(this.m_beadInfo);
			this.m_bigEyeSprite.setBeadSize(this.m_beadInfo);
			this.m_smallSprite.setBeadSize(this.m_beadInfo);
			this.m_roachSprite.setBeadSize(this.m_beadInfo);
		}
				
		
		protected function init():void {
			this.m_routeView.boxBigRoad.addChild(this.m_bigSprite);	//大路
			this.m_routeView.boxBigEye.addChild(this.m_bigEyeSprite);	//大眼
			this.m_routeView.boxSmallRoad.addChild(this.m_smallSprite); //小路
			this.m_routeView.boxCockroachRoad.addChild(this.m_roachSprite); //蟑螂路
			
			this.m_beadPlate.mouseChildren = this.m_beadPlate.mouseEnabled = false;
			this.m_routeView.boxBigRoad.mouseChildren = this.m_routeView.boxBigRoad.mouseEnabled = false;
			this.m_routeView.boxBigEye.mouseChildren = this.m_routeView.boxBigEye.mouseEnabled = false;
			this.m_routeView.boxSmallRoad.mouseChildren = this.m_routeView.boxSmallRoad.mouseEnabled = false;
			this.m_routeView.boxCockroachRoad.mouseChildren = this.m_routeView.boxCockroachRoad.mouseEnabled = false;	
		}
		
		
		public function onAskRoad(_iMode:int):void {
				if(m_bAsk){
					stopAsk();
				}
			
				m_bAsk = true;
				
				
				//this._beadPlate.addEventListener(RouteEvent.ASK_Road_END, onAskRoadEnd);
				var key:String="";
				if (this.m_nowRoad!=""){
					key=".";
				}
				switch (_iMode) {
					case ASK_MODE_DRAGON: 
						key+="a";
						break;
					case ASK_MODE_TIGER: 
						key+="e";
						break;
				}
				this.showRoad(this.m_nowRoad + key, true);
				m_askTimer.reset();
				m_askTimer.start();
			
		}		
		protected function cacheToBmp(isCache:Boolean):void {
			this.m_beadPlate.cacheAsBitmap = isCache;
			this.m_bigSprite.cacheAsBitmap = isCache;
			this.m_bigEyeSprite.cacheAsBitmap = isCache;
			this.m_smallSprite.cacheAsBitmap = isCache;
			this.m_roachSprite.cacheAsBitmap = isCache;
		}
		
		
	}
}