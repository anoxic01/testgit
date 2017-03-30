module util {
	export class NullReduction implements IReduction{
		public constructor() {
		}
		
		public revert(x:BigInteger):BigInteger
		{
			return x;
		}
		
		public mulTo(x:BigInteger, y:BigInteger, r:BigInteger):void
		{
			x.multiplyTo(y,r);
		}
		
		public sqrTo(x:BigInteger, r:BigInteger):void
		{
			x.squareTo(r);
		}
		
		public convert(x:BigInteger):BigInteger
		{
			return x;
		}
		
		public reduce(x:BigInteger):void
		{
		}
		
	}
}