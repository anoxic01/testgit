module lobby.model.struct {
	export class StaticsInfoStruct {
		public var GameID			:	int;				//遊戲ID
		public var GameNo			:	int;
		public var GameStatus		:	String;
		
		public var OnlinePlayers	:	int;				//在線玩家
		
		public var ShoeNo			:	int;
		
		public var TableID			:	int;				//TableID
		public var TBName_CN		:	String;
		public var TBName_EN		:	String;
		public var TBName_TW		:	String;
		public var ThemeID			:	int;				//廳館ID
		
		public var TotalBet			:	Number=0;			//總押注額
		public var TotalBetCnt		:	Number=0;			//總押注數
		public var TotalWinCnt		:	Number=0;			//
		public var UpdateNow		:	Boolean = 	false;	//新增屬性
		public var Ret				:	Boolean;			//
		
		public constructor() {
		}
		
		/**
		 * 更新彩池
		 * @param	o
		 */
		public function updateStatic( oData:Object ):void {
			
			this.setData( "GameID" , oData );
			this.setData( "GameNo" , oData );
			this.setData( "GameStatus" , oData );
			
			this.setData( "OnlinePlayers" , oData );
			
			this.setData( "ShoeNo" , oData );
			
			this.setData( "TableID" , oData );
			if (oData.TBName_CN!=null &&oData.TBName_CN!=""){
				this.setData( "TBName_CN" , oData );
			}
			if (oData.TBName_TW!=null &&oData.TBName_TW!=""){
				this.setData( "TBName_TW" , oData );
			}
			if (oData.TBName_EN!=null &&oData.TBName_EN!=""){
				this.setData( "TBName_EN" , oData );
			}
			this.setData( "ThemeID" , oData );
			
			this.setData( "TotalBet" , oData );
			this.setData( "TotalBetCnt" , oData );
			this.setData( "TotalWinCnt" , oData );
		}
		
		/**更新统计数据  */
		public function updateSum(oData:Object):void{
			this.setData( "TotalWinCnt" , oData );
		}
		
		protected function setData(sKey:String , oData:Object ):void {
			try {
				//檢查傳來的資料是否有這個屬性
				if (oData[sKey] != undefined ) {
					this[sKey] = oData[sKey];
				}
				else {
					//loger.log 
				}	
			}catch (e:Error) {
				//loger.log 
			}

		}
		
		
		
		public function clear():void
		{
			
			OnlinePlayers=0	;				
			
			TotalBet		=0;			
			TotalBetCnt		=0;			
			TotalWinCnt		=0;			
			UpdateNow		= 	false;	
		}
	}
}