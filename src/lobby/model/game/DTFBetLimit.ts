module lobby.model.game {
	export class DTFBetLimit extends GameBetLimitBase{
		

		public TieBetUpperLimit		:Number;
		public TieBetUnderLimit		:Number;
		
		public SingleBetUnderLimit	:Number;
		public SingleBetUpperLimit	:Number;
		
		public constructor() {
			super();
			
			this.TieBetUpperLimit 			= 0;
			this.TieBetUnderLimit 			= 0;
			
			this.SingleBetUnderLimit 		= 0;
			this.SingleBetUpperLimit			= 0;
		}
	}
}