/**
 * 可以设置帧频的
 */
class JFrameTicker extends egret.HashObject implements IJuggle
{

	private static tickerPool:Array<JFrameTicker> = new Array<JFrameTicker>();
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
		this.setFrameRate(30);
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

	public addFramerCallback(tick:Function,thisArg:Object):void
	{
		this.frameHandler = tick;
		this.thisArg = thisArg;
	}
	public onJuggle(value:number)
	{
		this.juggleTick.onJuggle(value);
	}
	private onRenderer():void
	{
		if(this.frameHandler!=null)
		{
			this.frameHandler.apply(this.thisArg);
		}
	}
	public setFrameRate(value:number)
	{
		this.juggleTick.setFrameRate(value);
	}
	public dispose():void
	{
		this.stop();
		this.thisArg = null;
		this.frameHandler = null;
		this.setFrameRate(30);
		if(JFrameTicker.tickerPool.indexOf(this)<0)
			JFrameTicker.tickerPool.push(this);
	}
	public get running():Boolean{return this.isStarting;}
	public toString():String
	{
		return "[Object JFrameTicker name="+this.name+" frameRate="+this.juggleTick+"]";
	}
	public static getFrameTicker():JFrameTicker
	{
		var $framer:JFrameTicker;
		if(JFrameTicker.tickerPool.length>0)
		{
			$framer = JFrameTicker.tickerPool.shift();
		}else $framer = new JFrameTicker();
		return $framer;
	}
}