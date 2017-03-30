module packet.lobby {
	export class S_Lobby_GoodRoad_Unsubscribe_Pkt implements IProtocolStruct{
		public constructor() {
		}
		
		public initControler(controler:GameControler):void
		{
		}
		
		public execute(oData:Object):void
		{
			console.log("大厅移除好路")
//			LobbyData.getInstance().removeGoodRoadMap(oData.TableID);
			
//			LobbyManager.getInstance().sendUnsubscribe([oData.TableID]);
			
//			LobbyManager.getInstance().multiTabelView.unsubscribe(oData.TableID);
		}
	}
}