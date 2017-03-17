module packet.lobby {
	export class S_Lobby_GoodRoad_Pkt implements IProtocolStruct{
		public var Type				:	int;
		public var SN				:	int;
		public var GoodRoadMapInfo	:	GoodRoadStruct;
		
		public constructor() {
		}
		
		public function initControler(controler:GameControler):void
		{
		}
		
		public function execute(oData:Object):void
		{
//			oData.GameID;
//			oData.TableID;
//			oData.MatchList;	//好路类型
			Type	=	oData.Type;
			SN		=	oData.SN;
			GoodRoadMapInfo = new GoodRoadStruct(oData.GoodRoadMapInfo);
			
		//	trace("S_Lobby_GoodRoad_Pkt收到好路消息：",oData.Type, "SN",SN);
		//	return
			//需要判断是添加到好路数组还是将其删除
			//{"GoodRoadMapInfo":{"GameID":1,"TableID":85,"MatchList":[]},"SN":0}
			//MatchList如果等於null或陣列為空代表此桌沒有好路
			//Client收到此狀況，請呼叫取消訂閱此好路多桌
			if(GoodRoadMapInfo.MatchList==null || GoodRoadMapInfo.MatchList.length==0){
	//			trace("S_Lobby_GoodRoad_Pkt移除好路：",oData.GoodRoadMapInfo.TableID);
				LobbyData.getInstance().removeGoodRoadMap(GoodRoadMapInfo.TableID);
				//取消订阅,好路消息比游戏结算消息早，如果提前取消会导致结算消息
//				if(LobbyManager.getInstance().bLoginMultiTable){
//					LobbyManager.getInstance().sendUnsubscribe([GoodRoadMapInfo.TableID]);
//				}
			}else {
//				trace("S_Lobby_GoodRoad_Pkt加入好路：",oData.GoodRoadMapInfo.TableID);
				LobbyData.getInstance().addGoodRoadMap(GoodRoadMapInfo);
			}
			
		}
	}
}