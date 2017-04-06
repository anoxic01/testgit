module lobby.view.other {
	export class PageNumberChip extends BSprite{
		private m_mAsset			;							//页码资源
		private m_bSelect			:	boolean;					//选中状态
		private m_pagePanel			;					//
		private m_uPage				:	number;						//页码序号
		
		public constructor( _uMode:number,_pagePanel, _uPage:number) {
			super();
			
			this.m_pagePanel = _pagePanel;
			this.m_uPage = _uPage;
			
			if(_uMode==0){
				this.m_mAsset = manager.ResourceManager.getInstance().getInstanceByNameFromDomain(define.Define.SWF_LOBBY,"PageNumberAsset_lobby");
			}else{
				this.m_mAsset = manager.ResourceManager.getInstance().getInstanceByNameFromDomain(define.Define.SWF_LOBBY,"PageNumberAsset_Game");
			}
			this.addChild(this.m_mAsset);
			
			this.touchEnabled = true;
			this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick, this);
		}
		 public destroy():void{
			
			if(this.m_pagePanel){
				this.m_pagePanel = null;
			}
			
			this.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick, this);
			if(this.m_mAsset){
				this.removeChild(this.m_mAsset);
				this.m_mAsset = null;
			}
		}
		
		set  select(_bValue: boolean){
			this.m_bSelect = _bValue;
			this.m_mAsset.mc_select.visible = this.m_bSelect;
		}
		
		get pageID():number{
			return this.m_uPage;
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