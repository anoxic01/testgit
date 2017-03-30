module lobby.model.game {
	export class WinInfoBase {
		 /// <summary>
        /// 座位號碼
        /// </summary>
        protected seatNo :number;

	    protected gCoinBet :number

        /// <summary>
        /// 信用押注
        /// </summary>
        //protected creditBet :number;
        protected totalBet :number;
	
	    protected totalWin :number;

        protected totalNetWin :number;
		public constructor() {
		}
		
		get SeatNo():number
		{
			return this.seatNo;
		}
		
		set  SeatNo(value:number) 
		{
			this.seatNo = value;
		}
		
		get GCoinBet():number 
		{
			return this.gCoinBet;
		}
		
		set  GCoinBet(value:number) 
		{
			this.gCoinBet = value;
		}
		
		/*get CreditBet():number 
		{
			return creditBet;
		}
		
		set  CreditBet(value:number) 
		{
			creditBet = value;
		}*/
		
		get TotalBet():number 
		{
			return this.totalBet;
		}
		
		set  TotalBet(value:number) 
		{
			this.totalBet = value;
		}
		
		get TotalWin():number 
		{
			return this.totalWin;
		}
		
		set  TotalWin(value:number) 
		{
			this.totalWin = value;
		}
		
		get TotalNetWin():number 
		{
			return this.totalNetWin;
		}
		
		set  TotalNetWin(value:number) 
		{
			this.totalNetWin = value;
		}
		
	
				
		
	}
}