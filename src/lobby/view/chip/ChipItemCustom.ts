module lobby.view.chip {
	export class ChipItemCustom extends BSprite{
		private m_uValue	:	number;					//筹码面值
//		private m_bmpAsset	:	Bitmap;					//筹码皮肤
		private m_btnChip	:	ui.button.ButtonChip;				//筹码按钮
		private m_bSelect	:	 boolean;				//选中状态
		private m_chipPanel	:	panel.PanelChipCustom;		//
		
		private m_bStatus	:	 boolean;				//操作状态
		
		public constructor(_uValue:number, _chipPanel:panel.PanelChipCustom) {
			super();
			this.m_uValue = _uValue;
			this.m_chipPanel = _chipPanel;
			
//			this.m_btnChip = new ui.button.ButtonChip(manager.ResourceManager.getInstance().getInstanceByNameFromDomain(define.Define.SWF_CHIP,"Chip_Asset_x_"+String(_uValue)));
			this.m_btnChip = new ui.button.ButtonChip(manager.ResourceManager.getInstance().getInstanceByNameFromDomain(define.Define.SWF_CHIP,"Chip_Asset_"+String(_uValue)));
			this.addChild(this.m_btnChip);
			this.m_btnChip.width = 91;
			this.m_btnChip.height = 93;
			
//			m_bmpAsset = new egret.Bitmap();
//			this.addChild(m_bmpAsset);
//			m_bmpAsset.bitmapData = BitmapManager.getInstance().getBmpdChip(_uValue);
//			m_bmpAsset.smoothing = true;
//			
//			this.touchEnabled = true;
			this.addEventListener(mouse.MouseEvent.MOUSE_OVER, this.onOver, this);
//			this.addEventListener(mouse.MouseEvent.MOUSE_OUT, onOut);
			this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick, this);
		}
		 public destroy():void
		{
			this.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick, this);
			if(this.m_chipPanel){
				this.m_chipPanel = null;
			}
			
			if(this.m_btnChip){
				this.removeChild(this.m_btnChip);
				this.m_btnChip = null;
			}
			
//			if(m_bmpAsset){
//				this.removeChild(m_bmpAsset);
//				m_bmpAsset = null;
//			}
			
		}
		
		set  select(_bValue: boolean){
			
//			m_mcSelect.visible = this.m_bSelect;
			if(!this.m_bSelect){
				this.m_bStatus = this.m_chipPanel.addSelect(this.m_uValue);
//				m_mcSelect.gotoAndPlay(1);
			}else{
				this.m_bStatus = this.m_chipPanel.removeSelect(this.m_uValue);
//				m_mcSelect.gotoAndStop(1);
			}
			if(this.m_bStatus){
//				this.filters = [new GlowFilter(0xadf256,1,20,20)];
//				if(this.m_bSelect){
//					this.filters = [];
//				}
				this.m_bSelect = _bValue;
				manager.SoundManager.getInstance().play(sound.SoundPackage.sChipSelect);
			}
			
			this.m_btnChip.select = this.m_bSelect;
		}
		
		set  value(_uValue:number){
			if(this.m_btnChip!=null){
				this.removeChild(this.m_btnChip);
				this.m_btnChip.destroy();
			}
			
			this.m_btnChip = new ui.button.ButtonChip(manager.ResourceManager.getInstance().getInstanceByNameFromDomain(define.Define.SWF_CHIP,"Chip_Asset_"+String(_uValue)));
			this.addChild(this.m_btnChip);
			
//			m_bmpAsset.bitmapData = BitmapManager.getInstance().getBmpdChip(_uValue);
//			m_bmpAsset.smoothing = true;
		}
		
		get _uValue():number
		{
			return this.m_uValue;
		}
		
		set  _uValue(value:number)
		{
			this.m_uValue = value;
		}
		
		
		protected onOver(event:MouseEvent):void
		{
			if(this.m_bSelect){
				return;
			}
			
			manager.SoundManager.getInstance().play(sound.SoundPackage.sChipOver);
		}
		
//		protected onOut(event:MouseEvent):void
//		{
//			if(this.m_bSelect){
//				return;
//			}
//			
//			this.filters = [];
//		}		
		
		protected onClick(event:MouseEvent):void
		{
			this.select = !this.m_bSelect;
		}
		
	}
}