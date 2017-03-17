module lobby.view.route {
	export class RouteMgr extends EventDispatcher {
		private var _view:MovieClip;
		private var _routeView:MovieClip;
		
		private var _isBtnOpen:Boolean = false;
		
		private var _islock:Boolean = true;
		private var _isUp:Boolean = false;
		
		/**當前顯示路*/
		private var _nowRoad:String = "";
		
		private var _askBankerRoad:AskRoadBtn;
		private var _askPlayerRoad:AskRoadBtn;
		
		private var _beadPlate:BeadPlate;
		
		private var _roadString:RoadStringObject = new RoadStringObject;
		private var _bigSprite:RoadCanvas = new BacRoadCanvas;
		private var _bigEyeSprite:RoadCanvas = new BacRoadCanvas;
		private var _smallSprite:RoadCanvas = new BacRoadCanvas;
		private var _roachSprite:RoadCanvas = new BacRoadCanvas;
		
		protected var _roadUpdateTimer:JTimer;
		protected var _roadBufferTime:uint = 100;
		private var _beadInfo:BeadInfo;
		
		public constructor(view:MovieClip) {
		
			this._routeView = view;
			
			this._askBankerRoad = new AskRoadBtn(this._routeView.btn_AskBankerRoad);
			this._askPlayerRoad = new AskRoadBtn(this._routeView.btn_AskPlayerRoad);
			
			this._askBankerRoad.addEventListener(RouteEvent.ASK_ROAD , onAskRoad ); //莊問路
			this._askPlayerRoad.addEventListener(RouteEvent.ASK_ROAD , onAskRoad );//閒問路
			

			
			this._beadPlate = new BeadPlate(this._routeView.mcBeadPlate); //珠路盤
			
			this._routeView.boxBigRoad.addChild(this._bigSprite);	//大路
			this._routeView.boxBigEye.addChild(this._bigEyeSprite);	//大眼
			this._routeView.boxSmallRoad.addChild(this._smallSprite); //小路
			this._routeView.boxCockroachRoad.addChild(this._roachSprite); //蟑螂路
			
			this._beadPlate.mouseChildren = this._beadPlate.mouseEnabled = false;
			this._routeView.boxBigRoad.mouseChildren = this._routeView.boxBigRoad.mouseEnabled = false;
			this._routeView.boxBigEye.mouseChildren = this._routeView.boxBigEye.mouseEnabled = false;
			this._routeView.boxSmallRoad.mouseChildren = this._routeView.boxSmallRoad.mouseEnabled = false;
			this._routeView.boxCockroachRoad.mouseChildren = this._routeView.boxCockroachRoad.mouseEnabled = false;
			
			
			
			
			//路紙參數均在此設定
			this._beadInfo = new BeadInfo();
			this._beadInfo.gridWidth = 40;
			this._beadInfo.gridHeight = 6;
			
			//this._beadInfo.bigRoad_OfftenWidth =  1.125;
			this._beadInfo.bigRoad_OfftenWidth =  6.8;
			//this._beadInfo.bigRoad_OfftenHeight =  1.155;
			this._beadInfo.bigRoad_OfftenHeight =  5.9;
			this._beadInfo.bigRoad_OfftenX =  0.4;
			//this._beadInfo.bigRoad_OfftenY =  1.125;
			this._beadInfo.bigRoad_OfftenY =  0;
			this._beadInfo.beadW =  9.5;				//設定大路元件大小
			this._beadInfo.beadH =  9.5;
			
			//this._beadInfo.bigEyeRoad_OfftenWidth = 0.5;
			this._beadInfo.bigEyeRoad_OfftenWidth = 1.58;
			this._beadInfo.bigEyeRoad_OfftenHeight = 0.5;
			this._beadInfo.bigEyeRoad_OfftenX = 0.25;
			this._beadInfo.bigEyeRoad_OfftenY = 0.25;

			//this._beadInfo.smallRoad_OfftenWidth = 0.5;
			this._beadInfo.smallRoad_OfftenWidth = 1.58;
			//this._beadInfo.smallRoad_OfftenHeight = 0.5;
			this._beadInfo.smallRoad_OfftenHeight = 0.35;
			this._beadInfo.smallRoad_OfftenX = 0;
			this._beadInfo.smallRoad_OfftenY = 0;
			
			//this._beadInfo.roachRoad_OfftenWidth = 0.025;
			this._beadInfo.roachRoad_OfftenWidth = 1.08;
			this._beadInfo.roachRoad_OfftenHeight = 0.5;
			this._beadInfo.roachRoad_OfftenX = 0;
			this._beadInfo.roachRoad_OfftenY =  0.25;
			
			this._bigSprite.setBeadSize(this._beadInfo);
			this._bigEyeSprite.setBeadSize(this._beadInfo);
			this._smallSprite.setBeadSize(this._beadInfo);
			this._roachSprite.setBeadSize(this._beadInfo);
			
			/*this._roadUpdateTimer = new Timer(_roadBufferTime,1);
			this._roadUpdateTimer.addEventListener(TimerEvent.TIMER_COMPLETE , updateRoadHandler );*/
			_roadUpdateTimer = JTimer.getTimer(_roadBufferTime,1);
			_roadUpdateTimer.addTimerCallback(null,updateRoadHandler);
		}
		
		/**
		 * 變更語系
		 * @param	lang
		 */
		public function  onChangeLanguage( lang:String ):void{
			
			
			
			
		}
		
		
		/**
		 * 清空資源
		 */
		public function destory():void {
			if(_bigSprite)
			{
				_bigSprite.parent.removeChild(_bigSprite);
				_bigSprite.destroy();
				_bigSprite=null;
			}
			if(_bigEyeSprite)
			{
				_bigEyeSprite.parent.removeChild(_bigEyeSprite);
				_bigEyeSprite.destroy();
				_bigEyeSprite=null;
			}
			if(_smallSprite)
			{
				_smallSprite.parent.removeChild(_smallSprite);
				_smallSprite.destroy();
				_smallSprite=null;
			}
			if(_roachSprite)
			{
				_roachSprite.parent.removeChild(_roachSprite);
				_roachSprite.destroy();
				_roachSprite=null;
			}
			/*this._roadUpdateTimer.removeEventListener(TimerEvent.TIMER_COMPLETE , updateRoadHandler );*/
			_roadUpdateTimer.dispose();
			this._roadUpdateTimer = null;
			this._askBankerRoad.removeEventListener(RouteEvent.ASK_ROAD , onAskRoad ); //莊問路
			this._askPlayerRoad.removeEventListener(RouteEvent.ASK_ROAD , onAskRoad );//閒問路
			
			
			
		}
		

		
		/**
		 * 清掉路單
		 */
		public function clearRoad():void {
//			this.cacheToBmp(false);
			this._bigSprite.resetPool();
			this._bigEyeSprite.resetPool();
			this._smallSprite.resetPool();
			this._roachSprite.resetPool();
		}
		
		/**
		 * 重置路紙
		 */
		public function resetNowRoad():void {
			this._nowRoad = "";
		}
		
		private function updateRoadHandler():void {
		//	trace("_nowRoad::" + _nowRoad);
			if ( this._nowRoad.indexOf( "#" ) != -1 ) {
				return;
			}
			if ( this._nowRoad != "null" && this._nowRoad != null &&  this._nowRoad != "" ) {
//				this.cacheToBmp(false);
				this.showRoadViewInit();
				this.showRoad( this._nowRoad);
//				this.cacheToBmp(true);	
			}

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
		
			
			/*if ( this._nowRoad.length > Define.BEAD_NUM ) {
				this._nowRoad = "";
			}*/
			
			if (road == null || road == '' || road == "null") {
				return;
			}
			
			
				
			this._nowRoad += road;
				

			//this._nowRoad = road;
			
			if ( !this._roadUpdateTimer.running ) {
				this._roadUpdateTimer.start();
			}
			
			
			//this.cacheToBmp(false);
			//this.showRoadViewInit();
			/*this.showRoad( this._nowRoad + "a", false);
			this.askBankerRoad();
			this.showRoad( this._nowRoad + "e", false);
			this.askPlayerRoad();*/
			//this.showRoad( this._nowRoad);
			
			//this.cacheToBmp(true);
		}
		
		private function showRoad(road:String, isAsk:Boolean = false):void {
			//this.showRoadViewInit();
			this._roadString = BeadRoad.createRoadReanderString(road);
			this._beadPlate.addRoad(road, isAsk);
			
			var grids:Array = BeadRoad.createBigRoadRenderGrid( this._roadString.bigRoad, null );

			this._bigSprite.drawBigRoadDataGrid( grids , RoadBallPool.BIG_ROAD , isAsk );
			this._bigEyeSprite.drawReaderDataGrid( BeadRoad.createRoadRenderGrid(this._roadString.bigEyeRoad, null , 6) , isAsk , RoadBallPool.BIG_EYE_ROAD );
			this._smallSprite.drawReaderDataGrid( BeadRoad.createRoadRenderGrid(this._roadString.smallRoad, null , 6) , isAsk  , RoadBallPool.SMALL_EYE_ROAD );
			this._roachSprite.drawReaderDataGrid( BeadRoad.createRoadRenderGrid(this._roadString.roachRoad, null , 6 ) , isAsk , RoadBallPool.COCKROACH_ROAD );
			
		}
		
		/** 路單初始 */
		private function showRoadViewInit():void {
			this._beadPlate.init();
			this._bigEyeSprite.init();
			this._bigSprite.init();
			this._roachSprite.init();
			this._smallSprite.init();
		}
		
		/** 莊問路 */
		private function askBankerRoad():void {
			if (this._roadString.bigEyeRoad.length > 0) {
				this._routeView["askBankRoad_0"].visible = true;
				this._routeView["askBankRoad_0"].gotoAndStop(this._roadString.bigEyeRoad.slice(-1));
			} else {
				this._routeView["askBankRoad_0"].visible = false;
			}
			
			if (this._roadString.smallRoad.length > 0) {
				this._routeView["askBankRoad_1"].visible = true;
				this._routeView["askBankRoad_1"].gotoAndStop(this._roadString.smallRoad.slice(-1));
			} else {
				this._routeView["askBankRoad_1"].visible = false;
			}
			
			if (this._roadString.roachRoad.length > 0) {
				this._routeView["askBankRoad_2"].visible = true;
				this._routeView["askBankRoad_2"].gotoAndStop(this._roadString.roachRoad.slice(-1));
			} else {
				this._routeView["askBankRoad_2"].visible = false;
			}
		}
		
		/** 閒問路 */
		private function askPlayerRoad():void {
			if (this._roadString.bigEyeRoad.length > 0) {
				this._routeView["askPlayRoad_0"].visible = true;
				this._routeView["askPlayRoad_0"].gotoAndStop(this._roadString.bigEyeRoad.slice(-1));
			} else {
				this._routeView["askPlayRoad_0"].visible = false;
			}
			
			if (this._roadString.smallRoad.length > 0) {
				this._routeView["askPlayRoad_1"].visible = true;
				this._routeView["askPlayRoad_1"].gotoAndStop(this._roadString.smallRoad.slice(-1));
			} else {
				this._routeView["askPlayRoad_1"].visible = false;
			}
			
			if (this._roadString.roachRoad.length > 0) {
				this._routeView["askPlayRoad_2"].visible = true;
				this._routeView["askPlayRoad_2"].gotoAndStop(this._roadString.roachRoad.slice(-1));
			} else {
				this._routeView["askPlayRoad_2"].visible = false;
			}
		}
		
		private function onAskRoad(e:RouteEvent):void {
			if ( this._nowRoad.indexOf( "#" ) != -1 ) {
				return;
			}	
			
//			this.cacheToBmp(false);
			this._beadPlate.addEventListener(RouteEvent.ASK_Road_END, onAskRoadEnd);
			trace("onAskRoad::::" + String(e.data) );
		
			switch (String(e.data)) {
				case "btn_AskBankerRoad": 
					this.showRoad(this._nowRoad + "a", true);
					break;
				case "btn_AskPlayerRoad": 
					this.showRoad(this._nowRoad + "e", true);
					break;
			}
			
		
		}
		
		private function onAskRoadEnd(e:RouteEvent):void {
			trace("onAskRoadEnd::" + ",nowRoad::" + this._nowRoad );
			this.showRoadViewInit();
			this._beadPlate.removeEventListener(RouteEvent.ASK_Road_END, onAskRoadEnd);
			this.showRoad(this._nowRoad);
//			this.cacheToBmp(true);
		}
		
		private function cacheToBmp(isCache:Boolean):void {
			this._beadPlate.cacheAsBitmap = isCache;
			this._bigSprite.cacheAsBitmap = isCache;
			this._bigEyeSprite.cacheAsBitmap = isCache;
			this._smallSprite.cacheAsBitmap = isCache;
			this._roachSprite.cacheAsBitmap = isCache;
		}
		
		public function disable():void {
			this._isBtnOpen = false;
			this._isUp = false;

		}
		
		public function enable():void {
			this._isBtnOpen = true;
			this._isUp = true;

		}
		
		
		public function onMainClick(e:MouseEvent):void {
			this._isUp = this._isUp ? false : true;
			this._islock = true;
		}
	
	}

}