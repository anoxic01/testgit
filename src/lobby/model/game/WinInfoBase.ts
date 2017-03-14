module lobby.model.game {
	export class WinInfoBase {
		 /// <summary>
        /// 座位號碼
        /// </summary>
        protected var seatNo :int;

	    protected var gCoinBet :Number

        /// <summary>
        /// 信用押注
        /// </summary>
        //protected var creditBet :Number;
        protected var totalBet :Number;
	
	    protected var totalWin :Number;

        protected var totalNetWin :Number;
		public constructor() {
		}
		
		public function get SeatNo():int 
		{
			return seatNo;
		}
		
		public function set SeatNo(value:int):void 
		{
			seatNo = value;
		}
		
		public function get GCoinBet():Number 
		{
			return gCoinBet;
		}
		
		public function set GCoinBet(value:Number):void 
		{
			gCoinBet = value;
		}
		
		/*public function get CreditBet():Number 
		{
			return creditBet;
		}
		
		public function set CreditBet(value:Number):void 
		{
			creditBet = value;
		}*/
		
		public function get TotalBet():Number 
		{
			return totalBet;
		}
		
		public function set TotalBet(value:Number):void 
		{
			totalBet = value;
		}
		
		public function get TotalWin():Number 
		{
			return totalWin;
		}
		
		public function set TotalWin(value:Number):void 
		{
			totalWin = value;
		}
		
		public function get TotalNetWin():Number 
		{
			return totalNetWin;
		}
		
		public function set TotalNetWin(value:Number):void 
		{
			totalNetWin = value;
		}
		
	
				
		
	}
}