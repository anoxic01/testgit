module lobby.view.other {
	export class MouseFollow  extends BFrame{
		private var m_bmpAsset	:	Bitmap;
		
		public constructor() {
			super();
			
			m_bmpAsset = new Bitmap();
			this.addChild(m_bmpAsset);
			
			this.mouseEnabled = false;
			this.mouseChildren = false;
			this.visible = false;
		}
		override public function destroy():void{
			if(m_bmpAsset){
				this.removeChild(m_bmpAsset);
				m_bmpAsset = null;
			}
		}
		
		public function set bitmapdata(_bmpd:BitmapData):void{
			m_bmpAsset.bitmapData = _bmpd;
			m_bmpAsset.smoothing = true;
			if(m_bmpAsset.bitmapData==null){
				return;
			}
			m_bmpAsset.x = -int(m_bmpAsset.width*0.5);
			m_bmpAsset.y = -int(m_bmpAsset.height*0.5);
		}
		
		public function set scale(value:Number):void{
			m_bmpAsset.scaleX = m_bmpAsset.scaleY=value;
			
		}
		
		override public function exe():void{
			this.x = stage.mouseX;
			this.y = stage.mouseY;
		}
		
		override public function exit():void{
			
			LobbyManager.getInstance().lobbyView.removeFrame(this);
		}
	}
}