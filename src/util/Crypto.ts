module util {
	export class Crypto {
		private b64:Base64; // we don't use it, but we want the swc to include it, so cheap trick.
		
		public constructor() {
		}
		
		/**
		 * Things that should work, among others:
		 *  "aes"
		 *  "aes-128-ecb"
		 *  "aes-128-cbc"
		 *  "aes-128-cfb"
		 *  "aes-128-cfb8"
		 *  "aes-128-ofb"
		 *  "aes-192-cfb"
		 *  "aes-256-ofb"
		 *  "blowfish-cbc"
		 *  "des-ecb"
		 *  "xtea"
		 *  "xtea-ecb"
		 *  "xtea-cbc"
		 *  "xtea-cfb"
		 *  "xtea-cfb8"
		 *  "xtea-ofb"
		 *  "rc4"
		 *  "simple-aes-cbc"
		 */
		public static getCipher(name:string, key:egret.ByteArray, pad:IPad=null):ICipher {
			// split name into an array.
			var keys = name.split("-");
			switch (keys[0]) {
				/**
				 * "simple" is a special case. It means:
				 * "If using an IV mode, prepend the IV to the ciphertext"
				 */
				case "simple":
					keys.shift();
					name = keys.join("-");
					var cipher:ICipher = this.getCipher(name, key, pad);
					if (cipher instanceof IVMode) {
						return new SimpleIVMode(cipher as IVMode);
					} else {
						return cipher;
					}
				/**
				 * we support both "aes-128" and "aes128"
				 * Technically, you could use "aes192-128", but you'd
				 * only be hurting yourself.
				 */
				case "aes":
				case "aes128":
				case "aes192":
				case "aes256":
					keys.shift();
					if (key.length*8==(<number>keys[0])) {
						// support for "aes-128-..." and such.
						keys.shift();
					}
					return this.getMode(keys[0], new AESKey(key), pad);
				case "bf":
				case "blowfish":
					keys.shift();
					return this.getMode(keys[0], new BlowFishKey(key), pad);
				/**
				 * des-ede and des-ede3 are both equivalent to des3.
				 * the choice between 2tdes and 3tdes is made based
				 * on the length of the key provided.
				 */
				case "des":
					keys.shift();
					if (keys[0]!="ede" && keys[0]!="ede3") {
						return this.getMode(keys[0], new DESKey(key), pad);
					}
					if (keys.length==1) {
						keys.push("ecb"); // default mode for 2tdes and 3tdes with openssl enc
					}
					break;
					// fall-through to triple des
				case "3des":
				case "des3":
					keys.shift();
					return this.getMode(keys[0], new TripleDESKey(key), pad);
				case "xtea":
					keys.shift();
					return this.getMode(keys[0], new XTeaKey(key), pad);
				/**
				 * Technically, you could say "rc4-128" or whatever,
				 * but really, the length of the key is what counts here.
				 */
				case "rc4":
					keys.shift();
					return new ARC4(key);
			}
			return null;
		}
		
		/**
		 * Returns the size of a key for a given cipher identifier.
		 */
		public static getKeySize(name:string):number {
			var keys = name.split("-");
			switch (keys[0]) {
				case "simple":
					keys.shift();
					return this.getKeySize(keys.join("-"));
				case "aes128":
					return 16;
				case "aes192":
					return 24;
				case "aes256":
					return 32;
				case "aes":
					keys.shift();
					return parseInt(keys[0])/8;
				case "bf":
				case "blowfish":
					return 16;
				case "des":
					keys.shift();
					switch (keys[0]) {
						case "ede":
							return 16;
						case "ede3":
							return 24;
						default:
							return 8;
					}
				case "3des":
				case "des3":
					return 24;
				case "xtea":
					return 8;
				case "rc4":
					if (parseInt(keys[1])>0) {
						return parseInt(keys[1])/8;
					}
					return 16; // why not.
			}
			return 0; // unknown;
		}
		
		private static getMode(name:string, alg:ISymmetricKey, padding:IPad=null):IMode {
			switch (name) {
				case "ecb":
					return new ECBMode(alg, padding);
				case "cfb":
					return new CFBMode(alg, padding);
				case "cfb8":
					return new CFB8Mode(alg, padding);
				case "ofb":
					return new OFBMode(alg, padding);
				case "ctr":
					return new CTRMode(alg, padding);
				case "cbc":
				default:
					return new CBCMode(alg, padding);
			}
		}
		
		/**
		 * Things that should work:
		 * "md5"
		 * "sha"
		 * "sha1"
		 * "sha224"
		 * "sha256"
		 */
		public static getHash(name:string):IHash {
			switch(name) {
				case "md2":
					return new MD2;
				case "md5":
					return new MD5;
				case "sha": // let's hope you didn't mean sha-0
				case "sha1":
					return new SHA1;
				case "sha224":
					return new SHA224;
				case "sha256":
					return new SHA256;
			}
			return null;
		}
		
		/**
		 * Things that should work:
		 * "sha1"
		 * "md5-64"
		 * "hmac-md5-96"
		 * "hmac-sha1-128"
		 * "hmac-sha256-192"
		 * etc.
		 */
		public static getHMAC(name:string):HMAC {
			var keys = name.split("-");
			if (keys[0]=="hmac") keys.shift();
			var bits:number = 0;
			if (keys.length>1) {
				bits = parseInt(keys[1]);
			}
			return new HMAC(this.getHash(keys[0]), bits);
		}
		
		public static getPad(name:string):IPad {
			switch(name) {
				case "null":
					return new NullPad;
				case "pkcs5":
				default:
					return new PKCS5;
			}
		}
		
		/** mostly useless.
		 */
		public static getRSA(E:string, M:string):RSAKey {
			return RSAKey.parsePublicKey(M,E);
		}
	}
}