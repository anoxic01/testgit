module packet.pack_lobby {
	export class C_Get_UserData  extends Packet{
		public UserID	:	number;
		
		public constructor() {
			super();
		}
	}
}