module lobby.model.game {
	export class GameBetLimitBase {
		
        private var gameID :int;

        private var betLimitID :int;

        private var maxBetLimit :Number;


        private var minBetLimit:Number;

		public var TotalLimit:Number;
		public var EnterTbLimit:Number;
		public constructor() {
		}
		
		/**
		 * 遊戲ID
		 */
		public function get GameID():int 
		{
			return gameID;
		}
		/**
		 * 遊戲ID
		 */
		public function set GameID(value:int):void 
		{
			gameID = value;
		}
		/**
		 * 限額ID
		 */
		public function get BetLimitID():int 
		{
			return betLimitID;
		}
		/**
		 * 限額ID
		 */
		public function set BetLimitID(value:int):void 
		{
			betLimitID = value;
		}
		/**
		 * 最大押注上限
		 */
		public function get MaxBetLimit():Number 
		{
			return maxBetLimit;
		}
		/**
		 * 最大押注上限
		 */
		public function set MaxBetLimit(value:Number):void 
		{
			maxBetLimit = value;
		}
		
		public function get MinBetLimit():Number 
		{
			return minBetLimit;
		}
		/**
		 * 最小押注下限
		 */
		public function set MinBetLimit(value:Number):void 
		{
			minBetLimit = value;
		}
		
	}
}