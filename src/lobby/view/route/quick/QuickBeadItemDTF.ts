module lobby.view.route.quick {
	export class QuickBeadItemDTF extends BeadItem{
		private var m_sLabel	:	String;
		
		public constructor() {
		
			super();
		}
		
		override public function destroy():void{
			super.destroy();
			
		}
		
		override public function setLabel(sLabel:String):void{
			m_sLabel = sLabel;
			onChangeLanguage();
		}
		
		override public function onChangeLanguage():void{
			if(m_bmp){
				switch(m_sLabel){
					case A:
						m_bmp.bitmapData = BitmapManager.getInstance().getBmpdBead(Define.BEAD_DRAGON);
						break;
					
					case E:
						m_bmp.bitmapData = BitmapManager.getInstance().getBmpdBead(Define.BEAD_TIGER);
						break;
					
					case I:
						m_bmp.bitmapData = BitmapManager.getInstance().getBmpdBead(Define.BEAD_TIE);
						break;
				}
				m_bmp.width = 20;
				m_bmp.height = 21;
				m_bmp.smoothing = true;
			}else{
				trace("设置珠子位图异常...");
			}
		}
		
		
	}
}