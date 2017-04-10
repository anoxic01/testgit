module packet.pack_lobby {
	export class LobbyDeputyStatusNotifyPkt  extends Packet{
        /// <summary>
        /// 狀態
		// "0: 登入
		//  1: 登出"
		//
        /// </summary>
        private type :number;

		public constructor() {
			super();
		}
		
		get Type():number
		{
			return this.type;
		}
		
		set  Type(value:number) 
		{
			this.type = value;
		}
		
	}
}