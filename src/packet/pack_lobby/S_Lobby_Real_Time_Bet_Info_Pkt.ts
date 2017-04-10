module packet.pack_lobby {
	export class S_Lobby_Real_Time_Bet_Info_Pkt implements iface.IProtocolStruct{
		public Type			:	number;
		public SN			:	number;
		
		public constructor() {
		}
		
		public initControler(controler):void
		{
		}
		
		public execute(oData):void
		{
			this.Type	=	oData.Type;
			this.SN		=	oData.SN;
			
			var _len  = oData.TableStaticsList.length;
			var tableStruct ;
			var TableStatics ;
			var quickTable ;
			for (var i:number= 0; i < _len; i++) 
			{
				
				switch(oData.TableStaticsList[i].GameID){
					case define.GameDefine.BAC:
						TableStatics	=	new lobby.model.struct.StaticsInfoBaccarat();
						break;
					
					case define.GameDefine.SIC:
						TableStatics	=	new lobby.model.struct.StaticsInfoSic();
						break;
					
					case define.GameDefine.ROU:
						TableStatics	=	new lobby.model.struct.StaticsInfoRoulette();
						break;
					
					case define.GameDefine.DTF:
						TableStatics	=	new lobby.model.struct.StaticsInfoDTF();
						break;
				}
				
				TableStatics.updateStatic(oData.TableStaticsList[i]);
				
				tableStruct = lobby.model.LobbyData.getInstance().getTableStructByTableID(oData.TableStaticsList[i].TableID);
				if(tableStruct==null){
						console.log("更新彩池时，找不到对应桌子...oData.TableStaticsList[i].GameID:",oData.TableStaticsList[i].GameID, "oData.TableStaticsList[i].TableID:",oData.TableStaticsList[i].TableID);
				}else{
					if(tableStruct.TableID==15){
						console.log();
					}
					tableStruct.updateStaticsInfo(TableStatics);
				}
				
			}
			
			
			
		}
	}
}