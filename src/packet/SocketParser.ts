module packet {
	export class SocketParser {
		public static const bKey		:	string	=	"b";
		public static const pKey		:	string	=	"p";
		public static const aKey		:	string	=	"a";
		
		private const TYPE				:	int = 1;
		
		private m_uCheckSum			:	number;
		private m_uCrc16Obj			:	CRC16;
		private m_pData				:	CData;
		private m_bData				:	CData;
		private m_aData				:	CData;
		private m_iGameType			:	number;
		private m_bNotReceivePkt	:	 boolean	=	false;
		private m_bInit				:	 boolean =	true;
		
		public uncompressData		:	Object;			//大廳封包
		public dictionaryData		:	Object; 		//Cdata.
		
		
		public constructor() {
			
			this.m_uCrc16Obj = new CRC16();
			this.m_pData = new CData("gamePic1");
			this.m_bData = new CData("gamePic2");
			this.m_aData = new CData("gamePic3");
			
			
			//大廳封包
			uncompressData =  { };
			uncompressData[PacketDefine.LOBBY] =  new Dictionary();
			uncompressData[PacketDefine.GAME] =  new Dictionary();			
			
			uncompressData[PacketDefine.LOBBY][PacketDefine.S_UPDATE_MARQUEE] = true;
			uncompressData[PacketDefine.LOBBY][PacketDefine.LOGIN_IN] = true;
			uncompressData[PacketDefine.LOBBY][PacketDefine.S_LOGIN_IN] = true;
//			uncompressData[PacketDefine.LOBBY][PacketDefine.S_CAN_ENTER_TABLE_STATUS] = true;
			uncompressData[PacketDefine.LOBBY][PacketDefine.S_REAL_TIME_BET_INFO] = true;
			uncompressData[PacketDefine.LOBBY][PacketDefine.S_Lobby_Theme_Subscribe] = true;
			uncompressData[PacketDefine.LOBBY][PacketDefine.S_LOBBY_INFO] = true;
			
			uncompressData[PacketDefine.LOBBY][PacketDefine.S_Maintenance] = true;
			
			//遊戲封包
			uncompressData[PacketDefine.GAME][PacketDefine.ENTER_TABLE] = true;
			uncompressData[PacketDefine.GAME][PacketDefine.S_ENTER_TABLE] = true;
			uncompressData[PacketDefine.GAME][PacketDefine.S_FAIL_GAME] = true;
			uncompressData[PacketDefine.GAME][PacketDefine.S_Game_Update_Table_Data] = true;
			
			
			
			dictionaryData = {};
			
			dictionaryData[PacketDefine.LOBBY] =  new Dictionary();
			dictionaryData[PacketDefine.GAME] =  new Dictionary();
		}
		
		public onPacketData(_tagTCPData:ITagTCPData):Object {
			var content:ByteArray = _tagTCPData.getContent();
			var header:ByteArray = _tagTCPData.getHeader();
			
			//console.log("check header::" );
			
			//檢查碼
			this.m_uCheckSum = SocketHeader.getCheckCode( header  );
			
			this.m_uCrc16Obj.reset();
			this.m_uCrc16Obj.update( content );
			
			var checkSum:number= this.m_uCrc16Obj.valueOf();	
			
			//檢查碼相等
			if ( checkSum == this.m_uCheckSum ) {
				
				return parserToJson( content , TYPE );
			}else{
				console.log("收到的数据包异常...");
			}
			return null;
		}
		
		public setCData(type:number):void {
			this.m_iGameType = type;
		}
	
		/**
		 * true:送出 false:收到
		 * @param	str
		 */
		public setPData(str:string ):void {
			
			m_pData = new CData(str);
			
			//大廳封包
			dictionaryData[PacketDefine.LOBBY][PacketDefine.C_LOGIN_OUT] = [m_pData, true];  //true送出
			dictionaryData[PacketDefine.LOBBY][PacketDefine.S_LOGIN_OUT] = [m_pData,false];  //false 收到
			dictionaryData[PacketDefine.LOBBY][PacketDefine.S_CHANGE_CURRENCY] = [m_pData,false];
			dictionaryData[PacketDefine.LOBBY][PacketDefine.C_Lobby_Theme_Subscribe] = [m_pData,true];
			dictionaryData[PacketDefine.LOBBY][PacketDefine.S_Lobby_Theme_Subscribe] = [m_pData,false];
			
			
			dictionaryData[PacketDefine.LOBBY][PacketDefine.C_BOSS_DEPUTY_REQUEST] = [m_pData,true];
			dictionaryData[PacketDefine.LOBBY][PacketDefine.S_BOSS_DEPUTY_REQUEST] = [m_pData,false];
			dictionaryData[PacketDefine.LOBBY][PacketDefine.C_BOSS_CANCEL_DEPUTY ] = [m_pData,true];
			dictionaryData[PacketDefine.LOBBY][PacketDefine.S_BOSS_CANCEL_DEPUTY ] =[ m_pData,false];
			dictionaryData[PacketDefine.LOBBY][PacketDefine.S_BOSS_TRANS_TABLE ] = [ m_pData , false ];
			dictionaryData[PacketDefine.LOBBY][PacketDefine.S_DEPUTY_LOGIN ] = [ m_pData , false];
			
			
			dictionaryData[PacketDefine.LOBBY][PacketDefine.C_SET_CHIP ] = [ m_pData , true];
			dictionaryData[PacketDefine.LOBBY][PacketDefine.S_SET_CHIP ] = [m_pData , false];
			dictionaryData[PacketDefine.LOBBY][PacketDefine.S_GET_CHIPS ] = [m_pData ,false];
			dictionaryData[PacketDefine.LOBBY][PacketDefine.C_LOGIN_LOBBY_OK ] = [m_pData,true];
			
			dictionaryData[PacketDefine.LOBBY][PacketDefine.C_MultiTable_Entry ] = [m_pData,true];
			dictionaryData[PacketDefine.LOBBY][PacketDefine.S_MultiTable_Entry ] = [m_pData,false];
			
			dictionaryData[PacketDefine.LOBBY][PacketDefine.C_LOBBY_INFO] = [m_pData, true];
			dictionaryData[PacketDefine.LOBBY][PacketDefine.S_LOBBY_INFO] = [m_pData, false];
			
			
			//遊戲封包
			dictionaryData[PacketDefine.GAME][PacketDefine.S_TABLE_SEAT_UPDATE ] = [m_pData,false];
			dictionaryData[PacketDefine.GAME][PacketDefine.C_SET_TABLE_SEAT ] = [m_pData, true];
			dictionaryData[PacketDefine.GAME][PacketDefine.S_SET_TABLE_SEAT ] = [m_pData,false];
			dictionaryData[PacketDefine.GAME][PacketDefine.S_BET_INFO_AND_DEAL_INFO ] = [m_pData,false];
			dictionaryData[PacketDefine.GAME][PacketDefine.C_EXIT_TABLE ] = [m_pData,true];
			dictionaryData[PacketDefine.GAME][PacketDefine.S_EXIT_TABLE ] = [m_pData,false];
			
			
			dictionaryData[PacketDefine.GAME][PacketDefine.C_BET_INFO ] = [m_pData,true];
			dictionaryData[PacketDefine.GAME][PacketDefine.CANCEL_BET ] = [m_pData,true];
			dictionaryData[PacketDefine.GAME][PacketDefine.S_BET_INFO ] = [m_pData,false];
			dictionaryData[PacketDefine.GAME][PacketDefine.S_WIN_INFO ] = [m_pData,false];
			dictionaryData[PacketDefine.GAME][PacketDefine.S_FAIL_GAME ] = [m_pData,false];
			
			dictionaryData[PacketDefine.GAME][PacketDefine.S_PLAYER_IDLE_INFO ] = [m_pData,false];
			dictionaryData[PacketDefine.GAME][PacketDefine.C_RESERVED_TABLE_OPERATION ] = [m_pData,true];
			dictionaryData[PacketDefine.GAME][PacketDefine.S_RESERVED_TABLE_OPERATION ] = [m_pData,false];
			dictionaryData[PacketDefine.GAME][PacketDefine.C_ENTER_TABLE_OK ] = [m_pData,true];
			dictionaryData[PacketDefine.GAME][PacketDefine.C_MULTI_TABLE_REQ ] = [m_pData,true];
			dictionaryData[PacketDefine.GAME][PacketDefine.C_MULTI_TABLE_UNSUBSCRIBE] = [m_pData,true];
			dictionaryData[PacketDefine.GAME][PacketDefine.C_PEEK_OPEN_CARD ] = [m_pData, true];
			
			dictionaryData[PacketDefine.GAME][PacketDefine.S_GIVE_TIPS ] = [m_pData, false];
			dictionaryData[PacketDefine.LOBBY][PacketDefine.S_CAN_ENTER_TABLE_STATUS] = [m_pData, false];
			
			dictionaryData[PacketDefine.GAME][PacketDefine.C_Game_Update_Table_Data] = [m_pData, true];
			dictionaryData[PacketDefine.GAME][PacketDefine.S_Game_Update_Table_Data] = [m_pData, false];
			
		}		
		
		public setBData(str:string):void {
			m_bData = new CData(str);
			
			//大廳封包
			dictionaryData[PacketDefine.LOBBY][PacketDefine.S_ANNOUNCELIST] = [m_bData,false];
			
			dictionaryData[PacketDefine.LOBBY][PacketDefine.S_UPDATE_TABLE_INFO] = [m_bData,false];
			dictionaryData[PacketDefine.LOBBY][PacketDefine.S_UPDATE_DEALER_INFO ] = [m_bData,false];
			dictionaryData[PacketDefine.LOBBY][PacketDefine.S_UPDATE_MARQUEE ] = [m_bData,false];
			dictionaryData[PacketDefine.LOBBY][PacketDefine.S_CLEAR_MARQUEE ] = [m_bData,false];
			dictionaryData[PacketDefine.LOBBY][PacketDefine.S_REAL_TIME_BET_INFO ] = [m_bData,false];
			
			
			dictionaryData[PacketDefine.LOBBY][PacketDefine.S_GOOD_ROAD ] = [m_bData,false];
			dictionaryData[PacketDefine.LOBBY][PacketDefine.S_UPDATE_LOBBY_INFO ] =  [m_bData,false];
			
			dictionaryData[PacketDefine.LOBBY][PacketDefine.S_Lobby_Update_Table_Road] =  [m_bData,false];
			dictionaryData[PacketDefine.LOBBY][PacketDefine.S_Maintenance] = [m_bData,false]
			
			//遊戲封包
			dictionaryData[PacketDefine.GAME][PacketDefine.S_TABLE_STATUS ] = [m_bData,false];
			dictionaryData[PacketDefine.GAME][PacketDefine.S_REAL_TIME_BET_INFO ] = [m_bData,false];
			
			
			dictionaryData[PacketDefine.GAME][PacketDefine.S_UPDATE_BET_INFO ] = [m_bData,false];
			dictionaryData[PacketDefine.GAME][PacketDefine.S_DEAL_INFO ] = [m_bData,false];
			dictionaryData[PacketDefine.GAME][PacketDefine.S_ERROR_MSG ] = [m_bData,false];
			dictionaryData[PacketDefine.GAME][PacketDefine.S_TABLE_PAUSE ] = [m_bData,false];
			dictionaryData[PacketDefine.GAME][PacketDefine.PEEK_PROGRESS ] = [m_bData,true];
			
			dictionaryData[PacketDefine.GAME][PacketDefine.S_Game_Update_Table_Road ] = [m_bData,false];
			
			dictionaryData[PacketDefine.LOBBY][PacketDefine.ACK ] = [m_bData,true];
			dictionaryData[PacketDefine.LOBBY][PacketDefine.N_ACK ] = [m_bData,true];
			
			dictionaryData[PacketDefine.GAME][PacketDefine.ACK ] = [m_bData,true];
			dictionaryData[PacketDefine.GAME][PacketDefine.N_ACK ] = [m_bData, true];
			
			
			//新增心跳包
			dictionaryData[PacketDefine.LOBBY][PacketDefine.C_Heart] = [m_bData,true];
			dictionaryData[PacketDefine.LOBBY][PacketDefine.S_Heart] = [m_bData,false];
			dictionaryData[PacketDefine.GAME][PacketDefine.C_Heart] = [m_bData,true];
			dictionaryData[PacketDefine.GAME][PacketDefine.S_Heart] = [m_bData,false];
			
		}
//		
//		public static getInstance():SocketParser {
//			return _socketParser;
//		}
//		
		/**
		 * 
		 * @param	gameType
		 * @param	pID
		 * @param	key
		 * @param	compress
		 */
		public  addListen( gameType:number, pID:number , key:string = bKey , compress: boolean = true , str:string = "" ):void {

			if ( key == bKey && dictionaryData[gameType][pID] == undefined ) {
				this.m_bData = new CData(str);
				dictionaryData[gameType][pID] = [this.m_bData , compress];
			}
			else if ( key == pKey  && dictionaryData[gameType][pID] == undefined  ) {
				this.m_pData = new CData(str);
				dictionaryData[gameType][pID] = [this.m_pData , compress];
			}
			else if ( key == aKey && dictionaryData[gameType][pID] == undefined   ) {
				this.m_aData = new CData(str);
				dictionaryData[gameType][pID] = [this.m_aData , compress];
				
			}
		}
		
		
		public setAData(str:string):void {
			this.m_aData = new CData(str);
		}
		
		/**
		 * 判斷是否該 壓縮/解壓縮
		 */
		public judgeUncompress( type:number): boolean {
			if ( uncompressData ) {
				if ( uncompressData[this.m_iGameType][type] != undefined ) {
					//console.log("judgeUncompress==================>" + this._uncompressData[this._gameType][type] );
					return uncompressData[this.m_iGameType][type];
				}
			}
			
			return false;
		}
		
		public judgeCData(  type:number, byte:ByteArray  , twoWay:string = null  ):ByteArray {
			var byte2:ByteArray;
			
			if ( dictionaryData == null ) {
				return byte;
			}
			
			if ( dictionaryData[this.m_iGameType][type] != undefined ) {
				
				
				var cData:CData =  dictionaryData[this.m_iGameType][type][0];
				var pType: boolean = dictionaryData[this.m_iGameType][type][1];
				
				byte.position = 0;
				
				if ( twoWay == null ) {
					
					if ( pType ) {
						byte2 = cData.encrypt( byte );
					}else {
						byte2 = cData.decrypt( byte );
					}	
					
				}
				else if ( twoWay == PacketDefine.RECEIVE ) {  //雙向 接收封包
					byte2 = cData.decrypt( byte );
				}
				else if ( twoWay == PacketDefine.SEND ) {  //雙向 送出封包
					byte2 = cData.encrypt( byte );
				}
				
			}
			
			if ( byte2 != null ) {
				return byte2;
			}
			else {
				return byte;
			}
			
		}		
		/**
		 * 發到上層
		 */
		protected parserToJson( byte:ByteArray , _iType:number):Object {
			var payData:ByteArray = new ByteArray();
			payData.writeBytes( byte , _iType , byte.length - _iType );  //type 之後 取 payLoadData
			payData.position = 0;
			
			var typeData:ByteArray = new ByteArray();
			typeData.writeBytes( byte , 0 , 1);
			typeData.position = 0;
				
				//console.log("typeData.readByte():::" + typeData.readByte() );
				//typeData.position = 0;
			var Type:number= typeData[0];  //真正的type ,用此type判斷是否該解析封包

			//cdata run
			
			if ( Type == PacketDefine.S_LOGIN_IN || Type == PacketDefine.S_ENTER_TABLE ) {
				m_bInit = false;
			}
			
			if ( this.m_bInit ) {
				payData.clear();
				typeData.clear();
				byte.clear();		
				return {};
			}
			
			/*if ( _bData.COK == "gamePic2" || _pData.COK == "gamePic1"   ) {
				if ( Type != PacketID.S_LOGIN_IN || Type != PacketID.S_ENTER_TABLE ) {
					return;
				}
				
			}*/
			var twoWay:string = null;
			if ( Type == PacketDefine.PEEK_PROGRESS ) {
				twoWay = PacketDefine.RECEIVE;
			}else if( Type == PacketDefine.ACK || Type == PacketDefine.N_ACK ){
				twoWay = PacketDefine.RECEIVE;
			}else if( Type == PacketDefine.C_Heart ){
				twoWay = PacketDefine.RECEIVE;
			}
			
			try {

				if ( Type == PacketDefine.S_LOGIN_IN || Type == PacketDefine.S_ENTER_TABLE ) {
					var _class : Class = getDefinitionByName("KeyTest") as Class;
					if(_class){
						var data : * = new _class();
						payData = data.DecryptByteArray(payData, "", "");
					}
				}else{
					payData = this.judgeCData( Type , payData , twoWay );
				}
				
				
			}catch (e:Error) {
				//違法的封包
				if ( Type == PacketDefine.S_LOGIN_IN  || Type == PacketDefine.S_ENTER_TABLE ) {
					m_bNotReceivePkt = true;
				}				
				//console.log(" is ERROR");
			}
			
			if ( m_bNotReceivePkt ) return{};
						
			
			var uncompress: boolean = judgeUncompress(Type);
			
			//解壓縮
			if ( uncompress ) {		
				var _gzipEncoder:GZIPBytesEncoder = new GZIPBytesEncoder();	
					
				payData.position = 0; //還原索引
				payData = _gzipEncoder.uncompressToByteArray( payData );
			}
				
			//console.log("payData LEN::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::" + payData.length);
			
			
			
			payData.position = 0;
			
			var jsonStr:string = payData.readUTFBytes( payData.length );	//轉 json
			var outData:Object;
			var key:string = "";

			
			//清除記憶體
			payData.clear();
			typeData.clear();
			byte.clear();
			
			//console.log("Type-------------------------------->" + Type );

			
		//	console.log("PackID: "+Type+ "jsonStr::" + jsonStr );
			
			if ( jsonStr != ""  &&  jsonStr != "\b" &&  !m_bNotReceivePkt ) {
				
				try {
					outData = JSON.parse(jsonStr);
					outData.Type = Type;
					outData.str = jsonStr;
					PacketSN.SN = number(outData.SN);
				}catch (e:Error ) {
					
					if ( Type == PacketDefine.S_LOGIN_IN || Type == PacketDefine.S_ENTER_TABLE ) {
						m_bNotReceivePkt = true;
					}
					
				}
				
				if ( outData != null ) {
					LobbyData.getInstance().addSN(number(outData.SN), false);
					return outData ;
				}else{
					//当前包解析失败获取不到当前包的SN，用上一个包的SN
					LobbyData.getInstance().addSN(PacketSN.SN, true);
					console.log("解析数据失败，协议ID：",Type);
				}
				
			}
			
			return null;
		}		
		
		/**
		 * 取得檢查碼
		 */
		protected getCheckCode( data:ByteArray ):number{
			var num5:number= data[8] << 24;
			var num6:number= data[9] << 16;
			var num7:number= data[10] << 8;
			var num8:number= data[11] & 0xFF;
			
			//檢查碼
			var checkSum:number= num5 + num6 + num7 + num8;
			
			return checkSum;
		}		
		
		
		
		
	}
}