module lobby.ctrl {
	export class GameControler {
		//		public var tryN							:		int				//连接次数		暫時不用
		protected var viewFunList				:		Dictionary		//view回调函数表
		public var root							:		Game;
		public var model						:		GameModel;
		public var view							:		GameView;
		public var proxy						:		GameProxy;
		public var uMultiIndex					:		uint;			//多桌序号
		public var bActive						:		Boolean      	//是否激活
		public var bMulti						:		Boolean;
		protected var m_bIsLeaveGame			:		Boolean;		//是否離開遊戲
		public var bGameLogout					:		Boolean;		//是否登出
		public var loginN						:		int;			//登入次數
		public var bRetry						:		Boolean;		//
		public var iHeartCount					:		int;			//遊戲心跳包失敗次數
		public var nRevServerTime				:		Number=0;		//接收心跳包消息的時間
		public var gameType						:		uint;
		public var bcloseGame					:		Boolean;		//关闭赌桌

		public constructor(m:GameModel, v:GameView=null,game:Game=null) {
			this.root = game;
			
			setModel(m);
			
			this.viewFunList = new Dictionary();
			view= v;
			addServerListener();
			addViewListener();
			GameView(view).sendFun=viewHandler;
			nRevServerTime   = getTimer();
		}

		
		public function setSocket(socket:TCPSocket):void{
			
		}
		
		
		public function onConnect():void{
			var table:TableStruct = model.tableStruct;
			trace(table.TableID+"连接成功"+table.BetLimitID);
			proxy.loginGame(table);
			/*if (view){
				view.onConnect();
			}*/
			addServerListener();
			addViewListener();			
		}
		
		public function onLoginSuccess():void {
			if (view){
				view.onConnect();
			}	
			bRetry = false;
			loginN = 0;
		}
		
		
		public function reConnect():Boolean {
			//大廳斷線狀況
			if( NetWorkManager.getInstance().iLobbyNetWorkStatus != Define.LobbyConnected ){
				LobbyManager.getInstance().lobbyView.hideLoading();
				bRetry = false;
				proxy.close();
				return false;
			}
			
			if( loginN < 2 ){
				Log.getInstance().log(this,"重新登入遊戲..");
				if( proxy ){
					loginN = loginN + 1;			
					var timer:JTimer = JTimer.getTimer(1500,1);
					timer.addTimerCallback(null,onRetryLogin);
					timer.start();
					bRetry = true;
					LobbyManager.getInstance().lobbyView.showLoading();
					proxy.close();			//先斷線
				}
				return bRetry;	
			}
			Log.getInstance().log(this,"重新登入遊戲失敗..");
			LobbyManager.getInstance().lobbyView.hideLoading();
			bRetry = false;
			if( proxy ){
				proxy.close();
			}
			
			return bRetry;
		}	
		
		protected function onRetryLogin(timer:JTimer):void{
			timer.dispose();
			var table:TableStruct = model.tableStruct;
				proxy.connect(table.ServerIP , table.ServerPort);
			
		}		
		
		public function onConnectClosed():void{
			if (model && view){
				//在退出 刚登入时 会收到，
				/*tryN++;
				if (tryN<3){
					model.reset();
					var table:TableStruct = model.tableInfo;
					if(table==null){
						return;
					}
					proxy.connect(table.ServerIP,table.ServerPort);
					view.onReConnect();
				}else{
					view.onConnectClosed();
				}*/
				
				view.onConnectClosed();
			}
			
		}
		
		public function onConnectFailed(ret:int):void{	
			//有執行 斷線重連 ,在最後收到 Security Error 清除 controler
			/*if( m_bIsLeaveGame && ret == SocketDefine.SOCKET_SECURITY_ERROR ){
				destroy();
				return;
			}*/
			
			if (model && view){
				view.onConnectFailed();
			}
			
			/*tryN++;
			trace("reson: "+ret+"连接失败响应"+tryN)
			if (tryN<3 ){
				if (true||ret ==SocketDefine.GATEWAY_DISCONNECT || ret == SocketDefine.CONNECT_FAIL){
					model.reset();
					var table:TableStruct = model.tableInfo;
					if(table==null){
						if (view){
							view.onConnectFailed();
						}
						return;
					}
					proxy.connect(table.ServerIP,table.ServerPort);
					if (view){
						view.onReConnect();
						trace("重连: "+tryN)
					}
				}
			
			}
			else if (ret !== SocketDefine.SEND_FAIL && ret != SocketDefine.RECV_FAIL){
				if (view){
					view.onConnectFailed();
				}
			}	*/
			
		}
		
		
		
