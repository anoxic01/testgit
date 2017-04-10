class JuggleManager 
{
	private static _instance:JuggleManager;
	public static get instance():JuggleManager
	{
		if(this._instance==null)this._instance = new JuggleManager;
		return this._instance;
	}
	private juggleDict:Dictionary = new Dictionary();
	private juggles:Array<IJuggle>;
	private currentJuggleTime:number = 0;
	private lastJuggleTime:number = 0;
	private juggleTimer:any;
	private isStartJuggle:boolean = false;
	private _useEnterFrame:boolean = false;

	public constructor() 
	{
		this.juggles = new Array<IJuggle>();
	}


	public addJuggle(juggle:IJuggle):void
	{
		if(this.juggleDict.get(juggle)!=null)return;
		this.juggleDict.add(juggle,true);
		this.juggles.push(juggle);
		if(this.juggles.length>0)
		{
			this.startJuggle();
		}
	}
	public removeJuggle(juggle:IJuggle):void
	{
		if(this.juggleDict.get(juggle)==null)return;
		this.juggleDict.delete(juggle);
		var index:number = this.juggles.indexOf(juggle);
		if(index>-1)this.juggles.splice(index,1);
		if(this.juggles.length<=0)
		{
			this.stopJuggle();
		}
	}
	/**
	 * 开启
	 */		
	private startJuggle():void
	{
		if(this.isStartJuggle)return;
		this.isStartJuggle = true;
		this.lastJuggleTime = egret.getTimer();
		this.startTimer();
	}
		
	private startTimer():void
	{
		if(this.useEnterFrame)
		{
			if(this.juggleTimer==null)this.juggleTimer = new egret.Sprite();
			this.juggleTimer.removeEventListener(egret.Event.ENTER_FRAME,this.onJuggle,this);
			this.juggleTimer.addEventListener(egret.Event.ENTER_FRAME,this.onJuggle,this);
		}else
		{
			if(this.juggleTimer==null)
			{
				this.juggleTimer = new egret.Timer(33);
				this.juggleTimer.addEventListener(egret.TimerEvent.TIMER,this.onJuggle,this);
			}
			this.juggleTimer.start();
		}
	}
	/**
	 * 停止
	 */		
	private stopJuggle():void
	{
		if(this.isStartJuggle==false)return;
		this.isStartJuggle = false;
		this.stopTimer();
	}
	private stopTimer():void
	{
		if(this.juggleTimer==null)return;
		if(this.useEnterFrame)
		{
			this.juggleTimer.removeEventListener(egret.Event.ENTER_FRAME,this.onJuggle,this);
		}else
		{
			this.juggleTimer.stop();
		}
	}
		
	private onJuggle(e?:any):void
	{
		let currentTime:number = egret.getTimer();
		this.currentJuggleTime = currentTime - this.lastJuggleTime;
		if(this.currentJuggleTime>1000)
		{
			this.currentJuggleTime = 0;
		}
		this.juggles.forEach(element => {
			element.onJuggle(this.currentJuggleTime);
		});
		this.lastJuggleTime = currentTime;
	}
	/**
	 *默认使用Enterframe作为计时，如果为false则使用timer 
	*/
	public get useEnterFrame():boolean
	{
		return this._useEnterFrame;
	}	
	public set useEnterFrame(value:boolean)
	{
		if(this._useEnterFrame==value)return;
		this.stopJuggle();//// 停止原有的计时器
		if(this._useEnterFrame==false&&this.juggleTimer!=null)
		{
			this.juggleTimer.removeEventListener(egret.TimerEvent.TIMER,this.onJuggle,this);
		}
		this.juggleTimer = null;///// 置空原有计时器
		this._useEnterFrame = value;
		if(this.juggles.length>0)
		{
			this.startJuggle();/// 用新的方式重新启动计时器
		}
	}
}