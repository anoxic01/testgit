module lobby.model.game {
	export class DTFBetLimit extends GameBetLimitBase{
		

		public var TieBetUpperLimit		:Number;
		public var TieBetUnderLimit		:Number;
		
		public var SingleBetUnderLimit	:Number;
		public var SingleBetUpperLimit	:Number;
		
		public constructor() {
			super();
			
			TieBetUpperLimit 			= 0;
			TieBetUnderLimit 			= 0;
			
			SingleBetUnderLimit 		= 0;
			SingleBetUpperLimit			= 0;
		}
	}
}