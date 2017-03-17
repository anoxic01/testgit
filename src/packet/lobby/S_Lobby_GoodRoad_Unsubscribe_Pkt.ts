module packet.lobby {
	export class S_Lobby_GoodRoad_Unsubscribe_Pkt implements IProtocolStruct{
		public constructor() {
		}
		
		public function initControler(controler:GameControler):void
		{
		}
		
		public function execute(oData:Object):void
		{
			trace("大厅移除好路")
//			LobbyData.getInstance().removeGoodRoadMap(oData.TableID);
			
//			LobbyManager.getInstance().sendUnsubscribe([oData.TableID]);
			
//			LobbyManager.getInstance().multiTabelView.unsubscribe(oData.TableID);
		}
	}
}