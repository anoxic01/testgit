module lobby.view.other {
	export class MouseFollow  extends BFrame{
		private m_bmpAsset	:	Bitmap;
		
		public constructor() {
			super();
			
			m_bmpAsset = new Bitmap();
			this.addChild(m_bmpAsset);
			
			this.mouseEnabled = false;
			this.mouseChildren = false;
			this.visible = false;
		}
		 public destroy():void{
			if(m_bmpAsset){
				this.removeChild(m_bmpAsset);
				m_bmpAsset = null;
			}
		}
		
		set  bitmapdata(_bmpd:BitmapData){
			m_bmpAsset.bitmapData = _bmpd;
			m_bmpAsset.smoothing = true;
			if(m_bmpAsset.bitmapData==null){
				return;
			}
			m_bmpAsset.x = -int(m_bmpAsset.width*0.5);
			m_bmpAsset.y = -int(m_bmpAsset.height*0.5);
		}
		
		set  scale(value:Number){
			m_bmpAsset.scaleX = m_bmpAsset.scaleY=value;
			
		}
		
		 public exe():void{
			this.x = stage.mouseX;
			this.y = stage.mouseY;
		}
		
		 public exit():void{
			
			LobbyManager.getInstance().lobbyView.removeFrame(this);
		}
	}
}