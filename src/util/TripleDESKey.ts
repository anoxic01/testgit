module util {
	export class TripleDESKey extends DESKey{
		
		protected  encKey2;
		protected  encKey3;
		protected  decKey2;
		protected  decKey3;
		
		/**
		 * This supports 2TDES and 3TDES.
		 * If the key passed is 128 bits, 2TDES is used.
		 * If the key has 192 bits, 3TDES is used.
		 * Other key lengths give "undefined" results.
		 */
		public constructor(key:egret.ByteArray) {
			super(key);
			this.encKey2 = this.generateWorkingKey(false, key, 8);
			this.decKey2 = this.generateWorkingKey(true, key, 8);
			if (key.length>16) {
				this.encKey3 = this.generateWorkingKey(true, key, 16);
				this.decKey3 = this.generateWorkingKey(false, key, 16);
			} else {
				this.encKey3 = this.encKey;
				this.decKey3 = this.decKey;
			}
		}
		
		public  dispose():void
		{
			super.dispose();
			var i:number = 0;
			if (this.encKey2!=null) {
				for (i=0;i<this.encKey2.length;i++) { this.encKey2[i]=0; }
				this.encKey2=null;
			}
			if (this.encKey3!=null) {
				for (i=0;i<this.encKey3.length;i++) { this.encKey3[i]=0; }
				this.encKey3=null;
			}
			if (this.decKey2!=null) {
				for (i=0;i<this.decKey2.length;i++) { this.decKey2[i]=0; }
				this.decKey2=null
			}
			if (this.decKey3!=null) {
				for (i=0;i<this.decKey3.length;i++) { this.decKey3[i]=0; }
				this.decKey3=null;
			}
			// Memory.gc();
		}
		
		public  encrypt(block:egret.ByteArray, index:number=0):void
		{
			this.desFunc(this.encKey, block,index, block,index);
			this.desFunc(this.encKey2, block,index, block,index);
			this.desFunc(this.encKey3, block,index, block,index);
		}
		
		public  decrypt(block:egret.ByteArray, index:number=0):void
		{
			this.desFunc(this.decKey3, block, index, block, index);
			this.desFunc(this.decKey2, block, index, block, index);
			this.desFunc(this.decKey, block, index, block, index);
		}
		
		public  toString():string {
			return "3des";
		}
	}
}