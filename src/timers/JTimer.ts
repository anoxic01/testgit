module timers {
	export class JTimer implements iface.IJuggle{
		private static timerPool = new Array<JTimer>();
		protected juggleTick;

		public name:String = "";
		protected timeHandler:Function = null;
		protected completeHandler:Function = null;
		private _repeatCount:number = -1;
		private isStarting:Boolean = false;
		private lastSetRepeatCount:number = -1;
		private tickArgs = null;
		private completeArgs = null;
		
		private _currentCount:number = 0;
		/**
		 * 
		 * @param interval
		 * @param timeHandler
		 * 
		 */	
		public constructor(delay:number,repeatCount:number=-1) {

			this.name = "JTimer";
			this.juggleTick = new item.JuggleAdvanceTick();
			this.juggleTick.onTick = this.onRenderer;
			if(delay<=0)delay = define.Define.MAX_VALUE;
			this.delay = delay;
			this.repeatCount = repeatCount;
		}
		public addTimerCallback(tick:Function,timeComplete:Function=null,tickArgs=null,completeArgs=null):void
		{
			this.timeHandler = tick;
			this.completeHandler = timeComplete;
			this.tickArgs = tickArgs;
			this.completeArgs = completeArgs;
		}
		private onRenderer():void
		{
			if(this.isStarting==false)return;
			this._currentCount++;
			if(this.timeHandler!=null)
			{
				if(this.tickArgs==null)
				{
					if(this.timeHandler.length==0)this.timeHandler();
					else this.timeHandler(this);
				}else
				{
					this.timeHandler.apply(null,this.tickArgs);
				}
			}
			if(this.repeatCount>0)
			{
				this._repeatCount--;
				if(this.repeatCount==0)
				{
					this.stop();
					if(this.completeHandler!=null)
					{
						if(this.completeArgs==null)
						{
							if(this.completeHandler.length==0)this.completeHandler();
							else this.completeHandler(this);
						}else
						{
							this.completeHandler.apply(null,this.completeArgs);
						}
					}
				}
			}
		}
		public start():void
		{
			this.repeatCount = this.lastSetRepeatCount;
			if(this.isStarting)return;
			manager.JuggleManager.instance.addJuggle(this);
			this.isStarting = true;
		}
		public stop():void
		{
			if(!this.isStarting)return;
			this.isStarting = false;
			manager.JuggleManager.instance.removeJuggle(this);
		}
		public reset():void
		{
			this.stop();
			this.juggleTick.clear();
			this.repeatCount = this.lastSetRepeatCount;
		}
		set repeatCount(value:number)
		{
			this._repeatCount = value;
			this.lastSetRepeatCount = this._repeatCount;
		}
		set delay(value:number)
		{
			this.juggleTick.juggleInterval = value;
		}
		get delay():number{return this.juggleTick.juggleInterval;}
		get running():Boolean{return this.isStarting;}
		public onJuggle(value:number):void{this.juggleTick.onJuggle(value);}
		get repeatCount():number{return this._repeatCount;}
		get currentCount():number{return this._currentCount;}
		
		public dispose():void
		{
			this.stop();
			this.delay = define.Define.MAX_VALUE;
			this.repeatCount = -1;
			this.juggleTick.clear();
			this.completeHandler = null;
			this.completeArgs = null;
			this.tickArgs = null;
			this.name = "";
			this._currentCount = 0;
			this.timeHandler = null;
			this.lastSetRepeatCount = -1;
			if(JTimer.timerPool.indexOf(this)<0)
				JTimer.timerPool.push(this);
		}
		/**
		 * 从对象池内获取一个定时器
		 */		
		public static getTimer(delay:number,repeatCount:number=-1):JTimer
		{
			var $timer:JTimer;
			if(this.timerPool.length>0)
			{
				$timer = this.timerPool.shift();
				$timer.delay = delay;
				$timer.repeatCount = repeatCount;
			}else $timer = new JTimer(delay,repeatCount);
			return $timer;
		}
		
		public toString():String
		{
			return "[Object JTimer name="+name+" delay="+this.delay+" repeatCount="+this.lastSetRepeatCount+" tick="+this.timeHandler+" tickComplete="+this.completeHandler+"]";
		}
	}
}