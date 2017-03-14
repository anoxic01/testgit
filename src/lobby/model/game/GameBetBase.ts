module lobby.model.game {
	export class GameBetBase {
		 /// <summary>
        /// 押注位置
        /// </summary>
        private var betPos:String;

        /// <summary>
        /// 押注金額
        /// </summary>
        private var amt:Number = 0;
		public constructor() {
		}
		
		public function get BetPos():String 
		{
			return betPos;
		}
		
		public function set BetPos(value:String):void 
		{
			betPos = value;
		}
		
		public function get Amt():Number 
		{
			return amt;
		}
		
		public function set Amt(value:Number):void 
		{
			amt = value;
		}
		
	}
}