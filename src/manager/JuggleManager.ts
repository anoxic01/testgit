module manager {
	export class JuggleManager {
		private static _instance:JuggleManager;
		

		public static get instance():JuggleManager
		{
			if(JuggleManager._instance==null){
				JuggleManager._instance = new JuggleManager();
			}
			return JuggleManager._instance;
		}
		private juggleDict = {};
		private juggles = new Array<iface.IJuggle>();
		private isStartJuggle:boolean = false;
		private currentJuggleTime:number = 0;
		private lastJuggleTime:number = 0;
		public isDebug:boolean = false;
		private _useEnterFrame:boolean = false;
		/**
		 * 用于执行时间流逝(也可用Timer)
		 */
		private juggleTimer;
		public constructor() {
		}
		
		public addJuggle(juggle):void
		{
			if(this.juggleDict[juggle])return;
			this.juggleDict[juggle] = true;
			this.juggles.push(juggle);
			if(this.juggles.length>0)this.startJuggle();
		}
		public removeJuggle(juggle):void
		{
			if(!this.juggleDict[juggle])return;
			delete this.juggleDict[juggle];
			var index = this.juggles.indexOf(juggle);
			if(index>-1)this.juggles.splice(index,1);
			if(this.juggles.length<=0)this.stopJuggle();
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
				this.juggleTimer.removeEventListener(egret.Event.ENTER_FRAME,this.onJuggle);
				this.juggleTimer.addEventListener(egret.Event.ENTER_FRAME,this.onJuggle);
			}else
			{
				if(this.juggleTimer==null)
				{
					this.juggleTimer = new egret.Timer(33);
					this.juggleTimer.addEventListener(egret.TimerEvent.TIMER, this.onJuggle);
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
				this.juggleTimer.removeEventListener(egret.Event.ENTER_FRAME, this.onJuggle);
			}else
			{
				this.juggleTimer.stop();
			}
		}
		
		private onJuggle(e=null):void
		{
			var currentTime:number = egret.getTimer();
			this.currentJuggleTime = currentTime - this.lastJuggleTime;
			if(this.currentJuggleTime>1000)this.currentJuggleTime = 1000;
			var juggle;
			for (juggle in this.juggles) 
			{
				if(this.isDebug)
				{
					var jStartTime:number = egret.getTimer();
					juggle.onJuggle(this.currentJuggleTime);
					var jSpeedTime:number = egret.getTimer()-jStartTime;
					if(jSpeedTime>=10)
					{
						console.log("---发现耗时操作---"+jSpeedTime+"ms--->"+juggle);
					}
				}else
				{
					juggle.onJuggle(this.currentJuggleTime);
				}
			}
			if(this.isDebug)
			{
				console.log("----juggle总耗时--->",egret.getTimer()-currentTime);
			}
			
			this.lastJuggleTime = currentTime;
		}
		public findJugglesByName(name:string):any[]
		{
			var arr = [];
			var juggle;
			for (juggle in this.juggles) 
			{
				if(juggle.name==name)
				{
					arr.push(juggle);
					console.log(name,"------",arr.length,"----->",juggle);
				}
			}
			return arr;
		}
		/**
		 *默认使用Enterframe作为计时，如果为false则使用timer 
		 */
		get useEnterFrame():boolean{return this._useEnterFrame;}
		set useEnterFrame(value:boolean)
		{
			if(this._useEnterFrame==value)return;
			this.stopJuggle();//// 停止原有的计时器
			if(this._useEnterFrame==false&&this.juggleTimer)
			{
				this.juggleTimer.removeEventListener(egret.TimerEvent.TIMER, this.onJuggle);
			}
			this.juggleTimer = null;///// 置空原有计时器
			this._useEnterFrame = value;
			if(this.juggles.length>0)this.startJuggle();/// 用新的方式重新启动计时器
		}
	}
}