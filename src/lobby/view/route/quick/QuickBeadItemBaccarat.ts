module lobby.view.route.quick {
	export class QuickBeadItemBaccarat extends BeadItem{
		private var m_spRed		:	Sprite;		//对子标识
		private var m_spBlue	:	Sprite;		//对子标识
		private var m_sLabel	:	String;		//标签
		private var m_uMode		:	uint;		//珠子类型	0-大厅	1-转桌	2-好路通知	3-好路多桌	4-游戏	
		
		
		public constructor(_uMode:uint=0) {
		
			super();
			m_uMode = _uMode;
			
			m_spRed = new Sprite();
			this.addChild(m_spRed);
			m_spRed.graphics.beginFill(0xff0000);
			m_spRed.graphics.drawCircle(0,0,4);
			m_spRed.graphics.endFill();
			m_spRed.x = 4;
			m_spRed.y = 4;
			
			m_spBlue = new Sprite();
			this.addChild(m_spBlue);
			m_spBlue.graphics.beginFill(0x0000ff);
			m_spBlue.graphics.drawCircle(0,0,4);
			m_spBlue.graphics.endFill();
			m_spBlue.x = 16;
			m_spBlue.y = 17;
			
			
			m_spRed.visible = false;
			m_spBlue.visible = false;
		}
		
		
		override public function destroy():void{
			super.destroy();
			
			if(m_spRed){
				this.removeChild(m_spRed);
				m_spRed = null;
			}
			if(m_spBlue){
				this.removeChild(m_spBlue);
				m_spBlue = null;
			}
		}
		
		override public function setLabel(sLabel:String):void{
			m_sLabel = sLabel;
			m_spRed.visible = false;
			m_spBlue.visible = false;
			
			switch(m_sLabel){
				case B:
				case F:
				case J:
					m_spRed.visible = true;
					break;
				case C:
				case G:
				case K:
					m_spBlue.visible = true;
					break;
				case D: 
				case H:
				case L:
					m_spRed.visible = true;
					m_spBlue.visible = true;
					break;
			}
			
			onChangeLanguage();
		}
		
		override public function onChangeLanguage():void{
			if(m_bmp){
				switch(m_sLabel){
					case A:
					case B:
					case C:
					case D:
						m_bmp.bitmapData = BitmapManager.getInstance().getBmpdBead(Define.BEAD_BANKER);
						break;
					
					case E:
					case F:
					case G:
					case H:
						m_bmp.bitmapData = BitmapManager.getInstance().getBmpdBead(Define.BEAD_PLAYER);
						break;
					
					case I:
					case J:
					case K:
					case L:
						m_bmp.bitmapData = BitmapManager.getInstance().getBmpdBead(Define.BEAD_TIE);
						break;
					
				}
				m_bmp.smoothing = true;
				m_bmp.width = 20;
				m_bmp.height = 21;
			}else{
				trace("设置珠子位图异常...");
			}
			
		}
		
		
	}
}