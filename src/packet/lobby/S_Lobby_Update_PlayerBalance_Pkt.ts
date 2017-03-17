module packet.lobby {
	export class S_Lobby_Update_PlayerBalance_Pkt implements IProtocolStruct{
		public var Type			:	int;
		public var SN			:	int;
		
		public constructor() {
		}

		public function initControler(controler:GameControler):void
		{
			
		}
		
		public function execute( oData:Object ):void
		{
			trace("更新桌子数据包序号：",oData.SN);

			Type	=	oData.Type;
			SN		=	oData.SN;
			
			if( oData && oData.PlayerBalance ){
				
				//Player.getInstance().AccountType			=	oData.PlayerBalance.AccountType;  //此值会为NULL
				trace("账户变动-PlayerID",oData.PlayerBalance.PlayerID);
				Player.getInstance().updateBalance(oData.PlayerBalance);
				Player.getInstance().balance.GCoinNoChips 	=	oData.PlayerBalance.GCoinNoChips;
				Player.getInstance().balance.Chips 			=	oData.PlayerBalance.Chips;
				
				LobbyManager.getInstance().updateCurrency();
				
			}
		}
	}
}