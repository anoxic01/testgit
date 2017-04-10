module packet.pack_lobby {
	export class S_Lobby_Update_Table_Road_Pkt implements iface.IProtocolStruct{
		public Type		:	number;
		public TableID	:	number;
		public GameID	:	number;
		public ShoeNo	:	number;			//靴號,非當前靴號不處理
		public GameNo	:	number;
		public RoadMaps	:	String;			//當前靴當下所有的路紙
		
		public constructor() {
		}
		
		public initControler(controler):void
		{
		}
		
		public execute(oData):void
		{
			this.Type = oData.Type;
			this.TableID = oData.TableID;
			this.GameID = oData.GameID;
			this.ShoeNo = oData.ShoeNo;
			this.GameNo = oData.GameNo;
			this.RoadMaps = oData.RoadMaps;
			
			console.log("补全路纸内容：>>",this.RoadMaps," 路纸长度：>>",this.RoadMaps.length," 靴号：>>",this.ShoeNo);
			//结算时，更新路纸
			var _table ;
			_table = manager.LobbyManager.getInstance().lobbyView.findTableByGT(this.GameID, this.TableID);
			if(_table){
				if(_table.struct.ShoeNo==this.ShoeNo && _table.struct.GameNo==this.GameNo){
					_table.struct.RoadMaps = this.RoadMaps;
					_table.initRoad(this.RoadMaps);
				}
			}
			
			var _quick ;
			_quick = manager.LobbyManager.getInstance().lobbyView.findQuickTableByGT(this.GameID, this.TableID);
			if(_quick){
				if(_quick.struct.ShoeNo==this.ShoeNo && _quick.struct.GameNo==this.GameNo){
					_quick.struct.RoadMaps = this.RoadMaps;
					_quick.initRoad(this.RoadMaps);
				}
			}
		}
	}
}