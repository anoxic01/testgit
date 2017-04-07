module lobby.view.route {
	export class BeadItemSic extends BeadItem{
		public constructor() {
		super();
		}
		
		 public onChangeLanguage():void{
			if(this.m_bmp){
				switch(this.m_sLabel){
					case game.sic.SicData.SURROUND_DICE:
						this.m_bmp.bitmapData = manager.BitmapManager.getInstance().getBmpdBead(define.Define.BEAD_WEI);
						break;
					case game.sic.SicData.BIG :
						this.m_bmp.bitmapData = manager.BitmapManager.getInstance().getBmpdBead(define.Define.BEAD_BIG);
						break;
					
					case game.sic.SicData.SMALL :
						this.m_bmp.bitmapData = manager.BitmapManager.getInstance().getBmpdBead(define.Define.BEAD_SMALL);
						break;
					
					case game.sic.SicData.ODD:
						this.m_bmp.bitmapData = manager.BitmapManager.getInstance().getBmpdBead(define.Define.BEAD_DAN);
						break;
					
					case game.sic.SicData.EVEN:
						this.m_bmp.bitmapData = manager.BitmapManager.getInstance().getBmpdBead(define.Define.BEAD_SHUANG);
						break;
					
					
				}
				this.m_bmp.smoothing = true;
			}else{
				console.log("设置骰宝路位图异常...");
			}
		}
		
	}
}