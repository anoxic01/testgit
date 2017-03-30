module lobby.view.route.quick {
	export class QuickBeadItemRou extends BeadItem{
		private var m_sLabel	:	string;				//标签
		
		public constructor() {
		
			super();
			
		}
		
		 public function destroy():void{
			super.destroy();
			
		}
		
		 public function setLabel(sLabel:string):void{
			m_sLabel = sLabel;
			m_bmp.bitmapData = getRouBead(m_sLabel);
			m_bmp.width = 19;
			m_bmp.height = 19;
			m_bmp.smoothing = true;
			
			//轮盘默认显示数字，不需要切换语言
//			onChangeLanguage();
		}
		
		 public function onChangeLanguage():void{
			if(m_bmp){
				m_bmp.bitmapData = getRouBead(m_sLabel);
				m_bmp.smoothing = true;
			}else{
				console.log("设置珠子位图异常...");
			}
			
		}
		
		public function getRouBead(str:string):BitmapData{
			return  BitmapManager.getInstance().getBmpdBeadRouNum(str);
		}
		
	}
}