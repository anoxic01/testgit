class JTimer extends egret.HashObject implements IJuggle
{
	
	private static timerPool:Array<JTimer> = new Array<JTimer>();
	protected juggleTick:JuggleAdvanceTick;
	public name:string = "";
	protected timeHandler:Function = null;
	private thisArg:Object;
	protected completeHandler:Function = null;
	private _repeatCount:number = -1;
	private isStarting:boolean = false;
	private lastSetRepeatCount:number = -1;
	private _currentCount:number = 0;
	/**
	 * 
	 * @param interval
	 * @param timeHandler
	 * 
	 */	
	public constructor(delay:number,repeatCount:number=-1) 
	{
		super();
		this.name = "JTimer";
		this.juggleTick = new JuggleAdvanceTick();
		this.juggleTick.setTick(this.onRenderer,this);
		if(delay<=0)delay = Number.MAX_VALUE;
		this.delay = delay;
		this.repeatCount = repeatCount;
	}	
	public addTimerCallback(tick:Function,timeComplete:Function=null,thisArg:Object):void
	{
		this.timeHandler = tick;
		this.completeHandler = timeComplete;
		this.thisArg = thisArg;
	}
	private onRenderer():void
	{
		if(this.isStarting==false)return;
		this._currentCount++;
		if(this.timeHandler!=null)
		{
			if(this.timeHandler.length==0)
			{
				this.timeHandler.apply(this.thisArg);
			}else 
			{
				this.timeHandler.apply(this.thisArg,this);
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
					if(this.completeHandler.length==0)
					{
						this.completeHandler.apply(this.thisArg);
					}else 
					{
						this.completeHandler.apply(this.thisArg,this);
					}
				}
			}
		}
	}
	public start():void
	{
		this.repeatCount = this.lastSetRepeatCount;
		if(this.isStarting)return;
		JuggleManager.instance.addJuggle(this);
		this.isStarting = true;
	}
	public stop():void
	{
		if(!this.isStarting)return;
		this.isStarting = false;
		JuggleManager.instance.removeJuggle(this);
	}
	public reset():void
	{
		this.stop();
		this.juggleTick.clear();
		this.repeatCount = this.lastSetRepeatCount;
	}
	public set repeatCount(value:number)
	{
		this._repeatCount = value;
		this.lastSetRepeatCount = this._repeatCount;
	}
	public set delay(value:number)
	{
		this.juggleTick.juggleInterval = value;
	}
	public get delay():number{return this.juggleTick.juggleInterval;}
	public get running():Boolean{return this.isStarting;}
	public onJuggle(value:number):void
	{
		this.juggleTick.onJuggle(value);
	}
	public get repeatCount():number{return this._repeatCount;}
	public get currentCount():number{return this._currentCount;}
	
	public dispose():void
	{
		this.stop();
		this.delay = Number.MAX_VALUE;
		this.repeatCount = -1;
		this.juggleTick.clear();
		this.completeHandler = null;
		this.name = "";
		this._currentCount = 0;
		this.timeHandler = null;
		this.lastSetRepeatCount = -1;
		if(JTimer.timerPool.indexOf(this)<0)
		{
			JTimer.timerPool.push(this);
		}
	}
	/**
	 * 从对象池内获取一个定时器
	 */		
	public static getTimer(delay:number,repeatCount:number=-1):JTimer
	{
		var $timer:JTimer;
		if(JTimer.timerPool.length>0)
		{
			$timer = JTimer.timerPool.shift();
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