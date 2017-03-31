module lobby.view.other {
	export class PageNumberMutitable extends BSprite{
		private m_mAsset			:	*;									//页码资源
		private m_bSelect			:	 boolean;							//选中状态
		private m_pagePanel			:	PanelPage;							//
		private m_uPage				:	number;								//页码序号
		
		public constructor(_pagePanel:PanelPage, _uPage:number) {
			super();
			
			m_pagePanel = _pagePanel;
			m_uPage = _uPage;
			
			m_mAsset = ResourceManager.getInstance().getInstanceByNameFromDomain(Define.SWF_MULTITABLE, "PageNumberMultiTableAsset");
			this.addChild(m_mAsset);
			m_mAsset.tf_label.text = String(m_uPage+1);
			
			m_mAsset.mouseChildren = false;
			
			this.buttonMode = true;
			this.addEventListener(mouse.MouseEvent.MOUSE_OVER, over);
			this.addEventListener(mouse.MouseEvent.MOUSE_OUT, out);
			this.addEventListener(egret.TouchEvent.TOUCH_TAP, onClick);
		}
		 public destroy():void{
			
			if(m_pagePanel){
				m_pagePanel = null;
			}
			
			this.removeEventListener(mouse.MouseEvent.MOUSE_OVER, over);
			this.removeEventListener(mouse.MouseEvent.MOUSE_OUT, out);
			this.removeEventListener(egret.TouchEvent.TOUCH_TAP, onClick);
			
			if(m_mAsset){
				this.removeChild(m_mAsset);
				m_mAsset = null;
			}
		}
		
		set  select(_bValue: boolean){
			m_bSelect = _bValue;
			if(m_bSelect){
				m_mAsset.gotoAndStop("SELECT");
			}else{
				m_mAsset.gotoAndStop("DEFAULT");
			}
		}
		
		get pageID():number{
			return m_uPage;
		}
		
		protected over(event:MouseEvent):void
		{
			if(m_bSelect){
				return;
			}
			if(m_mAsset){
				m_mAsset.gotoAndStop("HOVER");
			}
		}
		
		protected out(event:MouseEvent):void
		{
			if(m_bSelect){
				return;
			}
			if(m_mAsset){
				m_mAsset.gotoAndStop("DEFAULT");
			}
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