module sound {
	export class SoundData {
		private static m_instance:SoundData;
		
		public nSoundVolume		:	Number 	= 	-1;
		public nMusicVolume		:	Number 	= 	-1;
		private m_nLiveVolume	:	Number 	= 	-1;
		
		
		public constructor() {
		}
		
		get nLiveVolume():Number
		{
			return m_nLiveVolume;
		}

		set  nLiveVolume(value:Number)
		{
			m_nLiveVolume = value;
			
			//控制视讯
		}

		public static getInstance():SoundData{
			
			if(m_instance == null){
				m_instance = new SoundData(new Singleton());
			}
			return m_instance;
		}
		
	}
}