module lobby.model.struct {
	export class StaticsInfoDTF extends StaticsInfoStruct{
		
		public DragonBetAmt		:	number;					//下注金额
		public DragonBetCnt		:	Number	=	0;			//下注次数
		public DragonWinCnt		:	Number	=	0;			//开出数量
		
		public TieBetAmt		:	Number	=	0;			//和押注金額
		public TieBetCnt		:	number;					//和押注次數
		public TieWinCnt		:	Number	=	0;			//开出数量
		
		public TigerBetAmt 		:	number;					//下注金额
		public TigerBetCnt 		:	Number	=	0;			//下注次数
		public TigerWinCnt		:	number;					//开出数量
		
		public constructor() {
			super();
		}
		
		/**
		 * 更新彩池
		 * @param	o
		 */
		 public updateStatic( oData:Object ):void {
			this.setData( "DragonBetAmt" , oData );
			this.setData( "DragonBetCnt" , oData );
			this.setData( "DragonWinCnt" , oData );
			
			this.setData( "TieBetCnt" , oData );
			this.setData( "TieBetAmt" , oData );
			this.setData( "TieWinCnt" , oData );
			
			this.setData( "TigerBetAmt" , oData );
			this.setData( "TigerBetCnt" , oData );
			this.setData( "TigerWinCnt" , oData );
			
			super.updateStatic(oData);
		}
		
		 public updateSum(oData:Object):void
		{
			this.setData( "DragonWinCnt" , oData );
			this.setData( "TieWinCnt" , oData );
			this.setData( "TigerWinCnt" , oData );
			
			super.updateSum(oData);
		}
		
		
		
	}
}