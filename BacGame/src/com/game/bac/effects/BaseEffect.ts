class BaseEffect extends egret.HashObject
{
	protected target:any;
	protected onComplete:Function;
	protected thisArg:any;
	
	private _running : boolean = false;
	public get running() : boolean 
	{
		return this._running;
	}	
	public constructor(target:any) 
	{
		super();
		this.target = target;
	}

	public setComplete(v:Function,thisArg:any)
	{
		this.onComplete = v;
		this.thisArg = thisArg;
	}


	protected complete()
	{
		if(this.onComplete!=null)
		{
			this.onComplete.call(this.thisArg);
		}
		this._running = false;
		this.end();
		this.dispose();
	}

	

	public start()
	{
		this._running = true;
	}

	public stop()
	{
		this._running = false;
	}

	public end()
	{
		this._running = false;
		this.stop();
	}

	public dispose()
	{
		this._running = false;
		this.target = null;
		this.onComplete = null;
		this.thisArg = null;
	}
}