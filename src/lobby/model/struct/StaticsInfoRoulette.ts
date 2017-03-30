module lobby.model.struct {
	export class StaticsInfoRoulette extends StaticsInfoStruct{
		public BigBetAmt 		:	Number;			//大押注金額
		public BigBetCnt 		:	number;			//大押注次數
		public BigWinCnt		:	number;			//大赢次数
		
		
		public EvenBetCnt		:	number;			//双押注次数
		public EvenBetAmt		:	number;			//双押注金额
		public EvenWinCnt		:	number;			//双赢次数
		
		public OddBetAmt		:	number;			//单押注金额
		public OddBetCnt		:	number;			//单押注次数
		public OddWinCnt		:	number;			//单赢次数
		
		public RedBetAmt		:	number;			//红押注金额
		public RedBetCnt		:	number;			//红押注次数
		public RedWinCnt		:	number;			//红赢次数
				
		public BlackBetAmt		:	number;			//黑押注金额
		public BlackBetCnt		:	number;			//黑押注次数
		public BlackWinCnt		:	number;			//黑赢次数
		
		public SmallBetAmt 		:	Number;			//小押注金額
		public SmallBetCnt 		:	number;			//小押注次數
		public SmallWinCnt		:	number;			//小赢次数
		
		public X17_X35BetAmt	:	number;			//区域下注金额
		public X2_X5BetAmt		:	number;			//区域下注金额
		public X8_X11BetAmt		:	number;			//区域下注金额
		
		public ZeroBetAmt		:	number;			//零押注金額
		public ZeroBetCnt		:	number;			//零押注次數
		public ZeroWinCnt		:	number;			//零赢次数
		
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
		
		 public updateSum(oData:Object):void
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