module packet.lobby {
	export class S_Lobby_Update_Dealer_Info_Pkt implements IProtocolStruct{
		public var Type			:	int;
		public var SN			:	int;
		public var vecList		:	Vector.<DealerStruct>;
		
		public constructor() {
		}
		
		public function initControler(controler:GameControler):void
		{
		}
		
		public function execute(oData:Object):void
		{
			Type	=	oData.Type;
			SN		=	oData.SN;
			//	trace("更新荷官资料:",oData.DealerList);
			
			//更新荷官资料
			if(oData.DealerList && oData.DealerList.length>0){
				var _struct : DealerStruct;
				var _table : Table;
				var _quickTable : QuickTable;
				for (var i:int = 0; i < oData.DealerList.length; i++) 
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
						trace("更新荷官数据找不到对应的桌子...");
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