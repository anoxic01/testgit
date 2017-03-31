module ui.button {
	export class ButtonChip extends lobby.view.BSprite{
		
		private m_mcAsset 	;
		private m_mcContent	;
		
		private m_mcSelect	;
		
		public bSelect		:	 boolean;
		
		public constructor(_mcAsset) {
			super();
			this.m_mcAsset = _mcAsset;
			
			this.m_mcContent = new egret.MovieClip(_mcAsset.mc_content);
			this.initContent();
			
			this.addChild(this.m_mcAsset);
			this.m_mcAsset.mc_hot.buttonMode = true;
			this.m_mcAsset.mc_content.mouseChildren = false;
			this.m_mcAsset.mc_content.mouseEnabled = false;
			
			this.m_mcAsset.mc_hot.addEventListener(mouse.MouseEvent.MOUSE_OVER,this.over);
			this.m_mcAsset.mc_hot.addEventListener(mouse.MouseEvent.MOUSE_OUT,this.out);
			this.m_mcAsset.mc_hot.addEventListener(egret.TouchEvent.TOUCH_BEGIN,this.down);
			
		}
		
		public destroy():void{
			this.m_mcAsset.mc_hot.removeEventListener(mouse.MouseEvent.MOUSE_OVER,this.over);
			this.m_mcAsset.mc_hot.removeEventListener(mouse.MouseEvent.MOUSE_OUT,this.out);
			this.m_mcAsset.mc_hot.removeEventListener(egret.TouchEvent.TOUCH_BEGIN,this.down);
			
			if(this.m_mcAsset){
				this.removeChild(this.m_mcAsset);
				this.m_mcAsset = null;
			}
		}
		set  select(_bValue: boolean){
			this.bSelect = _bValue;
			if(this.bSelect){
				this.m_mcContent.gotoAndPlay("SELECT");
			}else{
				this.m_mcContent.gotoAndPlay("UNSELECT");
			}
			
		}
		
		protected over(event:MouseEvent):void
		{
			if(this.bSelect){
				return;
			}
			this.m_mcContent.gotoAndPlay("HOVER");
		}
		
		protected out(event:MouseEvent):void
		{
			if(this.bSelect){
				return;
			}
			this.m_mcContent.gotoAndPlay("HOUT");
		}
		
		protected down(event:MouseEvent):void
		{
			if(this.bSelect){
				return;
			}
			this.m_mcContent.gotoAndPlay("HDOWN");
		}
		
		
		private initContent():void{
			this.m_mcContent.gotoAndStop("DEFAULT");
			
			this.m_mcContent.addFrameScript(3,function():void{
				if(this.m_mcContent){
					this.m_mcContent.gotoAndStop(4);
				}
			});
			this.m_mcContent.addFrameScript(5,function():void{
				if(this.m_mcContent){
					this.m_mcContent.gotoAndStop(6);
				}
			});
			this.m_mcContent.addFrameScript(43,function():void{
				if(this.m_mcContent){
					this.m_mcContent.gotoAndStop(44);
				}
			});
			this.m_mcContent.addFrameScript(46,function():void{
				if(this.m_mcContent){
					this.m_mcContent.gotoAndStop(47);
				}
			});
			this.m_mcContent.addFrameScript(36,function():void{
				if(this.m_mcContent){
					this.m_mcContent.currentFrame = 16;
				}
			});
		}
		
	}
}