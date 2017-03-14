module lobby.data {
	export class CData {

		private var _COK:String = "!=~4b7#1R814@4a8";
		protected var _a:AES;

		public constructor( str:String = '' ) {
			this._COK = str;
			
			if ( this._COK != null ) {
				var  byte:ByteArray = new ByteArray();
					byte.writeUTFBytes( _COK );
					byte.position = 0;
					
				var  md5:MD5 = new MD5();
				
					byte = md5.hash(byte);
					
				this._a = new AES(byte , byte, "aes-128-cbc","pkcs5");		
			}

			
		}
		
		/**
		 * 
		 * @param	str
		 * @return
		 */
		public function decryptStringFromBase64( str:String ):String {
			//var str:String = aes.decryptStringFromBase64( "ufXkzMRFwCqi4dmYVoaVKw==");
			try {
				var Cstr:String = this._a.decryptStringFromBase64( str );
				return Cstr;
			}
			catch (e:Error ) {
				
				//trace("CData.run() ")
			}
			return '';
		}
		
		/**
		 * 
		 * @param	byte
		 * @return
		 */
		public function decrypt( byte:ByteArray ):ByteArray {
			try {
				return this._a.decrypt( byte );
			}
			catch (e:Error ) {
				trace("CData.run2() ",e.message)
			}
			return new ByteArray();
		}
		
		/**
		 * 
		 */
		public function encrypt(byte:ByteArray ):ByteArray {
			try {
				return this._a.encrypt(byte);
			}
			catch (e:Error ) {
				//trace("CData.run3() ")
			}
			return new ByteArray();
		}
		
		/**
		 * 
		 * @param	str
		 * @return
		 */
		public function encryptString2Base64( str:String ):String {
			try {
				var Cstr:String = this._a.encryptString2Base64( str );
				return Cstr;	
			}
			catch (e:Error ) {
				trace("Cdata.ReRun()");
			}
			return '';
		}
		
		public function get COK():String 
		{
			return _COK;
		}
		
		public function set COK(value:String):void 
		{
			_COK = value;
		}
		
		
	}
}