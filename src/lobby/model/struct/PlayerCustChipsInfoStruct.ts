module lobby.model.struct {
	export class PlayerCustChipsInfoStruct {
		public CustChips			:	String;							//自订筹码
		public PlayerID				:	number;							//用户序号
//		public Ret					:	 boolean;						//返回类型
		
		public constructor() {
			//			Ret 		= 	false;
			this.PlayerID 	= 	Player.getInstance().iPlayerID;
		}
	}
}