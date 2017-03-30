module packet.lobby {
	export class LobbyDeputyStatusNotifyPkt  extends Packet{
        /// <summary>
        /// 狀態
		// "0: 登入
		//  1: 登出"
		//
        /// </summary>
        private type :number;

		public constructor() {
		}
		
		get Type():number
		{
			return type;
		}
		
		set  Type(value:number) 
		{
			type = value;
		}
		
	}
}