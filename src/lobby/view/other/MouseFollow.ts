module lobby.view.other {
	export class MouseFollow  extends BFrame{
		private m_bmpAsset	;
		
		public constructor() {
			super();
			
			this.m_bmpAsset = new egret.Bitmap();
			this.addChild(this.m_bmpAsset);
			
			this.touchEnabled = false;
			this.touchChildren = false;
			this.visible = false;
		}
		 public destroy():void{
			if(this.m_bmpAsset){
				this.removeChild(this.m_bmpAsset);
				this.m_bmpAsset = null;
			}
		}
		
		set  bitmapdata(_bmpd){
			this.m_bmpAsset.bitmapData = _bmpd;
			this.m_bmpAsset.smoothing = true;
			if(this.m_bmpAsset.bitmapData==null){
				return;
			}
			this.m_bmpAsset.x = -(this.m_bmpAsset.width*0.5);
			this.m_bmpAsset.y = -(this.m_bmpAsset.height*0.5);
		}
		
		set  scale(value:number){
			this.m_bmpAsset.scaleX = this.m_bmpAsset.scaleY=value;
			
		}
		
		 public exe():void{
			this.x = this.stage.x;
			this.y = this.stage.y;
		}
		
		 public exit():void{
			manager.LobbyManager.getInstance().lobbyView.removeFrame(this);
		}
	}
}