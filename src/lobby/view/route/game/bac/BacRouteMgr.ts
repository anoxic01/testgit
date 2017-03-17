module lobby.view.route.game.bac {
	export class BacRouteMgr extends EventDispatcher{
		public static const ASK_MODE_BANKER			:	uint				=	0;
		public static const ASK_MODE_PLAYER			:	uint				=	1;
		
		protected var m_routeView					:	MovieClip;
		
		private var m_isBtnOpen						:	Boolean 			= 	false;
		
		private var m_islock						:	Boolean 			= 	true;
		private var m_isUp							:	Boolean 			= 	false;
		
		/**當前顯示路*/
		protected var _nowRoad						:	String 				=	"";
		
		protected var m_beadPlate					:	BeadPlate;
		
		private var m_roadString					:	RoadStringObject 	= 	new RoadStringObject;
		protected var m_bigSprite					:	BacRoadCanvas 		= 	new BacRoadCanvas();
		protected var m_bigEyeSprite				:	BacRoadCanvas 		= 	new BacRoadCanvas();
		protected var m_smallSprite					:	BacRoadCanvas 		= 	new BacRoadCanvas();
		protected var m_roachSprite					:	BacRoadCanvas 		= 	new BacRoadCanvas();
		
		protected var m_beadInfo					:	BeadInfo;
		protected var m_askTimer					:	JTimer;
		private var m_bAsk							:	Boolean;														//问路状态
		
		public var bError							:	Boolean;														//错误状态
		
		public constructor(view:MovieClip) {
		this.m_routeView = view;
			
//			this._beadPlate = new BeadPlate(this._routeView.mcBeadPlate); //珠路盤
			
			this.init();
			setRoadInf();
				
			
			/*this.m_askTimer = new Timer(300,6);
			this.m_askTimer.addEventListener(TimerEvent.TIMER,flash);
			this.m_askTimer.addEventListener(TimerEvent.TIMER_COMPLETE,stopAsk);*/
			m_askTimer = JTimer.getTimer(300,6);
			m_askTimer.addTimerCallback(flash,stopAsk);
			
		}
		
		protected function init():void 
		{
			//珠路盤
			var beadMc:MovieClip =m_routeView.getChildByName("mc_0") as MovieClip
			if (beadMc){
				this.m_beadPlate = new BeadPlate(beadMc, BeadItemBaccarat); //珠路盤
			}
			if (m_beadPlate){
				
				m_beadPlate.setBeads();
				this.m_beadPlate.mouseChildren = this.m_beadPlate.mouseEnabled = false;
			}
			
			
			this.m_routeView.boxBigRoad.addChild(this.m_bigSprite);	//大路
			this.m_routeView.boxBigEye.addChild(this.m_bigEyeSprite);	//大眼
			this.m_routeView.boxSmallRoad.addChild(this.m_smallSprite); //小路
			this.m_routeView.boxCockroachRoad.addChild(this.m_roachSprite); //蟑螂路
			
			
			this.m_routeView.boxBigRoad.mouseChildren = this.m_routeView.boxBigRoad.mouseEnabled = false;
			this.m_routeView.boxBigEye.mouseChildren = this.m_routeView.boxBigEye.mouseEnabled = false;
			this.m_routeView.boxSmallRoad.mouseChildren = this.m_routeView.boxSmallRoad.mouseEnabled = false;
			this.m_routeView.boxCockroachRoad.mouseChildren = this.m_routeView.boxCockroachRoad.mouseEnabled = false;	
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
		
		
		/**
		 * 變更語系
		 * @param	lang
		 */
		public function  onChangeLanguage():void{
			
			if(m_beadPlate){
				m_beadPlate.onChangeLanguage();
			}
		}
		
		public function destroy():void {
			if (m_askTimer){
				/*m_askTimer.removeEventListener(TimerEvent.TIMER,flash);
				m_askTimer.removeEventListener(TimerEvent.TIMER_COMPLETE,stopAsk);*/
				m_askTimer.dispose();
				m_askTimer = null;
			}
			if( m_bigSprite ){
				m_bigSprite.destroy();
				m_bigSprite = null;
			}
			if( m_bigEyeSprite ){
				m_bigEyeSprite.destroy();
				m_bigEyeSprite = null;
			}
			if( m_smallSprite ){
				m_smallSprite.destroy();
				m_smallSprite = null;
			}
			if( m_roachSprite ){
				m_roachSprite.destroy();
				m_roachSprite = null;
			}
			
			if( m_beadPlate ){
				m_beadPlate.destroy();
				m_beadPlate = null;
			}
			
			if(m_roadString){
				m_roadString = null;
			}
			
			if( m_beadInfo ){
				m_beadInfo = null;
			}
			
			if (m_routeView){
				m_routeView=null;
			}
			
		}
		
		/**
		 *当前路子个数 
		 * @return 
		 * 
		 */
		public function get roadNum():uint{
			if (this._nowRoad==null ||this._nowRoad==""){
				return 0;
			}else{
				var len:int = _nowRoad.split(".").length;
				return len;
			}
			return 0;
		}
		
		
		/**
		 * 清掉路單
		 */
		public function clearRoad():void {
			bError = false;
			this._nowRoad = "";			
			this.showRoadViewInit();
			//trace("clearRoad:" + this._nowRoad);
		}
		
		/** 更新路單 */
		public function addRoad(road:String):void {
//			if ( this._nowRoad.length > Define.BEAD_NUM ) {
//				this._nowRoad = "";
//			}
			if (road == null || road == '' || road == "null") {
				return;
			}
			
			if ( road.indexOf( "#" ) != -1 ) {
				//路紙有錯
				bError = true;
				trace("路紙有錯"+road);
				return;
			}else{
				bError = false;
			}
			
			if(_nowRoad==""){
				this._nowRoad += road;
			}else{
				this._nowRoad += "." + road;
			}
			
			
		//	trace("addRoad::" + this._nowRoad );
			//this._nowRoad = road;
			if ( ( this._nowRoad != "null" ) && (this._nowRoad != null) )  {
			//	this.showRoadViewInit();
				this.showRoad( this._nowRoad);
			}
		}
		
		protected function showRoad(road:String, isAsk:Boolean = false):void {
			//this.showRoadViewInit();
			this.m_roadString = BeadRoad.createRoadReanderString(road);
			if(m_beadPlate){
				this.m_beadPlate.addRoad(road, isAsk);
			}
			
			var grids:Array = BeadRoad.createBigRoadRenderGrid( this.m_roadString.bigRoad, null );
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
		
		private function showProbeIcon():void{
			drawProbeIcon(".a");
			drawProbeIcon(".e");
		}
		
		private function drawProbeIcon(probe:String):void{
			var roadStrObj:RoadStringObject = BeadRoad.createRoadReanderString(_nowRoad+probe);
			var probeArr:Array=new Array(3);
			probeArr[0]=roadStrObj.bigEyeRoad.charAt(roadStrObj.bigEyeRoad.length-1)
			probeArr[1] = roadStrObj.smallRoad.charAt(roadStrObj.smallRoad.length-1)
			probeArr[2] = roadStrObj.roachRoad.charAt(roadStrObj.roachRoad.length-1)
		//	trace("探路"+probe+"-----:"+probeArr);
			
			if(probeArr[0])
				probeArr[0]=m_bigEyeSprite.getRoadCell(RoadBallPool.BIG_EYE_ROAD,probeArr[0])
			if(probeArr[1])
				probeArr[1]=m_smallSprite.getRoadCell(RoadBallPool.SMALL_EYE_ROAD,probeArr[1])
			if(probeArr[2])
				probeArr[2]=m_roachSprite.getRoadCell(RoadBallPool.COCKROACH_ROAD,probeArr[2]);
			
			var sp:Sprite;
			if (probe==".a"){
				sp=this.m_routeView.btn_AskBankerRoad
			}else{
				sp=this.m_routeView.btn_AskPlayerRoad
				
			}
			for (var i:int = 0; i < probeArr.length; i++) 
			{
				if (probeArr[i] is DisplayObject){
					var icon:Sprite=probeArr[i];
					icon.x=i*15+10;
					icon.y=40;
					sp.addChild(icon);
				}
				
				
			}
			
			
		}
		
		/** 路單初始 */
		protected function showRoadViewInit():void {
		
			if (m_beadPlate){
				this.m_beadPlate.init();
				
			}
			this.m_bigEyeSprite.init();
			this.m_bigSprite.init();
			this.m_roachSprite.init();
			this.m_smallSprite.init();
		}
		
		public function onAskRoad(_iMode:int):void {
		//	if(!m_bAsk){
				if(m_bAsk){
					stopAsk();
				}
				
				m_bAsk = true;
				//this._beadPlate.addEventListener(RouteEvent.ASK_Road_END, onAskRoadEnd);
				
				var key:String="";
				if (this._nowRoad!=""){
					key=".";
				}
				switch (_iMode) {
					case ASK_MODE_BANKER: 
						key+="a";
						break;
					case ASK_MODE_PLAYER: 
						key+="e";
						break;
				}
				this.showRoad(this._nowRoad + key, true);
				m_askTimer.reset();
				m_askTimer.start();
// 			}
			
//			else{
//				trace("问路中。。。");
//			}
			
		}
		
		protected function flash():void{
			if (m_beadPlate){
				m_beadPlate.flash();
			}
				m_bigSprite.flash();
				m_bigEyeSprite.flash();
				m_smallSprite.flash();
				m_roachSprite.flash();
		}
		
		
		protected function stopAsk() : void
		{
			m_bAsk = false;
			m_askTimer.stop();
			this.showRoadViewInit();
			this.showRoad(this._nowRoad);
		}
		
		
		
		public function disable():void {
			this.m_isBtnOpen = false;

		}
		
		public function enable():void {
			this.m_isBtnOpen = true;

		}
		
		
	
	}

}