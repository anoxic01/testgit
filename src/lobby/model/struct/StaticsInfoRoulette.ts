module lobby.model.struct {
	export class StaticsInfoRoulette extends StaticsInfoStruct{
		public var BigBetAmt 		:	Number;			//大押注金額
		public var BigBetCnt 		:	int;			//大押注次數
		public var BigWinCnt		:	int;			//大赢次数
		
		
		public var EvenBetCnt		:	int;			//双押注次数
		public var EvenBetAmt		:	int;			//双押注金额
		public var EvenWinCnt		:	int;			//双赢次数
		
		public var OddBetAmt		:	int;			//单押注金额
		public var OddBetCnt		:	int;			//单押注次数
		public var OddWinCnt		:	int;			//单赢次数
		
		public var RedBetAmt		:	int;			//红押注金额
		public var RedBetCnt		:	int;			//红押注次数
		public var RedWinCnt		:	int;			//红赢次数
				
		public var BlackBetAmt		:	int;			//黑押注金额
		public var BlackBetCnt		:	int;			//黑押注次数
		public var BlackWinCnt		:	int;			//黑赢次数
		
		public var SmallBetAmt 		:	Number;			//小押注金額
		public var SmallBetCnt 		:	int;			//小押注次數
		public var SmallWinCnt		:	int;			//小赢次数
		
		public var X17_X35BetAmt	:	int;			//区域下注金额
		public var X2_X5BetAmt		:	int;			//区域下注金额
		public var X8_X11BetAmt		:	int;			//区域下注金额
		
		public var ZeroBetAmt		:	int;			//零押注金額
		public var ZeroBetCnt		:	int;			//零押注次數
		public var ZeroWinCnt		:	int;			//零赢次数
		
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
			
			this.setData( "RedBetAmt" , oData );
			this.setData( "RedBetCnt" , oData );
			this.setData( "RedWinCnt" , oData );
			this.setData( "BlackBetAmt" , oData );
			this.setData( "BlackBetCnt" , oData );
			this.setData( "BlackWinCnt" , oData );
			this.setData( "ZeroBetAmt" , oData );
			this.setData( "ZeroBetCnt" , oData );
			this.setData( "ZeroWinCnt" , oData );
			
			
			this.setData( "X17_X35BetAmt" , oData );
			this.setData( "X2_X5BetAmt" , oData );
			this.setData( "X8_X11BetAmt" , oData );
			
			super.updateStatic(oData);
			
		}
		
		override public function updateSum(oData:Object):void
		{
			this.setData( "BigWinCnt" , oData );
			this.setData( "EvenWinCnt" , oData );
			this.setData( "OddWinCnt" , oData );
			this.setData( "SmallWinCnt" , oData );
			this.setData( "RedWinCnt" , oData );
			this.setData( "BlackWinCnt" , oData );
			super.updateSum(oData);
		}
		
		
		
	}
}