module lobby.view.route.game.rou {
	export class RouRouteMgr extends BSprite{
		public var m_routeView			:	MovieClip;
		
		private var _isBtnOpen			:	Boolean 			= 	false;
		
		private var _islock				:	Boolean 			= 	true;
		private var _isUp				:	Boolean 			= 	false;
		
		/**當前顯示路*/
		private var _nowRoad			:	String 				= 	"";
		
		
		//private var _beadPlate:BeadPlate;
		protected var _roadString		:	RoadStringObject	= 	new RoadStringObject;
		protected var _beadSp			:	RouRoadCanvas 		= 	new RouRoadCanvas();
		protected var _bigSmallSp		:	RouRoadCanvas 		= 	new RouRoadCanvas;
		protected var _oddEvenSp		:	RouRoadCanvas 		= 	new RouRoadCanvas;
		protected var _redBlackSp		:	RouRoadCanvas 		= 	new RouRoadCanvas;
		protected var _dozenRowSp		:	RouRoadCanvas 		= 	new RouRoadCanvas;
		
		public var m_beadInfo			:	BeadInfo;
		private const LIMITDATA			:	int = 372;
		
		
		public var bError				:	Boolean;														//错误状态
		

		public constructor(view:MovieClip) {
			this.m_routeView = view.getChildByName("mc_0") as MovieClip;
			//this._beadPlate = new BeadPlate(this._routeView.rouRoad); //珠路盤
			this.init();
			//路紙參數均在此設定
			this.m_beadInfo = new BeadInfo();
			
			setRoadInf();
			
		}
		
		protected function init():void 
		{
			
			this._bigSmallSp.x=240;
			this._oddEvenSp.x=240;
			this._dozenRowSp.x=240;
			this._redBlackSp.x=240;
			
			this.m_routeView.addChildAt(this._bigSmallSp,0);
			this.m_routeView.addChildAt(this._oddEvenSp,0);
			this.m_routeView.addChildAt(this._redBlackSp,0); 
			this.m_routeView.addChildAt(this._dozenRowSp,0);
			this.m_routeView.addChildAt(this._beadSp,0); 
			
			
			//this._beadPlate.mouseChildren = this._beadPlate.mouseEnabled = false;
//			this._routeView.bigSmall.mouseChildren = this._routeView.bigSmall.mouseEnabled = false;
//			this._routeView.oddEven.mouseChildren = this._routeView.oddEven.mouseEnabled = false;
//			this._routeView.dozenRow.mouseChildren = this._routeView.dozenRow.mouseEnabled = false;
//			this._routeView.redBlack.mouseChildren = this._routeView.redBlack.mouseEnabled = false;	
			
			this._dozenRowSp.visible = false;
			//this._routeView.zoenRowRoadBg.visible = true;
			this._bigSmallSp.visible = false;
			this._oddEvenSp.visible = false;
			this._redBlackSp.visible = true;		
			//this._beadSp.visible = false;
		}
		
		override public function destroy():void {
			_beadSp.destroy();
			_bigSmallSp.destroy();
			_oddEvenSp.destroy();
			_redBlackSp.destroy();
			_dozenRowSp.destroy();
			
		}
		
		override public function onChangeLanguage():void{
			_bigSmallSp.onChangeLanguage();
			_oddEvenSp.onChangeLanguage();
			_redBlackSp.onChangeLanguage();
			_dozenRowSp.onChangeLanguage();
			
			
		}
		
