module lobby.view.route {
	export class BeadItemBaccarat extends BeadItem{
		private m_spRed		:	Sprite;		//对子标识
		private m_spBlue	:	Sprite;		//对子标识
		private m_uMode		:	number;		//珠子类型	0-大厅	1-转桌	2-好路通知	3-好路多桌	4-游戏	
		
		public constructor(_uMode:number=0) {
		
			super();
			m_uMode = _uMode;
			
			m_spRed = ResourceManager.getInstance().getInstanceByNameFromDomain(Define.SWF_ROAD_MAP,"Road_Pair_Red_Asset");
			m_spRed.width = 8;
			m_spRed.height =8;
			
			this.addChild(m_spRed);
			
			m_spBlue = ResourceManager.getInstance().getInstanceByNameFromDomain(Define.SWF_ROAD_MAP,"Road_Pair_Blue_Asset");
			m_spBlue.width = 8;
			m_spBlue.height =8;
			m_spBlue.x=19;
			m_spBlue.y=19;
			this.addChild(m_spBlue);
			
			m_spRed.visible = false;
			m_spBlue.visible = false;
		}
		
		 public destroy():void{
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
		
		 public setLabel(sLabel:String):void{
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
		
		 public onChangeLanguage():void{
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
			}else{
				console.log("设置珠子位图异常...");
			}
			
		}
		
	}
}