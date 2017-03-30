module ctrl {
	export class GameControler {
		//		public tryN							:		int				//连接次数		暫時不用
		protected viewFunList				:		Dictionary		//view回调函数表
		public root							:		Game;
		public model						:		GameModel;
		public view							:		GameView;
		public proxy						:		GameProxy;
		public uMultiIndex					:		number;			//多桌序号
		public bActive						:		 boolean      	//是否激活
		public bMulti						:		 boolean;
		protected m_bIsLeaveGame			:		 boolean;		//是否離開遊戲
		public bGameLogout					:		 boolean;		//是否登出
		public loginN						:		number;			//登入次數
		public bRetry						:		 boolean;		//
		public iHeartCount					:		number;			//遊戲心跳包失敗次數
		public nRevServerTime				:		Number=0;		//接收心跳包消息的時間
		public gameType						:		number;
		public bcloseGame					:		 boolean;		//关闭赌桌

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

		
		public setSocket(socket:TCPSocket):void{
			
		}
		
		
		public onConnect():void{
			var table:TableStruct = model.tableStruct;
			console.log(table.TableID+"连接成功"+table.BetLimitID);
			proxy.loginGame(table);
			/*if (view){
				view.onConnect();
			}*/
			addServerListener();
			addViewListener();			
		}
		
		public onLoginSuccess():void {
			if (view){
				view.onConnect();
			}	
			bRetry = false;
			loginN = 0;
		}
		
		
		public reConnect(): boolean {
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
		
		protected onRetryLogin(timer:JTimer):void{
			timer.dispose();
			var table:TableStruct = model.tableStruct;
				proxy.connect(table.ServerIP , table.ServerPort);
			
		}		
		
		public onConnectClosed():void{
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
		
		public onConnectFailed(ret:number):void{	
			//有執行 斷線重連 ,在最後收到 Security Error 清除 controler
			/*if( m_bIsLeaveGame && ret == SocketDefine.SOCKET_SECURITY_ERROR ){
				destroy();
				return;
			}*/
			
			if (model && view){
				view.onConnectFailed();
			}
			
			/*tryN++;
			console.log("reson: "+ret+"连接失败响应"+tryN)
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
						console.log("重连: "+tryN)
					}
				}
			
			}
			else if (ret !== SocketDefine.SEND_FAIL && ret != SocketDefine.RECV_FAIL){
				if (view){
					view.onConnectFailed();
				}
			}	*/
			
		}
		
		
		
		 public setModel( m:GameModel ):void {
			this.model = m;
//			m_gameModel.addObserver(this);
			
		}
		
		
		protected addServerListener():void{
			console.log("gameType::"  + gameType);
			PacketManager.getInstance().addProtocol(gameType,PacketDefine.ACK ,			S_Game_Ack_Pkt);					//ACK
			PacketManager.getInstance().addProtocol(gameType,PacketDefine.N_ACK ,		S_Game_NAck_Pkt);					//NACK
			
		}
		
		protected removeServerListener():void{

		}
		
		protected addViewListener():void{
		}
		
		protected removeViewListener():void{
			for(var key:string in viewFunList){
				viewFunList[key]=null
				delete viewFunList[key];
			}
		}
		
		protected viewHandler(type:number, data:* = null):void
		{
			if ( this.viewFunList[type] != undefined )  {
				this.viewFunList[type]( data ); 
			}
			else {
				//console.log("DATA is null");
			}
		}

		
		public destroy():void {
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
		
		public exitGame():void{
			bGameLogout = true;
			TimeManager.getInstance().removeFun(onHeart);
		}
		
		public removeSocketListen():void {
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
		public judgeDestroy():void {
		
//			m_bIsLeaveGame = true;		
			destroy();
		}
		
		/**
		 *  收到登入確認封包才 啟動遊戲心跳包
		 */
		public runGameHeart():void {
			PacketManager.getInstance().addProtocol(gameType,PacketDefine.S_Heart , S_Game_Heart_Pkt);				//客戶端主動發起心跳回復	
			PacketManager.getInstance().addProtocol(gameType,PacketDefine.C_Heart , S_Game_Heart_Pkt);				//服務端主動發起心跳回復
		//	TimeManager.getInstance().addFun(onHeart,LobbyManager.getInstance().nHeartRate);
		}
		
		protected onHeart():void
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
		public pktException():void {
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
		
		public removeGameHeart():void {
			TimeManager.getInstance().removeFun(onHeart);
		}
			
		
		/*****************************************遊戲共用****************************************************/
		
		
		
		/*****************************************遊戲共用END****************************************************/
		
		
		
	}
}