module util {
	export class HMAC {
		
		private  hash:IHash;
		private  bits:number;
		
		/**
		 * Create a HMAC object, using a Hash function, and 
		 * optionally a number of bits to return. 
		 * The HMAC will be truncated to that size if needed.
		 */
		public constructor(hash:IHash, bits:number=0) {
			
			this.hash = hash;
			this.bits = bits;
		}
		

		public getHashSize():number {
			if (this.bits!=0) {
				return this.bits/8;
			} else {
				return this.hash.getHashSize();
			}
		}
		
		/**
		 * Compute a HMAC using a key and some data.
		 * It doesn't modify either, and returns a new ByteArray with the HMAC value.
		 */
		public compute(key :egret.ByteArray, data :egret.ByteArray) :egret.ByteArray {
			var hashKey :egret.ByteArray;
			if (key.length>this.hash.getInputSize()) {
				hashKey = this.hash.hash(key);
			} else {
				hashKey = new egret.ByteArray;
				hashKey.writeBytes(key);
			}
			while (hashKey.length<this.hash.getInputSize()) {
				hashKey[hashKey.length]=0;
			}
			var innerKey :egret.ByteArray = new egret.ByteArray;
			var outerKey :egret.ByteArray = new egret.ByteArray;
			for (var i:number=0;i<hashKey.length;i++) {
				innerKey[i] = hashKey[i] ^ 0x36;
				outerKey[i] = hashKey[i] ^ 0x5c;
			}
			// inner + data
			innerKey.position = hashKey.length;
			innerKey.writeBytes(data);
			var innerHash :egret.ByteArray = this.hash.hash(innerKey);
			// outer + innerHash
			outerKey.position = hashKey.length;
			outerKey.writeBytes(innerHash);
			var outerHash :egret.ByteArray = this.hash.hash(outerKey);
			if (this.bits>0 && this.bits<8*outerHash.length) {
				outerHash.length = this.bits/8;
			}
			return outerHash;
		}
		public dispose():void {
			this.hash = null;
			this.bits = 0;
		}
		public toString():string {
			return "hmac-"+(this.bits>0?this.bits+"-":"")+this.hash.toString();
		}
		
	}
}