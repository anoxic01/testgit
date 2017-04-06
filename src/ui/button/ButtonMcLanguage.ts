module ui.button {
	export class ButtonMcLanguage implements iface.ISprite{
		private m_mcLabel		;
		private m_mcLabel2		;
		public mcAsset			;
		private m_fClick		:	Function;
		private m_bSelectStatus	:	boolean;
		
		public constructor(_mcAsset, _fClick:Function) {
			this.mcAsset = _mcAsset;
			this.m_fClick = _fClick;
			
			this.m_mcLabel = this.mcAsset.getChildByName("mc_label") ;
			this.m_mcLabel2 = this.mcAsset.getChildByName("mc_label2") ;
			
			this.mcAsset.gotoAndStop("DEFAULT");
			this.mcAsset.buttonMode = true;
			this.mcAsset.mouseChildren = false;
			
			if( this.m_mcLabel ){
				this.m_mcLabel.gotoAndStop(1);
			}
			if( this.m_mcLabel2 ){
				this.m_mcLabel2.visible=false;
				this.m_mcLabel2.gotoAndStop(1);
			}
			this.addEvent();
		}
		
		public destroy():void
		{
			this.removeEvent();
			if(this.m_fClick ){
				this.m_fClick=null;
			}
			if(this.m_mcLabel){
				this.m_mcLabel = null;
			}
			if(this.mcAsset){
				this.mcAsset = null;
			}
		}
		
		public setSelectedStatus(bStatus:boolean) : void
		{
			var _iIndex  = 0;
			
			this.m_bSelectStatus = bStatus;
			
			if(this.mcAsset){
				this.mcAsset.gotoAndStop(bStatus ? ("SELECT") : ("DEFAULT"));
			}
			
		}
		
		
		protected addEvent() : void
		{
			if(this.mcAsset){
				this.mcAsset.addEventListener(mouse.MouseEvent.MOUSE_OVER, this.over);
				this.mcAsset.addEventListener(mouse.MouseEvent.MOUSE_OUT, this.out);
				this.mcAsset.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.down);
				this.mcAsset.addEventListener(egret.TouchEvent.TOUCH_END, this.up);
				this.mcAsset.addEventListener(egret.TouchEvent.TOUCH_TAP, this.click);
			}
			
		}
		
		protected removeEvent() : void
		{
			if(this.mcAsset){
				this.mcAsset.removeEventListener(mouse.MouseEvent.MOUSE_OVER, this.over);
				this.mcAsset.removeEventListener(mouse.MouseEvent.MOUSE_OUT, this.out);
				this.mcAsset.removeEventListener(egret.TouchEvent.TOUCH_BEGIN, this.down);
				this.mcAsset.removeEventListener(egret.TouchEvent.TOUCH_END, this.up);
				this.mcAsset.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.click);
			}
			
		}
		
		public onChangeLanguage(_iLang):void{
			if(_iLang){
				if(this.m_mcLabel){
					this.m_mcLabel.gotoAndStop(_iLang);
				}
				if (this.m_mcLabel2){
					this.m_mcLabel2.gotoAndStop(_iLang);
				}
				
			}
		}
		
		public enable(bValue:boolean) : void{
			var _bDisabled:boolean = false;
			if (this.mcAsset)
			{
				this.mcAsset.gotoAndStop(bValue ? ("DEFAULT") : ("DISABLE"));
				this.mcAsset.mouseEnabled = bValue;
				this.mcAsset.enabled = bValue;
				this.mcAsset.mouseChildren = bValue;
				this.mcAsset.buttonMode = bValue;
				if(this.m_mcLabel2){
					if(bValue){
						this.m_mcLabel.visible=true;
						this.m_mcLabel2.visible=false;
					}else{
						this.m_mcLabel.visible=false;
						this.m_mcLabel2.visible=true;
					
					}
				}
				
			}
			
		
		}
		
		protected over(event:MouseEvent) : void
		{
			if (this.mcAsset && !this.m_bSelectStatus)
			{
				this.mcAsset.gotoAndStop("HOVER");
			}
		}
		
		protected out(event:MouseEvent) : void
		{
			if (this.mcAsset && this.mcAsset.enabled && !this.m_bSelectStatus)
			{
				this.mcAsset.gotoAndStop("DEFAULT");
			}
		}
		
		protected down(event:MouseEvent) : void
		{
			
		}
		
		protected up(event:MouseEvent) : void
		{
			
		}
		
		protected click(event:MouseEvent) : void
		{
			if(!this.m_bSelectStatus && this.m_fClick!=null){
				this.m_fClick(event);
			}
		}
	}
}