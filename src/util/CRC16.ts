module util {
	export class CRC16 {
        
        private static lookup = CRC16.make_crc_table();
        
        private static make_crc_table():number[]
        {
            var table = new Array<number>();
            
            var c:number;
            var i:number;
            var j:number;
            
            for( i=0; i < 256; i++ )
            {
                c = i;
                for( j=0; j < 8; j++ )
                {
                    if( (c & 0x0001) != 0 )
                    {
                        c = 0xffff & ((c >>> 1) ^ CRC16._poly);
                    }
                    else
                    {
                        c = (c >>> 1);
                    }
                }
                table[i] = c;
            }
            
            return table;
        }
        
        // ---- CONFIG ----
        
        private static _poly:number = 0xa001;
        private static _init:number = 0x0000;
        
        // ---- CONFIG ----
        
        private _crc:number;
        private _length:number;
        private _endian:string;
        
        /**
         * Creates a CRC-16 object. 
         */
		public constructor() {
			this._length = 0xffff;
           this. _endian = egret.Endian.BIG_ENDIAN;
            //_endian = Endian.LITTLE_ENDIAN;
            this.reset();
		}
		
        /**
         * Returns the byte order for the CRC;
         * either Endian.BIG_ENDIAN for "Most significant bit first"
         * or Endian.LITTLE_ENDIAN for "Least significant bit first".
         * 
         * see: http://en.wikipedia.org/wiki/Computation_of_CRC#Bit_ordering_.28Endianness.29
         */
        public get endian():string { return this._endian; }
        
        /**
         * Returns the length the CRC;
         */
        public get length():number { return this._length; }
        
        /**
         * Updates the CRC-16 with a specified array of bytes.
         * 
         * @param bytes The ByteArray object
         * @param offset (default = 0) -- A zero-based index indicating the position into the array to begin reading.
         * @param length (default = 0) -- An unsigned integer indicating how far into the buffer to read (if 0, the length of the ByteArray is used).
         */
        public update( bytes, offset:number = 0, length:number = 0 ):void
        {
            if( length == 0 ) { length = bytes.length; }
        
            bytes.position = offset;
            
            var i:number;
            var c:number;
            var crc:number = this._length & (this._crc);
            
            for( i = offset; i < length; i++ )
            {
                c    = <number>( bytes[ i ] );
                crc  = (crc >>> 8) ^ CRC16.lookup[(crc ^ c) & 0xff];
            }
            
           this. _crc = crc;
        }
        
        /**
         * Resets the CRC-16 to its initial value. 
         */
        public reset():void
        {
            this._crc = CRC16._init;
        }
        
        /**
         * Returns the primitive value type of the CRC-16 object (unsigned integer).
         * 
         * @return a 16bits digest
         */
        public valueOf():number
        {
            return this._crc;
        }
        
        /**
         * Returns the string representation of the CRC-16 value.
         * 
         * @param radix (default = 16) -- Specifies the numeric base (from 2 to 36) to use for the uint-to-string conversion. If you do not specify the radix parameter, the default value is 16.
         * @return The numeric representation of the CRC-16 object as a string.
         */ 
        public toString( radix:number = 16 ):string
        {
            return this._crc.toString( radix );
        }
    
	}
}