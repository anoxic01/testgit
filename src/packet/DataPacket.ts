module packet {
	export class DataPacket  implements IPacket{
		/**送出資料列表*/ 
		protected m_zip				:	GZIPBytesEncoder;
		protected m_socketParser	:	SocketParser;
		
		public constructor(_socketParser:SocketParser) {
			init();
			m_socketParser = _socketParser;
		}
		public destroy():void{
			if(m_socketParser){
				m_socketParser = null;
			}
			if(m_zip){
				m_zip = null;
			}
		}
				
		protected init():void  {
			m_zip  = new GZIPBytesEncoder();
			
		}
		
		/**
		 * 包裝資料給外部用
		 * @param	type
		 * @param	sendData
		 * @return
		 */
		public pack( type:number , sendData:Object ):ByteArray {
			
			//init();
			
			var data:Object = sendData;
			var key:string = "";
			
			
			var byteData:ByteArray = new ByteArray();
			byteData.writeByte( type ); //寫入type
			
			
			if ( sendData != null ) {
				//data[key] = sendData;
				PacketSN.SN = PacketSN.SN + 1;				//送出消息序號加1
				data.SN = PacketSN.SN % 65536;
				
				
				
				var jsonData:string = JSON.stringify( data ); //json 資料字串
				
				var twoWay:string = null;
				if ( type == PacketDefine.PEEK_PROGRESS ) {
					twoWay = PacketDefine.SEND;
				}else if( type == PacketDefine.C_LOGIN_LOBBY_OK ) {		
					ClientPacketSN.instance().Login_Lobby_Check_SN = data.SN;		//需要比對的SN,目前用於電投,電投在收到登入確認封包SN後 ,  才可以送配槍手
				}
				else if( type == PacketDefine.C_ENTER_TABLE_OK ){
					ClientPacketSN.instance().Login_Game_Check_SN = data.SN;		//需要比對的SN,目前用於電投,電投在收到登入確認封包SN後 ,  才可以送配槍手
				}
				else if( type == PacketDefine.C_Heart ) {
					ClientPacketSN.instance().Lobby_Heart_SN = data.SN;
				}
				else if( type == PacketDefine.S_Heart){								//客戶端 回送服務端心跳包
					twoWay = PacketDefine.SEND;
				}
				
				var jsonByte:ByteArray = jsonToByteArray( jsonData );  //轉成byteArray
				jsonByte.position = 0;
				
				
				
				jsonByte = m_socketParser.judgeCData( type , jsonByte , twoWay );
				
				
				var compress: boolean = m_socketParser.judgeUncompress( type );
				
				//console.log("compress:::::::::" + compress );
				//判斷是否壓縮
				if ( compress ) {
					
					jsonByte.position = 0;
					jsonByte = m_zip.compressToByteArray( jsonByte );
					
				}
				
				byteData.writeBytes( jsonByte , 0 , jsonByte.length );
				
				
				/*if ( ( PacketID.LOGIN_IN == type  )  || ( PacketID.ENTER_TABLE == type )  ) {
				//壓縮
				jsonByte.position = 0;
				jsonByte = gZip.compressToByteArray( jsonByte );
				
				byteData.writeBytes( jsonByte , 0 , jsonByte.length );
				
				}
				else {
				byteData.writeBytes( jsonByte , 0 , jsonByte.length );
				
				}*/
				
			}	
			
			
			var len:number= getDataLength( byteData  ); //獲得資料長度
			var checkCode:number = getChekCode( byteData );	//檢查碼
			
			
			//console.log("checkCode:::" + checkCode );
			//console.log("len:::" + len );
			
			/*var packData:ByteArray = packCheckID();  //寫入識別字
			packData.writeInt( checkCode ); //寫入檢查碼
			this.trans8bit( len , packData );
			packData.writeBytes( byteData );//寫入送的資料*/
			var packData:ByteArray = SocketHeader.setData( len , checkCode , byteData );
			
			
			
			
			//console.log("送出資料長度:" +packData.length );
			/*var byte:ByteArray = new ByteArray();
			byte.writeUTFBytes( jsonData );
			var crcObj:CRC16 = new CRC16();
			crcObj.update( byte );
			
			console.log("crcObj::" +crcObj.valueOf() );*/
			
			var outData:ByteArray = new ByteArray();
			outData.writeBytes(packData, 0, packData.length);
			outData.position = 0;	
			
			
			return outData;
			
		}
		
		protected trans8bit(value:number, packData:ByteArray ):void {
			var str:string = value.toString(16);
			//console.log("str:" + str );
			////console.log("value:" + value );
			var lgth:number= 16 - str.length;
			for( var i:number= 0; i < lgth; i++) {
				str = "0" + str;
			}
			
			var subStr:string = str.substr( 0, 8);            
			packData.writeUnsignedInt( parseInt( "0x" + subStr)); //write 4 bytes
			subStr = str.substr( 8, 8);
			packData.writeUnsignedInt( parseInt( "0x" + subStr));	//write 4 bytes	
			
			//Utils.Dump(packData);			
		}
		
		
		/**
		 * 取得檢查碼
		 */
		protected getChekCode( byte:ByteArray ):number {
			
			var crcObj:CRC16 = new CRC16();	
			crcObj.reset();
			crcObj.update(byte);
			
			var crc:number = crcObj.valueOf();
			return crc;
			
		}
		
		/**
		 * json 轉 byteArray 並用 UTF8編碼
		 * @param	jsonStr
		 * @return
		 */
		protected jsonToByteArray( jsonStr:string ):ByteArray  {
			var byte:ByteArray = new ByteArray();	
			byte.writeUTFBytes( jsonStr);
			return byte;
		}
		
		/**
		 * 取得資料長度	
		 * @param	byte
		 * @return
		 */
		protected getDataLength( byte:ByteArray ):number{
			
			var len:number= byte.length ;		
			return len;
		}
		
		
	}
}