		 public function setModel( m:GameModel ):void {
			this.model = m;
//			m_gameModel.addObserver(this);
			
		}
		
		
		protected function addServerListener():void{
			trace("gameType::"  + gameType);
			PacketManager.getInstance().addProtocol(gameType,PacketDefine.ACK ,			S_Game_Ack_Pkt);					//ACK
			PacketManager.getInstance().addProtocol(gameType,PacketDefine.N_ACK ,		S_Game_NAck_Pkt);					//NACK
			
		}
		
		protected function removeServerListener():void{

		}
		
		protected function addViewListener():void{
		}
		
		protected function removeViewListener():void{
			for(var key:String in viewFunList){
				viewFunList[key]=null
				delete viewFunList[key];
			}
		}
		
		protected function viewHandler(type:int , data:* = null):void
		{
			if ( this.viewFunList[type] != undefined )  {
				this.viewFunList[type]( data ); 
			}
			else {
				//trace("DATA is null");
			}
		}

		
		public function destroy():void {
			removeServerListener();
			removeViewListener();
			if( proxy ){
				proxy.destroy();
				proxy = null;
			}
			if( model ){
				model = null;
			}
			if( view ){
				view =null;
			}
			if(root){
				root=null;
			}
			
			TimeManager.getInstance().removeFun(onHeart);
			PacketManager.getInstance().removeProtocol(gameType,PacketDefine.ACK );					//ACK
			PacketManager.getInstance().removeProtocol(gameType,PacketDefine.N_ACK);				//NACK	
			PacketManager.getInstance().removeProtocol(gameType,PacketDefine.S_Heart );				//客戶端主動發起心跳回復	
			PacketManager.getInstance().removeProtocol(gameType,PacketDefine.C_Heart );				//服務端主動發起心跳回復			
		}
		
		public function exitGame():void{
			bGameLogout = true;
			TimeManager.getInstance().removeFun(onHeart);
		}
		
		public function removeSocketListen():void {
			removeServerListener();
			if( proxy  && proxy.socket.m_socket){
				if( proxy.socket.m_socket.connected ){
					proxy.socket.m_socket.close();
				}
			}
		}
		
		/**
		 * 判斷是否該清除controler
		 */
		public function judgeDestroy():void {
		
//			m_bIsLeaveGame = true;		
			destroy();
		}
		
		/**
		 *  收到登入確認封包才 啟動遊戲心跳包
		 */
		public function runGameHeart():void {
			PacketManager.getInstance().addProtocol(gameType,PacketDefine.S_Heart , S_Game_Heart_Pkt);				//客戶端主動發起心跳回復	
			PacketManager.getInstance().addProtocol(gameType,PacketDefine.C_Heart , S_Game_Heart_Pkt);				//服務端主動發起心跳回復
		//	TimeManager.getInstance().addFun(onHeart,LobbyManager.getInstance().nHeartRate);
		}
		
		protected function onHeart():void
		{
//			Log.getInstance().log(this, "檢測遊戲心跳..." );
			var _nTime:Number = getTimer();
			var _time:Number = (_nTime - nRevServerTime)/1000;
			var _nDelay:Number = (LobbyManager.getInstance().nHeartRate*2)/1000;			//延遲時間
			
			if( _time < _nDelay ){
				proxy.sendHeart();
			}else {
			//	pktException();
			}			
		}
		
		/**
		 * 包傳遞異常
		 */
		public function pktException():void {
			if( proxy  && proxy.socket.m_socket){
				try {
					proxy.socket.m_socket.close();
				}catch(e:Error){
					
				}

				reConnect();
			}
			else {
				Log.getInstance().log(this, "包傳遞異常 proxy::" + proxy + ", connect status::" + proxy.socket.m_socket.connected );
			}
			TimeManager.getInstance().removeFun(onHeart);
		}		
		
		public function removeGameHeart():void {
			TimeManager.getInstance().removeFun(onHeart);
		}
			
		
		/*****************************************遊戲共用****************************************************/
		
		
		
		/*****************************************遊戲共用END****************************************************/
		
		
		
	}
}