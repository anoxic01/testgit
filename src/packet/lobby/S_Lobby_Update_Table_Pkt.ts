module packet.lobby {
	export class S_Lobby_Update_Table_Pkt implements IProtocolStruct{
		public var Type			:	int;
		public var SN			:	int;
//		 private var tableList:Vector.<SimpleTable>;
		 
		public constructor() {
		}
		
		public function initControler(controler:GameControler):void
		{
			
		}
		
		public function execute( _oData:Object ):void
		{
			//trace("更新桌子数据包序号：",_oData.SN);
			Type	=	_oData.Type;
			SN		=	_oData.SN;
			var _iLen : int = _oData.TableList.length;
			var _tableStruct : TableStruct;
						
			for (var i:int = 0; i < _iLen; i++) 
			{
				
				_tableStruct = LobbyData.getInstance().lobbyInfo.findTableStructByTT(_oData.TableList[i].ThemeID, _oData.TableList[i].TableID);
				
				if(_tableStruct){
					//测试代码
//					if(_oData.TableList[i].TableID==37){
//						trace("S_Lobby_UpdateTable_Pkt 倒计时：",_oData.TableList[i].CountDownTime,"游戏状态:",_oData.TableList[i].GameStatus,"游戏局数",_oData.TableList[i].GameNo,"游戏靴数",_oData.TableList[i].ShoeNo,"RoadMaps:",_oData.TableList[i].RoadMaps,"LastRoadMap:",_oData.TableList[i].LastRoadMap);
//						trace("S_Lobby_UpdateTable_Pkt:>>",_oData.TableList[i].TableID+" ON:   "+_tableStruct.IsOffline, "roadMap:",_tableStruct.RoadMaps, "length:",_tableStruct.RoadMaps.length, "lastmap:",_tableStruct.LastRoadMap);
//					}
					var old:Boolean = _tableStruct.IsOffline;
					_tableStruct.update(_oData.TableList[i]);
					if (old==false && _tableStruct.IsOffline==true){
						LobbyManager.getInstance().offlineTable(_tableStruct);
					}
					
					/*
						关闭赌桌 ，服务器主动通知移除，不在此判断IsOffline
					if(LobbyManager.getInstance().exitLevel==Define.EXIT_GAME || LobbyManager.getInstance().exitLevel==Define.EXIT_MULTI_TABLE){
						if(_tableStruct.IsOffline){
							trace("S_Lobby_Update_Table_Pkt   赌桌关闭CLOSE    ----------------移除好路")
							LobbyData.getInstance().removeGoodRoadMap(_tableStruct.TableID);
						}
					}*/
				}
				
			}
			
			//trace(theme)
		}
		
	}
}