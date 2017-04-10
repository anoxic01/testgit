module packet.pack_lobby {
	export class S_Multi_Table_Exit_Pkt implements iface.IProtocolStruct{
		public constructor() {
		}
		
		public initControler(controler):void
		{
		}
		
		public execute(oData):void
		{
			manager.LobbyManager.getInstance().exitMultiTable();
		}
	}
}