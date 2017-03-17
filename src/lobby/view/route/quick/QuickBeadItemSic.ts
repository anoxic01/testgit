module lobby.view.route.quick {
	export class QuickBeadItemSic extends BeadItem{
		private var m_sLabel	:	String;		//标签
		
		public constructor(_uMode:uint=0) {
		super();
		}
		
		override public function destroy():void{
			super.destroy();
			
		}
		
		override public function setLabel(sLabel:String):void{
			m_sLabel = sLabel;
			m_bmp.bitmapData = getSicBead(m_sLabel);
			m_bmp.width = 20;
			m_bmp.height = 21;
			m_bmp.smoothing = true;
			//骰宝默认显示数字，不需要切换语言
//			onChangeLanguage();
		}
		
		override public function onChangeLanguage():void{
			if(m_bmp){
//				m_bmp.bitmapData = getSicBead(m_sLabel);
				switch(m_sLabel){
					case D:
						m_bmp.bitmapData = BitmapManager.getInstance().getBmpdBead(Define.BEAD_DAN);
						break;
					
					case F:
						m_bmp.bitmapData = BitmapManager.getInstance().getBmpdBead(Define.BEAD_SHUANG);
						break;
				}
				m_bmp.width = 20;
				m_bmp.height = 21;
				m_bmp.smoothing = true;
			}else{
				trace("设置珠子位图异常...");
			}
			
		}
		
		public function getSicBead( str:String ):BitmapData {
			LobbyData.getInstance().beadRoad_sic.tf_0.text = str;
			LobbyData.getInstance().beadRoad_sic.tf_0.autoSize = TextFieldAutoSize.LEFT;		
			
			return BitmapUtil.snapshot(LobbyData.getInstance().beadRoad_sic);
		}
		
		
	}
}