module util {
	export class SHA224 extends SHA256{
		public constructor() {
			super();
			this.h = [
				0xc1059ed8, 0x367cd507, 0x3070dd17, 0xf70e5939,
				0xffc00b31, 0x68581511, 0x64f98fa7, 0xbefa4fa4
			];
		}
		
		public  getHashSize():number {
			return 28;
		}
		public  toString():string {
			return "sha224";
		}
	}
}