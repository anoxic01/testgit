module ui.button {
	export class ButtonChip extends BSprite{
		
		private m_mcAsset 	:	MovieClip;
		private m_mcContent	:	MMovieClip;
		
		private m_mcSelect	:	MovieClip;
		
		public bSelect		:	 boolean;
		
		public constructor(_mcAsset:MovieClip) {
			super();
			m_mcAsset = _mcAsset;
			
			m_mcContent = new MMovieClip(_mcAsset.mc_content);
			initContent();
			
			this.addChild(m_mcAsset);
			m_mcAsset.mc_hot.buttonMode = true;
			m_mcAsset.mc_content.mouseChildren = false;
			m_mcAsset.mc_content.mouseEnabled = false;
			
			m_mcAsset.mc_hot.addEventListener(MouseEvent.MOUSE_OVER,over);
			m_mcAsset.mc_hot.addEventListener(MouseEvent.MOUSE_OUT,out);
			m_mcAsset.mc_hot.addEventListener(MouseEvent.MOUSE_DOWN,down);
			
		}
		
		public destroy():void{
			m_mcAsset.mc_hot.removeEventListener(MouseEvent.MOUSE_OVER,over);
			m_mcAsset.mc_hot.removeEventListener(MouseEvent.MOUSE_OUT,out);
			m_mcAsset.mc_hot.removeEventListener(MouseEvent.MOUSE_DOWN,down);
			
			if(m_mcAsset){
				this.removeChild(m_mcAsset);
				m_mcAsset = null;
			}
		}
		set  select(_bValue: boolean){
			bSelect = _bValue;
			if(bSelect){
				m_mcContent.gotoAndPlay("SELECT");
			}else{
				m_mcContent.gotoAndPlay("UNSELECT");
			}
			
		}
		
		protected over(event:MouseEvent):void
		{
			if(bSelect){
				return;
			}
			m_mcContent.gotoAndPlay("HOVER");
		}
		
		protected out(event:MouseEvent):void
		{
			if(bSelect){
				return;
			}
			m_mcContent.gotoAndPlay("HOUT");
		}
		
		protected down(event:MouseEvent):void
		{
			if(bSelect){
				return;
			}
			m_mcContent.gotoAndPlay("HDOWN");
		}
		
		
		private initContent():void{
			m_mcContent.gotoAndStop("DEFAULT");
			
			m_mcContent.addFrameScript(3,function():void{
				if(m_mcContent){
					m_mcContent.gotoAndStop(4);
				}
			});
			m_mcContent.addFrameScript(5,function():void{
				if(m_mcContent){
					m_mcContent.gotoAndStop(6);
				}
			});
			m_mcContent.addFrameScript(43,function():void{
				if(m_mcContent){
					m_mcContent.gotoAndStop(44);
				}
			});
			m_mcContent.addFrameScript(46,function():void{
				if(m_mcContent){
					m_mcContent.gotoAndStop(47);
				}
			});
			m_mcContent.addFrameScript(36,function():void{
				if(m_mcContent){
					m_mcContent.currentFrame = 16;
				}
			});
		}
		
	}
}