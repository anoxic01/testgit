module lobby.view.panel {
	export class PanelGoodRoadSettingSelect implements iface.ISprite{
		private m_mcAsset	;
	//	private m_glow		:	Bitmap;
		public bSelect		:	boolean;
		
		public constructor(_mcAsset) {
			this.m_mcAsset = _mcAsset;
			
	//		m_glow = new Bitmap(new General_Rollover_Select_Asset(),"auto", true);
	//		this.m_mcAsset.addChildAt(m_glow,1);
	//		m_glow.visible = false;
	//		m_glow.y = 2;
			
			this.m_mcAsset.gotoAndStop(1);
			this.m_mcAsset.buttonMode = true;
			this.m_mcAsset.touchChildren = false;
			this.m_mcAsset.addEventListener(mouse.MouseEvent.MOUSE_OVER, this.selectOver);
			this.m_mcAsset.addEventListener(mouse.MouseEvent.MOUSE_OUT, this.selectOut);
			this.m_mcAsset.addEventListener(egret.TouchEvent.TOUCH_TAP, this.selectClick);
		}

		public destroy():void{
			if(this.m_mcAsset){
				this.m_mcAsset.removeEventListener(mouse.MouseEvent.MOUSE_OVER, this.selectOver);
				this.m_mcAsset.removeEventListener(mouse.MouseEvent.MOUSE_OUT, this.selectOut);
				this.m_mcAsset.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.selectClick);
				
				this.m_mcAsset = null;
			}
		}
		
		protected selectClick(event:MouseEvent):void
		{
			manager.SoundManager.getInstance().play(sound.SoundPackage.sClick_Tools);
			manager.LobbyManager.getInstance().panelGoodRoadType.selectAll();
		}
		
		public setStatus(_bValue: boolean):void{
			this.bSelect = _bValue;
			
			this.m_mcAsset.mc_label.visible = this.bSelect;
		}
		
		protected selectOver(event:MouseEvent):void
		{
	//		m_glow.visible = true;
			this.m_mcAsset.gotoAndStop(2);
		}
		
		protected selectOut(event:MouseEvent):void
		{
	//		m_glow.visible = false;
			this.m_mcAsset.gotoAndStop(1);
		}
		
	}
}