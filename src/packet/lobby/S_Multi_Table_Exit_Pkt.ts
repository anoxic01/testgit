module packet.lobby {
	export class S_Multi_Table_Exit_Pkt implements IProtocolStruct{
		public constructor() {
		}
		
		public initControler(controler:GameControler):void
		{
		}
		
		public execute(oData:Object):void
		{
			LobbyManager.getInstance().exitMultiTable();
		}
	}
}