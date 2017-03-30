module packet.lobby {
	export class S_Lobby_Update_Dealer_Info_Pkt implements IProtocolStruct{
		public Type			:	number;
		public SN			:	number;
		public vecList		:	<DealerStruct>;
		
		public constructor() {
		}
		
		public initControler(controler:GameControler):void
		{
		}
		
		public execute(oData:Object):void
		{
			Type	=	oData.Type;
			SN		=	oData.SN;
			//	console.log("更新荷官资料:",oData.DealerList);
			
			//更新荷官资料
			if(oData.DealerList && oData.DealerList.length>0){
				var _struct : DealerStruct;
				var _table : Table;
				var _quickTable : QuickTable;
				for (var i:number= 0; i < oData.DealerList.length; i++) 
				{
					_struct = new DealerStruct(oData.DealerList[i]);
//	游戏中0x09 状态更新时判断				LobbyManager.getInstance().updateDealerInfo(_struct);
					
					_table = LobbyManager.getInstance().lobbyView.findTableByTT(_struct.ThemeID,_struct.TableID);	

					if(_table){
						_table.struct.DealerLoginID = _struct.LoginID;
						_table.struct.DealerName = _struct.Name;
						_table.struct.DealerPhotoUrl = _struct.PhotoUrl;
						_table.updateDealer();
					}else{
						console.log("更新荷官数据找不到对应的桌子...");
					}
					if( LobbyManager.getInstance().lobbyView ){
						_quickTable = LobbyManager.getInstance().lobbyView.findQuickTableByGT(_struct.ThemeID, _struct.TableID);
						if(_quickTable){
							_quickTable.updateMaintenanceStatus();
						}	
					}

				}
				
				if(_struct){
					_struct = null;
				}
				
				if(_table){
					_table = null;
				}
				
			}
			
			
		}
	}
}