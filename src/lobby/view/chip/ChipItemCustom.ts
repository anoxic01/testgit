module lobby.view.chip {
	export class ChipItemCustom extends BSprite{
		private m_uValue	:	number;					//筹码面值
//		private m_bmpAsset	:	Bitmap;					//筹码皮肤
		private m_btnChip	:	ButtonChip;				//筹码按钮
		private m_bSelect	:	 boolean;				//选中状态
		private m_chipPanel	:	PanelChipCustom;		//
		
		private m_bStatus	:	 boolean;				//操作状态
		
		public constructor(_uValue:number, _chipPanel:PanelChipCustom) {
			super();
			m_uValue = _uValue;
			m_chipPanel = _chipPanel;
			
//			m_btnChip = new ButtonChip(ResourceManager.getInstance().getInstanceByNameFromDomain(Define.SWF_CHIP,"Chip_Asset_x_"+String(_uValue)));
			m_btnChip = new ButtonChip(ResourceManager.getInstance().getInstanceByNameFromDomain(Define.SWF_CHIP,"Chip_Asset_"+String(_uValue)));
			this.addChild(m_btnChip);
			m_btnChip.width = 91;
			m_btnChip.height = 93;
			
//			m_bmpAsset = new Bitmap();
//			this.addChild(m_bmpAsset);
//			m_bmpAsset.bitmapData = BitmapManager.getInstance().getBmpdChip(_uValue);
//			m_bmpAsset.smoothing = true;
//			
//			this.buttonMode = true;
			this.addEventListener(MouseEvent.MOUSE_OVER, onOver);
//			this.addEventListener(MouseEvent.MOUSE_OUT, onOut);
			this.addEventListener(MouseEvent.CLICK, onClick);
		}
		 public destroy():void
		{
			this.removeEventListener(MouseEvent.CLICK, onClick);
			if(m_chipPanel){
				m_chipPanel = null;
			}
			
			if(m_btnChip){
				this.removeChild(m_btnChip);
				m_btnChip = null;
			}
			
//			if(m_bmpAsset){
//				this.removeChild(m_bmpAsset);
//				m_bmpAsset = null;
//			}
			
		}
		
		set  select(_bValue: boolean){
			
//			m_mcSelect.visible = m_bSelect;
			if(!m_bSelect){
				m_bStatus = m_chipPanel.addSelect(m_uValue);
//				m_mcSelect.gotoAndPlay(1);
			}else{
				m_bStatus = m_chipPanel.removeSelect(m_uValue);
//				m_mcSelect.gotoAndStop(1);
			}
			if(m_bStatus){
//				this.filters = [new GlowFilter(0xadf256,1,20,20)];
//				if(m_bSelect){
//					this.filters = [];
//				}
				m_bSelect = _bValue;
				SoundManager.getInstance().play(SoundPackage.sChipSelect);
			}
			
			m_btnChip.select = m_bSelect;
		}
		
		set  value(_uValue:number){
			if(m_btnChip!=null){
				this.removeChild(m_btnChip);
				m_btnChip.destroy();
			}
			
			m_btnChip = new ButtonChip(ResourceManager.getInstance().getInstanceByNameFromDomain(Define.SWF_CHIP,"Chip_Asset_"+String(_uValue)));
			this.addChild(m_btnChip);
			
//			m_bmpAsset.bitmapData = BitmapManager.getInstance().getBmpdChip(_uValue);
//			m_bmpAsset.smoothing = true;
		}
		
		get _uValue():number
		{
			return m_uValue;
		}
		
		set  _uValue(value:number)
		{
			m_uValue = value;
		}
		
		
		protected onOver(event:MouseEvent):void
		{
			if(m_bSelect){
				return;
			}
			
			SoundManager.getInstance().play(SoundPackage.sChipOver);
		}
		
//		protected onOut(event:MouseEvent):void
//		{
//			if(m_bSelect){
//				return;
//			}
//			
//			this.filters = [];
//		}		
		
		protected onClick(event:MouseEvent):void
		{
			select = !m_bSelect;
		}
		
	}
}