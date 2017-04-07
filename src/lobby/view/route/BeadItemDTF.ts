module lobby.view.route {
	export class BeadItemDTF extends BeadItem{
		public constructor() {
		super();
		}
		
		 public onChangeLanguage():void{
			if(this.m_bmp){
				switch(this.m_sLabel){
					case BeadItem.A:
						this.m_bmp.bitmapData = manager.BitmapManager.getInstance().getBmpdBead(define.Define.BEAD_DRAGON);
						break;
					
					case BeadItem.E:
						this.m_bmp.bitmapData = manager.BitmapManager.getInstance().getBmpdBead(define.Define.BEAD_TIGER);
						break;
					
					case BeadItem.I:
						this.m_bmp.bitmapData = manager.BitmapManager.getInstance().getBmpdBead(define.Define.BEAD_TIE);
						break;
				}
				this.m_bmp.smoothing = true;
			}else{
				console.log("设置珠子位图异常...");
			}
		}
		
	}
}