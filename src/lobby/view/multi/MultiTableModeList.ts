module lobby.view.multi {
	export class MultiTableModeList implements iface.ISprite{
		private m_mode_4			:	MultiTableModeItem;
		private m_mode_8			:	MultiTableModeItem;
		private m_mode_16			:	MultiTableModeItem;
		
		private m_currentModeItem	:	MultiTableModeItem;
		
		public constructor(_mcAsset) {
			this.m_mode_4 = new MultiTableModeItem(_mcAsset.mc_0, 	this, 	define.Define.MULTI_TABLE_MODE_4);
			this.m_mode_8 = new MultiTableModeItem(_mcAsset.mc_1, 	this, 	define.Define.MULTI_TABLE_MODE_8);
			this.m_mode_16 = new MultiTableModeItem(_mcAsset.mc_2,	this,	define.Define.MULTI_TABLE_MODE_16);
			
		}
		
		public destroy():void{
			
			if(this.m_mode_4){
				this.m_mode_4.destroy();
				this.m_mode_4 = null;
			}
			if(this.m_mode_8){
				this.m_mode_8.destroy();
				this.m_mode_8 = null;
			}
			if(this.m_mode_16){
				this.m_mode_16.destroy();
				this.m_mode_16 = null;
			}
		}
		public init():void{
			this.currentModeItem = this.m_mode_4;
		}
		
		set  currentModeItem(_item:MultiTableModeItem){
			
//			if(LobbyManager.getInstance().multiTableView.currentList && !LobbyManager.getInstance().multiTableView.currentList.bTurn()){
//				return;
//			}
			
			this.enable = false;
			
			if(this.m_currentModeItem){
				this.m_currentModeItem.setSelect(false);
			}
			
			if(_item){
				_item.setSelect(true);
			}
			
			this.m_currentModeItem = _item;
		}
		
		set  enable(bValue: boolean){
			this.m_mode_4.enable = bValue;
			this.m_mode_8.enable = bValue;
			this.m_mode_16.enable = bValue;
		}
	}
}