class JDelayTimer extends egret.HashObject implements IJuggle
{
	private static tickerPool:Array<JDelayTimer> = new Array<JDelayTimer>();
	protected juggleTick:JuggleAdvanceTick;
	public name:string = "";
	private isStarting:boolean = false;
	private frameHandler:Function;
	private thisArg:Object;
	public constructor() 
	{
		super();
		this.name = "JFrameTicker";
		this.juggleTick = new JuggleAdvanceTick();
		this.juggleTick.setTick(this.onRenderer,this);
		this.setDelay(1000);
	}
	public start():void
	{
		
		JuggleManager.instance.addJuggle(this);
		this.isStarting = true;
	}
	public stop():void
	{
		this.isStarting = false;
		JuggleManager.instance.removeJuggle(this);
	}
	public onJuggle(value:number)
	{
		this.juggleTick.onJuggle(value);
	}

	public setDelay(value:number)
	{
		this.juggleTick.juggleInterval = value;
	}
	private onRenderer():void
	{
		if(this.frameHandler!=null)
		{
			this.frameHandler.apply(this.thisArg);
		}
		this.dispose();
	}

	public addTimerCallback(tick:Function,thisArg:Object):void
	{
		this.frameHandler = tick;
		this.thisArg = thisArg;
	}

	public dispose():void
	{
		JDelayTimer.delayTimerDict.delete(this.thisArg);
		this.stop();
		this.thisArg = null;
		this.frameHandler = null;
		if(JDelayTimer.tickerPool.indexOf(this)<0)
			JDelayTimer.tickerPool.push(this);
	}

	
	private static delayTimerDict:Dictionary = new Dictionary();
	public static delayTime(tick:Function,thisArg:Object,delay:number)
	{
		if(JDelayTimer.delayTimerDict.get(thisArg)==tick)
		{
			return;
		}
		let timer:JDelayTimer = JDelayTimer.getJDelayFramer();
		JDelayTimer.delayTimerDict.add(thisArg,tick);
		timer.addTimerCallback(tick,thisArg);
		timer.setDelay(delay);
		timer.start();
	}
	public static getJDelayFramer():JDelayTimer
	{
		var $framer:JDelayTimer;
		if(JDelayTimer.tickerPool.length>0)
		{
			$framer = JDelayTimer.tickerPool.shift();
		}else $framer = new JDelayTimer();
		return $framer;
	}
	public toString():String
	{
		return "[Object JFramer name="+name+"]";
	}
}