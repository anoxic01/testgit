module util {
	export interface IReduction {
		convert(x:BigInteger):BigInteger;
		revert(x:BigInteger):BigInteger;
		reduce(x:BigInteger):void;
		mulTo(x:BigInteger, y:BigInteger, r:BigInteger):void;
		sqrTo(x:BigInteger, r:BigInteger):void;
	}
}