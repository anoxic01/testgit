module packet.sink {
	export class LobbyTCPSocketSink implements socket.ITCPSocketSink{
		private  m_TimeStamp					:	string;
		protected  m_iTryN						:	number=0;				//连接次数
		
		public constructor() {
		}
		
		public destroy():void {
			
		}
		
		public onCTCPSocketConnecting(_uSocketID:number):void
		{
		}
		
		public onCTCPSocketConnected(_uSocketID:number):void
		{
			console.log("大厅连接成功... _uSocketID:",_uSocketID );
			manager.LobbyManager.getInstance().sendLoginLobby();
			manager.NetWorkManager.getInstance().iLobbyNetWorkStatus = define.Define.LobbyConnected;
		}
		
		//大廳收到服務器傳來斷線  -> 停止心跳包 -> 彈跳提示窗
		public onCTCPSocketClose(_uSocketID:number, _cmd:number):void
		{
			console.log(this, "大廳斷線:::" +_uSocketID );
			manager.NetWorkManager.getInstance().checkLobbyNetWork(define.Define.LobbyDisconnect );
		}
		
		//大廳連接失敗-> 將大廳斷線 -> 重連 ->重連成功 -> 走登入流程 
		//                        ->重連失敗 -> 跳提示窗
		public onCTCPSocketError(_uFail:number):void{
			console.log(this, "大廳連線錯誤:::" + _uFail );
			if( _uFail !=  socket.SocketDefine.SEND_FAIL ) {
				manager.NetWorkManager.getInstance().checkLobbyNetWork(define.Define.LobbyConnectFailed);
			}
		}
				
		
		public onCTCPSocketRead(_uSocketID:number, _tagTCPData:socket.ITagTCPData):void
		{
		//	console.log("_uSocketID:", _uSocketID, "收到数据：");
		let date_0 : Date = new Date();
		let _oData = manager.LobbyManager.getInstance().socketParser.onPacketData( _tagTCPData );
		let date_1 : Date = new Date();
			
			if (_oData==null){
				console.log("解析数据为NULL ")
				return;
			}
			
//			console.log("数据解析用时：",(date_1.time-date_0.time),"数据类型：",_oData.Type,"数据大小:",_tagTCPData.getPacketSize());
			
		let protocolClass : iface.IProtocolStruct = manager.PacketManager.getInstance().getProtocolClass( define.PacketDefine.LOBBY, _oData.Type);
			if (protocolClass)
			{
				protocolClass.execute( _oData );
			}else{
			//	console.log("收到的数据，找不到对应处理协议...");
			}
			
			//回复告知
//			if(LobbyData.getInstance().needReply(_oData.Type)){
//			 struct : SNStruct = LobbyData.getInstance().getSN();
//				if(struct.ERROR){
//					LobbyManager.getInstance().sendNAck(0, struct.SN);
//				}else{
//					LobbyManager.getInstance().sendAck(0, struct.SN);
//				}
//			}
			/*if(LobbyData.getInstance().needReply(_oData.Type)){
			 struct : SNStruct = LobbyData.getInstance().getSN();
				if(struct.ERROR){
					LobbyManager.getInstance().sendNAck(0, struct.SN);
				}else{
					LobbyManager.getInstance().sendAck(0, struct.SN);
				}
			}*/
		}

		
	}
}