module lobby.model {
	export class PacketSN {
		private static _packetSNInstance:PacketSN;
		public  static SN:number = 0;
		
		public constructor(pkt:PKT) {
		}
		public static instance():PacketSN {
			if ( PacketSN._packetSNInstance == null ) {
				PacketSN._packetSNInstance = new PacketSN(new PKT());
			}
			return PacketSN._packetSNInstance;
		}
		
	
		
	
	}
}

export class PKT{

}