module packet.lobby {
	export class S_Lobby_Can_Enter_Table_Status_Pkt implements IProtocolStruct{
		public var Type				:	int;
		public var SN				:	int;
		public var TableOwnStatus	:	PlayerTableOwnStatusStruct;
		
		public constructor() {
		}
		
		public function initControler(controler:GameControler):void
		{
		}
		
		public function execute(oData:Object):void
		{
			Type	=	oData.Type;
			SN		=	oData.SN;
			TableOwnStatus = new PlayerTableOwnStatusStruct(oData.TableOwnStatus);
			
			var table : Table;
			table = LobbyManager.getInstance().lobbyView.findTableByGT(GameDefine.BAC, TableOwnStatus.TableID);
			
			var quickTable : QuickTable;
			quickTable = LobbyManager.getInstance().lobbyView.findQuickTableByGT(GameDefine.BAC, TableOwnStatus.TableID);

			//还原赌桌状态
			switch(TableOwnStatus.Status){
				case 1:
					LobbyData.getInstance().addPlayerTableOwnStatusStruct(TableOwnStatus);
					if(table){
						table.tableLoginType.updateStatus();
					}
					if(quickTable){
						quickTable.updateStatus();
					}
					break;
				
				case 2:
					LobbyData.getInstance().removePlayerTableOwnStatusStruct(TableOwnStatus.TableID);
					if(table){
						table.tableLoginType.updateStatus();
					}
					if(quickTable){
						quickTable.updateStatus();
					}
					break;
			}
		}
	}
}