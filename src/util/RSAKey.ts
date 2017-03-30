module util {
	export class RSAKey {
		// public key
		public  e:number;              // public exponent. must be <2^31
		public  n:BigInteger; // modulus
		// private key
		public  d:BigInteger;
		// extended private key
		public  p:BigInteger;
		public  q:BigInteger;
		public  dmp1:BigInteger
		public  dmq1:BigInteger;
		public  coeff:BigInteger;
		// flags. flags are cool.
		protected  canDecrypt:Boolean;
		protected  canEncrypt:Boolean;
		
		public constructor(N:BigInteger, E:number,  D:BigInteger=null, P:BigInteger = null, Q:BigInteger=null, DP:BigInteger=null, DQ:BigInteger=null, C:BigInteger=null) {
				
			this.n = N;
			this.e = E;
			this.d = D;
			this.p = P;
			this.q = Q;
			this.dmp1 = DP;
			this.dmq1 = DQ;
			this.coeff = C;
			// adjust a few flags.
			this.canEncrypt = (this.n!=null&&this.e!=0);
			this.canDecrypt = (this.canEncrypt&&this.d!=null);
		}
		
		public static parsePublicKey(N:string, E:string):RSAKey {
			return new RSAKey(new BigInteger(N, 16), parseInt(E,16));
		}
		public static parsePrivateKey(N:string, E:string, D:string, 
			P:string=null,Q:string=null, DMP1:string=null, DMQ1:string=null, IQMP:string=null):RSAKey {
			if (P==null) {
				return new RSAKey(new BigInteger(N,16), parseInt(E,16), new BigInteger(D,16));
			} else {
				return new RSAKey(new BigInteger(N,16), parseInt(E,16), new BigInteger(D,16),
					new BigInteger(P,16), new BigInteger(Q,16),
					new BigInteger(DMP1,16), new BigInteger(DMQ1),
					new BigInteger(IQMP));				
			}
		}
		
		public getBlockSize():number {
			return (this.n.bitLength()+7)/8;
		}
		public dispose():void {
			this.e = 0;
			this.n.dispose();
			this.n = null;
			// Memory.gc();
		}

		public encrypt(src:egret.ByteArray, dst:egret.ByteArray, length:number, pad:Function=null):void {
			this._encrypt(this.doPublic, src, dst, length, pad, 0x02);
		}
		public decrypt(src:egret.ByteArray, dst:egret.ByteArray, length:number, pad:Function=null):void {
			this._decrypt(this.doPrivate2, src, dst, length, pad, 0x02);
		}

		public sign(src:egret.ByteArray, dst:egret.ByteArray, length:number, pad:Function = null):void {
			this._encrypt(this.doPrivate2, src, dst, length, pad, 0x01);
		}
		public verify(src:egret.ByteArray, dst:egret.ByteArray, length:number, pad:Function = null):void {
			this._decrypt(this.doPublic, src, dst, length, pad, 0x01);
		}
		

		private _encrypt(op:Function, src:egret.ByteArray, dst:egret.ByteArray, length:number, pad:Function, padType:number):void {
			// adjust pad if needed
			if (pad==null) pad = this.pkcs1pad;
			// convert src to BigInteger
			if (src.position >= src.length) {
				src.position = 0;
			}
			var bl:number = this.getBlockSize();
			var end:number = src.position + length;
			while (src.position<end) {
				var block:BigInteger = new BigInteger(pad(src, end, bl, padType), bl);
				var chunk:BigInteger = op(block);
				chunk.toArray(dst);
			}
		}
		private _decrypt(op:Function, src:egret.ByteArray, dst:egret.ByteArray, length:number, pad:Function, padType:number):void {
			// adjust pad if needed
			if (pad==null) pad = this.pkcs1unpad;
			
			// convert src to BigInteger
			if (src.position >= src.length) {
				src.position = 0;
			}
			var bl:number = this.getBlockSize();
			var end:number = src.position + length;
			while (src.position<end) {
				var block:BigInteger = new BigInteger(src, length);
				var chunk:BigInteger = op(block);
				var b:egret.ByteArray = pad(chunk, bl);
				dst.writeBytes(b);
			}
		}
		
		/**
		 * PKCS#1 pad. type 1 (0xff) or 2, random.
		 * puts as much data from src into it, leaves what doesn't fit alone.
		 */
		private pkcs1pad(src:egret.ByteArray, end:number, n:number, type:number = 0x02):egret.ByteArray {
			var out:egret.ByteArray = new egret.ByteArray;
			var p:number = src.position;
			end = Math.min(end, src.length, p+n-11);
			src.position = end;
			var i:number = end-1;
			while (i>=p && n>11) {
				out[--n] = src[i--];
			}
			out[--n] = 0;
			var rng:Random = new Random;
			while (n>2) {
				var x:number = 0;
				while (x==0) x = (type==0x02)?rng.nextByte():0xFF;
				out[--n] = x;
			}
			out[--n] = type;
			out[--n] = 0;
			return out;
		}
		
		/**
		 * 
		 * @param src
		 * @param n
		 * @param type Not used.
		 * @return 
		 * 
		 */
		private pkcs1unpad(src:BigInteger, n:number, type:number = 0x02):egret.ByteArray {
			var b:egret.ByteArray = src.toByteArray();
			var out:egret.ByteArray = new egret.ByteArray;
			var i:number = 0;
			while (i<b.length && b[i]==0) ++i;
			if (b.length-i != n-1 || b[i]>2) {
				console.log("PKCS#1 unpad: i="+i+", expected b[i]==[0,1,2], got b[i]="+b[i].toString(16));
				return null;
			}
			++i;
			while (b[i]!=0) {
				if (++i>=b.length) {
					console.log("PKCS#1 unpad: i="+i+", b[i-1]!=0 (="+b[i-1].toString(16)+")");
					return null;
				}
			}
			while (++i < b.length) {
				out.writeByte(b[i]);
			}
			out.position = 0;
			return out;
		}
		/**
		 * Raw pad.
		 */
		private rawpad(src:egret.ByteArray, end:number, n:number):egret.ByteArray {
			return src;
		}
		
		public toString():string {
			return "rsa";
		}
		
		public dump():string {
			var s:string= "N="+this.n.toString(16)+"\n"+
			"E="+this.e.toString(16)+"\n";
			if (this.canDecrypt) {
				s+="D="+this.d.toString(16)+"\n";
				if (this.p!=null && this.q!=null) {
					s+="P="+this.p.toString(16)+"\n";
					s+="Q="+this.q.toString(16)+"\n";
					s+="DMP1="+this.dmp1.toString(16)+"\n";
					s+="DMQ1="+this.dmq1.toString(16)+"\n";
					s+="IQMP="+this.coeff.toString(16)+"\n";
				}
			}
			return s;
		}
		
		
		/**
		 * 
		 * note: We should have a "nice" variant of this that takes a callback,
		 * 		and perform the computation is small fragments, to keep the web browser
		 * 		usable.
		 * 
		 * @param B
		 * @param E
		 * @return a new random private key B bits long, using public expt E
		 * 
		 */
		public static generate(B:number, E:string):RSAKey {
			var rng:Random = new Random;
			var qs:number = B>>1;
			var key:RSAKey = new RSAKey(null,0,null);
			key.e = parseInt(E, 16);
			var ee:BigInteger = new BigInteger(E,16);
			for (;;) {
				for (;;) {
					key.p = this.bigRandom(B-qs, rng);
					if (key.p.subtract(BigInteger.ONE).gcd(ee).compareTo(BigInteger.ONE)==0 &&
						key.p.isProbablePrime(10)) break;
				}
				for (;;) {
					key.q = this.bigRandom(qs, rng);
					if (key.q.subtract(BigInteger.ONE).gcd(ee).compareTo(BigInteger.ONE)==0 &&
						key.q.isProbablePrime(10)) break;
				}
				if (key.p.compareTo(key.q)<=0) {
					var t:BigInteger = key.p;
					key.p = key.q;
					key.q = t;
				}
				var p1:BigInteger = key.p.subtract(BigInteger.ONE);
				var q1:BigInteger = key.q.subtract(BigInteger.ONE);
				var phi:BigInteger = p1.multiply(q1);
				if (phi.gcd(ee).compareTo(BigInteger.ONE)==0) {
					key.n = key.p.multiply(key.q);
					key.d = ee.modInverse(phi);
					key.dmp1 = key.d.mod(p1);
					key.dmq1 = key.d.mod(q1);
					key.coeff = key.q.modInverse(key.p);
					break;
				}
			}
			return key;
		}
		
		protected static bigRandom(bits:number, rnd:Random):BigInteger {
			if (bits<2) return BigInteger.nbv(1);
			var x:egret.ByteArray = new egret.ByteArray;
			rnd.nextBytes(x, (bits>>3));
			x.position = 0;
			var b:BigInteger = new BigInteger(x);
			b.primify(bits, 1);
			return b;
		}
		
		protected doPublic(x:BigInteger):BigInteger {
			return x.modPowInt(this.e, this.n);
		}
		
		protected doPrivate2(x:BigInteger):BigInteger {
			if (this.p==null && this.q==null) {
				return x.modPow(this.d,this.n);
			}
			
			var xp:BigInteger = x.mod(this.p).modPow(this.dmp1, this.p);
			var xq:BigInteger = x.mod(this.q).modPow(this.dmq1, this.q);
			
			while (xp.compareTo(xq)<0) {
				xp = xp.add(this.p);
			}
			var r:BigInteger = xp.subtract(xq).multiply(this.coeff).mod(this.p).multiply(this.q).add(xq);
			
			return r;
		}
		
		protected doPrivate(x:BigInteger):BigInteger {
			if (this.p==null || this.q==null) {
				return x.modPow(this.d, this.n);
			}
			// TODO: re-calculate any missing CRT params
			var xp:BigInteger = x.mod(this.p).modPow(this.dmp1, this.p);
			var xq:BigInteger = x.mod(this.q).modPow(this.dmq1, this.q);
			
			while (xp.compareTo(xq)<0) {
				xp = xp.add(this.p);
			}
			return xp.subtract(xq).multiply(this.coeff).mod(this.p).multiply(this.q).add(xq);
		}
		
		
	}
}