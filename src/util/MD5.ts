module util {
	export class MD5 {
		public constructor() {
		}
		
		public static HASH_SIZE:number = 16;
		
		public getInputSize():number
		{
			return 64;
		}
		
		public getHashSize():number
		{
			return MD5.HASH_SIZE;
		}
		
		public hash(src:egret.ByteArray):egret.ByteArray
		{
			var len:number = src.length *8;
			var savedEndian:string = src.endian;
			// pad to nearest int.
			while (src.length%4!=0) {
				src[src.length]=0;
			}
			// convert ByteArray to an array of uint
			src.position=0;
			var a = [];
			src.endian=egret.Endian.LITTLE_ENDIAN
			for (var i:number=0;i<src.length;i+=4) {
				a.push(src.readUnsignedInt());
			}
			var h = this.core_md5(a, len);
			var out:egret.ByteArray = new egret.ByteArray;
			out.endian=egret.Endian.LITTLE_ENDIAN;
			for (i=0;i<4;i++) {
				out.writeUnsignedInt(h[i]);
			}
			// restore length!
			src.length = len/8;
			src.endian = savedEndian;
			
			return out;
		}
		
		private core_md5(x, len:number):any[] {
		  /* append padding */
		  x[len >> 5] |= 0x80 << ((len) % 32);
		  x[(((len + 64) >>> 9) << 4) + 14] = len;

		  var a:number = 0x67452301; // 1732584193;
		  var b:number = 0xEFCDAB89; //-271733879;
		  var c:number = 0x98BADCFE; //-1732584194;
		  var d:number = 0x10325476; // 271733878;

		  for(var i:number = 0; i < x.length; i += 16)
		  {
		  	x[i]||=0;    x[i+1]||=0;  x[i+2]||=0;  x[i+3]||=0;
		  	x[i+4]||=0;  x[i+5]||=0;  x[i+6]||=0;  x[i+7]||=0;
		  	x[i+8]||=0;  x[i+9]||=0;  x[i+10]||=0; x[i+11]||=0;
		  	x[i+12]||=0; x[i+13]||=0; x[i+14]||=0; x[i+15]||=0;

		    var olda:number = a;
		    var oldb:number = b;
		    var oldc:number = c;
		    var oldd:number = d;
		    
		    a = this.ff(a, b, c, d, x[i+ 0], 7 , 0xD76AA478);
		    d = this.ff(d, a, b, c, x[i+ 1], 12, 0xE8C7B756);
		    c = this.ff(c, d, a, b, x[i+ 2], 17, 0x242070DB);
		    b = this.ff(b, c, d, a, x[i+ 3], 22, 0xC1BDCEEE);
		    a = this.ff(a, b, c, d, x[i+ 4], 7 , 0xF57C0FAF);
		    d = this.ff(d, a, b, c, x[i+ 5], 12, 0x4787C62A);
		    c = this.ff(c, d, a, b, x[i+ 6], 17, 0xA8304613);
		    b = this.ff(b, c, d, a, x[i+ 7], 22, 0xFD469501);
		    a = this.ff(a, b, c, d, x[i+ 8], 7 , 0x698098D8);
		    d = this.ff(d, a, b, c, x[i+ 9], 12, 0x8B44F7AF);
		    c = this.ff(c, d, a, b, x[i+10], 17, 0xFFFF5BB1);
		    b = this.ff(b, c, d, a, x[i+11], 22, 0x895CD7BE);
		    a = this.ff(a, b, c, d, x[i+12], 7 , 0x6B901122);
		    d = this.ff(d, a, b, c, x[i+13], 12, 0xFD987193);
		    c = this.ff(c, d, a, b, x[i+14], 17, 0xA679438E);
		    b = this.ff(b, c, d, a, x[i+15], 22, 0x49B40821);

		    a = this.gg(a, b, c, d, x[i+ 1], 5 , 0xf61e2562);
		    d = this.gg(d, a, b, c, x[i+ 6], 9 , 0xc040b340);
		    c = this.gg(c, d, a, b, x[i+11], 14, 0x265e5a51);
		    b = this.gg(b, c, d, a, x[i+ 0], 20, 0xe9b6c7aa);
		    a = this.gg(a, b, c, d, x[i+ 5], 5 , 0xd62f105d);
		    d = this.gg(d, a, b, c, x[i+10], 9 ,  0x2441453);
		    c = this.gg(c, d, a, b, x[i+15], 14, 0xd8a1e681);
		    b = this.gg(b, c, d, a, x[i+ 4], 20, 0xe7d3fbc8);
		    a = this.gg(a, b, c, d, x[i+ 9], 5 , 0x21e1cde6);
		    d = this.gg(d, a, b, c, x[i+14], 9 , 0xc33707d6);
		    c = this.gg(c, d, a, b, x[i+ 3], 14, 0xf4d50d87);
		    b = this.gg(b, c, d, a, x[i+ 8], 20, 0x455a14ed);
		    a = this.gg(a, b, c, d, x[i+13], 5 , 0xa9e3e905);
		    d = this.gg(d, a, b, c, x[i+ 2], 9 , 0xfcefa3f8);
		    c = this.gg(c, d, a, b, x[i+ 7], 14, 0x676f02d9);
		    b = this.gg(b, c, d, a, x[i+12], 20, 0x8d2a4c8a);

		    a = this.hh(a, b, c, d, x[i+ 5], 4 , 0xfffa3942);
		    d = this.hh(d, a, b, c, x[i+ 8], 11, 0x8771f681);
		    c = this.hh(c, d, a, b, x[i+11], 16, 0x6d9d6122);
		    b = this.hh(b, c, d, a, x[i+14], 23, 0xfde5380c);
		    a = this.hh(a, b, c, d, x[i+ 1], 4 , 0xa4beea44);
		    d = this.hh(d, a, b, c, x[i+ 4], 11, 0x4bdecfa9);
		    c = this.hh(c, d, a, b, x[i+ 7], 16, 0xf6bb4b60);
		    b = this.hh(b, c, d, a, x[i+10], 23, 0xbebfbc70);
		    a = this.hh(a, b, c, d, x[i+13], 4 , 0x289b7ec6);
		    d = this.hh(d, a, b, c, x[i+ 0], 11, 0xeaa127fa);
		    c = this.hh(c, d, a, b, x[i+ 3], 16, 0xd4ef3085);
		    b = this.hh(b, c, d, a, x[i+ 6], 23,  0x4881d05);
		    a = this.hh(a, b, c, d, x[i+ 9], 4 , 0xd9d4d039);
		    d = this.hh(d, a, b, c, x[i+12], 11, 0xe6db99e5);
		    c = this.hh(c, d, a, b, x[i+15], 16, 0x1fa27cf8);
		    b = this.hh(b, c, d, a, x[i+ 2], 23, 0xc4ac5665);
		
		    a = this.ii(a, b, c, d, x[i+ 0], 6 , 0xf4292244);
		    d = this.ii(d, a, b, c, x[i+ 7], 10, 0x432aff97);
		    c = this.ii(c, d, a, b, x[i+14], 15, 0xab9423a7);
		    b = this.ii(b, c, d, a, x[i+ 5], 21, 0xfc93a039);
		    a = this.ii(a, b, c, d, x[i+12], 6 , 0x655b59c3);
		    d = this.ii(d, a, b, c, x[i+ 3], 10, 0x8f0ccc92);
		    c = this.ii(c, d, a, b, x[i+10], 15, 0xffeff47d);
		    b = this.ii(b, c, d, a, x[i+ 1], 21, 0x85845dd1);
		    a = this.ii(a, b, c, d, x[i+ 8], 6 , 0x6fa87e4f);
		    d = this.ii(d, a, b, c, x[i+15], 10, 0xfe2ce6e0);
		    c = this.ii(c, d, a, b, x[i+ 6], 15, 0xa3014314);
		    b = this.ii(b, c, d, a, x[i+13], 21, 0x4e0811a1);
		    a = this.ii(a, b, c, d, x[i+ 4], 6 , 0xf7537e82);
		    d = this.ii(d, a, b, c, x[i+11], 10, 0xbd3af235);
		    c = this.ii(c, d, a, b, x[i+ 2], 15, 0x2ad7d2bb);
		    b = this.ii(b, c, d, a, x[i+ 9], 21, 0xeb86d391);
		
			a += olda;
			b += oldb;
			c += oldc;
			d += oldd;
			
		  }
		  return [ a, b, c, d ];
		}

		/*
		 * Bitwise rotate a 32-bit number to the left.
		 */
		private rol(num:number, cnt:number):number
		{
		  return (num << cnt) | (num >>> (32 - cnt));
		}

		/*
		 * These functions implement the four basic operations the algorithm uses.
		 */
		private  cmn(q:number, a:number, b:number, x:number, s:number, t:number):number {
		  return this.rol(a + q + x + t, s) + b;
		}
		private ff(a:number, b:number, c:number, d:number, x:number, s:number, t:number):number {
		  return this.cmn((b & c) | ((~b) & d), a, b, x, s, t);
		}
		private gg(a:number, b:number, c:number, d:number, x:number, s:number, t:number):number {
		  return this.cmn((b & d) | (c & (~d)), a, b, x, s, t);
		}
		private hh(a:number, b:number, c:number, d:number, x:number, s:number, t:number):number {
		  return this.cmn(b ^ c ^ d, a, b, x, s, t);
		}
		private ii(a:number, b:number, c:number, d:number, x:number, s:number, t:number):number {
		  return this.cmn(c ^ (b | (~d)), a, b, x, s, t);
		}

		public toString():string {
			return "md5";
		}
	}
}