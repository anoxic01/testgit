module item {
	export class JuggleAdvanceTick {
		/**
		 *每次执行的间隔 
		 */		
		public  juggleInterval = 0;
		public  onTick:Function;
		private  time = 0;
		public constructor() {
		}
		public onJuggle(value):void
		{
			this.time+=value;
			while(this.time>=this.juggleInterval)
			{
				this.time-=this.juggleInterval;
				if(this.onTick!=null)
					this.onTick();
			}
		}
		public setFrameRate(frameRate):void
		{
			if(frameRate<=0)return;
			this.juggleInterval = 1000/frameRate;
		}
		/**
		 * 清除time
		 */		
		public clear():void
		{
			this.time = 0;
		}
		
		public dispose():void
		{
			this.time = 0;
			this.juggleInterval = 0;
			this.onTick = null;
		}
	}
}