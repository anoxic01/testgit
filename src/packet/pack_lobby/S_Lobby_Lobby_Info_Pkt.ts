module packet.pack_lobby {
	export class S_Lobby_Lobby_Info_Pkt implements iface.IProtocolStruct{
		public Type			:	number;
		public SN			:	number;
		
		/**
		 *	填入抓取資料的類型
		 *	0: 取得賭桌路紙恢復資料 
		 * 	类型为:enum LobbyGetDataType
		 */		
		public ReqType		:	number;		
		
		/**
		 *配合抓取資料的類型有不同的資料型態
		 0: class GetRoadmapRespInfo 
		 */		
		public DataInfo		;
		
		public constructor() {
			this.ReqType = lobby.model.struct.LobbyGetDataTypeStruct.TableRoadMaps;
		}

		
		public initControler(controler):void
		{
		}
		
		public execute(oData):void
		{
			this.Type	=	oData.Type;
			this.SN		=	oData.SN;
			if(oData && oData.DataInfo && oData.DataInfo.TableRoadMapList){
				//刷新路纸
				var _table ;
				var _quickTable ;
				var _len  = oData.DataInfo.TableRoadMapList.length;
				for (var i:number= 0; i < _len; i++) 
				{
					
					_table = manager.LobbyManager.getInstance().lobbyView.findTableByTT(oData.DataInfo.TableRoadMapList[i].ThemeID, oData.DataInfo.TableRoadMapList[i].TableID);
					if(_table){
						_table.struct.RoadMaps = oData.DataInfo.TableRoadMapList[i].RoadMaps;
						_table.initRoad(_table.struct.RoadMaps);
					}
					
					_quickTable = manager.LobbyManager.getInstance().lobbyView.findQuickTableByTT(oData.DataInfo.TableRoadMapList[i].ThemeID, oData.DataInfo.TableRoadMapList[i].TableID);
					if(_quickTable){
						_quickTable.struct.RoadMaps = oData.DataInfo.TableRoadMapList[i].RoadMaps;
						_quickTable.initRoad(_quickTable.struct.RoadMaps);
					}
				}
				
				if(_table){
					_table = null;
				}
				
				if(_quickTable){
					_quickTable = null;
				}
			}
		}
	}
}