module packet.pack_lobby {
	export class S_Lobby_Update_Dealer_Info_Pkt implements iface.IProtocolStruct{
		public Type			:	number;
		public SN			:	number;
		public vecList		;
		
		public constructor() {
		}
		
		public initControler(controler):void
		{
		}
		
		public execute(oData):void
		{
			this.Type	=	oData.Type;
			this.SN		=	oData.SN;
			//	console.log("更新荷官资料:",oData.DealerList);
			
			//更新荷官资料
			if(oData.DealerList && oData.DealerList.length>0){
				var _struct ;
				var _table ;
				var _quickTable ;
				for (var i:number= 0; i < oData.DealerList.length; i++) 
				{
					_struct = new lobby.model.struct.DealerStruct(oData.DealerList[i]);
//	游戏中0x09 状态更新时判断				LobbyManager.getInstance().updateDealerInfo(_struct);
					
					_table = manager.LobbyManager.getInstance().lobbyView.findTableByTT(_struct.ThemeID,_struct.TableID);	

					if(_table){
						_table.struct.DealerLoginID = _struct.LoginID;
						_table.struct.DealerName = _struct.Name;
						_table.struct.DealerPhotoUrl = _struct.PhotoUrl;
						_table.updateDealer();
					}else{
						console.log("更新荷官数据找不到对应的桌子...");
					}
					if( manager.LobbyManager.getInstance().lobbyView ){
						_quickTable = manager.LobbyManager.getInstance().lobbyView.findQuickTableByGT(_struct.ThemeID, _struct.TableID);
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