module lobby.view.route.game.dtf {
	export class DtfRouteMgr implements iface.ISprite {
		public static ASK_MODE_DRAGON							=	0;
		public static ASK_MODE_TIGER							=	1;
		
		protected m_view				;
		protected m_routeView			;
		
		protected m_isBtnOpen			:	boolean 			= 	false;
		
		protected m_islock				:	boolean 			=	true;
		protected m_isUp				:	boolean 			= 	false;
		
		/**當前顯示路*/
		protected m_nowRoad				:	string = "";
		
		protected m_beadPlate			:	DtfBeadPlate;
		
		protected m_roadString			:	RoadStringObject 	= 	new RoadStringObject;
		protected m_bigSprite			:	DtfRoadCanvas 		= 	new DtfRoadCanvas;
		protected m_bigEyeSprite		:	DtfRoadCanvas 		= 	new DtfRoadCanvas;
		protected m_smallSprite			:	DtfRoadCanvas 		= 	new DtfRoadCanvas;
		protected m_roachSprite			:	DtfRoadCanvas 		= 	new DtfRoadCanvas;
		
		/*protected m_roadUpdateTimer		:	JTimer;*/
		protected m_roadBufferTime		:	number 				= 	100;
		protected m_beadInfo			:	BeadInfo;
		private m_askTimer				;
		private m_bAsk					:	boolean;														//问路状态
		
		public bError					:	boolean;														//错误状态
		
		
		public constructor(view) {
		
			this.m_routeView = view;
			
//			this._beadPlate = new DtfBeadPlate(this._routeView.mcBeadPlate); //珠路盤
			this.m_beadPlate = new DtfBeadPlate(this.m_routeView.getChildByName("mc_0"), BeadItemDTF); //珠路盤
			this.init();
			this.setRoadInf();
			
			
			/*this.m_roadUpdateTimer = new Timer(m_roadBufferTime,1);
			this.m_roadUpdateTimer.addEventListener(TimerEvent.TIMER_COMPLETE , updateRoadHandler );*/
			/*m_roadUpdateTimer = JTimer.getTimer(m_roadBufferTime,1);
			m_roadUpdateTimer.addTimerCallback(null,updateRoadHandler);*/
			
			/*this.m_askTimer = new Timer(300,6);
			this.m_askTimer.addEventListener(TimerEvent.TIMER,flash);
			this.m_askTimer.addEventListener(TimerEvent.TIMER_COMPLETE,stopAsk);	*/
			this.m_askTimer = timers.JTimer.getTimer(300,6);
			this.m_askTimer.addTimerCallback(flash,this.stopAsk);
		}
		
		public destroy():void {
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
				this.m_askTimer.dispose();
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
		
		private stopAsk() : void {
			this.m_bAsk = false;
			this.m_askTimer.stop();
			this.showRoadViewInit();
			this.showRoad(this.m_nowRoad);
//			this.cacheToBmp(true);
		}
		/**
		 *当前路子个数 
		 * @return 
		 * 
		 */
		get roadNum():number{
			if (this.m_nowRoad==null ||this.m_nowRoad==""){
				return 0;
			}else{
				var len:number= this.m_nowRoad.split(".").length;
				return len;
			}
		}
		
		/**
		 * 清掉路單
		 */
		public clearRoad():void {
			this.bError = false;
			this.m_nowRoad = "";			
			this.showRoadViewInit();
			//console.log("clearRoad:" + this._nowRoad);
		}		
		
		/** 更新路單 */
		public addRoad(road:string):void {
			//console.log("更新路單 : " + road);
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
				this.bError = true;
				return;
			}else{
				this.bError = false;
			}
			
			
			
			if(this.m_nowRoad==""){
				this.m_nowRoad += road;
			}else{
				this.m_nowRoad += "." + road;
			}
			
			console.log("addRoad::" + this.m_nowRoad );
			//this._nowRoad = road;
			
			/*if ( !this.m_roadUpdateTimer.running ) {
				this.m_roadUpdateTimer.start();
			}*/
			this.updateRoadHandler();
			
			//this.cacheToBmp(false);
			//this.showRoadViewInit();
			/*this.showRoad( this._nowRoad + "a", false);
			this.askBankerRoad();
			this.showRoad( this._nowRoad + "e", false);
			this.askPlayerRoad();*/
			//this.showRoad( this._nowRoad);
			
			//this.cacheToBmp(true);
		}
		
