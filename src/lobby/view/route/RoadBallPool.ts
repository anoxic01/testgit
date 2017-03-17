module lobby.view.route {
	export class RoadBallPool implements ISprite {
		protected var _bigRoadPool		:	Pool;  //大陸
		protected var _bigEyeRoadPool	:	Pool; //大眼路
		protected var _smallEyeRoadPool	:	Pool; //小眼露
		protected var _cockroachRoadPool:	Pool; //小強路
		
		protected var _bigPool			:	Pool; //
		protected var _smallPool		:	Pool; //
		protected var _oddPool			:	Pool; //
		protected var _evenPool			:	Pool; //
		
		protected var _redPool			:	Pool; //
		protected var _blackPool		:	Pool; //
		protected var _zeroPool			:	Pool; //
		protected var _tiePool			:	Pool; //
		protected var _beadPool			:	Pool; //
		
		protected var _redBallPool		:	Pool;
		protected var _blueBallPool		:	Pool;
		protected var _greenBallPool	:	Pool;
		protected var _surroundPool		:	Pool;
		
		/**骰寶*/
		protected static var m_mcSicBead	:	MovieClip;				//珠仔
		protected static var m_mcSicSumBead	:	MovieClip;				//和值
		
		//百家
		public static const BIG_ROAD:String = "BIG_ROAD";
		public static const BIG_EYE_ROAD:String = "BIG_EYE_ROAD";
		public static const SMALL_EYE_ROAD:String = "SMALL_EYE_ROAD";
		public static const COCKROACH_ROAD:String = "COCKROACH_ROAD";
		public static const BEAD_PLATE:String = "BEAD_PLATE";  //珠盤路
		
	
		public static const BIG_MC_ROAD:String = "BIG_MC_ROAD";  
		public static const SMALL_MC_ROAD:String = "SMALL_MC_ROAD"; 
		public static const ODD_MC_ROAD:String = "ODD_MC_ROAD"; 
		public static const EVEN_MC_ROAD:String = "EVEN_MC_ROAD"; 
		public static const RED_MC_ROAD:String = "RED_MC_ROAD"; 
		
		public static const BLACK_MC_ROAD:String = "BLACK_MC_ROAD"; 
		public static const TIE_MC_ROAD:String = "TIE_MC_ROAD";
		public static const ZERO_MC_ROAD:String = "ZERO_MC_ROAD"; 
		
		
		public static const BEAD_MC_ROAD:String = "BEAD_MC_ROAD"; 
		public static const ROU_BEAD_ROAD:String = "ROU_BEAD_ROAD"; 
		public static const RED_BALL_MC_ROAD:String = "RED_BALL_MC_ROAD"; 
		public static const BLUE_BALL_MC_ROAD:String = "BLUE_BALL_MC_ROAD"; 
		public static const GREEN_BALL_MC_ROAD:String = "GREEN_BALL_MC_ROAD"; 
		
		public static const SURROUND_MC_ROAD:String = "SURROUND_MC_ROAD";
		
		////單雙
		//public static const ODD_EVEN_ODD_ROAD:String = "ROU_ODD_EVEN_ODD_ROAD";  //單雙路 單
		//public static const ODD_EVEN_EVEN_ROAD:String = "ROU_ODD_EVEN_EVEN_ROAD"; //單雙路 雙
		//public static const ODD_EVEN_ZERO_ROAD:String = "ROU_ODD_EVEN_ZERO_ROAD"; //單雙路  零
		//
		//
		////紅黑
		//public static const ROU_RED_BLACK_RED_ROAD:String = "ROU_RED_BLACK_RED_ROAD";  //紅黑 紅 
		//public static const ROU_RED_BLACK_BLACK_ROAD:String = "ROU_RED_BLACK_BLACK_ROAD"; //紅黑  黑
		//public static const ROU_RED_BLACK_ZERO_ROAD:String = "ROU_RED_BLACK_ZERO_ROAD";  //紅黑 零
		//
		////打列
		//public static const ROU_DOZEN_ROW_RED_ROAD:String = "ROU_DOZEN_ROW_RED_ROAD";
		//public static const ROU_DOZEN_ROW_BLUE_ROAD:String = "ROU_DOZEN_ROW_BLUE_ROAD";
		//public static const ROU_DOZEN_ROW_GREEN_ROAD:String = "ROU_DOZEN_ROW_GREEN_ROAD";
		//和值
		//public static const SIC_TIE_ROAD:String = "SIC_TIE_ROAD"; 
		////珠仔
		//public static const SIC_BEAD_ROAD:String = "SIC_BEAD_ROAD"; 
		
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
			m_mcSicBead 	= ResourceManager.getInstance().getInstanceByNameFromDomain(Define.SWF_ROAD_MAP,"linkSicBeadRoad");
			m_mcSicBead.stop();
			m_mcSicSumBead 	= ResourceManager.getInstance().getInstanceByNameFromDomain(Define.SWF_ROAD_MAP,"linkSicTieRoad");
			m_mcSicSumBead.stop();
		}
		
		public function destroy():void {
			
			if( this._bigRoadPool != null ) {
				this._bigRoadPool.destroy();
				_bigRoadPool = null;
			}
			
			if( this._bigEyeRoadPool != null ) {
				this._bigEyeRoadPool.destroy();
				_bigEyeRoadPool = null;
			}
			if( this._smallEyeRoadPool != null ) {
				this._smallEyeRoadPool.destroy();
				_smallEyeRoadPool = null;
			}
			if( this._cockroachRoadPool != null ) {
				this._cockroachRoadPool.destroy();
				_cockroachRoadPool = null;
			}

			if( this._bigPool != null ) {
				this._bigPool.destroy();
				_bigPool = null;
			}			
			if( this._smallPool != null ) {
				this._smallPool.destroy();
				_smallPool = null;
			}			
			if( this._oddPool != null ) {
				this._oddPool.destroy();
				_oddPool = null;
			}		
			
			if( this._evenPool != null ) {
				this._evenPool.destroy();
				_evenPool = null;
			}	
			if( this._redPool != null ) {
				this._redPool.destroy();
				_redPool = null;
			}		

			if( this._blackPool != null ) {
				this._blackPool.destroy();
				_blackPool = null;
			}	
			
			if( this._zeroPool != null ) {
				this._zeroPool.destroy();
				_zeroPool = null;
			}
			if( this._tiePool != null ) {
				this._tiePool.destroy();
				_tiePool = null;
			}	
			
			if( this._beadPool != null ) {
				this._beadPool.destroy();
				_beadPool = null;
			}		
			
			if( this._redBallPool != null ) {
				this._redBallPool.destroy();
				_redBallPool = null;
			}	

			if( this._blueBallPool != null ) {
				this._blueBallPool.destroy();
				_blueBallPool = null;
			}	
			if( this._greenBallPool != null ) {
				this._greenBallPool.destroy();
				_greenBallPool = null;
			}			
			if( this._surroundPool != null ) {
				this._surroundPool.destroy();
				_surroundPool = null;
			}	
			
		
			
		}
		
		/**
		 * 取的路紙元件
		 * @param	type
		 * @return
		 */
		public function getBall( type:String ):MovieClip {
			var mc:MovieClip;
			switch (type) 
			{
				case RoadBallPool.BIG_EYE_ROAD:
					mc = this._bigRoadPool.getObject( ResourceManager.getInstance().getClassByNameFromDomain(Define.SWF_ROAD_MAP,"lnkBigEye") );
				break;
				
				case RoadBallPool.BIG_ROAD:
					mc = this._bigRoadPool.getObject( ResourceManager.getInstance().getClassByNameFromDomain(Define.SWF_ROAD_MAP,"linkBigRoad") );
				break;
				
				case RoadBallPool.COCKROACH_ROAD:
					mc = this._bigRoadPool.getObject( ResourceManager.getInstance().getClassByNameFromDomain(Define.SWF_ROAD_MAP,"lnkCockroach") );
				break;
				
				case RoadBallPool.SMALL_EYE_ROAD:
					mc = this._bigRoadPool.getObject( ResourceManager.getInstance().getClassByNameFromDomain(Define.SWF_ROAD_MAP,"lnkSmallRoad") );
				break;
				
				
				
				case RoadBallPool.BIG_MC_ROAD:
					mc = this._bigPool.getObject( ResourceManager.getInstance().getClassByNameFromDomain(Define.SWF_ROAD_MAP,"linkBigMc") );
				break;
				
				case RoadBallPool.SMALL_MC_ROAD:
					mc = this._smallPool.getObject( ResourceManager.getInstance().getClassByNameFromDomain(Define.SWF_ROAD_MAP,"linkSmallMc") );
				break;
				
				case RoadBallPool.ODD_MC_ROAD:
					mc = this._oddPool.getObject( ResourceManager.getInstance().getClassByNameFromDomain(Define.SWF_ROAD_MAP,"linkOddMc") );
				break;
				case RoadBallPool.EVEN_MC_ROAD:
					mc = this._evenPool.getObject( ResourceManager.getInstance().getClassByNameFromDomain(Define.SWF_ROAD_MAP,"linkEvenMc") );
				break;
				
				case RoadBallPool.RED_MC_ROAD:
					mc = this._redPool.getObject( ResourceManager.getInstance().getClassByNameFromDomain(Define.SWF_ROAD_MAP,"linkRedMc") );
				break;				
				
				case RoadBallPool.BLACK_MC_ROAD:
					mc = this._blackPool.getObject( ResourceManager.getInstance().getClassByNameFromDomain(Define.SWF_ROAD_MAP,"linkBlackMc") );
				break;		
					
			
				case RoadBallPool.ROU_BEAD_ROAD: //轮盘珠仔
					mc = null;
					break;
				case RoadBallPool.RED_BALL_MC_ROAD: 
					mc = this._redBallPool.getObject( ResourceManager.getInstance().getClassByNameFromDomain(Define.SWF_ROAD_MAP,"linkBallRedMc") );
				break;		
				case RoadBallPool.BLUE_BALL_MC_ROAD:
					mc = this._blueBallPool.getObject( ResourceManager.getInstance().getClassByNameFromDomain(Define.SWF_ROAD_MAP,"linkBallBlueMc") );
				break;	
				case RoadBallPool.GREEN_BALL_MC_ROAD:
					mc = this._greenBallPool.getObject( ResourceManager.getInstance().getClassByNameFromDomain(Define.SWF_ROAD_MAP,"linkBallGreenMc") );
				break;		
				case RoadBallPool.ZERO_MC_ROAD: 
					mc = this._zeroPool.getObject( ResourceManager.getInstance().getClassByNameFromDomain(Define.SWF_ROAD_MAP,"linkZeroMc") );
				break;	
				
				case RoadBallPool.SURROUND_MC_ROAD:
					mc = this._surroundPool.getObject( ResourceManager.getInstance().getClassByNameFromDomain(Define.SWF_ROAD_MAP,"linkSurround") );
				break;
				
				default:
			}
			return mc;		
		}
		
		
		/*public function getBallBmp(type:String ):Bitmap{
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
		
		public function getRouBead(str:String):Bitmap {
			
			var bmd:BitmapData = BitmapManager.getInstance().getBmpdBeadRouNum(str);
			var bmp:Bitmap=new Bitmap(bmd,"auto",true);
			return bmp;
		}
		
		/**
		 * 獲得 骰寶珠仔組件
		 */		
		public function getSicBead( str:String ):Bitmap {
			m_mcSicBead.tf_0.text = str;
			m_mcSicBead.tf_0.autoSize = TextFieldAutoSize.LEFT;		
			
			var bmd:BitmapData = BitmapUtil.snapshot(m_mcSicBead);
			var bmp:Bitmap=new Bitmap(bmd,"auto",true);
			return bmp;
		}
		/**
		 * 獲得 骰寶和值組件
		 */
		public function getSicSumBead( str:String ):Bitmap {
			m_mcSicSumBead.tf_0.text = str;
			
			var bmd:BitmapData = BitmapUtil.snapshot(m_mcSicSumBead);
			var bmp:Bitmap=new Bitmap(bmd,"auto",true);
			return bmp;
		}
		
		/**
		 * 重製物件池
		 * @param	type
		 */
		public function resetPool( type:String):void {
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
		public function putBall( type:String , mc:MovieClip ):void {
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