module packet {
	export class SocketParser {
		public static bKey			:	string	=	"b";
		public static pKey			:	string	=	"p";
		public static aKey			:	string	=	"a";
		
		private const TYPE			 = 1;
		
		private m_uCheckSum			:	number;
		private m_uCrc16Obj			;
		private m_pData				;
		private m_bData				;
		private m_aData				;
		private m_iGameType			:	number;
		private m_bNotReceivePkt	:	boolean	=	false;
		private m_bInit				:	boolean =	true;
		
		public uncompressData		;			//大廳封包
		public dictionaryData		; 			//Cdata.
		
		
		public constructor() {
			
			this.m_uCrc16Obj = new util.CRC16();
			this.m_pData = new lobby.model.CData("gamePic1");
			this.m_bData = new lobby.model.CData("gamePic2");
			this.m_aData = new lobby.model.CData("gamePic3");
			
			
			//大廳封包
			this.uncompressData =  { };
			this.uncompressData[define.PacketDefine.LOBBY] =  {};
			this.uncompressData[define.PacketDefine.GAME] =  {};			
			
			this.uncompressData[define.PacketDefine.LOBBY][define.PacketDefine.S_UPDATE_MARQUEE] = true;
			this.uncompressData[define.PacketDefine.LOBBY][define.PacketDefine.LOGIN_IN] = true;
			this.uncompressData[define.PacketDefine.LOBBY][define.PacketDefine.S_LOGIN_IN] = true;
//			this.uncompressData[define.PacketDefine.LOBBY][define.PacketDefine.S_CAN_ENTER_TABLE_STATUS] = true;
			this.uncompressData[define.PacketDefine.LOBBY][define.PacketDefine.S_REAL_TIME_BET_INFO] = true;
			this.uncompressData[define.PacketDefine.LOBBY][define.PacketDefine.S_Lobby_Theme_Subscribe] = true;
			this.uncompressData[define.PacketDefine.LOBBY][define.PacketDefine.S_LOBBY_INFO] = true;
			
			this.uncompressData[define.PacketDefine.LOBBY][define.PacketDefine.S_Maintenance] = true;
			
			//遊戲封包
			this.uncompressData[define.PacketDefine.GAME][define.PacketDefine.ENTER_TABLE] = true;
			this.uncompressData[define.PacketDefine.GAME][define.PacketDefine.S_ENTER_TABLE] = true;
			this.uncompressData[define.PacketDefine.GAME][define.PacketDefine.S_FAIL_GAME] = true;
			this.uncompressData[define.PacketDefine.GAME][define.PacketDefine.S_Game_Update_Table_Data] = true;
			
			
			
			this.dictionaryData = {};
			
			this.dictionaryData[define.PacketDefine.LOBBY] =  {};
			this.dictionaryData[define.PacketDefine.GAME] =  {};
		}
		
