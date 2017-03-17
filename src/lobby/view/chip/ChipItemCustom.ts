module lobby.view.chip {
	export class ChipItemCustom extends BSprite{
		private var m_uValue	:	uint;					//筹码面值
//		private var m_bmpAsset	:	Bitmap;					//筹码皮肤
		private var m_btnChip	:	ButtonChip;				//筹码按钮
		private var m_bSelect	:	Boolean;				//选中状态
		private var m_chipPanel	:	PanelChipCustom;		//
		
		private var m_bStatus	:	Boolean;				//操作状态
		
		public constructor(_uValue:uint, _chipPanel:PanelChipCustom) {
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
		override public function destroy():void
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
		
		public function set select(_bValue:Boolean):void{
			
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
		
		public function set value(_uValue:uint):void{
			if(m_btnChip!=null){
				this.removeChild(m_btnChip);
				m_btnChip.destroy();
			}
			
			m_btnChip = new ButtonChip(ResourceManager.getInstance().getInstanceByNameFromDomain(Define.SWF_CHIP,"Chip_Asset_"+String(_uValue)));
			this.addChild(m_btnChip);
			
//			m_bmpAsset.bitmapData = BitmapManager.getInstance().getBmpdChip(_uValue);
//			m_bmpAsset.smoothing = true;
		}
		
		public function get _uValue():uint
		{
			return m_uValue;
		}
		
		public function set _uValue(value:uint):void
		{
			m_uValue = value;
		}
		
		
		protected function onOver(event:MouseEvent):void
		{
			if(m_bSelect){
				return;
			}
			
			SoundManager.getInstance().play(SoundPackage.sChipOver);
		}
		
//		protected function onOut(event:MouseEvent):void
//		{
//			if(m_bSelect){
//				return;
//			}
//			
//			this.filters = [];
//		}		
		
		protected function onClick(event:MouseEvent):void
		{
			select = !m_bSelect;
		}
		
	}
}