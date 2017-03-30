module lobby.model.game {
	export class GameBetBase {
		 /// <summary>
        /// 押注位置
        /// </summary>
        private betPos:String;

        /// <summary>
        /// 押注金額
        /// </summary>
        private amt:Number = 0;
		public constructor() {
		}
		
		get BetPos():String 
		{
			return this.betPos;
		}
		
		set  BetPos(value:String) 
		{
			this.betPos = value;
		}
		
		get Amt():Number 
		{
			return this.amt;
		}
		
		set  Amt(value:Number) 
		{
			this.amt = value;
		}
		
	}
}