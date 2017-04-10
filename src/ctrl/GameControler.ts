module ctrl {
	export class GameControler {
		//		public tryN							:		int				//连接次数		暫時不用
		protected viewFunList				;		//view回调函数表
		public root							:		lobby.view.game.Game;
		public model						:		lobby.model.game.GameModel;
		public view							:		lobby.view.game.GameView;
		public proxy						:		lobby.model.game.GameProxy;
		public uMultiIndex					:		number;			//多桌序号
		public bActive						:		 boolean      	//是否激活
		public bMulti						:		 boolean;
		protected m_bIsLeaveGame			:		 boolean;		//是否離開遊戲
		public bGameLogout					:		 boolean;		//是否登出
		public loginN						:		number;			//登入次數
		public bRetry						:		 boolean;		//
		public iHeartCount					:		number;			//遊戲心跳包失敗次數
		public nRevServerTime				:		number=0;		//接收心跳包消息的時間
		public gameType						:		number;
		public bcloseGame					:		 boolean;		//关闭赌桌

		public constructor(m, v=null,game=null) {
			this.root = game;
			
			this.setModel(m);
			
			this.viewFunList = {};
			this.view= v;
			this.addServerListener();
			this.addViewListener();
			(<lobby.view.game.GameView>(this.view)).sendFun=this.viewHandler;
			this.nRevServerTime   = egret.getTimer();
		}

		
		public setSocket(socket:socket.TCPSocket):void{
			
		}
		
		
		public onConnect():void{
			var table:lobby.model.struct.TableStruct = this.model.tableStruct;
			console.log(table.TableID+"连接成功"+table.BetLimitID);
			this.proxy.loginGame(table);
			/*if (view){
				view.onConnect();
			}*/
			this.addServerListener();
			this.addViewListener();			
		}
		
		public onLoginSuccess():void {
			if (this.view){
				this.view.onConnect();
			}	
			this.bRetry = false;
			this.loginN = 0;
		}
		
		
		public reConnect(): boolean {
			//大廳斷線狀況
			if( manager.NetWorkManager.getInstance().iLobbyNetWorkStatus != define.Define.LobbyConnected ){
				manager.LobbyManager.getInstance().lobbyView.hideLoading();
				this.bRetry = false;
				this.proxy.close();
				return false;
			}
			
			if( this.loginN < 2 ){
				console.log(this,"重新登入遊戲..");
				if( this.proxy ){
					this.loginN = this.loginN + 1;			
					var timer = timers.JTimer.getTimer(1500,1);
					timer.addTimerCallback(null,this.onRetryLogin);
					timer.start();
					this.bRetry = true;
					manager.LobbyManager.getInstance().lobbyView.showLoading();
					this.proxy.close();			//先斷線
				}
				return this.bRetry;	
			}
			console.log(this,"重新登入遊戲失敗..");
			manager.LobbyManager.getInstance().lobbyView.hideLoading();
			this.bRetry = false;
			if( this.proxy ){
				this.proxy.close();
			}
			
			return this.bRetry;
		}	
		
		protected onRetryLogin(timer):void{
			timer.dispose();
			var table:lobby.model.struct.TableStruct = this.model.tableStruct;
				this.proxy.connect(table.ServerIP , table.ServerPort);
			
		}		
		
		public onConnectClosed():void{
			if (this.model && this.view){
				//在退出 刚登入时 会收到，
				/*tryN++;
				if (tryN<3){
					model.reset();
					var table:lobby.model.struct.TableStruct = model.tableInfo;
					if(table==null){
						return;
					}
					proxy.connect(table.ServerIP,table.ServerPort);
					view.onReConnect();
				}else{
					view.onConnectClosed();
				}*/
				
				this.view.onConnectClosed();
			}
			
		}
		
		public onConnectFailed(ret:number):void{	
			//有執行 斷線重連 ,在最後收到 Security Error 清除 controler
			/*if( m_bIsLeaveGame && ret == SocketDefine.SOCKET_SECURITY_ERROR ){
				destroy();
				return;
			}*/
			
			if (this.model && this.view){
				this.view.onConnectFailed();
			}
			
			/*tryN++;
			console.log("reson: "+ret+"连接失败响应"+tryN)
			if (tryN<3 ){
				if (true||ret ==SocketDefine.GATEWAY_DISCONNECT || ret == SocketDefine.CONNECT_FAIL){
					model.reset();
					var table:lobby.model.struct.TableStruct = model.tableInfo;
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
		
		
		
		 public setModel( m:lobby.model.game.GameModel ):void {
			this.model = m;
//			m_gameModel.addObserver(this);
			
		}
		
		
		protected addServerListener():void{
			console.log("gameType::"  + this.gameType);
			manager.PacketManager.getInstance().addProtocol(this.gameType,define.PacketDefine.ACK ,			packet.pack_game.S_Game_Ack_Pkt);					//ACK
			manager.PacketManager.getInstance().addProtocol(this.gameType,define.PacketDefine.N_ACK ,		packet.pack_game.S_Game_NAck_Pkt);					//NACK
			
		}
		
		protected removeServerListener():void{

		}
		
		protected addViewListener():void{
		}
		
		protected removeViewListener():void{
			for(var key in this.viewFunList){
				this.viewFunList[key]=null
				delete this.viewFunList[key];
			}
		}
		
		protected viewHandler(type:number, data = null):void
		{
			if ( this.viewFunList[type] != undefined )  {
				this.viewFunList[type]( data ); 
			}
			else {
				//console.log("DATA is null");
			}
		}

		
		public destroy():void {
			this.removeServerListener();
			this.removeViewListener();
			if( this.proxy ){
				this.proxy.destroy();
				this.proxy = null;
			}
			if( this.model ){
				this.model = null;
			}
			if( this.view ){
				this.view =null;
			}
			if(this.root){
				this.root=null;
			}
			
			manager.TimeManager.getInstance().removeFun(this.onHeart);
			manager.PacketManager.getInstance().removeProtocol(this.gameType,define.PacketDefine.ACK );					//ACK
			manager.PacketManager.getInstance().removeProtocol(this.gameType,define.PacketDefine.N_ACK);				//NACK	
			manager.PacketManager.getInstance().removeProtocol(this.gameType,define.PacketDefine.S_Heart );				//客戶端主動發起心跳回復	
			manager.PacketManager.getInstance().removeProtocol(this.gameType,define.PacketDefine.C_Heart );				//服務端主動發起心跳回復			
		}
		
		public exitGame():void{
			this.bGameLogout = true;
			manager.TimeManager.getInstance().removeFun(this.onHeart);
		}
		
		public removeSocketListen():void {
			this.removeServerListener();
			if( this.proxy  && this.proxy.socket.m_socket){
				if( this.proxy.socket.m_socket.connected ){
					this.proxy.socket.m_socket.close();
				}
			}
		}
		
		/**
		 * 判斷是否該清除controler
		 */
		public judgeDestroy():void {
		
//			m_bIsLeaveGame = true;		
			this.destroy();
		}
		
		/**
		 *  收到登入確認封包才 啟動遊戲心跳包
		 */
		public runGameHeart():void {
			manager.PacketManager.getInstance().addProtocol(this.gameType,define.PacketDefine.S_Heart , packet.pack_game.S_Game_Heart_Pkt);				//客戶端主動發起心跳回復	
			manager.PacketManager.getInstance().addProtocol(this.gameType,define.PacketDefine.C_Heart , packet.pack_game.S_Game_Heart_Pkt);				//服務端主動發起心跳回復
		//	manager.TimeManager.getInstance().addFun(onHeart,manager.LobbyManager.getInstance().nHeartRate);
		}
		
		protected onHeart():void
		{
//			console.log(this, "檢測遊戲心跳..." );
			var _nTime:number = egret.getTimer();
			var _time:number = (_nTime - this.nRevServerTime)/1000;
			var _nDelay:number = (manager.LobbyManager.getInstance().nHeartRate*2)/1000;			//延遲時間
			
			if( _time < _nDelay ){
				this.proxy.sendHeart();
			}else {
			//	pktException();
			}			
		}
		
		/**
		 * 包傳遞異常
		 */
		public pktException():void {
			if( this.proxy  && this.proxy.socket.m_socket){
				try {
					this.proxy.socket.m_socket.close();
				}catch(e){
					
				}

				this.reConnect();
			}
			else {
				console.log(this, "包傳遞異常 proxy::" + this.proxy + ", connect status::" + this.proxy.socket.m_socket.connected );
			}
			manager.TimeManager.getInstance().removeFun(this.onHeart);
		}		
		
		public removeGameHeart():void {
			manager.TimeManager.getInstance().removeFun(this.onHeart);
		}
			
		
		/*****************************************遊戲共用****************************************************/
		
		
		
		/*****************************************遊戲共用END****************************************************/
		
		
		
	}
}