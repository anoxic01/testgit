module lobby.model.struct {
	export class BalanceStruct {
		public GCoin			:	number	=	0;					//游戏货币
		public BCoin			:	number	=	0;					//游戏货币
		public TotalCredit		:	number	=	0;					//信用额度
		public RemainingCredit	:	number	=	0;					//剩余额度
		public AvailableCredit	:	number	=	0;					//有效额度
		public GCoinNoChips		:	number	= 	0;					//可換金額(電投大廳用)
		public Chips			:	number	=	0;					//籌碼(電投大廳用)
		
		public constructor( oBalance =null ) {
			if (oBalance){
				this.GCoin 				= 	oBalance.GCoin;
				this.BCoin 				= 	oBalance.BCoin;
				this.TotalCredit 		= 	oBalance.TotalCredit;
				this.RemainingCredit	= 	oBalance.RemainingCredit;
				this.AvailableCredit	= 	oBalance.AvailableCredit;
				this.GCoinNoChips		=	oBalance.GCoinNoChips;
				this.Chips				=	oBalance.Chips;
			}
			
		}
	}
}