module lobby.view.route.game.rou {
	export class RouData {
		private static var rouData:RouData;
		
		public static const RED:String = '0';
		public static const BLACK:String = '1';
		
		public static const BIG:String = '2';
		public static const SMALL:String = '3';
		public static const ODD:String = '4';
		public static const EVEN:String = '5';
		
		//打
		public static const ZOEN_1:String = '0';
		public static const ZOEN_2:String = '1';
		public static const ZOEN_3:String = '2';
		
		//列
		public static const ROW_1:String = '4';
		public static const ROW_2:String = '5';
		public static const ROW_3:String = '6';
		
		public static const ZERO:String = 'i';
		
		public static const COLOR_RED:uint = 1;
		public static const COLOR_BLACK:uint = 2;
		public static const COLOR_ZERO:uint = 3;
		
		private var _redBlackStructure:Dictionary;
		private var _bigSmallStructure:Dictionary;
		private var _oddEvenData:Dictionary;
		private var _zoenData:Dictionary;
		private var _rowData:Dictionary;
		private var _zeroData:Dictionary;

		
		public constructor(s:Singleton) {
			//紅黑
			_redBlackStructure = new Dictionary();
			_redBlackStructure[0] = ZERO;  //通殺
			
			_redBlackStructure[1] = RED;
			_redBlackStructure[3] = RED;
			_redBlackStructure[5] = RED;
			_redBlackStructure[7] = RED;
			_redBlackStructure[9] = RED;
			_redBlackStructure[12] = RED;
			_redBlackStructure[14] = RED;
			_redBlackStructure[16] = RED;
			_redBlackStructure[18] = RED;
			_redBlackStructure[19] = RED;
			_redBlackStructure[21] = RED;
			_redBlackStructure[23] = RED;
			_redBlackStructure[25] = RED;
			_redBlackStructure[27] = RED;
			_redBlackStructure[30] = RED;
			_redBlackStructure[32] = RED;
			_redBlackStructure[34] = RED;
			_redBlackStructure[36] = RED;
			
			_redBlackStructure[2] = BLACK;
			_redBlackStructure[4] = BLACK;
			_redBlackStructure[6] = BLACK;
			_redBlackStructure[8] = BLACK;
			_redBlackStructure[10] = BLACK;
			_redBlackStructure[11] = BLACK;
			_redBlackStructure[13] = BLACK;
			_redBlackStructure[15] = BLACK;
			_redBlackStructure[17] = BLACK;
			_redBlackStructure[20] = BLACK;
			_redBlackStructure[22] = BLACK;
			_redBlackStructure[24] = BLACK;
			_redBlackStructure[26] = BLACK;
			_redBlackStructure[28] = BLACK;
			_redBlackStructure[29] = BLACK;
			_redBlackStructure[31] = BLACK;
			_redBlackStructure[33] = BLACK;
			_redBlackStructure[35] = BLACK;
			
			//大小
			_bigSmallStructure = new Dictionary();
			_bigSmallStructure[0] = ZERO; //通殺
			
			for (var a:int = 1; a <= 18; a++) 
			{
				_bigSmallStructure[a] = SMALL;
			}
			for (var b:int = 19; b <= 36; b++) 
			{
				_bigSmallStructure[b] = BIG;
			}
			
			
			//單雙
			_oddEvenData = new Dictionary();
			_oddEvenData[0] = ZERO;  //通殺
			
			for (var c:int = 2; c <= 36; c+=2) 
			{
				_oddEvenData[c] = EVEN;
			}
			for (var d:int = 1; d <= 35; d+=2) 
			{
				_oddEvenData[d] = ODD;
			}

			
			//打列
			_zoenData = new Dictionary();
		
			for (var e:int = 1; e <= 12; e++) {
				_zoenData[e] = ZOEN_1;
			}
			for (var f:int = 13; f <= 24; f++) {
				_zoenData[f] = ZOEN_2;
			}
			for (var g:int = 25; g <= 36; g++) {
				_zoenData[g] = ZOEN_3;
			}
			
			_rowData = new Dictionary();
			
			for (var h:int = 1; h <= 34; h+=3) {
				_rowData[h] = ROW_1;
			}
			for (var i:int = 2; i <= 35; i+=3) {
				_rowData[i] = ROW_2;
			}
			for (var j:int = 3; j <= 36; j+=3) {
				_rowData[j] = ROW_3;
			}
			
			//打列的零  零為通殺
			_zeroData = new Dictionary();
			_zeroData[0] = ZERO;
			
			
		}
		
		public static function getInstance( ):RouData {
			if ( RouData.rouData == null ) {
				RouData.rouData = new RouData( new Singleton() );
			}
			
			return RouData.rouData;
		}
		
		/**
		 * 傳回紅黑資料格式字串
		 * @param	str
		 * @return
		 */
		public function findRedBlack(str:String):String {
			var ar:Array = str.split('.');
			var len:int = ar.length;
			var temp:String = '';
			var result:String = '';
			
			for (var i:int = 0; i < len; i++) {
				temp = _redBlackStructure[int(ar[i])];
				
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
		 * @param	str
		 * @return
		 */
		public function findBigSmall(str:String):String {
			var ar:Array = str.split('.');
			var len:int = ar.length;
			var temp:String = '';
			var result:String = '';
			
			for (var i:int = 0; i < len; i++) {
				temp = _bigSmallStructure[int(ar[i])];
				
				if( !temp ){
					trace("輪盤路單資料錯誤:" + ar[i] );
					continue;								//這邊會因服務端傳來錯誤的數據造成 客戶端路紙顯示錯誤。
				}
				
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
		 * 傳回單雙資料格式字串
		 * @param	str
		 * @return
		 */
		public function findOddEven(str:String):String {
			var ar:Array = str.split('.');
			var len:int = ar.length;
			var temp:String = '';
			var result:String = '';
			
			for (var i:int = 0; i < len; i++) {
				temp = _oddEvenData[int(ar[i])];
				
				if ( result != '' ) {
					result += '.'+temp;
				}
				else {
					result = temp;
				}
			}
			
			return result;
			
		}
		
		
		public function findZoenRowData(str:String):String {
			var ar:Array = str.split('.');
			var len:int = ar.length;
			var temp:String = '';
			var temp2:String = '';
			var result:String = '';
			
			for (var i:int = 0; i < len; i++) {
				if ( _zeroData[int(ar[i])] == undefined ) {
					//打
					temp = _zoenData[int(ar[i])]
					
					//列
					temp2 = _rowData[int(ar[i])];
					
					if ( result != '' ) {
						result += '.'+(temp+'_'+temp2); //打_列
					}
					else {
						result = (temp+'_'+temp2);
					}
					
				}
				//零
				else {
					
					temp = _zeroData[int(ar[i])];
					
					if ( result != '' ) {
						result += '.'+temp;
					}
					else {
						result = temp;
					}
					
					
				}
				
			}
			
			return result;
			
			
			
		}
		
		public function getColor(no:int):uint{
			
			if (_redBlackStructure[no]==RED){
				return COLOR_RED
			}else if (_redBlackStructure[no]==BLACK){
				return COLOR_BLACK;
			}
			return COLOR_ZERO;
		}
		
		
		
		
	}

}

class Singleton {
	public function Singleton():void 
	{
		
	}
}

