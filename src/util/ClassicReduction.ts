module util {
	export class ClassicReduction implements IReduction{
		private m:BigInteger;
		public constructor(m:BigInteger) {
			this.m = m;
		}
		public convert(x:BigInteger):BigInteger {
			if (x.s<0 || x.compareTo(this.m)>=0) {
				return x.mod(this.m);
			}
			return x;
		}
		public revert(x:BigInteger):BigInteger {
			return x;
		}
		public reduce(x:BigInteger):void {
			x.divRemTo(this.m, null,x);
		}
		public mulTo(x:BigInteger, y:BigInteger, r:BigInteger):void {
			x.multiplyTo(y,r);
			this.reduce(r);
		}
		public sqrTo(x:BigInteger, r:BigInteger):void {
			x.squareTo(r);
			this.reduce(r);
		}
	}
}