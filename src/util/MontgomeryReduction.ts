module util {
	export class MontgomeryReduction implements IReduction{
		private m:BigInteger;
		private mp:number;
		private mpl:number;
		private mph:number;
		private um:number;
		private mt2:number;
		public constructor(m:BigInteger) {
			this.m = m;
			this.mp = m.invDigit();
			this.mpl =this.mp & 0x7fff;
			this.mph =this. mp>>15;
			this.um = (1<<(BigInteger.DB-15))-1;
			this.mt2 = 2*m.t;
		}
		/**
		 * xR mod m
		 */
		public convert(x:BigInteger):BigInteger {
			var r:BigInteger = new BigInteger;
		 	x.abs().dlShiftTo(this.m.t, r);
		 	r.divRemTo(this.m, null, r);
		 	if (x.s<0 && r.compareTo(BigInteger.ZERO)>0) {
		 		this.m.subTo(r,r);
		 	}
		 	return r;
		}
		/**
		 * x/R mod m
		 */
		public revert(x:BigInteger):BigInteger {
			var r:BigInteger = new BigInteger;
			x.copyTo(r);
			this.reduce(r);
			return r;
		}
		/**
		 * x = x/R mod m (HAC 14.32)
		 */
		public reduce(x:BigInteger):void {
			while (x.t<=this.mt2) {		// pad x so am has enough room later
				x.a[x.t++] = 0;
			}
			for (var i:number=0; i<this.m.t; ++i) {
				// faster way of calculating u0 = x[i]*mp mod DV
				var j:number = x.a[i]&0x7fff;
				var u0:number = (j*this.mpl+(((j*this.mph+(x.a[i]>>15)*this.mpl)&this.um)<<15))&BigInteger.DM;
				// use am to combine the multiply-shift-add into one call
				j = i+this.m.t;
				x.a[j] += this.m.am(0, u0, x, i, 0, this.m.t);
				// propagate carry
				while (x.a[j]>=BigInteger.DV) {
					x.a[j] -= BigInteger.DV;
					x.a[++j]++;
				}
			}
	 		x.clamp();
		 	x.drShiftTo(this.m.t, x);
	 		if (x.compareTo(this.m)>=0) {
	 			x.subTo(this.m,x);
	 		}
		}
		/**
		 * r = "x^2/R mod m"; x != r
		 */
		public sqrTo(x:BigInteger, r:BigInteger):void {
			x.squareTo(r);
			this.reduce(r);
		}
		/**
		 * r = "xy/R mod m"; x,y != r
		 */
		public mulTo(x:BigInteger, y:BigInteger, r:BigInteger):void {
			x.multiplyTo(y,r);
			this.reduce(r);
		}
	}
}