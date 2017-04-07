module lobby.view.route {
	export class BeadItemRou extends BeadItem{
		public constructor() {
		super();
		}
		
		 public onChangeLanguage():void{
			if(this.m_bmp){
				switch(this.m_sLabel){
					case game.rou.RouData.ZERO:
						this.m_bmp.bitmapData = manager.BitmapManager.getInstance().getBmpdBead(define.Define.BEAD_ZERO);
						break;
					case game.rou.RouData.BIG:
						this.m_bmp.bitmapData = manager.BitmapManager.getInstance().getBmpdBead(define.Define.BEAD_BIG);
						break;
					
					case game.rou.RouData.SMALL:
						this.m_bmp.bitmapData = manager.BitmapManager.getInstance().getBmpdBead(define.Define.BEAD_SMALL);
						break;
					
					case game.rou.RouData.ODD:
						this.m_bmp.bitmapData = manager.BitmapManager.getInstance().getBmpdBead(define.Define.BEAD_DAN);
						break;
					
					case game.rou.RouData.EVEN:
						this.m_bmp.bitmapData = manager.BitmapManager.getInstance().getBmpdBead(define.Define.BEAD_SHUANG);
						break;
					
					case game.rou.RouData.RED:
						this.m_bmp.bitmapData = manager.BitmapManager.getInstance().getBmpdBead(define.Define.BEAD_RED);
						break;
					case game.rou.RouData.BLACK:
						this.m_bmp.bitmapData = manager.BitmapManager.getInstance().getBmpdBead(define.Define.BEAD_BLACK);
						break;
				}
				this.m_bmp.smoothing = true;
			}else{
				console.log("设置珠子位图异常...");
			}
		}
		
	}
}