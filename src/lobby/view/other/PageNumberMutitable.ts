module lobby.view.other {
	export class PageNumberMutitable extends BSprite{
		private var m_mAsset			:	*;									//页码资源
		private var m_bSelect			:	Boolean;							//选中状态
		private var m_pagePanel			:	PanelPage;							//
		private var m_uPage				:	uint;								//页码序号
		
		public constructor(_pagePanel:PanelPage, _uPage:uint) {
			super();
			
			m_pagePanel = _pagePanel;
			m_uPage = _uPage;
			
			m_mAsset = ResourceManager.getInstance().getInstanceByNameFromDomain(Define.SWF_MULTITABLE, "PageNumberMultiTableAsset");
			this.addChild(m_mAsset);
			m_mAsset.tf_label.text = String(m_uPage+1);
			
			m_mAsset.mouseChildren = false;
			
			this.buttonMode = true;
			this.addEventListener(MouseEvent.MOUSE_OVER, over);
			this.addEventListener(MouseEvent.MOUSE_OUT, out);
			this.addEventListener(MouseEvent.CLICK, onClick);
		}
		override public function destroy():void{
			
			if(m_pagePanel){
				m_pagePanel = null;
			}
			
			this.removeEventListener(MouseEvent.MOUSE_OVER, over);
			this.removeEventListener(MouseEvent.MOUSE_OUT, out);
			this.removeEventListener(MouseEvent.CLICK, onClick);
			
			if(m_mAsset){
				this.removeChild(m_mAsset);
				m_mAsset = null;
			}
		}
		
		public function set select(_bValue:Boolean):void{
			m_bSelect = _bValue;
			if(m_bSelect){
				m_mAsset.gotoAndStop("SELECT");
			}else{
				m_mAsset.gotoAndStop("DEFAULT");
			}
		}
		
		public function get pageID():uint{
			return m_uPage;
		}
		
		protected function over(event:MouseEvent):void
		{
			if(m_bSelect){
				return;
			}
			if(m_mAsset){
				m_mAsset.gotoAndStop("HOVER");
			}
		}
		
		protected function out(event:MouseEvent):void
		{
			if(m_bSelect){
				return;
			}
			if(m_mAsset){
				m_mAsset.gotoAndStop("DEFAULT");
			}
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