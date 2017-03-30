module packet.lobby {
	export class S_Lobby_Lobby_Info_Pkt implements IProtocolStruct{
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
		public DataInfo		:	*;
		
		public constructor() {
			ReqType = LobbyGetDataTypeStruct.TableRoadMaps;
		}

		
		public initControler(controler:GameControler):void
		{
		}
		
		public execute(oData:Object):void
		{
			Type	=	oData.Type;
			SN		=	oData.SN;
			if(oData && oData.DataInfo && oData.DataInfo.TableRoadMapList){
				//刷新路纸
				var _table : Table;
				var _quickTable : QuickTable;
				var _len : int = oData.DataInfo.TableRoadMapList.length;
				for (var i:number= 0; i < _len; i++) 
				{
					
					_table = LobbyManager.getInstance().lobbyView.findTableByTT(oData.DataInfo.TableRoadMapList[i].ThemeID, oData.DataInfo.TableRoadMapList[i].TableID);
					if(_table){
						_table.struct.RoadMaps = oData.DataInfo.TableRoadMapList[i].RoadMaps;
						_table.initRoad(_table.struct.RoadMaps);
					}
					
					_quickTable = LobbyManager.getInstance().lobbyView.findQuickTableByTT(oData.DataInfo.TableRoadMapList[i].ThemeID, oData.DataInfo.TableRoadMapList[i].TableID);
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