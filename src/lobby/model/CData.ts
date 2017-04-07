module lobby.model {
	export class CData {

		private _COK:string = "!=~4b7#1R814@4a8";
		protected _a:util.AES;

		public constructor( str:string = '' ) {
			this._COK = str;
			
			if ( this._COK != null ) {
				var  byte:egret.ByteArray = new egret.ByteArray();
					byte.writeUTFBytes( this._COK );
					byte.position = 0;
					
				var  md5:util.MD5 = new util.MD5();
				
					byte = md5.hash(byte);
					
				this._a = new util.AES(byte , byte, "aes-128-cbc","pkcs5");		
			}

			
		}
		
		/**
		 * 
		 * @param	str
		 * @return
		 */
		public decryptStringFromBase64( str:string ):string {
			//var str:string = aes.decryptStringFromBase64( "ufXkzMRFwCqi4dmYVoaVKw==");
			try {
				var Cstr:string = this._a.decryptStringFromBase64( str );
				return Cstr;
			}
			catch (e ) {
				
				//console.log("CData.run() ")
			}
			return '';
		}
		
		/**
		 * 
		 * @param	byte
		 * @return
		 */
		public decrypt( byte:egret.ByteArray ):egret.ByteArray {
			try {
				return this._a.decrypt( byte );
			}
			catch (e ) {
				console.log("CData.run2() ",e.message)
			}
			return new egret.ByteArray();
		}
		
		/**
		 * 
		 */
		public encrypt(byte:egret.ByteArray ):egret.ByteArray {
			try {
				return this._a.encrypt(byte);
			}
			catch (e ) {
				//console.log("CData.run3() ")
			}
			return new egret.ByteArray();
		}
		
		/**
		 * 
		 * @param	str
		 * @return
		 */
		public encryptString2Base64( str:string ):string {
			try {
				var Cstr:string = this._a.encryptString2Base64( str );
				return Cstr;	
			}
			catch (e ) {
				console.log("Cdata.ReRun()");
			}
			return '';
		}
		
		get COK():string 
		{
			return this._COK;
		}
		
		set  COK(value:string) 
		{
			this._COK = value;
		}
		
		
	}
}