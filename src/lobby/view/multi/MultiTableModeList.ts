module lobby.view.multi {
	export class MultiTableModeList implements iface.ISprite{
		private m_mode_4			:	MultiTableModeItem;
		private m_mode_8			:	MultiTableModeItem;
		private m_mode_16			:	MultiTableModeItem;
		
		private m_currentModeItem	:	MultiTableModeItem;
		
		public constructor(_mcAsset:MovieClip) {
			m_mode_4 = new MultiTableModeItem(_mcAsset.mc_0, 	this, 	Define.MULTI_TABLE_MODE_4);
			m_mode_8 = new MultiTableModeItem(_mcAsset.mc_1, 	this, 	Define.MULTI_TABLE_MODE_8);
			m_mode_16 = new MultiTableModeItem(_mcAsset.mc_2,	this,	Define.MULTI_TABLE_MODE_16);
			
		}
		
		public destroy():void{
			
			if(m_mode_4){
				m_mode_4.destroy();
				m_mode_4 = null;
			}
			if(m_mode_8){
				m_mode_8.destroy();
				m_mode_8 = null;
			}
			if(m_mode_16){
				m_mode_16.destroy();
				m_mode_16 = null;
			}
		}
		public init():void{
			currentModeItem = m_mode_4;
		}
		
		set  currentModeItem(_item:MultiTableModeItem){
			
//			if(LobbyManager.getInstance().multiTableView.currentList && !LobbyManager.getInstance().multiTableView.currentList.bTurn()){
//				return;
//			}
			
			enable = false;
			
			if(m_currentModeItem){
				m_currentModeItem.setSelect(false);
			}
			
			if(_item){
				_item.setSelect(true);
			}
			
			m_currentModeItem = _item;
		}
		
		set  enable(bValue: boolean){
			m_mode_4.enable = bValue;
			m_mode_8.enable = bValue;
			m_mode_16.enable = bValue;
		}
	}
}