		public onChangeLanguage():void{
			if(this.m_beadPlate){
				this.m_beadPlate.onChangeLanguage();
			}
		}
		
		protected showRoad(road:string, isAsk: boolean = false):void {
			//this.showRoadViewInit();
			this.m_roadString = BeadRoad.createRoadReanderString(road);
			this.m_beadPlate.addRoad(road, isAsk);
			
			var grids:any[] = BeadRoad.createBigRoadRenderGrid( this.m_roadString.bigRoad, null );
			this.m_bigSprite.drawBigRoadDataGrid( grids , RoadBallPool.BIG_ROAD , isAsk );
			this.m_bigEyeSprite.drawReaderDataGrid( BeadRoad.createRoadRenderGrid(this.m_roadString.bigEyeRoad, null , 6) , isAsk , RoadBallPool.BIG_EYE_ROAD );
			this.m_smallSprite.drawReaderDataGrid( BeadRoad.createRoadRenderGrid(this.m_roadString.smallRoad, null , 6) , isAsk  , RoadBallPool.SMALL_EYE_ROAD );
			this.m_roachSprite.drawReaderDataGrid( BeadRoad.createRoadRenderGrid(this.m_roadString.roachRoad, null , 6 ) , isAsk , RoadBallPool.COCKROACH_ROAD );

		}		
		
		/** 路單初始 */
		protected showRoadViewInit():void {
			
			this.m_beadPlate.init();
			this.m_bigEyeSprite.init();
			this.m_bigSprite.init();
			this.m_roachSprite.init();
			this.m_smallSprite.init();
		}
		
		protected flash():void{
			this.m_beadPlate.flash();
			this.m_bigSprite.flash();
			this.m_bigEyeSprite.flash();
			this.m_smallSprite.flash();
			this.m_roachSprite.flash();
		}	
		
		protected updateRoadHandler():void {
			console.log("updateRoadHandler::" + this.m_nowRoad);
			if ( ( this.m_nowRoad != "null" ) && (this.m_nowRoad != null) && ( this.m_nowRoad != "") )  {
//				this.cacheToBmp(false);
				this.showRoadViewInit();
				this.showRoad( this.m_nowRoad);
//				this.cacheToBmp(true);			
			}
			
		}			
		
		protected setRoadInf():void{
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
				
		
		protected init():void {
			this.m_routeView.boxBigRoad.addChild(this.m_bigSprite);	//大路
			this.m_routeView.boxBigEye.addChild(this.m_bigEyeSprite);	//大眼
			this.m_routeView.boxSmallRoad.addChild(this.m_smallSprite); //小路
			this.m_routeView.boxCockroachRoad.addChild(this.m_roachSprite); //蟑螂路
			
			this.m_beadPlate.touchChildren = this.m_beadPlate.touchEnabled = false;
			this.m_routeView.boxBigRoad.touchChildren = this.m_routeView.boxBigRoad.touchEnabled = false;
			this.m_routeView.boxBigEye.touchChildren = this.m_routeView.boxBigEye.touchEnabled = false;
			this.m_routeView.boxSmallRoad.touchChildren = this.m_routeView.boxSmallRoad.touchEnabled = false;
			this.m_routeView.boxCockroachRoad.touchChildren = this.m_routeView.boxCockroachRoad.touchEnabled = false;	
		}
		
		
		public onAskRoad(_iMode:number):void {
				if(this.m_bAsk){
					this.stopAsk();
				}
			
				this.m_bAsk = true;
				
				
				//this._beadPlate.addEventListener(RouteEvent.ASK_Road_END, onAskRoadEnd);
				var key:string="";
				if (this.m_nowRoad!=""){
					key=".";
				}
				switch (_iMode) {
					case DtfRouteMgr.ASK_MODE_DRAGON: 
						key+="a";
						break;
					case DtfRouteMgr.ASK_MODE_TIGER: 
						key+="e";
						break;
				}
				this.showRoad(this.m_nowRoad + key, true);
				this.m_askTimer.reset();
				this.m_askTimer.start();
			
		}		
		protected cacheToBmp(isCache: boolean):void {
			this.m_beadPlate.cacheAsBitmap = isCache;
			this.m_bigSprite.cacheAsBitmap = isCache;
			this.m_bigEyeSprite.cacheAsBitmap = isCache;
			this.m_smallSprite.cacheAsBitmap = isCache;
			this.m_roachSprite.cacheAsBitmap = isCache;
		}
		
		
	}
}