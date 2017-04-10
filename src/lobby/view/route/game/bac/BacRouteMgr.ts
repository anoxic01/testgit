module lobby.view.route.game.bac {
	export class BacRouteMgr extends egret.EventDispatcher{
		public static ASK_MODE_BANKER			:	number				=	0;
		public static ASK_MODE_PLAYER			:	number				=	1;
		
		protected m_routeView					;
		
		private m_isBtnOpen						:	boolean 			= 	false;
		
		private m_islock						:	boolean 			= 	true;
		private m_isUp							:	boolean 			= 	false;
		
		/**當前顯示路*/
		protected _nowRoad						:	string 				=	"";
		
		protected m_beadPlate					:	BeadPlate;
		
		private m_roadString					:	RoadStringObject 	= 	new RoadStringObject;
		protected m_bigSprite					:	BacRoadCanvas 		= 	new BacRoadCanvas();
		protected m_bigEyeSprite				:	BacRoadCanvas 		= 	new BacRoadCanvas();
		protected m_smallSprite					:	BacRoadCanvas 		= 	new BacRoadCanvas();
		protected m_roachSprite					:	BacRoadCanvas 		= 	new BacRoadCanvas();
		
		protected m_beadInfo					:	BeadInfo;
		protected m_askTimer					;
		private m_bAsk							:	boolean;														//问路状态
		
		public bError							:	boolean;														//错误状态
		
		public constructor(view) {
			super();
			this.m_routeView = view;
			
//			this._beadPlate = new BeadPlate(this._routeView.mcBeadPlate); //珠路盤
			
			this.init();
			this.setRoadInf();
				
			
			/*this.m_askTimer = new Timer(300,6);
			this.m_askTimer.addEventListener(TimerEvent.TIMER,flash);
			this.m_askTimer.addEventListener(TimerEvent.TIMER_COMPLETE,stopAsk);*/
			this.m_askTimer = timers.JTimer.getTimer(300,6);
			this.m_askTimer.addTimerCallback(this.flash,this.stopAsk);
			
		}
		
		protected init():void 
		{
			//珠路盤
			var beadMc = this.m_routeView.getChildByName("mc_0");
			if (beadMc){
				this.m_beadPlate = new BeadPlate(beadMc, BeadItemBaccarat); //珠路盤
			}
			if (this.m_beadPlate){
				
				this.m_beadPlate.setBeads();
				this.m_beadPlate.touchChildren = this.m_beadPlate.touchEnabled = false;
			}
			
			
			this.m_routeView.boxBigRoad.addChild(this.m_bigSprite);	//大路
			this.m_routeView.boxBigEye.addChild(this.m_bigEyeSprite);	//大眼
			this.m_routeView.boxSmallRoad.addChild(this.m_smallSprite); //小路
			this.m_routeView.boxCockroachRoad.addChild(this.m_roachSprite); //蟑螂路
			
			
			this.m_routeView.boxBigRoad.touchChildren = this.m_routeView.boxBigRoad.touchEnabled = false;
			this.m_routeView.boxBigEye.touchChildren = this.m_routeView.boxBigEye.touchEnabled = false;
			this.m_routeView.boxSmallRoad.touchChildren = this.m_routeView.boxSmallRoad.touchEnabled = false;
			this.m_routeView.boxCockroachRoad.touchChildren = this.m_routeView.boxCockroachRoad.touchEnabled = false;	
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
		
		
		/**
		 * 變更語系
		 * @param	lang
		 */
		public  onChangeLanguage():void{
			
			if(this.m_beadPlate){
				this.m_beadPlate.onChangeLanguage();
			}
		}
		
		public destroy():void {
			if (this.m_askTimer){
				/*m_askTimer.removeEventListener(TimerEvent.TIMER,flash);
				m_askTimer.removeEventListener(TimerEvent.TIMER_COMPLETE,stopAsk);*/
				this.m_askTimer.dispose();
				this.m_askTimer = null;
			}
			if( this.m_bigSprite ){
				this.m_bigSprite.destroy();
				this.m_bigSprite = null;
			}
			if( this.m_bigEyeSprite ){
				this.m_bigEyeSprite.destroy();
				this.m_bigEyeSprite = null;
			}
			if(	this.m_smallSprite ){
				this.m_smallSprite.destroy();
				this.m_smallSprite = null;
			}
			if( this.m_roachSprite ){
				this.m_roachSprite.destroy();
				this.m_roachSprite = null;
			}
			
			if( this.m_beadPlate ){
				this.m_beadPlate.destroy();
				this.m_beadPlate = null;
			}
			
			if(	this.m_roadString){
				this.m_roadString = null;
			}
			
			if( this.m_beadInfo ){
				this.m_beadInfo = null;
			}
			
			if (this.m_routeView){
				this.m_routeView=null;
			}
			
		}
		
		/**
		 *当前路子个数 
		 * @return 
		 * 
		 */
		get roadNum():number{
			if (this._nowRoad==null ||this._nowRoad==""){
				return 0;
			}else{
				var len:number= this._nowRoad.split(".").length;
				return len;
			}
		}
		
		
		/**
		 * 清掉路單
		 */
		public clearRoad():void {
			this.bError = false;
			this._nowRoad = "";			
			this.showRoadViewInit();
			//console.log("clearRoad:" + this._nowRoad);
		}
		
		/** 更新路單 */
		public addRoad(road:string):void {
//			if ( this._nowRoad.length > Define.BEAD_NUM ) {
//				this._nowRoad = "";
//			}
			if (road == null || road == '' || road == "null") {
				return;
			}
			
			if ( road.indexOf( "#" ) != -1 ) {
				//路紙有錯
				this.bError = true;
				console.log("路紙有錯"+road);
				return;
			}else{
				this.bError = false;
			}
			
			if(this._nowRoad==""){
				this._nowRoad += road;
			}else{
				this._nowRoad += "." + road;
			}
			
			
		//	console.log("addRoad::" + this._nowRoad );
			//this._nowRoad = road;
			if ( ( this._nowRoad != "null" ) && (this._nowRoad != null) )  {
			//	this.showRoadViewInit();
				this.showRoad( this._nowRoad);
			}
		}
		
		protected showRoad(road:string, isAsk: boolean = false):void {
			//this.showRoadViewInit();
			this.m_roadString = BeadRoad.createRoadReanderString(road);
			if(this.m_beadPlate){
				this.m_beadPlate.addRoad(road, isAsk);
			}
			
			var grids:any[] = BeadRoad.createBigRoadRenderGrid( this.m_roadString.bigRoad, null );
			this.m_bigSprite.drawBigRoadDataGrid( grids , RoadBallPool.BIG_ROAD , isAsk );
			this.m_bigEyeSprite.drawReaderDataGrid( BeadRoad.createRoadRenderGrid(this.m_roadString.bigEyeRoad, null , 6) , isAsk , RoadBallPool.BIG_EYE_ROAD );
			this.m_smallSprite.drawReaderDataGrid( BeadRoad.createRoadRenderGrid(this.m_roadString.smallRoad, null , 6) , isAsk  , RoadBallPool.SMALL_EYE_ROAD );
			this.m_roachSprite.drawReaderDataGrid( BeadRoad.createRoadRenderGrid(this.m_roadString.roachRoad, null , 6 ) , isAsk , RoadBallPool.COCKROACH_ROAD );
			
//			if (_askBankerRoad){
			//不显示探路
//				showProbeIcon();
//				
//			}
			
		}
		
		private showProbeIcon():void{
			this.drawProbeIcon(".a");
			this.drawProbeIcon(".e");
		}
		
		private drawProbeIcon(probe:string):void{
			var roadStrObj:RoadStringObject = BeadRoad.createRoadReanderString(this._nowRoad+probe);
			var probeArr:any[]=new Array(3);
			probeArr[0]=roadStrObj.bigEyeRoad.charAt(roadStrObj.bigEyeRoad.length-1)
			probeArr[1] = roadStrObj.smallRoad.charAt(roadStrObj.smallRoad.length-1)
			probeArr[2] = roadStrObj.roachRoad.charAt(roadStrObj.roachRoad.length-1)
		//	console.log("探路"+probe+"-----:"+probeArr);
			
			if(probeArr[0])
				probeArr[0]=this.m_bigEyeSprite.getRoadCell(RoadBallPool.BIG_EYE_ROAD,probeArr[0])
			if(probeArr[1])
				probeArr[1]=this.m_smallSprite.getRoadCell(RoadBallPool.SMALL_EYE_ROAD,probeArr[1])
			if(probeArr[2])
				probeArr[2]=this.m_roachSprite.getRoadCell(RoadBallPool.COCKROACH_ROAD,probeArr[2]);
			
			var sp;
			if (probe==".a"){
				sp=this.m_routeView.btn_AskBankerRoad
			}else{
				sp=this.m_routeView.btn_AskPlayerRoad
				
			}
			for (var i:number= 0; i < probeArr.length; i++) 
			{
				if (probeArr[i] instanceof egret.DisplayObject){
					var icon=probeArr[i];
					icon.x=i*15+10;
					icon.y=40;
					sp.addChild(icon);
				}
				
				
			}
			
			
		}
		
		/** 路單初始 */
		protected showRoadViewInit():void {
		
			if (this.m_beadPlate){
				this.m_beadPlate.init();
				
			}
			this.m_bigEyeSprite.init();
			this.m_bigSprite.init();
			this.m_roachSprite.init();
			this.m_smallSprite.init();
		}
		
		public onAskRoad(_iMode:number):void {
		//	if(!m_bAsk){
				if(this.m_bAsk){
					this.stopAsk();
				}
				
				this.m_bAsk = true;
				//this._beadPlate.addEventListener(RouteEvent.ASK_Road_END, onAskRoadEnd);
				
				var key:string="";
				if (this._nowRoad!=""){
					key=".";
				}
				switch (_iMode) {
					case BacRouteMgr.ASK_MODE_BANKER: 
						key+="a";
						break;
					case BacRouteMgr.ASK_MODE_PLAYER: 
						key+="e";
						break;
				}
				this.showRoad(this._nowRoad + key, true);
				this.m_askTimer.reset();
				this.m_askTimer.start();
// 			}
			
//			else{
//				console.log("问路中。。。");
//			}
			
		}
		
		protected flash():void{
			if (this.m_beadPlate){
				this.m_beadPlate.flash();
			}
				this.m_bigSprite.flash();
				this.m_bigEyeSprite.flash();
				this.m_smallSprite.flash();
				this.m_roachSprite.flash();
		}
		
		
		protected stopAsk() : void
		{
			this.m_bAsk = false;
			this.m_askTimer.stop();
			this.showRoadViewInit();
			this.showRoad(this._nowRoad);
		}
		
		
		
		public disable():void {
			this.m_isBtnOpen = false;

		}
		
		public enable():void {
			this.m_isBtnOpen = true;

		}
		
		
	
	}

}