module lobby.view.route.quick {
	export class QuickBeadItemRou extends BeadItem{
		
		public constructor() {
		
			super();
			
		}
		
		 public destroy():void{
			super.destroy();
			
		}
		
		 public setLabel(sLabel:string):void{
			this.m_sLabel = sLabel;
			this.m_bmp.bitmapData = this.getRouBead(this.m_sLabel);
			this.m_bmp.width = 19;
			this.m_bmp.height = 19;
			this.m_bmp.smoothing = true;
			
			//轮盘默认显示数字，不需要切换语言
//			onChangeLanguage();
		}
		
		 public onChangeLanguage():void{
			if(this.m_bmp){
				this.m_bmp.bitmapData = this.getRouBead(this.m_sLabel);
				this.m_bmp.smoothing = true;
			}else{
				console.log("设置珠子位图异常...");
			}
			
		}
		
		public getRouBead(str:string):egret.BitmapData{
			return  manager.BitmapManager.getInstance().getBmpdBeadRouNum(str);
		}
		
	}
}