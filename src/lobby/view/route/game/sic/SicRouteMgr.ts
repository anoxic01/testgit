module lobby.view.route.game.sic {
	export class SicRouteMgr extends BSprite{
		protected m_routeView		;
		
		protected m_isBtnOpen		:	 boolean 			= 	false;
		
		protected m_islock			:	 boolean 			= 	true;
		protected m_isUp			:	 boolean 			= 	false;
		
		/**當前顯示路*/
		protected m_nowRoad			:	string 				= 	"";
		
		protected m_askBankerRoad	:	AskRoadBtn;
		protected m_askPlayerRoad	:	AskRoadBtn;
		
		//private _beadPlate		:	BeadPlate;
		
		protected m_roadString		:	RoadStringObject	=	new RoadStringObject;
		protected m_bigSmallSp		:	SicRouteCanvas 		= 	new SicRouteCanvas();
		protected m_oddEvenSp		:	SicRouteCanvas 		= 	new SicRouteCanvas();
		protected m_tieSp			:	SicRouteCanvas 		= 	new SicRouteCanvas();
		protected m_beadSp			:	SicRouteCanvas 		= 	new SicRouteCanvas();
		
		protected m_beadInfo		:	BeadInfo;
		
		public  LIMITDATA			 					=	3000;
		
		public bError				:	 boolean;														//错误状态
		
		
		public constructor(view) {
			super();
			this.m_routeView = view;
			
			this.init();
			this.setRoadInf();
		}
		
		//路紙參數均在此設定
		protected setRoadInf():void {
			
		}
		
		public onChangeLanguage():void{
			this.m_bigSmallSp.onChangeLanguage();
			this.m_oddEvenSp.onChangeLanguage();
//			m_tieSp.onChangeLanguage();				//和值無語系
//			m_beadSp.onChangeLanguage();			//珠仔無語系
		}
		public destroy():void {
			super.destroy();
			if( this.m_routeView ){
				this.m_routeView = null;
			}
			if( this.m_nowRoad ){
				this.m_nowRoad = null;
			}
			if( this.m_askBankerRoad ){
				this.m_askBankerRoad.destroy();
			}
			
			if( this.m_askPlayerRoad ){
				this.m_askPlayerRoad.destroy();
			}
			
			if( this.m_roadString ){
				this.m_roadString = null;
			}
			
			if( this.m_bigSmallSp ){
				this.m_bigSmallSp.destroy();
			}
			if( this.m_oddEvenSp ){
				this.m_oddEvenSp.destroy();
			}
			
			if( this.m_tieSp ){
				this.m_tieSp.destroy();
			}
			
			if( this.m_beadSp ){
				this.m_beadSp.destroy();
			}
			if( this.m_beadInfo ){
				this.m_beadInfo = null;
			}
			
		}
		
		protected init():void {

			this.m_routeView.mc_0.addChild(this.m_bigSmallSp);
			this.m_routeView.mc_0.addChild(this.m_oddEvenSp);
			this.m_routeView.mc_0.addChild(this.m_tieSp);
			this.m_routeView.mc_0.addChild(this.m_beadSp); 

			this.m_oddEvenSp.visible = false;
			this.m_bigSmallSp.visible = false;
			this.m_beadSp.visible = true;
			this.m_tieSp.visible = false;			
		}
		
		public changeRoad( type:string ):void {
			switch (type) {
				case SicRoadType.BIG_SMALL:
					this.m_oddEvenSp.visible = false;
					this.m_bigSmallSp.visible = true;
					this.m_beadSp.visible = false;
					this.m_tieSp.visible = false;
					break;
				
				case SicRoadType.ODD_EVEN:
					this.m_beadSp.visible = false;
					this.m_bigSmallSp.visible = false;
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
		get roadNum():number{
			if(this.m_nowRoad==null ||this.m_nowRoad==""){
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
		
		/** 更新路單 */
		public addRoad(road:string):void {
			//console.log("更新路單 : " + road);
//			if ( this.m_nowRoad.length > LIMITDATA ) {
//				this.m_nowRoad = this.m_nowRoad.substr( LIMITDATA - 1 , this.m_nowRoad.length );
//			}
		
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
			road = this.sortRoad(road);
			
			if (this.m_nowRoad==""){
				this.m_nowRoad +=road;
			}else{
				this.m_nowRoad += "."+road;
			}
			
			if ( this.m_nowRoad == "null" || this.m_nowRoad == null ) {
				this.m_nowRoad = '';
			}
			
			console.log("addRoad::" + this.m_nowRoad );
			
			this.updateRoadHandler();
			
		}
		
		/**
		 * 路紙排列
		 */
		protected sortRoad(road:string):string {
			var _ar:any[] = road.split('.');
			var _len:number= _ar.length;
			var _ar2:any[];
			for( var i:number= 0 ; i < _len; i++ ){
				_ar2 = _ar[i].split('');
				_ar2.sort(  );
				_ar[i] = _ar2.join('');
			}
			road = _ar.join('.');
			return road;
		}
		
		private showRoad(road:string, isAsk: boolean = false):void {
			//road="555.666.356.123.456.333.231.345.532.246.111.123.123.123.123.123.123.123.123.123.123.123.123.123.123"
			//臨時處理 ,避免服務端傳送 "000"錯誤,造成程式運行暫停
			if( road == "000" ){
				return;
			}
			//
			
			
			var roadString:string   
			var bigSmallAr:any[] 
			var oddEvenAr:any[];
			var tieAr:any[];
			var beadAr:any[];
			
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
		private showRoadViewInit():void {
			this.m_bigSmallSp.init();
			this.m_oddEvenSp.init();
			this.m_beadSp.init();
			this.m_tieSp.init();
		}
		
		
		protected cacheToBmp(isCache: boolean):void {
			this.m_bigSmallSp.cacheAsBitmap = isCache;
			this.m_oddEvenSp.cacheAsBitmap = isCache;
			this.m_beadSp.cacheAsBitmap = isCache;
			this.m_tieSp.cacheAsBitmap = isCache;
		}

		
	}
	
}
