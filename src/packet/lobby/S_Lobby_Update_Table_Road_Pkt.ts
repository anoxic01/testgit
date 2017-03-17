module packet.lobby {
	export class S_Lobby_Update_Table_Road_Pkt implements IProtocolStruct{
		public var Type		:	int;
		public var TableID	:	int;
		public var GameID	:	int;
		public var ShoeNo	:	int;			//靴號,非當前靴號不處理
		public var GameNo	:	int;
		public var RoadMaps	:	String;			//當前靴當下所有的路紙
		
		public constructor() {
		}
		
		public function initControler(controler:GameControler):void
		{
		}
		
		public function execute(oData:Object):void
		{
			Type = oData.Type;
			TableID = oData.TableID;
			GameID = oData.GameID;
			ShoeNo = oData.ShoeNo;
			GameNo = oData.GameNo;
			RoadMaps = oData.RoadMaps;
			
			trace("补全路纸内容：>>",RoadMaps," 路纸长度：>>",RoadMaps.length," 靴号：>>",ShoeNo);
			//结算时，更新路纸
			var _table : Table;
			_table = LobbyManager.getInstance().lobbyView.findTableByGT(GameID, TableID);
			if(_table){
				if(_table.struct.ShoeNo==ShoeNo && _table.struct.GameNo==GameNo){
					_table.struct.RoadMaps = RoadMaps;
					_table.initRoad(RoadMaps);
				}
			}
			
			var _quick : QuickTable;
			_quick = LobbyManager.getInstance().lobbyView.findQuickTableByGT(GameID, TableID);
			if(_quick){
				if(_quick.struct.ShoeNo==ShoeNo && _quick.struct.GameNo==GameNo){
					_quick.struct.RoadMaps = RoadMaps;
					_quick.initRoad(RoadMaps);
				}
			}
		}
	}
}