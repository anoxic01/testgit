module lobby.view.route {
	export class BeadItemDTF extends BeadItem{
		public constructor() {
		super();
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
				m_bmp.smoothing = true;
			}else{
				trace("设置珠子位图异常...");
			}
		}
		
	}
}