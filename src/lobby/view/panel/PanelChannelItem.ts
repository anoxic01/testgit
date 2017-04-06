module lobby.view.panel {
	export class PanelChannelItem {
	
		public uID 			:	number;
		public mcAsset 		;
		private m_bSelect	:	boolean;
		
		public constructor(_mcAsset, _id:number) {
			this.mcAsset = _mcAsset;
			this.uID = _id;
			
			this.mcAsset.alpha = 1;
			this.mcAsset.gotoAndStop("DEFAULT");
			this.mcAsset.buttonMode = true;
			this.mcAsset.mouseChildren = false;
	//		this.m_mcAsset.tf_label.text = String(uID);
			this.mcAsset.addEventListener(mouse.MouseEvent.MOUSE_OVER, this.over);
			this.mcAsset.addEventListener(mouse.MouseEvent.MOUSE_OUT, this.out);
		}

		public destroy():void{
			if(this.mcAsset){
				this.mcAsset.buttonMode = false;
				this.mcAsset.removeEventListener(mouse.MouseEvent.MOUSE_OVER, this.over);
				this.mcAsset.removeEventListener(mouse.MouseEvent.MOUSE_OUT, this.out);
				this.mcAsset = null;
			}
		}
		
		set  select(_bValue: boolean){
			if(_bValue != this.m_bSelect){
				this.m_bSelect = _bValue;
				
				if(this.m_bSelect){
					this.mcAsset.gotoAndStop("HOVER");
				}else{
					this.mcAsset.gotoAndStop("DEFAULT");
				}
			}
		}
		
		get select(): boolean{
			return this.m_bSelect;
		}
		
		
		protected over(event:MouseEvent):void
		{
			if(this.m_bSelect){
				return;
			}
			this.mcAsset.gotoAndStop("HOVER");
		}
		
		protected out(event:MouseEvent):void
		{
			if(this.m_bSelect){
				return;
			}
			this.mcAsset.gotoAndStop("DEFAULT");
		}
		
		
	}
}