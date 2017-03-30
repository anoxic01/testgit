module lobby.view.route.quick {
	export class QuickBeadItemDTF extends BeadItem{
		private var m_sLabel	:	string;
		
		public constructor() {
		
			super();
		}
		
		 public function destroy():void{
			super.destroy();
			
		}
		
		 public function setLabel(sLabel:string):void{
			m_sLabel = sLabel;
			onChangeLanguage();
		}
		
		 public function onChangeLanguage():void{
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
				console.log("设置珠子位图异常...");
			}
		}
		
		
	}
}