module lobby.view.panel {
	export class PanelGoodRoadSettingItem implements iface.ISprite{
		public ID			:	number;
		public bSelect		:	boolean;
		private m_mcAsset 	;
		private m_glow		;
		
		public constructor(_mcAsset, _id:number) {

			this.m_mcAsset = _mcAsset;
			this.ID = _id;
			
			this.m_glow = new BitmapScale9Grid(manager.SoundManager.getInstance().getInstanceByNameFromDomain(define.Define.SWF_LOBBY, "General_Rollover_Select_Asset"), 1,10,15,10,15);
			this.m_mcAsset.addChild(this.m_glow);
			this.m_glow.setSize(156,102);
			this.m_glow.alpha = 0;
			
			this.m_mcAsset.buttonMode = true;
			this.m_mcAsset.addEventListener(mouse.MouseEvent.MOUSE_OVER, this.itemOver);
			this.m_mcAsset.addEventListener(mouse.MouseEvent.MOUSE_OUT, this.itemOut);
			this.m_mcAsset.addEventListener(egret.TouchEvent.TOUCH_TAP, this.itemClick);
		}

		public destroy():void{
			
			if(this.m_glow){
				if(this.m_glow.parent){
					this.m_glow.parent.removeChild(this.m_glow);
				}
				this.m_glow.dispose();
				this.m_glow = null;
			}
			
			if(this.m_mcAsset){
				
				this.m_mcAsset.removeEventListener(mouse.MouseEvent.MOUSE_OVER, this.itemOver);
				this.m_mcAsset.removeEventListener(mouse.MouseEvent.MOUSE_OUT, this.itemOut);
				this.m_mcAsset.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.itemClick);
				
				this.m_mcAsset = null;
			}
		}
		
		public setStatus(_bValue: boolean):void{
			if(this.bSelect != _bValue){
				this.bSelect = _bValue;
				if(this.bSelect){
					this.m_glow.alpha = 1;
				}else{
					this.m_glow.alpha = 0;
				}
			}
		}
		
		protected itemOver(event:MouseEvent):void
		{
			if(this.bSelect){
				return;
			}
			this.m_glow.alpha = 1;
		}
		
		protected itemOut(event:MouseEvent):void
		{
			if(this.bSelect){
				return;
			}
			this.m_glow.alpha = 0;
		}
		
		protected itemClick(event:MouseEvent):void
		{
			manager.SoundManager.getInstance().play(sound.SoundPackage.sClick_Tools);
			
			this.bSelect = !this.bSelect;
			if(this.bSelect){
				this.m_glow.alpha = 1;
			}else{
				this.m_glow.alpha = 0;
			}
			
			if(this.bSelect){
				if(manager.LobbyManager.getInstance().panelGoodRoadType.judgeSelectAll()){
					manager.LobbyManager.getInstance().panelGoodRoadType.select.setStatus(true);
				}
			}else{
				if(manager.LobbyManager.getInstance().panelGoodRoadType.select.this.bSelect){
					manager.LobbyManager.getInstance().panelGoodRoadType.select.setStatus(false);
				}
			}
			
		}
	}
}