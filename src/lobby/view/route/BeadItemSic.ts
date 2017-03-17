module lobby.view.route {
	export class BeadItemSic extends BeadItem{
		public constructor() {
		super();
		}
		
		override public function onChangeLanguage():void{
			if(m_bmp){
				switch(m_sLabel){
					case SicData.SURROUND_DICE:
						m_bmp.bitmapData = BitmapManager.getInstance().getBmpdBead(Define.BEAD_WEI);
						break;
					case SicData.BIG :
						m_bmp.bitmapData = BitmapManager.getInstance().getBmpdBead(Define.BEAD_BIG);
						break;
					
					case SicData.SMALL :
						m_bmp.bitmapData = BitmapManager.getInstance().getBmpdBead(Define.BEAD_SMALL);
						break;
					
					case SicData.ODD:
						m_bmp.bitmapData = BitmapManager.getInstance().getBmpdBead(Define.BEAD_DAN);
						break;
					
					case SicData.EVEN:
						m_bmp.bitmapData = BitmapManager.getInstance().getBmpdBead(Define.BEAD_SHUANG);
						break;
					
					
				}
				m_bmp.smoothing = true;
			}else{
				trace("设置骰宝路位图异常...");
			}
		}
		
	}
}