module util {
	export interface IPad {
		/**
		 * Add padding to the array
		 */
		pad(a:egret.ByteArray):void;
		/**
		 * Remove padding from the array.
		 * @throws Error if the padding is invalid.
		 */
		unpad(a:egret.ByteArray):void;
		/**
		 * Set the blockSize to work on
		 */
		setBlockSize(bs:number):void;
	}
}