		protected function setRoadInf():void{
			
			this.m_beadInfo.gridWidth = 19;
			this.m_beadInfo.gridHeight = 6;
			this.m_beadInfo.beadW =  24;				
			this.m_beadInfo.beadH =  24;
			
			
			this.m_beadInfo.bigMc_OfftenWidth =  0;
			this.m_beadInfo.bigMc_OfftenHeight =  0;
			this.m_beadInfo.bigMc_OfftenX =  0;
			this.m_beadInfo.bigMc_OfftenY =  0;
			
			
			
			this.m_beadInfo.oddMc_OfftenWidth = 0;
			this.m_beadInfo.oddMc_OfftenHeight =  0;
			this.m_beadInfo.oddMc_OfftenX =  0;
			this.m_beadInfo.oddMc_OfftenY =  0;
			
			
			this.m_beadInfo.redMc_OfftenWidth = 0;
			this.m_beadInfo.redMc_OfftenHeight =  0;
			this.m_beadInfo.redMc_OfftenX =  0;
			this.m_beadInfo.redMc_OfftenY =  0;
			
			
			this.m_beadInfo.zeroMc_OfftenWidth =  0.1;
			this.m_beadInfo.zeroMc_OfftenHeight =  0;
			this.m_beadInfo.zeroMc_OfftenX =  0;
			this.m_beadInfo.zeroMc_OfftenY =  1;
			
			this.m_beadInfo.tieMc_OfftenWidth =  0;
			this.m_beadInfo.tieMc_OfftenHeight =  0;
			this.m_beadInfo.tieMc_OfftenX =  0;
			this.m_beadInfo.tieMc_OfftenY =  0;
			
			this.m_beadInfo.beadMc_OfftenWidth = 0;
			this.m_beadInfo.beadMc_OfftenHeight =  0;
			this.m_beadInfo.beadMc_OfftenX =  0;
			this.m_beadInfo.beadMc_OfftenY =  0;
			
			this.m_beadInfo.blueMc_OfftenWidth = 0;
			this.m_beadInfo.blueMc_OfftenHeight = 0;
			this.m_beadInfo.blueMc_OfftenX =  0;
			this.m_beadInfo.blueMc_OfftenY =  2;
			
			
			
			this.m_beadInfo.zoenRowW =  20.57;
			this.m_beadInfo.zoenRowH =  20.57;
			
			var _colNum:int=19
			this._bigSmallSp.setBeadSize(this.m_beadInfo);
			this._bigSmallSp.drawBg(_colNum,6,24);
			this._oddEvenSp.setBeadSize(this.m_beadInfo);
			this._oddEvenSp.drawBg(_colNum,6,24);
			this._redBlackSp.setBeadSize(this.m_beadInfo);
			this._redBlackSp.drawBg(_colNum,6,24);
			this._dozenRowSp.setBeadSize(this.m_beadInfo);
			this._dozenRowSp.drawBg(_colNum+5,7,20.571);
			
			
			var beadInfo0:BeadInfo = new BeadInfo();
			beadInfo0.gridWidth = 10;
			beadInfo0.gridHeight = 6;
			beadInfo0.beadW =  24;				
			beadInfo0.beadH =  24;
			this._beadSp.setBeadSize(beadInfo0);
			this._beadSp.drawBg(10,6,24)
				
		}
		
