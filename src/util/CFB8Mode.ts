module util {
	export class CFB8Mode extends IVMode implements IMode{
		public constructor(key:ISymmetricKey, padding:IPad = null) {
			super(key, null);
		}
		
		public encrypt(src:egret.ByteArray):void {
			var vector:egret.ByteArray = this.getIV4e();
			var tmp:egret.ByteArray = new egret.ByteArray;
			for (var i:number=0;i<src.length;i++) {
				tmp.position = 0;
				tmp.writeBytes(vector);
				this.key.encrypt(vector);
				src[i] ^= vector[0];
				// rotate
				for (var j:number=0;j<this.blockSize-1;j++) {
					vector[j] = tmp[j+1];
				}
				vector[this.blockSize-1] = src[i];
			}
		}
		
		public decrypt(src:egret.ByteArray):void {
			var vector:egret.ByteArray = this.getIV4d();
			var tmp:egret.ByteArray = new egret.ByteArray;
			for (var i:number=0;i<src.length;i++) {
				var c:number = src[i];
				tmp.position = 0;
				tmp.writeBytes(vector); // I <- tmp
				this.key.encrypt(vector);    // O <- vector
				src[i] ^= vector[0];
				// rotate
				for (var j:number=0;j<this.blockSize-1;j++) {
					vector[j] = tmp[j+1];
				}
				vector[this.blockSize-1] = c;
			}

		}
		public toString():string {
			return this.key.toString()+"-cfb8";
		}
	}
}