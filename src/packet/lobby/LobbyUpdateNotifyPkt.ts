module packet.lobby {
	export class LobbyUpdateNotifyPkt  extends Packet{
        /// <summary>
        /// 更新種類
		///0: 更新在線人數
        /// </summary>
        private updateType:number;

        /// <summary>
        /// 更新資料
		///0: int
        /// </summary>
        private updateData:Object;
		
		public constructor() {
		}
		
		get UpdateType():number
		{
			return updateType;
		}
		
		set  UpdateType(value:number) 
		{
			updateType = value;
		}
		
		get UpdateData():Object 
		{
			return updateData;
		}
		
		set  UpdateData(value:Object) 
		{
			updateData = value;
		}
		

	}
}