/**
 * 延时到下一帧执行
 */
class JDelayFramer extends egret.HashObject implements IJuggle
{
	private static framerPool:Array<JDelayFramer> = new Array<JDelayFramer>();
	private isStarting:boolean = false;
	private frameHandler:Function;
	private thisArg:Object;
	public name:String = "";

	public constructor() 
	{
		super();
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
		if(this.frameHandler!=null)
		{
			this.frameHandler.apply(this.thisArg);
		}
		this.dispose();
	}


	public dispose():void
	{
		JDelayFramer.delayFramerDict.delete(this.thisArg);
		this.stop();
		this.thisArg = null;
		this.frameHandler = null;
		if(JDelayFramer.framerPool.indexOf(this)<0)
			JDelayFramer.framerPool.push(this);
	}
	public static getJDelayFramer():JDelayFramer
	{
		var $framer:JDelayFramer;
		if(JDelayFramer.framerPool.length>0)
		{
			$framer = JDelayFramer.framerPool.shift();
		}else $framer = new JDelayFramer();
		return $framer;
	}
	public toString():String
	{
		return "[Object JFramer name="+name+"]";
	}


	private static delayFramerDict:Dictionary = new Dictionary();
	public static delayFrame(tick:Function,thisArg:Object)
	{
		if(JDelayFramer.delayFramerDict.get(thisArg)==tick)
		{
			return;
		}
		let framer:JDelayFramer = JDelayFramer.getJDelayFramer();
		JDelayFramer.delayFramerDict.add(thisArg,tick);
		framer.addFramerCallback(tick,thisArg);
		framer.start();
	}
}