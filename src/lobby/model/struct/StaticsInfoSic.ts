module lobby.model.struct {
	export class StaticsInfoSic extends StaticsInfoStruct{
		
		public BigBetAmt 		:	Number;			//大押注金額
		public BigBetCnt 		:	number;			//大押注次數
		public BigWinCnt		:	number;			//大赢次数
		
		public EvenBetCnt		:	number;
		public EvenBetAmt		:	number;
		public EvenWinCnt		:	number;			//赢率?
		
		public OddBetAmt		:	number;
		public OddBetCnt		:	number;
		public OddWinCnt		:	number;			//?
		
		public SmallBetAmt 		:	Number;			//小押注金額
		public SmallBetCnt 		:	number;			//小押注次數
		public SmallWinCnt		:	number;			//小赢次数
		
		public TripleX24BetAmt	:	number;			//
		public TripleX24BetCnt	:	number;			//
		public TripleX24WinCnt	:	number;			//
		
		public X12_X24BetAmt	:	number;
		public X1BetAmt			:	number;
		public X50_X150BetAmt	:	number;
		public X5_X8BetAmt		:	number;
		public X1_X3BetAmt		:	number;
		
		
		public constructor() {
			super();
		}
		
		/**
		 * 更新彩池
		 * @param	o
		 */
		 public updateStatic( oData:Object ):void {
			
			this.setData( "BigBetAmt" , oData );
			this.setData( "BigBetCnt" , oData );
			this.setData( "BigWinCnt" , oData );
			
			this.setData( "EvenBetCnt" , oData );
			this.setData( "EvenBetAmt" , oData );
			this.setData( "EvenWinCnt" , oData );
			
			this.setData( "OddBetAmt" , oData );
			this.setData( "OddBetCnt" , oData );
			this.setData( "OddWinCnt" , oData );
			
			this.setData( "SmallBetAmt" , oData );
			this.setData( "SmallBetCnt" , oData );
			this.setData( "SmallWinCnt" , oData );
			
			this.setData( "X12_X24BetAmt" , oData );
			this.setData( "X1BetAmt" , oData );
			this.setData( "X50_X150BetAmt" , oData );
			this.setData( "X5_X8BetAmt" , oData );
			
			
			this.setData( "TripleX24BetAmt" , oData );
			this.setData( "TripleX24BetCnt" , oData );
			this.setData( "TripleX24WinCnt" , oData );
			
			super.updateStatic(oData);
		}
		
		 public updateSum(oData:Object):void
		{
			this.setData( "BigWinCnt" , oData );
			this.setData( "EvenWinCnt" , oData );
			this.setData( "OddWinCnt" , oData );
			this.setData( "SmallWinCnt" , oData );
			super.updateSum(oData);
		}
		
		
	}
}