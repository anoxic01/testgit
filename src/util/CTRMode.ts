module util {
	export class CTRMode extends IVMode implements IMode{
		public constructor(key:ISymmetricKey, padding:IPad = null) {
			super(key, padding);
		}
		
		public encrypt(src:egret.ByteArray):void
		{
			this.padding.pad(src);
			var vector:egret.ByteArray = this.getIV4e();
			this.core(src, vector);
		}
		
		public decrypt(src:egret.ByteArray):void
		{
			var vector:egret.ByteArray = this.getIV4d();
			this.core(src, vector);
			this.padding.unpad(src);
		}
		
		private core(src:egret.ByteArray, iv:egret.ByteArray):void {
			var X:egret.ByteArray = new egret.ByteArray;
			var Xenc:egret.ByteArray = new egret.ByteArray;
			X.writeBytes(iv);
			for (var i:number=0;i<src.length;i+=this.blockSize) {
				Xenc.position=0;
				Xenc.writeBytes(X);
				this.key.encrypt(Xenc);
				for (var j:number=0;j<this.blockSize;j++) {
					src[i+j] ^= Xenc[j];
				}
				
 				for (j=this.blockSize-1;j>=0;--j) {
					X[j]++;
					if (X[j]!=0)
						break;
				}
			}
		}
		public toString():string {
			return this.key.toString()+"-ctr";
		}
		
	}
}