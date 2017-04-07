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
				var soundStr:string = m_sounds.shift();
				if(soundStr==SPACE)
				{
					setTimeout(start,500);
				}else
				{
					SoundManager.getInstance().play(soundStr,0,true,null,onSoundPlayComplete);
				}
			}else
			{
				if(onComplete!=null)
					onComplete();
			}
		}
		
		private onSoundPlayComplete(value:Object=null):void
		{
			setTimeout(start,1);
		}
	}
}