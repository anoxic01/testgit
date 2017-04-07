module lobby.view.other {
	export class PageNumberMutitable extends BSprite{
		private m_mAsset			;									//页码资源
		private m_bSelect			:	boolean;							//选中状态
		private m_pagePanel			;							//
		private m_uPage				:	number;								//页码序号
		
		public constructor(_pagePanel, _uPage:number) {
			super();
			
			this.m_pagePanel = _pagePanel;
			this.m_uPage = _uPage;
			
			this.m_mAsset = manager.ResourceManager.getInstance().getInstanceByNameFromDomain(define.Define.SWF_MULTITABLE, "PageNumberMultiTableAsset");
			this.addChild(this.m_mAsset);
			this.m_mAsset.tf_label.text = String(this.m_uPage+1);
			
			this.m_mAsset.touchChildren = false;
			
			this.touchEnabled = true;
			this.addEventListener(mouse.MouseEvent.MOUSE_OVER, this.over, this);
			this.addEventListener(mouse.MouseEvent.MOUSE_OUT, this.out, this);
			this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick, this);
		}
		 public destroy():void{
			
			if(this.m_pagePanel){
				this.m_pagePanel = null;
			}
			
			this.removeEventListener(mouse.MouseEvent.MOUSE_OVER, this.over, this);
			this.removeEventListener(mouse.MouseEvent.MOUSE_OUT, this.out, this);
			this.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick, this);
			
			if(this.m_mAsset){
				this.removeChild(this.m_mAsset);
				this.m_mAsset = null;
			}
		}
		
		set  select(_bValue: boolean){
			this.m_bSelect = _bValue;
			if(this.m_bSelect){
				this.m_mAsset.gotoAndStop("SELECT");
			}else{
				this.m_mAsset.gotoAndStop("DEFAULT");
			}
		}
		
		get pageID():number{
			return this.m_uPage;
		}
		
		protected over(event:MouseEvent):void
		{
			if(this.m_bSelect){
				return;
			}
			if(this.m_mAsset){
				this.m_mAsset.gotoAndStop("HOVER");
			}
		}
		
		protected out(event:MouseEvent):void
		{
			if(this.m_bSelect){
				return;
			}
			if(this.m_mAsset){
				this.m_mAsset.gotoAndStop("DEFAULT");
			}
		}
		
		protected onClick(event:MouseEvent):void
		{
			if(!this.m_bSelect){
				if(this.m_pagePanel){
					manager.SoundManager.getInstance().play(sound.SoundPackage.sChangePage);
					this.m_pagePanel.iCurrentPage = this.m_uPage;
				}
			}
		}
		
		
		
	}
}