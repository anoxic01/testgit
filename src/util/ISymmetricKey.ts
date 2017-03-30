module util {
	export interface ISymmetricKey {
		/**
		 * Returns the block size used by this particular encryption algorithm
		 */
		getBlockSize():number;
		/**
		 * Encrypt one block of data in "block", starting at "index", of length "getBlockSize()"
		 */
		encrypt(block:egret.ByteArray, index:number=0):void;
		/**
		 * Decrypt one block of data in "block", starting at "index", of length "getBlockSize()"
		 */
		decrypt(block:egret.ByteArray, index:number=0):void;
		/**
		 * Attempts to destroy sensitive information from memory, such as encryption keys.
		 * Note: This is not guaranteed to work given the Flash sandbox model.
		 */
		dispose():void;
		
		toString():string;
	}
}