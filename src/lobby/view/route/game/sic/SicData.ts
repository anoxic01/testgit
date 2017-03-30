module lobby.view.route.game.sic {
	export class SicData {
		private static var sicData:SicData;
		
		
		public static const SMALL:string = "b";
		public static const BIG:string = "c";
		public static const EVEN:string = "d";
		public static const ODD:string = "f";
		/**圍榖*/
		public static const SURROUND_DICE:string = "g";
		
		
		

		
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

			for (var l:number= 4; l <= 10; l++) 
			{
				_bigSmallStructure[l] = SMALL;
			}
			for (l = 11; l <= 17; l++) 
			{
				_bigSmallStructure[l] = BIG;
			}
			
			
			//單雙
			_oddEvenData = new Dictionary();
			
			for (var k:number= 5; k <= 17; k+=2) 
			{
				_oddEvenData[k] = ODD;
			}
			for (var j:number= 4; j <= 16; j+=2) 
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
		public function findTie(str:string):string {
			var ar:any[] = str.split('.');
			var len:number= ar.length;
			var temp:string = '';
			var result:string = '';
			var ar2:any[]
			var totalPoint:number= 0;
			
			for (var i:number= 0; i < len; i++) {
				ar2 = ar[i].split('');
				totalPoint = 0;
				
				for (var j:number= 0; j < ar2.length; j++) {
					totalPoint += int(ar2[j]);
				}
				
				temp = '';
				temp = string(totalPoint);
				
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
		public function findBigSmall(str:string):string {
			var ar:any[] = str.split('.');
			var len:number= ar.length;
			var temp:string = '';
			var result:string = '';
			var ar2:any[]
			var totalPoint:number= 0;
			
			var surround:string = "";
			
			for (var i:number= 0; i < len; i++) {
				surround = _surroundData[ar[i]];
				
				//判斷圍骰
				if ( surround == null ) {
					ar2 = ar[i].split('');
					totalPoint = 0;
					
					for (var j:number= 0; j < ar2.length; j++) {
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
		public function findOddEven(str:string):string {
			var ar:any[] = str.split('.');
			var len:number= ar.length;
			var temp:string = '';
			var result:string = '';
			var ar2:any[]
			var totalPoint:number= 0;
			
			var surround:string = "";
			
			for (var i:number= 0; i < len; i++) {
				surround = _surroundData[ar[i]];
				
				//判斷圍骰
				if ( surround == null ) {
					ar2 = ar[i].split('');
					totalPoint = 0;
					
					for (var j:number= 0; j < ar2.length; j++) {
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
