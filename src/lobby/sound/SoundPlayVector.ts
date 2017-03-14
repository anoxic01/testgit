module lobby.sound {
	export class SoundPlayVector {
		/**
		 *停顿500毫秒 
		 */		
		public static const SPACE:String = "Sound_Space_500";
		
		private var m_sounds:Array;
		
		public var onComplete:Function;

		public constructor(arr:Array) {
			this.m_sounds = arr;
		}
		
		public function start():void
		{
			if(this.m_sounds.length>0)
			{
				var soundStr:String = m_sounds.shift();
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
		
		private function onSoundPlayComplete(value:Object=null):void
		{
			setTimeout(start,1);
		}
	}
}