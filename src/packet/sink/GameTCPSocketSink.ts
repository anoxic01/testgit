module packet.sink {
	export class GameTCPSocketSink  implements socket.ITCPSocketSink{
		public controler		:	ctrl.GameControler;
		public proxy			:	lobby.view.game.GameProxy;
		public gameType			:	number;
		private bShowDialog		:	 boolean = false;			//是否已顯示彈窗
		
		public constructor(_gameType:number,_controler:ctrl.GameControler=null) {
			this.gameType=_gameType;
			this.controler= _controler;
		}
		
		public destroy():void {
			if( this.controler ){
				this.controler = null;
			}
			if( this.proxy ){
				this.proxy = null;
			}
			manager.LobbyManager.getInstance().bEnterGame=false;
		}
		
		public onCTCPSocketConnecting(_uSocketID:number):void
		{
		}
		
		public onCTCPSocketConnected(_uSocketID:number):void
		{
			console.log("游戏连接成功... _uSocketID:",_uSocketID );
			this.proxy = this.controler.proxy;
			this.controler.onConnect();
			this.bShowDialog = false;
			manager.NetWorkManager.getInstance().iGameNetWorkStatus = define.Define.GameConnected;
			
		}
		
		public onCTCPSocketClose(_uSocketID:number, _cmd:number):void
		{
//			console.log("游戏连接关闭...");
			console.log(this, "游戏连接关闭..." +",TableID:"+ this.controler.model.tableStruct.TableID );
			manager.NetWorkManager.getInstance().checkGameNetWork(	define.Define.GameDisconnect, this.controler );		
		}
		
		
		public onCTCPSocketError(_uFail:number):void{
//			console.log("游戏连接错误..."+_uFail );
			console.log(this, "游戏连接错误..." +",TableID:"+ this.controler.model.tableStruct.TableID );
			//只友連接失敗要處理
			if( _uFail == socket.SocketDefine.CONNECT_FAIL ||_uFail == socket.SocketDefine.SOCKET_SECURITY_ERROR) {
				manager.NetWorkManager.getInstance().checkGameNetWork(	define.Define.GameConnectFailed, this.controler);
			}
				
		}
		
		
		public onCTCPSocketRead(_uSocketID:number, _tagTCPData:socket.ITagTCPData):void
		{
			
			var _oData = this.proxy.socketParser.onPacketData( _tagTCPData );
			if (_oData==null){
				console.log("GAME解析数据为NULL ")
				return;
			}
			
			if( !this.controler ) {
				console.log("GameControler is NULL");
				return;
			}
			
			var protocolClass : iface.IProtocolStruct = manager.PacketManager.getInstance().getProtocolClass( this.gameType, _oData.Type);
			if (protocolClass)
			{
				if (_oData.Type == 0x09){
					console.log("GAME_uSocketID:"+_uSocketID, _oData.Type.toString(16)+" 收到数据："+_oData.str);
				}
				
				
				protocolClass.initControler( this.controler );
				protocolClass.execute( _oData );
			}else{
				console.log("GAME_uSocketID收到数据，找不到对应处理协议..." + _oData.Type );
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