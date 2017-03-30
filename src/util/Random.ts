module util {
	export class Random {
		private  state:IPRNG;
		private  ready:Boolean = false;
		private  pool:egret.ByteArray;
		private  psize:number;
		private  pptr:number;
		private  seeded:Boolean = false;
		
		public constructor(prng=null) {
			if (prng==null) prng = ARC4;
			this.state = new prng as IPRNG;
			this.psize= this.state.getPoolSize();
			this.pool = new egret.ByteArray;
			this.pptr = 0;
			while (this.pptr < this.psize) {
				var t:number = 65536*Math.random();
				this.pool[this.pptr++] = t >>> 8;
				this.pool[this.pptr++] = t&255;
			}
			this.pptr=0;
			this.seed();
		}
		
		public seed(x:number = 0):void {
			if (x==0) {
				x = new Date().getTime();
			}
			this.pool[this.pptr++] ^= x & 255;
			this.pool[this.pptr++] ^= (x>>8)&255;
			this.pool[this.pptr++] ^= (x>>16)&255;
			this.pool[this.pptr++] ^= (x>>24)&255;
			this.pptr %= this.psize;
			this.seeded = true;
		}
		
		/**
		 * Gather anything we have that isn't entirely predictable:
		 *  - memory used
		 *  - system capabilities
		 *  - timing stuff
		 *  - installed fonts
		 */
		public autoSeed():void {
			var b:egret.ByteArray = new egret.ByteArray;
			b.writeUnsignedInt(System.totalMemory);
			b.writeUTF(Capabilities.serverString);
			b.writeUnsignedInt(this.getTimer());
			b.writeUnsignedInt((new Date).getTime());
			var a = Font.enumerateFonts(true);
			for each (var f:Font in a) {
				b.writeUTF(f.fontName);
				b.writeUTF(f.fontStyle);
				b.writeUTF(f.fontType);
			}
			b.position=0;
			while (b.bytesAvailable>=4) {
				this.seed(b.readUnsignedInt());
			}
		}
		
		
		public nextBytes(buffer:egret.ByteArray, length:number):void {
			while (length--) {
				buffer.writeByte(this.nextByte());
			}
		}
		public nextByte():int {
			if (!this.ready) {
				if (!this.seeded) {
					this.autoSeed();
				}
				this.state.init(this.pool);
				this.pool.length = 0;
				this.pptr = 0;
				this.ready = true;
			}
			return this.state.next();
		}
		public dispose():void {
			for (var i:number=0;i<this.pool.length;i++) {
				this.pool[i] = Math.random()*256;
			}
			this.pool.length=0;
			this.pool = null;
			this.state.dispose();
			this.state = null;
			this.psize = 0;
			this.pptr = 0;
			this.Memory.gc();
		}
		public toString():string {
			return "random-"+this.state.toString();
		}
		
	}
}