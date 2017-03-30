module util {
	export class SHA1 extends SHABase implements IHash{
		public static  HASH_SIZE:number = 20;
		
		public constructor() {
			super();
		}
		
		public getHashSize():number {
			return SHA1.HASH_SIZE;
		}
		
		protected core(x, len:number):any[]
		{
		  /* append padding */
		  x[len >> 5] |= 0x80 << (24 - len % 32);
		  x[((len + 64 >> 9) << 4) + 15] = len;
		
		  var w = [];
		  var a:number =  0x67452301; //1732584193;
		  var b:number = 0xEFCDAB89; //-271733879;
		  var c:number = 0x98BADCFE; //-1732584194;
		  var d:number = 0x10325476; //271733878;
		  var e:number = 0xC3D2E1F0; //-1009589776;
		
		  for(var i:number = 0; i < x.length; i += 16)
		  {
		  	
		    var olda:number = a;
		    var oldb:number = b;
		    var oldc:number = c;
		    var oldd:number = d;
		    var olde:number = e;
		
		    for(var j:number = 0; j < 80; j++)
		    {
		      if (j < 16) {
		      	w[j] = x[i + j] || 0;
		      } else {
		      	w[j] = this.rol(w[j-3] ^ w[j-8] ^ w[j-14] ^ w[j-16], 1);
		      }
		      var t:number = this.rol(a,5) + this.ft(j,b,c,d) + e + w[j] + this.kt(j);
		      e = d;
		      d = c;
		      c = this.rol(b, 30);
		      b = a;
		      a = t;
		    }
			a += olda;
			b += oldb;
			c += oldc;
			d += oldd;
			e += olde;
		  }
		  return [ a, b, c, d, e ];
		
		}
		
		/*
		 * Bitwise rotate a 32-bit number to the left.
		 */
		private rol(num:number, cnt:number):number
		{
		  return (num << cnt) | (num >>> (32 - cnt));
		}
		
		/*
		 * Perform the appropriate triplet combination for the current
		 * iteration
		 */
		private ft(t:number, b:number, c:number, d:number):number
		{
		  if(t < 20) return (b & c) | ((~b) & d);
		  if(t < 40) return b ^ c ^ d;
		  if(t < 60) return (b & c) | (b & d) | (c & d);
		  return b ^ c ^ d;
		}
		
		/*
		 * Determine the appropriate additive constant for the current iteration
		 */
		private kt(t:number):number
		{
		  return (t < 20) ? 0x5A827999 : (t < 40) ?  0x6ED9EBA1 :
		         (t < 60) ? 0x8F1BBCDC : 0xCA62C1D6;
		}
		public toString():string {
			return "sha1";
		}
	}
}