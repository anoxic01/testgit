module packet.pack_game {
	export class C_Game_Heart_Pkt extends Packet{

		public PlayerID:number;
		public Identity:number;
		
		public constructor() {
			super();
		}
	}
}