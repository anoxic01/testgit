module lobby.model.struct {
	export class StaticsInfoSic extends StaticsInfoStruct{
		
		public var BigBetAmt 		:	Number;			//大押注金額
		public var BigBetCnt 		:	int;			//大押注次數
		public var BigWinCnt		:	int;			//大赢次数
		
		public var EvenBetCnt		:	int;
		public var EvenBetAmt		:	int;
		public var EvenWinCnt		:	int;			//赢率?
		
		public var OddBetAmt		:	int;
		public var OddBetCnt		:	int;
		public var OddWinCnt		:	int;			//?
		
		public var SmallBetAmt 		:	Number;			//小押注金額
		public var SmallBetCnt 		:	int;			//小押注次數
		public var SmallWinCnt		:	int;			//小赢次数
		
		public var TripleX24BetAmt	:	int;			//
		public var TripleX24BetCnt	:	int;			//
		public var TripleX24WinCnt	:	int;			//
		
		public var X12_X24BetAmt	:	int;
		public var X1BetAmt			:	int;
		public var X50_X150BetAmt	:	int;
		public var X5_X8BetAmt		:	int;
		public var X1_X3BetAmt		:	int;
		
		
		public constructor() {
			super();
		}
		
		/**
		 * 更新彩池
		 * @param	o
		 */
		override public function updateStatic( oData:Object ):void {
			
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
		
		override public function updateSum(oData:Object):void
		{
			this.setData( "BigWinCnt" , oData );
			this.setData( "EvenWinCnt" , oData );
			this.setData( "OddWinCnt" , oData );
			this.setData( "SmallWinCnt" , oData );
			super.updateSum(oData);
		}
		
		
	}
}