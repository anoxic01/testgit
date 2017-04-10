module packet.pack_lobby {
	export class S_Lobby_GoodRoad_Pkt implements iface.IProtocolStruct{
		public Type				:	number;
		public SN				:	number;
		public GoodRoadMapInfo	;
		
		public constructor() {
		}
		
		public initControler(controler):void
		{
		}
		
		public execute(oData):void
		{
//			oData.GameID;
//			oData.TableID;
//			oData.MatchList;	//好路类型
			this.Type	=	oData.Type;
			this.SN		=	oData.SN;
			this.GoodRoadMapInfo = new lobby.model.struct.GoodRoadStruct(oData.GoodRoadMapInfo);
			
		//	console.log("S_Lobby_GoodRoad_Pkt收到好路消息：",oData.Type, "SN",SN);
		//	return
			//需要判断是添加到好路数组还是将其删除
			//{"GoodRoadMapInfo":{"GameID":1,"TableID":85,"MatchList":[]},"SN":0}
			//MatchList如果等於null或陣列為空代表此桌沒有好路
			//Client收到此狀況，請呼叫取消訂閱此好路多桌
			if(this.GoodRoadMapInfo.MatchList==null || this.GoodRoadMapInfo.MatchList.length==0){
	//			console.log("S_Lobby_GoodRoad_Pkt移除好路：",oData.GoodRoadMapInfo.TableID);
				lobby.model.LobbyData.getInstance().removeGoodRoadMap(this.GoodRoadMapInfo.TableID);
				//取消订阅,好路消息比游戏结算消息早，如果提前取消会导致结算消息
//				if(LobbyManager.getInstance().bLoginMultiTable){
//					LobbyManager.getInstance().sendUnsubscribe([GoodRoadMapInfo.TableID]);
//				}
			}else {
//				console.log("S_Lobby_GoodRoad_Pkt加入好路：",oData.GoodRoadMapInfo.TableID);
				lobby.model.LobbyData.getInstance().addGoodRoadMap(this.GoodRoadMapInfo);
			}
			
		}
	}
}