module util {
	export class Hex {
		public constructor() {
		}
		/**
		 * Support straight hex, or colon-laced hex.
		 * (that means 23:03:0e:f0, but *NOT* 23:3:e:f0)
		 * Whitespace characters are ignored.
		 */
		public static toArray(hex:string):egret.ByteArray {
			hex = hex.replace(/\s|:/gm,'');
			var a:egret.ByteArray = new egret.ByteArray;
			if ((hex.length&1)==1) hex="0"+hex;
			for (var i:number=0;i<hex.length;i+=2) {
				a[i/2] = parseInt(hex.substr(i,2),16);
			}
			return a;
		}
		
		public static fromArray(array:egret.ByteArray, colons:Boolean=false):string {
			var s:string = "";
			for (var i:number=0;i<array.length;i++) {
				s+=("0"+array[i].toString(16)).substr(-2,2);
				if (colons) {
					if (i<array.length-1) s+=":";
				}
			}
			return s;
		}
		
		/**
		 * 
		 * @param hex
		 * @return a UTF-8 string decoded from hex
		 * 
		 */
		public static toString(hex:string):string {
			var a:egret.ByteArray = this.toArray(hex);
			return a.readUTFBytes(a.length);
		}
		
		
		/**
		 * 
		 * @param str
		 * @return a hex string encoded from the UTF-8 string str
		 * 
		 */
		public static fromString(str:string, colons:Boolean=false):string {
			var a:egret.ByteArray = new egret.ByteArray;
			a.writeUTFBytes(str);
			return this.fromArray(a, colons);
		}
	}
}