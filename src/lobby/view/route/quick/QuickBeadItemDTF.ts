module lobby.view.route.quick {
	export class QuickBeadItemDTF extends BeadItem{
		
		public constructor() {
		
			super();
		}
		
		 public destroy():void{
			super.destroy();
			
		}
		
		 public setLabel(sLabel:string):void{
			this.m_sLabel = sLabel;
			this.onChangeLanguage();
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
				this.m_bmp.width = 20;
				this.m_bmp.height = 21;
				this.m_bmp.smoothing = true;
			}else{
				console.log("设置珠子位图异常...");
			}
		}
		
		
	}
}