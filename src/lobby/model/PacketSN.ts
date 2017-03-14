module lobby.model {
	export class PacketSN {
		private static var _packetSNInstance:PacketSN;
		public  static var SN:uint = 0;
		
		public constructor() {
		}
		public static function instance():PacketSN {
			if ( _packetSNInstance == null ) {
				_packetSNInstance = new PacketSN(new PKT());
			}
			return _packetSNInstance;
		}
		
	
		
	
	}
}