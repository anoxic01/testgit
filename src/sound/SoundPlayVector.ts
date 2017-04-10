module sound {
	export class SoundPlayVector {
		/**
		 *停顿500毫秒 
		 */		
		public static SPACE:string = "Sound_Space_500";
		
		private m_sounds:any[];
		
		public onComplete:Function;

		public constructor(arr:any[]) {
			this.m_sounds = arr;
		}
		
		public start():void
		{
			if(this.m_sounds.length>0)
			{
				var soundStr:string = this.m_sounds.shift();
				if(soundStr==SoundPlayVector.SPACE)
				{
					setTimeout(this.start,500);
				}else
				{
					manager.SoundManager.getInstance().play(soundStr,0,true,null, this.onSoundPlayComplete);
				}
			}else
			{
				if(this.onComplete!=null)
					this.onComplete();
			}
		}
		
		private onSoundPlayComplete(value:Object=null):void
		{
			setTimeout(this.start,1);
		}
	}
}