		public function setHead():void{
			
		}
		
		
		public function changeRoad( type:String ):void {
			switch (type) 
			{
				case RouRoadType.BIG_SMALL:
					this._dozenRowSp.visible = false;
					this._bigSmallSp.visible = true;
					this._oddEvenSp.visible = false;
					this._redBlackSp.visible = false;
					//this._beadSp.visible = false;
				break;
				case RouRoadType.ODD_EVEN:
					this._dozenRowSp.visible = false;
					this._bigSmallSp.visible = false;
					this._oddEvenSp.visible = true;
					this._redBlackSp.visible = false;
					//this._beadSp.visible = false;
				break;
				case RouRoadType.RED_BLACK:
					this._dozenRowSp.visible = false;
					this._bigSmallSp.visible = false;
					this._oddEvenSp.visible = false;
					this._redBlackSp.visible = true;
					//this._beadSp.visible = false;
				break;
				case RouRoadType.ZOEN_ROW:
					this._dozenRowSp.visible = true;
					this._bigSmallSp.visible = false;
					this._oddEvenSp.visible = false;
					this._redBlackSp.visible = false;
					//this._beadSp.visible = false;
				break;
				case RouRoadType.BEAD:
					this._dozenRowSp.visible = true;
					this._bigSmallSp.visible = false;
					this._oddEvenSp.visible = false;
					this._redBlackSp.visible = false;
				//	this._beadSp.visible = true;
					break;
				default:
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
			//trace("更新路單 : " + road);
			//road+="2.3.4.5.6.7.8.9.0.1.2.7.15.16.19.17.36"
//			if ( this._nowRoad.length > LIMITDATA ) {
//				this._nowRoad = this._nowRoad.substr( LIMITDATA - 1 , this._nowRoad.length );
//			}
			
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
			
			if (_nowRoad==""){
				this._nowRoad +=road;
			}else{
				this._nowRoad += "."+road;
			}
			if ( this._nowRoad == "null" || this._nowRoad == null ) {
				this._nowRoad = '';
			}				
			//trace("addRouRoad::" + this._nowRoad );
			//this._nowRoad = road;
			if ( ( this._nowRoad != "null" ) && (this._nowRoad != null) )  {
				this.showRoadViewInit();
				this.showRoad( this._nowRoad);
			}
		}
		
		private function showRoad(road:String, isAsk:Boolean = false):void {
			//this.showRoadViewInit();
			var roadString:String   
			var bigSmallAr:Array 
			var oddEvenAr:Array;
			var redBlackAr:Array;
			var zoenRowAr:Array;
			var beadAr:Array;
			//大小
			roadString = RouData.getInstance().findBigSmall( road );//資料格式: 2.3.3.2.3.2.2.2.i.2.i.i.i
			bigSmallAr = RouBeadRoad.createRoadRenderGrid( roadString, null );
			this._bigSmallSp.drawBigSmallRoad( bigSmallAr );
			
			//單雙
			roadString = RouData.getInstance().findOddEven( road );  //資料格式:4.5.i.4.5.i
			oddEvenAr = RouBeadRoad.createRoadRenderGrid( roadString, null );
			this._oddEvenSp.drawOddEvenRoad( oddEvenAr  );
			
			//紅黑
			roadString = RouData.getInstance().findRedBlack( road );  //資料格式:0.1.0.1.i.0
			redBlackAr = RouBeadRoad.createRoadRenderGrid( roadString, null );
			this._redBlackSp.drawRedBlackRoad( redBlackAr  );
			
			//打列
			roadString = RouData.getInstance().findZoenRowData( road );  //資料格式:0_1.1_2.i
			zoenRowAr = RouBeadRoad.createZoenRowRenderGrid( roadString, null );
			this._dozenRowSp.drawZodenRowRoad( zoenRowAr  );
			
			//珠盤
			beadAr = RouBeadRoad.createBeadGrid( road, null , 6 );
			this._beadSp.drawBeadRoad( beadAr  );
			
		}
		
		/** 路單初始 */
		private function showRoadViewInit():void {
			//this._beadPlate.init();
			this._bigSmallSp.init();
			this._oddEvenSp.init();
			this._redBlackSp.init();
			this._dozenRowSp.init();
			this._beadSp.init();
		}
		
		
		private function cacheToBmp(isCache:Boolean):void {
			this._bigSmallSp.cacheAsBitmap = isCache;
			this._oddEvenSp.cacheAsBitmap = isCache;
			this._redBlackSp.cacheAsBitmap = isCache;
			this._dozenRowSp.cacheAsBitmap = isCache;
			this._beadSp.cacheAsBitmap = isCache;
		}
		
		public function disable():void {
			this._isBtnOpen = false;
			this._isUp = false;
			//this.DelMainEvent();
			//this.addMainEvent();
		}
		
		public function enable():void {
			this._isBtnOpen = true;
			this._isUp = true;
			//this.DelMainEvent();
			//this.addMainEvent();
		}
		
	
	}
}