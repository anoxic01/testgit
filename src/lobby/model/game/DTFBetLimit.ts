module lobby.model.game {
	export class DTFBetLimit extends GameBetLimitBase{
		

		public TieBetUpperLimit		:number;
		public TieBetUnderLimit		:number;
		
		public SingleBetUnderLimit	:number;
		public SingleBetUpperLimit	:number;
		
		public constructor() {
			super();
			
			this.TieBetUpperLimit 			= 0;
			this.TieBetUnderLimit 			= 0;
			
			this.SingleBetUnderLimit 		= 0;
			this.SingleBetUpperLimit			= 0;
		}
	}
}