module packet.pack_lobby {
	export class S_CustomChip_Pkt implements iface.IProtocolStruct{
		public constructor() {
		}
		
		public initControler(controler):void
		{
			
		}
				
		public execute( _oData ):void
		{
			console.log(this,"自订筹码数据包序号："+_oData.SN);
			lobby.model.Player.getInstance().gameSetting.CustChips = _oData.PlayerCustChipsInfo.CustChips;
			
			manager.LobbyManager.getInstance().hidePanelChipCustom();
			manager.LobbyManager.getInstance().setCustomChip(lobby.model.Player.getInstance().gameSetting.aCustChips);
			if(manager.LobbyManager.getInstance().chipPanelGame){
				manager.LobbyManager.getInstance().chipPanelGame.goCustomPage();
			}
			if(manager.LobbyManager.getInstance().chipPanelLobby){
				manager.LobbyManager.getInstance().chipPanelLobby.goCustomPage();
			}
		}
	}
}