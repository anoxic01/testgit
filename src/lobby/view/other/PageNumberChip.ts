module lobby.view.other {
	export class PageNumberChip extends BSprite{
		private var m_mAsset			:	*;							//页码资源
		private var m_bSelect			:	Boolean;					//选中状态
		private var m_pagePanel			:	PanelPage;					//
		private var m_uPage				:	uint;						//页码序号
		
		public constructor( _uMode:uint,_pagePanel:PanelPage, _uPage:uint) {
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
		override public function destroy():void{
			
			if(m_pagePanel){
				m_pagePanel = null;
			}
			
			this.removeEventListener(MouseEvent.CLICK, onClick);
			if(m_mAsset){
				this.removeChild(m_mAsset);
				m_mAsset = null;
			}
		}
		
		public function set select(_bValue:Boolean):void{
			m_bSelect = _bValue;
			m_mAsset.mc_select.visible = m_bSelect;
		}
		
		public function get pageID():uint{
			return m_uPage;
		}
		
		protected function onClick(event:MouseEvent):void
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