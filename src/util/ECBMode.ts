module util {
	export class ECBMode implements IMode, ICipher{
		
		private  key:ISymmetricKey;
		private  padding:IPad;
		
		public constructor(key:ISymmetricKey, padding:IPad = null) {
			this.key = key;
			if (padding == null) {
				padding = new PKCS5(key.getBlockSize());
			} else {
				padding.setBlockSize(key.getBlockSize());
			}
			this.padding = padding;
		}
		
		public  getBlockSize():number {
			return this.key.getBlockSize();
		}
		
		public  encrypt(src  :egret.ByteArray):void {
			this.padding.pad(src);
			src.position = 0;
			var blockSize:number = this.key.getBlockSize();
			var tmp  :egret.ByteArray = new egret.ByteArray;
			var dst  :egret.ByteArray = new egret.ByteArray;
			for (var i:number=0;i<src.length;i+=blockSize) {
				tmp.length=0;
				src.readBytes(tmp, 0, blockSize);
				this.key.encrypt(tmp);
				dst.writeBytes(tmp);
			}
			src.length=0;
			src.writeBytes(dst);
		}
		public  decrypt(src  :egret.ByteArray):void {
			src.position = 0;
			var blockSize:number = this.key.getBlockSize();
			
			// sanity check.
			if (src.length%blockSize!=0) {
				throw new Error("ECB mode cipher length must be a multiple of blocksize "+blockSize);
			}
			
			var tmp  :egret.ByteArray = new egret.ByteArray;
			var dst  :egret.ByteArray = new egret.ByteArray;
			for (var i:number=0;i<src.length;i+=blockSize) {
				tmp.length=0;
				src.readBytes(tmp, 0, blockSize);
				
				this.key.decrypt(tmp);
				dst.writeBytes(tmp);
			}
			this.padding.unpad(dst);
			src.length=0;
			src.writeBytes(dst);
		}
		public  dispose():void {
			this.key.dispose();
			this.key = null;
			this.padding = null;
			// Memory.gc();
		}
		public  toString():string {
			return this.key.toString()+"-ecb";
		}
	}
}