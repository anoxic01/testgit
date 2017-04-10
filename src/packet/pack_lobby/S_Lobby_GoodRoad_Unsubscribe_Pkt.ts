module packet.pack_lobby {
	export class S_Lobby_GoodRoad_Unsubscribe_Pkt implements iface.IProtocolStruct{
		public constructor() {
		}
		
		public initControler(controler):void
		{
		}
		
		public execute(oData):void
		{
			console.log("大厅移除好路")
//			LobbyData.getInstance().removeGoodRoadMap(oData.TableID);
			
//			LobbyManager.getInstance().sendUnsubscribe([oData.TableID]);
			
//			LobbyManager.getInstance().multiTabelView.unsubscribe(oData.TableID);
		}
	}
}