module util {
	export class CBCMode extends IVMode implements IMode{
		public constructor(key:ISymmetricKey, padding:IPad = null) {
			super(key, padding);
		}
		
		public encrypt(src :egret.ByteArray):void {
			this.padding.pad(src);
			var vector :egret.ByteArray = this.getIV4e();
			for (var i:number=0;i<src.length;i+=this.blockSize) {
				for (var j:number=0;j<this.blockSize;j++) {
					src[i+j] ^= vector[j];
				}
				this.key.encrypt(src, i);
				vector.position=0;
				vector.writeBytes(src, i, this.blockSize);
			}
		}
		public decrypt(src :egret.ByteArray):void {
			var vector :egret.ByteArray = this.getIV4d();
			var tmp :egret.ByteArray = new egret.ByteArray;
			for (var i:number=0;i<src.length;i+=this.blockSize) {
				tmp.position=0;
				tmp.writeBytes(src, i, this.blockSize);
				this.key.decrypt(src, i);
				for (var j:number=0;j<this.blockSize;j++) {
					src[i+j] ^= vector[j];
				}
				vector.position=0;
				vector.writeBytes(tmp, 0, this.blockSize);
			}
			this.padding.unpad(src);
		}
		
		public toString():string {
			return this.key.toString()+"-cbc";
		}
	}
}