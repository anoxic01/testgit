module lobby.view.route.game.sic {
	export class SicData {
		private static var sicData:SicData;
		
		
		public static const SMALL:String = "b";
		public static const BIG:String = "c";
		public static const EVEN:String = "d";
		public static const ODD:String = "f";
		/**圍榖*/
		public static const SURROUND_DICE:String = "g";
		
		
		

		
		private var _bigSmallStructure:Dictionary;
		private var _oddEvenData:Dictionary;
		private var _beadData:Dictionary;
		
		protected var _surroundData:Dictionary;

		
		public constructor(s:Singleton) {
		
			
			//圍骰  只有單雙 跟 大小 才有 圍骰
			_surroundData = new Dictionary();
			_surroundData["111"] = SURROUND_DICE;
			_surroundData["222"] = SURROUND_DICE;
			_surroundData["333"] = SURROUND_DICE;
			_surroundData["444"] = SURROUND_DICE;
			_surroundData["555"] = SURROUND_DICE;
			_surroundData["666"] = SURROUND_DICE;
			
			//大小
			_bigSmallStructure = new Dictionary();

			for (var l:int = 4; l <= 10; l++) 
			{
				_bigSmallStructure[l] = SMALL;
			}
			for (l = 11; l <= 17; l++) 
			{
				_bigSmallStructure[l] = BIG;
			}
			
			
			//單雙
			_oddEvenData = new Dictionary();
			
			for (var k:int = 5; k <= 17; k+=2) 
			{
				_oddEvenData[k] = ODD;
			}
			for (var j:int = 4; j <= 16; j+=2) 
			{
				_oddEvenData[j] = EVEN;
			}

			

		}
		public static function getInstance( ):SicData {
			if ( SicData.sicData == null ) {
				SicData.sicData = new SicData( new Singleton() );
			}
			
			return SicData.sicData;
		}
		
		/**
		 * 
		 * 骰寶 111.146.456.566 -> 3.11.15.17
		 * @param	str
		 * @return
		 */
		public function findTie(str:String):String {
			var ar:Array = str.split('.');
			var len:int = ar.length;
			var temp:String = '';
			var result:String = '';
			var ar2:Array
			var totalPoint:int = 0;
			
			for (var i:int = 0; i < len; i++) {
				ar2 = ar[i].split('');
				totalPoint = 0;
				
				for (var j:int = 0; j < ar2.length; j++) {
					totalPoint += int(ar2[j]);
				}
				
				temp = '';
				temp = String(totalPoint);
				
				if ( result != '' ) {
					result += '.'+temp;
				}
				else {
					result = temp;
				}
			}
			
			return result;
			
		}
		
		/**
		 * 傳回大小資料格式字串
		 * 資料格式:  b.c.g.c.c.b
		 * @param	str
		 * @return
		 */
		public function findBigSmall(str:String):String {
			var ar:Array = str.split('.');
			var len:int = ar.length;
			var temp:String = '';
			var result:String = '';
			var ar2:Array
			var totalPoint:int = 0;
			
			var surround:String = "";
			
			for (var i:int = 0; i < len; i++) {
				surround = _surroundData[ar[i]];
				
				//判斷圍骰
				if ( surround == null ) {
					ar2 = ar[i].split('');
					totalPoint = 0;
					
					for (var j:int = 0; j < ar2.length; j++) {
						totalPoint += int(ar2[j]);
					}
					
					temp = '';
					temp = _bigSmallStructure[totalPoint];
					
					if ( result != '' ) {
						result += '.'+temp;
					}
					else {
						result = temp;
					}	

					
				}
				else {
					
					if ( result != '' ) {
						result += '.'+surround;
					}
					else {
						result = surround;
					}
					
				}
				
				

			}
			
			return result;
			
		}
		
		
		/**
		 * 傳回單雙資料格式字串
		 * 資料格式: d.f.g.d.f.g
		 * @param	str
		 * @return
		 */
		public function findOddEven(str:String):String {
			var ar:Array = str.split('.');
			var len:int = ar.length;
			var temp:String = '';
			var result:String = '';
			var ar2:Array
			var totalPoint:int = 0;
			
			var surround:String = "";
			
			for (var i:int = 0; i < len; i++) {
				surround = _surroundData[ar[i]];
				
				//判斷圍骰
				if ( surround == null ) {
					ar2 = ar[i].split('');
					totalPoint = 0;
					
					for (var j:int = 0; j < ar2.length; j++) {
						totalPoint += int(ar2[j]);
					}
					
					temp = '';
					temp = _oddEvenData[totalPoint];
					
					if ( result != '' ) {
						result += '.'+temp;
					}
					else {
						result = temp;
					}	

					
				}
				else {
					
					if ( result != '' ) {
						result += '.'+surround;
					}
					else {
						result = surround;
					}
					
				}
				
				

			}
			
			return result;
			
		}
		
		

		
		
		
		
		
		
	}

}

class Singleton {
	public function Singleton():void 
	{
		
	}
}
