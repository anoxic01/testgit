module packet.sink {
	export class GameTCPSocketSink  implements ITCPSocketSink{
		public var controler		:	GameControler;
		public var proxy			:	GameProxy;
		public var gameType			:	uint;
		private var bShowDialog		:	Boolean = false;			//是否已顯示彈窗
		
		public constructor(_gameType:uint,_controler:GameControler=null) {
			this.gameType=_gameType;
			this.controler= _controler;
		}
		
		public function destroy():void {
			if( controler ){
				controler = null;
			}
			if( proxy ){
				proxy = null;
			}
			LobbyManager.getInstance().bEnterGame=false;
		}
		
		public function onCTCPSocketConnecting(_uSocketID:int):void
		{
		}
		
		public function onCTCPSocketConnected(_uSocketID:int):void
		{
			trace("游戏连接成功... _uSocketID:",_uSocketID );
			this.proxy = this.controler.proxy;
			controler.onConnect();
			bShowDialog = false;
			NetWorkManager.getInstance().iGameNetWorkStatus = Define.GameConnected;
			
		}
		
		public function onCTCPSocketClose(_uSocketID:int, _cmd:int):void
		{
//			trace("游戏连接关闭...");
			Log.getInstance().log(this, "游戏连接关闭..." +",TableID:"+ controler.model.tableStruct.TableID );
			NetWorkManager.getInstance().checkGameNetWork(	Define.GameDisconnect, controler );		
		}
		
		
		public function onCTCPSocketError(_uFail:int):void{
//			trace("游戏连接错误..."+_uFail );
			Log.getInstance().log(this, "游戏连接错误..." +",TableID:"+ controler.model.tableStruct.TableID );
			//只友連接失敗要處理
			if( _uFail == SocketDefine.CONNECT_FAIL ||_uFail == SocketDefine.SOCKET_SECURITY_ERROR) {
				NetWorkManager.getInstance().checkGameNetWork(	Define.GameConnectFailed, controler);
			}
				
		}
		
		
		public function onCTCPSocketRead(_uSocketID:int, _tagTCPData:ITagTCPData):void
		{
			
			var _oData : Object = proxy.socketParser.onPacketData( _tagTCPData );
			if (_oData==null){
				trace("GAME解析数据为NULL ")
				return;
			}
			
			if( !controler ) {
				trace("GameControler is NULL");
				return;
			}
			
			var protocolClass : IProtocolStruct = PacketManager.getInstance().getProtocolClass( gameType, _oData.Type);
			if (protocolClass)
			{
				if (_oData.Type == 0x09){
					trace("GAME_uSocketID:"+_uSocketID, _oData.Type.toString(16)+" 收到数据："+_oData.str);
				}
				
				
				protocolClass.initControler( controler );
				protocolClass.execute( _oData );
			}else{
				trace("GAME_uSocketID收到数据，找不到对应处理协议..." + _oData.Type );
			}
			
			//回复告知
//			if(LobbyData.getInstance().needReply(_oData.Type) && proxy){
//				var struct : SNStruct = LobbyData.getInstance().getSN();
//				if(struct.ERROR){
//					LobbyManager.getInstance().sendNAck(2, struct.SN,proxy.socket);
//				}else{
//					LobbyManager.getInstance().sendAck(2, struct.SN,proxy.socket);
//				}
//			}
			
			
		}
		
	

		
	}
}