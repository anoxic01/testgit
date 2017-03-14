module lobby.model.struct {
	export class PlayerCustChipsInfoStruct {
		public var CustChips			:	String;							//自订筹码
		public var PlayerID				:	int;							//用户序号
//		public var Ret					:	Boolean;						//返回类型
		
		public constructor() {
			//			Ret 		= 	false;
			PlayerID 	= 	Player.getInstance().iPlayerID;
		}
	}
}