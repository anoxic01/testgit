module lobby.sink {
	export class LobbyTCPSocketSink implements ITCPSocketSink{
		private 	var m_TimeStamp					:	String;
		protected 	var m_iTryN						:	int=0;				//连接次数
		
		public constructor() {
		}
		
		public function destroy():void {
			
		}
		
		public function onCTCPSocketConnecting(_uSocketID:int):void
		{
		}
		
		public function onCTCPSocketConnected(_uSocketID:int):void
		{
			trace("大厅连接成功... _uSocketID:",_uSocketID );
			LobbyManager.getInstance().sendLoginLobby();
			NetWorkManager.getInstance().iLobbyNetWorkStatus = Define.LobbyConnected;
		}
		
		//大廳收到服務器傳來斷線  -> 停止心跳包 -> 彈跳提示窗
		public function onCTCPSocketClose(_uSocketID:int, _cmd:int):void
		{
			Log.getInstance().log(this, "大廳斷線:::" +_uSocketID );
			NetWorkManager.getInstance().checkLobbyNetWork(Define.LobbyDisconnect );
		}
		
		//大廳連接失敗-> 將大廳斷線 -> 重連 ->重連成功 -> 走登入流程 
		//                        ->重連失敗 -> 跳提示窗
		public function onCTCPSocketError(_uFail:int):void{
			Log.getInstance().log(this, "大廳連線錯誤:::" + _uFail );
			if( _uFail !=  SocketDefine.SEND_FAIL ) {
				NetWorkManager.getInstance().checkLobbyNetWork(Define.LobbyConnectFailed);
			}
		}
				
		
		public function onCTCPSocketRead(_uSocketID:int, _tagTCPData:ITagTCPData):void
		{
		//	trace("_uSocketID:", _uSocketID, "收到数据：");
			var date_0 : Date = new Date();
			var _oData : Object = LobbyManager.getInstance().socketParser.onPacketData( _tagTCPData );
			var date_1 : Date = new Date();
			
			if (_oData==null){
				trace("解析数据为NULL ")
				return;
			}
			
//			trace("数据解析用时：",(date_1.time-date_0.time),"数据类型：",_oData.Type,"数据大小:",_tagTCPData.getPacketSize());
			
			var protocolClass : IProtocolStruct = PacketManager.getInstance().getProtocolClass( PacketDefine.LOBBY, _oData.Type);
			if (protocolClass)
			{
				protocolClass.execute( _oData );
			}else{
			//	trace("收到的数据，找不到对应处理协议...");
			}
			
			//回复告知
//			if(LobbyData.getInstance().needReply(_oData.Type)){
//				var struct : SNStruct = LobbyData.getInstance().getSN();
//				if(struct.ERROR){
//					LobbyManager.getInstance().sendNAck(0, struct.SN);
//				}else{
//					LobbyManager.getInstance().sendAck(0, struct.SN);
//				}
//			}
			/*if(LobbyData.getInstance().needReply(_oData.Type)){
				var struct : SNStruct = LobbyData.getInstance().getSN();
				if(struct.ERROR){
					LobbyManager.getInstance().sendNAck(0, struct.SN);
				}else{
					LobbyManager.getInstance().sendAck(0, struct.SN);
				}
			}*/
		}

		
	}
}