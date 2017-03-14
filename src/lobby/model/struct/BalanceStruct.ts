module lobby.model.struct {
	export class BalanceStruct {
		public var GCoin			:	Number	=	0;					//游戏货币
		public var BCoin			:	Number	=	0;					//游戏货币
		public var TotalCredit		:	Number	=	0;					//信用额度
		public var RemainingCredit	:	Number	=	0;					//剩余额度
		public var AvailableCredit	:	Number	=	0;					//有效额度
		public var GCoinNoChips		:	Number	= 	0;					//可換金額(電投大廳用)
		public var Chips			:	Number	=	0;					//籌碼(電投大廳用)
		
		public constructor( oBalance:Object =null ) {
			if (oBalance){
				GCoin 				= 	oBalance.GCoin;
				BCoin 				= 	oBalance.BCoin;
				TotalCredit 		= 	oBalance.TotalCredit;
				RemainingCredit	= 	oBalance.RemainingCredit;
				AvailableCredit	= 	oBalance.AvailableCredit;
				GCoinNoChips		=	oBalance.GCoinNoChips;
				Chips				=	oBalance.Chips;
			}
			
		}
	}
}