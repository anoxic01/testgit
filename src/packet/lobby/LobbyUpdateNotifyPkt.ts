module packet.lobby {
	export class LobbyUpdateNotifyPkt  extends Packet{
        /// <summary>
        /// 更新種類
		///0: 更新在線人數
        /// </summary>
        private var updateType:int;

        /// <summary>
        /// 更新資料
		///0: int
        /// </summary>
        private var updateData:Object;
		
		public constructor() {
		}
		
		public function get UpdateType():int 
		{
			return updateType;
		}
		
		public function set UpdateType(value:int):void 
		{
			updateType = value;
		}
		
		public function get UpdateData():Object 
		{
			return updateData;
		}
		
		public function set UpdateData(value:Object):void 
		{
			updateData = value;
		}
		

	}
}