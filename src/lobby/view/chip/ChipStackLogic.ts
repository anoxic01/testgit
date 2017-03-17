module lobby.view.chip {
	export class ChipStackLogic implements IChipStackLogic{
		/**籌碼面額 須按照大小  由大而小  順序*/
		protected var chipAr:Array; 
		//ex: 500000, 300000, 100000, 50000, 30000 ,10000 ,5000, 3000, 1000, 500 , 300, 100 , 50 ,10
		public constructor( chipAr:Array ) {
			this.chipAr = chipAr;
		}
		
		public function stackChips( amt:int ):Array {
			var len:int = this.chipAr.length;
			var betGold:int = amt;
			var stack:int;
			var stackAr:Array = [];
			
			for (var i:int = 0; i < len; i++) {
				stack = betGold / this.chipAr[i];
				if ( stack > 0 ) {
					for (var j:int = 0; j < stack; j++) {
						stackAr.push( this.chipAr[i] );
					}
					betGold = betGold % this.chipAr[i];
				}
			}
			
			
			len = stackAr.length;
			var gold:int;
			var realFrameGold:String = "";
			for (var k:int = 0; k < len; k++) {
				realFrameGold = "";
				gold = stackAr[k] / 1000;
				if ( gold > 0 ) {
					realFrameGold = gold + "k";
				}else {
					realFrameGold = String(stackAr[k]);
				}
				
				stackAr[k] = realFrameGold;
			}
			
			
			return stackAr;
			
		}
		
		
	}
}