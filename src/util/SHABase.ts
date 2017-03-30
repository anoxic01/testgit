module util {
	export class SHABase implements IHash{
		public constructor() {
		}
		
		public getInputSize():number
		{
			return 64;
		}
		
		public getHashSize():number
		{
			return 0;
		}
		
		public hash(src:egret.ByteArray):egret.ByteArray
		{
			var savedLength:number = src.length;
			var savedEndian:string = src.endian;
			
			src.endian = egret.Endian.BIG_ENDIAN;
			var len:number = savedLength *8;
			// pad to nearest int.
			while (src.length%4!=0) {
				src[src.length]=0;
			}
			// convert ByteArray to an array of uint
			src.position=0;
			var a = [];
			for (var i:number=0;i<src.length;i+=4) {
				a.push(src.readUnsignedInt());
			}
			var h = this.core(a, len);
			var out:egret.ByteArray = new egret.ByteArray;
			var words:number = this.getHashSize()/4;
			for (i=0;i<words;i++) {
				out.writeUnsignedInt(h[i]);
			}
			// unpad, to leave the source untouched.
			src.length = savedLength;
			src.endian = savedEndian;
			return out;
		}
		protected core(x, len:number):any[] {
			return null;
		}
		
		public toString():string {
			return "sha";
		}
	}
}