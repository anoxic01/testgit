module lobby.view.gameRecord {
	export class RouletteDeal_2 {
	
		public var num:int=-1;
		
		public constructor() {
			this.Reset();
		}
		
		public function Reset():void {
			num=-1;
		}	
		
		
		/**
		 *单 	 *  */
		public function get isOdd() : Boolean
		{
			if( num%2!=0){
				return true;
			}
			return false;
		}
		
		/** *双 */
		public function get isEven() : Boolean
		{
			if(num !=0  && num%2==0){
				return true;
			}
			return false;
		}
		
		public function get isBig() : Boolean
		{
			return num>=19? true:false;
		}
		
		public function get isSmall() : Boolean
		{
			return num<=18? true:false;
		}// end function
		
		public function get isRed() : Boolean
		{
			if ([ 1, 3, 5, 7, 9, 12, 14, 16, 18, 19, 21, 23, 25, 27, 30, 32, 34, 36 ].indexOf(num)>-1){
				return true;
			}
			return false;
		}// end function
		
		public function get isBlack() : Boolean
		{
			if ([ 2, 4, 6, 8, 10, 11, 13, 15, 17, 20, 22, 24, 26, 28, 29, 31, 33, 35 ].indexOf(num)>-1){
				return true;
			}
			return false;
		}// end function
		
		
		/**
		 *第几打 
		 * @return 
		 * 
		 */
		public function get dozen() : int
		{
			
			return Math.ceil(num/12);
		}
		
		/**
		 *第几列 
		 * @return 
		 * 
		 */
		public function get column() : int
		{
			var n:int =num%3 ;
			if(n == 0){
				n=3
			}
			
			return n;
		}// end function
	}
}