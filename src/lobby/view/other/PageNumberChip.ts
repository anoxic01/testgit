module lobby.view.other {
	export class PageNumberChip extends BSprite{
		private m_mAsset			:	*;							//页码资源
		private m_bSelect			:	 boolean;					//选中状态
		private m_pagePanel			:	PanelPage;					//
		private m_uPage				:	number;						//页码序号
		
		public constructor( _uMode:number,_pagePanel:PanelPage, _uPage:number) {
			super();
			
			m_pagePanel = _pagePanel;
			m_uPage = _uPage;
			
			if(_uMode==0){
				m_mAsset = ResourceManager.getInstance().getInstanceByNameFromDomain(Define.SWF_LOBBY,"PageNumberAsset_lobby");
			}else{
				m_mAsset = ResourceManager.getInstance().getInstanceByNameFromDomain(Define.SWF_LOBBY,"PageNumberAsset_Game");
			}
			this.addChild(m_mAsset);
			
			this.buttonMode = true;
			this.addEventListener(MouseEvent.CLICK, onClick);
		}
		 public destroy():void{
			
			if(m_pagePanel){
				m_pagePanel = null;
			}
			
			this.removeEventListener(MouseEvent.CLICK, onClick);
			if(m_mAsset){
				this.removeChild(m_mAsset);
				m_mAsset = null;
			}
		}
		
		set  select(_bValue: boolean){
			m_bSelect = _bValue;
			m_mAsset.mc_select.visible = m_bSelect;
		}
		
		get pageID():number{
			return m_uPage;
		}
		
		protected onClick(event:MouseEvent):void
		{
			if(!m_bSelect){
				if(m_pagePanel){
					SoundManager.getInstance().play(SoundPackage.sChangePage);
					m_pagePanel.iCurrentPage = m_uPage;
				}
			}
		}
		
		
		
	}
}