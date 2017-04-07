module lobby.model.game {
	export class GameBetLimitBase {
		
        private gameID :number;

        private betLimitID :number;

        private maxBetLimit :number;


        private minBetLimit:number;

		public TotalLimit:number;
		public EnterTbLimit:number;
		public constructor() {
		}
		
		/**
		 * 遊戲ID
		 */
		get GameID():number
		{
			return this.gameID;
		}
		/**
		 * 遊戲ID
		 */
		set  GameID(value:number) 
		{
			this.gameID = value;
		}
		/**
		 * 限額ID
		 */
		get BetLimitID():number
		{
			return this.betLimitID;
		}
		/**
		 * 限額ID
		 */
		set  BetLimitID(value:number) 
		{
			this.betLimitID = value;
		}
		/**
		 * 最大押注上限
		 */
		get MaxBetLimit():number 
		{
			return this.maxBetLimit;
		}
		/**
		 * 最大押注上限
		 */
		set  MaxBetLimit(value:number) 
		{
			this.maxBetLimit = value;
		}
		
		get MinBetLimit():number 
		{
			return this.minBetLimit;
		}
		/**
		 * 最小押注下限
		 */
		set  MinBetLimit(value:number) 
		{
			this.minBetLimit = value;
		}
		
	}
}