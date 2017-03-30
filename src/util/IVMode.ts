module util {
	export class IVMode implements ICipher{

		protected key:ISymmetricKey;
		protected padding:IPad;
		// random generator used to generate IVs
		protected prng:Random;
		// optional static IV. used for testing only.
		protected iv:egret.ByteArray;
		// generated IV is stored here.
		protected lastIV:egret.ByteArray;
		protected blockSize:number;

		public constructor(key:ISymmetricKey, padding:IPad = null) {
			this.key = key;
			this.blockSize = key.getBlockSize();
			if (padding == null) {
				padding = new PKCS5(this.blockSize);
			} else {
				padding.setBlockSize(this.blockSize);
			}
			this.padding = padding;
			
			this.prng = new Random(null);
			this.iv = null;
			this.lastIV = new egret.ByteArray;
		}
		
		public getBlockSize():number {
			return this.key.getBlockSize();
		}
		public dispose():void {
			var i:number;
			if (this.iv != null) {
				for (i=0;i<this.iv.length;i++) {
					this.iv[i] = this.prng.nextByte();
				}
				this.iv.length=0;
				this.iv = null;
			}
			if (this.lastIV != null) {
				for (i=0;i<this.iv.length;i++) {
					this.lastIV[i] = this.prng.nextByte();
				}
				this.lastIV.length=0;
				this.lastIV=null;
			}
			this.key.dispose();
			this.key = null;
			this.padding = null;
			this.prng.dispose();
			this.prng = null;
			// Memory.gc();
		}
		/**
		 * Optional function to force the IV value.
		 * Normally, an IV gets generated randomly at every encrypt() call.
		 * Also, use this to set the IV before calling decrypt()
		 * (if not set before decrypt(), the IV is read from the beginning of the stream.)
		 */
		set IV(value:egret.ByteArray) {
			this.iv = value;
			this.lastIV.length=0;
			this.lastIV.writeBytes(this.iv);
		}
		get IV():egret.ByteArray {
			return this.lastIV;
		}
		
		protected getIV4e():egret.ByteArray {
			var vec:egret.ByteArray = new egret.ByteArray;
			if (this.iv) {
				vec.writeBytes(this.iv);
			} else {
				this.prng.nextBytes(vec, this.blockSize);
			}
			this.lastIV.length=0;
			this.lastIV.writeBytes(vec);
			return vec;
		}
		protected getIV4d():egret.ByteArray {
			var vec:egret.ByteArray = new egret.ByteArray;
			if (this.iv) {
				vec.writeBytes(this.iv);
			} else {
				throw new Error("an IV must be set before calling decrypt()");
			}
			return vec;
		}

		public encrypt(src:egret.ByteArray):void{

		}

		public decrypt(src:egret.ByteArray):void{

		}
	}
}