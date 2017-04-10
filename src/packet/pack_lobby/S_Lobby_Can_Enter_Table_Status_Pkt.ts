module packet.pack_lobby {
	export class S_Lobby_Can_Enter_Table_Status_Pkt implements iface.IProtocolStruct{
		public Type				:	number;
		public SN				:	number;
		public TableOwnStatus	;
		
		public constructor() {
		}
		
		public initControler(controler):void
		{
		}
		
		public execute(oData):void
		{
			this.Type	=	oData.Type;
			this.SN		=	oData.SN;
			this.TableOwnStatus = new lobby.model.struct.PlayerTableOwnStatusStruct(oData.TableOwnStatus);
			
			var table ;
			table = manager.LobbyManager.getInstance().lobbyView.findTableByGT(define.GameDefine.BAC, this.TableOwnStatus.TableID);
			
			var quickTable ;
			quickTable = manager.LobbyManager.getInstance().lobbyView.findQuickTableByGT(define.GameDefine.BAC, this.TableOwnStatus.TableID);

			//还原赌桌状态
			switch(this.TableOwnStatus.Status){
				case 1:
					lobby.model.LobbyData.getInstance().addPlayerTableOwnStatusStruct(this.TableOwnStatus);
					if(table){
						table.tableLoginType.updateStatus();
					}
					if(quickTable){
						quickTable.updateStatus();
					}
					break;
				
				case 2:
					lobby.model.LobbyData.getInstance().removePlayerTableOwnStatusStruct(this.TableOwnStatus.TableID);
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