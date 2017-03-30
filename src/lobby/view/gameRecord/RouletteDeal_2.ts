module lobby.view.gameRecord {
	export class RouletteDeal_2 {
	
		public num:number=-1;
		
		public constructor() {
			this.Reset();
		}
		
		public Reset():void {
			num=-1;
		}	
		
		
		/**
		 *单 	 *  */
		get isOdd() :  boolean
		{
			if( num%2!=0){
				return true;
			}
			return false;
		}
		
		/** *双 */
		get isEven() :  boolean
		{
			if(num !=0  && num%2==0){
				return true;
			}
			return false;
		}
		
		get isBig() :  boolean
		{
			return num>=19? true:false;
		}
		
		get isSmall() :  boolean
		{
			return num<=18? true:false;
		}// end function
		
		get isRed() :  boolean
		{
			if ([ 1, 3, 5, 7, 9, 12, 14, 16, 18, 19, 21, 23, 25, 27, 30, 32, 34, 36 ].indexOf(num)>-1){
				return true;
			}
			return false;
		}// end function
		
		get isBlack() :  boolean
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
		get dozen() : int
		{
			
			return Math.ceil(num/12);
		}
		
		/**
		 *第几列 
		 * @return 
		 * 
		 */
		get column() : int
		{
			var n:number=num%3 ;
			if(n == 0){
				n=3
			}
			
			return n;
		}// end function
	}
}