module lobby.view.bet {
	export class BetSelectButton {
		
		private mc;
		

		private onClick:Function;
		private isPlayEffect: boolean = false;
		private isEnable: boolean = true;
		private hasHDOWN: boolean = false;
		private hasCLICK: boolean = false;
		public clickEffectComplete:Function;
		private clickEffectMC;
		
		public constructor(mc,onClick:Function) {
			this.mc = mc;
			this.onClick = onClick;
			this.mc.addEventListener(egret.TouchEvent.TOUCH_BEGIN,this.onMouseHandler);
			this.mc.addEventListener(egret.TouchEvent.TOUCH_END,this.onMouseHandler);
			this.mc.addEventListener(mouse.MouseEvent.ROLL_OVER,this.onMouseHandler);
			this.mc.addEventListener(mouse.MouseEvent.ROLL_OUT,this.onMouseHandler);
			this.mc.buttonMode = true;
			this.mc.useHandCursor = true;
			
			for (var i:number= 0; i < this.mc.currentLabels.length; i++) 
			{
				if((this.mc.currentLabels[i] as egret.FrameLabel).name=="HDOWN")
				{
					this.hasHDOWN = true;
				}else if((this.mc.currentLabels[i] as egret.FrameLabel).name=="CLICK")
				{
					this.hasCLICK = true;
				}
			}	
		}
		
		private onMouseHandler(e:MouseEvent):void
		{
			if(!this.isEnable||!this.mc)return;
			if(e.type==egret.TouchEvent.TOUCH_BEGIN)
			{
				if(this.hasHDOWN)
				{
					this.mc.gotoAndStop("HDOWN");
				}else if(this.hasCLICK)
				{
					this.mc.gotoAndStop("CLICK");
					if(this.mc.effectContent)
					{
						this.clickEffectMC = this.mc.effectContent;
						this.isPlayEffect = true;
						//clickable = false;
						if(manager.LobbyManager.getInstance().uRenderMode==1)
						{
							//////   低配版本取消动画特效
							this.clickEffectMC.gotoAndStop(this.clickEffectMC.totalFrames-1);
							this.onClickEffectPlayComplete();
						}else
						{
							this.clickEffectMC.addFrameScript(this.mc.effectContent.totalFrames-1,this.onClickEffectPlayComplete);
							this.clickEffectMC.gotoAndPlay(1);
						}
					}
					if(this.onClick!=null)this.onClick(e);
				}
			}else if(e.type==egret.TouchEvent.TOUCH_END)
			{
				if(this.hasHDOWN)
				{
					if(this.isPlayEffect==false)
					{
						this.mc.gotoAndStop("DEFAULT");
					}
					if(this.onClick!=null)this.onClick(e);
				}
			}else if(e.type==mouse.MouseEvent.ROLL_OVER)
			{
				if(!this.isPlayEffect)
				{
					this.mc.gotoAndStop("HOVER");
					if(manager.LobbyManager.getInstance().uRenderMode==1)
					{
						/////  低配版本，取消动画特效
						this.stopMovieClip(this.mc);
					}
				}
			}else if(e.type==mouse.MouseEvent.ROLL_OUT)
			{
				if(!this.isPlayEffect)
				{
					this.mc.gotoAndStop("DEFAULT");
				}
			}
			e.stopImmediatePropagation();
		}
		private stopMovieClip(m):void
		{
			if(m==null)return;
			for (var j:number= 0; j < m.numChildren; j++) 
			{
				var mc:egret.MovieClip = m.getChildAt(j);
				if(mc)
				{
					this.mc.gotoAndStop(this.mc.totalFrames-1);
					this.stopMovieClip(mc);
				}
			}
		}
		
		private onClickEffectPlayComplete():void
		{
			this.isPlayEffect = false;
			this.clickEffectMC&&this.clickEffectMC.stop();
			this.clickEffectMC = null;
			if(!this.mc)return;
			if(this.isEnable)this.mc.gotoAndStop("DEFAULT");
			else this.mc.gotoAndStop("DISABLE");
			if(this.clickEffectComplete!=null)
				this.clickEffectComplete();
		}
		
		public enable($isEnable: boolean):void
		{
			this.isEnable = $isEnable;
			if(!this.isPlayEffect)
			{
				this.clickable = this.isEnable;
				if(this.isEnable)
				{
					this.mc.gotoAndStop("DEFAULT");
				}else
				{
					this.mc.gotoAndStop("DISABLE");
				}
			}
		}
		get clickable(): boolean
		{
			if(!this.mc)return false;
			return this.mc.mouseEnabled&&this.mc.mouseChildren;
		}
		set  clickable(value: boolean)
		{
			if(!this.mc)return;
			this.mc.mouseEnabled = value;
			this.mc.mouseChildren = value;
		}
		public destroy():void
		{
			if(!this.mc)return;
			this.mc.removeEventListener(egret.TouchEvent.TOUCH_BEGIN,this.onMouseHandler);
			this.mc.removeEventListener(mouse.MouseEvent.ROLL_OVER,this.onMouseHandler);
			this.mc.removeEventListener(mouse.MouseEvent.ROLL_OUT,this.onMouseHandler);
			this.mc.removeEventListener(egret.TouchEvent.TOUCH_TAP,this.onMouseHandler);
			this.onClick=null;
			this.clickEffectMC&&this.clickEffectMC.stop();
			this.clickEffectComplete = null;
			this.clickEffectMC = null;
			this.mc = null;
		}
		public onChangeLanguage(index:number):void
		{
			if(this.mc==null)return;
			this.mc.mc_label.gotoAndStop(index+1);
		}
	}
}