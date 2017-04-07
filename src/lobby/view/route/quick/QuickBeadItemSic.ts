module lobby.view.route.quick {
	export class QuickBeadItemSic extends BeadItem{
		
		public constructor(_uMode:number=0) {
			super();
		}
		
		 public destroy():void{
			super.destroy();
			
		}
		
		 public setLabel(sLabel:string):void{
			this.m_sLabel = sLabel;
			this.m_bmp.bitmapData = this.getSicBead(this.m_sLabel);
			this.m_bmp.width = 20;
			this.m_bmp.height = 21;
			this.m_bmp.smoothing = true;
			//骰宝默认显示数字，不需要切换语言
//			onChangeLanguage();
		}
		
		 public onChangeLanguage():void{
			if(this.m_bmp){
//				m_bmp.bitmapData = getSicBead(m_sLabel);
				switch(this.m_sLabel){
					case BeadItem.D:
						this.m_bmp.bitmapData = manager.BitmapManager.getInstance().getBmpdBead(define.Define.BEAD_DAN);
						break;
					
					case BeadItem.F:
						this.m_bmp.bitmapData = manager.BitmapManager.getInstance().getBmpdBead(define.Define.BEAD_SHUANG);
						break;
				}
				this.m_bmp.width = 20;
				this.m_bmp.height = 21;
				this.m_bmp.smoothing = true;
			}else{
				console.log("设置珠子位图异常...");
			}
			
		}
		
		public getSicBead( str:string ):egret.BitmapData {
			model.LobbyData.getInstance().beadRoad_sic.tf_0.text = str;
			// LobbyData.getInstance().beadRoad_sic.tf_0.autoSize = TextFieldAutoSize.LEFT;		
			
			return util.bitmap.BitmapUtil.snapshot(model.LobbyData.getInstance().beadRoad_sic);
		}
		
		
	}
}