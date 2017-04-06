module lobby.view.route {
	export class RoadBallPool implements iface.ISprite {
		protected _bigRoadPool		:	Pool;  //大陸
		protected _bigEyeRoadPool	:	Pool; //大眼路
		protected _smallEyeRoadPool	:	Pool; //小眼露
		protected _cockroachRoadPool:	Pool; //小強路
		
		protected _bigPool			:	Pool; //
		protected _smallPool		:	Pool; //
		protected _oddPool			:	Pool; //
		protected _evenPool			:	Pool; //
		
		protected _redPool			:	Pool; //
		protected _blackPool		:	Pool; //
		protected _zeroPool			:	Pool; //
		protected _tiePool			:	Pool; //
		protected _beadPool			:	Pool; //
		
		protected _redBallPool		:	Pool;
		protected _blueBallPool		:	Pool;
		protected _greenBallPool	:	Pool;
		protected _surroundPool		:	Pool;
		
		/**骰寶*/
		protected static m_mcSicBead	;				//珠仔
		protected static m_mcSicSumBead	;				//和值
		
		//百家
		public static BIG_ROAD:string = "BIG_ROAD";
		public static BIG_EYE_ROAD:string = "BIG_EYE_ROAD";
		public static SMALL_EYE_ROAD:string = "SMALL_EYE_ROAD";
		public static COCKROACH_ROAD:string = "COCKROACH_ROAD";
		public static BEAD_PLATE:string = "BEAD_PLATE";  //珠盤路
		
	
		public static BIG_MC_ROAD:string = "BIG_MC_ROAD";  
		public static SMALL_MC_ROAD:string = "SMALL_MC_ROAD"; 
		public static ODD_MC_ROAD:string = "ODD_MC_ROAD"; 
		public static EVEN_MC_ROAD:string = "EVEN_MC_ROAD"; 
		public static RED_MC_ROAD:string = "RED_MC_ROAD"; 
		
		public static BLACK_MC_ROAD:string = "BLACK_MC_ROAD"; 
		public static TIE_MC_ROAD:string = "TIE_MC_ROAD";
		public static ZERO_MC_ROAD:string = "ZERO_MC_ROAD"; 
		
		
		public static BEAD_MC_ROAD:string = "BEAD_MC_ROAD"; 
		public static ROU_BEAD_ROAD:string = "ROU_BEAD_ROAD"; 
		public static RED_BALL_MC_ROAD:string = "RED_BALL_MC_ROAD"; 
		public static BLUE_BALL_MC_ROAD:string = "BLUE_BALL_MC_ROAD"; 
		public static GREEN_BALL_MC_ROAD:string = "GREEN_BALL_MC_ROAD"; 
		
		public static SURROUND_MC_ROAD:string = "SURROUND_MC_ROAD";
		
		////單雙
		//public static ODD_EVEN_ODD_ROAD:string = "ROU_ODD_EVEN_ODD_ROAD";  //單雙路 單
		//public static ODD_EVEN_EVEN_ROAD:string = "ROU_ODD_EVEN_EVEN_ROAD"; //單雙路 雙
		//public static ODD_EVEN_ZERO_ROAD:string = "ROU_ODD_EVEN_ZERO_ROAD"; //單雙路  零
		//
		//
		////紅黑
		//public static ROU_RED_BLACK_RED_ROAD:string = "ROU_RED_BLACK_RED_ROAD";  //紅黑 紅 
		//public static ROU_RED_BLACK_BLACK_ROAD:string = "ROU_RED_BLACK_BLACK_ROAD"; //紅黑  黑
		//public static ROU_RED_BLACK_ZERO_ROAD:string = "ROU_RED_BLACK_ZERO_ROAD";  //紅黑 零
		//
		////打列
		//public static ROU_DOZEN_ROW_RED_ROAD:string = "ROU_DOZEN_ROW_RED_ROAD";
		//public static ROU_DOZEN_ROW_BLUE_ROAD:string = "ROU_DOZEN_ROW_BLUE_ROAD";
		//public static ROU_DOZEN_ROW_GREEN_ROAD:string = "ROU_DOZEN_ROW_GREEN_ROAD";
		//和值
		//public static SIC_TIE_ROAD:string = "SIC_TIE_ROAD"; 
		////珠仔
		//public static SIC_BEAD_ROAD:string = "SIC_BEAD_ROAD"; 
		
		public constructor() {
		this._bigRoadPool = new Pool();
			this._bigEyeRoadPool = new Pool();
			this._smallEyeRoadPool = new Pool();
			this._cockroachRoadPool = new Pool();
			
			this._bigPool = new Pool();
			this._smallPool = new Pool();
			this._oddPool = new Pool();
			this._evenPool = new Pool();

			this._redPool = new Pool();
			this._blackPool = new Pool();
			this._zeroPool = new Pool();
			this._tiePool = new Pool();			
			this._beadPool = new Pool();
			
			this._redBallPool = new Pool();			
			this._blueBallPool = new Pool();			
			this._greenBallPool = new Pool();	
			
			this._surroundPool = new Pool();
			RoadBallPool.m_mcSicBead 	= manager.ResourceManager.getInstance().getInstanceByNameFromDomain(define.Define.SWF_ROAD_MAP,"linkSicBeadRoad");
			RoadBallPool.m_mcSicBead.stop();
			RoadBallPool.m_mcSicSumBead 	= manager.ResourceManager.getInstance().getInstanceByNameFromDomain(define.Define.SWF_ROAD_MAP,"linkSicTieRoad");
			RoadBallPool.m_mcSicSumBead.stop();
		}
		
		public destroy():void {
			
			if( this._bigRoadPool != null ) {
				this._bigRoadPool.destroy();
				this._bigRoadPool = null;
			}
			
			if( this._bigEyeRoadPool != null ) {
				this._bigEyeRoadPool.destroy();
				this._bigEyeRoadPool = null;
			}
			if( this._smallEyeRoadPool != null ) {
				this._smallEyeRoadPool.destroy();
				this._smallEyeRoadPool = null;
			}
			if( this._cockroachRoadPool != null ) {
				this._cockroachRoadPool.destroy();
				this._cockroachRoadPool = null;
			}

			if( this._bigPool != null ) {
				this._bigPool.destroy();
				this._bigPool = null;
			}			
			if( this._smallPool != null ) {
				this._smallPool.destroy();
				this._smallPool = null;
			}			
			if( this._oddPool != null ) {
				this._oddPool.destroy();
				this._oddPool = null;
			}		
			
			if( this._evenPool != null ) {
				this._evenPool.destroy();
				this._evenPool = null;
			}	
			if( this._redPool != null ) {
				this._redPool.destroy();
				this._redPool = null;
			}		

			if( this._blackPool != null ) {
				this._blackPool.destroy();
				this._blackPool = null;
			}	
			
			if( this._zeroPool != null ) {
				this._zeroPool.destroy();
				this._zeroPool = null;
			}
			if( this._tiePool != null ) {
				this._tiePool.destroy();
				this._tiePool = null;
			}	
			
			if( this._beadPool != null ) {
				this._beadPool.destroy();
				this._beadPool = null;
			}		
			
			if( this._redBallPool != null ) {
				this._redBallPool.destroy();
				this._redBallPool = null;
			}	

			if( this._blueBallPool != null ) {
				this._blueBallPool.destroy();
				this._blueBallPool = null;
			}	
			if( this._greenBallPool != null ) {
				this._greenBallPool.destroy();
				this._greenBallPool = null;
			}			
			if( this._surroundPool != null ) {
				this._surroundPool.destroy();
				this._surroundPool = null;
			}	
			
		
			
		}
		
		/**
		 * 取的路紙元件
		 * @param	type
		 * @return
		 */
		public getBall( type:string ):egret.MovieClip {
			var mc;
			switch (type) 
			{
				case RoadBallPool.BIG_EYE_ROAD:
					mc = this._bigRoadPool.getObject( manager.ResourceManager.getInstance().getClassByNameFromDomain(define.Define.SWF_ROAD_MAP,"lnkBigEye") );
				break;
				
				case RoadBallPool.BIG_ROAD:
					mc = this._bigRoadPool.getObject( manager.ResourceManager.getInstance().getClassByNameFromDomain(define.Define.SWF_ROAD_MAP,"linkBigRoad") );
				break;
				
				case RoadBallPool.COCKROACH_ROAD:
					mc = this._bigRoadPool.getObject( manager.ResourceManager.getInstance().getClassByNameFromDomain(define.Define.SWF_ROAD_MAP,"lnkCockroach") );
				break;
				
				case RoadBallPool.SMALL_EYE_ROAD:
					mc = this._bigRoadPool.getObject( manager.ResourceManager.getInstance().getClassByNameFromDomain(define.Define.SWF_ROAD_MAP,"lnkSmallRoad") );
				break;
				
				
				
				case RoadBallPool.BIG_MC_ROAD:
					mc = this._bigPool.getObject( manager.ResourceManager.getInstance().getClassByNameFromDomain(define.Define.SWF_ROAD_MAP,"linkBigMc") );
				break;
				
				case RoadBallPool.SMALL_MC_ROAD:
					mc = this._smallPool.getObject( manager.ResourceManager.getInstance().getClassByNameFromDomain(define.Define.SWF_ROAD_MAP,"linkSmallMc") );
				break;
				
				case RoadBallPool.ODD_MC_ROAD:
					mc = this._oddPool.getObject( manager.ResourceManager.getInstance().getClassByNameFromDomain(define.Define.SWF_ROAD_MAP,"linkOddMc") );
				break;
				case RoadBallPool.EVEN_MC_ROAD:
					mc = this._evenPool.getObject( manager.ResourceManager.getInstance().getClassByNameFromDomain(define.Define.SWF_ROAD_MAP,"linkEvenMc") );
				break;
				
				case RoadBallPool.RED_MC_ROAD:
					mc = this._redPool.getObject( manager.ResourceManager.getInstance().getClassByNameFromDomain(define.Define.SWF_ROAD_MAP,"linkRedMc") );
				break;				
				
				case RoadBallPool.BLACK_MC_ROAD:
					mc = this._blackPool.getObject( manager.ResourceManager.getInstance().getClassByNameFromDomain(define.Define.SWF_ROAD_MAP,"linkBlackMc") );
				break;		
					
			
				case RoadBallPool.ROU_BEAD_ROAD: //轮盘珠仔
					mc = null;
					break;
				case RoadBallPool.RED_BALL_MC_ROAD: 
					mc = this._redBallPool.getObject( manager.ResourceManager.getInstance().getClassByNameFromDomain(define.Define.SWF_ROAD_MAP,"linkBallRedMc") );
				break;		
				case RoadBallPool.BLUE_BALL_MC_ROAD:
					mc = this._blueBallPool.getObject( manager.ResourceManager.getInstance().getClassByNameFromDomain(define.Define.SWF_ROAD_MAP,"linkBallBlueMc") );
				break;	
				case RoadBallPool.GREEN_BALL_MC_ROAD:
					mc = this._greenBallPool.getObject( manager.ResourceManager.getInstance().getClassByNameFromDomain(define.Define.SWF_ROAD_MAP,"linkBallGreenMc") );
				break;		
				case RoadBallPool.ZERO_MC_ROAD: 
					mc = this._zeroPool.getObject( manager.ResourceManager.getInstance().getClassByNameFromDomain(define.Define.SWF_ROAD_MAP,"linkZeroMc") );
				break;	
				
				case RoadBallPool.SURROUND_MC_ROAD:
					mc = this._surroundPool.getObject( manager.ResourceManager.getInstance().getClassByNameFromDomain(define.Define.SWF_ROAD_MAP,"linkSurround") );
				break;
				
				default:
			}
			return mc;		
		}
		
		
		/*public getBallBmp(type:string ):Bitmap{
			var bmp:Bitmap ;
			var bmd:BitmapData;
			switch (type) 
			{
				case RoadBallPool.RED_BALL_MC_ROAD: 
					bmd = this._redBallPool.getObject( linkBallRedMc );
					break;		
				case RoadBallPool.BLUE_BALL_MC_ROAD:
					bmd = this._blueBallPool.getObject( linkBallBlueMc );
					break;	
				case RoadBallPool.GREEN_BALL_MC_ROAD:
					bmd = this._greenBallPool.getObject( linkBallGreenMc );
					break;		
			}
			bmp = new Bitmap(bmd);
			return bmp;
			
		}*/
		
		public getRouBead(str:string):egret.Bitmap {
			
			var bmd = manager.BitmapManager.getInstance().getBmpdBeadRouNum(str);
			var bmp = new egret.Bitmap(bmd);
			return bmp;
		}
		
		/**
		 * 獲得 骰寶珠仔組件
		 */		
		public getSicBead( str:string ):egret.Bitmap {
			RoadBallPool.m_mcSicBead.tf_0.text = str;
			// RoadBallPool.m_mcSicBead.tf_0.autoSize = TextFieldAutoSize.LEFT;		
			
			var bmd = util.bitmap.BitmapUtil.snapshot(RoadBallPool.m_mcSicBead);
			var bmp=new egret.Bitmap(bmd);
			return bmp;
		}
		/**
		 * 獲得 骰寶和值組件
		 */
		public getSicSumBead( str:string ):egret.Bitmap {
			RoadBallPool.m_mcSicSumBead.tf_0.text = str;
			
			var bmd = util.bitmap.BitmapUtil.snapshot(RoadBallPool.m_mcSicSumBead);
			var bmp=new egret.Bitmap(bmd);
			return bmp;
		}
		
		/**
		 * 重製物件池
		 * @param	type
		 */
		public resetPool( type:string):void {
			switch (type) 
			{
				case RoadBallPool.BIG_EYE_ROAD:
					this._bigRoadPool.allPutPool( );
				break;
				
				case RoadBallPool.BIG_ROAD:
					this._bigRoadPool.allPutPool( );
				break;
				
				case RoadBallPool.COCKROACH_ROAD:
					this._bigRoadPool.allPutPool( );
				break;
				
				case RoadBallPool.SMALL_EYE_ROAD:
					this._bigRoadPool.allPutPool( );
				break;
				
				
				case RoadBallPool.BIG_MC_ROAD:
					this._bigPool.allPutPool();
				break;
				
				case RoadBallPool.SMALL_MC_ROAD:
					this._smallPool.allPutPool( );
				break;
				
				case RoadBallPool.ODD_MC_ROAD:
					this._oddPool.allPutPool(  );
				break;
				case RoadBallPool.EVEN_MC_ROAD:
					this._evenPool.allPutPool(  );
				break;
				
				case RoadBallPool.RED_MC_ROAD:
					this._redPool.allPutPool(  );
				break;				
				
				case RoadBallPool.BLACK_MC_ROAD:
					this._blackPool.allPutPool(  );
				break;		
					
				
				case RoadBallPool.RED_BALL_MC_ROAD: 
					this._redBallPool.allPutPool( );
				break;		
				case RoadBallPool.BLUE_BALL_MC_ROAD:
					this._blueBallPool.allPutPool( );
				break;	
				case RoadBallPool.GREEN_BALL_MC_ROAD:
					this._greenBallPool.allPutPool( );
				break;		
				case RoadBallPool.ZERO_MC_ROAD: 
					this._zeroPool.allPutPool(  );
				break;	
						
				case RoadBallPool.SURROUND_MC_ROAD:
					this._surroundPool.allPutPool( );
				break;				
				default:
			}
		}
		
		/**
		 * 放回物件池
		 */
		public putBall( type:string , mc ):void {
			switch (type) {
				case RoadBallPool.BIG_EYE_ROAD:
					this._bigRoadPool.putObject( mc );
				break;
				
				case RoadBallPool.BIG_ROAD:
					this._bigRoadPool.putObject( mc );
				break;
				
				case RoadBallPool.COCKROACH_ROAD:
					this._bigRoadPool.putObject( mc );
				break;
				
				case RoadBallPool.SMALL_EYE_ROAD:
					this._bigRoadPool.putObject( mc );
				break;
				
				
				case RoadBallPool.BIG_MC_ROAD:
					this._bigPool.putObject(mc);
				break;
				
				case RoadBallPool.SMALL_MC_ROAD:
					this._smallPool.putObject( mc );
				break;
				
				case RoadBallPool.ODD_MC_ROAD:
					this._oddPool.putObject( mc );
				break;
				case RoadBallPool.EVEN_MC_ROAD:
					this._evenPool.putObject( mc );
				break;
				
				case RoadBallPool.RED_MC_ROAD:
					this._redPool.putObject( mc );
				break;				
				
				case RoadBallPool.BLACK_MC_ROAD:
					this._blackPool.putObject( mc );
				break;		
					
				case RoadBallPool.RED_BALL_MC_ROAD: 
					this._redBallPool.putObject(mc );
				break;		
				case RoadBallPool.BLUE_BALL_MC_ROAD:
					this._blueBallPool.putObject( mc);
				break;	
				case RoadBallPool.GREEN_BALL_MC_ROAD:
					this._greenBallPool.putObject( mc);
				break;		
				case RoadBallPool.ZERO_MC_ROAD: 
					this._zeroPool.putObject( mc );
				break;	
									
				case RoadBallPool.SURROUND_MC_ROAD:
					this._surroundPool.putObject(mc );
				break;				
				default:
			}
			
			
		}
		
		
	
		
		
	
	}

}