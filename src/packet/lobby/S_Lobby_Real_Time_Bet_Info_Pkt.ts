module packet.lobby {
	export class S_Lobby_Real_Time_Bet_Info_Pkt implements IProtocolStruct{
		public var Type			:	int;
		public var SN			:	int;
		
		public constructor() {
		}
		
		public function initControler(controler:GameControler):void
		{
		}
		
		public function execute(oData:Object):void
		{
			Type	=	oData.Type;
			SN		=	oData.SN;
			
			var _len : int = oData.TableStaticsList.length;
			var tableStruct : TableStruct;
			var TableStatics : StaticsInfoStruct;
			var quickTable : QuickTable;
			for (var i:int = 0; i < _len; i++) 
			{
				
				switch(oData.TableStaticsList[i].GameID){
					case GameDefine.BAC:
						TableStatics	=	new StaticsInfoBaccarat();
						break;
					
					case GameDefine.SIC:
						TableStatics	=	new StaticsInfoSic();
						break;
					
					case GameDefine.ROU:
						TableStatics	=	new StaticsInfoRoulette();
						break;
					
					case GameDefine.DTF:
						TableStatics	=	new StaticsInfoDTF();
						break;
				}
				
				TableStatics.updateStatic(oData.TableStaticsList[i]);
				
				tableStruct = LobbyData.getInstance().getTableStructByTableID(oData.TableStaticsList[i].TableID);
				if(tableStruct==null){
						trace("更新彩池时，找不到对应桌子...oData.TableStaticsList[i].GameID:",oData.TableStaticsList[i].GameID, "oData.TableStaticsList[i].TableID:",oData.TableStaticsList[i].TableID);
				}else{
					if(tableStruct.TableID==15){
						trace();
					}
					tableStruct.updateStaticsInfo(TableStatics);
				}
				
			}
			
			
			
		}
	}
}