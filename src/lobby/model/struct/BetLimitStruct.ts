module lobby.model.struct {
	export class BetLimitStruct {
		
		public EnterTbLimit	:	number;			//进桌限红
        public ID			:	number;			//押注模式
        public MaxLimit		:	number;			//押注上限
        public MinLimit		:	number;			//押注下限
		public TotalLimit	:	number;			//下注限红

		public constructor(oBetLimit=null) {
			this.EnterTbLimit =	oBetLimit.EnterTbLimit;
			this.ID			 =	oBetLimit.ID;
			this.MaxLimit	 =	oBetLimit.MaxLimit;
			this.MinLimit	 =	oBetLimit.MinLimit;
			this.TotalLimit	 =	oBetLimit.TotalLimit;
		}
	}
}