module socket {
	export class SocketHeader {
		/**識別字*/
		public static  CHECK_ID = [ 0x6f , 0x2e , 0x5f , 0x29, 0x6a , 0x70 , 0x35, 0x26 ]; 
		/***/
		public static  HEADER_LEN = 20;
		
		public constructor() {
		}
		
		/**
		 * 包裝識別字
		 * @return
		 */
		private static packCheckID( ):egret.ByteArray {
			var checkID = SocketHeader.CHECK_ID;	
			
			//identifier code
			var bytesData:egret.ByteArray = new egret.ByteArray();
			var len:number = checkID.length;
			
			for (var i:number = 0; i < len; i++)  {
				bytesData[i] = checkID[i];
			}
			
			bytesData.position = len;
			
			return bytesData;
			
		}		
		
		/**
		 * 確認標頭
		 * @param	buffer
		 * @param	offset
		 * @return
		 */
		public static checkHeader( buffer:egret.ByteArray , offset:number ):Boolean {
			if ( (buffer[offset] == SocketHeader.CHECK_ID[0] ) && 
				(buffer[offset + 1] == SocketHeader.CHECK_ID[1]) && 
				(buffer[offset + 2] == SocketHeader.CHECK_ID[2]) &&
				(buffer[offset + 3] == SocketHeader.CHECK_ID[3]) && 
				(buffer[offset + 4] == SocketHeader.CHECK_ID[4]) && 
				(buffer[offset + 5] == SocketHeader.CHECK_ID[5]) && 
				(buffer[offset + 6] == SocketHeader.CHECK_ID[6]) && 
				(buffer[offset + 7] == SocketHeader.CHECK_ID[7])  ) {
				
				return true;
				
			}
			return false;
			
		}
		
		/**
		 * 取得資料長度
		 * @param	data
		 * @param	proccessIdx
		 * @return
		 */
		public static getPayLoadDataLength( data:egret.ByteArray , proccessIdx:number ):number {
			//proccessIdx -= 1;
			var num1:number = data[proccessIdx +12] << 56;
			var num2:number = data[proccessIdx +13] << 48;
			var num3:number  = data[proccessIdx +14] << 40;
			var num4:number  = data[proccessIdx +15] << 32;
			var num5:number  = data[proccessIdx +16] << 24;
			var num6:number  = data[proccessIdx +17] << 16;
			var num7:number  = data[proccessIdx +18] << 8 ;
			var num8:number  = data[proccessIdx +19] & 0xFFFF;
			
			//11111111 11111111 11111111 11111111 11111111 11111111 11111111 11111111  =>8 bytes
			//
			//trace("receive Data:");
			// 0x6f , 0x2e , 0x5f , 0x29, 0x6a , 0x70 ,0x35, 0x26
			//Utils.DumpBinary( "",data , proccessIdx +11 , proccessIdx+18 );
			
			
			var payLoadDatalength:number = num1 + num2 + num3 + num4 + num5 + num6 + num7 + num8;
			return payLoadDatalength;
		}
		
		
		/**
		 * 取得檢查碼
		 */
		public static getCheckCode( data:egret.ByteArray ):number {
			var num5:number = data[8] << 24;
			var num6:number = data[9] << 16;
			var num7:number = data[10] << 8;
			var num8:number = data[11] & 0xFF;
			
			//檢查碼
			var checkSum:number = num5 + num6 + num7 + num8;
			
			return checkSum;
		}	
		
		public static setData( len:number , checkCode:number , byteData:egret.ByteArray ):egret.ByteArray {
			var packData:egret.ByteArray = this.packCheckID();  //寫入識別字
			packData.writeInt( checkCode ); //寫入檢查碼
			SocketHeader.trans8bit( len , packData );
			packData.writeBytes( byteData );//寫入送的資料*/
			return packData;
		}
		
		private static trans8bit(value:number , packData:egret.ByteArray ):void {
			var str:string = value.toString(16);
			var lgth:number = 16 - str.length;
			for( var i:number = 0; i < lgth; i++) {
				str = "0" + str;
			}
			
			var subStr:string = str.substr( 0, 8);            
			packData.writeUnsignedInt( parseInt( "0x" + subStr)); //write 4 bytes
			subStr = str.substr( 8, 8);
			packData.writeUnsignedInt( parseInt( "0x" + subStr));	//write 4 bytes	
			
		}
		
	}
}