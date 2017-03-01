/**
 * 帧刷新器
 */
class JFramer extends egret.HashObject implements IJuggle
{
	private static framerPool:Array<JFramer> = new Array<JFramer>();
	private isStarting:boolean = false;
	private frameHandler:Function;
	private thisArg:Object;

	public name:String = "";


	public constructor() 
	{
		super();
		this.name = "JFramer";
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
	}
	public dispose():void
	{
		this.stop();
		this.thisArg = null;
		this.frameHandler = null;
		if(JFramer.framerPool.indexOf(this)<0)
			JFramer.framerPool.push(this);
	}
	public static getFramer():JFramer
	{
		var $framer:JFramer;
		if(JFramer.framerPool.length>0)
		{
			$framer = JFramer.framerPool.shift();
		}else $framer = new JFramer();
		return $framer;
	}
	public get running():Boolean{return this.isStarting;}
	public toString():String
	{
		return "[Object JFramer name="+name+"]";
	}
}