module sound {
	export class SoundData {
		private static m_instance:SoundData;
		
		public nSoundVolume		:	number 	= 	-1;
		public nMusicVolume		:	number 	= 	-1;
		private m_nLiveVolume	:	number 	= 	-1;
		
		
		public constructor() {
		}
		
		get nLiveVolume():number
		{
			return this.m_nLiveVolume;
		}

		set  nLiveVolume(value:number)
		{
			this.m_nLiveVolume = value;
			
			//控制视讯
		}

		public static getInstance():SoundData{
			
			if(SoundData.m_instance == null){
				SoundData.m_instance = new SoundData();
			}
			return SoundData.m_instance;
		}
		
	}
}