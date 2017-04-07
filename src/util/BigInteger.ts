module util {
	export class BigInteger {
		
		public static DB:number = 30; // number of significant bits per chunk
		public static DV:number = (1<<BigInteger.DB);
		public static DM:number = (BigInteger.DV-1); // Max value in a chunk
		
		public static BI_FP:number = 52;
		public static FV:number = Math.pow(2, BigInteger.BI_FP);
		public static F1:number = BigInteger.BI_FP - BigInteger.DB;
		public static F2:number = 2*BigInteger.DB - BigInteger.BI_FP;
		
		public static ZERO:BigInteger = BigInteger.nbv(0);
		public static ONE:BigInteger  = BigInteger.nbv(1);
		
		public t:number; // number of chunks.
		public s:number; // sign
		public a; // chunks
		
		public constructor(value = null, radix:number = 0) {
			this.a = new Array;
			
			if (value instanceof string) {
				value = Hex.toArray(value);
				radix=0;
			}
			if (value instanceof egret.ByteArray) {
				var array:egret.ByteArray = value as egret.ByteArray;
				var length:number = radix || (array.length - array.position);
				this.fromArray(array, length);
			}
		}
		
		public dispose():void {
			var r:Random = new Random;
			for (var i:number=0;i<this.a.length;i++) {
				this.a[i] = r.nextByte();
				delete this.a[i];
			}
			this.a=null;
			this.t=0;
			this.s=0;
			// Memory.gc();
		}
		
		public toString(radix:number=16):string {
			if (this.s<0) return "-"+this.negate().toString(radix);
			var k:number;
			switch (radix) {
				case 2:   k=1; break;
				case 4:   k=2; break;
				case 8:   k=3; break;
				case 16:  k=4; break;
				case 32:  k=5; break;
				default:
//					return toRadix(radix);
			}
			var km:number = (1<<k)-1;
			var d:number = 0;
			var m:Boolean = false;
			var r:string = "";
			var i:number = this.t;
			var p:number = BigInteger.DB-(i*BigInteger.DB)%k;
			if (i-->0) {
				if (p<BigInteger.DB && (d=this.a[i]>>p)>0) {
					m = true;
					r = d.toString(36);
				}
				while (i >= 0) {
					if (p<k) {
						d = (this.a[i]&((1<<p)-1))<<(k-p);
						d|= this.a[--i]>>(p+=BigInteger.DB-k);
					} else {
						d = (this.a[i]>>(p-=k))&km;
						if (p<=0) {
							p += BigInteger.DB;
							--i;
						}
					}
					if (d>0) {
						m = true;
					}
					if (m) {
						r += d.toString(36);
					}
				}
			}
			return m?r:"0";
		}
		public toArray(array:egret.ByteArray):number {
			const k:number = 8;
			const km:number = (1<<8)-1;
			var d:number = 0;
			var i:number = this.t;
			var p:number = BigInteger.DB-(i*BigInteger.DB)%k;
			var m:Boolean = false;
			var c:number = 0;
			if (i-->0) {
				if (p<BigInteger.DB && (d=this.a[i]>>p)>0) {
					m = true;
					array.writeByte(d);
					c++;
				}
				while (i >= 0) {
					if (p<k) {
						d = (this.a[i]&((1<<p)-1))<<(k-p);
						d|= this.a[--i]>>(p+=BigInteger.DB-k);
					} else {
						d = (this.a[i]>>(p-=k))&km;
						if (p<=0) {
							p += BigInteger.DB;
							--i;
						}
					}
					if (d>0) {
						m = true;
					}
					if (m) {
						array.writeByte(d);
						c++;
					}
				}
			}
			return c;
		}
		/**
		 * best-effort attempt to fit into a Number.
		 * precision can be lost if it just can't fit.
		 */
		public valueOf():number {
			var coef:number = 1;
			var value:number = 0;
			for (var i:number=0;i<this.t;i++) {
				value += this.a[i]*coef;
				coef *= BigInteger.DV;
			}
			return value;
		}
		/**
		 * -this
		 */
		public negate():BigInteger {
			var r:BigInteger = this.nbi();
			BigInteger.ZERO.subTo(this, r);
			return r;
		}
		/**
		 * |this|
		 */
		public abs():BigInteger {
			return (this.s<0)?this.negate():this;
		}
		/**
		 * return + if this > v, - if this < v, 0 if equal
		 */
		public compareTo(v:BigInteger):number {
			var r:number = this.s - v.s;
			if (r!=0) {
				return r;
			}
			var i:number = this.t;
			r = i-v.t;
			if (r!=0) {
				return r;
			}
			while (--i >=0) {
				r=this.a[i]-v.a[i];
				if (r != 0) return r;
			}
			return 0;
		}
		/**
		 * returns bit length of the integer x
		 */
		public nbits(x:number):number {
			var r:number = 1;
			var t:number;
			if ((t=x>>>16) != 0) { x = t; r += 16; }
			if ((t=x>>8) != 0) { x = t; r += 8; }
			if ((t=x>>4) != 0) { x = t; r += 4; }
			if ((t=x>>2) != 0) { x = t; r += 2; }
			if ((t=x>>1) != 0) { x = t; r += 1; }
			return r;
		}
		/**
		 * returns the number of bits in this
		 */
		public bitLength():number {
			if (this.t<=0) return 0;
			return BigInteger.DB*(this.t-1)+this.nbits(this.a[this.t-1]^(this.s&BigInteger.DM));
		}
		/**
		 * 
		 * @param v
		 * @return this % v
		 * 
		 */
		public mod(v:BigInteger):BigInteger {
			var r:BigInteger = this.nbi();
			this.abs().divRemTo(v,null,r);
			if (this.s<0 && r.compareTo(BigInteger.ZERO)>0) {
				v.subTo(r,r);
			}
			return r;
		}
		/**
		 * this^e % m, 0 <= e < 2^32
		 */
		public modPowInt(e:number, m:BigInteger):BigInteger {
			var z:IReduction;
			if (e<256 || m.isEven()) {
				z = new ClassicReduction(m);
			} else {
				z = new MontgomeryReduction(m);
			}
			return this.exp(e, z);
		}

		/**
		 * copy this to r
		 */
		 public copyTo(r:BigInteger):void {
			for (var i:number = this.t-1; i>=0; --i) {
				r.a[i] = this.a[i];
			}
			r.t = this.t;
			r.s = this.s;
		}
		/**
		 * set from integer value "value", -DV <= value < DV
		 */
		 public fromInt(value:number):void {
			this.t = 1;
			this.s = (value<0)?-1:0;
			if (value>0) {
				this.a[0] = value;
			} else if (value<-1) {
				this.a[0] = value+BigInteger.DV;
			} else {
				this.t = 0;
			}
		}
		/**
		 * set from ByteArray and length,
		 * starting a current position
		 * If length goes beyond the array, pad with zeroes.
		 */
		 public fromArray(value:egret.ByteArray, length:number):void {
			var p:number = value.position;
			var i:number = p+length;
			var sh:number = 0;
			const k:number = 8;
			this.t = 0;
			this.s = 0;
			while (--i >= p) {
				var x:number = i<value.length?value[i]:0;
				if (sh == 0) {
					this.a[this.t++] = x;
				} else if (sh+k > BigInteger.DB) {
					this.a[this.t-1] |= (x&((1<<(BigInteger.DB-sh))-1))<<sh;
					this.a[this.t++] = x>>(BigInteger.DB-sh);
				} else {
					this.a[this.t-1] |= x<<sh;
				}
				sh += k;
				if (sh >= BigInteger.DB) sh -= BigInteger.DB;
			}
			this.clamp();
			value.position = Math.min(p+length,value.length);
		}
		/**
		 * clamp off excess high words
		 */
		 public clamp():void {
			var c:number = this.s&BigInteger.DM;
			while (this.t>0 && this.a[this.t-1]==c) {
				--this.t;
			}
		}
		/**
		 * r = this << n*DB
		 */
		 public dlShiftTo(n:number, r:BigInteger):void {
			var i:number;
			for (i=this.t-1; i>=0; --i) {
				r.a[i+n] = this.a[i];
			}
			for (i=n-1; i>=0; --i) {
				r.a[i] = 0;
			}
			r.t = this.t+n;
			r.s = this.s;
		}
		/**
		 * r = this >> n*DB
		 */
		 public drShiftTo(n:number, r:BigInteger):void {
			var i:number;
			for (i=n; i<this.t; ++i) {
				r.a[i-n] = this.a[i];
			}
			r.t = Math.max(this.t-n,0);
			r.s = this.s;
		}
		/**
		 * r = this << n
		 */
		 public lShiftTo(n:number, r:BigInteger):void {
			var bs:number = n%BigInteger.DB;
			var cbs:number = BigInteger.DB-bs;
			var bm:number = (1<<cbs)-1;
			var ds:number = n/BigInteger.DB;
			var c:number = (this.s<<bs)&BigInteger.DM;
			var i:number;
			for (i=this.t-1; i>=0; --i) {
				r.a[i+ds+1] = (this.a[i]>>cbs)|c;
				c = (this.a[i]&bm)<<bs;
			}
			for (i=ds-1; i>=0; --i) {
				r.a[i] = 0;
			}
			r.a[ds] = c;
			r.t = this.t+ds+1;
			r.s = this.s;
			r.clamp();
		}
		/**
		 * r = this >> n
		 */
		 public rShiftTo(n:number, r:BigInteger):void {
			r.s = this.s;
			var ds:number = n/BigInteger.DB;
			if (ds >= this.t) {
				r.t = 0;
				return;
			}
			var bs:number = n%BigInteger.DB;
			var cbs:number = BigInteger.DB-bs;
			var bm:number = (1<<bs)-1;
			r.a[0] = this.a[ds]>>bs;
			var i:number;
			for (i=ds+1; i<this.t; ++i) {
				r.a[i-ds-1] |= (this.a[i]&bm)<<cbs;
				r.a[i-ds] = this.a[i]>>bs;
			}
			if (bs>0) {
				r.a[this.t-ds-1] |= (this.s&bm)<<cbs;
			}
			r.t = this.t-ds;
			r.clamp();
		}
		/**
		 * r = this - v
		 */
		 public subTo(v:BigInteger, r:BigInteger):void {
			var i:number = 0;
			var c:number = 0;
			var m:number = Math.min(v.t, this.t);
			while (i<m) {
				c += this.a[i] - v.a[i];
				r.a[i++] = c & BigInteger.DM;
				c >>= BigInteger.DB;
			}
			if (v.t < this.t) {
				c -= v.s;
				while (i< this.t) {
					c+= this.a[i];
					r.a[i++] = c&BigInteger.DM;
					c >>= BigInteger.DB;
				}
				c += this.s;
			} else {
				c += this.s;
				while (i < v.t) {
					c -= v.a[i];
					r.a[i++] = c&BigInteger.DM;
					c >>= BigInteger.DB;
				}
				c -= v.s;
			}
			r.s = (c<0)?-1:0;
			if (c<-1) {
				r.a[i++] = BigInteger.DV+c;
			} else if (c>0) {
				r.a[i++] = c;
			}
			r.t = i;
			r.clamp();
		}
		/**
		 * am: Compute w_j += (x*this_i), propagates carries,
		 * c is initial carry, returns final carry.
		 * c < 3*dvalue, x < 2*dvalue, this_i < dvalue
		 */
		 public am(i:number,x:number,w:BigInteger,j:number,c:number,n:number):number {
			var xl:number = x&0x7fff;
			var xh:number = x>>15;
			while(--n >= 0) {
				var l:number = this.a[i]&0x7fff;
				var h:number = this.a[i++]>>15;
				var m:number = xh*l + h*xl;
				l = xl*l + ((m&0x7fff)<<15)+w.a[j]+(c&0x3fffffff);
				c = (l>>>30)+(m>>>15)+xh*h+(c>>>30);
				w.a[j++] = l&0x3fffffff;
			}
			return c;
		}
		/**
		 * r = this * v, r != this,a (HAC 14.12)
		 * "this" should be the larger one if appropriate
		 */
		 public multiplyTo(v:BigInteger, r:BigInteger):void {
			var x:BigInteger = this.abs();
			var y:BigInteger = v.abs();
			var i:number = x.t;
			r.t = i+y.t;
			while (--i >= 0) {
				r.a[i] = 0;
			}
			for (i=0; i<y.t; ++i) {
				r.a[i+x.t] = x.am(0, y.a[i], r, i, 0, x.t);
			}
			r.s = 0;
			r.clamp();
			if (this.s!=v.s) {
				BigInteger.ZERO.subTo(r, r);
			}
		}
		/**
		 * r = this^2, r != this (HAC 14.16)
		 */
		 public squareTo(r:BigInteger):void {
			var x:BigInteger = this.abs();
			var i:number = r.t = 2*x.t;
			while (--i>=0) r.a[i] = 0;
			for (i=0; i<x.t-1; ++i) {
				var c:number = x.am(i, x.a[i], r, 2*i, 0, 1);
				if ((r.a[i+x.t] += x.am(i+1, 2*x.a[i], r, 2*i+1, c, x.t-i-1)) >= BigInteger.DV) {
					r.a[i+x.t] -= BigInteger.DV;
					r.a[i+x.t+1] = 1;
				}
			}
			if (r.t>0) {
				r.a[r.t-1] += x.am(i, x.a[i], r, 2*i, 0, 1);
			}
			r.s = 0;
			r.clamp();
		}
		/**
		 * divide this by m, quotient and remainder to q, r (HAC 14.20)
		 * r != q, this != m. q or r may be null.
		 */
		 public divRemTo(m:BigInteger, q:BigInteger = null, r:BigInteger = null):void {
			var pm:BigInteger = m.abs();
			if (pm.t <= 0) return;
			var pt:BigInteger = this.abs();
			if (pt.t < pm.t) {
				if (q!=null) q.fromInt(0);
				if (r!=null) this.copyTo(r);
				return;
			}
			if (r==null) r = this.nbi();
			var y:BigInteger = this.nbi();
			var ts:number = this.s;
			var ms:number = m.s;
			var nsh:number = BigInteger.DB-this.nbits(pm.a[pm.t-1]); // normalize modulus
			if (nsh>0) {
				pm.lShiftTo(nsh, y);
				pt.lShiftTo(nsh, r);
			} else {
				pm.copyTo(y);
				pt.copyTo(r);
			}
			var ys:number = y.t;
			var y0:number = y.a[ys-1];
			if (y0==0) return;
			var yt:number = y0*(1<<BigInteger.F1)+((ys>1)?y.a[ys-2]>>BigInteger.F2:0);
			var d1:number = BigInteger.FV/yt;
			var d2:number = (1<<BigInteger.F1)/yt;
			var e:number = 1<<BigInteger.F2;
			var i:number = r.t;
			var j:number = i-ys;
			var t:BigInteger = (q==null)?this.nbi():q;
			y.dlShiftTo(j,t);
			if (r.compareTo(t)>=0) {
				r.a[r.t++] = 1;
				r.subTo(t,r);
			}
			BigInteger.ONE.dlShiftTo(ys,t);
			t.subTo(y,y); // "negative" y so we can replace sub with am later.
			while(y.t<ys) y.(y.t++, 0);
			while(--j >= 0) {
				// Estimate quotient digit
				var qd:number = (r.a[--i]==y0)?BigInteger.DM:number(r.a[i])*d1+(Number(r.a[i-1])+e)*d2;
				if ((r.a[i]+= y.am(0, qd, r, j, 0, ys))<qd) { // Try it out
					y.dlShiftTo(j, t);
					r.subTo(t,r);
					while (r.a[i]<--qd) {
						r.subTo(t,r);
					}
				}
			}
			if (q!=null) {
				r.drShiftTo(ys,q);
				if (ts!=ms) {
					BigInteger.ZERO.subTo(q,q);
				}
			}
			r.t = ys;
			r.clamp();
			if (nsh>0) {
				r.rShiftTo(nsh, r); // Denormalize remainder
			}
			if (ts<0) {
				BigInteger.ZERO.subTo(r,r);
			}
		}
		/**
		 * return "-1/this % 2^DB"; useful for Mont. reduction
		 * justification:
		 *         xy == 1 (mod n)
		 *         xy =  1+km
		 * 	 xy(2-xy) = (1+km)(1-km)
		 * x[y(2-xy)] =  1-k^2.m^2
		 * x[y(2-xy)] == 1 (mod m^2)
		 * if y is 1/x mod m, then y(2-xy) is 1/x mod m^2
		 * should reduce x and y(2-xy) by m^2 at each step to keep size bounded
		 * [XXX unit test the living shit out of this.]
		 */
		 public invDigit():number {
			if (this.t<1) return 0;
			var x:number = this.a[0];
			if ((x&1)==0) return 0;
			var y:number = x&3; 							// y == 1/x mod 2^2
			y = (y*(2-(x&0xf )*y))             &0xf;	// y == 1/x mod 2^4
			y = (y*(2-(x&0xff)*y))             &0xff;	// y == 1/x mod 2^8
			y = (y*(2-(((x&0xffff)*y)&0xffff)))&0xffff;	// y == 1/x mod 2^16
			// last step - calculate inverse mod DV directly;
			// assumes 16 < DB <= 32 and assumes ability to handle 48-bit ints
			// XXX 48 bit ints? Whaaaa? is there an implicit float conversion in here?
			y = (y*(2-x*y%BigInteger.DV))%BigInteger.DV;	// y == 1/x mod 2^dbits
			// we really want the negative inverse, and -DV < y < DV
			return (y>0)?BigInteger.DV-y:-y;
		}
		/**
		 * true iff this is even
		 */
		 public isEven():Boolean {
			return ((this.t>0)?(this.a[0]&1):this.s) == 0;
		}
		/**
		 * this^e, e < 2^32, doing sqr and mul with "r" (HAC 14.79)
		 */
		 public exp(e:number, z:IReduction):BigInteger {
			if (e > 0xffffffff || e < 1) return BigInteger.ONE;
			var r:BigInteger = this.nbi();
			var r2:BigInteger = this.nbi();
			var g:BigInteger = z.convert(this);
			var i:number = this.nbits(e)-1;
			g.copyTo(r);
			while(--i>=0) {
				z.sqrTo(r, r2);
				if ((e&(1<<i))>0) {
					z.mulTo(r2,g,r);
				} else {
					var t:BigInteger = r;
					r = r2;
					r2 = t;
				}
				
			}
			return z.revert(r);
		}
		 public intAt(str:string, index:number):number {
			return parseInt(str.charAt(index), 36);
		}


		protected nbi():BigInteger {
			return new BigInteger;
		}
		/**
		 * return bigint initialized to value
		 */
		public static nbv(value:number):BigInteger {
			var bn:BigInteger = new BigInteger;
			bn.fromInt(value);
			return bn;
		}


		// Functions above are sufficient for RSA encryption.
		// The stuff below is useful for decryption and key generation

		public static lowprimes = [2,3,5,7,11,13,17,19,23,29,31,37,41,43,47,53,59,61,67,71,73,79,83,89,97,101,103,107,109,113,127,131,137,139,149,151,157,163,167,173,179,181,191,193,197,199,211,223,227,229,233,239,241,251,257,263,269,271,277,281,283,293,307,311,313,317,331,337,347,349,353,359,367,373,379,383,389,397,401,409,419,421,431,433,439,443,449,457,461,463,467,479,487,491,499,503,509];
		public static lplim:number = (1<<26)/BigInteger.lowprimes[BigInteger.lowprimes.length-1];


		public clone():BigInteger {
			var r:BigInteger = new BigInteger;
			this.copyTo(r);
			return r;
		}
		
		/**
		 * 
		 * @return value as integer
		 * 
		 */
		public intValue():number {
			if (this.s<0) {
				if (this.t==1) {
					return this.a[0]-BigInteger.DV;
				} else if (this.t==0) {
					return -1;
				}
			} else if (this.t==1) {
				return this.a[0];
			} else if (this.t==0) {
				return 0;
			}
			// assumes 16 < DB < 32
			return  ((this.a[1]&((1<<(32-BigInteger.DB))-1))<<BigInteger.DB)|this.a[0];
		}
		
		/**
		 * 
		 * @return value as byte
		 * 
		 */
		public byteValue():number {
			return (this.t==0)?this.s:(this.a[0]<<24)>>24;
		}
		
		/**
		 * 
		 * @return value as short (assumes DB>=16)
		 * 
		 */
		public shortValue():number {
			return (this.t==0)?this.s:(this.a[0]<<16)>>16;
		}
		
		/**
		 * 
		 * @param r
		 * @return x s.t. r^x < DV
		 * 
		 */
		protected chunkSize(r:number):number {
			return Math.floor(Math.LN2*BigInteger.DB/Math.log(r));
		}
		
		/**
		 * 
		 * @return 0 if this ==0, 1 if this >0
		 * 
		 */
		public sigNum():number {
			if (this.s<0) {
				return -1;
			} else if (this.t<=0 || (this.t==1 && this.a[0]<=0)) {
				return 0;
			} else{
				return 1;
			}
		}
		
		/**
		 * 
		 * @param b: radix to use
		 * @return a string representing the integer converted to the radix.
		 * 
		 */
		protected toRadix(b:number=10):string {
			if (this.sigNum()==0 || b<2 || b>32) return "0";
			var cs:number = this.chunkSize(b);
			var a:number = Math.pow(b, cs);
			var d:BigInteger = BigInteger.nbv(a);
			var y:BigInteger = this.nbi();
			var z:BigInteger = this.nbi();
			var r:string = "";
			this.divRemTo(d, y, z);
			while (y.sigNum()>0) {
				r = (a+z.intValue()).toString(b).substr(1) + r;
				y.divRemTo(d,y,z);
			}
			return z.intValue().toString(b) + r;
		}
		
		/**
		 * 
		 * @param s a string to convert from using radix.
		 * @param b a radix
		 * 
		 */
		protected fromRadix(s:string, b:number = 10):void {
			this.fromInt(0);
			var cs:number = this.chunkSize(b);
			var d:number = Math.pow(b, cs);
			var mi:boolean = false;
			var j:number = 0;
			var w:number = 0;
			for (var i:number=0;i<s.length;++i) {
				var x:number = this.intAt(s, i);
				if (x<0) {
					if (s.charAt(i) == "-" && this.sigNum() == 0) {
						mi = true;
					}
					continue;
				}
				w = b*w+x;
				if (++j >= cs) {
					this.dMultiply(d);
					this.dAddOffset(w,0);
					j=0;
					w=0;
				}
			}
			if (j>0) {
				this.dMultiply(Math.pow(b,j));
				this.dAddOffset(w,0);
			}
			if (mi) {
				BigInteger.ZERO.subTo(this, this);
			}
		}
		
		// XXX fromNumber not written yet.
		
		/**
		 * 
		 * @return a byte array.
		 * 
		 */
		public toByteArray():egret.ByteArray {
			var i:number = this.t;
			var r:egret.ByteArray = new egret.ByteArray;
			r[0] = this.s;
			var p:number = BigInteger.DB-(i*BigInteger.DB)%8;
			var d:number;
			var k:number=0;
			if (i-->0) {
				if (p<BigInteger.DB && (d=this.a[i]>>p)!=(this.s&BigInteger.DM)>>p) {
					r[k++] = d|(this.s<<(BigInteger.DB-p));
				}
				while (i>=0) {
					if(p<8) {
						d = (this.a[i]&((1<<p)-1))<<(8-p);
						d|= this.a[--i]>>(p+=BigInteger.DB-8);
					} else {
						d = (this.a[i]>>(p-=8))&0xff;
						if (p<=0) {
							p += BigInteger.DB;
							--i;
						}
					}
					if ((d&0x80)!=0) d|=-256;
					if (k==0 && (this.s&0x80)!=(d&0x80)) ++k;
					if (k>0 || d!=this.s) r[k++] = d;
				} 
			}
			return r;
		}

		public equals(a:BigInteger):Boolean {
			return this.compareTo(a)==0;
		}
		public min(a:BigInteger):BigInteger {
			return (this.compareTo(a)<0)?this:a;
		}
		public max(a:BigInteger):BigInteger {
			return (this.compareTo(a)>0)?this:a;
		}
		
		/**
		 * 
		 * @param a	a BigInteger to perform the operation with
		 * @param op a implementing the operation
		 * @param r a BigInteger to store the result of the operation
		 * 
		 */
		protected bitwiseTo(a:BigInteger, op:Function, r:BigInteger):void {
			var i:number;
			var f:number;
			var m:number = Math.min(a.t, this.t);
			for (i=0; i<m; ++i) {
				r.a[i] = op(this.a[i],a.a[i]);
			}
			if (a.t<this.t) {
				f = a.s&BigInteger.DM;
				for (i=m;i<this.t;++i) {
					r.a[i] = op(this.a[i],f);
				}
				r.t = this.t;
			} else {
				f = this.s&BigInteger.DM;
				for (i=m;i<a.t;++i) {
					r.a[i] = op(f,a.a[i]);
				}
				r.t = a.t;
			}
			r.s = op(this.s, a.s);
			r.clamp();
		}
		
		private op_and(x:number, y:number):number {return x&y;}
		public and(a:BigInteger):BigInteger {
			var r:BigInteger = new BigInteger;
			this.bitwiseTo(a, this.op_and, r);
			return r;
		}
		
		private op_or(x:number, y:number):number {return x|y;}
		public or(a:BigInteger):BigInteger {
			var r:BigInteger = new BigInteger;
			this.bitwiseTo(a, this.op_or, r);
			return r;
		}
		
		private op_xor(x:number, y:number):number {return x^y;}
		public xor(a:BigInteger):BigInteger {
			var r:BigInteger = new BigInteger;
			this.bitwiseTo(a, this.op_xor, r);
			return r;
		}
		
		private op_andnot(x:number, y:number):number { return x&~y;}
		public andNot(a:BigInteger):BigInteger {
			var r:BigInteger = new BigInteger;
			this.bitwiseTo(a, this.op_andnot, r);
			return r;
		}
		
		public not():BigInteger {
			var r:BigInteger = new BigInteger;
			for (var i:number=0;i<this.t;++i) {
				r[i] = BigInteger.DM&~this.a[i];
			}
			r.t = this.t;
			r.s = ~this.s;
			return r;
		}
		
		public shiftLeft(n:number):BigInteger {
			var r:BigInteger = new BigInteger;
			if (n<0) {
				this.rShiftTo(-n, r);
			} else {
				this.lShiftTo(n, r);
			}
			return r;
		}
		public shiftRight(n:number):BigInteger {
			var r:BigInteger = new BigInteger;
			if (n<0) {
				this.lShiftTo(-n, r);
			} else {
				this.rShiftTo(n, r);
			}
			return r;
		}
		
		/**
		 * 
		 * @param x
		 * @return index of lowet 1-bit in x, x < 2^31
		 * 
		 */
		private lbit(x:number):number {
			if (x==0) return -1;
			var r:number = 0;
			if ((x&0xffff)==0) { x>>= 16; r += 16; }
			if ((x&0xff) == 0) { x>>=  8; r +=  8; }
			if ((x&0xf)  == 0) { x>>=  4; r +=  4; }
			if ((x&0x3)  == 0) { x>>=  2; r +=  2; }
			if ((x&0x1)  == 0) ++r;
			return r;
		}
		
		/**
		 * 
		 * @return index of lowest 1-bit (or -1 if none)
		 * 
		 */
		public getLowestSetBit():number {
			for (var i:number=0;i<this.t;++i) {
				if (this.a[i]!=0) return i*BigInteger.DB+this.lbit(this.a[i]);
			}
			if (this.s<0) return this.t*BigInteger.DB;
			return -1;
		}
		
		/**
		 * 
		 * @param x
		 * @return number of 1 bits in x
		 * 
		 */
		private cbit(x:number):number {
			var r:number =0;
			while (x!=0) { x &= x-1; ++r }
			return r;
		}
		
		/**
		 * 
		 * @return number of set bits
		 * 
		 */
		public bitCount():number {
			var r:number=0;
			var x:number = this.s&BigInteger.DM;
			for (var i:number=0;i<this.t;++i) {
				r += this.cbit(this.a[i]^x);
			}
			return r;
		}
		
		/**
		 * 
		 * @param n
		 * @return true iff nth bit is set
		 * 
		 */
		public testBit(n:number):Boolean {
			var j:number = Math.floor(n/BigInteger.DB);
			if (j>=this.t) {
				return this.s!=0;
			}
			return ((this.a[j]&(1<<(n%BigInteger.DB)))!=0);
		}
		
		/**
		 * 
		 * @param n
		 * @param op
		 * @return this op (1<<n)
		 * 
		 */
		protected changeBit(n:number,op:Function):BigInteger {
			var r:BigInteger = BigInteger.ONE.shiftLeft(n);
			this.bitwiseTo(r, op, r);
			return r;
		}
		
		/**
		 * 
		 * @param n
		 * @return this | (1<<n)
		 * 
		 */
		public setBit(n:number):BigInteger { return this.changeBit(n, this.op_or); }

		/**
		 * 
		 * @param n
		 * @return this & ~(1<<n)
		 * 
		 */
		public clearBit(n:number):BigInteger { return this.changeBit(n, this.op_andnot); }

		/**
		 * 
		 * @param n
		 * @return this ^ (1<<n)
		 * 
		 */
		public flipBit(n:number):BigInteger { return this.changeBit(n, this.op_xor); }

		/**
		 * 
		 * @param a
		 * @param r = this + a
		 * 
		 */
		protected addTo(a:BigInteger, r:BigInteger):void {
			var i:number = 0;
			var c:number = 0;
			var m:number = Math.min(a.t, this.t);
			while (i<m) {
				c += this.a[i] + a.a[i];
				r.a[i++] = c&BigInteger.DM;
				c>>=BigInteger.DB;
			}
			if (a.t < this.t) {
				c += a.s;
				while (i<this.t) {
					c += this.a[i];
					r.a[i++] = c&BigInteger.DM;
					c >>= BigInteger.DB;
				}
				c += this.s;
			} else {
				c += this.s;
				while (i<a.t) {
					c += a.a[i];
					r.a[i++] = c&BigInteger.DM;
					c >>= BigInteger.DB;
				}
				c += a.s;
			}
			r.s = (c<0)?-1:0;
			if (c>0) {
				r.a[i++] = c;
			} else if (c<-1) {
				r.a[i++] = BigInteger.DV+c;
			}
			r.t = i;
			r.clamp();
		}
		
		/**
		 * 
		 * @param a
		 * @return this + a
		 * 
		 */
		public add(a:BigInteger):BigInteger {
			var r:BigInteger = new BigInteger;
			this.addTo(a,r);
			return r;
		}

		/**
		 * 
		 * @param a
		 * @return this - a
		 * 
		 */
		public subtract(a:BigInteger):BigInteger {
			var r:BigInteger = new BigInteger;
			this.subTo(a,r);
			return r;
		}
		
		/**
		 * 
		 * @param a
		 * @return this * a
		 * 
		 */
		public multiply(a:BigInteger):BigInteger {
			var r:BigInteger = new BigInteger;
			this.multiplyTo(a,r);
			return r;
		}
		
		/**
		 * 
		 * @param a
		 * @return this / a
		 * 
		 */
		public divide(a:BigInteger):BigInteger {
			var r:BigInteger = new BigInteger;
			this.divRemTo(a, r, null);
			return r;
		}
		
		public remainder(a:BigInteger):BigInteger {
			var r:BigInteger = new BigInteger;
			this.divRemTo(a, null, r);
			return r;
		}
		
		/**
		 * 
		 * @param a
		 * @return [this/a, this%a]
		 * 
		 */
		public divideAndRemainder(a:BigInteger):any[] {
			var q:BigInteger = new BigInteger;
			var r:BigInteger = new BigInteger;
			this.divRemTo(a, q, r);
			return [q,r];
		}
		
		/**
		 * 
		 * this *= n, this >=0, 1 < n < DV
		 * 
		 * @param n
		 * 
		 */
		 public dMultiply(n:number):void {
			this.a[this.t] = this.am(0, n-1, this, 0, 0, this.t);
			++this.t;
			this.clamp();
		}
		
		/**
		 * 
		 * this += n << w words, this >= 0
		 * 
		 * @param n
		 * @param w
		 * 
		 */
		 public dAddOffset(n:number, w:number):void {
			while (this.t<=w) {
				this.a[this.t++] = 0;
			}
			this.a[w] += n;
			while (this.a[w] >= BigInteger.DV) {
				this.a[w] -= BigInteger.DV;
				if (++w >= this.t) {
					this.a[this.t++] = 0;
				}
				++this.a[w];
			}
		}

		/**
		 * 
		 * @param e
		 * @return this^e
		 * 
		 */
		public pow(e:number):BigInteger {
			return this.exp(e, new NullReduction);
		}
		
		/**
		 * 
		 * @param a
		 * @param n
		 * @param r = lower n words of "this * a", a.t <= n
		 * 
		 */
		 public multiplyLowerTo(a:BigInteger, n:number, r:BigInteger):void {
			var i:number = Math.min(this.t+a.t, n);
			r.s = 0; // assumes a, this >= 0
			r.t = i;
			while (i>0) {
				r.a[--i]=0;
			}
			var j:number;
			for (j=r.t-this.t;i<j;++i) {
				r.a[i+this.t] = this.am(0, a.a[i], r, i, 0, this.t);
			}
			for (j=Math.min(a.t,n);i<j;++i) {
				this.am(0, a.a[i], r, i, 0, n-i);
			}
			r.clamp();
		}
		
		/**
		 * 
		 * @param a
		 * @param n
		 * @param r = "this * a" without lower n words, n > 0
		 * 
		 */
		 public multiplyUpperTo(a:BigInteger, n:number, r:BigInteger):void {
			--n;
			var i:number = r.t = this.t+a.t-n;
			r.s = 0; // assumes a,this >= 0
			while (--i>=0) {
				r.a[i] = 0;
			}
			for (i=Math.max(n-this.t,0);i<a.t;++i) {
				r.a[this.t+i-n] = this.am(n-i, a.a[i], r, 0, 0, this.t+i-n);
			}
			r.clamp();
			r.drShiftTo(1,r);
		}
		
		/**
		 * 
		 * @param e
		 * @param m
		 * @return this^e % m (HAC 14.85)
		 * 
		 */
		public modPow(e:BigInteger, m:BigInteger):BigInteger {
			var i:number = e.bitLength();
			var k:number;
			var r:BigInteger = BigInteger.nbv(1);
			var z:IReduction;
			
			if (i<=0) {
				return r;
			} else if (i<18) {
				k=1;
			} else if (i<48) {
				k=3;
			} else if (i<144) {
				k=4;
			} else if (i<768) {
				k=5;
			} else {
				k=6;
			}
			if (i<8) {
				z = new ClassicReduction(m);
			} else if (m.isEven()) {
				z = new BarrettReduction(m);
			} else {
				z = new MontgomeryReduction(m);
			}
			// precomputation
			var g = [];
			var n:number = 3;
			var k1:number = k-1;
			var km:number = (1<<k)-1;
			g[1] = z.convert(this);
			if (k > 1) {
				var g2:BigInteger = new BigInteger;
				z.sqrTo(g[1], g2);
				while (n<=km) {
					g[n] = new BigInteger;
					z.mulTo(g2, g[n-2], g[n]);
					n += 2;
				}
			}
			
			var j:number = e.t-1;
			var w:number;
			var is1:Boolean = true;
			var r2:BigInteger = new BigInteger;
			var t:BigInteger;
			i = this.nbits(e.a[j])-1;
			while (j>=0) {
				if (i>=k1) {
					w = (e.a[j]>>(i-k1))&km;
				} else {
					w = (e.a[j]&((1<<(i+1))-1))<<(k1-i);
					if (j>0) {
						w |= e.a[j-1]>>(BigInteger.DB+i-k1);
					}
				}
				n = k;
				while ((w&1)==0) {
					w >>= 1;
					--n;
				}
				if ((i -= n) <0) {
					i += BigInteger.DB;
					--j;
				}
				if (is1) { // ret == 1, don't bother squaring or multiplying it
					g[w].copyTo(r);
					is1 = false;
				} else {
					while (n>1) {
						z.sqrTo(r, r2);
						z.sqrTo(r2, r);
						n -= 2;
					}
					if (n>0) {
						z.sqrTo(r, r2);
					} else {
						t = r;
						r = r2;
						r2 = t;
					}
					z.mulTo(r2, g[w], r);
				}
				while (j>=0 && (e.a[j]&(1<<i)) == 0) {
					z.sqrTo(r, r2);
					t = r;
					r = r2;
					r2 = t;
					if (--i<0) {
						i = BigInteger.DB-1;
						--j;
					}
					
				}
			}
			return z.revert(r);
		}
		
		/**
		 * 
		 * @param a
		 * @return gcd(this, a) (HAC 14.54)
		 * 
		 */
		public gcd(a:BigInteger):BigInteger {
			var x:BigInteger = (this.s<0)?this.negate():this.clone();
			var y:BigInteger = (a.s<0)?a.negate():a.clone();
			if (x.compareTo(y)<0) {
				var t:BigInteger=x;
				x=y;
				y=t;
			}
			var i:number = x.getLowestSetBit();
			var g:number = y.getLowestSetBit();
			if (g<0) return x;
			if (i<g) g= i;
			if (g>0) {
				x.rShiftTo(g, x);
				y.rShiftTo(g, y);
			}
			while (x.sigNum()>0) {
				if ((i = x.getLowestSetBit()) >0) {
					x.rShiftTo(i, x);
				}
				if ((i = y.getLowestSetBit()) >0) {
					y.rShiftTo(i, y);
				}
				if (x.compareTo(y) >= 0) {
					x.subTo(y, x);
					x.rShiftTo(1, x);
				} else {
					y.subTo(x, y);
					y.rShiftTo(1, y);
				}
			}
			if (g>0) {
				y.lShiftTo(g, y);
			}
			return y;
		}

		/**
		 * 
		 * @param n
		 * @return this % n, n < 2^DB
		 * 
		 */
		protected modInt(n:number):number {
			if (n<=0) return 0;
			var d:number = BigInteger.DV%n;
			var r:number = (this.s<0)?n-1:0;
			if (this.t>0) {
				if (d==0) {
					r = this.a[0]%n;
				} else {
					for (var i:number=this.t-1;i>=0;--i) {
						r = (d*r+this.a[i])%n;
					}
				}
			}
			return r;
		}
		
		/**
		 * 
		 * @param m
		 * @return 1/this %m (HAC 14.61)
		 * 
		 */
		public modInverse(m:BigInteger):BigInteger {
			var ac:Boolean = m.isEven();
			if ((this.isEven()&&ac) || m.sigNum()==0) {
				return BigInteger.ZERO;
			}
			var u:BigInteger = m.clone();
			var v:BigInteger = this.clone();
			var a:BigInteger = BigInteger.nbv(1);
			var b:BigInteger = BigInteger.nbv(0);
			var c:BigInteger = BigInteger.nbv(0);
			var d:BigInteger = BigInteger.nbv(1);
			while (u.sigNum()!=0) {
				while (u.isEven()) {
					u.rShiftTo(1,u);
					if (ac) {
						if (!a.isEven() || !b.isEven()) {
							a.addTo(this,a);
							b.subTo(m,b);
						}
						a.rShiftTo(1,a);
					} else if (!b.isEven()) {
						b.subTo(m,b);
					}
					b.rShiftTo(1,b);
				}
				while (v.isEven()) {
					v.rShiftTo(1,v);
					if (ac) {
						if (!c.isEven() || !d.isEven()) {
							c.addTo(this,c);
							d.subTo(m,d);
						}
						c.rShiftTo(1,c);
					} else if (!d.isEven()) {
						d.subTo(m,d);
					}
					d.rShiftTo(1,d);
				}
				if (u.compareTo(v)>=0) {
					u.subTo(v,u);
					if (ac) {
						a.subTo(c,a);
					}
					b.subTo(d,b);
				} else {
					v.subTo(u,v);
					if (ac) {
						c.subTo(a,c);
					}
					d.subTo(b,d);
				}
			}
			if (v.compareTo(BigInteger.ONE) != 0) {
				return BigInteger.ZERO;
			}
			if (d.compareTo(m) >= 0) {
				return d.subtract(m);
			}
			if (d.sigNum()<0) {
				d.addTo(m,d);
			} else {
				return d;
			}
			if (d.sigNum()<0) {
				return d.add(m);
			} else {
				return d;
			}
		}

		/**
		 * 
		 * @param t
		 * @return primality with certainty >= 1-.5^t
		 * 
		 */
		public isProbablePrime(t:number):Boolean {
			var i:number;
			var x:BigInteger = this.abs();
			if (x.t == 1 && x.a[0]<=BigInteger.lowprimes[BigInteger.lowprimes.length-1]) {
				for (i=0;i<BigInteger.lowprimes.length;++i) {
					if (x[0]==BigInteger.lowprimes[i]) return true;
				}
				return false;
			}
			if (x.isEven()) return false;
			i = 1;
			while (i<BigInteger.lowprimes.length) {
				var m:number = BigInteger.lowprimes[i];
				var j:number = i+1;
				while (j<BigInteger.lowprimes.length && m<BigInteger.lplim) {
					m *= BigInteger.lowprimes[j++];
				}
				m = x.modInt(m);
				while (i<j) {
					if (m%BigInteger.lowprimes[i++]==0) {
						return false;
					}
				}
			}
			return x.millerRabin(t);
		}
		
		/**
		 * 
		 * @param t
		 * @return true if probably prime (HAC 4.24, Miller-Rabin)
		 * 
		 */
		protected millerRabin(t:number):Boolean {
			var n1:BigInteger = this.subtract(BigInteger.ONE);
			var k:number = n1.getLowestSetBit();
			if (k<=0) {
				return false;
			}
			var r:BigInteger = n1.shiftRight(k);
			t = (t+1)>>1;
			if (t>BigInteger.lowprimes.length) {
				t = BigInteger.lowprimes.length;
			}
			var a:BigInteger = new BigInteger;
			for (var i:number=0;i<t;++i) {
				a.fromInt(BigInteger.lowprimes[i]);
				var y:BigInteger = a.modPow(r, this);
				if (y.compareTo(BigInteger.ONE)!=0 && y.compareTo(n1)!=0) {
					var j:number = 1;
					while (j++<k && y.compareTo(n1)!=0) {
						y = y.modPowInt(2, this);
						if (y.compareTo(BigInteger.ONE)==0) {
							return false;
						}
					}
					if (y.compareTo(n1)!=0) {
						return false;
					}
				}
			}
			return true;
		}

		/**
		 * Tweak our BigInteger until it looks prime enough
		 * 
		 * @param bits
		 * @param t
		 * 
		 */
		public primify(bits:number, t:number):void {
			if (!this.testBit(bits-1)) {	// force MSB set
				this.bitwiseTo(BigInteger.ONE.shiftLeft(bits-1), this.op_or, this);
			}
			if (this.isEven()) {
				this.dAddOffset(1,0);	// force odd
			}
			while (!this.isProbablePrime(t)) {
				this.dAddOffset(2,0);
				while(this.bitLength()>bits) this.subTo(BigInteger.ONE.shiftLeft(bits-1),this);
			}
		}

	}
}