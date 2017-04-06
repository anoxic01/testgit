module lobby.view.route.quick {
	export class QuickBeadItemSic extends BeadItem{
		private var m_sLabel	:	string;		//标签
		
		public constructor(_uMode:number=0) {
		super();
		}
		
		 public function destroy():void{
			super.destroy();
			
		}
		
		 public function setLabel(sLabel:string):void{
			m_sLabel = sLabel;
			m_bmp.bitmapData = getSicBead(m_sLabel);
			m_bmp.width = 20;
			m_bmp.height = 21;
			m_bmp.smoothing = true;
			//骰宝默认显示数字，不需要切换语言
//			onChangeLanguage();
		}
		
		 public function onChangeLanguage():void{
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
				console.log("设置珠子位图异常...");
			}
			
		}
		
		public function getSicBead( str:string ):BitmapData {
			LobbyData.getInstance().beadRoad_sic.tf_0.text = str;
			LobbyData.getInstance().beadRoad_sic.tf_0.autoSize = TextFieldAutoSize.LEFT;		
			
			return util.bitmap.util.bitmap.BitmapUtil.snapshot(LobbyData.getInstance().beadRoad_sic);
		}
		
		
	}
}