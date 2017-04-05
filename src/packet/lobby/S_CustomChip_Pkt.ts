module packet.lobby {
	export class S_CustomChip_Pkt implements IProtocolStruct{
		public constructor() {
		}
		
		public initControler(controler:GameControler):void
		{
			
		}
				
		public execute( _oData:Object ):void
		{
			console.log(this,"自订筹码数据包序号："+_oData.SN);
			Player.getInstance().gameSetting.CustChips = _oData.PlayerCustChipsInfo.CustChips;
			
			LobbyManager.getInstance().hidePanelChipCustom();
			LobbyManager.getInstance().setCustomChip(Player.getInstance().gameSetting.aCustChips);
			if(LobbyManager.getInstance().chipPanelGame){
				LobbyManager.getInstance().chipPanelGame.goCustomPage();
			}
			if(LobbyManager.getInstance().chipPanelLobby){
				LobbyManager.getInstance().chipPanelLobby.goCustomPage();
			}
		}
	}
}