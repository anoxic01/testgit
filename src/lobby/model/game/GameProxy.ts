module lobby.model.game {
	export class GameProxy {
		public var socket				:	TCPSocket;
		public var gameSocketSink		:	ITCPSocketSink;
		public var socketParser			:	SocketParser;
		protected var m_auth				:	LobbyAuth;
		public  var m_dataPacket 		: 	DataPacket;
		public var bLock				:	Boolean;
		public constructor(sink:ITCPSocketSink=null) {
			if (sink){
				if(!socketParser){
					socketParser = new SocketParser();
					socketParser.setCData(PacketDefine.GAME);
					m_dataPacket = new DataPacket(socketParser);
				}
				if(!socket){
					if(!gameSocketSink){
						gameSocketSink = sink;
					}
					
					socket = new TCPSocket(sink, 0, 0);
					
				}
			}
			
		}
		
		
		public function setSocket(socket:TCPSocket):void{
			if(!socketParser){
				socketParser = new SocketParser();
				socketParser.setCData(PacketDefine.GAME);
				m_dataPacket = new DataPacket(socketParser);
			}
			if(!socket){
				socket =socket;
				//m_socket.setTcpSocketSink(sink);
				
			}
		}
		
		public function setSocketParser(parser:SocketParser=null,dataPacket:DataPacket=null):void{
			if (parser){
				socketParser = parser;
			}
			if (dataPacket){
				this.m_dataPacket = dataPacket;
			}
		}
		
		public function connect(_sServerIP:String, _iServerPort:int):void{
			
			trace("连接游戏...","m_socket:", socket.getUid(), "_sServerIP:", _sServerIP, "_iServerPort:",_iServerPort,"###");
			socket.connect( _sServerIP, _iServerPort );
		}
		
		protected function send(id:uint,obj:Object):void{
			var byte:ByteArray = m_dataPacket.pack( id , obj );
			socket.send( byte, 0,  byte.length);
			byte.clear();
		}
		
		public function loginGame(tableInfo:TableStruct):void  {
			trace("Login GAME");
			if( tableInfo == null ){
				trace("桌台數據為NULL");
				return;
			}
			if ( LobbyManager.getInstance().lobbyAuth != null ) {
				
//				var _gameLoginPkt : C_Game_Login_Pkt = new C_Game_Login_Pkt();
//				_gameLoginPkt.AuthInfo.AuthToken = LobbyManager.getInstance().lobbyAuth.AuthToken; 			//認證碼
//				_gameLoginPkt.AuthInfo.Identity = LobbyManager.getInstance().lobbyAuth.Identity;			//身分
//				_gameLoginPkt.AuthInfo.Lang = LobbyManager.getInstance().lobbyAuth.Lang;					//語系
//				_gameLoginPkt.AuthInfo.Platform = LobbyManager.getInstance().lobbyAuth.Platform;
//				_gameLoginPkt.AuthInfo.GameID = tableInfo.GameID ;
//				_gameLoginPkt.AuthInfo.TableID = tableInfo.TableID;
//				_gameLoginPkt.AuthInfo.LobbyServer = Player.getInstance().sLobbyServer; 					//連線Server
//				_gameLoginPkt.AuthInfo.JoinTbType = tableInfo.joinTableType;								//進桌類型
//				
//				_gameLoginPkt.AuthInfo.BetLimitID = tableInfo.BetLimitID;									//限紅
//				if ( _gameLoginPkt.AuthInfo.BetLimitID == 0 ) {
//					_gameLoginPkt.AuthInfo.BetLimitID = 1;
//				}
//				_gameLoginPkt.AuthInfo.JoinTbPwd = tableInfo.joinTbPwd;										//密碼
//				_gameLoginPkt.AuthInfo.CharterSettingInfo = tableInfo.CharterSettingInfo; 					//包桌設定
//				_gameLoginPkt.AuthInfo.ProtocolVer = 1;
//				
//				//trace("this._auth.betlimitId::" + this._auth.betlimitId );  送0
//				TimeManager.getInstance().start(PacketDefine.ENTER_TABLE.toString(16) ,LobbyManager.getInstance().warnConnect);
//				
//				var byte:ByteArray = m_dataPacket.pack( PacketDefine.ENTER_TABLE , _gameLoginPkt );
//				trace("登陆游戏."+tableInfo.GameID +".台号"+tableInfo.TableID+"  进桌类型："+tableInfo.joinTableType);
//				socket.send( byte, 0,  byte.length);
				var _class : Class = getDefinitionByName("KeyTest") as Class;
				if(_class){
					var data : * = new _class();
					
					var byte:ByteArray = data.enterTable(LobbyManager.getInstance().lobbyAuth, socketParser, tableInfo, LobbyManager.getInstance().warnConnect, Player.getInstance().sLobbyServer);
					
					Utils.DumpBinary( "", byte, 0, 11);
					socket.send( byte, 0,  byte.length);
					
					Log.getInstance().log(this, "登陆游戏桌..." );
				}
			} else {
				trace("打开页面时，没有获取到web数据.");
			}
		
		}
		
		/**
		 *回复确认 
		 * @param o
		 * 
		 */
		public function enterOK():void {
			var pkt : C_Game_Login_OK_Pkt = new C_Game_Login_OK_Pkt();
			pkt.AuthToken = String(Player.getInstance().iPlayerID); 			//認證碼
			pkt.Identity = LobbyManager.getInstance().lobbyAuth.Identity;		//身分
			send(PacketDefine.C_ENTER_TABLE_OK , pkt);
		}
		
		public function bet( o:Object ):void {
			if (bLock==false){
				trace("--------------》投注：..."+ o.BetList)
				bLock=true;
				TimeManager.getInstance().start(PacketDefine.C_BET_INFO.toString(16) ,LobbyManager.getInstance().warnConnect);
				send(PacketDefine.C_BET_INFO , o);
			}else{
				trace("--------------等待投注回复返回，暂无法发送投注消息"+ o)
			}
			
		}
		
		public function cancelBet( o:Object ):void {
			send(PacketDefine.CANCEL_BET , o);
		}
		
		public function exit( o:Object ):void {
			TimeManager.getInstance().stopAll();
			var byte:ByteArray = m_dataPacket.pack( PacketDefine.C_EXIT_TABLE , o );
			socket.send( byte, 0,  byte.length);
		}
		
		public function complementedRoadMap(data:*):void
		{
			send(PacketDefine.C_Game_Update_Table_Data,data);
		}
		
		/**
		 * 送心跳包
		 */
		public function sendHeart():void {
			var _pkt:C_Game_Heart_Pkt = new C_Game_Heart_Pkt();
			_pkt.PlayerID = Player.getInstance().iPlayerID;
			_pkt.Identity = LobbyManager.getInstance().lobbyAuth.Identity;
			
			var byte:ByteArray = m_dataPacket.pack( PacketDefine.C_Heart , _pkt );
			//			Log.getInstance().log( this , "玩家ID."+_pkt.PlayerID +".身分:"+_pkt.Identity );			
			if( socket.m_socket ){
				socket.send( byte, 0,  byte.length);
			}
			
		}
		
		/**
		 * 回送服務器傳來心跳包消息
		 */
		public function responseHeartPkt():void {
			var _pkt:C_Game_Heart_Pkt = new C_Game_Heart_Pkt();
			_pkt.PlayerID = Player.getInstance().iPlayerID;
			_pkt.Identity = LobbyManager.getInstance().lobbyAuth.Identity;
			
			var byte:ByteArray = m_dataPacket.pack( PacketDefine.S_Heart , _pkt );
			//			Log.getInstance().log( this , "玩家ID."+_pkt.PlayerID +".身分:"+_pkt.Identity );			
			if( socket.m_socket ){
				socket.send( byte, 0,  byte.length);
				
			}
		}	
		
		
		public function close():void{
			if( socket && socket.m_socket.connected ){
				socket.m_socket.close();
			}
		}
		
		public function destroy():void {
			if( socket ){
				socket.destroy();
				socket = null;	
			}
			
			if( gameSocketSink ){
				gameSocketSink.destroy();
				gameSocketSink = null;
			}

			if( socketParser ){
				socketParser = null;
			}
			
			if( m_dataPacket ){
				m_dataPacket.destroy();
				m_dataPacket = null;
			}
			if( m_auth ){
				m_auth = null;
			}
		}
		
		
		
	}
}