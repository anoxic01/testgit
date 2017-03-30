module util {
	export class CFBMode extends IVMode implements IMode{
		public constructor(key:ISymmetricKey, padding:IPad = null) {
			super(key, null);
		}
		
		public  encrypt(src:egret.ByteArray):void
		{
			var l:number = src.length;
			var vector:egret.ByteArray = this.getIV4e();
			for (var i:number=0;i<src.length;i+=this.blockSize) {
				this.key.encrypt(vector);
				var chunk:number = (i+this.blockSize<l)?this.blockSize:l-i;
				for (var j:number=0;j<chunk;j++) {
					src[i+j] ^= vector[j];
				}
				vector.position=0;
				vector.writeBytes(src, i, chunk);
			}
		}
		
		public  decrypt(src:egret.ByteArray):void
		{
			var l:number = src.length;
			var vector:egret.ByteArray = this.getIV4d();
			var tmp:egret.ByteArray = new egret.ByteArray;
			for (var i:number=0;i<src.length;i+=this.blockSize) {
				this.key.encrypt(vector);
				var chunk:number = (i+this.blockSize<l)?this.blockSize:l-i;
				tmp.position=0;
				tmp.writeBytes(src, i, chunk);
				for (var j:number=0;j<chunk;j++) {
					src[i+j] ^= vector[j];
				}
				vector.position=0;
				vector.writeBytes(tmp);
			}
		}
		
		public  toString():string {
			return this.key.toString()+"-cfb";
		}

	}
}