module lobby.model.game {
	export class GameProxy {
		public socket				:	socket.TCPSocket;
		public gameSocketSink		:	socket.ITCPSocketSink;
		public socketParser			:	packet.SocketParser;
		protected m_auth			:	LobbyAuth;
		public  m_dataPacket 		: 	packet.DataPacket;
		public bLock				:	 boolean;
		public constructor(sink:socket.ITCPSocketSink=null) {
			if (sink){
				if(!this.socketParser){
					this.socketParser = new packet.SocketParser();
					this.socketParser.setCData(define.PacketDefine.GAME);
					this.m_dataPacket = new packet.DataPacket(this.socketParser);
				}
				if(!socket){
					if(!this.gameSocketSink){
						this.gameSocketSink = sink;
					}
					
					this.socket = new socket.TCPSocket(sink, 0, 0);
					
				}
			}
			
		}
		
		
		public setSocket(socket:socket.TCPSocket):void{
			if(!this.socketParser){
				this.socketParser = new packet.SocketParser();
				this.socketParser.setCData(define.PacketDefine.GAME);
				this.m_dataPacket = new packet.DataPacket(this.socketParser);
			}
			if(!socket){
				socket =socket;
				//m_socket.setTcpSocketSink(sink);
				
			}
		}
		
		public setSocketParser(parser:packet.SocketParser=null,dataPacket:packet.DataPacket=null):void{
			if (parser){
				this.socketParser = parser;
			}
			if (dataPacket){
				this.m_dataPacket = dataPacket;
			}
		}
		
		public connect(_sServerIP:string, _iServerPort:number):void{
			
			console.log("连接游戏...","m_socket:", socket.getUid(), "_sServerIP:", _sServerIP, "_iServerPort:",_iServerPort,"###");
			socket.connect( _sServerIP, _iServerPort );
		}
		
		protected send(id:number,obj:Object):void{
			var byte:egret.ByteArray = this.m_dataPacket.pack( id , obj );
			socket.send( byte, 0,  byte.length);
			byte.clear();
		}
		
		public loginGame(tableInfo:struct.TableStruct):void  {
			console.log("Login GAME");
			if( tableInfo == null ){
				console.log("桌台數據為NULL");
				return;
			}
			if ( manager.LobbyManager.getInstance().lobbyAuth != null ) {
				
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
//				//console.log("this._auth.betlimitId::" + this._auth.betlimitId );  送0
//				TimeManager.getInstance().start(PacketDefine.ENTER_TABLE.toString(16) ,LobbyManager.getInstance().warnConnect);
//				
//				var byte:egret.ByteArray = m_dataPacket.pack( PacketDefine.ENTER_TABLE , _gameLoginPkt );
//				console.log("登陆游戏."+tableInfo.GameID +".台号"+tableInfo.TableID+"  进桌类型："+tableInfo.joinTableType);
//				socket.send( byte, 0,  byte.length);
				var _class = getDefinitionByName("KeyTest");
				if(_class){
					var data = new _class();
					
					var byte:egret.ByteArray = data.enterTable(manager.LobbyManager.getInstance().lobbyAuth, this.socketParser, tableInfo, manager.LobbyManager.getInstance().warnConnect, Player.getInstance().sLobbyServer);
					
					util.Utils.DumpBinary( "", byte, 0, 11);
					socket.send( byte, 0,  byte.length);
					
					console.log(this, "登陆游戏桌..." );
				}
			} else {
				console.log("打开页面时，没有获取到web数据.");
			}
		
		}
		
		/**
		 *回复确认 
		 * @param o
		 * 
		 */
		public enterOK():void {
			var pkt : packet.pack_game.C_Game_Login_OK_Pkt = new packet.pack_game.C_Game_Login_OK_Pkt();
			pkt.AuthToken = String(Player.getInstance().iPlayerID); 			//認證碼
			pkt.Identity = manager.LobbyManager.getInstance().lobbyAuth.Identity;		//身分
			this.send(define.PacketDefine.C_ENTER_TABLE_OK , pkt);
		}
		
		public bet( o ):void {
			if (this.bLock==false){
				console.log("--------------》投注：..."+ o.BetList)
				this.bLock=true;
				manager.TimeManager.getInstance().start(define.PacketDefine.C_BET_INFO.toString(16) ,manager.LobbyManager.getInstance().warnConnect);
				this.send(define.PacketDefine.C_BET_INFO , o);
			}else{
				console.log("--------------等待投注回复返回，暂无法发送投注消息"+ o)
			}
			
		}
		
		public cancelBet( o:Object ):void {
			this.send(define.PacketDefine.CANCEL_BET , o);
		}
		
		public exit( o:Object ):void {
			manager.TimeManager.getInstance().stopAll();
			var byte:egret.ByteArray = this.m_dataPacket.pack( define.PacketDefine.C_EXIT_TABLE , o );
			socket.send( byte, 0,  byte.length);
		}
		
		public complementedRoadMap(data):void
		{
			this.send(define.PacketDefine.C_Game_Update_Table_Data,data);
		}
		
		/**
		 * 送心跳包
		 */
		public sendHeart():void {
			var _pkt:packet.pack_game.C_Game_Heart_Pkt = new packet.pack_game.C_Game_Heart_Pkt();
			_pkt.PlayerID = Player.getInstance().iPlayerID;
			_pkt.Identity = manager.LobbyManager.getInstance().lobbyAuth.Identity;
			
			var byte:egret.ByteArray = this.m_dataPacket.pack( define.PacketDefine.C_Heart , _pkt );
			//			console.log( this , "玩家ID."+_pkt.PlayerID +".身分:"+_pkt.Identity );			
			if( socket.m_socket ){
				socket.send( byte, 0,  byte.length);
			}
			
		}
		
		/**
		 * 回送服務器傳來心跳包消息
		 */
		public responseHeartPkt():void {
			var _pkt:packet.pack_game.C_Game_Heart_Pkt = new packet.pack_game.C_Game_Heart_Pkt();
			_pkt.PlayerID = Player.getInstance().iPlayerID;
			_pkt.Identity = manager.LobbyManager.getInstance().lobbyAuth.Identity;
			
			var byte:egret.ByteArray = this.m_dataPacket.pack( define.PacketDefine.S_Heart , _pkt );
			//			console.log( this , "玩家ID."+_pkt.PlayerID +".身分:"+_pkt.Identity );			
			if( socket.m_socket ){
				socket.send( byte, 0,  byte.length);
				
			}
		}	
		
		
		public close():void{
			if( socket && socket.m_socket.connected ){
				socket.m_socket.close();
			}
		}
		
		public destroy():void {
			if( socket ){
				socket.destroy();
				this.socket = null;	
			}
			
			if( this.gameSocketSink ){
				this.gameSocketSink.destroy();
				this.gameSocketSink = null;
			}

			if( this.socketParser ){
				this.socketParser = null;
			}
			
			if( this.m_dataPacket ){
				this.m_dataPacket.destroy();
				this.m_dataPacket = null;
			}
			if( this.m_auth ){
				this.m_auth = null;
			}
		}
		
		
		
	}
}