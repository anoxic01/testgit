module lobby.view.panel {
	export class PanelTableSettingSelectItem extends BSprite{

		private  m_mcAsset 	;
		private m_bSelect	:	boolean;
		public uType		:	number;
		
		public constructor(_mc, _uType:number) {
			super();

			this.m_mcAsset = _mc;
			this.uType = _uType;
			
			this.m_mcAsset.buttonMode = true;
			this.m_mcAsset.addEventListener(mouse.MouseEvent.MOUSE_OVER,this.over);
			this.m_mcAsset.addEventListener(mouse.MouseEvent.MOUSE_OUT,this.out);
			this.m_mcAsset.mouseChildren = false;
			this.m_mcAsset.gotoAndStop(1);
		}

		public destroy():void{
			this.m_mcAsset.removeEventListener(mouse.MouseEvent.MOUSE_OVER,this.over);
			this.m_mcAsset.removeEventListener(mouse.MouseEvent.MOUSE_OUT,this.out);
			
			if( this.m_mcAsset){
				this.m_mcAsset = null;
			}
		}
		set  select(_bValue: boolean){
			if(this.m_bSelect!=_bValue){
				this.m_bSelect = _bValue;
				this.m_mcAsset.gotoAndStop(this.m_bSelect?2:1);
			}
			
		}
		
		protected over(event:MouseEvent):void
		{
			if(this.m_bSelect){
				return;
			}
			this.m_mcAsset.gotoAndStop(2);
		}
		
		protected out(event:MouseEvent):void
		{
			if(this.m_bSelect){
				return;
			}
			this.m_mcAsset.gotoAndStop(1);
		}
	}
}