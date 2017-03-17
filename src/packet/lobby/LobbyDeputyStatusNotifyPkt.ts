module packet.lobby {
	export class LobbyDeputyStatusNotifyPkt  extends Packet{
        /// <summary>
        /// 狀態
		// "0: 登入
		//  1: 登出"
		//
        /// </summary>
        private var type :int;

		public constructor() {
		}
		
		public function get Type():int 
		{
			return type;
		}
		
		public function set Type(value:int):void 
		{
			type = value;
		}
		
	}
}