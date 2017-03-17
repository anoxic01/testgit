module lobby.view.bet {
	export class BetSelectButton {
		
		private var mc:MovieClip;
		

		private var onClick:Function;
		private var isPlayEffect:Boolean = false;
		private var isEnable:Boolean = true;
		private var hasHDOWN:Boolean = false;
		private var hasCLICK:Boolean = false;
		public var clickEffectComplete:Function;
		private var clickEffectMC:MovieClip;
		
		public constructor(mc:MovieClip,onClick:Function) {
			this.mc = mc;
			this.onClick = onClick;
			mc.addEventListener(MouseEvent.MOUSE_DOWN,onMouseHandler);
			mc.addEventListener(MouseEvent.MOUSE_UP,onMouseHandler);
			mc.addEventListener(MouseEvent.ROLL_OVER,onMouseHandler);
			mc.addEventListener(MouseEvent.ROLL_OUT,onMouseHandler);
			this.mc.buttonMode = true;
			this.mc.useHandCursor = true;
			
			for (var i:int = 0; i < mc.currentLabels.length; i++) 
			{
				if((mc.currentLabels[i] as FrameLabel).name=="HDOWN")
				{
					hasHDOWN = true;
				}else if((mc.currentLabels[i] as FrameLabel).name=="CLICK")
				{
					hasCLICK = true;
				}
			}	
		}
		
		private function onMouseHandler(e:MouseEvent):void
		{
			if(!isEnable||!mc)return;
			if(e.type==MouseEvent.MOUSE_DOWN)
			{
				if(hasHDOWN)
				{
					mc.gotoAndStop("HDOWN");
				}else if(hasCLICK)
				{
					mc.gotoAndStop("CLICK");
					if(mc.effectContent)
					{
						clickEffectMC = mc.effectContent;
						isPlayEffect = true;
						//clickable = false;
						if(LobbyManager.getInstance().uRenderMode==1)
						{
							//////   低配版本取消动画特效
							clickEffectMC.gotoAndStop(clickEffectMC.totalFrames-1);
							onClickEffectPlayComplete();
						}else
						{
							clickEffectMC.addFrameScript(mc.effectContent.totalFrames-1,onClickEffectPlayComplete);
							clickEffectMC.gotoAndPlay(1);
						}
					}
					if(onClick!=null)onClick(e);
				}
			}else if(e.type==MouseEvent.MOUSE_UP)
			{
				if(hasHDOWN)
				{
					if(isPlayEffect==false)
					{
						mc.gotoAndStop("DEFAULT");
					}
					if(onClick!=null)onClick(e);
				}
			}else if(e.type==MouseEvent.ROLL_OVER)
			{
				if(!isPlayEffect)
				{
					mc.gotoAndStop("HOVER");
					if(LobbyManager.getInstance().uRenderMode==1)
					{
						/////  低配版本，取消动画特效
						stopMovieClip(mc);
					}
				}
			}else if(e.type==MouseEvent.ROLL_OUT)
			{
				if(!isPlayEffect)
				{
					mc.gotoAndStop("DEFAULT");
				}
			}
			e.stopImmediatePropagation();
		}
		private function stopMovieClip(m:MovieClip):void
		{
			if(m==null)return;
			for (var j:int = 0; j < m.numChildren; j++) 
			{
				var mc:MovieClip = m.getChildAt(j) as MovieClip;
				if(mc)
				{
					mc.gotoAndStop(mc.totalFrames-1);
					stopMovieClip(mc);
				}
			}
		}
		
		private function onClickEffectPlayComplete():void
		{
			isPlayEffect = false;
			clickEffectMC&&clickEffectMC.stop();
			clickEffectMC = null;
			if(!mc)return;
			if(isEnable)mc.gotoAndStop("DEFAULT");
			else mc.gotoAndStop("DISABLE");
			if(clickEffectComplete!=null)
				clickEffectComplete();
		}
		
		public function enable(isEnable:Boolean):void
		{
			this.isEnable = isEnable;
			if(!isPlayEffect)
			{
				clickable = isEnable;
				if(isEnable)
				{
					mc.gotoAndStop("DEFAULT");
				}else
				{
					mc.gotoAndStop("DISABLE");
				}
			}
		}
		public function get clickable():Boolean
		{
			if(!mc)return false;
			return mc.mouseEnabled&&mc.mouseChildren;
		}
		public function set clickable(value:Boolean):void
		{
			if(!mc)return;
			mc.mouseEnabled = value;
			mc.mouseChildren = value;
		}
		public function destroy():void
		{
			if(!mc)return;
			mc.removeEventListener(MouseEvent.MOUSE_DOWN,onMouseHandler);
			mc.removeEventListener(MouseEvent.ROLL_OVER,onMouseHandler);
			mc.removeEventListener(MouseEvent.ROLL_OUT,onMouseHandler);
			mc.removeEventListener(MouseEvent.CLICK,onMouseHandler);
			onClick=null;
			clickEffectMC&&clickEffectMC.stop();
			clickEffectComplete = null;
			clickEffectMC = null;
			mc = null;
		}
		public function onChangeLanguage(index:int):void
		{
			if(mc==null)return;
			mc.mc_label.gotoAndStop(index+1);
		}
	}
}