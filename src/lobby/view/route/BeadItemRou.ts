module lobby.view.route {
	export class BeadItemRou extends BeadItem{
		public constructor() {
		super();
		}
		
		 public onChangeLanguage():void{
			if(m_bmp){
				switch(m_sLabel){
					case RouData.ZERO:
						m_bmp.bitmapData = BitmapManager.getInstance().getBmpdBead(Define.BEAD_ZERO);
						break;
					case RouData.BIG:
						m_bmp.bitmapData = BitmapManager.getInstance().getBmpdBead(Define.BEAD_BIG);
						break;
					
					case RouData.SMALL:
						m_bmp.bitmapData = BitmapManager.getInstance().getBmpdBead(Define.BEAD_SMALL);
						break;
					
					case RouData.ODD:
						m_bmp.bitmapData = BitmapManager.getInstance().getBmpdBead(Define.BEAD_DAN);
						break;
					
					case RouData.EVEN:
						m_bmp.bitmapData = BitmapManager.getInstance().getBmpdBead(Define.BEAD_SHUANG);
						break;
					
					case RouData.RED:
						m_bmp.bitmapData = BitmapManager.getInstance().getBmpdBead(Define.BEAD_RED);
						break;
					case RouData.BLACK:
						m_bmp.bitmapData = BitmapManager.getInstance().getBmpdBead(Define.BEAD_BLACK);
						break;
				}
				m_bmp.smoothing = true;
			}else{
				console.log("设置珠子位图异常...");
			}
		}
		
	}
}