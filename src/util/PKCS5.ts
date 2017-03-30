module util {
	export class PKCS5 implements IPad{
		private blockSize:number;
		
		public constructor(blockSize:number=0) {
			this.blockSize = blockSize;
		}
		
		public pad(a:egret.ByteArray):void {
			var c:number = this.blockSize-a.length%this.blockSize;
			for (var i:number=0;i<c;i++){
				a[a.length] = c;
			}
		}
		public unpad(a:egret.ByteArray):void {
			var c:number = a.length%this.blockSize;
			if (c!=0) throw new Error("PKCS#5::unpad: ByteArray.length isn't a multiple of the blockSize");
			c = a[a.length-1];
			for (var i:number=c;i>0;i--) {
				var v:number = a[a.length-1];
				a.length--;
				if (c!=v) throw new Error("PKCS#5:unpad: Invalid padding value. expected ["+c+"], found ["+v+"]");
			}
			// that is all.
		}

		public setBlockSize(bs:number):void {
			this.blockSize = bs;
		}

	}
}