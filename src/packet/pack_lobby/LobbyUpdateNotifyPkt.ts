module packet.pack_lobby {
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
			super();
		}
		
		get UpdateType():number
		{
			return this.updateType;
		}
		
		set  UpdateType(value:number) 
		{
			this.updateType = value;
		}
		
		get UpdateData():Object 
		{
			return this.updateData;
		}
		
		set  UpdateData(value:Object) 
		{
			this.updateData = value;
		}
		

	}
}