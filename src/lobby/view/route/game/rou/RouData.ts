module lobby.view.route.game.rou {
	export class RouData {
		private static rouData:RouData;
		
		public static RED:string = '0';
		public static BLACK:string = '1';
		
		public static BIG:string = '2';
		public static SMALL:string = '3';
		public static ODD:string = '4';
		public static EVEN:string = '5';
		
		//打
		public static ZOEN_1:string = '0';
		public static ZOEN_2:string = '1';
		public static ZOEN_3:string = '2';
		
		//列
		public static ROW_1:string = '4';
		public static ROW_2:string = '5';
		public static ROW_3:string = '6';
		
		public static ZERO:string = 'i';
		
		public static COLOR_RED:number = 1;
		public static COLOR_BLACK:number = 2;
		public static COLOR_ZERO:number = 3;
		
		private _redBlackStructure ;
		private _bigSmallStructure ;
		private _oddEvenData ;
		private _zoenData ;
		private _rowData ;
		private _zeroData ;

		
		public constructor() {
			//紅黑
			this._redBlackStructure = {};
			this._redBlackStructure[0] = RouData.ZERO;  //通殺
			
			this._redBlackStructure[1] = RouData.RED;
			this._redBlackStructure[3] = RouData.RED;
			this._redBlackStructure[5] = RouData.RED;
			this._redBlackStructure[7] = RouData.RED;
			this._redBlackStructure[9] = RouData.RED;
			this._redBlackStructure[12] = RouData.RED;
			this._redBlackStructure[14] = RouData.RED;
			this._redBlackStructure[16] = RouData.RED;
			this._redBlackStructure[18] = RouData.RED;
			this._redBlackStructure[19] = RouData.RED;
			this._redBlackStructure[21] = RouData.RED;
			this._redBlackStructure[23] = RouData.RED;
			this._redBlackStructure[25] = RouData.RED;
			this._redBlackStructure[27] = RouData.RED;
			this._redBlackStructure[30] = RouData.RED;
			this._redBlackStructure[32] = RouData.RED;
			this._redBlackStructure[34] = RouData.RED;
			this._redBlackStructure[36] = RouData.RED;
			
			this._redBlackStructure[2] = RouData.BLACK;
			this._redBlackStructure[4] = RouData.BLACK;
			this._redBlackStructure[6] = RouData.BLACK;
			this._redBlackStructure[8] = RouData.BLACK;
			this._redBlackStructure[10] = RouData.BLACK;
			this._redBlackStructure[11] = RouData.BLACK;
			this._redBlackStructure[13] = RouData.BLACK;
			this._redBlackStructure[15] = RouData.BLACK;
			this._redBlackStructure[17] = RouData.BLACK;
			this._redBlackStructure[20] = RouData.BLACK;
			this._redBlackStructure[22] = RouData.BLACK;
			this._redBlackStructure[24] = RouData.BLACK;
			this._redBlackStructure[26] = RouData.BLACK;
			this._redBlackStructure[28] = RouData.BLACK;
			this._redBlackStructure[29] = RouData.BLACK;
			this._redBlackStructure[31] = RouData.BLACK;
			this._redBlackStructure[33] = RouData.BLACK;
			this._redBlackStructure[35] = RouData.BLACK;
			
			//大小
			this._bigSmallStructure = {};
			this._bigSmallStructure[0] = RouData.ZERO; //通殺
			
			for (var a:number= 1; a <= 18; a++) 
			{
				this._bigSmallStructure[a] = RouData.SMALL;
			}
			for (var b:number= 19; b <= 36; b++) 
			{
				this._bigSmallStructure[b] = RouData.BIG;
			}
			
			
			//單雙
			this._oddEvenData = {};
			this._oddEvenData[0] = RouData.ZERO;  //通殺
			
			for (var c:number= 2; c <= 36; c+=2) 
			{
				this._oddEvenData[c] = RouData.EVEN;
			}
			for (var d:number= 1; d <= 35; d+=2) 
			{
				this._oddEvenData[d] = RouData.ODD;
			}

			
			//打列
			this._zoenData = {};
		
			for (var e:number= 1; e <= 12; e++) {
				this._zoenData[e] = RouData.ZOEN_1;
			}
			for (var f:number= 13; f <= 24; f++) {
				this._zoenData[f] = RouData.ZOEN_2;
			}
			for (var g:number= 25; g <= 36; g++) {
				this._zoenData[g] = RouData.ZOEN_3;
			}
			
			this._rowData = {};
			
			for (var h:number= 1; h <= 34; h+=3) {
				this._rowData[h] = RouData.ROW_1;
			}
			for (var i:number= 2; i <= 35; i+=3) {
				this._rowData[i] = RouData.ROW_2;
			}
			for (var j:number= 3; j <= 36; j+=3) {
				this._rowData[j] = RouData.ROW_3;
			}
			
			//打列的零  零為通殺
			this._zeroData = {};
			this._zeroData[0] = RouData.ZERO;
			
			
		}
		
		public static getInstance( ):RouData {
			if ( RouData.rouData == null ) {
				RouData.rouData = new RouData( );
			}
			
			return RouData.rouData;
		}
		
		/**
		 * 傳回紅黑資料格式字串
		 * @param	str
		 * @return
		 */
		public findRedBlack(str:string):string {
			var ar:any[] = str.split('.');
			var len:number= ar.length;
			var temp:string = '';
			var result:string = '';
			
			for (var i:number= 0; i < len; i++) {
				temp = this._redBlackStructure[(ar[i])];
				
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
		public findBigSmall(str:string):string {
			var ar:any[] = str.split('.');
			var len:number= ar.length;
			var temp:string = '';
			var result:string = '';
			
			for (var i:number= 0; i < len; i++) {
				temp = this._bigSmallStructure[(ar[i])];
				
				if( !temp ){
					console.log("輪盤路單資料錯誤:" + ar[i] );
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
		public findOddEven(str:string):string {
			var ar:any[] = str.split('.');
			var len:number= ar.length;
			var temp:string = '';
			var result:string = '';
			
			for (var i:number= 0; i < len; i++) {
				temp = this._oddEvenData[(ar[i])];
				
				if ( result != '' ) {
					result += '.'+temp;
				}
				else {
					result = temp;
				}
			}
			
			return result;
			
		}
		
		
		public findZoenRowData(str:string):string {
			var ar:any[] = str.split('.');
			var len:number= ar.length;
			var temp:string = '';
			var temp2:string = '';
			var result:string = '';
			
			for (var i:number= 0; i < len; i++) {
				if ( this._zeroData[(ar[i])] == undefined ) {
					//打
					temp = this._zoenData[(ar[i])]
					
					//列
					temp2 = this._rowData[(ar[i])];
					
					if ( result != '' ) {
						result += '.'+(temp+'_'+temp2); //打_列
					}
					else {
						result = (temp+'_'+temp2);
					}
					
				}
				//零
				else {
					
					temp = this._zeroData[(ar[i])];
					
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
		
		public getColor(no:number):number{
			
			if (this._redBlackStructure[no]==RouData.RED){
				return RouData.COLOR_RED;
			}else if (this._redBlackStructure[no]==RouData.BLACK){
				return RouData.COLOR_BLACK;
			}
			return RouData.COLOR_ZERO;
		}
		
		
		
		
	}

}
