module util {
	export interface IHash {
		getInputSize():number;
		getHashSize():number;
		hash(src:egret.ByteArray):egret.ByteArray;
		toString():string;
	}
}