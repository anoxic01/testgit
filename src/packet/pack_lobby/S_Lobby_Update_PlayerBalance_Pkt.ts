module packet.pack_lobby {
	export class S_Lobby_Update_PlayerBalance_Pkt implements iface.IProtocolStruct{
		public Type			:	number;
		public SN			:	number;
		
		public constructor() {
		}

		public initControler(controler):void
		{
			
		}
		
		public execute( oData ):void
		{
			console.log("更新桌子数据包序号：",oData.SN);

			this.Type	=	oData.Type;
			this.SN		=	oData.SN;
			
			if( oData && oData.PlayerBalance ){
				
				//Player.getInstance().AccountType			=	oData.PlayerBalance.AccountType;  //此值会为NULL
				console.log("账户变动-PlayerID",oData.PlayerBalance.PlayerID);
				lobby.model.Player.getInstance().updateBalance(oData.PlayerBalance);
				lobby.model.Player.getInstance().balance.GCoinNoChips 	=	oData.PlayerBalance.GCoinNoChips;
				lobby.model.Player.getInstance().balance.Chips 			=	oData.PlayerBalance.Chips;
				
				manager.LobbyManager.getInstance().updateCurrency();
				
			}
		}
	}
}