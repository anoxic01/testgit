module util {
	export class SimpleIVMode implements IMode, ICipher{
		protected  mode:IVMode;
		protected  cipher:ICipher;
		
		public constructor(mode:IVMode) {
			this.mode = mode;
			this.cipher = mode as ICipher;
		}
		
		public getBlockSize():number {
			return this.mode.getBlockSize();
		}
		
		public dispose():void {
			this.mode.dispose();
			this.mode = null;
			this.cipher = null;
			// Memory.gc();
		}
		
		public encrypt(src:egret.ByteArray):void {
			this.cipher.encrypt(src);
			var tmp:egret.ByteArray = new egret.ByteArray;
			tmp.writeBytes(this.mode.IV);
			tmp.writeBytes(src);
			src.position=0;
			src.writeBytes(tmp);
		}
		
		public decrypt(src:egret.ByteArray):void {
			var tmp:egret.ByteArray = new egret.ByteArray;
			tmp.writeBytes(src, 0, this.getBlockSize());
			this.mode.IV = tmp;
			tmp = new egret.ByteArray;
			tmp.writeBytes(src, this.getBlockSize());
			this.cipher.decrypt(tmp);
			src.length=0;
			src.writeBytes(tmp);
		}
		public toString():string {
			return "simple-"+this.cipher.toString();
		}
	}
}