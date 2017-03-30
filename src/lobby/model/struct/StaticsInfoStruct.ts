module lobby.model.struct {
	export class StaticsInfoStruct {
		public GameID			:	number;				//遊戲ID
		public GameNo			:	number;
		public GameStatus		:	String;
		
		public OnlinePlayers	:	number;				//在線玩家
		
		public ShoeNo			:	number;
		
		public TableID			:	number;				//TableID
		public TBName_CN		:	String;
		public TBName_EN		:	String;
		public TBName_TW		:	String;
		public ThemeID			:	number;				//廳館ID
		
		public TotalBet			:	Number=0;			//總押注額
		public TotalBetCnt		:	Number=0;			//總押注數
		public TotalWinCnt		:	Number=0;			//
		public UpdateNow		:	 boolean = 	false;	//新增屬性
		public Ret				:	 boolean;			//
		
		public constructor() {
		}
		
		/**
		 * 更新彩池
		 * @param	o
		 */
		public updateStatic( oData ):void {
			
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
		public updateSum(oData):void{
			this.setData( "TotalWinCnt" , oData );
		}
		
		protected setData(sKey:string , oData ):void {
			try {
				//檢查傳來的資料是否有這個屬性
				if (oData[sKey] != undefined ) {
					this[sKey] = oData[sKey];
				}
				else {
					//loger.log 
				}	
			}catch (e) {
				//loger.log 
			}

		}
		
		
		
		public clear():void
		{
			
			this.OnlinePlayers=0	;				
			
			this.TotalBet		=0;			
			this.TotalBetCnt		=0;			
			this.TotalWinCnt		=0;			
			this.UpdateNow		= 	false;	
		}
	}
}