module lobby.view.route.game.sic {
	export class SicRouteMgr extends BSprite{
		protected var m_routeView		:	MovieClip;
		
		protected var m_isBtnOpen		:	Boolean 			= 	false;
		
		protected var m_islock			:	Boolean 			= 	true;
		protected var m_isUp			:	Boolean 			= 	false;
		
		/**當前顯示路*/
		protected var m_nowRoad			:	String 				= 	"";
		
		protected var m_askBankerRoad	:	AskRoadBtn;
		protected var m_askPlayerRoad	:	AskRoadBtn;
		
		//private var _beadPlate		:	BeadPlate;
		
		protected var m_roadString		:	RoadStringObject	=	new RoadStringObject;
		protected var m_bigSmallSp		:	SicRouteCanvas 		= 	new SicRouteCanvas();
		protected var m_oddEvenSp		:	SicRouteCanvas 		= 	new SicRouteCanvas();
		protected var m_tieSp			:	SicRouteCanvas 		= 	new SicRouteCanvas();
		protected var m_beadSp			:	SicRouteCanvas 		= 	new SicRouteCanvas();
		
		protected var m_beadInfo		:	BeadInfo;
		
		public const LIMITDATA			:	int 				=	3000;
		
		public var bError				:	Boolean;														//错误状态
		
		
		public constructor(view:MovieClip) {
							this.m_oddEvenSp.visible = true;
					this.m_tieSp.visible = false;
					break;
				
				case SicRoadType.TIE:
					this.m_oddEvenSp.visible = false;
					this.m_bigSmallSp.visible = false;
					this.m_beadSp.visible = false;
					this.m_tieSp.visible = true;
					break;
				
				case SicRoadType.BEAD:
					this.m_beadSp.visible = true;
					this.m_bigSmallSp.visible = false;
					this.m_oddEvenSp.visible = false;
					this.m_tieSp.visible = false;
					break;
				
				default:
					break;
			}
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
		
		/** 更新路單 */
		public function addRoad(road:String):void {
			//trace("更新路單 : " + road);
//			if ( this.m_nowRoad.length > LIMITDATA ) {
//				this.m_nowRoad = this.m_nowRoad.substr( LIMITDATA - 1 , this.m_nowRoad.length );
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
			road = sortRoad(road);
			
			if (m_nowRoad==""){
				this.m_nowRoad +=road;
			}else{
				this.m_nowRoad += "."+road;
			}
			
			if ( this.m_nowRoad == "null" || this.m_nowRoad == null ) {
				this.m_nowRoad = '';
			}
			
			trace("addRoad::" + this.m_nowRoad );
			
			updateRoadHandler();
			
		}
		
		/**
		 * 路紙排列
		 */
		protected function sortRoad(road:String):String {
			var _ar:Array = road.split('.');
			var _len:int = _ar.length;
			var _ar2:Array;
			for( var i:int = 0 ; i < _len; i++ ){
				_ar2 = _ar[i].split('');
				_ar2.sort( Array.NUMERIC );
				_ar[i] = _ar2.join('');
			}
			road = _ar.join('.');
			return road;
		}
		
		private function showRoad(road:String, isAsk:Boolean = false):void {
			//road="555.666.356.123.456.333.231.345.532.246.111.123.123.123.123.123.123.123.123.123.123.123.123.123.123"
			//臨時處理 ,避免服務端傳送 "000"錯誤,造成程式運行暫停
			if( road == "000" ){
				return;
			}
			//
			
			
			var roadString:String   
			var bigSmallAr:Array 
			var oddEvenAr:Array;
			var tieAr:Array;
			var beadAr:Array;
			
			//大小
			roadString = SicData.getInstance().findBigSmall( road );//資料格式: 2.3.3.2.3.2.2.2.i.2.i.i.i
			bigSmallAr = SicDataRoad.createRoadRenderGrid( roadString, null );
			this.m_bigSmallSp.drawBigSmallRoad( bigSmallAr );
			
			//單雙
			roadString = SicData.getInstance().findOddEven( road );  //資料格式:4.5.i.4.5.i
			oddEvenAr = SicDataRoad.createRoadRenderGrid( roadString, null );
			this.m_oddEvenSp.drawOddEvenRoad( oddEvenAr  );
			
			//和值
			roadString = SicData.getInstance().findTie( road );  //資料格式:0.1.0.1.i.0
			tieAr = SicDataRoad.createBeadGrid( roadString, null );
			this.m_tieSp.drawTieRoad( tieAr  );
			
			//珠盤
			beadAr = SicDataRoad.createBeadGrid( road, null , 6 );
			this.m_beadSp.drawBeadRoad( beadAr  );
			
		}
		
		
		/** 路單初始 */
		private function showRoadViewInit():void {
			this.m_bigSmallSp.init();
			this.m_oddEvenSp.init();
			this.m_beadSp.init();
			this.m_tieSp.init();
		}
		
		
		protected function cacheToBmp(isCache:Boolean):void {
			this.m_bigSmallSp.cacheAsBitmap = isCache;
			this.m_oddEvenSp.cacheAsBitmap = isCache;
			this.m_beadSp.cacheAsBitmap = isCache;
			this.m_tieSp.cacheAsBitmap = isCache;
		}

		
	}
	
}
