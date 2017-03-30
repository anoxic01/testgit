module lobby.model.game {
	export class GameBetLimitBase {
		
        private gameID :number;

        private betLimitID :number;

        private maxBetLimit :Number;


        private minBetLimit:Number;

		public TotalLimit:Number;
		public EnterTbLimit:Number;
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
		get MaxBetLimit():Number 
		{
			return this.maxBetLimit;
		}
		/**
		 * 最大押注上限
		 */
		set  MaxBetLimit(value:Number) 
		{
			this.maxBetLimit = value;
		}
		
		get MinBetLimit():Number 
		{
			return this.minBetLimit;
		}
		/**
		 * 最小押注下限
		 */
		set  MinBetLimit(value:Number) 
		{
			this.minBetLimit = value;
		}
		
	}
}