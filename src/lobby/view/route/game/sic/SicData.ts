module lobby.view.route.game.sic {
	export class SicData {
		private static sicData:SicData;
		
		
		public static SMALL:string = "b";
		public static BIG:string = "c";
		public static EVEN:string = "d";
		public static ODD:string = "f";
		/**圍榖*/
		public static SURROUND_DICE:string = "g";
		
		
		

		
		private _bigSmallStructure;
		private _oddEvenData;
		private _beadData;
		
		protected _surroundData;

		
		public constructor() {
		
			
			//圍骰  只有單雙 跟 大小 才有 圍骰
			this._surroundData = {};
			this._surroundData["111"] = SicData.SURROUND_DICE;
			this._surroundData["222"] = SicData.SURROUND_DICE;
			this._surroundData["333"] = SicData.SURROUND_DICE;
			this._surroundData["444"] = SicData.SURROUND_DICE;
			this._surroundData["555"] = SicData.SURROUND_DICE;
			this._surroundData["666"] = SicData.SURROUND_DICE;
			
			//大小
			this._bigSmallStructure = {};

			for (var l:number= 4; l <= 10; l++) 
			{
				this._bigSmallStructure[l] = SicData.SMALL;
			}
			for (l = 11; l <= 17; l++) 
			{
				this._bigSmallStructure[l] = SicData.BIG;
			}
			
			
			//單雙
			this._oddEvenData = {};
			
			for (var k:number= 5; k <= 17; k+=2) 
			{
				this._oddEvenData[k] = SicData.ODD;
			}
			for (var j:number= 4; j <= 16; j+=2) 
			{
				this._oddEvenData[j] = SicData.EVEN;
			}

			

		}
		public static getInstance( ):SicData {
			if ( SicData.sicData == null ) {
				SicData.sicData = new SicData( );
			}
			
			return SicData.sicData;
		}
		
		/**
		 * 
		 * 骰寶 111.146.456.566 -> 3.11.15.17
		 * @param	str
		 * @return
		 */
		public findTie(str:string):string {
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
					totalPoint += (ar2[j]);
				}
				
				temp = '';
				temp = ""+(totalPoint).toString;
				
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
		public findBigSmall(str:string):string {
			var ar:any[] = str.split('.');
			var len:number= ar.length;
			var temp:string = '';
			var result:string = '';
			var ar2:any[]
			var totalPoint:number= 0;
			
			var surround:string = "";
			
			for (var i:number= 0; i < len; i++) {
				surround = this._surroundData[ar[i]];
				
				//判斷圍骰
				if ( surround == null ) {
					ar2 = ar[i].split('');
					totalPoint = 0;
					
					for (var j:number= 0; j < ar2.length; j++) {
						totalPoint += (ar2[j]);
					}
					
					temp = '';
					temp = this._bigSmallStructure[totalPoint];
					
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
		public findOddEven(str:string):string {
			var ar:any[] = str.split('.');
			var len:number= ar.length;
			var temp:string = '';
			var result:string = '';
			var ar2:any[]
			var totalPoint:number= 0;
			
			var surround:string = "";
			
			for (var i:number= 0; i < len; i++) {
				surround = this._surroundData[ar[i]];
				
				//判斷圍骰
				if ( surround == null ) {
					ar2 = ar[i].split('');
					totalPoint = 0;
					
					for (var j:number= 0; j < ar2.length; j++) {
						totalPoint += (ar2[j]);
					}
					
					temp = '';
					temp = this._oddEvenData[totalPoint];
					
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