		public onPacketData(_tagTCPData):any {
			var content = _tagTCPData.getContent();
			var header = _tagTCPData.getHeader();
			
			//console.log("check header::" );
			
			//檢查碼
			this.m_uCheckSum = socket.SocketHeader.getCheckCode( header  );
			
			this.m_uCrc16Obj.reset();
			this.m_uCrc16Obj.update( content );
			
			var checkSum:number= this.m_uCrc16Obj.valueOf();	
			
			//檢查碼相等
			if ( checkSum == this.m_uCheckSum ) {
				
				return this.parserToJson( content , this.TYPE );
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
			
			this.m_pData = new lobby.model.CData(str);
			
			//大廳封包
			this.dictionaryData[define.PacketDefine.LOBBY][define.PacketDefine.C_LOGIN_OUT] = [this.m_pData, true];  //true送出
			this.dictionaryData[define.PacketDefine.LOBBY][define.PacketDefine.S_LOGIN_OUT] = [this.m_pData,false];  //false 收到
			this.dictionaryData[define.PacketDefine.LOBBY][define.PacketDefine.S_CHANGE_CURRENCY] = [this.m_pData,false];
			this.dictionaryData[define.PacketDefine.LOBBY][define.PacketDefine.C_Lobby_Theme_Subscribe] = [this.m_pData,true];
			this.dictionaryData[define.PacketDefine.LOBBY][define.PacketDefine.S_Lobby_Theme_Subscribe] = [this.m_pData,false];
			
			
			this.dictionaryData[define.PacketDefine.LOBBY][define.PacketDefine.C_BOSS_DEPUTY_REQUEST] = [this.m_pData,true];
			this.dictionaryData[define.PacketDefine.LOBBY][define.PacketDefine.S_BOSS_DEPUTY_REQUEST] = [this.m_pData,false];
			this.dictionaryData[define.PacketDefine.LOBBY][define.PacketDefine.C_BOSS_CANCEL_DEPUTY ] = [this.m_pData,true];
			this.dictionaryData[define.PacketDefine.LOBBY][define.PacketDefine.S_BOSS_CANCEL_DEPUTY ] =[ this.m_pData,false];
			this.dictionaryData[define.PacketDefine.LOBBY][define.PacketDefine.S_BOSS_TRANS_TABLE ] = [ this.m_pData , false ];
			this.dictionaryData[define.PacketDefine.LOBBY][define.PacketDefine.S_DEPUTY_LOGIN ] = [ this.m_pData , false];
			
			
			this.dictionaryData[define.PacketDefine.LOBBY][define.PacketDefine.C_SET_CHIP ] = [ this.m_pData , true];
			this.dictionaryData[define.PacketDefine.LOBBY][define.PacketDefine.S_SET_CHIP ] = [this.m_pData , false];
			this.dictionaryData[define.PacketDefine.LOBBY][define.PacketDefine.S_GET_CHIPS ] = [this.m_pData ,false];
			this.dictionaryData[define.PacketDefine.LOBBY][define.PacketDefine.C_LOGIN_LOBBY_OK ] = [this.m_pData,true];
			
			this.dictionaryData[define.PacketDefine.LOBBY][define.PacketDefine.C_MultiTable_Entry ] = [this.m_pData,true];
			this.dictionaryData[define.PacketDefine.LOBBY][define.PacketDefine.S_MultiTable_Entry ] = [this.m_pData,false];
			
			this.dictionaryData[define.PacketDefine.LOBBY][define.PacketDefine.C_LOBBY_INFO] = [this.m_pData, true];
			this.dictionaryData[define.PacketDefine.LOBBY][define.PacketDefine.S_LOBBY_INFO] = [this.m_pData, false];
			
			
			//遊戲封包
			this.dictionaryData[define.PacketDefine.GAME][define.PacketDefine.S_TABLE_SEAT_UPDATE ] = [this.m_pData,false];
			this.dictionaryData[define.PacketDefine.GAME][define.PacketDefine.C_SET_TABLE_SEAT ] = [this.m_pData, true];
			this.dictionaryData[define.PacketDefine.GAME][define.PacketDefine.S_SET_TABLE_SEAT ] = [this.m_pData,false];
			this.dictionaryData[define.PacketDefine.GAME][define.PacketDefine.S_BET_INFO_AND_DEAL_INFO ] = [this.m_pData,false];
			this.dictionaryData[define.PacketDefine.GAME][define.PacketDefine.C_EXIT_TABLE ] = [this.m_pData,true];
			this.dictionaryData[define.PacketDefine.GAME][define.PacketDefine.S_EXIT_TABLE ] = [this.m_pData,false];
			
			
			this.dictionaryData[define.PacketDefine.GAME][define.PacketDefine.C_BET_INFO ] = [this.m_pData,true];
			this.dictionaryData[define.PacketDefine.GAME][define.PacketDefine.CANCEL_BET ] = [this.m_pData,true];
			this.dictionaryData[define.PacketDefine.GAME][define.PacketDefine.S_BET_INFO ] = [this.m_pData,false];
			this.dictionaryData[define.PacketDefine.GAME][define.PacketDefine.S_WIN_INFO ] = [this.m_pData,false];
			this.dictionaryData[define.PacketDefine.GAME][define.PacketDefine.S_FAIL_GAME ] = [this.m_pData,false];
			
			this.dictionaryData[define.PacketDefine.GAME][define.PacketDefine.S_PLAYER_IDLE_INFO ] = [this.m_pData,false];
			this.dictionaryData[define.PacketDefine.GAME][define.PacketDefine.C_RESERVED_TABLE_OPERATION ] = [this.m_pData,true];
			this.dictionaryData[define.PacketDefine.GAME][define.PacketDefine.S_RESERVED_TABLE_OPERATION ] = [this.m_pData,false];
			this.dictionaryData[define.PacketDefine.GAME][define.PacketDefine.C_ENTER_TABLE_OK ] = [this.m_pData,true];
			this.dictionaryData[define.PacketDefine.GAME][define.PacketDefine.C_MULTI_TABLE_REQ ] = [this.m_pData,true];
			this.dictionaryData[define.PacketDefine.GAME][define.PacketDefine.C_MULTI_TABLE_UNSUBSCRIBE] = [this.m_pData,true];
			this.dictionaryData[define.PacketDefine.GAME][define.PacketDefine.C_PEEK_OPEN_CARD ] = [this.m_pData, true];
			
			this.dictionaryData[define.PacketDefine.GAME][define.PacketDefine.S_GIVE_TIPS ] = [this.m_pData, false];
			this.dictionaryData[define.PacketDefine.LOBBY][define.PacketDefine.S_CAN_ENTER_TABLE_STATUS] = [this.m_pData, false];
			
			this.dictionaryData[define.PacketDefine.GAME][define.PacketDefine.C_Game_Update_Table_Data] = [this.m_pData, true];
			this.dictionaryData[define.PacketDefine.GAME][define.PacketDefine.S_Game_Update_Table_Data] = [this.m_pData, false];
			
		}		
		
		public setBData(str:string):void {
			this.m_bData = new lobby.model.CData(str);
			
			//大廳封包
			this.dictionaryData[define.PacketDefine.LOBBY][define.PacketDefine.S_ANNOUNCELIST] = [this.m_bData,false];
			
			this.dictionaryData[define.PacketDefine.LOBBY][define.PacketDefine.S_UPDATE_TABLE_INFO] = [this.m_bData,false];
			this.dictionaryData[define.PacketDefine.LOBBY][define.PacketDefine.S_UPDATE_DEALER_INFO ] = [this.m_bData,false];
			this.dictionaryData[define.PacketDefine.LOBBY][define.PacketDefine.S_UPDATE_MARQUEE ] = [this.m_bData,false];
			this.dictionaryData[define.PacketDefine.LOBBY][define.PacketDefine.S_CLEAR_MARQUEE ] = [this.m_bData,false];
			this.dictionaryData[define.PacketDefine.LOBBY][define.PacketDefine.S_REAL_TIME_BET_INFO ] = [this.m_bData,false];
			
			
			this.dictionaryData[define.PacketDefine.LOBBY][define.PacketDefine.S_GOOD_ROAD ] = [this.m_bData,false];
			this.dictionaryData[define.PacketDefine.LOBBY][define.PacketDefine.S_UPDATE_LOBBY_INFO ] =  [this.m_bData,false];
			
			this.dictionaryData[define.PacketDefine.LOBBY][define.PacketDefine.S_Lobby_Update_Table_Road] =  [this.m_bData,false];
			this.dictionaryData[define.PacketDefine.LOBBY][define.PacketDefine.S_Maintenance] = [this.m_bData,false]
			
			//遊戲封包
			this.dictionaryData[define.PacketDefine.GAME][define.PacketDefine.S_TABLE_STATUS ] = [this.m_bData,false];
			this.dictionaryData[define.PacketDefine.GAME][define.PacketDefine.S_REAL_TIME_BET_INFO ] = [this.m_bData,false];
			
			
			this.dictionaryData[define.PacketDefine.GAME][define.PacketDefine.S_UPDATE_BET_INFO ] = [this.m_bData,false];
			this.dictionaryData[define.PacketDefine.GAME][define.PacketDefine.S_DEAL_INFO ] = [this.m_bData,false];
			this.dictionaryData[define.PacketDefine.GAME][define.PacketDefine.S_ERROR_MSG ] = [this.m_bData,false];
			this.dictionaryData[define.PacketDefine.GAME][define.PacketDefine.S_TABLE_PAUSE ] = [this.m_bData,false];
			this.dictionaryData[define.PacketDefine.GAME][define.PacketDefine.PEEK_PROGRESS ] = [this.m_bData,true];
			
			this.dictionaryData[define.PacketDefine.GAME][define.PacketDefine.S_Game_Update_Table_Road ] = [this.m_bData,false];
			
			this.dictionaryData[define.PacketDefine.LOBBY][define.PacketDefine.ACK ] = [this.m_bData,true];
			this.dictionaryData[define.PacketDefine.LOBBY][define.PacketDefine.N_ACK ] = [this.m_bData,true];
			
			this.dictionaryData[define.PacketDefine.GAME][define.PacketDefine.ACK ] = [this.m_bData,true];
			this.dictionaryData[define.PacketDefine.GAME][define.PacketDefine.N_ACK ] = [this.m_bData, true];
			
			
			//新增心跳包
			this.dictionaryData[define.PacketDefine.LOBBY][define.PacketDefine.C_Heart] = [this.m_bData,true];
			this.dictionaryData[define.PacketDefine.LOBBY][define.PacketDefine.S_Heart] = [this.m_bData,false];
			this.dictionaryData[define.PacketDefine.GAME][define.PacketDefine.C_Heart] = [this.m_bData,true];
			this.dictionaryData[define.PacketDefine.GAME][define.PacketDefine.S_Heart] = [this.m_bData,false];
			
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
		public  addListen( gameType:number, pID:number , key:string = SocketParser.bKey , compress: boolean = true , str:string = "" ):void {

			if ( key == SocketParser.bKey && this.dictionaryData[gameType][pID] == undefined ) {
				this.m_bData = new lobby.model.CData(str);
				this.dictionaryData[gameType][pID] = [this.m_bData , compress];
			}
			else if ( key == SocketParser.pKey  && this.dictionaryData[gameType][pID] == undefined  ) {
				this.m_pData = new lobby.model.CData(str);
				this.dictionaryData[gameType][pID] = [this.m_pData , compress];
			}
			else if ( key == SocketParser.aKey && this.dictionaryData[gameType][pID] == undefined   ) {
				this.m_aData = new lobby.model.CData(str);
				this.dictionaryData[gameType][pID] = [this.m_aData , compress];
				
			}
		}
		
		
		public setAData(str:string):void {
			this.m_aData = new lobby.model.CData(str);
		}
		
		/**
		 * 判斷是否該 壓縮/解壓縮
		 */
		public judgeUncompress( type:number): boolean {
			if ( this.uncompressData ) {
				if ( this.uncompressData[this.m_iGameType][type] != undefined ) {
					//console.log("judgeUncompress==================>" + this._this.uncompressData[this._gameType][type] );
					return this.uncompressData[this.m_iGameType][type];
				}
			}
			
			return false;
		}
		
		public judgeCData(  type:number, byte  , twoWay:string = null  ):egret.ByteArray {
			var byte2;
			
			if ( this.dictionaryData == null ) {
				return byte;
			}
			
			if ( this.dictionaryData[this.m_iGameType][type] != undefined ) {
				
				
				var cData =  this.dictionaryData[this.m_iGameType][type][0];
				var pType: boolean = this.dictionaryData[this.m_iGameType][type][1];
				
				byte.position = 0;
				
				if ( twoWay == null ) {
					
					if ( pType ) {
						byte2 = cData.encrypt( byte );
					}else {
						byte2 = cData.decrypt( byte );
					}	
					
				}
				else if ( twoWay == define.PacketDefine.RECEIVE ) {  //雙向 接收封包
					byte2 = cData.decrypt( byte );
				}
				else if ( twoWay == define.PacketDefine.SEND ) {  //雙向 送出封包
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
		protected parserToJson( byte , _iType:number):Object {
			var payData = new egret.ByteArray();
			payData.writeBytes( byte , _iType , byte.length - _iType );  //type 之後 取 payLoadData
			payData.position = 0;
			
			var typeData = new egret.ByteArray();
			typeData.writeBytes( byte , 0 , 1);
			typeData.position = 0;
				
				//console.log("typeData.readByte():::" + typeData.readByte() );
				//typeData.position = 0;
			var Type:number= typeData[0];  //真正的type ,用此type判斷是否該解析封包

			//cdata run
			
			if ( Type == define.PacketDefine.S_LOGIN_IN || Type == define.PacketDefine.S_ENTER_TABLE ) {
				this.m_bInit = false;
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
			if ( Type == define.PacketDefine.PEEK_PROGRESS ) {
				twoWay = define.PacketDefine.RECEIVE;
			}else if( Type == define.PacketDefine.ACK || Type == define.PacketDefine.N_ACK ){
				twoWay = define.PacketDefine.RECEIVE;
			}else if( Type == define.PacketDefine.C_Heart ){
				twoWay = define.PacketDefine.RECEIVE;
			}
			
			try {

				if ( Type == define.PacketDefine.S_LOGIN_IN || Type == define.PacketDefine.S_ENTER_TABLE ) {
					var _class  = getDefinitionByName("KeyTest");
					if(_class){
						var data  = new _class();
						payData = data.DecryptByteArray(payData, "", "");
					}
				}else{
					payData = this.judgeCData( Type , payData , twoWay );
				}
				
				
			}catch (e) {
				//違法的封包
				if ( Type == define.PacketDefine.S_LOGIN_IN  || Type == define.PacketDefine.S_ENTER_TABLE ) {
					this.m_bNotReceivePkt = true;
				}				
				//console.log(" is ERROR");
			}
			
			if ( this.m_bNotReceivePkt ) return{};
						
			
			var uncompress: boolean = this.judgeUncompress(Type);
			
			//解壓縮
			if ( uncompress ) {		
				var _gzipEncoder = new GZIPBytesEncoder();	
					
				payData.position = 0; //還原索引
				payData = _gzipEncoder.uncompressToByteArray( payData );
			}
				
			//console.log("payData LEN::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::" + payData.length);
			
			
			
			payData.position = 0;
			
			var jsonStr:string = payData.readUTFBytes( payData.length );	//轉 json
			var outData;
			var key:string = "";

			
			//清除記憶體
			payData.clear();
			typeData.clear();
			byte.clear();
			
			//console.log("Type-------------------------------->" + Type );

			
		//	console.log("PackID: "+Type+ "jsonStr::" + jsonStr );
			
			if ( jsonStr != ""  &&  jsonStr != "\b" &&  !this.m_bNotReceivePkt ) {
				
				try {
					outData = JSON.parse(jsonStr);
					outData.Type = Type;
					outData.str = jsonStr;
					lobby.model.PacketSN.SN = <number>(outData.SN);
				}catch (e ) {
					
					if ( Type == define.PacketDefine.S_LOGIN_IN || Type == define.PacketDefine.S_ENTER_TABLE ) {
						this.m_bNotReceivePkt = true;
					}
					
				}
				
				if ( outData != null ) {
					lobby.model.LobbyData.getInstance().addSN(<number>(outData.SN), false);
					return outData ;
				}else{
					//当前包解析失败获取不到当前包的SN，用上一个包的SN
					lobby.model.LobbyData.getInstance().addSN(lobby.model.PacketSN.SN, true);
					console.log("解析数据失败，协议ID：",Type);
				}
				
			}
			
			return null;
		}		
		
		/**
		 * 取得檢查碼
		 */
		protected getCheckCode( data ):number{
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