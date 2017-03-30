module util.rtmp {
	export class TEA {
		public constructor() {
		}
		
		/*
		* encrypt text using Corrected Block TEA (xxtea) algorithm
		*
		* @param {string} plaintext String to be encrypted (multi-byte safe)
		* @param {string} password  Password to be used for encryption (1st 16 chars)
		* @returns {string} encrypted text
		*/
		public static encrypt(plaintext:string, password:string):string {
			if (plaintext.length == 0) return "";  // nothing to encrypt
			
			// convert string to array of longs after converting any multi-byte chars to UTF-8
			var v = this.charsToLongs(this.strToChars(plaintext));
			if (v.length <= 1) v[1] = 0;  // algorithm doesn't work for n<2 so fudge by adding a null
			// simply convert first 16 chars of password as key
			var k = this.charsToLongs(this.strToChars(password.substr(0, 16))); 
			var n:number = v.length;
			
			// ---- <TEA coding> ----
			
			var z:number = v[n-1], y:number = v[0], delta:number = 0x9E3779B9;
			var mx:number, e:number, q:number = Math.floor(6 + 52/n), sum:number = 0;
			
			while (q-- > 0) {  // 6 + 52/n operations gives between 6 & 32 mixes on each word
				sum += delta;
				e = sum>>>2 & 3;
				for (var p:number = 0; p < n; p++) {
					y = v[(p+1)%n];
					mx = (z>>>5 ^ y<<2) + (y>>>3 ^ z<<4) ^ (sum^y) + (k[p&3 ^ e] ^ z);
					z = v[p] += mx;
				}
			}
			
			// ---- </TEA> ----
			
			var ciphertext = this.longsToChars(v);
			
			return this.charsToHex(ciphertext);
		}	
		
		/*
		* decrypt text using Corrected Block TEA (xxtea) algorithm
		*
		* @param {string} ciphertext String to be decrypted
		* @param {string} password   Password to be used for decryption (1st 16 chars)
		* @returns {string} decrypted text
		*/
		public static decrypt(ciphertext:string, password:string):string {
			
			if (ciphertext.length == 0) return "";
			var v = this.charsToLongs(this.hexToChars(ciphertext));
			var k = this.charsToLongs(this.strToChars(password.substr(0, 16)));
			var n:number = v.length;
			
			// ---- <TEA decoding> ---- 
			
			var z:number = v[n-1], y:number = v[0], delta:number = 0x9E3779B9;
			var mx:number, e:number, q:number = Math.floor(6 + 52/n), sum:number = q*delta;
			
			while (sum != 0) {
				e = sum>>>2 & 3;
				for (var p:number = n-1; p >= 0; p--) {
					z = v[p>0 ? p-1 : n-1];
					mx = (z>>>5 ^ y<<2) + (y>>>3 ^ z<<4) ^ (sum^y) + (k[p&3 ^ e] ^ z);
					y = v[p] -= mx;
				}
				sum -= delta;
			}
			
			// ---- </TEA> ---- 
			
			var plaintext = this.longsToChars(v);
			
			return this.charsToStr(plaintext);
		}
		
		/**
		 * Private methods.
		 */
		private static charsToLongs(chars) {
			var temp = new Array(Math.ceil(chars.length/4));
			for (var i:number = 0; i<temp.length; i++) {
				temp[i] = chars[i*4] + (chars[i*4+1]<<8) + (chars[i*4+2]<<16) + (chars[i*4+3]<<24);
			}
			return temp;
		}
		
		private static longsToChars(longs) {
			var codes = new Array();
			for (var i:number = 0; i<longs.length; i++) {
				codes.push(longs[i] & 0xFF, longs[i]>>>8 & 0xFF, longs[i]>>>16 & 0xFF, longs[i]>>>24 & 0xFF);
			}
			return codes;
		}
		
		private static longToChars(longs:number) {
			var codes = new Array();
			codes.push(longs & 0xFF, longs>>>8 & 0xFF, longs>>>16 & 0xFF, longs>>>24 & 0xFF);
			return codes;
		}
		
		private static charsToHex(chars):string {
			var result:string = "";
			var hexes = new Array("0","1","2","3","4","5","6","7","8","9","a","b","c","d","e","f");
			for (var i:number = 0; i<chars.length; i++) {
				result += hexes[chars[i] >> 4] + hexes[chars[i] & 0xf];
			}
			return result;
		}
		
		private static hexToChars(hex:string) {
			var codes = new Array();
			for (var i:number = (hex.substr(0, 2) == "0x") ? 2 : 0; i<hex.length; i+=2) {
				codes.push(parseInt(hex.substr(i, 2), 16));
			}
			return codes;
		}
		
		private static charsToStr(chars):string {
			var result:string = "";
			for (var i:number = 0; i<chars.length; i++) {
				result += String.fromCharCode(chars[i]);
			}
			return result;
		}
		
		private static strToChars(str:string) {
			var codes = new Array();
			for (var i:number = 0; i<str.length; i++) {
				codes.push(str.charCodeAt(i));
			}
			return codes;
		}
	}
}