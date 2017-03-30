module util {
	export class OFBMode extends IVMode implements IMode{
		public constructor(key:ISymmetricKey, padding:IPad=null) {
			super(key, null);
		}
		
		public encrypt(src:egret.ByteArray):void
		{
			var vector:egret.ByteArray = this.getIV4e();
			this.core(src, vector);
		}
		
		public decrypt(src:egret.ByteArray):void
		{
			var vector:egret.ByteArray = this.getIV4d();
			this.core(src, vector);
		}
		
		private core(src:egret.ByteArray, iv:egret.ByteArray):void { 
			var l:number = src.length;
			var tmp:egret.ByteArray = new egret.ByteArray;
			for (var i:number=0;i<src.length;i+=this.blockSize) {
				this.key.encrypt(iv);
				tmp.position=0;
				tmp.writeBytes(iv);
				var chunk:number = (i+this.blockSize<l)?this.blockSize:l-i;
				for (var j:number=0;j<chunk;j++) {
					src[i+j] ^= iv[j];
				}
				iv.position=0;
				iv.writeBytes(tmp);
			}
		}
		public toString():string {
			return this.key.toString()+"-ofb";
		}
		
	}
}