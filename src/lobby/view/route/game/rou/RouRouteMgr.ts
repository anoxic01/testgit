module lobby.view.route.game.rou {
	export class RouRouteMgr extends BSprite{
		public m_routeView			;
		
		private _isBtnOpen			:	 boolean 			= 	false;
		
		private _islock				:	 boolean 			= 	true;
		private _isUp				:	 boolean 			= 	false;
		
		/**當前顯示路*/
		private _nowRoad			:	string 				= 	"";
		
		
		//private _beadPlate:BeadPlate;
		protected _roadString		:	RoadStringObject	= 	new RoadStringObject;
		protected _beadSp			:	RouRoadCanvas 		= 	new RouRoadCanvas();
		protected _bigSmallSp		:	RouRoadCanvas 		= 	new RouRoadCanvas;
		protected _oddEvenSp		:	RouRoadCanvas 		= 	new RouRoadCanvas;
		protected _redBlackSp		:	RouRoadCanvas 		= 	new RouRoadCanvas;
		protected _dozenRowSp		:	RouRoadCanvas 		= 	new RouRoadCanvas;
		
		public m_beadInfo			:	BeadInfo;
		private LIMITDATA		 = 372;
		
		
		public bError				:	 boolean;														//错误状态
		

		public constructor(view) {
			super();

			this.m_routeView = view.getChildByName("mc_0") ;
			//this._beadPlate = new BeadPlate(this._routeView.rouRoad); //珠路盤
			this.init();
			//路紙參數均在此設定
			this.m_beadInfo = new BeadInfo();
			
			this.setRoadInf();
			
		}
		
		protected init():void 
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
			
			
			//this._beadPlate.touchChildren = this._beadPlate.touchEnabled = false;
//			this._routeView.bigSmall.touchChildren = this._routeView.bigSmall.touchEnabled = false;
//			this._routeView.oddEven.touchChildren = this._routeView.oddEven.touchEnabled = false;
//			this._routeView.dozenRow.touchChildren = this._routeView.dozenRow.touchEnabled = false;
//			this._routeView.redBlack.touchChildren = this._routeView.redBlack.touchEnabled = false;	
			
			this._dozenRowSp.visible = false;
			//this._routeView.zoenRowRoadBg.visible = true;
			this._bigSmallSp.visible = false;
			this._oddEvenSp.visible = false;
			this._redBlackSp.visible = true;		
			//this._beadSp.visible = false;
		}
		
		 public destroy():void {
			this._beadSp.destroy();
			this._bigSmallSp.destroy();
			this._oddEvenSp.destroy();
			this._redBlackSp.destroy();
			this._dozenRowSp.destroy();
			
		}
		
		 public onChangeLanguage():void{
			this._bigSmallSp.onChangeLanguage();
			this._oddEvenSp.onChangeLanguage();
			this._redBlackSp.onChangeLanguage();
			this._dozenRowSp.onChangeLanguage();
			
			
		}
		
		protected setRoadInf():void{
			
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
			
			var _colNum:number=19
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
		
		public setHead():void{
			
		}
		
		
		public changeRoad( type:string ):void {
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
			//console.log("更新路單 : " + road);
			//road+="2.3.4.5.6.7.8.9.0.1.2.7.15.16.19.17.36"
//			if ( this._nowRoad.length > LIMITDATA ) {
//				this._nowRoad = this._nowRoad.substr( LIMITDATA - 1 , this._nowRoad.length );
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
			
			if (this._nowRoad==""){
				this._nowRoad +=road;
			}else{
				this._nowRoad += "."+road;
			}
			if ( this._nowRoad == "null" || this._nowRoad == null ) {
				this._nowRoad = '';
			}				
			//console.log("addRouRoad::" + this._nowRoad );
			//this._nowRoad = road;
			if ( ( this._nowRoad != "null" ) && (this._nowRoad != null) )  {
				this.showRoadViewInit();
				this.showRoad( this._nowRoad);
			}
		}
		
		private showRoad(road:string, isAsk: boolean = false):void {
			//this.showRoadViewInit();
			var roadString:string   
			var bigSmallAr:any[] 
			var oddEvenAr:any[];
			var redBlackAr:any[];
			var zoenRowAr:any[];
			var beadAr:any[];
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
		private showRoadViewInit():void {
			//this._beadPlate.init();
			this._bigSmallSp.init();
			this._oddEvenSp.init();
			this._redBlackSp.init();
			this._dozenRowSp.init();
			this._beadSp.init();
		}
		
		
		private cacheToBmp(isCache: boolean):void {
			this._bigSmallSp.cacheAsBitmap = isCache;
			this._oddEvenSp.cacheAsBitmap = isCache;
			this._redBlackSp.cacheAsBitmap = isCache;
			this._dozenRowSp.cacheAsBitmap = isCache;
			this._beadSp.cacheAsBitmap = isCache;
		}
		
		public disable():void {
			this._isBtnOpen = false;
			this._isUp = false;
			//this.DelMainEvent();
			//this.addMainEvent();
		}
		
		public enable():void {
			this._isBtnOpen = true;
			this._isUp = true;
			//this.DelMainEvent();
			//this.addMainEvent();
		}
		
	
	}
}