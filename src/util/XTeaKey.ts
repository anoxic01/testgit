module util {
	export class XTeaKey implements ISymmetricKey{
		public  NUM_ROUNDS:number = 64;	
		private  k;

		public constructor(a:egret.ByteArray) {
			a.position=0;
			this.k = [a.readUnsignedInt(),a.readUnsignedInt(),a.readUnsignedInt(),a.readUnsignedInt()];
		}
		/**
		 * K is an hex string with 32 digits.
		 */
		public static parseKey(K:string):XTeaKey {
			var a:egret.ByteArray = new egret.ByteArray;
			a.writeUnsignedInt(parseInt(K.substr(0,8),16));
			a.writeUnsignedInt(parseInt(K.substr(8,8),16));
			a.writeUnsignedInt(parseInt(K.substr(16,8),16));
			a.writeUnsignedInt(parseInt(K.substr(24,8),16));
			a.position = 0;
			return new XTeaKey(a);
		}
		
		public getBlockSize():number {
			return 8;
		}

		public encrypt(block:egret.ByteArray, index:number=0):void {
			block.position = index;
			var v0:number = block.readUnsignedInt();
			var v1:number = block.readUnsignedInt();
			var i:number;
			var sum:number =0;
			var delta:number = 0x9E3779B9;
			for (i=0; i<this.NUM_ROUNDS; i++) {
				v0 += (((v1 << 4) ^ (v1 >> 5)) + v1) ^ (sum + this.k[sum & 3]);
				sum += delta;
		        v1 += (((v0 << 4) ^ (v0 >> 5)) + v0) ^ (sum + this.k[(sum>>11) & 3]);
			}
			block.position-=8;
			block.writeUnsignedInt(v0);
			block.writeUnsignedInt(v1);
		}
		
		public decrypt(block:egret.ByteArray, index:number=0):void {
			block.position = index;
			var v0:number = block.readUnsignedInt();
			var v1:number = block.readUnsignedInt();
			var i:number;
			var delta:number = 0x9E3779B9;
			var sum:number = delta*this.NUM_ROUNDS;
			for (i=0; i<this.NUM_ROUNDS; i++) {
				v1 -= (((v0 << 4) ^ (v0 >> 5)) + v0) ^ (sum + this.k[(sum>>11) & 3]);
				sum -= delta;
				v0 -= (((v1 << 4) ^ (v1 >> 5)) + v1) ^ (sum + this.k[sum & 3]);
			}
			block.position-=8;
			block.writeUnsignedInt(v0);
			block.writeUnsignedInt(v1);
		}

		public dispose():void {
			//private var k:Array;
			var r:Random = new Random;
			for (var i:number=0;i<this.k.length;i++) {
				this.k[i] = r.nextByte();
				delete this.k[i];
			}
			this.k = null;
			// Memory.gc();
		}

		public toString():string {
			return "xtea";
		}
	}
}