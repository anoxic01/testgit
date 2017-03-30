module util {
	export class AES {
		/**
		 * 默认的算法与模式名称。
		 */
		public static DEFAULT_CIPHER_NAME:string = "aes-128-cbc";

		/**
		*/
		public static DEFAULT_PADNAME:string = "pkcs5";

		/**
		* 无填充。
		*/
		public static NULL_PADDING:string = "null";

		private static RAND:Random = new Random();

		private _name:string;
		// 密钥
		private _key:egret.ByteArray;
		// 向量
		private _iv:egret.ByteArray;
		// 填充模式
		private _padName:string;
		private _enc:ICipher;
		private _dec:ICipher;
		
		public constructor(key:egret.ByteArray, iv:egret.ByteArray = null, name:string = AES.DEFAULT_CIPHER_NAME, padName:string = AES.DEFAULT_PADNAME) {
				_name = name;
				this._key = key;
				this._iv = iv;
				this._padName = padName;
				this.init();
		}
          
        private init():void {
			var _pad:IPad = Crypto.getPad(this._padName);
				this._enc = Crypto.getCipher(_name, this._key, _pad);
				this._dec = Crypto.getCipher(_name, this._key, _pad);
		  if (this.iv) {
			 if (this._enc instanceof IVMode) {
				   var encIvm:IVMode = this._enc as IVMode;
				  encIvm.IV = this.iv;
			  }
			 if (this._dec instanceof IVMode) {
				   var decIvm:IVMode = this._dec as IVMode;
				 decIvm.IV = this.iv;
			   }
		  }
         }
           
		public static generateKey(name:string):egret.ByteArray {
			var keyLength:number = Crypto.getKeySize(name);
			var key:egret.ByteArray = new egret.ByteArray();
		   this.RAND.nextBytes(key, keyLength);
			   return key;
		 }
          
		public static generateIV(name:string, key:egret.ByteArray):egret.ByteArray {
			  var cipher:ICipher = Crypto.getCipher(name, key);
			   var iv:egret.ByteArray = new egret.ByteArray();
			 this.RAND.nextBytes(iv, cipher.getBlockSize());
			   return iv;
		 }
           
        set iv(value:egret.ByteArray) {
              this._iv = value;
          }
         
        get iv():egret.ByteArray {
              return this._iv;
         }
         
       // base functions
        public encrypt(input:egret.ByteArray):egret.ByteArray {
             var src:egret.ByteArray = new egret.ByteArray();
			var result:egret.ByteArray = new egret.ByteArray();
              src.writeBytes(input, 0, input.length);
              
             this._enc.encrypt(input);
             result.writeBytes(input, 0, input.length);
            input.length = 0;
             input.writeBytes(src, 0, src.length);

          src.clear();
           return result;
        }
      
        
		public decrypt(input:egret.ByteArray):egret.ByteArray {
				  
		 var src:egret.ByteArray = new egret.ByteArray();
				  
		 var result:egret.ByteArray = new egret.ByteArray();
			   
		 src.writeBytes(input, 0, input.length);
				
		 this._dec.decrypt(input);
				
		 result.writeBytes(input, 0, input.length);
			   
		 input.length = 0;
				
		 input.writeBytes(src, 0, src.length);
			   
		 src.clear();
			  
		 return result;
		   
		}
    
		public encryptString(input:string):egret.ByteArray {
          
			if (!input || !input.length) {
                  return null;
             }
            var inputBytes:egret.ByteArray = new egret.ByteArray();
            inputBytes.writeUTFBytes(input);
              return this.encrypt(inputBytes);
          }
          
          public encryptString2Hex(input:string):string {
             var result:egret.ByteArray = this.encryptString(input);
             return Hex.fromArray(result);
         }
        
         public encryptString2Base64(input:string):string {
             var result:egret.ByteArray = this.encryptString(input);
             return Base64.encodeByteArray(result);
          }
       
        
        // decrypt string
		public decryptString(input:egret.ByteArray):string {
		  var decryptBytes:egret.ByteArray = this.decrypt(input);
			decryptBytes.position = 0;
			 var result:string = decryptBytes.readUTFBytes(decryptBytes.length);
		   return result;
		 }
         
		public decryptStringFromHex(input:string):string {
            var inputBytes:egret.ByteArray = Hex.toArray(input);
              var result:string = this.decryptString(inputBytes);
             return result;
         }
        
        public decryptStringFromBase64(input:string):string {
           var inputBytes:egret.ByteArray = Base64.decodeToByteArray(input);
            var result:string = this.decryptString(inputBytes);
            return result;
         }
       
        
     }
  }