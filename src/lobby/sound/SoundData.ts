module lobby.sound {
	export class SoundData {
		private static var m_instance:SoundData;
		
		public var nSoundVolume		:	Number 	= 	-1;
		public var nMusicVolume		:	Number 	= 	-1;
		private var m_nLiveVolume	:	Number 	= 	-1;
		
		
		public constructor() {
		}
		
		public function get nLiveVolume():Number
		{
			return m_nLiveVolume;
		}

		public function set nLiveVolume(value:Number):void
		{
			m_nLiveVolume = value;
			
			//控制视讯
		}

		public static function getInstance():SoundData{
			
			if(m_instance == null){
				m_instance = new SoundData(new Singleton());
			}
			return m_instance;
		}
		
	}
}