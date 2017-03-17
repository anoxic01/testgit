module lobby.view.route.quick {
	export class QuickBeadItemRou extends BeadItem{
		private var m_sLabel	:	String;				//标签
		
		public constructor() {
		
			super();
			
		}
		
		override public function destroy():void{
			super.destroy();
			
		}
		
		override public function setLabel(sLabel:String):void{
			m_sLabel = sLabel;
			m_bmp.bitmapData = getRouBead(m_sLabel);
			m_bmp.width = 19;
			m_bmp.height = 19;
			m_bmp.smoothing = true;
			
			//轮盘默认显示数字，不需要切换语言
//			onChangeLanguage();
		}
		
		override public function onChangeLanguage():void{
			if(m_bmp){
				m_bmp.bitmapData = getRouBead(m_sLabel);
				m_bmp.smoothing = true;
			}else{
				trace("设置珠子位图异常...");
			}
			
		}
		
		public function getRouBead(str:String):BitmapData{
			return  BitmapManager.getInstance().getBmpdBeadRouNum(str);
		}
		
	}
}