module util {
	export class ARC4 implements IPRNG, IStreamCipher{
		private i:number = 0;
		private j:number = 0;
		private S:egret.ByteArray;
		private psize:number = 256;
		public constructor(key:egret.ByteArray = null) {
		this.S = new egret.ByteArray;
			if (key) {
				this.init(key);
			}
		}
		public getPoolSize():number {
			return this.psize;
		}
		public init(key:egret.ByteArray):void {
			var i:number;
			var j:number;
			var t:number;
			for (i=0; i<256; ++i) {
				this.S[i] = i;
			}
			j=0;
			for (i=0; i<256; ++i) {
				j = (j + this.S[i] + key[i%key.length]) & 255;
				t = this.S[i];
				this.S[i] = this.S[j];
				this.S[j] = t;
			}
			this.i=0;
			this.j=0;
		}
		public next():number {
			var t:number;
			i = (i+1)&255;
			j = (j+this.S[i])&255;
			t = this.S[i];
			this.S[i] = this.S[j];
			this.S[j] = t;
			return this.S[(t+this.S[i])&255];
		}

		public getBlockSize():number {
			return 1;
		}
		
		public encrypt(block:egret.ByteArray):void {
			var i:number = 0;
			while (i<block.length) {
				block[i++] ^= this.next();
			}
		}
		public decrypt(block:egret.ByteArray):void {
			this.encrypt(block); // the beauty of XOR.
		}
		public dispose():void {
			var i:number = 0;
			if (this.S!=null) {
				for (i=0;i<this.S.length;i++) {
					this.S[i] = Math.random()*256;
				}
				this.S.length=0;
				this.S = null;
			}
			this.i = 0;
			this.j = 0;
			Memory.gc();
		}
		public toString():string {
			return "rc4";
		}
	}
}