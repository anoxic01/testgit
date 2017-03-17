module packet.lobby {
	export class S_Multi_Table_Exit_Pkt implements IProtocolStruct{
		public constructor() {
		}
		
		public function initControler(controler:GameControler):void
		{
		}
		
		public function execute(oData:Object):void
		{
			LobbyManager.getInstance().exitMultiTable();
		}
	}
}