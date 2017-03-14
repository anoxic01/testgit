module lobby.struct {
	export class Struct_BetLimit {
		public var EnterTbLimit	:	int;			//进桌限红
        public var ID			:	int;			//押注模式
        public var MaxLimit		:	int;			//押注上限
        public var MinLimit		:	int;			//押注下限
		public var TotalLimit	:	int;			//下注限红

		public constructor(oBetLimit:Object=null) {
			EnterTbLimit =	oBetLimit.EnterTbLimit;
			ID			 =	oBetLimit.ID;
			MaxLimit	 =	oBetLimit.MaxLimit;
			MinLimit	 =	oBetLimit.MinLimit;
			TotalLimit	 =	oBetLimit.TotalLimit;
		}
	}
}